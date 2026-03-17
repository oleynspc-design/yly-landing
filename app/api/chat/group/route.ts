import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

interface ChatMessageRow {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
}

interface ChannelRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
}

// In-memory channel cache (channels rarely change)
let cachedChannels: ChannelRow[] | null = null;
let channelsCacheTime = 0;
const CHANNELS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCachedChannels(sql: ReturnType<typeof getSql>) {
  if (cachedChannels && Date.now() - channelsCacheTime < CHANNELS_CACHE_TTL) {
    return cachedChannels;
  }
  cachedChannels = (await sql`
    SELECT id::text, slug, name, description FROM chat_channels ORDER BY slug
  `) as ChannelRow[];
  channelsCacheTime = Date.now();
  return cachedChannels;
}

function isQuotaError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return msg.includes("exceeded") && (msg.includes("quota") || msg.includes("transfer"));
}

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const channel = searchParams.get("channel") || "general";
    const before = searchParams.get("before");
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    const sql = getSql();

    const channels = await getCachedChannels(sql);

    // Pobierz wiadomości
    let messages: ChatMessageRow[];
    if (before) {
      messages = (await sql`
        SELECT
          m.id::text, m.content, m.created_at,
          u.id::text AS user_id, u.full_name, u.avatar_url, u.role
        FROM chat_messages m
        INNER JOIN users u ON u.id = m.user_id
        INNER JOIN chat_channels ch ON ch.id = m.channel_id
        WHERE ch.slug = ${channel} AND m.created_at < ${before}
        ORDER BY m.created_at DESC
        LIMIT ${limit}
      `) as ChatMessageRow[];
    } else {
      messages = (await sql`
        SELECT
          m.id::text, m.content, m.created_at,
          u.id::text AS user_id, u.full_name, u.avatar_url, u.role
        FROM chat_messages m
        INNER JOIN users u ON u.id = m.user_id
        INNER JOIN chat_channels ch ON ch.id = m.channel_id
        WHERE ch.slug = ${channel}
        ORDER BY m.created_at DESC
        LIMIT ${limit}
      `) as ChatMessageRow[];
    }

    return NextResponse.json({
      channels,
      messages: messages.reverse(),
    });
  } catch (err) {
    if (isQuotaError(err)) {
      return NextResponse.json({ error: "Serwer tymczasowo niedostępny. Spróbuj ponownie później.", quota: true }, { status: 503 });
    }
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
    }

    const body = await req.json();
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const channel = typeof body.channel === "string" ? body.channel : "general";

    if (!content || content.length > 2000) {
      return NextResponse.json(
        { error: "Wiadomość musi mieć od 1 do 2000 znaków." },
        { status: 400 }
      );
    }

    const sql = getSql();

    // Znajdź kanał
    const channelRows = (await sql`
      SELECT id::text FROM chat_channels WHERE slug = ${channel}
    `) as { id: string }[];

    if (channelRows.length === 0) {
      return NextResponse.json({ error: "Kanał nie istnieje." }, { status: 404 });
    }

    const newMsg = (await sql`
      INSERT INTO chat_messages (channel_id, user_id, content)
      VALUES (${channelRows[0].id}::uuid, ${user.id}::uuid, ${content})
      RETURNING id::text, content, created_at
    `) as { id: string; content: string; created_at: string }[];

    return NextResponse.json({
      message: {
        id: newMsg[0].id,
        content: newMsg[0].content,
        created_at: newMsg[0].created_at,
        user_id: user.id,
        full_name: user.fullName,
        avatar_url: user.avatarUrl,
        role: user.role,
      },
    });
  } catch (err) {
    if (isQuotaError(err)) {
      return NextResponse.json({ error: "Serwer tymczasowo niedostępny. Spróbuj ponownie później.", quota: true }, { status: 503 });
    }
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
