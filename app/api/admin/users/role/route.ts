import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak uprawnień" }, { status: 403 });
    }

    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json({ error: "Brak wymaganych danych" }, { status: 400 });
    }

    const validRoles = ["user", "admin", "moderator"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Nieprawidłowa rola" }, { status: 400 });
    }

    // Prevent admin from changing their own role
    if (userId === user.id) {
      return NextResponse.json({ error: "Nie możesz zmienić swojej własnej roli" }, { status: 400 });
    }

    const sql = getSql();

    const result = (await sql`
      UPDATE users SET role = ${role}, updated_at = NOW()
      WHERE id = ${userId}::uuid
      RETURNING id::text, email, full_name, role
    `) as Record<string, unknown>[];

    if (result.length === 0) {
      return NextResponse.json({ error: "Użytkownik nie znaleziony" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: result[0] });
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
