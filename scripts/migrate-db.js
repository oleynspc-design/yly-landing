const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("❌ BŁĄD: Brak DATABASE_URL w .env.local");
    process.exit(1);
  }

  const sql = neon(dbUrl);

  try {
    console.log("Aktualizacja schematu bazy danych...");

    // Dodanie roli do tabeli users, jeśli nie istnieje
    await sql.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
          ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'));
        END IF;
      END $$;
    `);

    // Dodanie kodu odblokowującego do tabeli training_access, jeśli nie istnieje
    await sql.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='training_access' AND column_name='unlock_code') THEN
          ALTER TABLE training_access ADD COLUMN unlock_code TEXT UNIQUE;
        END IF;
      END $$;
    `);

    console.log("✅ Migracja zakończona pomyślnie.");
  } catch (error) {
    console.error("❌ Błąd migracji:", error);
  }
}

migrate();
