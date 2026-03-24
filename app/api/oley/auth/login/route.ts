import { NextRequest, NextResponse } from "next/server";
import { verifyOleyUser, createOleySession } from "@/lib/oley-auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email i hasło są wymagane" }, { status: 400 });
    }

    const user = await verifyOleyUser(email, password);
    if (!user) {
      return NextResponse.json({ error: "Nieprawidłowy email lub hasło" }, { status: 401 });
    }

    await createOleySession(user.id);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Oley login error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
