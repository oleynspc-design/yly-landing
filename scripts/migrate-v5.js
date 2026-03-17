// Migration v5: Add certificates and user levels
require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");

async function main() {
  const sql = neon(process.env.DATABASE_URL);

  // User levels: add xp and level columns to users table
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS xp INTEGER NOT NULL DEFAULT 0;`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS level INTEGER NOT NULL DEFAULT 1;`;
  console.log("✅ Added xp + level columns to users");

  // Certificates table
  await sql`
    CREATE TABLE IF NOT EXISTS certificates (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      score INTEGER,
      max_score INTEGER,
      issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      downloadable BOOLEAN NOT NULL DEFAULT false,
      metadata JSONB DEFAULT '{}'
    );
  `;
  console.log("✅ certificates table created");

  // XP log table (track what earned xp)
  await sql`
    CREATE TABLE IF NOT EXISTS xp_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      amount INTEGER NOT NULL,
      source TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log("✅ xp_log table created");

  // Indexes
  await sql`CREATE INDEX IF NOT EXISTS certificates_user_idx ON certificates(user_id);`;
  await sql`CREATE INDEX IF NOT EXISTS xp_log_user_idx ON xp_log(user_id);`;
  console.log("✅ indexes created");

  console.log("\n🎉 Migration v5 complete!");
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
