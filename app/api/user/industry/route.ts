import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const sql = getSql();
    const rows = (await sql`SELECT industry FROM users WHERE id = ${user.id}::uuid LIMIT 1`) as { industry: string | null }[];
    return NextResponse.json({ industry: rows[0]?.industry || null });
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const { industry } = await req.json();
    if (!industry || typeof industry !== "string" || industry.trim().length < 2) {
      return NextResponse.json({ error: "Podaj branżę" }, { status: 400 });
    }

    const sql = getSql();
    await sql`UPDATE users SET industry = ${industry.trim()} WHERE id = ${user.id}::uuid`;

    return NextResponse.json({ ok: true, industry: industry.trim() });
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
