import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 1 * 1024 * 1024; // 1MB for Base64

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("avatar") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Brak pliku." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Dozwolone formaty: JPG, PNG, WebP, GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Maksymalny rozmiar pliku: 1 MB (wymaganie dla Base64)." },
        { status: 400 }
      );
    }

    // Convert file to Base64 string
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64");
    const avatarUrl = `data:${file.type};base64,${base64Data}`;

    const sql = getSql();
    await sql`
      UPDATE users SET avatar_url = ${avatarUrl}, updated_at = NOW()
      WHERE id = ${user.id}::uuid
    `;

    return NextResponse.json({ ok: true, avatarUrl });
  } catch (err) {
    console.error("Avatar upload error:", err);
    return NextResponse.json({ error: "Błąd serwera przy zapisie zdjęcia" }, { status: 500 });
  }
}
