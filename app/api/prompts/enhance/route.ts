import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getCurrentUser } from "@/lib/auth";

let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
    _openai = new OpenAI({ apiKey });
  }
  return _openai;
}

const ENHANCE_SYSTEM = `Jesteś ekspertem od inżynierii promptów. Użytkownik poda Ci tekst/opis/szkic promptu, a Ty musisz go ulepszyć i zwrócić profesjonalny, dobrze ustrukturyzowany prompt.

## ZASADY
- Użyj frameworka CREATE (Context, Role, Exact Task, Audience, Tone, Extra constraints)
- Zachowaj intencję użytkownika
- Dodaj szczegóły, kontekst i strukturę
- Zwróć TYLKO gotowy prompt — bez wyjaśnień, nagłówków ani komentarzy
- Odpowiadaj w tym samym języku co input
- Prompt powinien być konkretny, akcjonowalny i profesjonalny`;

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    if (!content || !content.trim()) {
      return NextResponse.json({ error: "content required" }, { status: 400 });
    }

    const response = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: ENHANCE_SYSTEM },
        { role: "user", content: `Ulepsz ten prompt/tekst:\n\n${content}` },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const enhanced = response.choices[0]?.message?.content || content;

    return NextResponse.json({ enhanced });
  } catch (error: unknown) {
    console.error("Enhance API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
