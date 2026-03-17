// Homework assignments per module per lesson

export interface HomeworkTask {
  lessonIndex: number;
  title: string;
  description: string;
  hints: string[];
}

export const HOMEWORK: Record<string, HomeworkTask[]> = {
  "podstawy-promptingu": [
    { lessonIndex: 0, title: "Architektura LLM", description: "Wyjaśnij własnymi słowami, czym jest mechanizm Attention w architekturze Transformer i dlaczego jest kluczowy dla działania LLM. Podaj praktyczny przykład.", hints: ["Pomyśl o tym jak model 'patrzy' na różne części tekstu", "Porównaj z ludzką uwagą"] },
    { lessonIndex: 1, title: "Tokeny i Kontekst", description: "Oblicz przybliżony koszt przetworzenia tekstu 2000 słów po polsku przez GPT-4o. Wyjaśnij co to jest 'Lost in the Middle' i jak tego unikać.", hints: ["1 słowo PL ≈ 2-3 tokeny", "Kluczowe info na początku lub końcu"] },
    { lessonIndex: 2, title: "Pierwszy Prompt", description: "Napisz prompt do analizy konkurencji dla wybranej branży. Użyj struktury: kontekst → zadanie → format wyjściowy. Porównaj wersję zero-shot i few-shot.", hints: ["Dodaj przykład oczekiwanego outputu", "Zdefiniuj rolę AI"] },
    { lessonIndex: 3, title: "Framework CREATE", description: "Przekształć prosty prompt 'Napisz post na LinkedIn' używając pełnego frameworka CREATE. Wyjaśnij każdy element.", hints: ["C-Context, R-Role, E-Exact task, A-Audience, T-Tone, E-Extra"] },
    { lessonIndex: 4, title: "Role Prompting", description: "Stwórz 3 warianty tego samego zadania (napisanie emaila do klienta) z różnymi rolami AI. Porównaj wyniki.", hints: ["Ekspert, mentor, copywriter", "Każda rola daje inny styl"] },
    { lessonIndex: 5, title: "Techniki Sterowania", description: "Napisz prompt z chain-of-thought do rozwiązania złożonego problemu biznesowego. Dodaj ograniczenia i format wyjściowy.", hints: ["'Myśl krok po kroku'", "Podziel problem na etapy"] },
    { lessonIndex: 6, title: "Kontrola Outputu", description: "Stwórz prompt generujący JSON z danymi produktów. Dodaj walidację formatu i obsługę błędów.", hints: ["Podaj schemat JSON", "Użyj delimiters"] },
    { lessonIndex: 7, title: "System Prompts", description: "Zaprojektuj system prompt dla chatbota obsługi klienta w wybranej branży. Uwzględnij ton, ograniczenia i scenariusze.", hints: ["Zdefiniuj osobowość", "Dodaj fallback responses"] },
    { lessonIndex: 8, title: "Debugowanie", description: "Weź prompt który daje słabe wyniki i napraw go stosując 3 techniki debugowania. Udokumentuj każdą zmianę.", hints: ["Iteruj", "Testuj warianty", "Analizuj output"] },
    { lessonIndex: 9, title: "Projekt Końcowy", description: "Stwórz kompletny zestaw promptów (minimum 5) dla wybranego workflow w Twojej branży. Dokumentuj framework, techniki i wyniki.", hints: ["Połącz wszystkie techniki", "Dodaj instrukcję użycia"] },
  ],
  "zaawansowany-prompting": [
    { lessonIndex: 0, title: "Chain-of-Thought", description: "Rozwiąż złożony problem analityczny używając CoT. Porównaj wynik z i bez CoT.", hints: ["Wymuś krokowe myślenie", "Dokumentuj różnice"] },
    { lessonIndex: 1, title: "Tree-of-Thought", description: "Zastosuj ToT do problemu strategicznego — wygeneruj 3 ścieżki rozwiązania i oceń każdą.", hints: ["Każda gałąź = inna strategia", "Oceń pros/cons"] },
    { lessonIndex: 2, title: "Meta-Prompting", description: "Napisz meta-prompt, który generuje prompty dla wybranej kategorii zadań.", hints: ["Prompt tworzący prompty", "Parametryzuj"] },
    { lessonIndex: 3, title: "Self-Consistency", description: "Zastosuj self-consistency do zadania wymagającego precyzji — wygeneruj 5 odpowiedzi i wybierz najlepszą.", hints: ["Porównaj warianty", "Szukaj consensus"] },
    { lessonIndex: 4, title: "ReAct Pattern", description: "Zaprojektuj workflow ReAct (Reason + Act) dla zadania badawczego.", hints: ["Myśl → Działaj → Obserwuj", "Iteracyjny proces"] },
    { lessonIndex: 5, title: "Adversarial Prompting", description: "Przetestuj prompt pod kątem edge cases i red-teaming. Napraw znalezione luki.", hints: ["Szukaj sposobów złamania", "Dodaj guardrails"] },
    { lessonIndex: 6, title: "Multi-Model Orchestration", description: "Zaprojektuj pipeline używający 2+ modeli AI do złożonego zadania.", hints: ["Model A → przetworzenie → Model B", "Każdy model ma swoją siłę"] },
    { lessonIndex: 7, title: "Advanced System Design", description: "Zaprojektuj kompletny system promptów dla aplikacji AI z wieloma scenariuszami użycia.", hints: ["System prompt + user prompts + fallbacks", "Testuj edge cases"] },
  ],
  "optymalizacja-pracy": [
    { lessonIndex: 0, title: "Audyt Procesów", description: "Przeprowadź audyt swoich 5 najczęstszych zadań w pracy. Które można zautomatyzować z AI?", hints: ["Oceń czas vs. potencjał AI", "Priorytetyzuj"] },
    { lessonIndex: 1, title: "Email Automation", description: "Stwórz zestaw promptów do automatyzacji korespondencji email (odpowiedzi, follow-upy, podsumowania).", hints: ["Template + personalizacja", "Różne tony"] },
    { lessonIndex: 2, title: "Meeting Optimization", description: "Zaprojektuj workflow AI do przygotowania, prowadzenia i podsumowywania spotkań.", hints: ["Agenda → notatki → action items", "Automatyzuj follow-up"] },
    { lessonIndex: 3, title: "Content Pipeline", description: "Zbuduj pipeline do tworzenia treści: research → draft → edit → publish.", hints: ["Każdy etap = osobny prompt", "Zachowaj spójność"] },
    { lessonIndex: 4, title: "Data Analysis", description: "Stwórz prompt do analizy danych (CSV/Excel) i generowania raportu z wnioskami.", hints: ["Structured output", "Wizualizacje"] },
    { lessonIndex: 5, title: "Personal Productivity", description: "Zaprojektuj system AI-powered do zarządzania czasem i priorytetami na cały tydzień.", hints: ["Planowanie → wykonanie → review", "Integracja z kalendarzem"] },
    { lessonIndex: 6, title: "Knowledge Management", description: "Stwórz system promptów do organizacji wiedzy i tworzenia bazy wiedzy zespołowej.", hints: ["Kategoryzacja → tagowanie → wyszukiwanie", "Q&A format"] },
    { lessonIndex: 7, title: "Workflow Integration", description: "Połącz minimum 3 narzędzia AI w zintegrowany workflow dla Twojej pracy.", hints: ["Zapier/Make + AI", "End-to-end automation"] },
  ],
  "ai-workflows": [
    { lessonIndex: 0, title: "Mapowanie Procesów", description: "Zmapuj proces biznesowy z Twojej pracy i wskaż punkty integracji AI.", hints: ["Flowchart", "Bottlenecki = szanse"] },
    { lessonIndex: 1, title: "API Integration", description: "Zaprojektuj workflow łączący AI API z narzędziem no-code (Zapier/Make).", hints: ["Trigger → AI → Action", "Error handling"] },
    { lessonIndex: 2, title: "Multi-Step Pipeline", description: "Zbuduj 4-etapowy pipeline AI do automatyzacji wybranego procesu.", hints: ["Input → Process → Validate → Output", "Checkpoints"] },
    { lessonIndex: 3, title: "Quality Assurance", description: "Dodaj warstwę QA do istniejącego workflow AI — walidacja, retry, fallback.", hints: ["AI sprawdzające AI", "Human-in-the-loop"] },
    { lessonIndex: 4, title: "Scaling Workflows", description: "Przygotuj workflow do skalowania — batch processing, rate limiting, monitoring.", hints: ["Kolejkowanie", "Logging", "Alerts"] },
    { lessonIndex: 5, title: "Custom Agent", description: "Zaprojektuj prostego agenta AI z narzędziami i pamięcią do konkretnego zadania.", hints: ["Reasoning loop", "Tool use", "Memory"] },
  ],
  "ai-w-biznesie": [
    { lessonIndex: 0, title: "AI Strategy Canvas", description: "Wypełnij AI Strategy Canvas dla swojej firmy/projektu. Zidentyfikuj 3 najważniejsze use cases.", hints: ["Wartość biznesowa vs. trudność wdrożenia", "Quick wins first"] },
    { lessonIndex: 1, title: "ROI Analysis", description: "Oblicz ROI dla wdrożenia AI w wybranym procesie. Uwzględnij koszty i oszczędności.", hints: ["Czas pracownika vs. koszt API", "Jakość outputu"] },
    { lessonIndex: 2, title: "Customer AI", description: "Zaprojektuj chatbota AI dla obsługi klienta w wybranej branży. Uwzględnij scenariusze i eskalację.", hints: ["Happy path + edge cases", "Handoff do człowieka"] },
    { lessonIndex: 3, title: "Competitive Analysis", description: "Użyj AI do przeprowadzenia analizy konkurencji. Wygeneruj raport z rekomendacjami.", hints: ["SWOT + AI insights", "Actionable recommendations"] },
    { lessonIndex: 4, title: "AI Ethics Framework", description: "Stwórz framework etyczny dla użycia AI w Twojej organizacji.", hints: ["Bias, prywatność, transparentność", "Governance"] },
    { lessonIndex: 5, title: "Implementation Plan", description: "Przygotuj 90-dniowy plan wdrożenia AI w wybranym dziale.", hints: ["Fazy: pilot → rollout → optimization", "KPIs"] },
  ],
  "social-media": [
    { lessonIndex: 0, title: "Content Calendar", description: "Wygeneruj z AI kalendarz treści na 2 tygodnie dla wybranej platformy.", hints: ["Mix formatów", "Hashtagi i CTA"] },
    { lessonIndex: 1, title: "Visual Content", description: "Stwórz 5 promptów do Midjourney/DALL-E dla Twojej marki. Zachowaj spójność wizualną.", hints: ["Brand guidelines → prompt", "Style consistency"] },
    { lessonIndex: 2, title: "Engagement Strategy", description: "Zaprojektuj system AI do automatyzacji odpowiedzi i engagement na social media.", hints: ["Ton marki", "Response templates", "Escalation"] },
    { lessonIndex: 3, title: "Analytics & Optimization", description: "Stwórz prompt do analizy performance social media i generowania rekomendacji.", hints: ["Metryki → insights → actions", "A/B testing"] },
    { lessonIndex: 4, title: "Viral Content Framework", description: "Opracuj framework tworzenia viralowych treści z AI dla Twojej niszy.", hints: ["Hook → Value → CTA", "Emocje + ciekawość"] },
    { lessonIndex: 5, title: "Multi-Platform Strategy", description: "Zaprojektuj system adaptacji jednej treści na 4 platformy (LinkedIn, X, IG, TikTok).", hints: ["1 treść → 4 formaty", "Tone adaptation"] },
  ],
  "kolekcja-promptow": [
    { lessonIndex: 0, title: "Prompt Inventory", description: "Stwórz inwentaryzację 10 promptów które regularnie używasz. Oceń każdy (1-10) i ulepsz 3 najsłabsze.", hints: ["Dokumentuj use case", "Mierz jakość outputu"] },
    { lessonIndex: 1, title: "Template System", description: "Zaprojektuj system szablonów promptów z dynamicznymi zmiennymi dla Twojej branży.", hints: ["[ZMIENNA] syntax", "Reużywalność"] },
    { lessonIndex: 2, title: "Prompt Chain", description: "Stwórz łańcuch 4 promptów, gdzie output jednego jest inputem kolejnego.", hints: ["Sekwencyjne przetwarzanie", "Validacja między krokami"] },
    { lessonIndex: 3, title: "Industry Collection", description: "Zbuduj kolekcję 10 promptów specjalizowanych dla Twojej branży. Udostępnij w bibliotece.", hints: ["Pokryj różne use cases", "Testuj z różnymi modelami"] },
  ],
};
