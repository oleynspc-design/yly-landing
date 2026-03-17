// Migration v7: Add onboarding quiz answers + AI profile summary
require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");

async function main() {
  const sql = neon(process.env.DATABASE_URL);

  // Onboarding quiz answers (JSONB)
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_answers JSONB;`;
  console.log("✅ Added onboarding_answers column to users");

  // AI-generated profile summary for admin
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS ai_profile_summary TEXT;`;
  console.log("✅ Added ai_profile_summary column to users");

  // Recommended training path (JSONB)
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS training_path JSONB;`;
  console.log("✅ Added training_path column to users");

  console.log("\n🎉 Migration v7 complete!");
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
