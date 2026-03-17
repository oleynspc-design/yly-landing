import { Pool } from "@neondatabase/serverless";
import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const { rows } = await pool.query(`
  SELECT table_name 
  FROM information_schema.tables 
  WHERE table_schema = 'public' 
  ORDER BY table_name
`);

console.log("📋 Tables in database:");
rows.forEach((r) => console.log(`  ✅ ${r.table_name}`));
console.log(`\nTotal: ${rows.length} tables`);

// Check products seed
const products = await pool.query("SELECT slug, name, price_pln FROM products ORDER BY price_pln");
console.log("\n🛒 Products:");
products.rows.forEach((p) => console.log(`  ${p.slug}: ${p.name} — ${p.price_pln / 100} PLN`));

// Check chat channel seed
const channels = await pool.query("SELECT slug, name FROM chat_channels");
console.log("\n💬 Chat channels:");
channels.rows.forEach((c) => console.log(`  ${c.slug}: ${c.name}`));

// Check user count
const users = await pool.query("SELECT COUNT(*) AS count FROM users");
console.log(`\n👤 Users: ${users.rows[0].count}`);

await pool.end();
