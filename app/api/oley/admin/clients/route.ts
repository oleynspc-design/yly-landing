import { NextRequest, NextResponse } from "next/server";
import { getOleyCurrentUser, createOleyClient, resetOleyClientPassword } from "@/lib/oley-auth";
import { getSql } from "@/lib/db";
import { sendClientCredentialsEmail } from "@/lib/oley-email";

export async function GET() {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const sql = getSql();
    const clients = await sql`
      SELECT
        u.id::text, u.email, u.full_name, u.company, u.phone, u.notes,
        u.created_at,
        COUNT(p.id) AS project_count,
        MAX(p.updated_at) AS last_project_update
      FROM oley_users u
      LEFT JOIN oley_projects p ON p.client_id = u.id
      WHERE u.role = 'client'
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `;

    return NextResponse.json({ clients });
  } catch (err) {
    console.error("Oley admin clients error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const body = await req.json();
    const { email, fullName, company, phone, notes, sendEmail } = body;

    if (!email || !fullName) {
      return NextResponse.json({ error: "Email i imię są wymagane" }, { status: 400 });
    }

    const { user: client, plainPassword } = await createOleyClient({
      email,
      fullName,
      company,
      phone,
      notes,
    });

    if (sendEmail) {
      await sendClientCredentialsEmail(client.email, client.full_name, plainPassword);
    }

    return NextResponse.json({
      client,
      password: plainPassword,
      emailSent: !!sendEmail,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Błąd serwera";
    if (message.includes("unique") || message.includes("duplicate")) {
      return NextResponse.json({ error: "Klient z tym adresem email już istnieje" }, { status: 409 });
    }
    console.error("Oley create client error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const { clientId, action } = await req.json();

    if (action === "reset-password") {
      const newPassword = await resetOleyClientPassword(clientId);
      return NextResponse.json({ password: newPassword });
    }

    return NextResponse.json({ error: "Nieznana akcja" }, { status: 400 });
  } catch (err) {
    console.error("Oley update client error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const { clientId } = await req.json();
    const sql = getSql();

    await sql`DELETE FROM oley_users WHERE id = ${clientId}::uuid AND role = 'client'`;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Oley delete client error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
