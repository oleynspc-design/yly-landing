import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_pln: number;
  type: string;
}

export async function GET() {
  try {
    const sql = getSql();
    const products = (await sql`
      SELECT id::text, slug, name, description, price_pln, type
      FROM products
      WHERE active = true
      ORDER BY price_pln ASC
    `) as ProductRow[];

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
