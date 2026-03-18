import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

type Row = Record<string, unknown>;

// GET — load completed days
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const sql = getSql();

    // Try to read planner_completed_days from users table
    let completedDays: number[] = [];
    try {
      const rows = (await sql`
        SELECT planner_completed_days FROM users WHERE id = ${user.id}::uuid LIMIT 1
      `) as Row[];
      if (rows[0]?.planner_completed_days) {
        completedDays = rows[0].planner_completed_days as number[];
      }
    } catch {
      // Column might not exist yet — create it
      try {
        await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS planner_completed_days jsonb DEFAULT '[]'::jsonb`;
      } catch { /* ignore */ }
    }

    return NextResponse.json({ completedDays });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Błąd serwera";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST — save completed days
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const sql = getSql();
    const { completedDays } = await req.json();

    if (!Array.isArray(completedDays)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Ensure column exists
    try {
      await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS planner_completed_days jsonb DEFAULT '[]'::jsonb`;
    } catch { /* ignore */ }

    await sql`
      UPDATE users SET planner_completed_days = ${JSON.stringify(completedDays)}::jsonb
      WHERE id = ${user.id}::uuid
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Błąd serwera";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
