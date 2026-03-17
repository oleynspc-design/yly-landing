import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

// GET - fetch notes for a module/lesson
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const moduleSlug = req.nextUrl.searchParams.get("module");
    const lessonIndex = req.nextUrl.searchParams.get("lesson");
    const sql = getSql();

    if (moduleSlug && lessonIndex !== null) {
      const rows = (await sql`
        SELECT id, content, updated_at
        FROM user_notes
        WHERE user_id = ${user.id}::uuid AND module_slug = ${moduleSlug} AND lesson_index = ${Number(lessonIndex)}
        LIMIT 1
      `) as Record<string, unknown>[];
      return NextResponse.json({ note: rows[0] || null });
    }

    if (moduleSlug) {
      const rows = (await sql`
        SELECT id, lesson_index, content, updated_at
        FROM user_notes
        WHERE user_id = ${user.id}::uuid AND module_slug = ${moduleSlug}
        ORDER BY lesson_index
      `) as Record<string, unknown>[];
      return NextResponse.json({ notes: rows });
    }

    return NextResponse.json({ error: "module param required" }, { status: 400 });
  } catch (error) {
    console.error("Notes GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST - save/update note
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { moduleSlug, lessonIndex, content } = await req.json();
    if (!moduleSlug || lessonIndex === undefined || content === undefined) {
      return NextResponse.json({ error: "moduleSlug, lessonIndex, content required" }, { status: 400 });
    }

    const sql = getSql();
    await sql`
      INSERT INTO user_notes (user_id, module_slug, lesson_index, content, updated_at)
      VALUES (${user.id}::uuid, ${moduleSlug}, ${lessonIndex}, ${content}, NOW())
      ON CONFLICT (user_id, module_slug, lesson_index)
      DO UPDATE SET content = ${content}, updated_at = NOW()
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Notes POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
