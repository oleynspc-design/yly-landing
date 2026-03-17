import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

interface UpdateResult {
  user_id: string;
}

interface AccessCodeRow {
  id: string;
  scope: string;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
    }

    const body = await req.json();
    const code = typeof body.code === "string" ? body.code.trim() : "";

    if (!code) {
      return NextResponse.json({ error: "Podaj kod dostępu." }, { status: 400 });
    }

    const sql = getSql();

    // 1. Try user-specific code (training_access.unlock_code)
    const rows = (await sql`
      UPDATE training_access
      SET 
        status = 'granted',
        granted_scope = 'all',
        granted_at = NOW(),
        updated_at = NOW(),
        unlock_code = NULL
      WHERE unlock_code = ${code} AND user_id = ${user.id}::uuid
      RETURNING user_id;
    `) as UpdateResult[];

    if (rows.length > 0) {
      return NextResponse.json({ ok: true, redirectTo: "/szkolenie" });
    }

    // 2. Try universal code (access_codes table)
    const universalCodes = (await sql`
      SELECT id::text, scope FROM access_codes
      WHERE code = ${code}
        AND active = true
        AND times_used < max_uses
        AND (expires_at IS NULL OR expires_at > NOW())
      LIMIT 1
    `) as AccessCodeRow[];

    if (universalCodes.length > 0) {
      const ac = universalCodes[0];

      // Increment usage
      await sql`
        UPDATE access_codes SET times_used = times_used + 1 WHERE id = ${ac.id}::uuid
      `;

      // Grant access
      await sql`
        INSERT INTO training_access (user_id, status, granted_scope, source, granted_at, updated_at)
        VALUES (${user.id}::uuid, 'granted', ${ac.scope}, 'universal_code', NOW(), NOW())
        ON CONFLICT (user_id) DO UPDATE
        SET status = 'granted',
            granted_scope = ${ac.scope},
            source = 'universal_code',
            granted_at = NOW(),
            updated_at = NOW()
      `;

      return NextResponse.json({ ok: true, redirectTo: "/szkolenie" });
    }

    return NextResponse.json(
      { error: "Nieprawidłowy lub wykorzystany kod dostępu." },
      { status: 400 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
