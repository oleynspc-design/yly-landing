// Migration v6: Add industry column to users
require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");

async function main() {
  const sql = neon(process.env.DATABASE_URL);

  // Add industry column to users
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS industry TEXT;`;
  console.log("✅ Added industry column to users");

  console.log("\n🎉 Migration v6 complete!");
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
