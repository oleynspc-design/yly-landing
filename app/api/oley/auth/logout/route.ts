import { NextResponse } from "next/server";
import { clearOleySession } from "@/lib/oley-auth";

export async function POST() {
  try {
    await clearOleySession();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Oley logout error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
