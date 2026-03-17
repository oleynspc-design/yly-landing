import { NextRequest, NextResponse } from "next/server";
import {
  createSession,
  ensureTrainingAccessRow,
  getSafeRedirectPath,
  getTrainingAccessByUserId,
  isAuthConfigured,
  verifyPassword,
} from "@/lib/auth";

function getBodyValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthConfigured()) {
      return NextResponse.json(
        { error: "System logowania nie jest jeszcze skonfigurowany." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const email = getBodyValue(body.email).toLowerCase();
    const password = typeof body.password === "string" ? body.password : "";
    const next = getSafeRedirectPath(body.next, "/szkolenie");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Adres e-mail i hasło są wymagane." },
        { status: 400 }
      );
    }

    const user = await verifyPassword(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Nieprawidłowy e-mail lub hasło." },
        { status: 401 }
      );
    }

    await ensureTrainingAccessRow(user.id);
    await createSession(user.id);

    const access = await getTrainingAccessByUserId(user.id);
    const redirectTo = access.status === "granted" && access.granted_scope === "all"
      ? next
      : "/ograniczony-dostep";

    return NextResponse.json({
      ok: true,
      redirectTo,
      accessStatus: access.status,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    if (message.includes("exceeded") && (message.includes("quota") || message.includes("transfer"))) {
      return NextResponse.json(
        { error: "Serwer jest tymczasowo przeciążony. Spróbuj ponownie za kilka minut." },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
