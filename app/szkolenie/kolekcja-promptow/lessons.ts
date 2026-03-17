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
  { id: 1, name: "Moduł I: Jak korzystać z kolekcji promptów", lessons: [0, 1, 2] },
  { id: 2, name: "Moduł II: Prompty biznesowe i komunikacyjne", lessons: [3, 4, 5] },
  { id: 3, name: "Moduł III: Prompty kreatywne i procesowe", lessons: [6, 7, 8] },
  { id: 4, name: "Moduł IV: Prompty branżowe i zaawansowane", lessons: [9, 10, 11] },
];

export const lessons: Lesson[] = [
  // ── MODUŁ I ──────────────────────────────────────────
  {
    id: "how-to-use-prompts",
    title: "1. Jak wybierać i dostosowywać prompty",
    duration: "15 min",
    semester: 1,
    content: [
      { type: "text", text: "Ta kolekcja to **Twoja biblioteka gotowych narzędzi**. Każdy prompt jest przetestowany i gotowy do użycia — wystarczy uzupełnić zmienne [DO UZUPEŁNIENIA]. Ale żeby wyciągnąć maksimum, musisz wiedzieć JAK je dostosowywać." },
      { type: "title", text: "Zasady korzystania z kolekcji" },
      { type: "list", items: [
        "**Wybierz prompt** najbliższy Twojemu zadaniu — nie musisz znaleźć idealnego.",
        "**Uzupełnij zmienne** [DO UZUPEŁNIENIA] swoimi konkretnymi danymi.",
        "**Dostosuj ton i styl** — zmień 'profesjonalny' na 'luźny' jeśli potrzebujesz.",
        "**Iteruj** — pierwszy wynik to draft, popraw 2-3 razy.",
        "**Zapisz działające wersje** — buduj własną bibliotekę z testowanych promptów.",
      ] },
      { type: "highlight", icon: "Brain", title: "Anatomia promptu z kolekcji", text: "Każdy prompt ma: ROLĘ (kim jest AI), INSTRUKCJĘ (co ma zrobić), KONTEKST (zmienne do uzupełnienia), FORMAT (jak ma wyglądać wynik). Modyfikuj dowolną część." },
      { type: "prompt-box", title: "Jak dostosować prompt", code: "ORYGINALNY PROMPT:\nJesteś ekspertem od [DZIEDZINA]. Napisz [TYP TREŚCI] na temat [TEMAT].\n\nDOSTOSOWANY:\nJesteś ekspertem od marketingu e-commerce z 10-letnim doświadczeniem w branży kosmetycznej. Napisz artykuł blogowy (1500 słów) na temat 5 sposobów na zwiększenie konwersji w sklepie z kosmetykami naturalnymi. Ton: przyjazny, ekspercki. Grupa: właścicielki małych sklepów online." },
    ],
    tips: [
      "Prompt z kolekcji to punkt startu, nie gotowy produkt — zawsze dostosuj.",
      "Im więcej kontekstu dodasz do zmiennych, tym lepszy wynik.",
      "Testuj ten sam prompt w ChatGPT i Claude — porównaj wyniki.",
      "Oznaczaj prompty gwiazdkami: ★★★★★ = zawsze działa, ★★☆☆☆ = wymaga poprawek.",
    ],
  },
  {
    id: "prompt-parameters",
    title: "2. Parametry, role i kontekst — klucz do jakości",
    duration: "20 min",
    semester: 1,
    content: [
      { type: "text", text: "Różnica między słabym a świetnym promptem to **szczegóły**. Rola, kontekst, format, ograniczenia — każdy parametr zwiększa jakość odpowiedzi. Naucz się je kontrolować." },
      { type: "title", text: "Parametry do modyfikacji" },
      { type: "list", items: [
        "**Rola:** 'Jesteś senior copywriterem z 15-letnim doświadczeniem w B2B SaaS'.",
        "**Ton:** profesjonalny / luźny / akademicki / sprzedażowy / empatyczny.",
        "**Format:** lista / tabela / JSON / markdown / e-mail / prezentacja.",
        "**Długość:** 100 słów / 500 słów / 1 strona A4 / max 3 zdania.",
        "**Język:** polski / angielski / oba / techniczny / prosty.",
        "**Ograniczenia:** 'NIE używaj żargonu', 'UNIKAJ pasywnych form', 'BEZ emoji'.",
        "**Przykład:** daj AI wzorcowy output, który ma naśladować.",
      ] },
      { type: "comparison", bad: "Napisz mi tekst o AI.", good: "Jesteś ekspertem od AI w HR z doświadczeniem w firmach 50-200 osób. Napisz artykuł (800 słów) o 3 sposobach na wykorzystanie AI w rekrutacji. Ton: profesjonalny ale przystępny. Format: wstęp + 3 sekcje z podtytułami + podsumowanie. Bez żargonu technicznego. Grupa: HR managerowie w polskich firmach." },
      { type: "prompt-box", title: "Uniwersalny szablon z parametrami", code: "ROLA: Jesteś [ROLA Z DOŚWIADCZENIEM].\n\nZADANIE: [DOKŁADNY OPIS ZADANIA]\n\nKONTEKST:\n- Branża: [BRANŻA]\n- Grupa docelowa: [KTO PRZECZYTA/UŻYJE]\n- Cel: [CO CHCEMY OSIĄGNĄĆ]\n\nFORMAT:\n- Typ: [LISTA/TABELA/TEKST/EMAIL]\n- Długość: [KONKRETNA DŁUGOŚĆ]\n- Język: [JĘZYK I STYL]\n- Struktura: [SEKCJE/PODTYTUŁY]\n\nOGRANICZENIA:\n- [CZEGO UNIKAĆ]\n- [CO MUSI ZAWIERAĆ]\n\nPRZYKŁAD OCZEKIWANEGO WYNIKU:\n[WZORCOWY FRAGMENT]" },
    ],
    tips: [
      "Rola + kontekst = 80% jakości promptu.",
      "Zawsze podawaj przykład oczekiwanego wyniku — AI uczy się przez naśladowanie.",
      "Ograniczenia są tak samo ważne jak instrukcje — mów czego NIE chcesz.",
      "Testuj parametry osobno: zmień tylko ton i porównaj wyniki.",
    ],
  },
  {
    id: "organizing-prompts",
    title: "3. Organizacja biblioteki promptów",
    duration: "15 min",
    semester: 1,
    content: [
      { type: "text", text: "Biblioteka promptów to **żywy organizm**. Bez dobrej organizacji stanie się chaotycznym zbiorem, którego nie da się przeszukać. Stwórz system od dnia 1." },
      { type: "title", text: "System organizacji" },
      { type: "list", items: [
        "**Kategorie główne:** Biznes, Marketing, Sprzedaż, Operacje, Kreatywność, Analiza, HR.",
        "**Podkategorie:** np. Marketing → Social Media, Newsletter, SEO, Reklamy.",
        "**Tagi:** #email #raport #social #klient #wewnętrzny #draft #final.",
        "**Ocena:** ★1-5 — jak dobrze prompt działa.",
        "**Model:** Który AI model daje najlepsze wyniki (GPT/Claude/Gemini).",
        "**Status:** Draft / Testowany / Zatwierdzony / Archiwum.",
      ] },
      { type: "prompt-box", title: "Szablon katalogu promptów (Notion)", code: "## 📚 Biblioteka Promptów\n\n### Kolumny bazy danych:\n| Pole | Typ | Przykład |\n|------|-----|----------|\n| Nazwa | Tekst | 'Generator postów LinkedIn' |\n| Kategoria | Select | Marketing |\n| Podkategoria | Select | Social Media |\n| Tagi | Multi-select | #linkedin #post #B2B |\n| Ocena | Rating (1-5) | ★★★★☆ |\n| Model | Select | Claude 3.5 |\n| Status | Select | Zatwierdzony |\n| Prompt | Long text | [pełny tekst] |\n| Notatki | Long text | 'Działa najlepiej z...' |\n| Ostatnia aktualizacja | Date | 2025-01-15 |" },
      { type: "highlight", icon: "Sparkles", title: "Zasada 80/20", text: "80% Twojej pracy pokrywa 20% promptów. Zidentyfikuj swoje TOP 10 promptów i oznacz je jako 'Favorites'. To Twój codzienny arsenał." },
    ],
    tips: [
      "Zacznij od prostej listy — perfekcyjna organizacja przyjdzie z czasem.",
      "Co piątek: 10 min na przegląd i aktualizację biblioteki.",
      "Udostępnij bibliotekę zespołowi — mnożysz wartość.",
      "Archiwizuj, nie kasuj — stary prompt może się przydać.",
    ],
  },

  // ── MODUŁ II ──────────────────────────────────────────
  {
    id: "business-strategy-prompts",
    title: "4. Prompty strategiczne i decyzyjne",
    duration: "25 min",
    semester: 2,
    content: [
      { type: "text", text: "Prompty strategiczne pomagają **analizować, planować i podejmować lepsze decyzje**. Nie zastąpią Twojej ekspertyzy, ale dadzą Ci framework myślenia i pomogą spojrzeć na problem z wielu stron." },
      { type: "prompt-box", title: "Analiza SWOT", code: "Przeprowadź analizę SWOT dla:\n\nFirma/produkt: [OPIS]\nBranża: [BRANŻA]\nRynek: [RYNEK DOCELOWY]\n\nDla każdego elementu (Strengths, Weaknesses, Opportunities, Threats) podaj:\n- Minimum 5 punktów\n- Przy każdym: krótkie uzasadnienie\n- Ocena wpływu (niski/średni/wysoki)\n\nNa końcu: 3 strategiczne rekomendacje wynikające z analizy." },
      { type: "prompt-box", title: "Analiza konkurencji", code: "Przeanalizuj konkurencję dla [MOJA FIRMA/PRODUKT]:\n\nKonkurenci: [LISTA 3-5 KONKURENTÓW]\n\nDla każdego konkurenta:\n1. Główna propozycja wartości\n2. Grupa docelowa\n3. Cennik (jeśli publiczny)\n4. Mocne strony\n5. Słabe strony\n6. Czym się wyróżniają\n\nPodsumowanie:\n- Luki rynkowe (gdzie NIE ma silnej konkurencji)\n- Moje unikalne przewagi\n- 3 rekomendacje pozycjonowania" },
      { type: "prompt-box", title: "Scenariusze 'What If'", code: "Rozważ scenariusze dla decyzji: [OPIS DECYZJI]\n\nKontekst: [SYTUACJA FIRMY]\n\nScenariusz 1 (Optymistyczny):\n- Co się stanie jeśli [POZYTYWNY WYNIK]\n- Prawdopodobieństwo: [%]\n- Wpływ na firmę: [OPIS]\n\nScenariusz 2 (Realistyczny):\n- Co się stanie jeśli [BAZOWY WYNIK]\n- Prawdopodobieństwo: [%]\n\nScenariusz 3 (Pesymistyczny):\n- Co się stanie jeśli [NEGATYWNY WYNIK]\n- Plan B:\n\nRekomendacja: który scenariusz planować jako bazowy i jak się zabezpieczyć." },
      { type: "prompt-box", title: "Decyzja Go/No-Go", code: "Pomóż mi podjąć decyzję:\n\nDecyzja: [OPIS]\nOpcja A: [OPIS OPCJI A]\nOpcja B: [OPIS OPCJI B]\n\nKryteria (ważność 1-10):\n1. Koszt: [WAGA]\n2. Czas wdrożenia: [WAGA]\n3. Ryzyko: [WAGA]\n4. Potencjalny zysk: [WAGA]\n5. [DODATKOWE KRYTERIUM]: [WAGA]\n\nDla każdej opcji oceń każde kryterium (1-10), oblicz ważoną sumę i daj jednoznaczną rekomendację z uzasadnieniem." },
    ],
    tips: [
      "Prompty strategiczne wymagają DUŻO kontekstu — nie oszczędzaj na opisie sytuacji.",
      "Zawsze proś o argumenty ZA i PRZECIW — AI zbyt łatwo zgadza się z Tobą.",
      "Scenariusze 'what if' to Twoja supermoc — testuj hipotezy bez ryzyka.",
      "Wyniki AI traktuj jako input do SWOJEJ decyzji, nie jako decyzję.",
    ],
  },
  {
    id: "communication-prompts",
    title: "5. Prompty do e-maili, dokumentów i spotkań",
    duration: "25 min",
    semester: 2,
    content: [
      { type: "text", text: "Komunikacja biznesowa to **największy pożeracz czasu**. Poniższe prompty pokrywają 90% Twoich potrzeb: e-maile, dokumenty, notatki, prezentacje." },
      { type: "prompt-box", title: "Cold email", code: "Napisz cold email:\n\nDo: [STANOWISKO] w firmie [BRANŻA]\nMoja oferta: [CO SPRZEDAJĘ]\nGłówna korzyść: [KONKRETNA KORZYŚĆ Z LICZBĄ]\n\n3 warianty:\n1. Wersja 'pain point' — zacznij od problemu\n2. Wersja 'social proof' — zacznij od wyniku klienta\n3. Wersja 'pytanie' — zacznij od prowokacyjnego pytania\n\nKażdy: max 120 słów, 1 CTA, bez przywiązań typu 'Mam nadzieję, że ten mail...'" },
      { type: "prompt-box", title: "Odpowiedź na trudnego maila", code: "Otrzymałem tego maila:\n\n[WKLEJ MAILA]\n\nSytuacja: [KONTEKST — np. klient jest niezadowolony, kolega krytykuje projekt]\n\nNapisz odpowiedź:\n- Ton: [ASERTYWNY ALE UPRZEJMY / EMPATYCZNY / PROFESJONALNY]\n- Cel: [CO CHCĘ OSIĄGNĄĆ]\n- Max: 150 słów\n- Bez defensywności, bez agresji" },
      { type: "prompt-box", title: "Agenda spotkania", code: "Stwórz agendę spotkania:\n\nTemat: [TEMAT]\nUczestnicy: [KTO]\nCzas: [DŁUGOŚĆ]\nCel: [CO CHCEMY OSIĄGNĄĆ]\n\nFormat:\n1. Opening (2 min) — kontekst i cel\n2. [PUNKT 1] ([CZAS]) — [KTO PROWADZI]\n3. [PUNKT 2] ([CZAS]) — [KTO PROWADZI]\n4. Dyskusja ([CZAS])\n5. Action points i następne kroki (5 min)\n\nDodaj: pytania do przygotowania dla uczestników." },
      { type: "prompt-box", title: "Brief projektowy", code: "Stwórz brief projektu:\n\nNazwa projektu: [NAZWA]\nCel: [CO CHCEMY OSIĄGNĄĆ]\nZleceniodawca: [KTO]\nTermin: [DEADLINE]\n\nStruktura briefa:\n1. Kontekst i tło projektu\n2. Cele SMART (Specific, Measurable, Achievable, Relevant, Time-bound)\n3. Grupa docelowa\n4. Zakres prac (co JEST w scope, co NIE)\n5. Kluczowe kamienie milowe\n6. Budżet i zasoby\n7. Kryteria sukcesu\n8. Ryzyka i mitygacja" },
    ],
    tips: [
      "Cold email: testuj 3 warianty i mierz open rate / response rate.",
      "Na trudne maile: odczekaj 1h, potem użyj AI do odpowiedzi — emocje ≠ strategia.",
      "Agenda spotkania z AI = spotkanie o 50% krótsze.",
      "Brief projektowy eliminuje 80% nieporozumień — inwestycja 15 min oszczędza tygodnie.",
    ],
  },
  {
    id: "sales-marketing-prompts",
    title: "6. Prompty sprzedażowe i marketingowe",
    duration: "25 min",
    semester: 2,
    content: [
      { type: "text", text: "Marketing i sprzedaż to **idealne pole dla AI**. Generowanie wariantów copy, personalizacja, analiza — AI robi to szybciej i taniej. Poniżej gotowe prompty na każdą okazję." },
      { type: "prompt-box", title: "Landing page copy", code: "Napisz copy na landing page:\n\nProdukt/usługa: [OPIS]\nGrupa docelowa: [KTO]\nGłówna korzyść: [KONKRETNY BENEFIT]\nCTA: [CO MA ZROBIĆ UŻYTKOWNIK]\n\nSekcje:\n1. Hero (nagłówek + podtytuł + CTA)\n2. Problem (jaki ból rozwiązujesz)\n3. Rozwiązanie (jak Twój produkt pomaga)\n4. Korzyści (5 punktów z ikonami)\n5. Social proof (placeholder na testimoniale)\n6. FAQ (5 pytań i odpowiedzi)\n7. Finalne CTA\n\nTon: [TON]. Bez korpo-bełkotu. Każde zdanie musi dawać wartość." },
      { type: "prompt-box", title: "Posty social media (pakiet)", code: "Wygeneruj pakiet 10 postów na [PLATFORMA]:\n\nTematyka: [BRANŻA/TEMAT]\nTon: [TON]\nGrupa: [KTO]\n\nMix:\n- 3 edukacyjne (tips, how-to)\n- 2 angażujące (pytanie, kontrowersja)\n- 2 personal branding (historia, behind the scenes)\n- 2 sprzedażowe (oferta, case study)\n- 1 trendowy (aktualność z branży)\n\nKażdy post:\n- Hook (pierwsze zdanie — MUSI zatrzymać scrollowanie)\n- Treść (max 200 słów)\n- CTA\n- 5 hashtagów" },
      { type: "prompt-box", title: "Opis produktu", code: "Napisz opis produktu:\n\nProdukt: [NAZWA]\nKategoria: [KATEGORIA]\nGłówne cechy: [LISTA CECH]\nGrupa docelowa: [KTO KUPUJE]\nCena: [CENA]\nKonkurencja: [GŁÓWNA ALTERNATYWA]\n\nFormat:\n1. Nagłówek SEO (max 70 znaków)\n2. Krótki opis (2-3 zdania, hook)\n3. Pełny opis (200-300 słów)\n4. Lista korzyści (5-7 bulletów)\n5. Specyfikacja techniczna (tabela)\n6. Meta description (max 155 znaków)\n\nStyl: [STYL]. Skup się na KORZYŚCIACH, nie cechach." },
      { type: "prompt-box", title: "Newsletter", code: "Napisz newsletter:\n\nTemat: [TEMAT]\nGrupa: [ODBIORCY]\nCel: [CO CHCESZ OSIĄGNĄĆ]\n\n1. Subject line (3 warianty, max 50 znaków)\n2. Preheader (max 100 znaków)\n3. Intro hook (2-3 zdania)\n4. Sekcja główna (300 słów, wartość merytoryczna)\n5. Quick tips (3-5 bulletów)\n6. CTA (jeden, jasny)\n7. PS (dodatkowa zachęta)\n\nTon: [TON]. Pisz jak do przyjaciela, nie jak korporacja." },
    ],
    tips: [
      "Landing page: testuj 3 wersje nagłówka — to decyduje o konwersji.",
      "Social media: generuj 20 hooków, wybieraj najlepsze 3.",
      "Opisy produktów: korzyści > cechy. 'Oszczędź 2h dziennie' > 'Procesor 3.5 GHz'.",
      "Newsletter: krótszy = lepszy. Szanuj czas czytelnika.",
    ],
  },

  // ── MODUŁ III ──────────────────────────────────────────
  {
    id: "creative-prompts",
    title: "7. Prompty kreatywne — copywriting i storytelling",
    duration: "25 min",
    semester: 3,
    content: [
      { type: "text", text: "Kreatywność z AI to nie oksymoron. AI **generuje warianty, inspiruje, łamie blokadę twórczą**. Twoja rola: selekcja, edycja, dodanie autentycznego głosu. Poniżej prompty na kreatywne zadania." },
      { type: "prompt-box", title: "Storytelling dla marki", code: "Napisz historię marki:\n\nMarka: [NAZWA]\nZałożyciel: [IMIĘ]\nGeneza: [JAK POWSTAŁ POMYSŁ]\nMisja: [MISJA]\nGrupa docelowa: [KTO]\n\nStruktura (Hero's Journey):\n1. Status quo (jak było przed)\n2. Problem (co nie działało)\n3. Punkt zwrotny (moment 'aha!')\n4. Rozwiązanie (jak powstał produkt/firma)\n5. Transformacja (jak zmienia życie klientów)\n6. Wizja przyszłości\n\nTon: autentyczny, inspirujący, bez przesady. Max 500 słów." },
      { type: "prompt-box", title: "Brainstorming pomysłów", code: "Potrzebuję pomysłów na: [TEMAT/WYZWANIE]\n\nKontekst: [SYTUACJA]\nOgraniczenia: [BUDŻET/CZAS/ZASOBY]\n\nWygeneruj 20 pomysłów w 4 kategoriach:\n1. Bezpieczne (sprawdzone, niskie ryzyko) — 5 pomysłów\n2. Kreatywne (nietypowe, średnie ryzyko) — 5 pomysłów\n3. Szalone (innowacyjne, wysokie ryzyko) — 5 pomysłów\n4. Hybrydowe (łączą elementy powyższych) — 5 pomysłów\n\nDla każdego: 1-2 zdania opisu + szacowany wpływ (niski/średni/wysoki)." },
      { type: "prompt-box", title: "Nagłówki i hooki", code: "Wygeneruj 20 wariantów nagłówka/hooka dla:\n\nTemat: [TEMAT]\nFormat: [ARTYKUŁ/POST/REKLAMA/EMAIL]\nGrupa: [KTO]\n\nTypy hooków:\n- 5 × pytanie (np. 'Czy wiesz, że...?')\n- 5 × liczba/statystyka (np. '97% firm...')\n- 5 × kontrowersja/kontrast (np. 'Przestań robić X, zacznij Y')\n- 5 × historia (np. 'Kiedy straciłem wszystkich klientów...')\n\nKażdy max 15 słów. Ocena siły hooka: ★1-5." },
      { type: "prompt-box", title: "Rewrite / poprawa tekstu", code: "Popraw poniższy tekst:\n\n[WKLEJ TEKST]\n\nZasady poprawki:\n- Ton: [DOCELOWY TON]\n- Skróć o [X]%\n- Zamień stronę bierną na czynną\n- Usuń korpo-bełkot i wypełniacze\n- Dodaj konkretne liczby/przykłady\n- Wzmocnij CTA\n\nPodaj wersję poprawioną + listę zmian (co i dlaczego zmieniłeś)." },
    ],
    tips: [
      "Storytelling: autentyczność > perfekcja. Prawdziwe historie sprzedają.",
      "Brainstorming: nie oceniaj pomysłów od razu — zbierz 20, wybierz 3.",
      "Hooki: generuj 20, testuj 3. Dane mówią, nie intuicja.",
      "Rewrite: AI najlepiej poprawia istniejący tekst, niż pisze od zera.",
    ],
  },
  {
    id: "process-prompts",
    title: "8. Prompty procesowe — SOP-y, checklisty, research",
    duration: "25 min",
    semester: 3,
    content: [
      { type: "text", text: "Procesy, procedury i research — to zadania, które **pochłaniają godziny, ale AI robi je w minuty**. Poniższe prompty zamieniają chaotyczne procesy w uporządkowane systemy." },
      { type: "prompt-box", title: "Generator SOP", code: "Stwórz SOP (Standard Operating Procedure) dla:\n\nProces: [NAZWA PROCESU]\nObecny przebieg: [OPISZ JAK TO ROBICIE TERAZ]\nKto wykonuje: [STANOWISKO]\nCzęstotliwość: [JAK CZĘSTO]\n\nFormat SOP:\n1. Cel procedury\n2. Zakres (kto, kiedy, gdzie)\n3. Wymagane narzędzia\n4. Kroki (numerowane, z checkboxami ☐)\n5. Przypadki szczególne\n6. Metryki sukcesu\n7. FAQ (5 najczęstszych pytań)\n\nJęzyk: prosty, zrozumiały dla nowego pracownika." },
      { type: "prompt-box", title: "Research report", code: "Przeprowadź research na temat: [TEMAT]\n\nKontekst: [DLACZEGO POTRZEBUJĘ TEJ WIEDZY]\nGłębokość: [PRZEGLĄD / SZCZEGÓŁOWY / EKSPERCKI]\n\nStruktura raportu:\n1. Executive summary (5 zdań)\n2. Tło i kontekst\n3. Kluczowe znaleziska (5-10 punktów)\n4. Dane i statystyki\n5. Trendy i prognozy\n6. Implikacje dla [MOJEJ FIRMY/PROJEKTU]\n7. Rekomendacje (5 punktów)\n8. Źródła i dalsze czytanie\n\nFormat: profesjonalny raport, gotowy do prezentacji." },
      { type: "prompt-box", title: "Checklista onboardingowa", code: "Stwórz checklistę onboardingu nowego pracownika:\n\nStanowisko: [STANOWISKO]\nFirma: [BRANŻA, ROZMIAR]\nNarzędzia: [JAKIE NARZĘDZIA UŻYWACIE]\n\nStruktura:\n\nDzień 1: Powitanie i setup\n☐ [Zadanie] — Odpowiedzialny: [KTO]\n...\n\nTydzień 1: Wprowadzenie\n☐ [Zadanie]\n...\n\nMiesiąc 1: Samodzielność\n☐ [Zadanie]\n...\n\nDodaj: kryteria sukcesu (po czym poznamy, że onboarding się udał)." },
      { type: "prompt-box", title: "Tworzenie szkolenia", code: "Zaprojektuj szkolenie wewnętrzne:\n\nTemat: [TEMAT]\nGrupa: [KTO BĘDZIE UCZESTNICZYĆ]\nPoziom: [POCZĄTKUJĄCY/ŚREDNI/ZAAWANSOWANY]\nCzas: [DŁUGOŚĆ SZKOLENIA]\n\nStruktura:\n1. Cele szkolenia (3-5 mierzalnych celów)\n2. Agenda (podział na bloki z czasem)\n3. Materiały do przygotowania\n4. Ćwiczenia praktyczne (min. 3)\n5. Quiz sprawdzający (10 pytań)\n6. Ewaluacja (ankieta po szkoleniu)\n7. Materiały dodatkowe (linki, pliki)" },
    ],
    tips: [
      "SOP-y z AI: 5 minut promptu = procedura, którą zespół używa miesiącami.",
      "Research: proś AI o źródła — weryfikuj kluczowe dane.",
      "Checklisty: testuj z prawdziwym nowym pracownikiem i iteruj.",
      "Szkolenia z AI: AI generuje strukturę, Ty dodajesz ekspertyzę i przykłady.",
    ],
  },
  {
    id: "data-analysis-prompts",
    title: "9. Prompty analityczne — dane, raporty, Excel",
    duration: "25 min",
    semester: 3,
    content: [
      { type: "text", text: "Analiza danych z AI to **demokratyzacja analityki**. Nie musisz być data scientistem, żeby wyciągać wnioski z danych. Wystarczy wrzucić dane i zadać właściwe pytania." },
      { type: "prompt-box", title: "Analiza danych sprzedażowych", code: "Przeanalizuj poniższe dane sprzedażowe:\n\n[WKLEJ DANE LUB OPIS]\n\nAnaliza:\n1. Trend ogólny (wzrost/spadek/stagnacja)\n2. Top 5 produktów/usług (przychód)\n3. Bottom 5 (najsłabsze wyniki)\n4. Sezonowość (czy widać wzorce)\n5. Anomalie (nietypowe skoki/spadki)\n6. Korelacje (co wpływa na co)\n\nRekomendacje:\n- 3 szybkie działania (quick wins)\n- 3 strategiczne zmiany (długoterminowe)\n\nFormat: raport z liczbami, gotowy dla zarządu." },
      { type: "prompt-box", title: "Formuły Excel", code: "Potrzebuję formuły Excel:\n\nDane: [OPIS KOLUMN I DANYCH]\nCel: [CO CHCĘ OBLICZYĆ/OSIĄGNĄĆ]\n\nPodaj:\n1. Gotową formułę\n2. Wyjaśnienie krok po kroku\n3. Alternatywne rozwiązanie\n4. Ewentualne makro VBA (jeśli formuła zbyt złożona)\n5. Tips: jak uniknąć typowych błędów" },
      { type: "prompt-box", title: "Dashboard KPI", code: "Zaprojektuj dashboard KPI dla:\n\nFirma/dział: [OPIS]\nGłówne cele: [CELE BIZNESOWE]\n\nZaproponuj:\n1. Top 10 KPI do śledzenia (nazwa, wzór, target, częstotliwość)\n2. Układ dashboardu (które KPI na górze, logiczne grupy)\n3. Alerty: kiedy KPI jest 'na czerwono'\n4. Źródła danych dla każdego KPI\n5. Narzędzie: [Google Sheets / Looker / Power BI]\n\nFormat: tabela z KPI + szkic układu dashboardu." },
      { type: "prompt-box", title: "Prognoza i scenariusze", code: "Na podstawie danych historycznych:\n\n[WKLEJ DANE LUB OPISZ TRENDY]\n\nStwórz:\n1. Prognozę na [OKRES] (optymistyczna / realistyczna / pesymistyczna)\n2. Kluczowe założenia każdego scenariusza\n3. Czynniki ryzyka\n4. Rekomendacje: co zrobić w każdym scenariuszu\n5. Wizualizacja: opis wykresu do stworzenia" },
    ],
    tips: [
      "Wgrywaj surowe dane — AI lepiej pracuje na źródle niż na streszczeniu.",
      "Proś o wizualizacje — ChatGPT generuje wykresy w Pythonie.",
      "KPI: mniej = lepiej. 10 śledzonych > 50 ignorowanych.",
      "Prognozy AI: traktuj jako hipotezy, nie pewniki.",
    ],
  },

  // ── MODUŁ IV ──────────────────────────────────────────
  {
    id: "industry-prompts",
    title: "10. Prompty branżowe — pakiety dla 6 branż",
    duration: "30 min",
    semester: 4,
    content: [
      { type: "text", text: "Każda branża ma swoje specyficzne potrzeby. Poniżej **gotowe pakiety promptów** dla 6 najpopularniejszych branż. Wybierz swoją i dostosuj." },
      { type: "title", text: "Marketing & Reklama" },
      { type: "prompt-box", title: "Strategia kampanii", code: "Zaprojektuj strategię kampanii marketingowej:\n\nKlient: [BRANŻA, PRODUKT]\nBudżet: [KWOTA]\nCel: [KONWERSJE/AWARENESS/LEADS]\nKanały: [FACEBOOK/GOOGLE/LINKEDIN/INSTAGRAM]\nCzas: [OKRES KAMPANII]\n\nDostarczyć:\n1. Strategia (cel, KPI, targetowanie)\n2. 5 wariantów copy (nagłówek + opis + CTA)\n3. 3 koncepcje kreacji graficznych\n4. Media plan (podział budżetu per kanał)\n5. Harmonogram\n6. Metryki sukcesu" },
      { type: "title", text: "E-commerce & Sprzedaż" },
      { type: "prompt-box", title: "Optymalizacja konwersji", code: "Przeanalizuj stronę produktową i zaproponuj optymalizacje:\n\nProdukt: [NAZWA]\nAktualny opis: [WKLEJ]\nCena: [CENA]\nKonwersja: [OBECNA %]\n\nZaproponuj:\n1. Nowy nagłówek (3 warianty)\n2. Zoptymalizowany opis (korzyści > cechy)\n3. Ulepszenia UX (CTA, social proof, urgency)\n4. Cross-sell/up-sell sugestie\n5. A/B test plan (co testować najpierw)" },
      { type: "title", text: "HR & Rekrutacja" },
      { type: "prompt-box", title: "Ogłoszenie o pracę", code: "Napisz ogłoszenie o pracę:\n\nStanowisko: [STANOWISKO]\nFirma: [OPIS FIRMY, KULTURA]\nLokalizacja: [MIEJSCE/REMOTE]\nWynagrodzenie: [WIDEŁKI]\n\nStruktura:\n1. Hook (dlaczego warto tu pracować — 2 zdania)\n2. O firmie (3-4 zdania, konkretnie)\n3. Opis roli (co będziesz robić, 5-7 punktów)\n4. Wymagania (must-have vs nice-to-have)\n5. Oferujemy (benefity, kultura, rozwój)\n6. Proces rekrutacji (etapy)\n\nTon: ludzki, bez korpo-bełkotu. Nie pisz 'dynamiczny zespół'." },
      { type: "title", text: "Finanse & Analityka" },
      { type: "prompt-box", title: "Raport finansowy", code: "Stwórz raport finansowy na podstawie danych:\n\n[WKLEJ DANE LUB OPISZ]\n\nStruktura:\n1. Executive summary (5 zdań)\n2. Przychody vs plan (tabela)\n3. Koszty — top kategorie\n4. Marża i rentowność\n5. Cash flow\n6. Ryzyka i rekomendacje\n\nFormat: zwięzły, z liczbami, porównanie MoM i YoY." },
      { type: "title", text: "Edukacja & Szkolenia" },
      { type: "prompt-box", title: "Plan kursu", code: "Zaprojektuj kurs online:\n\nTemat: [TEMAT]\nGrupa: [KTO]\nPoziom: [POZIOM]\nDługość: [ILE LEKCJI/GODZIN]\n\nDla każdego modułu:\n1. Cel modułu\n2. Lekcje (tytuł + opis + czas)\n3. Ćwiczenie praktyczne\n4. Quiz (5 pytań)\n5. Materiały dodatkowe" },
    ],
    tips: [
      "Wybierz prompty dla SWOJEJ branży i dostosuj zmienne.",
      "Łącz prompty z różnych branż — np. HR prompt + marketing prompt dla employer brandingu.",
      "Branżowe prompty szybko się dezaktualizują — aktualizuj co kwartał.",
      "Twórz własne branżowe pakiety na bazie tych szablonów.",
    ],
  },
  {
    id: "advanced-techniques",
    title: "11. Prompty zaawansowane — Chain-of-Thought i Chaining",
    duration: "25 min",
    semester: 4,
    content: [
      { type: "text", text: "Zaawansowane techniki promptowania dają **wyniki o klasę wyższe** niż standardowe prompty. Chain-of-Thought, roleplaying, few-shot i prompt chaining — poznaj je i stosuj." },
      { type: "prompt-box", title: "Chain-of-Thought", code: "Rozwiąż poniższy problem krok po kroku:\n\n[OPIS PROBLEMU]\n\nPrzejdź przez następujące etapy:\n1. Zdefiniuj problem precyzyjnie\n2. Zidentyfikuj kluczowe zmienne\n3. Rozważ 3 możliwe podejścia\n4. Oceń każde podejście (za/przeciw)\n5. Wybierz najlepsze i uzasadnij\n6. Zaproponuj plan implementacji\n\nPomyśl krok po kroku. Pokaż rozumowanie." },
      { type: "prompt-box", title: "Roleplaying — ekspert", code: "Od teraz jesteś [ROLA — np. 'CFO z 20-letnim doświadczeniem w firmach technologicznych, który przeszedł przez 3 IPO'].\n\nTwoje cechy:\n- [CECHA 1 — np. 'Zawsze patrzysz na dane, nie opinie']\n- [CECHA 2 — np. 'Szukasz ryzyka zanim inni zobaczą szansę']\n- [CECHA 3 — np. 'Mówisz wprost, bez owijania']\n\nOdpowiadaj z tej perspektywy na moje pytania. Jeśli czegoś nie wiesz, powiedz wprost.\n\nPierwsze pytanie: [PYTANIE]" },
      { type: "prompt-box", title: "Few-shot (z przykładami)", code: "Twoim zadaniem jest [OPIS ZADANIA].\n\nOto przykłady oczekiwanego wyniku:\n\nPRZYKŁAD 1:\nWejście: [INPUT 1]\nWyjście: [OUTPUT 1]\n\nPRZYKŁAD 2:\nWejście: [INPUT 2]\nWyjście: [OUTPUT 2]\n\nPRZYKŁAD 3:\nWejście: [INPUT 3]\nWyjście: [OUTPUT 3]\n\nTeraz wykonaj to samo dla:\nWejście: [MÓJ INPUT]\nWyjście:" },
      { type: "title", text: "Prompt Chaining — seria powiązanych promptów" },
      { type: "prompt-box", title: "Chain: Research → Content", code: "KROK 1 (Research):\nPrzeprowadź research na temat [TEMAT]. Znajdź 10 kluczowych faktów, statystyk i trendów.\n\n→ Wynik → użyj jako wejście do KROK 2\n\nKROK 2 (Outline):\nNa podstawie researchu stwórz outline artykułu: tytuł, 5 sekcji z podtytułami, key points.\n\n→ Wynik → użyj jako wejście do KROK 3\n\nKROK 3 (Draft):\nNapisz pełny artykuł na podstawie outline. 1500 słów, ton [TON].\n\n→ Wynik → użyj jako wejście do KROK 4\n\nKROK 4 (Edit):\nPopraw artykuł: skróć o 20%, wzmocnij hooki, dodaj CTA. Podaj listę zmian." },
    ],
    tips: [
      "Chain-of-Thought: dodaj 'Pomyśl krok po kroku' do KAŻDEGO złożonego zadania.",
      "Roleplaying: im więcej szczegółów roli, tym lepsze odpowiedzi.",
      "Few-shot: 3 przykłady to minimum, 5 to ideał.",
      "Prompt chaining: wynik jednego promptu = input następnego. Zawsze lepsze niż mega-prompt.",
    ],
  },
  {
    id: "building-own-collection",
    title: "12. Twoja własna kolekcja — projekt końcowy",
    duration: "20 min",
    semester: 4,
    content: [
      { type: "text", text: "Najcenniejsza kolekcja promptów to **TWOJA kolekcja** — dopasowana do Twojej branży, stylu pracy i potrzeb. W tej lekcji zbudujesz pakiet 20+ własnych promptów." },
      { type: "title", text: "Jak zbudować kolekcję krok po kroku" },
      { type: "list", items: [
        "**Krok 1:** Wypisz 20 najczęstszych zadań w Twojej pracy.",
        "**Krok 2:** Dla każdego zadania napisz prompt (użyj szablonu z kolekcji jako bazy).",
        "**Krok 3:** Przetestuj każdy prompt 3 razy, ocen wyniki (1-5★).",
        "**Krok 4:** Popraw prompty z oceną <4★ (dodaj kontekst, przykłady, ograniczenia).",
        "**Krok 5:** Zorganizuj w bibliotekę (Notion/Obsidian/Sheets).",
        "**Krok 6:** Udostępnij zespołowi i zbieraj feedback.",
      ] },
      { type: "prompt-box", title: "Generator promptu do Twojego zadania", code: "Pomóż mi stworzyć prompt na powtarzalne zadanie:\n\nZadanie: [OPIS ZADANIA]\nKontekst: [BRANŻA, STANOWISKO]\nCzęstotliwość: [JAK CZĘSTO TO ROBIĘ]\nObecny czas: [ILE CZASU ZAJMUJE RĘCZNIE]\n\nStwórz prompt, który:\n1. Ma jasną ROLĘ dla AI\n2. Zawiera zmienne [DO UZUPEŁNIENIA] do szybkiej personalizacji\n3. Definiuje FORMAT wyjścia\n4. Zawiera OGRANICZENIA (czego unikać)\n5. Ma PRZYKŁAD oczekiwanego wyniku\n\nNastępnie: oceń prompt na skali 1-5 i zaproponuj ulepszenia." },
      { type: "title", text: "Zasady utrzymania kolekcji" },
      { type: "list", items: [
        "**Co tydzień:** Dodaj 2-3 nowe prompty z codziennej pracy.",
        "**Co 2 tygodnie:** Przejrzyj bibliotekę, aktualizuj oceny, usuń nieużywane.",
        "**Co miesiąc:** Testuj prompty z nowymi modelami AI (GPT, Claude, Gemini).",
        "**Co kwartał:** Duży przegląd — reorganizacja kategorii, usunięcie duplikatów.",
      ] },
      { type: "highlight", icon: "Sparkles", title: "Cel: 50+ promptów w 3 miesiące", text: "Po 3 miesiącach systematycznej pracy będziesz mieć 50+ przetestowanych promptów pokrywających 90% Twojej pracy. To Twój 'AI toolkit' wart setki zaoszczędzonych godzin." },
    ],
    tips: [
      "Zacznij od 5 promptów — perfekcja jest wrogiem postępu.",
      "Każdy prompt powinien oszczędzać minimum 5 minut per użycie.",
      "Dokumentuj CO działa i CO nie — to wiedza, której nie znajdziesz w kursach.",
      "Twoja kolekcja to Twoja przewaga konkurencyjna — traktuj ją jak aktywo.",
    ],
  },
];
