import { NextRequest, NextResponse } from "next/server";
import { getOleyCurrentUser } from "@/lib/oley-auth";
import { getSql } from "@/lib/db";

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

    // Verify client owns this project
    const ownership = await sql`
      SELECT id FROM oley_projects WHERE id = ${projectId}::uuid AND client_id = ${user.id}::uuid
    `;
    if (ownership.length === 0) {
      return NextResponse.json({ error: "Brak dostępu do tego projektu" }, { status: 403 });
    }

    const updates = await sql`
      SELECT id::text, title, content, created_at
      FROM oley_updates
      WHERE project_id = ${projectId}::uuid
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ updates });
  } catch (err) {
    console.error("Oley client updates error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
