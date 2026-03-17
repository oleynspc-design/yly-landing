import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { compare } from "bcryptjs";
import { getSql, isDatabaseConfigured } from "./db";

const SESSION_COOKIE_NAME = "yly_session";
const SESSION_TTL_DAYS = 30;

function toRows<T>(value: unknown) {
  return value as T[];
}

export type TrainingAccessStatus = "pending" | "granted" | "revoked";
export type TrainingAccessScope = "none" | "all";

interface UserRow {
  id: string;
  email: string;
  full_name: string;
  password_hash: string;
  role: "user" | "admin" | "moderator";
}

interface SessionRow {
  id: string;
  email: string;
  full_name: string;
  role: "user" | "admin" | "moderator";
  avatar_url: string | null;
  access_status: TrainingAccessStatus | null;
  access_scope: TrainingAccessScope | null;
  industry: string | null;
  onboarding_done: boolean;
}

interface TrainingAccessRow {
  status: TrainingAccessStatus;
  granted_scope: TrainingAccessScope;
  unlock_code: string | null;
}

export interface CurrentUser {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin" | "moderator";
  avatarUrl: string | null;
  trainingAccessStatus: TrainingAccessStatus;
  trainingAccessScope: TrainingAccessScope;
  industry: string | null;
  onboardingDone: boolean;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getSessionExpiryDate() {
  return new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
}

export function isAuthConfigured() {
  return isDatabaseConfigured();
}

export function getSafeRedirectPath(value: unknown, fallback = "/szkolenie") {
  if (typeof value !== "string") {
    return fallback;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

export async function getCurrentUser() {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  const tokenHash = hashSessionToken(sessionToken);
  const sql = getSql();

  let rows: SessionRow[];
  try {
    rows = toRows<SessionRow>(await sql`
      SELECT
        u.id::text AS id,
        u.email,
        u.full_name,
        u.role,
        u.avatar_url,
        u.industry,
        (u.onboarding_answers IS NOT NULL) AS onboarding_done,
        ta.status AS access_status,
        ta.granted_scope AS access_scope
      FROM sessions s
      INNER JOIN users u ON u.id = s.user_id
      LEFT JOIN training_access ta ON ta.user_id = u.id
      WHERE s.token_hash = ${tokenHash}
        AND s.expires_at > NOW()
      LIMIT 1
    `);
  } catch {
    return null;
  }

  if (rows.length === 0) {
    return null;
  }

  return {
    id: rows[0].id,
    email: rows[0].email,
    fullName: rows[0].full_name,
    role: rows[0].role,
    avatarUrl: rows[0].avatar_url ?? null,
    trainingAccessStatus: rows[0].access_status ?? "pending",
    trainingAccessScope: rows[0].access_scope ?? "none",
    industry: rows[0].industry ?? null,
    onboardingDone: !!rows[0].onboarding_done,
  } satisfies CurrentUser;
}

export async function createSession(userId: string) {
  const sessionToken = randomBytes(32).toString("hex");
  const tokenHash = hashSessionToken(sessionToken);
  const expiresAt = getSessionExpiryDate();
  const sql = getSql();

  await sql`
    INSERT INTO sessions (user_id, token_hash, expires_at)
    VALUES (${userId}::uuid, ${tokenHash}, ${expiresAt.toISOString()})
  `;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearCurrentSession() {
  if (!isDatabaseConfigured()) {
    return;
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionToken) {
    const tokenHash = hashSessionToken(sessionToken);
    const sql = getSql();
    await sql`DELETE FROM sessions WHERE token_hash = ${tokenHash}`;
  }

  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}

export async function findUserByEmail(email: string) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const sql = getSql();
  const rows = toRows<UserRow>(await sql`
    SELECT id::text, email, full_name, password_hash
    FROM users
    WHERE email = ${normalizeEmail(email)}
    LIMIT 1
  `);

  return rows[0] ?? null;
}

export async function createUser(input: {
  email: string;
  fullName: string;
  passwordHash: string;
}) {
  const sql = getSql();
  const rows = toRows<UserRow>(await sql`
    INSERT INTO users (email, full_name, password_hash)
    VALUES (${normalizeEmail(input.email)}, ${input.fullName.trim()}, ${input.passwordHash})
    RETURNING id::text, email, full_name, password_hash
  `);

  return rows[0] ?? null;
}

export async function verifyPassword(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const isValid = await compare(password, user.password_hash);

  if (!isValid) {
    return null;
  }

  return user;
}

export async function ensureTrainingAccessRow(userId: string) {
  const sql = getSql();

  await sql`
    INSERT INTO training_access (user_id)
    VALUES (${userId}::uuid)
    ON CONFLICT (user_id) DO NOTHING
  `;
}

export async function getTrainingAccessByUserId(userId: string) {
  const sql = getSql();
  const rows = toRows<TrainingAccessRow>(await sql`
    SELECT status, granted_scope, unlock_code
    FROM training_access
    WHERE user_id = ${userId}::uuid
  `);

  if (rows.length === 0) {
    return { status: "pending" as const, granted_scope: "none" as const, unlock_code: null };
  }

  return {
    status: rows[0].status,
    granted_scope: rows[0].granted_scope,
    unlock_code: rows[0].unlock_code ?? null,
  };
}

export async function grantTrainingAccessByEmail(email: string, source = "system") {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const sql = getSql();

  await sql`
    INSERT INTO training_access (user_id, status, granted_scope, source, granted_at, updated_at)
    VALUES (${user.id}::uuid, 'granted', 'all', ${source}, NOW(), NOW())
    ON CONFLICT (user_id) DO UPDATE
    SET
      status = 'granted',
      granted_scope = 'all',
      source = ${source},
      granted_at = NOW(),
      updated_at = NOW()
  `;

  return {
    id: user.id,
    email: user.email,
  };
}
