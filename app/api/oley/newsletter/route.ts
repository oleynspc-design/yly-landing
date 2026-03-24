import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { randomBytes } from "crypto";
import { sendNewsletterWelcomeEmail } from "@/lib/oley-email";

function generateDiscountCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  let code = "OLEY15-";
  for (let i = 0; i < 6; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return code;
}

export async function POST(req: NextRequest) {
  try {
    const { email, fullName, source } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Podaj prawidłowy adres email" }, { status: 400 });
    }

    const sql = getSql();

    // Check if already subscribed
    const existing = await sql`
      SELECT id, discount_code, unsubscribed_at FROM oley_newsletter WHERE email = ${email.trim().toLowerCase()}
    `;

    if (existing.length > 0) {
      const row = existing[0] as { id: string; discount_code: string | null; unsubscribed_at: string | null };

      if (row.unsubscribed_at) {
        // Re-subscribe
        const code = row.discount_code || generateDiscountCode();
        await sql`
          UPDATE oley_newsletter SET unsubscribed_at = NULL, discount_code = ${code}, subscribed_at = NOW()
          WHERE id = ${row.id}::uuid
        `;
        await sendNewsletterWelcomeEmail(email, fullName || "", code);
        return NextResponse.json({ ok: true, discountCode: code, message: "Witaj ponownie! Kod zniżkowy został wysłany na Twój email." });
      }

      return NextResponse.json({
        ok: true,
        discountCode: row.discount_code,
        message: "Jesteś już zapisany do newslettera!",
      });
    }

    // New subscriber
    const discountCode = generateDiscountCode();

    await sql`
      INSERT INTO oley_newsletter (email, full_name, source, discount_code)
      VALUES (${email.trim().toLowerCase()}, ${fullName || null}, ${source || "website"}, ${discountCode})
    `;

    // Send welcome email with discount code
    await sendNewsletterWelcomeEmail(email, fullName || "", discountCode);

    return NextResponse.json({
      ok: true,
      discountCode,
      message: "Dziękujemy za zapis! Kod zniżkowy -15% został wysłany na Twój email.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("unique") || message.includes("duplicate")) {
      return NextResponse.json({ ok: true, message: "Jesteś już zapisany do newslettera!" });
    }
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

// Admin: list subscribers
export async function GET(req: NextRequest) {
  try {
    const { getOleyCurrentUser } = await import("@/lib/oley-auth");
    const user = await getOleyCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }

    const sql = getSql();
    const subscribers = await sql`
      SELECT id::text, email, full_name, source, discount_code, subscribed_at, unsubscribed_at
      FROM oley_newsletter
      WHERE unsubscribed_at IS NULL
      ORDER BY subscribed_at DESC
    `;

    return NextResponse.json({ subscribers });
  } catch (err) {
    console.error("Newsletter list error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
