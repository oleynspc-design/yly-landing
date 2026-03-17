require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

async function migrate() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set in .env.local');
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  console.log('Running migration v3: add moderator role...');

  try {
    // 1. Drop and recreate the role check constraint to include 'moderator'
    await sql`
      DO $$ BEGIN
        ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
        ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('user', 'admin', 'moderator'));
      END $$;
    `;
    console.log('  ✓ Added moderator to role constraint');

    console.log('Migration v3 complete!');
  } catch (error) {
    console.error('Migration v3 failed:', error);
    process.exit(1);
  }
}

migrate();
