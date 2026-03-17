import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { grantXp } from "@/lib/xp";
import { XP_REWARDS } from "@/lib/levels";

let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
    _openai = new OpenAI({ apiKey });
  }
  return _openai;
}

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const moduleSlug = req.nextUrl.searchParams.get("module");
    const lessonIndex = req.nextUrl.searchParams.get("lesson");
    const sql = getSql();

    if (moduleSlug && lessonIndex !== null) {
      const rows = (await sql`
        SELECT id, answer, ai_feedback, score, submitted_at
        FROM homework_submissions
        WHERE user_id = ${user.id}::uuid AND module_slug = ${moduleSlug} AND lesson_index = ${Number(lessonIndex)}
        LIMIT 1
      `) as Record<string, unknown>[];
      return NextResponse.json({ submission: rows[0] || null });
    }

    if (moduleSlug) {
      const rows = (await sql`
        SELECT id, lesson_index, score, submitted_at
        FROM homework_submissions
        WHERE user_id = ${user.id}::uuid AND module_slug = ${moduleSlug}
        ORDER BY lesson_index
      `) as Record<string, unknown>[];
      return NextResponse.json({ submissions: rows });
    }

    return NextResponse.json({ error: "module param required" }, { status: 400 });
  } catch (error) {
    console.error("Homework GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { moduleSlug, lessonIndex, answer, homeworkTask } = await req.json();
    if (!moduleSlug || lessonIndex === undefined || !answer) {
      return NextResponse.json({ error: "moduleSlug, lessonIndex, answer required" }, { status: 400 });
    }

    const aiResponse = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Jestes oceniajacym zadania domowe na platformie szkoleniowej YLY. Ocen odpowiedz ucznia na skali 1-10. Podaj krotki feedback (2-3 zdania): co dobrze, co mozna poprawic. Odpowiadaj w jezyku polskim. Format: JSON {"score": number, "feedback": "string"}`
        },
        {
          role: "user",
          content: `Zadanie: ${homeworkTask || "Brak opisu zadania"}\n\nOdpowiedz ucznia: ${answer}`
        }
      ],
      max_tokens: 500,
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    let score = 7;
    let feedback = "Dobra robota! Kontynuuj naukę.";

    try {
      const parsed = JSON.parse(aiResponse.choices[0]?.message?.content || "{}");
      if (parsed.score) score = Math.min(10, Math.max(1, parsed.score));
      if (parsed.feedback) feedback = parsed.feedback;
    } catch {}

    const sql = getSql();
    await sql`
      INSERT INTO homework_submissions (user_id, module_slug, lesson_index, answer, ai_feedback, score)
      VALUES (${user.id}::uuid, ${moduleSlug}, ${Number(lessonIndex)}, ${answer}, ${feedback}, ${score})
      ON CONFLICT (user_id, module_slug, lesson_index)
      DO UPDATE SET answer = ${answer}, ai_feedback = ${feedback}, score = ${score}, submitted_at = NOW()
    `;

    if (score >= 6) {
      grantXp(user.id, XP_REWARDS.COMPLETE_LESSON, "homework", `Homework ${moduleSlug} L${lessonIndex}`).catch(() => {});
    }

    return NextResponse.json({ score, feedback });
  } catch (error) {
    console.error("Homework POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
