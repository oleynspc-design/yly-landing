import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { getLevelForXp } from "@/lib/levels";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Single query: fetch XP/level + package type in one JOIN
  let xp = 0;
  let level = 1;
  let levelName = "Nowicjusz";
  let levelColor = "#6b7280";
  let packageType = "basic";
  try {
    const sql = getSql();
    const rows = (await sql`
      SELECT u.xp, u.level, ta.package_type
      FROM users u
      LEFT JOIN training_access ta ON ta.user_id = u.id
      WHERE u.id = ${user.id}::uuid
      LIMIT 1
    `) as { xp: number; level: number; package_type: string | null }[];
    if (rows.length > 0) {
      xp = rows[0].xp;
      const info = getLevelForXp(xp);
      level = info.level;
      levelName = info.name;
      levelColor = info.color;
      if (rows[0].package_type) packageType = rows[0].package_type;
    }
  } catch { /* ignore */ }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatarUrl: user.avatarUrl,
      trainingAccessStatus: user.trainingAccessStatus,
      trainingAccessScope: user.trainingAccessScope,
      packageType,
      xp,
      level,
      levelName,
      levelColor,
    },
  });
}
