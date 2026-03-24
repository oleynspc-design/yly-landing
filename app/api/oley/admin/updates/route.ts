import { NextRequest, NextResponse } from "next/server";
import { getOleyCurrentUser } from "@/lib/oley-auth";
import { getSql } from "@/lib/db";
import { sendProjectUpdateEmail } from "@/lib/oley-email";

export async function GET(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const projectId = req.nextUrl.searchParams.get("projectId");
    if (!projectId) {
      return NextResponse.json({ error: "ID projektu jest wymagane" }, { status: 400 });
    }

    const sql = getSql();
    const updates = await sql`
      SELECT id::text, title, content, notify_client, created_at
      FROM oley_updates
      WHERE project_id = ${projectId}::uuid
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ updates });
  } catch (err) {
    console.error("Oley admin updates error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const { projectId, title, content, notifyClient, newProgress, newStatus } = await req.json();

    if (!projectId || !title) {
      return NextResponse.json({ error: "ID projektu i tytuł są wymagane" }, { status: 400 });
    }

    const sql = getSql();

    // Create update
    await sql`
      INSERT INTO oley_updates (project_id, title, content, notify_client)
      VALUES (${projectId}::uuid, ${title}, ${content || null}, ${!!notifyClient})
    `;

    // Update project progress/status if provided
    if (newProgress !== undefined || newStatus) {
      const updates: string[] = [];
      if (newProgress !== undefined) updates.push("progress updated");
      if (newStatus) updates.push("status updated");

      if (newProgress !== undefined && newStatus) {
        await sql`UPDATE oley_projects SET progress = ${newProgress}, status = ${newStatus}, updated_at = NOW() WHERE id = ${projectId}::uuid`;
      } else if (newProgress !== undefined) {
        await sql`UPDATE oley_projects SET progress = ${newProgress}, updated_at = NOW() WHERE id = ${projectId}::uuid`;
      } else if (newStatus) {
        await sql`UPDATE oley_projects SET status = ${newStatus}, updated_at = NOW() WHERE id = ${projectId}::uuid`;
      }
    } else {
      await sql`UPDATE oley_projects SET updated_at = NOW() WHERE id = ${projectId}::uuid`;
    }

    // Send email notification if requested
    if (notifyClient) {
      const projectRows = await sql`
        SELECT p.title, u.email, u.full_name
        FROM oley_projects p
        INNER JOIN oley_users u ON u.id = p.client_id
        WHERE p.id = ${projectId}::uuid
      `;
      if (projectRows.length > 0) {
        const p = projectRows[0] as { title: string; email: string; full_name: string };
        await sendProjectUpdateEmail(p.email, p.full_name, p.title, title, content || null);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Oley create update error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
