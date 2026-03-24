import { NextRequest, NextResponse } from "next/server";
import { getOleyCurrentUser } from "@/lib/oley-auth";
import { getSql } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const projectId = req.nextUrl.searchParams.get("projectId");
    const sql = getSql();

    let messages;
    if (projectId) {
      messages = await sql`
        SELECT
          m.id::text, m.content, m.is_from_client, m.created_at,
          u.full_name AS sender_name, u.email AS sender_email
        FROM oley_messages m
        INNER JOIN oley_users u ON u.id = m.sender_id
        WHERE m.project_id = ${projectId}::uuid
        ORDER BY m.created_at ASC
      `;
    } else {
      messages = await sql`
        SELECT
          m.id::text, m.content, m.is_from_client, m.created_at,
          u.full_name AS sender_name, u.email AS sender_email,
          p.title AS project_title
        FROM oley_messages m
        INNER JOIN oley_users u ON u.id = m.sender_id
        INNER JOIN oley_projects p ON p.id = m.project_id
        WHERE m.is_from_client = true
        ORDER BY m.created_at DESC
        LIMIT 50
      `;
    }

    return NextResponse.json({ messages });
  } catch (err) {
    console.error("Oley admin messages error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const { projectId, content } = await req.json();
    if (!projectId || !content) {
      return NextResponse.json({ error: "Treść i projekt są wymagane" }, { status: 400 });
    }

    const sql = getSql();
    await sql`
      INSERT INTO oley_messages (project_id, sender_id, content, is_from_client)
      VALUES (${projectId}::uuid, ${user.id}::uuid, ${content}, false)
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Oley admin message error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
