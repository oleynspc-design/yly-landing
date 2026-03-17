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
  { id: 1, name: "Moduł I: Mapa Twojej Pracy i Audyt Czasu", lessons: [0, 1, 2] },
  { id: 2, name: "Moduł II: Szablony Promptów i Zarządzanie Kontekstem", lessons: [3, 4, 5] },
  { id: 3, name: "Moduł III: Automatyzacja i Integracje", lessons: [6, 7, 8] },
  { id: 4, name: "Moduł IV: System Produktywności i Optymalizacja Kosztów", lessons: [9, 10, 11] },
];

export const lessons: Lesson[] = [
  // ── MODUŁ I ──────────────────────────────────────────
  {
    id: "work-audit",
    title: "1. Analiza tygodnia pracy — co delegować AI",
    duration: "20 min",
    semester: 1,
    content: [
      { type: "text", text: "Zanim zaczniesz optymalizować pracę z AI, musisz **dokładnie wiedzieć, na co tracisz czas**. Większość ludzi nie zdaje sobie sprawy, że 40-60% ich tygodnia to zadania powtarzalne, które AI może wykonać." },
      { type: "highlight", icon: "Brain", title: "Matryca delegowania do AI", text: "Podziel zadania na 4 kategorie: (1) AI robi w 100% — drafty, tłumaczenia, streszczenia. (2) AI + Twoja edycja — treści marketingowe, raporty. (3) AI wspiera — analiza danych, brainstorming. (4) Tylko Ty — decyzje strategiczne, relacje." },
      { type: "title", text: "Jak przeprowadzić audyt czasu" },
      { type: "list", items: [
        "**Dzień 1-2:** Zapisuj KAŻDE zadanie i czas jego wykonania (używaj Toggl, Clockify lub kartki).",
        "**Dzień 3:** Pogrupuj zadania: komunikacja, tworzenie treści, analiza, administracja, spotkania.",
        "**Dzień 4:** Oceń każde zadanie: czy AI może to zrobić? (tak/częściowo/nie)",
        "**Dzień 5:** Priorytetyzuj: zacznij od zadań, które (a) zajmują >2h/tydzień ORAZ (b) AI może je zrobić.",
      ] },
      { type: "prompt-box", title: "Audyt tygodnia pracy", code: "Jestem [STANOWISKO] i mój typowy tydzień wygląda tak:\n\nPoniedziałek: [ZADANIA]\nWtorek: [ZADANIA]\nŚroda: [ZADANIA]\nCzwartek: [ZADANIA]\nPiątek: [ZADANIA]\n\nDla każdego zadania:\n1. Oceń, czy AI może je wykonać (tak/częściowo/nie)\n2. Jeśli tak — jakie narzędzie AI i jak?\n3. Oszacuj oszczędność czasu tygodniowo\n4. Oceń trudność wdrożenia (łatwa/średnia/trudna)\n\nNa końcu: posortuj od największej oszczędności czasu i podaj TOP 5 'quick wins'." },
      { type: "comparison", bad: "Robię wszystko sam, bo 'AI nie zrobi tego tak dobrze jak ja'.", good: "Deleguję drafty do AI, edytuję 20%, oszczędzam 15h/tydzień." },
    ],
    tips: [
      "Nie szukaj perfekcji — szukaj 80% jakości w 20% czasu.",
      "Zacznij od 3 zadań, nie od 30.",
      "Mierz czas PRZED i PO wdrożeniu AI — to Twój dowód na ROI.",
      "Powtarzaj audyt co miesiąc — Twoja praca się zmienia.",
    ],
  },
  {
    id: "ai-delegation-framework",
    title: "2. Framework delegowania zadań do AI",
    duration: "25 min",
    semester: 1,
    content: [
      { type: "text", text: "Delegowanie zadań do AI to **umiejętność**, nie magia. Potrzebujesz systematycznego podejścia: jasny brief, kontekst, format wyjścia i kryteria jakości. Bez tego AI daje losowe, bezużyteczne wyniki." },
      { type: "title", text: "Framework RICE dla AI" },
      { type: "list", items: [
        "**R — Rola:** Kim ma być AI? (np. 'Jesteś doświadczonym copywriterem B2B')",
        "**I — Instrukcja:** Co dokładnie ma zrobić? (konkretne zadanie, nie 'napisz coś fajnego')",
        "**C — Kontekst:** Jakie informacje potrzebuje? (branża, ton, grupa docelowa, przykłady)",
        "**E — Efekt:** Jak ma wyglądać wynik? (format, długość, struktura, język)",
      ] },
      { type: "prompt-box", title: "Szablon RICE", code: "ROLA: Jesteś [ROLA/EKSPERTYZA].\n\nINSTRUKCJA: [CO DOKŁADNIE MA ZROBIĆ]\n\nKONTEKST:\n- Branża: [BRANŻA]\n- Grupa docelowa: [KTO]\n- Ton głosu: [TON]\n- Dodatkowe informacje: [KONTEKST]\n\nEFEKT:\n- Format: [FORMAT — lista, tabela, tekst, JSON]\n- Długość: [DŁUGOŚĆ]\n- Język: [JĘZYK]\n- Styl: [STYL]" },
      { type: "title", text: "Typowe błędy delegowania" },
      { type: "comparison", bad: "Napisz mi artykuł o AI.", good: "Jesteś ekspertem od AI w e-commerce. Napisz artykuł blogowy (1500 słów) o 5 sposobach, jak sklepy internetowe mogą używać ChatGPT do zwiększenia konwersji. Ton: profesjonalny ale przystępny. Grupa: właściciele sklepów Shopify. Struktura: wstęp, 5 sekcji z przykładami, podsumowanie z CTA." },
      { type: "highlight", icon: "AlertCircle", title: "Zasada iteracji", text: "Pierwszy wynik AI rzadko jest idealny. Plan na 3 iteracje: (1) AI generuje draft, (2) Ty dajesz feedback, (3) AI poprawia. To wciąż 5x szybciej niż pisanie od zera." },
    ],
    tips: [
      "Im precyzyjniejszy brief, tym lepszy wynik — inwestuj 2 min w prompt zamiast 20 min w poprawki.",
      "Zawsze podawaj przykład oczekiwanego wyniku — AI uczy się z przykładów.",
      "Framework RICE działa dla KAŻDEGO zadania AI — treści, analizy, kodu.",
      "Zapisuj skuteczne prompty — budujesz swoją bibliotekę 'raz a dobrze'.",
    ],
  },
  {
    id: "workspace-organization",
    title: "3. Organizacja przestrzeni roboczej z AI",
    duration: "20 min",
    semester: 1,
    content: [
      { type: "text", text: "Chaosu nie zoptymalizujesz. Zanim AI zacznie Ci pomagać na co dzień, musisz **uporządkować swoją przestrzeń roboczą**: foldery, projekty, klienci, szablony. AI pracuje najlepiej z dobrze zorganizowanym kontekstem." },
      { type: "title", text: "Struktura workspace'u" },
      { type: "list", items: [
        "**Projekty:** Osobny folder/przestrzeń na każdy projekt z kontekstem (brief, materiały, prompty).",
        "**Szablony:** Gotowe szablony promptów na powtarzalne zadania (e-mail, raport, post).",
        "**Biblioteka promptów:** Zorganizowana kolekcja sprawdzonych promptów z tagami.",
        "**Notatki AI:** Loguj co działa, co nie, jakie prompty dają najlepsze wyniki.",
        "**Inbox AI:** Jedno miejsce na nowe pomysły, prompty do przetestowania, linki do narzędzi.",
      ] },
      { type: "prompt-box", title: "Organizacja bazy wiedzy", code: "Pomóż mi zorganizować moją przestrzeń roboczą w [NARZĘDZIE — Notion/Obsidian/Google Drive].\n\nMoja praca obejmuje: [OPIS PRACY]\nProjekty: [LISTA PROJEKTÓW]\nKlienci: [ILE/JACY]\n\nZaproponuj:\n1. Strukturę folderów/stron\n2. System tagów\n3. Szablony do powtarzalnych zadań\n4. System archiwizacji\n5. Dashboard dzienny/tygodniowy\n\nFormat: drzewko struktury + opis każdego elementu." },
      { type: "highlight", icon: "Sparkles", title: "Second Brain z AI", text: "Notion AI / Obsidian + ChatGPT = Twój 'drugi mózg'. Zbieraj wiedzę, notatki, pomysły — AI je przeszukuje, łączy i podsumowuje na żądanie." },
    ],
    tips: [
      "Zacznij od 5 folderów, nie od 50 — prostota > perfekcja.",
      "Przeglądaj i czyść workspace co piątek (15 min).",
      "Taguj prompty: #marketing #raport #email — łatwiej znajdziesz.",
      "Workspace to żywy organizm — aktualizuj strukturę gdy zmienia się Twoja praca.",
    ],
  },

  // ── MODUŁ II ──────────────────────────────────────────
  {
    id: "prompt-templates",
    title: "4. Szablony promptów 'raz a dobrze'",
    duration: "25 min",
    semester: 2,
    content: [
      { type: "text", text: "Najlepsi użytkownicy AI nie piszą promptów od zera. Mają **bibliotekę szablonów**, które dostosowują do sytuacji. Jeden dobry szablon oszczędza 5-10 minut za każdym użyciem. Przy 10 użyciach dziennie to 1-2h." },
      { type: "title", text: "Anatomia dobrego szablonu" },
      { type: "list", items: [
        "**Stała część:** Rola, format, styl, ograniczenia — to się nie zmienia.",
        "**Zmienne [DO UZUPEŁNIENIA]:** Temat, dane, kontekst — to zmieniasz za każdym razem.",
        "**Instrukcja jakości:** Kryteria, które wynik musi spełniać.",
        "**Przykład:** Jeden wzorcowy output, który AI naśladuje.",
      ] },
      { type: "prompt-box", title: "Szablon: E-mail biznesowy", code: "Jesteś profesjonalnym asystentem komunikacji biznesowej.\n\nNapisz e-mail:\n- Cel: [CEL MAILA]\n- Do kogo: [STANOWISKO/RELACJA]\n- Ton: [FORMALNY/PÓŁ-FORMALNY/LUŹNY]\n- Kluczowy przekaz: [CO MA WYNIKAĆ Z MAILA]\n- CTA: [CZEGO OCZEKUJESZ OD ODBIORCY]\n\nZasady:\n- Max 150 słów\n- Jeden jasny CTA\n- Bez korpo-bełkotu\n- Subject line: max 50 znaków, intrygujący" },
      { type: "prompt-box", title: "Szablon: Raport tygodniowy", code: "Stwórz raport tygodniowy na podstawie poniższych danych:\n\n[WKLEJ DANE / NOTATKI Z TYGODNIA]\n\nStruktura raportu:\n1. Podsumowanie tygodnia (3-5 zdań)\n2. Osiągnięcia (5 punktów z metrykami)\n3. Wyzwania i blokery (3 punkty z propozycjami rozwiązań)\n4. Plan na następny tydzień (5 priorytetów)\n5. Pytania/decyzje wymagające uwagi przełożonego\n\nFormat: zwięzły, z liczbami, gotowy do wysyłki." },
      { type: "title", text: "Budowanie biblioteki szablonów" },
      { type: "text", text: "Za każdym razem, gdy piszesz prompt, który działa dobrze — **zapisz go jako szablon**. Po miesiącu będziesz mieć 20-30 szablonów pokrywających 80% Twojej pracy." },
    ],
    tips: [
      "Zacznij od 5 najczęstszych zadań → 5 szablonów.",
      "Testuj szablon 3 razy zanim uznasz go za 'gotowy'.",
      "Wersjonuj szablony — v1, v2, v3 — śledź co poprawiasz.",
      "Udostępniaj szablony zespołowi — mnożysz oszczędność czasu.",
    ],
  },
  {
    id: "context-management",
    title: "5. Zarządzanie kontekstem i pamięcią AI",
    duration: "25 min",
    semester: 2,
    content: [
      { type: "text", text: "AI nie pamięta Cię między sesjami (chyba że użyjesz odpowiednich narzędzi). **Zarządzanie kontekstem** to klucz do konsystentnych, wysokiej jakości wyników. Im lepszy kontekst, tym lepsza odpowiedź." },
      { type: "title", text: "Strategie zarządzania kontekstem" },
      { type: "list", items: [
        "**System prompt:** Stały opis Twojej firmy, stylu, zasad — wklejasz na początku każdej konwersacji.",
        "**Custom Instructions (ChatGPT):** Ustawienia globalne, które AI pamięta zawsze.",
        "**Projekty (ChatGPT/Claude):** Osobne przestrzenie z dedykowanym kontekstem dla różnych zadań.",
        "**Pliki kontekstowe:** Dokumenty z informacjami o firmie, produktach, klientach — wgrywasz do konwersacji.",
        "**Prompt chaining:** Seria powiązanych promptów, gdzie wynik jednego jest wejściem do kolejnego.",
      ] },
      { type: "prompt-box", title: "System prompt firmowy", code: "KONTEKST FIRMY:\nNazwa: [NAZWA FIRMY]\nBranża: [BRANŻA]\nProdukty/usługi: [LISTA]\nGrupa docelowa: [KTO]\nTon komunikacji: [TON]\nWartości: [WARTOŚCI]\nKonkurencja: [GŁÓWNI KONKURENCI]\n\nZASADY:\n- Zawsze używaj języka polskiego\n- Ton: [TON] — nigdy korpo-bełkot\n- Nie używaj słów: [LISTA ZABRONIONYCH SŁÓW]\n- Zawsze dodawaj CTA\n- Max długość: [LIMIT]\n\nTen kontekst obowiązuje we WSZYSTKICH moich zleceniach." },
      { type: "highlight", icon: "Brain", title: "Prompt chaining", text: "Zamiast jednego mega-promptu, podziel zadanie na kroki: (1) Research → (2) Outline → (3) Draft → (4) Edycja → (5) Finał. Każdy krok daje lepszy wynik niż próba zrobienia wszystkiego na raz." },
    ],
    tips: [
      "Stwórz plik 'context.md' z informacjami o firmie — wgrywaj go do każdego nowego chatu.",
      "Custom Instructions to Twoja supermoc — skonfiguruj je raz, korzystaj zawsze.",
      "Projekty w ChatGPT/Claude = osobne 'mózgi' dla różnych klientów/zadań.",
      "Prompt chaining > jeden długi prompt — zawsze.",
    ],
  },
  {
    id: "prompt-library",
    title: "6. Tworzenie własnej biblioteki promptów",
    duration: "20 min",
    semester: 2,
    content: [
      { type: "text", text: "Biblioteka promptów to **Twój najcenniejszy zasób AI**. To kolekcja sprawdzonych, przetestowanych promptów, które możesz użyć w sekundę zamiast pisać od zera. Po 3 miesiącach dobra biblioteka oszczędza 10+ godzin tygodniowo." },
      { type: "title", text: "Struktura biblioteki promptów" },
      { type: "list", items: [
        "**Kategorie:** Marketing, Sprzedaż, Operacje, Analiza, Komunikacja, Kreatywność.",
        "**Dla każdego promptu:** Nazwa, cel, pełny tekst, zmienne [DO UZUPEŁNIENIA], przykład użycia, ocena (1-5★).",
        "**Tagi:** #email #raport #social #klient #wewnętrzny — do szybkiego wyszukiwania.",
        "**Wersjonowanie:** v1, v2, v3 — śledź, jak prompt ewoluuje.",
        "**Notatki:** Co działa, co nie, jakie modele dają najlepsze wyniki.",
      ] },
      { type: "prompt-box", title: "Szablon wpisu do biblioteki", code: "## [NAZWA PROMPTU]\n\n**Kategoria:** [KATEGORIA]\n**Tagi:** #tag1 #tag2 #tag3\n**Model:** ChatGPT / Claude / Gemini\n**Ocena:** ★★★★☆\n**Wersja:** v2\n\n**Cel:** [CO TEN PROMPT ROBI]\n\n**Prompt:**\n```\n[PEŁNY TEKST PROMPTU Z [ZMIENNYMI]]\n```\n\n**Przykład użycia:**\n[KONKRETNY PRZYKŁAD Z WYPEŁNIONYMI ZMIENNYMI]\n\n**Notatki:**\n- [CO DZIAŁA DOBRZE]\n- [CO MOŻNA POPRAWIĆ]\n- [DATA OSTATNIEJ AKTUALIZACJI]" },
      { type: "title", text: "Gdzie trzymać bibliotekę" },
      { type: "list", items: [
        "**Notion:** Baza danych z filtrami, tagami i sortowaniem — najlepsza opcja.",
        "**Obsidian:** Markdown + linki — dla osób preferujących lokalne pliki.",
        "**Google Sheets:** Prosty arkusz z kolumnami — najszybszy start.",
        "**GitHub/Git:** Wersjonowanie + historia zmian — dla zaawansowanych.",
      ] },
    ],
    tips: [
      "Zacznij DZIŚ — dodawaj 1 prompt dziennie. Po miesiącu masz 30 gotowych szablonów.",
      "Oceniaj prompty po 3 użyciach — usuń te ze średnią <3★.",
      "Udostępnij bibliotekę zespołowi — mnożysz wartość.",
      "Przeglądaj i aktualizuj bibliotekę co 2 tygodnie.",
    ],
  },

  // ── MODUŁ III ──────────────────────────────────────────
  {
    id: "email-automation",
    title: "7. Automatyzacja e-maili, raportów i notatek",
    duration: "25 min",
    semester: 3,
    content: [
      { type: "text", text: "E-maile, raporty i notatki ze spotkań to **największe pożeracze czasu** w pracy umysłowej. AI może zautomatyzować 80% tych zadań, zostawiając Ci tylko weryfikację i wysyłkę." },
      { type: "title", text: "E-maile z AI" },
      { type: "list", items: [
        "**Odpowiedzi na maile:** Wklej mail → AI generuje odpowiedź w Twoim stylu.",
        "**Cold outreach:** AI tworzy spersonalizowane maile dla każdego prospektu.",
        "**Follow-upy:** AI generuje serię follow-upów z rosnącą pilnością.",
        "**Podsumowania mailboxu:** AI czyta Twoje maile i daje podsumowanie dnia.",
      ] },
      { type: "prompt-box", title: "Odpowiedź na maila", code: "Otrzymałem poniższego maila:\n\n[WKLEJ MAILA]\n\nNapisz odpowiedź:\n- Ton: [PROFESJONALNY/PRZYJACIELSKI/FORMALNY]\n- Kluczowy przekaz: [CO CHCĘ PRZEKAZAĆ]\n- CTA: [CZEGO OCZEKUJĘ]\n- Max: 100 słów\n- Dodaj pozdrowienia i podpis: [IMIĘ]" },
      { type: "title", text: "Notatki ze spotkań z AI" },
      { type: "text", text: "Nagrywaj spotkania (Otter.ai, Whisper, Fathom), a AI wyciągnie: podsumowanie, action points, decyzje, pytania otwarte. **Zero ręcznego notowania.**" },
      { type: "prompt-box", title: "Podsumowanie spotkania", code: "Poniżej jest transkrypcja spotkania:\n\n[WKLEJ TRANSKRYPCJĘ]\n\nStwórz podsumowanie:\n1. Główne tematy (max 5 punktów)\n2. Podjęte decyzje\n3. Action points (kto, co, do kiedy)\n4. Pytania otwarte / do rozstrzygnięcia\n5. Następne kroki\n\nFormat: zwięzły, gotowy do wysyłki uczestnikom." },
    ],
    tips: [
      "Odpowiadaj na maile z AI rano — batch processing oszczędza 1h dziennie.",
      "Nagrywaj KAŻDE spotkanie (za zgodą uczestników) — AI zrobi notatki za Ciebie.",
      "Stwórz 5 szablonów na najczęstsze typy maili.",
      "Follow-upy z AI > ręczne — AI nie zapomina i jest konsekwentny.",
    ],
  },
  {
    id: "spreadsheet-ai",
    title: "8. AI + arkusze kalkulacyjne i dane",
    duration: "25 min",
    semester: 3,
    content: [
      { type: "text", text: "Arkusze kalkulacyjne to **drugie najpopularniejsze narzędzie pracy** (po e-mailu). AI rewolucjonizuje pracę z danymi: pisze formuły, analizuje trendy, tworzy wykresy, generuje raporty — wszystko z opisu słownego." },
      { type: "title", text: "Co AI robi z arkuszami" },
      { type: "list", items: [
        "**Formuły:** Opisz co chcesz, AI napisze formułę (VLOOKUP, IF, SUMIFS, pivot).",
        "**Makra VBA:** Automatyzacja powtarzalnych zadań w Excelu.",
        "**Analiza danych:** Wgraj CSV/Excel do ChatGPT — AI znajdzie trendy i anomalie.",
        "**Czyszczenie danych:** AI identyfikuje duplikaty, brakujące wartości, niespójności.",
        "**Wizualizacje:** AI generuje wykresy i dashboardy z surowych danych.",
      ] },
      { type: "prompt-box", title: "Formuła Excel z AI", code: "Mam arkusz z kolumnami:\nA: Nazwa produktu\nB: Kategoria\nC: Sprzedaż Q1\nD: Sprzedaż Q2\nE: Sprzedaż Q3\nF: Sprzedaż Q4\n\nPotrzebuję:\n1. Formułę sumującą sprzedaż roczną per produkt\n2. Formułę znajdującą najlepszy kwartał per produkt\n3. Formułę obliczającą % zmianę Q4 vs Q1\n4. Formatowanie warunkowe: czerwony jeśli spadek >10%, zielony jeśli wzrost >10%\n\nPodaj gotowe formuły z wyjaśnieniem." },
      { type: "title", text: "Routine tasks z AI" },
      { type: "text", text: "Zidentyfikuj zadania, które robisz codziennie, co tydzień i co miesiąc. AI może je zautomatyzować lub znacząco przyspieszyć." },
      { type: "prompt-box", title: "Automatyzacja routine tasks", code: "Moje powtarzalne zadania:\n\nCodziennie: [LISTA]\nCo tydzień: [LISTA]\nCo miesiąc: [LISTA]\n\nDla każdego zadania zaproponuj:\n1. Czy AI może je w pełni zautomatyzować?\n2. Jakie narzędzie? (ChatGPT, Make.com, Zapier, skrypt)\n3. Jak wygląda zautomatyzowany proces krok po kroku?\n4. Ile czasu oszczędzam?" },
    ],
    tips: [
      "Wgrywaj surowe dane do ChatGPT — nie streszczaj ich ręcznie.",
      "Proś AI o wyjaśnienie formuły — uczysz się i weryfikujesz jednocześnie.",
      "Makra VBA z AI = supermoc Excela — opisujesz co chcesz, AI pisze kod.",
      "Automatyzuj najpierw raporty miesięczne — największy zwrot z inwestycji.",
    ],
  },
  {
    id: "integrations-workflows",
    title: "9. Integracje i end-to-end workflowy",
    duration: "25 min",
    semester: 3,
    content: [
      { type: "text", text: "Prawdziwa moc AI ujawnia się, gdy **łączysz narzędzia w procesy end-to-end**. Zamiast ręcznie kopiować dane między aplikacjami, automatyzujesz cały przepływ: od wejścia do wyniku." },
      { type: "title", text: "Przykładowe workflowy end-to-end" },
      { type: "list", items: [
        "**Lead → Analiza → CRM:** Nowy lead z formularza → AI analizuje i scoruje → zapis do CRM z notatką.",
        "**Spotkanie → Notatki → Tasks:** Nagranie spotkania → transkrypcja → AI wyciąga action points → tworzy taski w Asana/Todoist.",
        "**Dokument → Podsumowanie → E-mail:** Nowy dokument na Drive → AI streszcza → wysyła podsumowanie mailem do zespołu.",
        "**Social Media → Analiza → Raport:** Dane z Meta/LinkedIn → AI analizuje wyniki → generuje raport tygodniowy.",
        "**Faktura → Ekstrakcja → Księgowość:** PDF faktury → AI wyciąga dane → wpisuje do arkusza księgowego.",
      ] },
      { type: "title", text: "Narzędzia do integracji" },
      { type: "list", items: [
        "**Make.com:** Wizualne budowanie workflowów, 1000+ integracji, moduły AI.",
        "**Zapier:** Najprostszy start, ogromna baza integracji, droższy przy skali.",
        "**n8n:** Open-source, self-hosted, tańszy, wymaga więcej technicznej wiedzy.",
      ] },
      { type: "prompt-box", title: "Projektowanie workflow", code: "Chcę zautomatyzować proces: [OPIS PROCESU]\n\nObecny przebieg (ręczny):\n1. [KROK 1]\n2. [KROK 2]\n3. [KROK 3]\n...\n\nNarzędzia, których używam: [LISTA NARZĘDZI]\n\nZaprojektuj zautomatyzowany workflow:\n1. Wyzwalacz (co uruchamia proces)\n2. Kroki automatyczne (jakie narzędzia, jakie akcje)\n3. Punkty decyzyjne (where/if)\n4. Output (co jest wynikiem)\n5. Obsługa błędów\n6. Szacowany koszt miesięczny narzędzi" },
    ],
    tips: [
      "Zacznij od 1 workflow, nie od 10 — opanuj jeden, potem dodawaj kolejne.",
      "Zawsze testuj workflow z prawdziwymi danymi przed 'puszczeniem na produkcję'.",
      "Loguj błędy — Make.com i Zapier mają historię wykonań, używaj jej.",
      "End-to-end > fragmentaryczna automatyzacja — łącz narzędzia, nie używaj ich osobno.",
    ],
  },

  // ── MODUŁ IV ──────────────────────────────────────────
  {
    id: "daily-planning-ai",
    title: "10. Planowanie dnia i tygodnia z AI",
    duration: "20 min",
    semester: 4,
    content: [
      { type: "text", text: "AI może być Twoim **osobistym asystentem planowania**. Nie chodzi o to, żeby AI zarządzał Twoim życiem — chodzi o to, żeby pomagał Ci podejmować lepsze decyzje o priorytetach." },
      { type: "title", text: "Poranny rytuał z AI (10 min)" },
      { type: "list", items: [
        "**Krok 1:** Wklej listę zadań na dziś do ChatGPT.",
        "**Krok 2:** AI priorytetyzuje według matrycy Eisenhowera (pilne/ważne).",
        "**Krok 3:** AI sugeruje bloki czasowe i kolejność.",
        "**Krok 4:** AI identyfikuje zadania do delegowania (innym lub AI).",
      ] },
      { type: "prompt-box", title: "Planowanie dnia", code: "Oto moje zadania na dziś:\n\n[LISTA ZADAŃ]\n\nMoje spotkania:\n[LISTA SPOTKAŃ Z GODZINAMI]\n\nDostępny czas pracy: [OD-DO]\nEnergia: [WYSOKA RANO / NISKA PO POŁUDNIU / RÓWNA]\n\nZaplanuj mój dzień:\n1. Priorytetyzacja (matryca pilne/ważne)\n2. Bloki czasowe (deep work, admin, spotkania)\n3. Zadania do delegowania (komu/AI)\n4. Buffer time na niespodzianki\n5. Top 3 rzeczy, które MUSZĄ być zrobione" },
      { type: "title", text: "Tygodniowy review z AI" },
      { type: "prompt-box", title: "Review tygodnia", code: "Podsumuj mój tydzień pracy:\n\nCo zrobiłem: [LISTA ZROBIONYCH ZADAŃ]\nCo nie zostało zrobione: [LISTA NIEZROBIONYCH]\nWyzwania: [CO BLOKOWAŁO]\n\nPrzygotuj:\n1. Analiza: co poszło dobrze, co źle\n2. Wnioski: jakie wzorce widzisz (np. prokrastynacja, zbyt dużo spotkań)\n3. Plan na następny tydzień: TOP 5 priorytetów\n4. 1 nawyk do poprawienia\n5. 1 rzecz do zautomatyzowania z AI" },
    ],
    tips: [
      "Poranny rytuał z AI zajmuje 10 min, a oszczędza 1h chaosu.",
      "Nie planuj 100% dnia — zostaw 20% na niespodzianki.",
      "Tygodniowy review to klucz do ciągłego doskonalenia.",
      "AI nie zna Twojego kontekstu emocjonalnego — Ty decydujesz, AI sugeruje.",
    ],
  },
  {
    id: "second-brain-ai",
    title: "11. Second Brain — system notatek z AI",
    duration: "25 min",
    semester: 4,
    content: [
      { type: "text", text: "Second Brain to **system zbierania, organizowania i wykorzystywania wiedzy**. Z AI staje się on 10x potężniejszy: AI przeszukuje Twoje notatki, łączy idee, generuje podsumowania i pomaga podejmować decyzje na podstawie zgromadzonej wiedzy." },
      { type: "title", text: "System PARA + AI" },
      { type: "list", items: [
        "**P — Projects:** Aktywne projekty z kontekstem AI (każdy projekt ma swój system prompt).",
        "**A — Areas:** Obszary odpowiedzialności (zdrowie, finanse, kariera) z AI-podsumowaniami.",
        "**R — Resources:** Artykuły, książki, kursy — AI streszcza i taguje.",
        "**A — Archive:** Zakończone projekty — AI generuje 'lessons learned'.",
      ] },
      { type: "title", text: "Praktyczne zastosowania" },
      { type: "list", items: [
        "**Capture:** Notuj wszystko szybko → AI strukturyzuje i taguje później.",
        "**Distill:** AI streszcza długie artykuły/książki do kluczowych wniosków.",
        "**Express:** AI pomaga zamienić notatki w treści (artykuły, prezentacje, raporty).",
        "**Connect:** AI znajduje powiązania między Twoimi notatkami, o których nie pomyślałeś.",
      ] },
      { type: "prompt-box", title: "Streszczenie artykułu do Second Brain", code: "Przeczytaj poniższy artykuł i stwórz notatkę do mojego Second Brain:\n\n[WKLEJ ARTYKUŁ LUB LINK]\n\nFormat notatki:\n1. **Tytuł:** [Tytuł artykułu]\n2. **Źródło:** [Link/autor]\n3. **Data:** [Data]\n4. **Tagi:** #tag1 #tag2\n5. **Kluczowe wnioski:** (max 5 punktów)\n6. **Cytaty warte zapamiętania:** (max 3)\n7. **Jak to się odnosi do mojej pracy:** [1-2 zdania]\n8. **Action items:** [Co mogę zrobić z tą wiedzą]" },
    ],
    tips: [
      "Notuj > pamiętaj — Twój mózg jest do myślenia, nie do przechowywania.",
      "AI + Notion/Obsidian = potężny Second Brain.",
      "Przeglądaj notatki raz w tygodniu — AI pomoże znaleźć powiązania.",
      "Każda notatka powinna mieć 'action item' — wiedza bez działania jest bezużyteczna.",
    ],
  },
  {
    id: "cost-optimization",
    title: "12. Optymalizacja kosztów i stack narzędzi AI",
    duration: "25 min",
    semester: 4,
    content: [
      { type: "text", text: "Łatwo wpaść w pułapkę 'tool fatigue' — subskrybujesz 10 narzędzi AI, używasz 3, a płacisz za wszystkie. **Optymalizacja stacka** to klucz do ROI: minimalny zestaw narzędzi, maksymalna wartość." },
      { type: "title", text: "Audyt narzędzi AI" },
      { type: "list", items: [
        "**Krok 1:** Wypisz WSZYSTKIE narzędzia AI, za które płacisz.",
        "**Krok 2:** Przy każdym: ile razy użyłeś w ostatnim miesiącu?",
        "**Krok 3:** Oblicz koszt per użycie (cena / liczba użyć).",
        "**Krok 4:** Usuń wszystko z kosztem >$5 per użycie lub <4 użycia/miesiąc.",
        "**Krok 5:** Sprawdź, czy jedno narzędzie może zastąpić dwa inne.",
      ] },
      { type: "prompt-box", title: "Audyt stacka AI", code: "Moje obecne narzędzia AI:\n\n[NARZĘDZIE 1]: [CENA/MIES] — [DO CZEGO UŻYWAM] — [ILE RAZY/MIES]\n[NARZĘDZIE 2]: [CENA/MIES] — [DO CZEGO UŻYWAM] — [ILE RAZY/MIES]\n...\n\nŁączny koszt: [SUMA]\n\nZaproponuj:\n1. Które narzędzia mogę usunąć (niski usage)?\n2. Które mogę zastąpić tańszymi alternatywami?\n3. Czy jedno narzędzie może zastąpić kilka?\n4. Optymalny stack z tym samym (lub lepszym) rezultatem\n5. Szacowany nowy koszt miesięczny\n6. ROI: ile godzin oszczędzam vs ile płacę" },
      { type: "title", text: "Obliczanie realnego ROI" },
      { type: "highlight", icon: "Sparkles", title: "Wzór ROI z AI", text: "ROI = (Godziny zaoszczędzone × Twoja stawka godzinowa) - Koszt narzędzi AI. Jeśli oszczędzasz 20h/mies × 100 PLN/h = 2000 PLN oszczędności, a płacisz 300 PLN za narzędzia → ROI = 1700 PLN/mies = 20 400 PLN/rok." },
      { type: "title", text: "Minimalny stack dla różnych ról" },
      { type: "list", items: [
        "**Freelancer:** ChatGPT Plus (~$20) + Canva Pro (~$13) = ~$33/mies.",
        "**Manager:** ChatGPT Plus + Claude Pro + Otter.ai = ~$60/mies.",
        "**Właściciel firmy:** ChatGPT Team + Make.com + Notion AI = ~$80/mies.",
        "**Marketer:** ChatGPT Plus + Claude Pro + Midjourney + Buffer = ~$80/mies.",
      ] },
    ],
    tips: [
      "Rób audyt narzędzi co kwartał — potrzeby się zmieniają.",
      "Darmowe plany > płatne plany, dopóki nie uderzysz w limit.",
      "ROI mierz w PLN, nie w 'poczuciu produktywności'.",
      "Jeden dobrze opanowany model > pięć używanych powierzchownie.",
    ],
  },
];
