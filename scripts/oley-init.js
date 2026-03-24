require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");
const { hash } = require("bcryptjs");

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const sql = neon(dbUrl);

  console.log("Creating oley tables...");

  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

  await sql`CREATE TABLE IF NOT EXISTS oley_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client')),
    company TEXT,
    phone TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS oley_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES oley_users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS oley_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES oley_users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'nowy' CHECK (status IN ('nowy', 'w_trakcie', 'oczekuje', 'zakonczone')),
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    deadline DATE,
    budget TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS oley_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES oley_projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    notify_client BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS oley_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES oley_projects(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES oley_users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_from_client BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS oley_newsletter (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    source TEXT DEFAULT 'website',
    discount_code TEXT,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ
  )`;

  await sql`CREATE INDEX IF NOT EXISTS oley_sessions_token_idx ON oley_sessions(token_hash)`;
  await sql`CREATE INDEX IF NOT EXISTS oley_sessions_expires_idx ON oley_sessions(expires_at)`;
  await sql`CREATE INDEX IF NOT EXISTS oley_projects_client_idx ON oley_projects(client_id)`;
  await sql`CREATE INDEX IF NOT EXISTS oley_updates_project_idx ON oley_updates(project_id, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS oley_messages_project_idx ON oley_messages(project_id, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS oley_newsletter_email_idx ON oley_newsletter(email)`;

  console.log("Tables created.");

  // Create admin user
  const adminEmail = "kontakt@oleydesign.pl";
  const adminPassword = "Polejnik122@";
  const adminName = "OleyDesign Admin";

  const existing = await sql`SELECT id FROM oley_users WHERE email = ${adminEmail}`;
  if (existing.length > 0) {
    console.log("Admin user already exists, skipping.");
  } else {
    const passwordHash = await hash(adminPassword, 10);
    await sql`
      INSERT INTO oley_users (email, full_name, password_hash, role)
      VALUES (${adminEmail}, ${adminName}, ${passwordHash}, 'admin')
    `;
    console.log("Admin user created: " + adminEmail);
  }

  console.log("OleyDesign CMS initialized successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
