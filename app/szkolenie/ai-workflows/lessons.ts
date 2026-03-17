export interface ContentBlock {
  type: "text" | "title" | "highlight" | "list" | "comparison" | "prompt-box";
  text?: string;
  icon?: string;
  title?: string;
  items?: string[];
  bad?: string;
  good?: string;
  code?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  semester: number;
  content: ContentBlock[];
  tips: string[];
}

export const semesters = [
  { id: 1, name: "Semestr I: Projektowanie workflow", lessons: [0, 1, 2] },
  { id: 2, name: "Semestr II: Łączenie wielu AI", lessons: [3, 4] },
  { id: 3, name: "Semestr III: Pipeline'y przetwarzania", lessons: [5, 6, 7] },
  { id: 4, name: "Semestr IV: Testowanie i optymalizacja", lessons: [8, 9] },
];

export const lessons: Lesson[] = [
  {
    id: "workflow-basics", title: "1. Czym jest AI Workflow i dlaczego go potrzebujesz", duration: "15 min", semester: 1,
    content: [
      { type: "text", text: "AI Workflow to automatyczny ciąg operacji, w którym AI wykonuje zadania krok po kroku bez Twojego udziału." },
      { type: "highlight", icon: "Zap", title: "Kluczowy cel", text: "Automatyzacja eliminuje powtarzalną pracę ręczną i przyspiesza procesy nawet 100-krotnie." },
      { type: "text", text: "Od prostej analizy maili do skomplikowanego systemu obsługi klienta – wszystko opiera się na workflows." },
      { type: "title", text: "Elementy Workflow" },
      { type: "list", items: ["**Wyzwalacz (Trigger):** Wydarzenie, które uruchamia proces (np. nowy e-mail).", "**Akcje (Actions):** Zadania wykonywane przez AI (np. streszczenie maila).", "**Warunki (Conditions):** Logika sterująca (np. JEŚLI mail jest skargą, WYŚLIJ do supportu)."] },
    ],
    tips: ["Zawsze zaczynaj od zdefiniowania wyzwalacza.", "Nie automatyzuj chaosu – najpierw uporządkuj proces ręczny.", "Zacznij od prostych workflows, zanim przejdziesz do złożonych."]
  },
  {
    id: "no-code-tools", title: "2. Narzędzia do automatyzacji (Make, Zapier, n8n)", duration: "20 min", semester: 1,
    content: [
      { type: "text", text: "Nie musisz być programistą, aby budować zaawansowane AI Workflows. Wykorzystaj narzędzia No-Code." },
      { type: "title", text: "Popularne narzędzia" },
      { type: "list", items: ["**Make.com:** Niezwykle wizualne, świetne do złożonych rozgałęzień i zaawansowanej logiki.", "**Zapier:** Ogromna liczba integracji, bardzo prosty interfejs, idealny na start.", "**n8n:** Open-source, tańszy przy dużej skali, wymaga nieco więcej technicznej wiedzy."] },
      { type: "comparison", bad: "Budowanie własnych integracji od zera w Pythonie dla prostego zadania.", good: "Użycie Make.com do połączenia Gmaila z OpenAI w 15 minut." },
      { type: "title", text: "Wybór odpowiedniego narzędzia" },
      { type: "text", text: "Wybieraj narzędzie na podstawie liczby integracji z Twoimi aplikacjami (np. CRM) oraz budżetu." },
    ],
    tips: ["Make.com to zazwyczaj najlepszy kompromis między mocą a ceną.", "Używaj webhooków do łączenia niestandardowych aplikacji.", "Zwracaj uwagę na limity operacji w darmowych planach."]
  },
  {
    id: "process-mapping", title: "3. Mapowanie procesów i projektowanie", duration: "25 min", semester: 1,
    content: [
      { type: "text", text: "Zanim zaczniesz wyklikać automatyzację, musisz zaplanować ją na papierze." },
      { type: "title", text: "Jak mapować procesy?" },
      { type: "list", items: ["**Krok 1:** Wypisz wszystkie kroki obecnego, ręcznego procesu.", "**Krok 2:** Zidentyfikuj 'wąskie gardła' (bottlenecks).", "**Krok 3:** Zastanów się, gdzie AI może zastąpić ludzkie decyzje lub generowanie treści.", "**Krok 4:** Narysuj nowy proces (np. w Miro lub Lucidchart)."] },
      { type: "highlight", icon: "Brain", title: "Zasada", text: "Jeśli nie potrafisz opisać procesu krok po kroku, AI też go nie wykona." },
    ],
    tips: ["Zawsze testuj proces ręcznie przed automatyzacją.", "Podziel duże zadania na mniejsze kroki.", "Rozważ przypadki brzegowe (edge cases) podczas mapowania."]
  },
  {
    id: "multi-model", title: "4. Łączenie różnych modeli AI", duration: "20 min", semester: 2,
    content: [
      { type: "text", text: "Jeden model AI nie zawsze jest najlepszy do wszystkiego. Różne modele mają różne specjalizacje." },
      { type: "title", text: "Dlaczego łączyć modele?" },
      { type: "list", items: ["**GPT-4o:** Świetny do logiki, analizy i kodowania.", "**Claude 3.5 Sonnet:** Wybitny w pisaniu tekstów, dłuższym kontekście i naturalnym tonie.", "**Gemini 1.5 Pro:** Idealny do analizy ogromnych ilości danych (np. całe książki, wideo).", "**Midjourney/DALL-E:** Niezastąpione przy generowaniu obrazów."] },
      { type: "prompt-box", title: "Przykład przepływu (Handoff)", code: "1. [GPT-4o] Analizuje raport giełdowy i wyciąga 5 kluczowych liczb.\n2. [Claude 3.5] Na podstawie liczb pisze angażujący post na bloga.\n3. [DALL-E 3] Generuje miniaturkę pasującą do treści posta." },
      { type: "text", text: "Dzięki łączeniu modeli, uzyskujesz najwyższą jakość na każdym etapie procesu." },
    ],
    tips: ["Korzystaj z routerów LLM, aby dynamicznie wybierać najtańszy/najlepszy model do danego zadania.", "Nie przepłacaj – używaj tańszych modeli (np. GPT-4o-mini) do prostych zadań klasyfikacyjnych.", "Każdy model ma inny 'styl' – testuj prompty oddzielnie na każdym z nich."]
  },
  {
    id: "ai-agents", title: "5. Agenci AI i ich specjalizacje", duration: "25 min", semester: 2,
    content: [
      { type: "text", text: "Zamiast jednego wielkiego promptu, stwórz 'Agencji' – małe, specjalistyczne modele współpracujące ze sobą." },
      { type: "title", text: "Koncepcja Multi-Agent" },
      { type: "text", text: "Każdy agent ma jedną, konkretną rolę i własny System Prompt." },
      { type: "comparison", bad: "Jesteś ekspertem SEO, copywriterem, redaktorem i grafikiem. Napisz artykuł, zoptymalizuj go i wymyśl grafikę.", good: "Agent 1 (SEO) → tworzy outline.\nAgent 2 (Copywriter) → pisze tekst.\nAgent 3 (Redaktor) → sprawdza tekst." },
      { type: "highlight", icon: "Sparkles", title: "Synergia", text: "Agenci mogą oceniać pracę innych agentów, tworząc zamkniętą pętlę jakości (Self-Refine w grupie)." },
    ],
    tips: ["Jeden agent = jeden cel.", "Nadaj każdemu agentowi precyzyjną Personę.", "Stwórz 'Agenta-Menedżera', który koordynuje pracę pozostałych."]
  },
  {
    id: "sequential-processing", title: "6. Pipeline'y: Przetwarzanie sekwencyjne vs Równoległe", duration: "20 min", semester: 3,
    content: [
      { type: "text", text: "Sposób, w jaki przesyłasz dane między krokami, decyduje o czasie trwania i kosztach." },
      { type: "title", text: "Przetwarzanie Sekwencyjne" },
      { type: "text", text: "Krok B czeka na zakończenie Kroku A. Idealne dla zadań zależnych (np. streszczenie → tłumaczenie)." },
      { type: "title", text: "Przetwarzanie Równoległe" },
      { type: "text", text: "Krok B i C wykonują się jednocześnie. Znacznie przyspiesza proces." },
      { type: "list", items: ["**Przykład:** Jeden tekst wejściowy jest jednocześnie tłumaczony na EN, ES i DE. Na koniec wyniki są łączone."] },
      { type: "prompt-box", title: "Równoległa weryfikacja", code: "Tekst wejściowy trafia do 3 agentów-krytyków.\nAgent 1 ocenia SEO.\nAgent 2 ocenia Ton.\nAgent 3 ocenia Fakty.\nWyniki wracają do Agenta Głównego w tym samym czasie." },
    ],
    tips: ["Gdzie tylko to możliwe, używaj asynchroniczności (równoległości) – oszczędzisz mnóstwo czasu.", "Uważaj na limity zapytań (Rate Limits) przy równoległym wysyłaniu setek requestów API.", "Do łączenia wyników równoległych używaj modułów 'Aggregator' w Make.com."]
  },
  {
    id: "gate-keeping", title: "7. Gate Keeping i Walidacja danych", duration: "25 min", semester: 3,
    content: [
      { type: "text", text: "Ślepe przekazywanie danych od jednego AI do drugiego to recepta na katastrofę (tzw. efekt kuli śnieżnej błędów)." },
      { type: "title", text: "Czym jest Gate Keeping?" },
      { type: "text", text: "To punkt kontrolny. Model waliduje, czy wynik poprzedniego kroku spełnia określone kryteria, zanim puści go dalej." },
      { type: "list", items: ["**Walidacja formatu:** Czy wynik jest poprawnym JSON-em?", "**Walidacja logiki:** Czy ocena ryzyka ma wartość między 1 a 10?", "**Walidacja jakości:** Czy tekst zawiera słowa zakazane?"] },
      { type: "comparison", bad: "Draft → Publikacja", good: "Draft → Walidator (Czy format = markdown? Czy długość > 500 słów?) → Publikacja" },
    ],
    tips: ["Używaj modeli o wysokiej precyzji logiki (GPT-4o) do Gate Keepingu.", "Jeśli walidacja nie przejdzie, zbuduj pętlę powrotną, aby AI poprawiło swój błąd.", "Wymuszaj format JSON, aby łatwo parsować zmienne w narzędziach automatyzacji."]
  },
  {
    id: "error-handling", title: "8. Obsługa błędów i Fallbacks", duration: "20 min", semester: 3,
    content: [
      { type: "text", text: "API potrafią być niedostępne. Modele mogą wygenerować błąd. Twój workflow musi być na to odporny." },
      { type: "title", text: "Techniki odporności (Resilience)" },
      { type: "list", items: ["**Fallback Model:** Jeśli Claude 3.5 zwróci błąd, automatycznie wywołaj GPT-4o.", "**Retries (Ponawianie):** Skonfiguruj automatyczne ponowienie po 1 minucie (np. błąd 429 Too Many Requests).", "**Default Values:** Jeśli AI nie wyciągnie imienia, użyj domyślnego (np. 'Kliencie').", "**Powiadomienia o błędach:** Wyślij na Slacka/Discorda powiadomienie, że proces się zatrzymał."] },
      { type: "highlight", icon: "AlertCircle", title: "Krytyczne podejście", text: "Nigdy nie zakładaj, że AI zawsze zwróci poprawny format. Pisz skrypty obsługujące błędy parsowania." },
    ],
    tips: ["W Make.com używaj modułów 'Error Handler' (Ignore, Break, Resume).", "Miej zawsze plan zapasowy dla najważniejszych węzłów procesu.", "Zapisuj logi wykonania (np. w Google Sheets) dla każdego błędu."]
  },
  {
    id: "testing-metrics", title: "9. Testowanie i Monitorowanie", duration: "20 min", semester: 4,
    content: [
      { type: "text", text: "Workflow, który działał wczoraj, może przestać działać dzisiaj (np. przez aktualizację modelu)." },
      { type: "title", text: "Jak testować Workflows?" },
      { type: "list", items: ["**Testy jednostkowe (Unit Tests):** Przetestuj każdy prompt i krok niezależnie na 10 różnych zestawach danych.", "**Testy end-to-end (E2E):** Prześlij dane przez cały proces i sprawdź wynik końcowy.", "**A/B Testing:** Puszczaj ruch na dwie wersje promptu i mierz, która konwertuje lepiej."] },
      { type: "title", text: "Metryki sukcesu" },
      { type: "text", text: "Mierz wskaźnik sukcesu (Success Rate), czas wykonania oraz liczbę interwencji manualnych." },
    ],
    tips: ["Zbuduj 'Golden Dataset' (zestaw 50 testowych przypadków). Przy zmianie promptu, przetestuj go na całym zbiorze.", "Uważaj na 'ciche błędy' – proces przebiega do końca, ale jakość wygenerowanego tekstu spada.", "Regularnie przeglądaj to, co produkuje Twój workflow – AI może zboczyć z kursu (tzw. model drift)."]
  },
  {
    id: "cost-optimization", title: "10. Optymalizacja kosztów", duration: "15 min", semester: 4,
    content: [
      { type: "text", text: "Na początku testuj na najdroższych, najlepszych modelach. Kiedy workflow działa, zacznij optymalizować koszty." },
      { type: "title", text: "Strategie cięcia kosztów" },
      { type: "list", items: ["**Zamiana modeli:** Do prostych zadań (tak/nie, wyciąganie danych) zamień GPT-4o na GPT-4o-mini lub Haiku. Zmniejszy to koszty nawet 30-krotnie.", "**Zmniejszanie kontekstu:** Przesyłaj do AI tylko ten fragment tekstu, którego faktycznie potrzebuje. Odrzucaj stopki maili czy powielone wątki.", "**Buforowanie (Caching):** Jeśli workflow często otrzymuje te same zapytania, zapisuj odpowiedź w bazie i zwracaj ją bez pytania AI."] },
      { type: "comparison", bad: "Przesyłanie 50-stronicowego PDFa do oznaczania kategorii w GPT-4.", good: "Użycie algorytmu wyszukiwania (RAG) do znalezienia odpowiedniej strony, i użycie GPT-4o-mini do wyciągnięcia kategorii." },
    ],
    tips: ["Monitoruj zużycie tokenów dla każdego procesu z osobna.", "Tańsze modele często wymagają bardziej rygorystycznych promptów i większej liczby przykładów (Few-Shot).", "Optymalizacja kosztów powinna być ostatnim krokiem, nie pierwszym."]
  }
];
