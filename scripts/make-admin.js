const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function makeAdmin() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("❌ BŁĄD: Brak DATABASE_URL w .env.local");
    process.exit(1);
  }

  const email = process.argv[2];
  if (!email) {
    console.error("❌ BŁĄD: Musisz podać adres e-mail.");
    console.error("Użycie: node scripts/make-admin.js TWOJ_EMAIL");
    process.exit(1);
  }

  const sql = neon(dbUrl);

  try {
    const result = await sql.query(`
      UPDATE users
      SET role = 'admin'
      WHERE email = $1
      RETURNING id, email, full_name, role;
    `, [email]);

    if (result.length > 0) {
      console.log(`✅ Użytkownik ${result[0].email} ma teraz uprawnienia administratora.`);
    } else {
      console.error(`❌ Nie znaleziono użytkownika z e-mailem ${email}. Zarejestruj się najpierw na stronie.`);
    }
  } catch (error) {
    console.error("❌ Błąd:", error);
  }
}

makeAdmin();
