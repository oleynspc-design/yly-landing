import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { grantXp } from "@/lib/xp";
import { XP_REWARDS } from "@/lib/levels";

// GET - fetch user progress for a module (or all)
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const moduleSlug = req.nextUrl.searchParams.get("module");
    const sql = getSql();

    if (moduleSlug) {
      const rows = (await sql`
        SELECT module_slug, lesson_index, completed, completed_at
        FROM user_progress
        WHERE user_id = ${user.id}::uuid AND module_slug = ${moduleSlug}
        ORDER BY lesson_index
      `) as Record<string, unknown>[];
      return NextResponse.json({ progress: rows });
    }

    // All modules progress
    const rows = (await sql`
      SELECT module_slug, lesson_index, completed, completed_at
      FROM user_progress
      WHERE user_id = ${user.id}::uuid
      ORDER BY module_slug, lesson_index
    `) as Record<string, unknown>[];
    return NextResponse.json({ progress: rows });
  } catch (error) {
    console.error("Progress GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST - mark lesson as completed
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { moduleSlug, lessonIndex } = await req.json();
    if (!moduleSlug || lessonIndex === undefined) {
      return NextResponse.json({ error: "moduleSlug and lessonIndex required" }, { status: 400 });
    }

    const sql = getSql();
    await sql`
      INSERT INTO user_progress (user_id, module_slug, lesson_index, completed, completed_at)
      VALUES (${user.id}::uuid, ${moduleSlug}, ${lessonIndex}, true, NOW())
      ON CONFLICT (user_id, module_slug, lesson_index)
      DO UPDATE SET completed = true, completed_at = NOW()
    `;

    // Grant XP for lesson completion
    grantXp(user.id, XP_REWARDS.COMPLETE_LESSON, "lesson", `Completed ${moduleSlug} lesson ${lessonIndex}`).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Progress POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
