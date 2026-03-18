import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

type Row = Record<string, unknown>;

// GET — list meetings (admin = ALL with user details, user = own)
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const sql = getSql();
    const isAdmin = user.role === "admin";

    // Admin sees ALL meetings with user info; user sees only their own
    const meetings = isAdmin
      ? ((await sql`
          SELECT m.id::text, m.scheduled_at, m.duration_minutes, m.status, m.notes, m.meeting_url,
                 adm.full_name AS admin_name,
                 cl.full_name AS user_name, cl.email AS user_email
          FROM meetings m
          LEFT JOIN users adm ON adm.id = m.admin_id
          LEFT JOIN users cl ON cl.id = m.user_id
          ORDER BY m.scheduled_at ASC
        `) as Row[])
      : ((await sql`
          SELECT m.id::text, m.scheduled_at, m.duration_minutes, m.status, m.notes, m.meeting_url,
                 u.full_name AS admin_name
          FROM meetings m
          LEFT JOIN users u ON u.id = m.admin_id
          WHERE m.user_id = ${user.id}::uuid
          ORDER BY m.scheduled_at DESC
        `) as Row[]);

    // All scheduled meetings for calendar (to show booked slots to everyone)
    const allBooked = (await sql`
      SELECT scheduled_at FROM meetings WHERE status = 'scheduled'
    `) as Row[];

    // Get meeting credits
    let credits = { total: 0, used: 0, remaining: 0 };
    if (!isAdmin) {
      try {
        const creditRows = (await sql`
          SELECT COALESCE(SUM(total), 0) AS total, COALESCE(SUM(used), 0) AS used
          FROM meeting_credits WHERE user_id = ${user.id}::uuid
        `) as Row[];
        if (creditRows[0]) {
          const t = Number(creditRows[0].total);
          const u = Number(creditRows[0].used);
          credits = { total: t, used: u, remaining: t - u };
        }
      } catch { /* table might not exist yet */ }
    } else {
      // Admin has unlimited credits
      credits = { total: 999, used: 0, remaining: 999 };
    }

    // Get package type
    let packageType = isAdmin ? "premium" : "basic";
    if (!isAdmin) {
      try {
        const pkgRows = (await sql`
          SELECT package_type FROM training_access WHERE user_id = ${user.id}::uuid LIMIT 1
        `) as Row[];
        if (pkgRows[0]?.package_type) packageType = pkgRows[0].package_type as string;
      } catch { /* column might not exist */ }
    }

    // Return user list for admin to pick employee when booking
    let userList: { id: string; full_name: string; email: string }[] = [];
    if (isAdmin) {
      const userRows = (await sql`
        SELECT u.id::text, u.full_name, u.email
        FROM users u
        ORDER BY u.full_name ASC
      `) as Row[];
      userList = userRows.map((r) => ({
        id: r.id as string,
        full_name: r.full_name as string,
        email: r.email as string,
      }));
    }

    return NextResponse.json({
      meetings,
      credits,
      packageType,
      role: user.role,
      allBooked: allBooked.map((r) => r.scheduled_at),
      ...(isAdmin ? { userList } : {}),
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Błąd serwera";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST — book a meeting
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const sql = getSql();
    const { scheduledAt, notes, userId: targetUserId } = await req.json();
    const isAdmin = user.role === "admin";

    if (!scheduledAt) {
      return NextResponse.json({ error: "Wybierz termin spotkania" }, { status: 400 });
    }

    // Check meeting credits (admins bypass)
    if (!isAdmin) {
      const creditRows = (await sql`
        SELECT COALESCE(SUM(total), 0) AS total, COALESCE(SUM(used), 0) AS used
        FROM meeting_credits WHERE user_id = ${user.id}::uuid
      `) as Row[];
      const total = Number(creditRows[0]?.total ?? 0);
      const used = Number(creditRows[0]?.used ?? 0);

      if (total - used <= 0) {
        return NextResponse.json({ error: "Brak dostępnych spotkań. Kup pakiet Premium lub dodatkowe spotkanie." }, { status: 403 });
      }
    }

    // Check if slot is already taken
    const dateObj = new Date(scheduledAt);
    const existing = (await sql`
      SELECT id FROM meetings 
      WHERE scheduled_at = ${dateObj.toISOString()}::timestamptz
        AND status = 'scheduled'
      LIMIT 1
    `) as Row[];

    if (existing.length > 0) {
      return NextResponse.json({ error: "Ten termin jest już zajęty. Wybierz inny." }, { status: 409 });
    }

    // Find an admin to assign
    const admins = (await sql`SELECT id::text FROM users WHERE role = 'admin' LIMIT 1`) as Row[];
    const adminId = (admins[0]?.id as string) ?? null;

    // Determine the meeting participant
    const meetingUserId = isAdmin && targetUserId ? targetUserId : user.id;

    // Book the meeting
    await sql`
      INSERT INTO meetings (user_id, admin_id, scheduled_at, duration_minutes, notes)
      VALUES (${meetingUserId}::uuid, ${adminId}::uuid, ${dateObj.toISOString()}::timestamptz, 90, ${notes || null})
    `;

    // Decrement credits (not for admin, and not when admin books on behalf)
    if (!isAdmin) {
      await sql`
        UPDATE meeting_credits SET used = used + 1, updated_at = NOW()
        WHERE user_id = ${user.id}::uuid AND used < total
      `;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Błąd serwera";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
