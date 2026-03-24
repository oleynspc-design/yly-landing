import { NextRequest, NextResponse } from "next/server";
import { getOleyCurrentUser } from "@/lib/oley-auth";
import { getSql } from "@/lib/db";
import { forwardClientMessageToAdmin } from "@/lib/oley-email";

export async function GET(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "client") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const projectId = req.nextUrl.searchParams.get("projectId");
    if (!projectId) {
      return NextResponse.json({ error: "ID projektu jest wymagane" }, { status: 400 });
    }

    const sql = getSql();

    // Verify ownership
    const ownership = await sql`
      SELECT id FROM oley_projects WHERE id = ${projectId}::uuid AND client_id = ${user.id}::uuid
    `;
    if (ownership.length === 0) {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const messages = await sql`
      SELECT
        m.id::text, m.content, m.is_from_client, m.created_at,
        u.full_name AS sender_name
      FROM oley_messages m
      INNER JOIN oley_users u ON u.id = m.sender_id
      WHERE m.project_id = ${projectId}::uuid
      ORDER BY m.created_at ASC
    `;

    return NextResponse.json({ messages });
  } catch (err) {
    console.error("Oley client messages error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "client") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const { projectId, content } = await req.json();
    if (!projectId || !content) {
      return NextResponse.json({ error: "Treść i projekt są wymagane" }, { status: 400 });
    }

    const sql = getSql();

    // Verify ownership
    const ownership = await sql`
      SELECT p.id, p.title FROM oley_projects p WHERE p.id = ${projectId}::uuid AND p.client_id = ${user.id}::uuid
    `;
    if (ownership.length === 0) {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    await sql`
      INSERT INTO oley_messages (project_id, sender_id, content, is_from_client)
      VALUES (${projectId}::uuid, ${user.id}::uuid, ${content}, true)
    `;

    // Forward to admin email
    const project = ownership[0] as { title: string };
    await forwardClientMessageToAdmin(
      user.email,
      user.full_name,
      project.title,
      content
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Oley client message error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
