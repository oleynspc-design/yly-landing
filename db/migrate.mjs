/**
 * YLY Database Migration Runner
 * Usage: node db/migrate.mjs
 * 
 * Requires DATABASE_URL env variable (from .env.local or env).
 * Reads full-schema.sql and runs it against the Neon database.
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Pool } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not found. Set it in .env.local");
  process.exit(1);
}

console.log("🔌 Connecting to Neon database...");
const pool = new Pool({ connectionString: DATABASE_URL });

// Read the full schema file
const schemaPath = join(__dirname, "full-schema.sql");
const schemaSql = readFileSync(schemaPath, "utf-8");

// Split by semicolons, filter empty/comment-only statements
const statements = schemaSql
  .split(";")
  .map((s) => s.trim())
  .filter((s) => {
    const withoutComments = s.replace(/--.*$/gm, "").trim();
    return withoutComments.length > 0;
  });

console.log(`📄 Found ${statements.length} SQL statements to execute\n`);

let success = 0;
let errors = 0;

for (let i = 0; i < statements.length; i++) {
  const stmt = statements[i];
  const preview = stmt.replace(/\s+/g, " ").slice(0, 80);
  
  try {
    await pool.query(stmt);
    success++;
    console.log(`  ✅ [${i + 1}/${statements.length}] ${preview}...`);
  } catch (err) {
    errors++;
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("already exists") || msg.includes("duplicate key")) {
      success++;
      console.log(`  ⏭️  [${i + 1}/${statements.length}] Already exists (ok): ${preview}...`);
    } else {
      console.error(`  ❌ [${i + 1}/${statements.length}] FAILED: ${preview}...`);
      console.error(`     Error: ${msg}\n`);
    }
  }
}

await pool.end();

console.log(`\n════════════════════════════════════`);
console.log(`✅ Success: ${success}`);
if (errors > success) console.log(`⚠️  Errors: ${errors - (success - success)}`);
console.log(`════════════════════════════════════`);
console.log("🎉 Migration complete!");
