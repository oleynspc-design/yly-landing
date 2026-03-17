import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user || (user.role !== "admin" && user.role !== "moderator")) {
      return NextResponse.json({ error: "Brak uprawnień" }, { status: 403 });
    }

    const { id } = await params;

    const sql = getSql();

    // User basic info + training access
    const userResult = (await sql`
      SELECT 
        u.id::text,
        u.email,
        u.full_name,
        u.role,
        u.avatar_url,
        u.created_at,
        u.updated_at,
        u.industry,
        u.onboarding_answers,
        u.ai_profile_summary,
        u.training_path,
        ta.status AS access_status,
        ta.granted_scope AS access_scope,
        ta.unlock_code,
        ta.granted_at,
        ta.source AS access_source
      FROM users u
      LEFT JOIN training_access ta ON ta.user_id = u.id
      WHERE u.id = ${id}::uuid
      LIMIT 1
    `) as Record<string, unknown>[];

    if (userResult.length === 0) {
      return NextResponse.json({ error: "Użytkownik nie znaleziony" }, { status: 404 });
    }

    // Count messages sent by user
    const msgCountResult = (await sql`
      SELECT COUNT(*)::int AS count FROM chat_messages WHERE user_id = ${id}::uuid
    `) as Record<string, number>[];

    // Count sessions
    const sessionCountResult = (await sql`
      SELECT COUNT(*)::int AS count FROM sessions WHERE user_id = ${id}::uuid AND expires_at > NOW()
    `) as Record<string, number>[];

    // Last activity (last message or last session)
    const lastMessageResult = (await sql`
      SELECT created_at FROM chat_messages WHERE user_id = ${id}::uuid ORDER BY created_at DESC LIMIT 1
    `) as Record<string, string>[];

    const profile = userResult[0];

    return NextResponse.json({
      profile: {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        role: profile.role,
        avatarUrl: profile.avatar_url,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
        accessStatus: profile.access_status || "pending",
        accessScope: profile.access_scope || "none",
        unlockCode: profile.unlock_code,
        grantedAt: profile.granted_at,
        accessSource: profile.access_source,
        industry: profile.industry || null,
        onboardingAnswers: profile.onboarding_answers || null,
        aiProfileSummary: profile.ai_profile_summary || null,
        trainingPath: profile.training_path || null,
        stats: {
          messageCount: msgCountResult[0]?.count ?? 0,
          activeSessions: sessionCountResult[0]?.count ?? 0,
          lastMessage: lastMessageResult[0]?.created_at ?? null,
        },
      },
    });
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
