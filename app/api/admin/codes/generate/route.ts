import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { randomBytes } from "crypto";

const PACKAGE_MEETING_CREDITS: Record<string, number> = {
  basic: 0,
  pro: 1,
  premium: 3,
};

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak uprawnień" }, { status: 403 });
    }

    const body = await req.json();
    const userId = typeof body.userId === "string" ? body.userId : null;
    const packageType = typeof body.packageType === "string" ? body.packageType : "basic";

    if (!userId) {
      return NextResponse.json({ error: "Wymagane ID użytkownika" }, { status: 400 });
    }

    const sql = getSql();
    const code = randomBytes(4).toString("hex").toUpperCase();

    // Generate code with package type
    await sql`
      INSERT INTO training_access (user_id, unlock_code, status, granted_scope, package_type)
      VALUES (${userId}::uuid, ${code}, 'pending', 'none', ${packageType})
      ON CONFLICT (user_id) DO UPDATE
      SET unlock_code = ${code}, status = 'pending', granted_scope = 'none', package_type = ${packageType}
    `;

    // Pre-assign meeting credits based on package (activated on code redeem)
    const meetingCredits = PACKAGE_MEETING_CREDITS[packageType] || 0;
    if (meetingCredits > 0) {
      await sql`
        INSERT INTO meeting_credits (user_id, total, used, source)
        VALUES (${userId}::uuid, ${meetingCredits}, 0, ${`package_${packageType}`})
        ON CONFLICT DO NOTHING
      `;
    }

    return NextResponse.json({ ok: true, code, packageType, meetingCredits });
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
