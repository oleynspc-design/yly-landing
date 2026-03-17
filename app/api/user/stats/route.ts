import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { getLevelForXp, getNextLevel, getXpProgress } from "@/lib/levels";

interface UserStats {
  xp: number;
  level: number;
}

interface CertRow {
  id: string;
  type: string;
  title: string;
  description: string | null;
  score: number | null;
  max_score: number | null;
  issued_at: string;
  downloadable: boolean;
}

interface XpLogRow {
  amount: number;
  source: string;
  description: string | null;
  created_at: string;
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
    }

    const sql = getSql();

    // Get user XP and level
    const userRows = (await sql`
      SELECT xp, level FROM users WHERE id = ${user.id}::uuid LIMIT 1
    `) as UserStats[];

    const xp = userRows[0]?.xp ?? 0;

    const levelInfo = getLevelForXp(xp);
    const nextLevelInfo = getNextLevel(levelInfo.level);
    const progress = getXpProgress(xp);

    // Get certificates
    const certificates = (await sql`
      SELECT id::text, type, title, description, score, max_score, issued_at, downloadable
      FROM certificates
      WHERE user_id = ${user.id}::uuid
      ORDER BY issued_at DESC
    `) as CertRow[];

    // Get recent XP log
    const xpLog = (await sql`
      SELECT amount, source, description, created_at
      FROM xp_log
      WHERE user_id = ${user.id}::uuid
      ORDER BY created_at DESC
      LIMIT 20
    `) as XpLogRow[];

    return NextResponse.json({
      xp,
      level: levelInfo.level,
      levelName: levelInfo.name,
      levelColor: levelInfo.color,
      nextLevel: nextLevelInfo ? {
        level: nextLevelInfo.level,
        name: nextLevelInfo.name,
        xpNeeded: nextLevelInfo.minXp,
      } : null,
      progress,
      certificates,
      xpLog,
    });
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
