import { NextResponse } from "next/server";
import { getOleyCurrentUser } from "@/lib/oley-auth";
import { getSql } from "@/lib/db";

export async function GET() {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "client") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const sql = getSql();
    const projects = await sql`
      SELECT
        p.id::text, p.title, p.description, p.status, p.progress, p.deadline, p.budget,
        p.created_at, p.updated_at,
        (SELECT COUNT(*) FROM oley_updates ou WHERE ou.project_id = p.id) AS update_count,
        (SELECT COUNT(*) FROM oley_messages om WHERE om.project_id = p.id) AS message_count
      FROM oley_projects p
      WHERE p.client_id = ${user.id}::uuid
      ORDER BY p.updated_at DESC
    `;

    return NextResponse.json({ projects });
  } catch (err) {
    console.error("Oley client projects error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
