import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

// GET - fetch prompts (public community or user's own)
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const section = req.nextUrl.searchParams.get("section") || "community";
    const category = req.nextUrl.searchParams.get("category");
    const search = req.nextUrl.searchParams.get("q");
    const sql = getSql();

    if (section === "community") {
      let rows: Record<string, unknown>[];
      if (search) {
        rows = (await sql`
          SELECT pl.id, pl.title, pl.content, pl.category, pl.tags, pl.likes, pl.source, pl.created_at,
                 u.full_name AS author_name,
                 EXISTS(SELECT 1 FROM prompt_likes pk WHERE pk.prompt_id = pl.id AND pk.user_id = ${user.id}::uuid) AS user_liked
          FROM prompt_library pl
          JOIN users u ON u.id = pl.user_id
          WHERE pl.is_public = true AND (pl.title ILIKE ${'%' + search + '%'} OR pl.content ILIKE ${'%' + search + '%'})
          ORDER BY pl.likes DESC, pl.created_at DESC
          LIMIT 50
        `) as Record<string, unknown>[];
      } else if (category) {
        rows = (await sql`
          SELECT pl.id, pl.title, pl.content, pl.category, pl.tags, pl.likes, pl.source, pl.created_at,
                 u.full_name AS author_name,
                 EXISTS(SELECT 1 FROM prompt_likes pk WHERE pk.prompt_id = pl.id AND pk.user_id = ${user.id}::uuid) AS user_liked
          FROM prompt_library pl
          JOIN users u ON u.id = pl.user_id
          WHERE pl.is_public = true AND pl.category = ${category}
          ORDER BY pl.likes DESC, pl.created_at DESC
          LIMIT 50
        `) as Record<string, unknown>[];
      } else {
        rows = (await sql`
          SELECT pl.id, pl.title, pl.content, pl.category, pl.tags, pl.likes, pl.source, pl.created_at,
                 u.full_name AS author_name,
                 EXISTS(SELECT 1 FROM prompt_likes pk WHERE pk.prompt_id = pl.id AND pk.user_id = ${user.id}::uuid) AS user_liked
          FROM prompt_library pl
          JOIN users u ON u.id = pl.user_id
          WHERE pl.is_public = true
          ORDER BY pl.likes DESC, pl.created_at DESC
          LIMIT 50
        `) as Record<string, unknown>[];
      }
      return NextResponse.json({ prompts: rows });
    }

    // Personal section
    const rows = (await sql`
      SELECT id, title, content, category, tags, is_public, source, likes, created_at, updated_at
      FROM prompt_library
      WHERE user_id = ${user.id}::uuid
      ORDER BY created_at DESC
      LIMIT 100
    `) as Record<string, unknown>[];
    return NextResponse.json({ prompts: rows });
  } catch (error) {
    console.error("Prompts GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST - create a new prompt
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content, category, tags, isPublic, source } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ error: "title and content required" }, { status: 400 });
    }

    const sql = getSql();
    const rows = (await sql`
      INSERT INTO prompt_library (user_id, title, content, category, tags, is_public, source)
      VALUES (${user.id}::uuid, ${title}, ${content}, ${category || 'general'}, ${tags || []}, ${isPublic || false}, ${source || 'manual'})
      RETURNING id, title, content, category, tags, is_public, source, created_at
    `) as Record<string, unknown>[];

    return NextResponse.json({ prompt: rows[0] });
  } catch (error) {
    console.error("Prompts POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT - update a prompt
export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, title, content, category, tags, isPublic } = await req.json();
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const sql = getSql();
    await sql`
      UPDATE prompt_library
      SET title = COALESCE(${title || null}, title),
          content = COALESCE(${content || null}, content),
          category = COALESCE(${category || null}, category),
          tags = COALESCE(${tags || null}, tags),
          is_public = COALESCE(${isPublic !== undefined ? isPublic : null}, is_public),
          updated_at = NOW()
      WHERE id = ${id}::uuid AND user_id = ${user.id}::uuid
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Prompts PUT error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE - delete a prompt
export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const sql = getSql();
    await sql`DELETE FROM prompt_library WHERE id = ${id}::uuid AND user_id = ${user.id}::uuid`;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Prompts DELETE error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
