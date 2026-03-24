import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { compare, hash } from "bcryptjs";
import { getSql } from "./db";

const OLEY_SESSION_COOKIE = "oley_session";
const SESSION_TTL_DAYS = 30;

function toRows<T>(value: unknown) {
  return value as T[];
}

export interface OleyUser {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "client";
  company: string | null;
  phone: string | null;
  notes: string | null;
}

interface OleyUserRow extends OleyUser {
  password_hash: string;
  created_at: string;
  updated_at: string;
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getExpiry() {
  return new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
}

export function generatePassword(length = 10): string {
  const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let password = "";
  const bytes = randomBytes(length);
  for (let i = 0; i < length; i++) {
    password += chars[bytes[i] % chars.length];
  }
  return password;
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

export async function getOleyCurrentUser(): Promise<OleyUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(OLEY_SESSION_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const sql = getSql();

  try {
    const rows = toRows<OleyUser>(await sql`
      SELECT
        u.id::text, u.email, u.full_name, u.role, u.company, u.phone, u.notes
      FROM oley_sessions s
      INNER JOIN oley_users u ON u.id = s.user_id
      WHERE s.token_hash = ${tokenHash}
        AND s.expires_at > NOW()
      LIMIT 1
    `);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function createOleySession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = getExpiry();
  const sql = getSql();

  await sql`
    INSERT INTO oley_sessions (user_id, token_hash, expires_at)
    VALUES (${userId}::uuid, ${tokenHash}, ${expiresAt.toISOString()})
  `;

  const cookieStore = await cookies();
  cookieStore.set(OLEY_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearOleySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(OLEY_SESSION_COOKIE)?.value;

  if (token) {
    const tokenHash = hashToken(token);
    const sql = getSql();
    await sql`DELETE FROM oley_sessions WHERE token_hash = ${tokenHash}`;
  }

  cookieStore.set(OLEY_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}

export async function verifyOleyUser(email: string, password: string): Promise<OleyUser | null> {
  const sql = getSql();
  const rows = toRows<OleyUserRow>(await sql`
    SELECT id::text, email, full_name, password_hash, role, company, phone, notes
    FROM oley_users
    WHERE email = ${email.trim().toLowerCase()}
    LIMIT 1
  `);

  const user = rows[0];
  if (!user) return null;

  const valid = await compare(password, user.password_hash);
  if (!valid) return null;

  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    company: user.company,
    phone: user.phone,
    notes: user.notes,
  };
}

export async function createOleyClient(input: {
  email: string;
  fullName: string;
  company?: string;
  phone?: string;
  notes?: string;
}): Promise<{ user: OleyUser; plainPassword: string }> {
  const sql = getSql();
  const plainPassword = generatePassword(10);
  const passwordHash = await hashPassword(plainPassword);

  const rows = toRows<OleyUser>(await sql`
    INSERT INTO oley_users (email, full_name, password_hash, role, company, phone, notes)
    VALUES (
      ${input.email.trim().toLowerCase()},
      ${input.fullName.trim()},
      ${passwordHash},
      'client',
      ${input.company || null},
      ${input.phone || null},
      ${input.notes || null}
    )
    RETURNING id::text, email, full_name, role, company, phone, notes
  `);

  return { user: rows[0], plainPassword };
}

export async function resetOleyClientPassword(userId: string): Promise<string> {
  const sql = getSql();
  const plainPassword = generatePassword(10);
  const passwordHash = await hashPassword(plainPassword);

  await sql`
    UPDATE oley_users SET password_hash = ${passwordHash}, updated_at = NOW()
    WHERE id = ${userId}::uuid AND role = 'client'
  `;

  return plainPassword;
}
