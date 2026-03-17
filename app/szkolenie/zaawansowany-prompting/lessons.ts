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
  { id: 1, name: "Semestr I: Zaawansowane Rozumowanie", lessons: [0, 1, 2] },
  { id: 2, name: "Semestr II: Role, Kontekst i Drzewa Myśli", lessons: [3, 4, 5] },
  { id: 3, name: "Semestr III: Agenci, Meta-Prompting i Multimodal", lessons: [6, 7, 8] },
  { id: 4, name: "Semestr IV: Pipeline'y, Weryfikacja i Produkcja", lessons: [9, 10, 11] },
];

export const lessons: Lesson[] = [
  {
    id: "chain-of-thought", title: "1. Chain-of-Thought — Rozumowanie Krok po Kroku", duration: "25 min", semester: 1,
    content: [
      { type: "text", text: "Chain-of-Thought (CoT) to technika, która **zmusza model do rozpisania kroków rozumowania** zanim poda finalną odpowiedź. Badania Google Brain (2022) wykazały, że CoT zwiększa skuteczność w zadaniach logicznych z ~20% do ponad 80%." },
      { type: "highlight", icon: "Brain", title: "Dlaczego CoT działa?", text: "Bez CoT model 'zgaduje' odpowiedź od razu. Z CoT rozbija problem na mniejsze kroki — to jak różnica między 'podaj wynik' a 'pokaż rozwiązanie'." },
      { type: "title", text: "Zero-Shot CoT" },
      { type: "text", text: "Najprostsza forma — dodajesz **jedno magiczne zdanie**: \"Let's think step by step\". To aktywuje tryb rozumowania modelu bez żadnych przykładów." },
      { type: "comparison", bad: "Ile to jest 17 × 24?", good: "Ile to jest 17 × 24?\n\nPomyślmy krok po kroku." },
      { type: "title", text: "Few-Shot CoT" },
      { type: "text", text: "Dostarczasz **przykłady z rozpisanym rozumowaniem**, aby model naśladował Twój styl myślenia." },
      { type: "prompt-box", title: "Few-Shot CoT", code: "Q: Roger ma 5 piłek. Kupił 2 puszki po 3 piłki. Ile ma?\nA: Zaczął z 5. 2×3=6 nowych. 5+6=11.\nOdpowiedź: 11\n\nQ: W stołówce było 23 jabłka. Zużyto 20, kupiono 6. Ile jest?\nA:" },
      { type: "title", text: "Kiedy CoT jest obowiązkowy?" },
      { type: "list", items: ["**Matematyka i obliczenia** — model musi pokazać kroki", "**Logika i wnioskowanie** — przesłanki → wniosek", "**Analiza danych** — rozbicie na czynniki, porównanie", "**Debugowanie kodu** — przejście linia po linii", "**Decyzje biznesowe** — za i przeciw, wagi, rekomendacja"] },
      { type: "highlight", icon: "AlertCircle", title: "Kiedy NIE używać CoT?", text: "Proste zadania (tłumaczenie, korekta, streszczenie). CoT dodaje tokeny = wyższy koszt. Jeśli zadanie nie wymaga rozumowania, CoT to overhead." },
    ],
    tips: ["\"Let's think step by step\" — dodaj do każdego złożonego promptu.", "Few-Shot CoT > Zero-Shot CoT dla zadań specjalistycznych.", "Każdy przykład musi mieć identyczną strukturę rozumowania.", "CoT zwiększa liczbę tokenów — monitoruj koszty."],
  },
  {
    id: "structured-cot", title: "2. Structured CoT — Zaawansowane Strukturalne Rozumowanie", duration: "25 min", semester: 1,
    content: [
      { type: "text", text: "Structured CoT to **rozbudowana wersja Chain-of-Thought** z narzuconą strukturą kroków. Zamiast \"pomyśl krok po kroku\" definiujesz **konkretne etapy analizy**." },
      { type: "highlight", icon: "Brain", title: "Dlaczego struktura matters?", text: "Zwykły CoT = model sam decyduje o krokach. Structured CoT = TY definiujesz framework analizy. Efekt: bardziej kompletna, systematyczna odpowiedź." },
      { type: "title", text: "Multi-criteria Analysis" },
      { type: "prompt-box", title: "Structured CoT — szablon", code: "Przeanalizuj [problem] krok po kroku:\n\n1. IDENTYFIKACJA: Zdefiniuj problem i zmienne\n2. DANE: Jakie informacje mamy? Czego brakuje?\n3. ANALIZA: Rozważ minimum 3 podejścia\n4. OCENA: Oceń (1-10): Wykonalność, Koszt, Czas, Ryzyko\n5. REKOMENDACJA: Najlepsze podejście + uzasadnienie\n6. PLAN DZIAŁANIA: 3-5 konkretnych kroków" },
      { type: "title", text: "Diagnostic Chain" },
      { type: "prompt-box", title: "Diagnostic Chain", code: "Problem: [opis]\n\nDiagnozuj systematycznie:\n1. SYMPTOMY: Co się dzieje?\n2. TIMELINE: Kiedy się zaczęło?\n3. ZMIANY: Co się zmieniło przed wystąpieniem?\n4. IZOLACJA: Gdzie leży problem?\n5. HIPOTEZY: 3 przyczyny\n6. WERYFIKACJA: Jak sprawdzić każdą?\n7. ROZWIĄZANIE: Fix + zapobieganie" },
      { type: "title", text: "Tabela decyzyjna" },
      { type: "prompt-box", title: "Tabela porównawcza", code: "Porównaj 3 rozwiązania w tabeli markdown:\n| Kryterium | Opcja A | Opcja B | Opcja C |\n|-----------|---------|---------|----------|\n| Koszt     |         |         |          |\n| Czas      |         |         |          |\n| Jakość    |         |         |          |\n| Ryzyko    |         |         |          |\n| SUMA      |         |         |          |\nRekomendacja z uzasadnieniem." },
    ],
    tips: ["Definiuj KONKRETNE kroki analizy — nie polegaj na modelu.", "Tabele porównawcze wymuszają systematyczność.", "Diagnostic Chain idealny do debugowania.", "Im więcej struktury narzucisz, tym lepsza odpowiedź."],
  },
  {
    id: "few-shot-advanced", title: "3. Few-Shot Learning — Sztuka Dobierania Przykładów", duration: "30 min", semester: 1,
    content: [
      { type: "text", text: "Few-Shot to dostarczenie **3-5 przykładów** w prompcie. Badania pokazują, że **jakość przykładów ma większe znaczenie niż ich liczba**." },
      { type: "highlight", icon: "Brain", title: "3 złote zasady", text: "Różnorodność > Ilość. Edge cases first. Konsystentny format. Te 3 zasady decydują o skuteczności Few-Shot." },
      { type: "title", text: "Zasada 1: Różnorodność > Ilość" },
      { type: "text", text: "Każdy przykład powinien pokazywać **inny aspekt** — typowy przypadek, edge case, trudny przypadek, wyjątek." },
      { type: "title", text: "Zasada 2: Edge Cases First" },
      { type: "prompt-box", title: "Sentiment — edge cases", code: "Sklasyfikuj sentiment (positive/negative/neutral):\n\n\"Mogło być gorzej\" → Positive\n[Podwójne przeczenie = ukryte pozytywne]\n\n\"Nie polecam, ale może komuś się spodoba\" → Negative\n[Główne zdanie negatywne mimo zastrzeżenia]\n\n\"Ani lepiej, ani gorzej niż konkurencja\" → Neutral\n[Porównanie bez oceny wartościującej]\n\nTeraz: \"Nie żałuję zakupu\"" },
      { type: "title", text: "Zasada 3: Konsystentny format" },
      { type: "comparison", bad: "Example 1: Input: \"Hello\" | Output: \"Hola\"\nExample 2: \"Goodbye\" => \"Adiós\"\nExample 3: World → Mundo", good: "Example 1: Input: \"Hello\" | Output: \"Hola\"\nExample 2: Input: \"Goodbye\" | Output: \"Adiós\"\nExample 3: Input: \"World\" | Output: \"Mundo\"" },
      { type: "title", text: "Ekstrakcja danych — Few-Shot" },
      { type: "prompt-box", title: "Data Extraction", code: "Wyciągnij dane kontaktowe z emaila.\n\nEmail 1: \"Hi, I'm John from Acme Corp.\nCall me at 555-1234 or john@acme.com\"\nOutput: {\"name\":\"John\",\"company\":\"Acme Corp\",\n\"phone\":\"555-1234\",\"email\":\"john@acme.com\"}\n\nEmail 2: \"Contact: Mike at InnovateLabs,\nmike.j@innovate-labs.com\"\nOutput: {\"name\":\"Mike\",\"company\":\"InnovateLabs\",\n\"phone\":null,\"email\":\"mike.j@innovate-labs.com\"}\n\nNow extract from:\n\"Hello, this is Anna from DataSolutions.\nMy number is 600-700-800\"" },
      { type: "title", text: "Ile przykładów?" },
      { type: "list", items: ["**0 (Zero-Shot):** Proste zadania. Model ma wiedzę z treningu.", "**1 (One-Shot):** Ustawienie formatu.", "**3-5 (Few-Shot):** Złoty standard.", "**5-10:** Tylko dla bardzo niuansowanych zadań.", "**10+:** Overkill — model złapał wzorzec po 5."] },
    ],
    tips: ["Różnorodność przykładów > ich ilość.", "Pokazuj edge cases, nie oczywiste przypadki.", "Format MUSI być identyczny we wszystkich przykładach.", "3-5 przykładów to złoty standard."],
  },
  {
    id: "role-prompting", title: "4. Roleplaying i Persona Prompting", duration: "25 min", semester: 2,
    content: [
      { type: "text", text: "Role Prompting to przypisanie AI **konkretnej roli i osobowości**. Badania: role prompting zwiększa jakość o **15-30%** dla zadań specjalistycznych." },
      { type: "highlight", icon: "Brain", title: "Efekty roli", text: "Model dostosowuje: ton (formalny vs casual), terminologię (SEO vs prawo), perspektywę (analityk vs kreatyw), poziom szczegółowości (CEO vs technik)." },
      { type: "title", text: "Basic vs Advanced" },
      { type: "comparison", bad: "Jesteś ekspertem SEO.\nJak poprawić SEO mojej strony?", good: "Jesteś ekspertem SEO z 10-letnim doświadczeniem w e-commerce.\nSpecjalizacja: technical SEO, małe biznesy (budżet < 5000 zł).\n\nStrona: sklep z butami (30 produktów)\nProblem: 10 wizyt/dzień z Google (chcę 100+)\nBudżet: 2000 zł/mies\n\nPodaj 5 działań SEO z priorytetami." },
      { type: "title", text: "Głęboka Persona" },
      { type: "prompt-box", title: "Advanced Pattern", code: "Jesteś [rola] o następujących cechach:\nDoświadczenie: [X lat w Y]\nSpecjalizacja: [konkretny obszar]\nStyl komunikacji: [jak mówisz/piszesz]\nWartości: [co jest ważne]\n\nSytuacja: [kontekst]\nZadanie: [co zrobić]" },
      { type: "title", text: "Krytyczny Code Reviewer" },
      { type: "prompt-box", title: "Persona — surowy recenzent", code: "Jesteś surowym code reviewerem z 15-letnim doświadczeniem.\nWartości: Bezpieczeństwo > Wygoda, Czytelność > Cleverness\nNie oszczędzaj krytyki. Dla każdego problemu:\nSeverity: Critical / High / Medium / Low\n\nPrzeanalizuj ten kod: [kod]" },
      { type: "title", text: "Devil's Advocate" },
      { type: "prompt-box", title: "Persona — inwestor VC", code: "Jesteś doświadczonym inwestorem VC.\nTwoja rola: ZNAJDŹ DZIURY w tym pomyśle.\nBądź bezlitosny ale konstruktywny.\n\nDla każdej słabości:\n- Severity (Deal-breaker / Major / Minor)\n- Dlaczego to problem?\n- Jak to naprawić?\n\nPomysł: [opis]" },
      { type: "title", text: "Multi-Persona" },
      { type: "prompt-box", title: "3 perspektywy", code: "Przeanalizuj projekt z 3 perspektyw:\n\nCTO: Czy technicznie wykonalne? Ryzyko?\nCFO: Jaki ROI? Kiedy break-even?\nCMO: Czy jest rynek? Jak dotrzeć do klientów?\n\nCONSENSUS: Co mówią wszyscy trzej?" },
    ],
    tips: ["Im głębsza persona, tym lepsza odpowiedź.", "Devil's Advocate — najlepsza technika do walidacji pomysłów.", "Multi-Persona daje 3 perspektywy za cenę 1 promptu.", "Używaj konkretnych liczb w roli (10 lat, budżet 5000 zł)."],
  },
  {
    id: "context-filtering", title: "5. Kontekstowe Filtrowanie — Precyzyjna Kontrola", duration: "20 min", semester: 2,
    content: [
      { type: "text", text: "Przy długich dokumentach model się \"gubi\". Context Filtering to technika **precyzyjnego wskazania** co analizować, a co ignorować." },
      { type: "highlight", icon: "Brain", title: "Za dużo kontekstu", text: "Wrzucenie całego dokumentu = pytanie kogoś z encyklopedią 'co ważne'. Filtrowanie = precyzja, trafność, niższy koszt." },
      { type: "title", text: "Selective Context" },
      { type: "prompt-box", title: "Filtrowanie", code: "Z poniższego tekstu:\n[DŁUGI TEKST]\n\n---\nZIGNORUJ: daty, nazwiska, numery referencyjne\nSKUP SIĘ NA: kwotach, terminach płatności, warunkach\n\nWyciągnij TYLKO informacje finansowe:\n- Kwota: [X]\n- Termin: [Y]\n- Warunki: [Z]" },
      { type: "title", text: "Hierarchiczne filtrowanie" },
      { type: "prompt-box", title: "3-poziomowy filtr", code: "Przeanalizuj raport:\n[RAPORT]\n\nMUST HAVE: KPI, metryki, trendy\nNICE TO HAVE: porównania z konkurencją\nIGNORUJ: metodologia, disclaimery, podziękowania" },
      { type: "title", text: "Chunk & Summarize" },
      { type: "prompt-box", title: "Długie dokumenty", code: "Dokument ma 50 stron. Przetwórz tak:\n1. Czytaj TYLKO: Executive Summary, Results, Outlook\n2. Dla każdej sekcji: 3 kluczowe punkty (1 zdanie)\n3. Na końcu: 5 najważniejszych wniosków" },
      { type: "title", text: "Context Poisoning" },
      { type: "list", items: ["**Nowe zadanie = nowy czat** — stary kontekst zaśmieca", "**Separatory** (---, ###, XML) — oddzielaj kontekst od instrukcji", "**Jawne instrukcje** — \"Ignoruj wszystko powyżej ---\"", "**Priorytet na końcu** — kluczowe instrukcje na końcu (recency bias)"] },
    ],
    tips: ["Mów co IGNOROWAĆ, nie tylko co analizować.", "Hierarchia: MUST HAVE > NICE TO HAVE > IGNORUJ.", "Nowe zadanie = nowy czat.", "Kluczowe instrukcje na początku i końcu."],
  },
  {
    id: "tree-of-thoughts", title: "6. Tree-of-Thoughts — Eksploracja Rozwiązań", duration: "30 min", semester: 2,
    content: [
      { type: "text", text: "Tree-of-Thoughts (ToT) to rozszerzenie CoT — model **eksploruje kilka równoległych ścieżek**, ocenia je i wybiera najlepszą." },
      { type: "highlight", icon: "Brain", title: "CoT vs ToT", text: "CoT = jedna ścieżka (liniowa). ToT = wiele ścieżek → ocena → wybór najlepszej. Wolniejszy i droższy, ale radykalnie lepszy dla złożonych decyzji." },
      { type: "title", text: "Pattern ToT" },
      { type: "prompt-box", title: "ToT — szablon", code: "Problem: [opis]\n\nEksploruj 3 podejścia:\n\nPODEJŚCIE 1: [nazwa]\n- Opis, Zalety (3), Wady (3)\n- Koszt/czas, Score: X/10\n\nPODEJŚCIE 2: [...]\nPODEJŚCIE 3: [...]\n\nTABELA PORÓWNAWCZA:\n| Kryterium | P1 | P2 | P3 |\n\nREKOMENDACJA: Najlepsze + uzasadnienie + plan" },
      { type: "title", text: "ToT + Scoring z wagami" },
      { type: "prompt-box", title: "Scoring", code: "Oceń podejścia:\n\nKryteria (wagi):\n- ROI potencjał (3x)\n- Szybkość efektów (2x)\n- Łatwość wdrożenia (2x)\n- Ryzyko — niższe = lepiej (2x)\n- Skalowalność (1x)\n\nScore = suma(kryterium × waga)\nRekomendacja = najwyższy score" },
      { type: "title", text: "Kiedy ToT?" },
      { type: "list", items: ["**UŻYWAJ:** Decyzje high-stakes, trade-offs, kreatywne problemy z wieloma opcjami", "**NIE UŻYWAJ:** Jedno oczywiste rozwiązanie, brak czasu, koszt tokenów ważny"] },
    ],
    tips: ["ToT to 'burza mózgów' AI — eksploruje alternatywy.", "Scoring system obiektywizuje decyzję.", "Wagi kryteriów dostosuj do priorytetów.", "Rezerwuj ToT na ważne decyzje (drogi w tokenach)."],
  },
  {
    id: "react-pattern", title: "7. ReAct — Reasoning + Acting", duration: "30 min", semester: 3,
    content: [
      { type: "text", text: "ReAct łączy **rozumowanie (Thought)** z **działaniem (Action)** naprzemiennie. Model myśli → działa → obserwuje → myśli dalej. Fundament **agentów AI**." },
      { type: "highlight", icon: "Brain", title: "Dlaczego ReAct?", text: "Pure reasoning: myśli bez narzędzi. Pure acting: działa bez planu. ReAct = najlepsze z obu światów." },
      { type: "title", text: "Pattern ReAct" },
      { type: "prompt-box", title: "ReAct — szablon", code: "Rozwiąż problem używając ReAct loop.\n\nFormat:\nThought: [co planujesz i dlaczego]\nAction: [konkretna akcja]\nObservation: [co zauważyłeś]\n[powtarzaj aż do rozwiązania]\nFinal Answer: [odpowiedź]\n\nDostępne akcje:\n- Search[query]\n- Calculate[expression]\n- Lookup[term]\n- Finish[answer]\n\nProblem: [opis]" },
      { type: "title", text: "Customer Support Agent" },
      { type: "prompt-box", title: "ReAct — support", code: "Jesteś customer support agent. Używasz ReAct loop.\n\nAkcje:\n- CheckOrder[id]: Status zamówienia\n- CheckInventory[id]: Stan magazynowy\n- CreateReturn[id, reason]: Zwrot\n- EscalateToHuman[reason]: Eskalacja\n\nZasady:\n- Sprawdzaj dane PRZED odpowiedzią\n- Nie możesz pomóc? Eskaluj, nie zgaduj!\n- Ton: empatyczny, pomocny" },
      { type: "title", text: "Kiedy ReAct?" },
      { type: "list", items: ["**Research** — systematyczne szukanie informacji", "**Customer support** — diagnoza krok po kroku", "**Automatyzacja** — sekwencja działań z walidacją", "**Debugging** — systematyczne szukanie przyczyny"] },
    ],
    tips: ["ReAct = fundament agentów AI.", "Definiuj dostępne akcje — model nie powinien wymyślać.", "Observation po każdej Action.", "Eskalacja do człowieka jako bezpiecznik."],
  },
  {
    id: "meta-prompting", title: "8. Meta-Prompting — AI Projektuje Prompty", duration: "20 min", semester: 3,
    content: [
      { type: "text", text: "Meta-Prompting: prosisz model żeby **sam stworzył lub ulepszył prompt**. 2-step: (1) model generuje prompt, (2) używasz go." },
      { type: "highlight", icon: "Sparkles", title: "Dlaczego działa?", text: "Model 'wie' jakie prompty działają best dla jego architektury. Oszczędza czas. Często lepszy rezultat niż Twój pierwszy prompt." },
      { type: "title", text: "Prompt Generator" },
      { type: "prompt-box", title: "Meta — generator", code: "KROK 1: Stwórz optymalny prompt dla zadania.\nZadanie: [opis]\nUżyj frameworka COSTAR:\n- Context, Objective, Style, Tone, Audience, Response\n\nKROK 2: Wykonaj zadanie tym promptem." },
      { type: "title", text: "Prompt Optimizer" },
      { type: "prompt-box", title: "Meta — ulepszanie", code: "Mój prompt nie daje dobrych wyników:\n[TWÓJ PROMPT]\nProblem: [co jest nie tak]\n\nJako expert prompt engineer:\n1. Zdiagnozuj problem\n2. Zaproponuj ulepszony prompt\n3. Wyjaśnij zmiany\n4. Podaj 3 warianty (conservative/moderate/bold)" },
      { type: "title", text: "Reverse Prompting" },
      { type: "prompt-box", title: "AI zadaje pytania", code: "Chcę stworzyć strategię marketingową.\n\nZANIM zaczniesz — zadaj mi 10 pytań,\nktórych odpowiedzi potrzebujesz.\nGrupuj: O firmie / O rynku / O budżecie / O celach" },
      { type: "title", text: "Self-Refine: 3-etapowa pętla" },
      { type: "prompt-box", title: "Self-Refine", code: "Krok 1: Napisz [treść]\nKrok 2: Skrytykuj swoją odpowiedź:\n- Co słabe? Co brakuje? Co nieprecyzyjne?\nKrok 3: Napisz ULEPSZONĄ wersję\nuwzględniając krytykę." },
    ],
    tips: ["Nie pisz promptów od zera — poproś AI.", "Reverse Prompting = AI definiuje potrzeby.", "Self-Refine: 2-3 iteracje to optimum.", "Szczególnie skuteczny przy nowych zadaniach."],
  },
  {
    id: "multimodal", title: "9. Multimodal Prompting — Tekst + Obraz", duration: "20 min", semester: 3,
    content: [
      { type: "text", text: "Multimodal = łączenie **tekstu z obrazami, diagramami, wykresami**. GPT-4V, Claude 3, Gemini — wszystkie to obsługują." },
      { type: "highlight", icon: "Sparkles", title: "Obraz wart 1000 słów", text: "Zamiast opisywać UI — wrzuć screenshot. Zamiast przepisywać — wrzuć zdjęcie tabeli. Model analizuje obraz + tekst razem." },
      { type: "title", text: "Analiza UI" },
      { type: "prompt-box", title: "Multimodal — UI review", code: "[OBRAZ: screenshot aplikacji]\n\nJesteś UX designerem (10 lat doświadczenia).\n\nPrzeanalizuj:\n1. ACCESSIBILITY: WCAG 2.1?\n2. HIERARCHY: Czytelna?\n3. CTA: Widoczny?\n4. MOBILE: Jak na telefonie?\n\nDla każdego: area, severity, suggested fix" },
      { type: "title", text: "Ekstrakcja danych z obrazów" },
      { type: "prompt-box", title: "OCR — faktura", code: "[OBRAZ: zdjęcie faktury]\nWyciągnij dane w JSON:\n{\"vendor\":\"\",\"date\":\"\",\n\"items\":[{\"name\":\"\",\"qty\":0,\"price\":0}],\n\"total\":0,\"tax\":0}" },
      { type: "title", text: "Best Practices" },
      { type: "list", items: ["**Opisz co AI ma zobaczyć** — daj kontekst", "**Wskaż obszar** — \"Skup się na lewym panelu\"", "**Łącz obraz z tekstem** — nie polegaj tylko na obrazie", "**Jakość matters** — rozmyte = słabe wyniki", "**Testuj modele** — GPT-4V, Claude 3, Gemini mają różne mocne strony"] },
    ],
    tips: ["Obraz + kontekst tekstowy = lepsze wyniki.", "Wskazuj konkretny obszar.", "Multimodal OCR eliminuje przepisywanie.", "Testuj różne modele."],
  },
  {
    id: "prompt-chaining", title: "10. Prompt Chaining — Pipeline'y i Automatyzacja", duration: "30 min", semester: 4,
    content: [
      { type: "text", text: "Prompt Chaining = **dzielenie zadania na sekwencję promptów**, output N → input N+1. Jak linia produkcyjna." },
      { type: "highlight", icon: "Brain", title: "Megaprompt vs Chaining", text: "Megaprompt = model dzieli uwagę na 5 zadań = 60% każde. Chaining = 1 zadanie per krok = 95%. Jakość rośnie dramatycznie." },
      { type: "title", text: "Sequential Chaining" },
      { type: "prompt-box", title: "Content pipeline", code: "KROK 1 (Research):\n\"Zbadaj [X]. 10 kluczowych punktów.\"\n→ OUTPUT 1\n\nKROK 2 (Outline):\n\"Na podstawie [OUTPUT 1] stwórz outline.\"\n→ OUTPUT 2\n\nKROK 3 (Draft):\n\"Napisz artykuł wg [OUTPUT 2]. 2000 słów.\"\n→ OUTPUT 3\n\nKROK 4 (Edit):\n\"Edytuj [OUTPUT 3]. Popraw: jasność, flow, SEO.\"" },
      { type: "title", text: "Conditional Chaining" },
      { type: "prompt-box", title: "IF/ELSE pipeline", code: "PROMPT 1: Sklasyfikuj komentarz:\nPOSITIVE / NEGATIVE / NEUTRAL\n\nIF NEGATIVE:\n  \"Napisz odpowiedź: przeproś, rozwiąż, CTA support\"\nIF POSITIVE:\n  \"Podziękuj, zachęć do polecenia\"\nELSE:\n  \"Krótka odpowiedź, podziękuj\"" },
      { type: "title", text: "Parallel Chaining" },
      { type: "prompt-box", title: "Brainstorming równoległy", code: "1A: \"5 pomysłów kampanii — data-driven\"\n1B: \"5 pomysłów kampanii — viral-focused\"\n1C: \"5 pomysłów kampanii — brand-building\"\n[równolegle]\n\nAGREGACJA: \"Mam 15 pomysłów (3 listy).\nWybierz TOP 5 z uzasadnieniem.\"" },
      { type: "title", text: "Gate Keeping" },
      { type: "list", items: ["**Walidacja po każdym kroku** — czy output OK?", "**Retry logic** — jeśli nie, powtórz", "**Human-in-the-loop** — człowiek akceptuje", "**Narzędzia:** LangChain, Make.com, Zapier"] },
    ],
    tips: ["Dziel na 3-5 kroków — jakość rośnie.", "Conditional = inteligentne IF/ELSE.", "Parallel = różne perspektywy → agregacja.", "Gate Keeping = walidacja między krokami."],
  },
  {
    id: "self-consistency", title: "11. Self-Consistency i Weryfikacja", duration: "25 min", semester: 4,
    content: [
      { type: "text", text: "AI nie jest deterministyczny — **to samo pytanie = różne odpowiedzi**. Self-Consistency: generuj **wielokrotnie**, wybierz najczęstszą." },
      { type: "highlight", icon: "AlertCircle", title: "Problem", text: "'GDP Polski 2023?' Run 1: 688 mld. Run 2: ~700 mld. Run 3: 650 mld. Która prawdziwa? Self-Consistency daje odpowiedź." },
      { type: "title", text: "Pattern" },
      { type: "prompt-box", title: "Self-Consistency", code: "Zadanie: [problem]\n\nWygeneruj 5 niezależnych odpowiedzi.\nPotem:\n1. Porównaj wszystkie 5\n2. Consensus (co wspólne?)\n3. Outliers (odpowiedzi różne)\n4. Finalna = najbardziej consistent\n5. Confidence: High (4-5/5), Medium (3/5), Low (2/5)" },
      { type: "title", text: "Voting Mechanism" },
      { type: "prompt-box", title: "Voting — klasyfikacja", code: "Review: \"Produkt OK, ale dostawa długa\ni opakowanie uszkodzone\"\n\n5 klasyfikacji:\nVote 1: Negative\nVote 2: Mixed/Neutral\nVote 3: Negative\nVote 4: Negative\nVote 5: Neutral\n\nResult: Negative (3/5), Confidence: Medium" },
      { type: "title", text: "Verbose Mode — debugowanie" },
      { type: "prompt-box", title: "Verbose Mode", code: "ZANIM odpowiesz:\n1. Jak zinterpretowałeś polecenie?\n2. Jakie założenia przyjąłeś?\n3. Czego potrzebujesz więcej?\n4. Jaki plan masz?\nPotem odpowiedz." },
      { type: "title", text: "Kiedy?" },
      { type: "list", items: ["**TAK:** High-stakes, niejednoznaczna klasyfikacja, fakty/liczby", "**NIE:** Kreatywne zadania, drafting, brainstorming"] },
    ],
    tips: ["5 odpowiedzi + majority vote = wyższa dokładność.", "Confidence: High (4-5/5), Medium (3/5), Low (2/5).", "Verbose Mode — najlepszy debugger promptów.", "Kosztuje 5x więcej — rezerwuj na high-stakes."],
  },
  {
    id: "production", title: "12. Produkcja — Debugowanie, Optymalizacja, Case Studies", duration: "35 min", semester: 4,
    content: [
      { type: "text", text: "Most między teorią a produkcją. Systematyczne debugowanie, optymalizacja kosztów i realne case studies." },
      { type: "title", text: "Debugging Checklist" },
      { type: "list", items: ["**Clarity:** Instrukcje jednoznaczne?", "**Context:** Wszystkie informacje podane?", "**Format:** Określony format outputu?", "**Constraints:** Zdefiniowane ograniczenia?", "**Framework:** Użyty COSTAR/RACE?", "**Examples:** Podane few-shot?", "**Reasoning:** CoT dla złożonych zadań?", "**Segmentation:** Może rozbić na chaining?", "**Temperature:** 0 dla faktów, 0.7 dla kreatywności?", "**Model:** Odpowiedni model (GPT-4 vs 3.5)?"] },
      { type: "title", text: "A/B Testing Promptów" },
      { type: "prompt-box", title: "Iteracja", code: "Step 1: Baseline — Prompt A → 70% accuracy\nStep 2: + few-shot → Prompt B → 85%\nStep 3: + structured output → Prompt C → 92%\nStep 4: Validate na 50 nowych przykładach → 90%\n\nPrinciple: Zmieniaj 1 rzecz na raz.\nMierz na tych samych 10 testach." },
      { type: "title", text: "Optymalizacja kosztów" },
      { type: "list", items: ["**Prompt Caching** — powtarzalne części promptu cache'owane (50% taniej)", "**Batch API** — non-realtime jobs 50% taniej", "**Model selection** — GPT-4 tylko gdy potrzebny, GPT-3.5 do prostych", "**Token budgeting** — max_tokens limituje output = kontrola kosztów", "**Versioning** — numeruj prompty (v1, v2, v3), nie nadpisuj"] },
      { type: "title", text: "Case Study 1: Customer Support (SaaS)" },
      { type: "text", text: "Firma SaaS, 500 ticketów/dzień. Cel: auto-odpowiedzi na 60%. Technika: **Role Prompting + CoT + Chaining**. Wynik: 73% auto-resolved, czas odpowiedzi z 4h na 30 sekund, CSAT z 3.2 na 4.1/5. ROI: 2 etaty supportu zaoszczędzone." },
      { type: "title", text: "Case Study 2: Content Marketing (E-commerce)" },
      { type: "text", text: "250 opisów produktów do napisania. Technika: **Few-Shot + Chaining** (research → draft → edit → SEO). Wynik: 250 opisów w 3 dni (zamiast 5 tygodni), organic traffic +45% po 3 miesiącach, conversion +12%. ROI: 5 tygodni pracy copywritera = ~50 000 zł." },
      { type: "title", text: "Case Study 3: Code Review Automation" },
      { type: "text", text: "50-osobowy team, code reviews to bottleneck (juniorzy czekają 2 dni). Technika: **Structured CoT + Multi-criteria**. Wynik: 60% PRs z AI \"APPROVE\" → quick human check, średni czas review z 4h na 30 min, missed issues: tylko 3%. ROI: seniorzy oszczędzają 15h/tydzień." },
      { type: "title", text: "Quick Reference: Która technika kiedy?" },
      { type: "list", items: ["**Złożony problem** → Chain-of-Thought", "**Spójny format** → Few-Shot Learning", "**Domain-specific** → Role Prompting", "**Długie dokumenty** → Context Filtering", "**Wiele rozwiązań** → Tree-of-Thoughts", "**External actions** → ReAct", "**Nie wiesz jak promptować** → Meta-Prompting", "**Obraz + tekst** → Multimodal", "**Multi-step workflow** → Prompt Chaining", "**High-stakes decyzja** → Self-Consistency"] },
    ],
    tips: ["Debugging checklist — przejdź systematycznie.", "A/B testuj: 1 zmiana na raz, te same testy.", "Prompt Caching + Batch API = 50-75% oszczędności.", "Case studies: średnio 30-60% ROI na promptach produkcyjnych.", "Iteruj 3-5 razy — to standard profesjonalisty."],
  },
];
