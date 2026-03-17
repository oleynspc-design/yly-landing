import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { promptId } = await req.json();
    if (!promptId) return NextResponse.json({ error: "promptId required" }, { status: 400 });

    const sql = getSql();

    // Toggle like
    const existing = await sql`
      SELECT 1 FROM prompt_likes WHERE user_id = ${user.id}::uuid AND prompt_id = ${promptId}::uuid
    `;

    if ((existing as unknown[]).length > 0) {
      await sql`DELETE FROM prompt_likes WHERE user_id = ${user.id}::uuid AND prompt_id = ${promptId}::uuid`;
      await sql`UPDATE prompt_library SET likes = GREATEST(0, likes - 1) WHERE id = ${promptId}::uuid`;
      return NextResponse.json({ liked: false });
    } else {
      await sql`INSERT INTO prompt_likes (user_id, prompt_id) VALUES (${user.id}::uuid, ${promptId}::uuid)`;
      await sql`UPDATE prompt_library SET likes = likes + 1 WHERE id = ${promptId}::uuid`;
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error("Like error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
