import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

interface UserWithAccessRow {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  status: string | null;
  granted_scope: string | null;
  unlock_code: string | null;
  package_type: string | null;
  last_active: string | null;
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || (user.role !== "admin" && user.role !== "moderator")) {
      return NextResponse.json({ error: "Brak uprawnień" }, { status: 403 });
    }

    const sql = getSql();

    const result = await sql`
      SELECT 
        u.id, 
        u.email, 
        u.full_name, 
        u.role, 
        u.created_at,
        u.last_active,
        ta.status, 
        ta.granted_scope, 
        ta.unlock_code,
        ta.package_type
      FROM users u
      LEFT JOIN training_access ta ON ta.user_id = u.id
      ORDER BY u.created_at DESC
      LIMIT 100;
    `;

    return NextResponse.json({ users: result as UserWithAccessRow[] });
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
