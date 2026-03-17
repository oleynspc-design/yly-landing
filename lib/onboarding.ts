import { getSql } from "@/lib/db";

export interface OnboardingData {
  industry: string | null;
  experience: string | null;
  goals: string[] | null;
  expectations: string | null;
  challenge: string | null;
  trainingPath: { module: string; priority: string; reason: string }[] | null;
}

export async function getUserOnboardingData(userId: string): Promise<OnboardingData | null> {
  try {
    const sql = getSql();
    const rows = (await sql`
      SELECT industry, onboarding_answers, training_path
      FROM users WHERE id = ${userId}::uuid LIMIT 1
    `) as { industry: string | null; onboarding_answers: Record<string, unknown> | null; training_path: unknown }[];

    if (!rows[0]?.onboarding_answers) return null;

    const answers = rows[0].onboarding_answers;
    return {
      industry: (answers.industry as string) || rows[0].industry || null,
      experience: (answers.experience as string) || null,
      goals: (answers.goals as string[]) || null,
      expectations: (answers.expectations as string) || null,
      challenge: (answers.challenge as string) || null,
      trainingPath: (rows[0].training_path as OnboardingData["trainingPath"]) || null,
    };
  } catch {
    return null;
  }
}

const goalLabels: Record<string, string> = {
  automate: "Automatyzacja powtarzalnych zadań",
  content: "Tworzenie treści (posty, artykuły, newslettery)",
  marketing: "Lepszy marketing i sprzedaż",
  productivity: "Zwiększenie produktywności codziennej pracy",
  data: "Analiza danych i raportowanie",
  customer: "Lepsza obsługa klientów",
  learning: "Nauka i rozwój osobisty w AI",
  business: "Skalowanie biznesu z AI",
};

const experienceLabels: Record<string, string> = {
  beginner: "Początkujący",
  basic: "Podstawowy",
  intermediate: "Średniozaawansowany",
  advanced: "Zaawansowany",
};

export function buildUserContextPrompt(data: OnboardingData): string {
  const parts: string[] = [];

  parts.push("## KONTEKST UŻYTKOWNIKA (z quizu onboardingowego)");

  if (data.industry) {
    parts.push(`- **Branża**: ${data.industry}`);
  }
  if (data.experience) {
    parts.push(`- **Poziom doświadczenia z AI**: ${experienceLabels[data.experience] || data.experience}`);
  }
  if (data.goals && data.goals.length > 0) {
    const goalTexts = data.goals.map((g) => goalLabels[g] || g);
    parts.push(`- **Cele użytkownika**: ${goalTexts.join(", ")}`);
  }
  if (data.expectations) {
    parts.push(`- **Oczekiwania po szkoleniu**: ${data.expectations}`);
  }
  if (data.challenge) {
    parts.push(`- **Największe wyzwanie**: ${data.challenge}`);
  }

  parts.push("");
  parts.push("## INSTRUKCJE PERSONALIZACJI");
  parts.push("- Dostosuj odpowiedzi do branży i poziomu użytkownika.");
  parts.push("- Odnoś się do celów użytkownika — pomagaj mu je realizować.");
  parts.push("- Jeśli użytkownik ma wyzwanie, proponuj konkretne rozwiązania AI.");
  parts.push("- Używaj przykładów z branży użytkownika.");
  parts.push("- Prowadź użytkownika krok po kroku ku jego celom.");

  return "\n\n" + parts.join("\n");
}
