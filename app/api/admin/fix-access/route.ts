import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { action, userId, packageType } = body;
  const sql = getSql();

  if (action === "ensure-rows") {
    // Create training_access rows for all users who don't have one
    // Sets them to pending/none (demo mode)
    await sql`
      INSERT INTO training_access (user_id, status, granted_scope)
      SELECT id, 'pending', 'none'
      FROM users
      WHERE id NOT IN (SELECT user_id FROM training_access)
    `;

    return NextResponse.json({ ok: true, message: "Created missing training_access rows with demo status" });
  }

  if (action === "reset-all-to-demo") {
    // Reset ALL non-admin users to demo mode
    await sql`
      UPDATE training_access
      SET status = 'pending', granted_scope = 'none', updated_at = NOW()
      WHERE user_id IN (
        SELECT id FROM users WHERE role != 'admin'
      )
    `;

    return NextResponse.json({ ok: true, message: "All non-admin users reset to demo mode" });
  }

  if (action === "grant-single") {
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    const pkg = packageType || "pro";

    await sql`
      INSERT INTO training_access (user_id, status, granted_scope, package_type, source, granted_at, updated_at)
      VALUES (${userId}::uuid, 'granted', 'all', ${pkg}, 'admin_quick_grant', NOW(), NOW())
      ON CONFLICT (user_id) DO UPDATE
      SET status = 'granted', granted_scope = 'all', package_type = ${pkg}, source = 'admin_quick_grant', granted_at = NOW(), updated_at = NOW()
    `;

    return NextResponse.json({ ok: true, message: `User ${userId} granted ${pkg} access` });
  }

  if (action === "grant-all-access") {
    // Grant full access to all users (for testing or promo)
    await sql`
      UPDATE training_access
      SET status = 'granted', granted_scope = 'all', updated_at = NOW()
    `;

    return NextResponse.json({ ok: true, message: "All users granted full access" });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
