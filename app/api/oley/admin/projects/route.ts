import { NextRequest, NextResponse } from "next/server";
import { getOleyCurrentUser } from "@/lib/oley-auth";
import { getSql } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const clientId = req.nextUrl.searchParams.get("clientId");
    const sql = getSql();

    let projects;
    if (clientId) {
      projects = await sql`
        SELECT
          p.id::text, p.title, p.description, p.status, p.progress, p.deadline, p.budget,
          p.created_at, p.updated_at,
          u.full_name AS client_name, u.email AS client_email, u.company AS client_company,
          (SELECT COUNT(*) FROM oley_updates ou WHERE ou.project_id = p.id) AS update_count,
          (SELECT COUNT(*) FROM oley_messages om WHERE om.project_id = p.id) AS message_count
        FROM oley_projects p
        INNER JOIN oley_users u ON u.id = p.client_id
        WHERE p.client_id = ${clientId}::uuid
        ORDER BY p.created_at DESC
      `;
    } else {
      projects = await sql`
        SELECT
          p.id::text, p.title, p.description, p.status, p.progress, p.deadline, p.budget,
          p.created_at, p.updated_at,
          u.full_name AS client_name, u.email AS client_email, u.company AS client_company,
          (SELECT COUNT(*) FROM oley_updates ou WHERE ou.project_id = p.id) AS update_count,
          (SELECT COUNT(*) FROM oley_messages om WHERE om.project_id = p.id) AS message_count
        FROM oley_projects p
        INNER JOIN oley_users u ON u.id = p.client_id
        ORDER BY p.updated_at DESC
      `;
    }

    return NextResponse.json({ projects });
  } catch (err) {
    console.error("Oley admin projects error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const { clientId, title, description, deadline, budget } = await req.json();

    if (!clientId || !title) {
      return NextResponse.json({ error: "Klient i tytuł są wymagane" }, { status: 400 });
    }

    const sql = getSql();
    const rows = await sql`
      INSERT INTO oley_projects (client_id, title, description, deadline, budget)
      VALUES (${clientId}::uuid, ${title}, ${description || null}, ${deadline || null}, ${budget || null})
      RETURNING id::text, title, status, progress, created_at
    `;

    return NextResponse.json({ project: rows[0] });
  } catch (err) {
    console.error("Oley create project error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const { projectId, title, description, status, progress, deadline, budget } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: "ID projektu jest wymagane" }, { status: 400 });
    }

    const sql = getSql();
    await sql`
      UPDATE oley_projects SET
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        status = COALESCE(${status}, status),
        progress = COALESCE(${progress !== undefined ? progress : null}, progress),
        deadline = COALESCE(${deadline}, deadline),
        budget = COALESCE(${budget}, budget),
        updated_at = NOW()
      WHERE id = ${projectId}::uuid
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Oley update project error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const { projectId } = await req.json();
    const sql = getSql();
    await sql`DELETE FROM oley_projects WHERE id = ${projectId}::uuid`;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Oley delete project error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
