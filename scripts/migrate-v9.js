const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { console.error("❌ Brak DATABASE_URL"); process.exit(1); }
  const sql = neon(dbUrl);

  try {
    console.log("Migracja v9: last_active na users...");

    await sql`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='last_active') THEN
          ALTER TABLE users ADD COLUMN last_active TIMESTAMPTZ DEFAULT NOW();
        END IF;
      END $$
    `;

    console.log("✅ Migracja v9 zakończona.");
  } catch (error) {
    console.error("❌ Błąd migracji v9:", error);
  }
}

migrate();
