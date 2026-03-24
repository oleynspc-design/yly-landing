import { NextResponse } from "next/server";
import { getOleyCurrentUser } from "@/lib/oley-auth";

export async function GET() {
  try {
    const user = await getOleyCurrentUser();
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        company: user.company,
      },
    });
  } catch (err) {
    console.error("Oley me error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
