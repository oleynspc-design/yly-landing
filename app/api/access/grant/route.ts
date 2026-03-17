import { NextRequest, NextResponse } from "next/server";
import { grantTrainingAccessByEmail, isAuthConfigured } from "@/lib/auth";

function getBodyValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthConfigured()) {
      return NextResponse.json(
        { error: "System dostępu nie jest jeszcze skonfigurowany." },
        { status: 503 }
      );
    }

    const configuredSecret = process.env.ACCESS_AUTOMATION_SECRET;
    const requestSecret = req.headers.get("x-access-automation-secret");

    if (!configuredSecret || requestSecret !== configuredSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const email = getBodyValue(body.email).toLowerCase();
    const source = getBodyValue(body.source) || "automation";

    if (!email) {
      return NextResponse.json(
        { error: "Adres e-mail jest wymagany." },
        { status: 400 }
      );
    }

    const user = await grantTrainingAccessByEmail(email, source);

    if (!user) {
      return NextResponse.json(
        { error: "Nie znaleziono użytkownika o podanym e-mailu." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      user,
      grantedScope: "all",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
