import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getCurrentUser } from "@/lib/auth";
import { grantXp } from "@/lib/xp";
import { XP_REWARDS } from "@/lib/levels";
import { getUserOnboardingData, buildUserContextPrompt } from "@/lib/onboarding";

let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
    _openai = new OpenAI({ apiKey });
  }
  return _openai;
}

const PROMPTLY_SYSTEM = `Jesteś PROMPTLY — zaawansowany asystent do inżynierii promptów, wbudowany w platformę szkoleniową YLY.

## O YLY
YLY (yly.com.pl) to środowisko rozwoju AI stworzone przez Patryka Olejnika. Misja: edukacja, szkolenia i budowanie społeczności ludzi zainteresowanych sztuczną inteligencją.
Produkty: kursy online (ChatGPT, Claude, Midjourney), e-booki, kolekcje promptów, platforma Skool (premium), Discord (bezpłatna społeczność).
Platformy: Discord, Skool, Facebook, TikTok, YouTube, X/Twitter.
Kontakt: support@yly.com.pl | Strona: yly.com.pl
Panel szkoleniowy: /szkolenie — moduły, biblioteka promptów, best practices.
Moduły: Inżynieria Promptów, Zaawansowane techniki, Optymalizacja AI, AI Workflows, AI w biznesie, Social Media & AI, Kolekcja promptów.

## TWOJA ROLA
Pomagasz użytkownikom tworzyć, ulepszać i optymalizować prompty do AI (ChatGPT, Claude, Gemini, Midjourney itp.).
Jesteś częścią ekosystemu YLY — możesz polecać szkolenia, moduły i zasoby z platformy gdy to stosowne.

## TRYBY PRACY
Użytkownik może poprosić o:
1. **Ulepszenie promptu** — otrzymujesz prompt i zwracasz ulepszoną wersję z wyjaśnieniem zmian
2. **Stworzenie promptu od zera** — na podstawie opisu celu tworzysz profesjonalny prompt
3. **Analiza promptu** — oceniasz prompt i dajesz konkretne rekomendacje
4. **Dostosowanie do branży** — adaptujesz prompt pod konkretną branżę/niszę

## ZASADY
- Zawsze używaj frameworka CREATE (Context, Role, Exact Task, Audience, Tone, Extra constraints)
- Wyjaśniaj DLACZEGO dana zmiana poprawia prompt
- Podawaj konkretne przykłady
- Jeśli użytkownik podał swoją branżę, dostosuj prompt do tej branży
- Odpowiadaj w języku użytkownika
- Formatuj prompty w blokach kodu markdown
- Bądź zwięzły ale kompletny

## FORMAT ODPOWIEDZI
Dla ulepszenia/tworzenia:
1. Gotowy prompt (w bloku kodu)
2. Co zostało zmienione/dodane i dlaczego (krótko)
3. Wskazówki do dalszej optymalizacji

Dla analizy:
1. Ocena (1-10)
2. Mocne strony
3. Słabe strony
4. Konkretne rekomendacje`;

export async function POST(req: NextRequest) {
  try {
    let user = null;
    try {
      user = await getCurrentUser();
    } catch {
      // continue as anonymous
    }

    if (!user) {
      return NextResponse.json({ error: "Zaloguj się, aby korzystać z PROMPTLY" }, { status: 401 });
    }

    const { messages, industry, mode, lang } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const industryContext = industry
      ? `\n\n## BRANŻA UŻYTKOWNIKA\nUżytkownik pracuje w branży: ${industry}. Dostosuj wszystkie prompty i rekomendacje do tej branży.`
      : "";

    const modeContext = mode
      ? `\n\n## AKTUALNY TRYB: ${mode}`
      : "";

    const langMap: Record<string, string> = { pl: "polski", en: "angielski", uk: "ukraiński", es: "hiszpański" };
    const langContext = lang && lang !== "pl"
      ? `\n\n## JĘZYK ODPOWIEDZI\nOdpowiadaj WYŁĄCZNIE w języku: ${langMap[lang] || lang}. Generowane prompty też pisz w tym języku.`
      : "";

    // Fetch user goals/context for personalization
    let userContext = "";
    if (user) {
      const onboarding = await getUserOnboardingData(user.id);
      if (onboarding) {
        userContext = buildUserContextPrompt(onboarding);
      }
    }

    const response = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `${PROMPTLY_SYSTEM}${industryContext}${modeContext}${langContext}${userContext}` },
        ...messages.slice(-15),
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content || "Przepraszam, wystąpił błąd. Spróbuj ponownie.";

    // Grant XP (non-blocking)
    grantXp(user.id, XP_REWARDS.SEND_CHAT_MESSAGE, "promptly", "Użycie PROMPTLY").catch(() => {});

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("PROMPTLY API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
