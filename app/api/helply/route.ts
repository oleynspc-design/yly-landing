import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getCurrentUser } from "@/lib/auth";
import { grantXp } from "@/lib/xp";
import { XP_REWARDS } from "@/lib/levels";
import { getUserOnboardingData, buildUserContextPrompt } from "@/lib/onboarding";
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

const MODULE_INFO: Record<string, { name: string; description: string }> = {
  "podstawy-promptingu": {
    name: "Podstawy Promptingu",
    description: "Fundamenty inżynierii promptów: architektura LLM, tokeny, okno kontekstowe, frameworki CREATE/RISEN, techniki zero-shot/few-shot, role prompting."
  },
  "zaawansowany-prompting": {
    name: "Zaawansowany Prompting",
    description: "Chain-of-Thought, Tree-of-Thought, meta-prompting, self-consistency, ReAct, zaawansowane techniki sterowania AI."
  },
  "optymalizacja-pracy": {
    name: "Optymalizacja Pracy z AI",
    description: "Optymalizacja workflow, automatyzacja zadań, integracja AI w codzienną pracę, efektywność i produktywność."
  },
  "ai-workflows": {
    name: "AI Workflows",
    description: "Budowanie złożonych workflow AI, łączenie narzędzi, automatyzacja procesów, pipeline'y AI."
  },
  "ai-w-biznesie": {
    name: "AI w Biznesie",
    description: "Zastosowania AI w biznesie, strategia AI, ROI, case studies, wdrażanie AI w organizacji."
  },
  "social-media": {
    name: "Social Media & AI",
    description: "Tworzenie treści na social media z AI, automatyzacja postów, strategia content, growth hacking z AI."
  },
  "kolekcja-promptow": {
    name: "Kolekcja Promptów",
    description: "Biblioteka gotowych promptów, szablony, best practices, kolekcje branżowe."
  },
};

function buildHelplySystem(moduleSlug: string | null, userContext: string) {
  const moduleCtx = moduleSlug && MODULE_INFO[moduleSlug]
    ? `\n\n## AKTUALNY MODUŁ\nUżytkownik jest w module: **${MODULE_INFO[moduleSlug].name}**\nOpis: ${MODULE_INFO[moduleSlug].description}\nPomagaj mu w kontekście tego modułu — streszczaj lekcje, dawaj tipy, przykłady, odpowiadaj na pytania.`
    : "\n\nUżytkownik nie jest w konkretnym module. Pomagaj ogólnie w kontekście szkolenia YLY.";

  return `Jesteś HELPLY — przyjazny asystent AI mentora wbudowany w platformę szkoleniową YLY.

## O YLY
YLY (yly.com.pl) to platforma edukacji AI stworzona przez Patryka Olejnika. 
Moduły szkoleniowe: Podstawy Promptingu, Zaawansowany Prompting, Optymalizacja Pracy z AI, AI Workflows, AI w Biznesie, Social Media & AI, Kolekcja Promptów.
Panel: /szkolenie | Asystent promptów: PROMPTLY | Mentor: HELPLY (Ty)

## TWOJA ROLA
Jesteś mentorem i pomocnikiem szkoleniowym. Pomagasz użytkownikom:
1. **Streszczać** moduły/lekcje — krótko i na temat
2. **Odpowiadać na pytania** o materiał szkoleniowy
3. **Dawać tipy** — praktyczne wskazówki z danego tematu
4. **Podawać przykłady** — konkretne, z branży użytkownika
5. **Pomagać z zadaniami domowymi** — naprowadzaj, nie dawaj gotowych odpowiedzi
6. **Przetwarzać notatki** — pomagaj je uporządkować i tworzyć z nich prompty

## ZASADY
- Bądź ciepły, pomocny i motywujący 🎓
- Odpowiadaj zwięźle ale treściwie
- Dawaj konkretne przykłady z branży użytkownika
- Przy pytaniach o lekcje — streszczaj kluczowe punkty
- Przy zadaniach domowych — naprowadzaj, nie dawaj gotowych rozwiązań
- Formatuj odpowiedzi czytelnie (nagłówki, listy, bold)
- Odpowiadaj w języku użytkownika
- Możesz polecać PROMPTLY do generowania/ulepszania promptów
${moduleCtx}${userContext}`;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Zaloguj się, aby korzystać z HELPLY" }, { status: 401 });
    }

    const { messages, moduleSlug, action } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Get user onboarding data for personalization
    let userContext = "";
    const onboarding = await getUserOnboardingData(user.id);
    if (onboarding) {
      userContext = buildUserContextPrompt(onboarding);
    }

    // Build action-specific context
    let actionCtx = "";
    if (action === "summarize") {
      actionCtx = "\n\n## INSTRUKCJA SPECJALNA\nUżytkownik prosi o streszczenie. Podaj zwięzłe, strukturalne streszczenie z kluczowymi punktami, tipami i wnioskami.";
    } else if (action === "tips") {
      actionCtx = "\n\n## INSTRUKCJA SPECJALNA\nUżytkownik prosi o tipy. Podaj 5-7 praktycznych, konkretnych wskazówek z przykładami.";
    } else if (action === "examples") {
      actionCtx = "\n\n## INSTRUKCJA SPECJALNA\nUżytkownik prosi o przykłady. Podaj 3-5 konkretnych przykładów z branży użytkownika.";
    } else if (action === "homework-help") {
      actionCtx = "\n\n## INSTRUKCJA SPECJALNA\nUżytkownik prosi o pomoc z zadaniem domowym. Naprowadzaj go, zadawaj pytania pomocnicze, ale NIE dawaj gotowej odpowiedzi.";
    } else if (action === "notes-to-prompt") {
      actionCtx = "\n\n## INSTRUKCJA SPECJALNA\nUżytkownik chce przekształcić swoje notatki w prompt. Przeanalizuj notatki i stwórz z nich profesjonalny, dobrze ustrukturyzowany prompt używając frameworka CREATE.";
    }

    const systemPrompt = buildHelplySystem(moduleSlug || null, userContext) + actionCtx;

    const response = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-20),
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content || "Przepraszam, wystąpił błąd. Spróbuj ponownie.";

    // Save conversation to DB (non-blocking)
    try {
      const sql = getSql();
      const saveOps = [
        sql`INSERT INTO helply_conversations (user_id, module_slug, role, content) VALUES (${user.id}::uuid, ${moduleSlug || null}, 'user', ${messages[messages.length - 1]?.content || ''})`,
        sql`INSERT INTO helply_conversations (user_id, module_slug, role, content) VALUES (${user.id}::uuid, ${moduleSlug || null}, 'assistant', ${reply})`,
      ];
      Promise.all(saveOps).catch(() => {});
    } catch {}

    // Grant XP (non-blocking)
    grantXp(user.id, XP_REWARDS.SEND_CHAT_MESSAGE, "helply", "Użycie HELPLY").catch(() => {});

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("HELPLY API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
