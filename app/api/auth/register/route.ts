import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import {
  createSession,
  createUser,
  ensureTrainingAccessRow,
  findUserByEmail,
  isAuthConfigured,
} from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/email";
import { grantXp } from "@/lib/xp";
import { XP_REWARDS } from "@/lib/levels";

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
    const fullName = getBodyValue(body.fullName);
    const email = getBodyValue(body.email).toLowerCase();
    const password = typeof body.password === "string" ? body.password : "";

    if (fullName.length < 2) {
      return NextResponse.json(
        { error: "Podaj poprawne imię i nazwisko." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Podaj poprawny adres e-mail." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Hasło musi mieć minimum 8 znaków." },
        { status: 400 }
      );
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "Konto z tym adresem e-mail już istnieje." },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 12);
    const user = await createUser({
      email,
      fullName,
      passwordHash,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Nie udało się utworzyć konta." },
        { status: 500 }
      );
    }

    await ensureTrainingAccessRow(user.id);
    await createSession(user.id);

    // Grant registration XP (non-blocking)
    grantXp(user.id, XP_REWARDS.REGISTER, "register", "Rejestracja konta").catch(() => {});

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, fullName).catch(() => {});

    return NextResponse.json({
      ok: true,
      redirectTo: "/ograniczony-dostep",
      accessStatus: "pending",
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
