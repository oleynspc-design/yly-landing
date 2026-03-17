import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
    _openai = new OpenAI({ apiKey });
  }
  return _openai;
}

// GET: fetch user's onboarding answers + AI summary
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const sql = getSql();
    const rows = (await sql`
      SELECT onboarding_answers, ai_profile_summary, training_path, industry
      FROM users WHERE id = ${user.id}::uuid LIMIT 1
    `) as { onboarding_answers: unknown; ai_profile_summary: string | null; training_path: unknown; industry: string | null }[];

    return NextResponse.json({
      answers: rows[0]?.onboarding_answers || null,
      aiSummary: rows[0]?.ai_profile_summary || null,
      trainingPath: rows[0]?.training_path || null,
      industry: rows[0]?.industry || null,
    });
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

// POST: save onboarding answers, generate AI summary + training path
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

    const { answers, industry } = await req.json();

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Wymagane odpowiedzi" }, { status: 400 });
    }

    const sql = getSql();

    // Save answers + industry
    await sql`
      UPDATE users 
      SET onboarding_answers = ${JSON.stringify(answers)}::jsonb,
          industry = COALESCE(${industry || null}, industry)
      WHERE id = ${user.id}::uuid
    `;

    // Generate AI summary (non-blocking for response, but we await it)
    let aiSummary = "";
    let trainingPath = null;

    try {
      const summaryResponse = await getOpenAI().chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Jesteś analitykiem edukacyjnym platformy YLY (yly.com.pl) — platformy szkoleniowej AI.

Na podstawie odpowiedzi z quizu onboardingowego stwórz:

1. **PROFIL UCZESTNIKA** (3-5 zdań) — zwięzłe streszczenie: kim jest, czego szuka, jaki ma poziom, jakie ma cele. To będzie widoczne dla admina.

2. **REKOMENDOWANA ŚCIEŻKA NAUKI** — JSON array z obiektami:
[
  {"module": "nazwa-modulu", "priority": "high|medium|low", "reason": "dlaczego ten moduł"}
]

Dostępne moduły:
- "prompt-basics" — Inżynieria Promptów (podstawy)
- "prompt-advanced" — Zaawansowane techniki promptów
- "ai-optimization" — Optymalizacja AI
- "workflows" — AI Workflows (automatyzacja)
- "business" — AI w biznesie
- "social-media" — Social Media & AI
- "prompts-collection" — Kolekcja gotowych promptów

Odpowiadaj TYLKO w formacie:
---PROFIL---
[tekst profilu]
---SCIEZKA---
[JSON array]`
          },
          {
            role: "user",
            content: `Branża: ${industry || "nie podano"}

Odpowiedzi z quizu onboardingowego:
${JSON.stringify(answers, null, 2)}`
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });

      const aiText = summaryResponse.choices[0]?.message?.content || "";

      // Parse AI response
      const profilMatch = aiText.match(/---PROFIL---\s*([\s\S]*?)---SCIEZKA---/);
      const sciezkaMatch = aiText.match(/---SCIEZKA---\s*([\s\S]*)/);

      aiSummary = profilMatch?.[1]?.trim() || aiText;

      if (sciezkaMatch) {
        try {
          const jsonStr = sciezkaMatch[1].trim().replace(/```json?\s*/g, "").replace(/```/g, "").trim();
          trainingPath = JSON.parse(jsonStr);
        } catch {
          trainingPath = null;
        }
      }

      // Save AI summary + training path
      await sql`
        UPDATE users 
        SET ai_profile_summary = ${aiSummary},
            training_path = ${trainingPath ? JSON.stringify(trainingPath) : null}::jsonb
        WHERE id = ${user.id}::uuid
      `;
    } catch (aiError) {
      console.error("AI summary generation failed:", aiError);
    }

    return NextResponse.json({
      ok: true,
      aiSummary,
      trainingPath,
    });
  } catch (error) {
    console.error("Onboarding API error:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
