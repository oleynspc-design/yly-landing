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
  { id: 1, name: "Moduł I: Fundamenty AI w Biznesie", lessons: [0, 1, 2] },
  { id: 2, name: "Moduł II: AI w Marketingu i Sprzedaży", lessons: [3, 4, 5] },
  { id: 3, name: "Moduł III: AI w Obsłudze Klienta i Operacjach", lessons: [6, 7, 8] },
  { id: 4, name: "Moduł IV: Analityka, Prawo i Skalowanie", lessons: [9, 10, 11] },
];

export const lessons: Lesson[] = [
  // ── MODUŁ I ──────────────────────────────────────────
  {
    id: "ai-business-fundamentals",
    title: "1. Jakie zadania AI robi najlepiej w firmie",
    duration: "20 min",
    semester: 1,
    content: [
      { type: "text", text: "AI nie jest magiczną różdżką — to **narzędzie specjalistyczne**, które w określonych typach zadań bije człowieka na głowę, a w innych kompletnie się nie sprawdza. Kluczem do sukcesu jest zrozumienie, GDZIE AI daje największy zwrot z inwestycji." },
      { type: "highlight", icon: "Brain", title: "Zasada Pareto AI", text: "80% wartości z AI w firmie pochodzi z 20% zastosowań. Twoim zadaniem jest znaleźć te 20% — powtarzalne, tekstowe, oparte na wzorcach zadania, które zjadają czas Twojego zespołu." },
      { type: "title", text: "Zadania, w których AI dominuje" },
      { type: "list", items: [
        "**Generowanie treści:** E-maile, opisy produktów, posty, raporty — AI tworzy szkice 10x szybciej niż człowiek.",
        "**Analiza i streszczanie:** Długie dokumenty, umowy, raporty — AI wyciąga kluczowe informacje w sekundy.",
        "**Klasyfikacja i sortowanie:** Maile, zgłoszenia, leady — AI kategoryzuje na podstawie wzorców.",
        "**Tłumaczenia i lokalizacja:** Wielojęzyczna komunikacja bez zatrudniania tłumaczy.",
        "**Ekstrakcja danych:** Z faktur, formularzy, PDF-ów — AI rozpoznaje i strukturyzuje informacje.",
        "**Brainstorming i ideacja:** Generowanie wariantów, pomysłów, scenariuszy.",
      ] },
      { type: "title", text: "Zadania, gdzie AI się NIE sprawdza" },
      { type: "list", items: [
        "**Decyzje etyczne i prawne** — AI nie ponosi odpowiedzialności.",
        "**Relacje międzyludzkie** — negocjacje, coaching, empatia.",
        "**Kreatywność wymagająca oryginalności** — AI remixuje, nie tworzy od zera.",
        "**Zadania wymagające aktualnych danych** — bez dostępu do internetu AI bazuje na danych treningowych.",
      ] },
      { type: "comparison", bad: "Użyj AI do podjęcia decyzji o zwolnieniu pracownika.", good: "Użyj AI do przygotowania analizy wydajności zespołu, na podstawie której TY podejmiesz decyzję." },
      { type: "prompt-box", title: "Audyt zadań w Twojej firmie", code: "Jestem [STANOWISKO] w firmie [BRANŻA]. Mój typowy tydzień pracy obejmuje:\n\n1. [ZADANIE 1 — ile czasu]\n2. [ZADANIE 2 — ile czasu]\n3. [ZADANIE 3 — ile czasu]\n...\n\nDla każdego zadania oceń w skali 1-10, jak dobrze AI mogłoby je wykonać lub wspomóc. Uzasadnij ocenę i zaproponuj konkretne narzędzie AI." },
    ],
    tips: [
      "Zacznij od zadań, które zajmują >2h tygodniowo i są powtarzalne.",
      "AI = asystent, nie zastępca — zawsze weryfikuj wyniki.",
      "Prowadź 'dziennik AI': notuj, gdzie AI zaoszczędziło czas.",
      "Nie próbuj automatyzować wszystkiego naraz — wybierz 3 procesy na start.",
    ],
  },
  {
    id: "ai-business-examples",
    title: "2. Case studies: AI w małych, średnich i solo-biznesach",
    duration: "25 min",
    semester: 1,
    content: [
      { type: "text", text: "Najlepszym sposobem na zrozumienie potencjału AI jest zobaczenie, **jak realne firmy go wykorzystują**. Poniższe przykłady dotyczą firm 1-50 osób — nie korporacji z budżetem milionów." },
      { type: "title", text: "Solo-biznes: Freelancer copywriter" },
      { type: "text", text: "Kasia, freelancerka SEO, używa ChatGPT do generowania szkiców artykułów, Claude do edycji i poprawy stylu, a Perplexity do researchu. **Efekt: z 2 artykułów tygodniowo przeszła na 8**, zachowując jakość. Jej przychód wzrósł o 300% bez zatrudniania kogokolwiek." },
      { type: "title", text: "Mała firma: E-commerce z 5 pracownikami" },
      { type: "text", text: "Sklep internetowy z kosmetykami naturalnymi. Wdrożyli AI do: (1) opisów produktów w 3 językach, (2) automatycznych odpowiedzi na FAQ klientów, (3) generowania postów na social media. **Oszczędność: ~25h tygodniowo** pracy asystentki." },
      { type: "title", text: "Średnia firma: Agencja marketingowa (20 osób)" },
      { type: "text", text: "Agencja używa pipeline AI: brief klienta → ChatGPT generuje koncepcje → Claude pisze copy → DALL-E tworzy grafiki → Midjourney robi warianty. **Czas realizacji kampanii spadł z 2 tygodni do 3 dni.**" },
      { type: "highlight", icon: "AlertCircle", title: "Wspólny wzorzec sukcesu", text: "Wszystkie te firmy zaczęły od JEDNEGO procesu, udowodniły ROI, a dopiero potem skalowały. Nie próbowały wdrażać AI wszędzie naraz." },
      { type: "prompt-box", title: "Analiza Twojego biznesu", code: "Prowadzę [TYP FIRMY] w branży [BRANŻA]. Mam [LICZBA] pracowników.\n\nNajwiększe wyzwania:\n1. [WYZWANIE 1]\n2. [WYZWANIE 2]\n3. [WYZWANIE 3]\n\nZaproponuj 5 konkretnych zastosowań AI, które mogę wdrożyć w ciągu 30 dni. Dla każdego podaj: narzędzie, szacowany czas oszczędności tygodniowo, koszt narzędzia i poziom trudności wdrożenia (łatwy/średni/trudny)." },
    ],
    tips: [
      "Szukaj wzorców w swoim biznesie: co robisz ręcznie, powtarzalnie, w tekście?",
      "ROI z AI mierz w godzinach zaoszczędzonych, nie w 'jakości'.",
      "Najlepszy case study to Twój własny — dokumentuj wyniki od dnia 1.",
      "Ucz się od firm podobnych rozmiarem, nie od Google czy Amazona.",
    ],
  },
  {
    id: "ai-tools-landscape",
    title: "3. Mapa narzędzi AI dla biznesu — co wybrać",
    duration: "25 min",
    semester: 1,
    content: [
      { type: "text", text: "Rynek narzędzi AI rośnie w tempie **nowe narzędzie co 6 godzin**. Zamiast gonić za nowinkami, potrzebujesz **minimalnego, skutecznego stacka** dopasowanego do Twojego biznesu." },
      { type: "title", text: "Kategorie narzędzi AI" },
      { type: "list", items: [
        "**Modele językowe (LLM):** ChatGPT, Claude, Gemini, Perplexity — do generowania treści, analizy, rozmów.",
        "**Generowanie obrazów:** DALL-E, Midjourney, Stable Diffusion — do grafik, kreacji reklamowych.",
        "**Automatyzacja:** Make.com, Zapier, n8n — do łączenia narzędzi w procesy.",
        "**Transkrypcja i audio:** Whisper, Otter.ai — do spotkań, podcastów.",
        "**Analiza dokumentów:** ChatGPT z plikami, Claude z dokumentami, DocuSign AI.",
        "**CRM i sprzedaż:** HubSpot AI, Salesforce Einstein — inteligentne zarządzanie klientami.",
        "**Produktywność:** Notion AI, Gamma, Tome — dokumenty, prezentacje, notatki.",
      ] },
      { type: "title", text: "Minimalny stack dla solo/małego biznesu" },
      { type: "highlight", icon: "Sparkles", title: "Stack Starter", text: "ChatGPT Plus + Claude Pro + Canva z AI + Make.com (plan darmowy). Koszt: ~$60/mies. Pokrywa: treści, analizy, grafiki, automatyzacje." },
      { type: "title", text: "Stack dla średniej firmy (10-50 osób)" },
      { type: "list", items: [
        "**ChatGPT Team** — wspólne workspace'y dla zespołu.",
        "**Claude Pro** — długie dokumenty, kodowanie.",
        "**Make.com Pro** — zaawansowane automatyzacje.",
        "**Notion AI** — baza wiedzy firmowej.",
        "**Otter.ai** — transkrypcje spotkań.",
      ] },
      { type: "comparison", bad: "Kupuję 15 narzędzi AI 'na zapas', bo każde coś robi.", good: "Zaczynam od 3 narzędzi, opanowuję je, i dodaję kolejne gdy mam konkretną potrzebę." },
      { type: "prompt-box", title: "Dobór narzędzi", code: "Moja firma [BRANŻA, ROZMIAR] potrzebuje AI do:\n1. [CEL 1]\n2. [CEL 2]\n3. [CEL 3]\n\nBudżet miesięczny na narzędzia AI: [KWOTA]\n\nZaproponuj optymalny stack narzędzi AI. Dla każdego narzędzia podaj: cenę, główną funkcję, alternatywę i czas nauki." },
    ],
    tips: [
      "Zasada 'mniej znaczy więcej' — lepiej 3 narzędzia dobrze opanowane niż 10 powierzchownie.",
      "Zawsze sprawdź darmowy plan przed zakupem subskrypcji.",
      "Co kwartał rób audyt narzędzi: co faktycznie używasz?",
      "Szukaj narzędzi z API — to klucz do automatyzacji.",
    ],
  },

  // ── MODUŁ II ──────────────────────────────────────────
  {
    id: "ai-marketing-content",
    title: "4. AI w content marketingu — od strategii do publikacji",
    duration: "25 min",
    semester: 2,
    content: [
      { type: "text", text: "Content marketing to **idealne pole do zastosowania AI**. Generowanie treści, recykling contentu, personalizacja — AI zmienia marketing z kosztownego procesu w skalowalną machinę." },
      { type: "title", text: "Content Pipeline z AI" },
      { type: "list", items: [
        "**Krok 1: Research** — Perplexity AI do badania tematów, trendów, pytań klientów.",
        "**Krok 2: Strategia** — ChatGPT do planowania kalendarza treści na miesiąc.",
        "**Krok 3: Tworzenie** — Claude do pisania artykułów, ChatGPT do social media, DALL-E do grafik.",
        "**Krok 4: Optymalizacja** — AI do SEO (meta opisy, słowa kluczowe, nagłówki).",
        "**Krok 5: Dystrybucja** — Make.com do automatycznej publikacji na wielu kanałach.",
        "**Krok 6: Analiza** — ChatGPT do analizy wyników i rekomendacji na kolejny miesiąc.",
      ] },
      { type: "highlight", icon: "Brain", title: "Recykling treści z AI", text: "Jeden artykuł blogowy AI może przetworzyć na: 10 postów social media, 1 newsletter, 5 Stories, 1 podcast script, 3 infografiki. To 20 kawałków contentu z jednego źródła." },
      { type: "prompt-box", title: "Kalendarz treści na miesiąc", code: "Stwórz kalendarz content marketingu na [MIESIĄC] dla firmy [BRANŻA].\n\nKanały: blog, Instagram, LinkedIn, newsletter.\nGrupa docelowa: [PERSONA]\nGłówne cele: [CELE]\n\nDla każdego tygodnia zaproponuj:\n- 1 artykuł blogowy (tytuł + krótki brief)\n- 3 posty na Instagram (tematy + styl)\n- 2 posty na LinkedIn (tematy + hook)\n- 1 newsletter (temat + structure)\n\nDodaj hashtagi i najlepsze godziny publikacji." },
      { type: "prompt-box", title: "Recykling treści", code: "Poniżej jest artykuł blogowy:\n\n[WKLEJ ARTYKUŁ]\n\nPrzetwórz go na:\n1. 5 postów na LinkedIn (profesjonalny ton, z hookiem)\n2. 5 postów na Instagram (lżejszy ton, z emoji, max 200 słów każdy)\n3. 1 newsletter (temat + 3 sekcje)\n4. 3 tweety/posty na X\n5. 1 script na 60-sekundowe video/reel" },
    ],
    tips: [
      "Zawsze edytuj AI-generowane treści — dodaj swój głos i doświadczenie.",
      "Recykling > tworzenie od zera. Jeden dobry materiał = 20 kawałków contentu.",
      "Testuj różne modele do różnych typów treści (Claude = long-form, GPT = social).",
      "Planuj z AI, ale publikuj z ludzkim nadzorem.",
    ],
  },
  {
    id: "ai-sales-campaigns",
    title: "5. AI w kampaniach reklamowych i sprzedaży",
    duration: "25 min",
    semester: 2,
    content: [
      { type: "text", text: "Kampanie reklamowe to złoto dla AI: **copy, kreacje, segmentacja, testowanie wariantów** — to wszystko AI robi szybciej i taniej niż zespół ludzi. Ale klucz to wiedzieć JAK dawać AI właściwe brief'y." },
      { type: "title", text: "AI w procesie kampanii" },
      { type: "list", items: [
        "**Brief kampanii** — AI generuje strategię na podstawie Twojego celu i budżetu.",
        "**Warianty copy** — 10+ wariantów nagłówków, CTA, opisów w minuty.",
        "**Kreacje graficzne** — DALL-E/Midjourney do testowych wizualizacji.",
        "**Segmentacja** — AI analizuje bazę klientów i proponuje segmenty.",
        "**A/B testing** — AI generuje warianty, Ty testujesz skuteczność.",
        "**Analiza wyników** — wrzuć dane kampanii do ChatGPT, dostaniesz wnioski.",
      ] },
      { type: "prompt-box", title: "Generator wariantów reklamowych", code: "Tworzę kampanię reklamową [Facebook/Google/LinkedIn] dla:\n\nProdukt/usługa: [OPIS]\nGrupa docelowa: [KTO]\nBudżet: [KWOTA]\nCel: [KONWERSJE/RUCH/ŚWIADOMOŚĆ]\n\nWygeneruj:\n1. 5 wariantów nagłówka (max 40 znaków)\n2. 5 wariantów opisu (max 125 znaków)\n3. 3 propozycje CTA\n4. 3 koncepcje graficzne (opis do wygenerowania w DALL-E)\n5. Sugestie targetowania (zainteresowania, demografia)" },
      { type: "title", text: "AI w personalizacji komunikacji" },
      { type: "text", text: "AI potrafi tworzyć **spersonalizowane wiadomości na skalę**. Zamiast jednego maila do 1000 osób, możesz mieć 1000 unikatowych maili — każdy dopasowany do segmentu." },
      { type: "prompt-box", title: "Personalizacja cold outreach", code: "Piszę cold email do [STANOWISKO] w firmie [BRANŻA].\n\nMoja oferta: [CO SPRZEDAJĘ]\nGłówna korzyść: [BENEFIT]\n\nNapisz 3 warianty cold email (max 150 słów każdy):\n1. Wersja 'pain point' — zaczynasz od problemu klienta\n2. Wersja 'social proof' — zaczynasz od wyniku innego klienta\n3. Wersja 'pytanie' — zaczynasz od prowokacyjnego pytania\n\nKażdy mail zakończ jednym, prostym CTA." },
    ],
    tips: [
      "Generuj minimum 10 wariantów copy — AI jest świetny w ilości, Ty wybierasz jakość.",
      "Zawsze testuj A/B — intuicja Twoja vs. AI.",
      "Personalizacja > masowość — lepiej 100 spersonalizowanych maili niż 10 000 generycznych.",
      "Dane z kampanii wrzucaj z powrotem do AI — niech uczy się z Twoich wyników.",
    ],
  },
  {
    id: "ai-social-newsletters",
    title: "6. Social media i newslettery z AI",
    duration: "20 min",
    semester: 2,
    content: [
      { type: "text", text: "Social media wymaga **stałego strumienia treści**. AI zmienia podejście z 'muszę wymyślić post' na 'wybieram najlepszy z 10 wygenerowanych wariantów'. To fundamentalna zmiana produktywności." },
      { type: "title", text: "System publikacji social media z AI" },
      { type: "list", items: [
        "**Poniedziałek:** AI generuje 15 propozycji postów na cały tydzień.",
        "**Wtorek:** Wybierasz najlepsze, edytujesz, dodajesz swój głos.",
        "**Środa-Piątek:** Automatyczna publikacja (Buffer/Hootsuite + Make.com).",
        "**Sobota:** AI analizuje wyniki tygodnia i daje rekomendacje.",
      ] },
      { type: "prompt-box", title: "Generator postów na tydzień", code: "Wygeneruj 15 postów na [PLATFORMA] na nadchodzący tydzień.\n\nTematyka: [BRANŻA/NISZA]\nTon głosu: [EKSPERCKI/LUŹNY/INSPIRUJĄCY]\nGrupa docelowa: [KTO]\n\nMix typów:\n- 3 posty edukacyjne (tips, how-to)\n- 3 posty angażujące (pytanie, ankieta, kontrowersja)\n- 3 posty osobiste (behind the scenes, historia)\n- 3 posty sprzedażowe (oferta, case study, CTA)\n- 3 posty trendowe (aktualności z branży, komentarz)\n\nKażdy post: hook (pierwsze zdanie), treść (max 200 słów), hashtagi, CTA." },
      { type: "title", text: "Newsletter z AI" },
      { type: "text", text: "Newsletter to **najcenniejszy kanał marketingowy**. AI może: pisać szkice, generować tematy, personalizować treść dla segmentów, analizować open/click rate." },
      { type: "prompt-box", title: "Szablon newslettera", code: "Napisz newsletter na temat [TEMAT] dla [GRUPA DOCELOWA].\n\nStruktura:\n1. Subject line (3 warianty, max 50 znaków)\n2. Preheader (max 100 znaków)\n3. Intro (2-3 zdania, hook)\n4. Sekcja główna (300-400 słów, wartość merytoryczna)\n5. Sekcja 'szybkie tipy' (3-5 bulletów)\n6. CTA (jeden, jasny)\n7. PS (dodatkowa zachęta)\n\nTon: [TON]. Nie używaj korpo-języka." },
    ],
    tips: [
      "Hook (pierwsze zdanie) decyduje o 80% sukcesu posta — generuj 10 hooków i wybieraj najlepszy.",
      "Newslettery AI powinny być KRÓTSZE niż ludzkie — szanuj czas czytelnika.",
      "Testuj subject lines z AI — generuj 10, wybieraj 3 do A/B/C testu.",
      "Automatyzuj publikację, ale NIE odpowiedzi na komentarze — to musi być ludzkie.",
    ],
  },

  // ── MODUŁ III ──────────────────────────────────────────
  {
    id: "ai-customer-service",
    title: "7. AI w obsłudze klienta — chatboty i automatyzacja",
    duration: "25 min",
    semester: 3,
    content: [
      { type: "text", text: "Obsługa klienta to **kopalnia oszczędności z AI**. Chatboty, automatyczne odpowiedzi, FAQ — AI może obsługiwać 80% zapytań bez udziału człowieka, 24/7, w dowolnym języku." },
      { type: "title", text: "Poziomy automatyzacji obsługi klienta" },
      { type: "list", items: [
        "**Poziom 1: FAQ Bot** — odpowiada na powtarzalne pytania (godziny otwarcia, cennik, status zamówienia).",
        "**Poziom 2: Inteligentny asystent** — rozumie kontekst, zadaje pytania uzupełniające, eskaluje do człowieka.",
        "**Poziom 3: Pełna automatyzacja** — przetwarza zwroty, zmienia zamówienia, aktualizuje dane klienta.",
      ] },
      { type: "highlight", icon: "Brain", title: "KPI obsługi klienta z AI", text: "Średnie wyniki firm: czas odpowiedzi z 4h do <30 sekund, koszt per ticket z $12 do $0.50, satysfakcja klienta (CSAT) utrzymana na >85%." },
      { type: "title", text: "Jak zbudować FAQ chatbota" },
      { type: "list", items: [
        "**Krok 1:** Zbierz 50 najczęstszych pytań klientów z maili, chatu, ticketów.",
        "**Krok 2:** Napisz idealne odpowiedzi na każde pytanie.",
        "**Krok 3:** Wgraj je jako kontekst do chatbota (system prompt + knowledge base).",
        "**Krok 4:** Dodaj reguły eskalacji: kiedy bot przekazuje do człowieka.",
        "**Krok 5:** Testuj z prawdziwymi zapytaniami przed wdrożeniem.",
      ] },
      { type: "prompt-box", title: "System prompt dla chatbota obsługi klienta", code: "Jesteś asystentem obsługi klienta firmy [NAZWA FIRMY].\n\nTwoje zasady:\n1. Odpowiadaj TYLKO na podstawie poniższej bazy wiedzy. NIE zmyślaj.\n2. Jeśli nie znasz odpowiedzi, powiedz: 'Przekażę Twoje pytanie do naszego zespołu.'\n3. Bądź uprzejmy, konkretny i zwięzły.\n4. Nigdy nie podawaj cen, których nie ma w bazie.\n5. Przy reklamacjach zawsze przeproś i zapytaj o numer zamówienia.\n\nBaza wiedzy:\n[WKLEJ FAQ / REGULAMIN / CENNIK]" },
    ],
    tips: [
      "Zacznij od Poziomu 1 (FAQ Bot) — to daje 60% oszczędności przy minimalnym ryzyku.",
      "Zawsze miej łatwą opcję 'Połącz z człowiekiem'.",
      "Monitoruj rozmowy bota — uczysz się, co klienci pytają.",
      "Aktualizuj bazę wiedzy bota co tydzień o nowe pytania.",
    ],
  },
  {
    id: "ai-documents-backoffice",
    title: "8. AI w dokumentach, fakturach i back-office",
    duration: "25 min",
    semester: 3,
    content: [
      { type: "text", text: "Back-office to cichy pożeracz czasu: faktury, umowy, raporty, checklisty, procedury. AI potrafi **przetwarzać dokumenty**, ekstrakcyjnie wyciągać dane, a nawet generować gotowe formularze i SOP-y." },
      { type: "title", text: "Przetwarzanie dokumentów z AI" },
      { type: "list", items: [
        "**Faktury:** AI czyta PDF, wyciąga dane (kwota, NIP, data), wpisuje do arkusza.",
        "**Umowy:** AI analizuje klauzule, wskazuje ryzyka, porównuje z wzorcem.",
        "**Raporty:** AI zbiera dane z wielu źródeł i generuje podsumowanie.",
        "**Notatki ze spotkań:** Whisper transkrybuje, ChatGPT wyciąga action points.",
        "**SOP-y:** AI generuje procedury na podstawie opisu procesu.",
      ] },
      { type: "prompt-box", title: "Analiza umowy", code: "Przeanalizuj poniższą umowę pod kątem:\n1. Klauzule niekorzystne dla [STRONA UMOWY]\n2. Brakujące zapisy (np. kary umowne, terminy, RODO)\n3. Niejasne lub wieloznaczne sformułowania\n4. Porównanie z rynkowymi standardami\n\nDla każdego problemu: opisz ryzyko, zaproponuj zmianę, oceń pilność (niska/średnia/wysoka).\n\nUmowa:\n[WKLEJ TREŚĆ UMOWY]" },
      { type: "title", text: "AI + Excel/Arkusze" },
      { type: "text", text: "ChatGPT pisze formuły Excel, tworzy makra VBA, analizuje dane z arkuszy. Zamiast 2 godzin walki z VLOOKUP, opisz AI co chcesz osiągnąć." },
      { type: "prompt-box", title: "Formuły Excel z AI", code: "Mam arkusz Excel z kolumnami: [OPIS KOLUMN]\n\nPotrzebuję formułę, która: [OPIS CO MA ROBIĆ]\n\nPodaj:\n1. Gotową formułę\n2. Wyjaśnienie krok po kroku\n3. Alternatywne rozwiązanie (np. tabela przestawna)\n4. Ewentualne makro VBA, jeśli formuła jest zbyt złożona" },
    ],
    tips: [
      "Użyj ChatGPT z załącznikami — wgrywaj PDF-y bezpośrednio do analizy.",
      "Przy umowach zawsze skonsultuj wyniki AI z prawnikiem — AI wskazuje ryzyka, nie daje porad prawnych.",
      "Automatyzuj raportowanie: Make.com może co tydzień generować raport z AI i wysyłać mailem.",
      "Generuj SOP-y z AI: opisz proces, AI stworzy instrukcję krok po kroku.",
    ],
  },
  {
    id: "ai-operations-procedures",
    title: "9. Checklisty, procedury i SOP-y generowane z AI",
    duration: "20 min",
    semester: 3,
    content: [
      { type: "text", text: "Standard Operating Procedures (SOP) to **fundament skalowalnej firmy**. Problem: nikt nie lubi ich pisać. Rozwiązanie: AI generuje SOP-y na podstawie opisu procesu w 5 minut." },
      { type: "title", text: "Jak AI tworzy SOP-y" },
      { type: "list", items: [
        "**Opisz proces** — powiedz AI co robi Twój zespół krok po kroku.",
        "**AI strukturyzuje** — zamienia chaotyczny opis w uporządkowaną procedurę.",
        "**Dodaj szczegóły** — AI pyta o edge cases, odpowiedzialności, terminy.",
        "**Finalizuj** — review z zespołem, poprawki, publikacja.",
      ] },
      { type: "prompt-box", title: "Generator SOP", code: "Stwórz Standard Operating Procedure (SOP) dla procesu: [NAZWA PROCESU]\n\nOpis procesu (jak to robimy teraz):\n[OPISZ OBECNY PROCES]\n\nFormat SOP:\n1. Cel procedury\n2. Zakres (kto, kiedy, gdzie)\n3. Wymagane narzędzia/zasoby\n4. Kroki procedury (numerowane, z checkboxami)\n5. Przypadki szczególne / wyjątki\n6. Kto odpowiada za każdy krok\n7. Metryki sukcesu\n8. Częstotliwość przeglądu SOP\n\nJęzyk: prosty, zrozumiały dla nowego pracownika." },
      { type: "title", text: "Checklisty z AI" },
      { type: "text", text: "Checklisty to mini-SOP-y. AI generuje checklisty na każdą okazję: onboarding pracownika, uruchomienie kampanii, przygotowanie do spotkania, zamknięcie miesiąca." },
      { type: "prompt-box", title: "Generator checklisty", code: "Stwórz szczegółową checklistę dla: [PROCES/WYDARZENIE]\n\nKontekst: [BRANŻA, ROZMIAR FIRMY]\n\nWymagania:\n- Podziel na sekcje logiczne\n- Każdy punkt musi być konkretny (nie 'sprawdź marketing')\n- Dodaj kolumnę 'Odpowiedzialny' i 'Termin'\n- Dodaj sekcję 'W razie problemów' na dole\n\nFormat: Tabela Markdown gotowa do Notion/Google Docs." },
    ],
    tips: [
      "SOP powinien być zrozumiały dla osoby, która procesu nigdy nie robiła.",
      "Przeglądaj SOP-y co kwartał — procesy się zmieniają.",
      "Używaj checklist codziennie — to nawyk, który eliminuje błędy.",
      "AI nie zastąpi wiedzy eksperckiej — SOP tworzy ekspert z pomocą AI, nie AI samo.",
    ],
  },

  // ── MODUŁ IV ──────────────────────────────────────────
  {
    id: "ai-analytics-decisions",
    title: "10. AI w analityce i podejmowaniu decyzji",
    duration: "25 min",
    semester: 4,
    content: [
      { type: "text", text: "Każda firma ma dane — ale mało firm je **faktycznie analizuje**. AI zmienia to radykalnie: wrzucasz dane (Excel, CSV, PDF), a AI daje Ci wnioski, wykresy, prognozy i rekomendacje." },
      { type: "title", text: "AI jako Twój analityk danych" },
      { type: "list", items: [
        "**Raporty zarządcze** — AI generuje podsumowanie z surowych danych.",
        "**Dashboardy** — ChatGPT tworzy kod do Google Sheets/Looker/Power BI.",
        "**Prognozy** — scenariusze 'what if' na podstawie Twoich danych historycznych.",
        "**Anomalie** — AI wykrywa nietypowe wzorce w danych (np. spadek sprzedaży we wtorek).",
        "**Benchmarking** — porównanie Twoich wyników z benchmarkami branżowymi.",
      ] },
      { type: "prompt-box", title: "Raport zarządczy z AI", code: "Przeanalizuj poniższe dane sprzedażowe i stwórz raport zarządczy:\n\n[WKLEJ DANE / OPIS DANYCH]\n\nRaport powinien zawierać:\n1. Podsumowanie wykonawcze (3-5 zdań dla CEO)\n2. Kluczowe wskaźniki (KPI) z trendem vs. poprzedni okres\n3. Top 3 pozytywne obserwacje\n4. Top 3 problemy/ryzyka\n5. Rekomendacje działań (min. 5 punktów)\n6. Prognoza na następny miesiąc\n\nFormat: zwięzły, z liczbami, gotowy do prezentacji na zarządzie." },
      { type: "highlight", icon: "AlertCircle", title: "Ważne zastrzeżenie", text: "AI analizuje dane, które mu dasz — ale nie zna kontekstu biznesowego (np. urlop handlowca, sezonowość). Zawsze weryfikuj wnioski AI ze swoją wiedzą o firmie." },
    ],
    tips: [
      "Wgrywaj surowe dane do ChatGPT — AI lepiej pracuje na surowych liczbach niż na Twoim streszczeniu.",
      "Proś o wizualizacje — ChatGPT może generować wykresy w Pythonie.",
      "Scenariusze 'what if' to Twoja supermoc — testuj hipotezy bez ryzyka.",
      "Regularne raporty AI > jednorazowa analiza — ustaw miesięczny cykl.",
    ],
  },
  {
    id: "ai-legal-security",
    title: "11. Prawo, bezpieczeństwo i polityki AI w firmie",
    duration: "25 min",
    semester: 4,
    content: [
      { type: "text", text: "Używanie AI w firmie niesie **realne ryzyka prawne i bezpieczeństwa**. RODO, AI Act, dane klientów, tajemnice handlowe — musisz wiedzieć, czego NIE wolno wrzucać do AI i jak chronić firmę." },
      { type: "title", text: "Co NIE wolno wrzucać do publicznych AI" },
      { type: "list", items: [
        "**Dane osobowe klientów** — imiona, adresy, PESEL, numery kart.",
        "**Tajemnice handlowe** — kody źródłowe, receptury, strategie cenowe.",
        "**Dane medyczne** — wyniki badań, diagnozy, historie pacjentów.",
        "**Dane finansowe** — numery kont, wyciągi, dane logowania.",
        "**Dokumenty poufne** — umowy NDA, patenty w trakcie rejestracji.",
      ] },
      { type: "highlight", icon: "AlertCircle", title: "AI Act (UE)", text: "Od 2025 r. Unia Europejska reguluje AI. Jako właściciel firmy musisz wiedzieć: jakie systemy AI są zabronione, jakie wymagają rejestracji, i jakie obowiązki masz wobec klientów." },
      { type: "title", text: "Polityka AI w firmie — co powinna zawierać" },
      { type: "list", items: [
        "**Dozwolone narzędzia** — które AI można używać w pracy.",
        "**Zabronione dane** — co NIE może trafić do AI.",
        "**Procedura weryfikacji** — kto sprawdza treści wygenerowane przez AI.",
        "**Odpowiedzialność** — kto odpowiada za błędy AI.",
        "**Szkolenie** — obowiązkowe przeszkolenie pracowników przed użyciem AI.",
        "**Audyt** — regularne sprawdzanie, jak AI jest używane w firmie.",
      ] },
      { type: "prompt-box", title: "Generator polityki AI", code: "Stwórz politykę korzystania z AI dla firmy:\n\nNazwa firmy: [NAZWA]\nBranża: [BRANŻA]\nLiczba pracowników: [LICZBA]\nGłówne narzędzia AI w użyciu: [LISTA]\n\nPolityka powinna zawierać:\n1. Cel dokumentu\n2. Zakres (kogo dotyczy)\n3. Dozwolone zastosowania AI\n4. Zabronione zastosowania i dane\n5. Procedura weryfikacji treści AI\n6. Odpowiedzialność prawna\n7. Szkolenie pracowników\n8. Konsekwencje naruszenia\n9. Procedura zgłaszania incydentów\n10. Data przeglądu polityki\n\nJęzyk: profesjonalny, ale zrozumiały." },
    ],
    tips: [
      "Stwórz politykę AI ZANIM zaczną się problemy — reagowanie 'po' jest 10x droższe.",
      "Używaj wersji enterprise/team AI (ChatGPT Team, Claude for Business) — Twoje dane nie trenują modeli.",
      "Anonimizuj dane przed wrzuceniem do AI — zamień imiona, numery, adresy na [X].",
      "Przeszkol cały zespół — jedno szkolenie oszczędzi Ci problemów na lata.",
    ],
  },
  {
    id: "ai-scaling-services",
    title: "12. Skalowanie AI w firmie i budowa oferty AI",
    duration: "25 min",
    semester: 4,
    content: [
      { type: "text", text: "Jeśli opanowałeś AI w swoim biznesie, **możesz sprzedawać tę wiedzę innym**. Audyty AI, warsztaty, wdrożenia — to rynek rosnący 40% rocznie. Ale nawet jeśli nie chcesz tego sprzedawać, musisz wiedzieć, jak skalować AI wewnętrznie." },
      { type: "title", text: "Plan wdrożenia AI w firmie (30/60/90 dni)" },
      { type: "list", items: [
        "**Dni 1-30: Quick wins** — 3 proste automatyzacje (e-maile, FAQ, raporty), szkolenie zespołu, polityka AI.",
        "**Dni 31-60: Rozbudowa** — chatbot dla klientów, pipeline content marketingu, automatyzacja back-office.",
        "**Dni 61-90: Skalowanie** — integracja z CRM, dashboardy analityczne, dokumentacja procesów AI.",
      ] },
      { type: "title", text: "Budowa oferty AI dla klientów" },
      { type: "list", items: [
        "**Audyt AI** — analiza procesów klienta i rekomendacje wdrożeń (usługa jednorazowa).",
        "**Warsztaty AI** — szkolenie zespołu klienta z narzędzi AI (1-2 dni).",
        "**Wdrożenie AI** — implementacja automatyzacji i procesów (projekt 2-4 tygodnie).",
        "**Retainer AI** — comiesięczna opieka, optymalizacja, nowe procesy.",
      ] },
      { type: "highlight", icon: "Sparkles", title: "Wycena usług AI", text: "Audyt: 3000-10 000 PLN. Warsztat: 5000-15 000 PLN/dzień. Wdrożenie: 10 000-50 000 PLN. Retainer: 3000-10 000 PLN/mies. Ceny zależą od branży i skali klienta." },
      { type: "prompt-box", title: "Plan wdrożenia AI", code: "Stwórz plan wdrożenia AI w firmie:\n\nFirma: [BRANŻA, ROZMIAR, GŁÓWNE PROCESY]\nBudżet na AI: [MIESIĘCZNY BUDŻET]\nPoziom tech: [NISKI/ŚREDNI/WYSOKI]\n\nPlan na 90 dni:\n\nDni 1-30 (Quick Wins):\n- Lista 5 szybkich wdrożeń z narzędziami i kosztami\n- KPI sukcesu\n\nDni 31-60 (Rozbudowa):\n- Kolejne 5 wdrożeń\n- Integracje między narzędziami\n\nDni 61-90 (Skalowanie):\n- Dokumentacja\n- Szkolenie zespołu\n- Metryki ROI\n\nDla każdego wdrożenia: narzędzie, koszt, czas implementacji, oszczędność godzin/mies." },
    ],
    tips: [
      "Dokumentuj WSZYSTKO — Twoje wdrożenia AI to Twoje portfolio.",
      "Mierz ROI liczbami: godziny zaoszczędzone × stawka godzinowa = wartość AI.",
      "Nie sprzedawaj 'AI' — sprzedawaj wynik: '10h oszczędności tygodniowo'.",
      "Standardowe procesy AI > customowe rozwiązania — łatwiejsze do skalowania.",
    ],
  },
];
