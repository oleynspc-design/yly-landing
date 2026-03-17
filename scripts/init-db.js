const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

require('dotenv').config({ path: '.env.local' });

async function init() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("❌ BŁĄD: Brak DATABASE_URL w .env.local");
    process.exit(1);
  }

  console.log("Łączenie z bazą...");
  const sql = neon(dbUrl);

  try {
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log("Wykonywanie schematu z db/schema.sql...");
    
    // Neon serwerless nie obsługuje wykonywania wielu zapytań rozdzielonych średnikiem w jednym wywołaniu tak prosto.
    // Dzielimy je po średniku:
    const statements = schema.split(';').filter(stmt => stmt.trim() !== '');

    for (const statement of statements) {
      if (statement.trim()) {
        await sql.query(statement.trim());
      }
    }

    console.log("✅ Baza danych zainicjalizowana pomyślnie!");
  } catch (error) {
    console.error("❌ BŁĄD PODCZAS INICJALIZACJI BAZY:");
    console.error(error);
  }
}

init();
