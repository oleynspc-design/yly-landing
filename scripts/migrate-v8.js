const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { console.error("❌ Brak DATABASE_URL"); process.exit(1); }
  const sql = neon(dbUrl);

  try {
    console.log("Migracja v8: pakiety, spotkania, meeting_credits...");

    // 1. Add package_type to training_access
    await sql`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='training_access' AND column_name='package_type') THEN
          ALTER TABLE training_access ADD COLUMN package_type TEXT DEFAULT 'basic';
        END IF;
      END $$
    `;

    // 2. Meeting credits table
    await sql`
      CREATE TABLE IF NOT EXISTS meeting_credits (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        total INTEGER NOT NULL DEFAULT 0,
        used INTEGER NOT NULL DEFAULT 0,
        source TEXT DEFAULT 'package',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // 3. Meetings / booking table
    await sql`
      CREATE TABLE IF NOT EXISTS meetings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        admin_id UUID REFERENCES users(id),
        scheduled_at TIMESTAMPTZ NOT NULL,
        duration_minutes INTEGER NOT NULL DEFAULT 90,
        status TEXT NOT NULL DEFAULT 'scheduled',
        notes TEXT,
        meeting_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // 4. Admin availability slots
    await sql`
      CREATE TABLE IF NOT EXISTS admin_availability (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        admin_id UUID NOT NULL REFERENCES users(id),
        day_of_week INTEGER NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    console.log("✅ Migracja v8 zakończona pomyślnie.");
  } catch (error) {
    console.error("❌ Błąd migracji v8:", error);
  }
}

migrate();
