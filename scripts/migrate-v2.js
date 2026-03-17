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
    console.log("Migracja v2: avatar_url + chat...");

    // 1. Dodaj avatar_url do users
    await sql.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='avatar_url') THEN
          ALTER TABLE users ADD COLUMN avatar_url TEXT;
        END IF;
      END $$;
    `);
    console.log("  ✓ avatar_url");

    // 2. Tabela chat_channels
    await sql.query(`
      CREATE TABLE IF NOT EXISTS chat_channels (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log("  ✓ chat_channels");

    // 3. Tabela chat_messages
    await sql.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        channel_id UUID NOT NULL REFERENCES chat_channels(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log("  ✓ chat_messages");

    // 4. Indeksy
    await sql.query(`CREATE INDEX IF NOT EXISTS chat_messages_channel_idx ON chat_messages(channel_id, created_at DESC)`);
    await sql.query(`CREATE INDEX IF NOT EXISTS chat_messages_user_idx ON chat_messages(user_id)`);
    console.log("  ✓ indeksy");

    // 5. Seed default channels
    await sql.query(`INSERT INTO chat_channels (slug, name, description) VALUES ($1, $2, $3) ON CONFLICT (slug) DO NOTHING`, ['general', 'Ogólny', 'Czat ogólny dla wszystkich uczestników']);
    await sql.query(`INSERT INTO chat_channels (slug, name, description) VALUES ($1, $2, $3) ON CONFLICT (slug) DO NOTHING`, ['team', 'Zespół', 'Czat zespołowy — dyskusje o szkoleniach i projektach']);
    console.log("  ✓ kanały czatu");

    console.log("✅ Migracja v2 zakończona pomyślnie.");
  } catch (error) {
    console.error("❌ Błąd migracji:", error);
  }
}

migrate();
