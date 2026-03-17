// Migration v4: Add products, orders, and access_codes tables
require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");

async function main() {
  const sql = neon(process.env.DATABASE_URL);

  // Products table
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      price_pln INTEGER NOT NULL,
      stripe_price_id TEXT,
      type TEXT NOT NULL DEFAULT 'course' CHECK (type IN ('course', 'ebook', 'prompts', 'subscription', 'bundle')),
      scope TEXT NOT NULL DEFAULT 'all',
      active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log("✅ products table created");

  // Orders table
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id UUID NOT NULL REFERENCES products(id),
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
      amount INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'pln',
      stripe_session_id TEXT UNIQUE,
      stripe_payment_intent TEXT,
      access_code TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log("✅ orders table created");

  // Access codes table (universal reusable codes, not tied to a user)
  await sql`
    CREATE TABLE IF NOT EXISTS access_codes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      code TEXT NOT NULL UNIQUE,
      product_id UUID REFERENCES products(id),
      scope TEXT NOT NULL DEFAULT 'all',
      max_uses INTEGER NOT NULL DEFAULT 1,
      times_used INTEGER NOT NULL DEFAULT 0,
      active BOOLEAN NOT NULL DEFAULT true,
      created_by UUID REFERENCES users(id),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ
    );
  `;
  console.log("✅ access_codes table created");

  // Indexes
  await sql`CREATE INDEX IF NOT EXISTS orders_user_idx ON orders(user_id);`;
  await sql`CREATE INDEX IF NOT EXISTS orders_stripe_session_idx ON orders(stripe_session_id);`;
  await sql`CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);`;
  await sql`CREATE INDEX IF NOT EXISTS access_codes_code_idx ON access_codes(code);`;
  console.log("✅ indexes created");

  // Insert default products
  await sql`
    INSERT INTO products (slug, name, description, price_pln, type, scope)
    VALUES 
      ('kurs-ai-podstawy', 'Kurs AI: Inżynieria Promptów', 'Kompletny kurs inżynierii promptów — 4 semestry, 10 lekcji, egzamin certyfikujący. Naucz się tworzyć skuteczne prompty dla ChatGPT, Claude i innych narzędzi AI.', 19900, 'course', 'all'),
      ('kurs-ai-workflows', 'Kurs AI: Automatyzacja i Workflows', 'Zaawansowany kurs automatyzacji procesów z AI — budowanie workflow, integracje z narzędziami, praktyczne projekty.', 24900, 'course', 'all'),
      ('pakiet-kompletny', 'Pakiet Kompletny YLY', 'Wszystkie kursy + e-booki + kolekcje promptów + dostęp do społeczności premium. Najlepsza wartość!', 39900, 'bundle', 'all'),
      ('ebook-prompty-biznes', 'E-book: Prompty dla Biznesu', 'Zbiór 100+ profesjonalnych promptów do zastosowań biznesowych — marketing, sprzedaż, analityka, HR.', 4900, 'ebook', 'all'),
      ('kolekcja-promptow-pro', 'Kolekcja Promptów PRO', 'Zestaw 200+ przetestowanych promptów do ChatGPT, Claude, Midjourney, DALL-E i innych narzędzi AI.', 7900, 'prompts', 'all')
    ON CONFLICT (slug) DO NOTHING;
  `;
  console.log("✅ default products inserted");

  console.log("\n🎉 Migration v4 complete!");
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
