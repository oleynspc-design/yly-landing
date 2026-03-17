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
  { id: 1, name: "Semestr I: Strategia Social Media z AI", lessons: [0, 1, 2] },
  { id: 2, name: "Semestr II: Tworzenie Contentu", lessons: [3, 4, 5] },
  { id: 3, name: "Semestr III: Platformy i Algorytmy", lessons: [6, 7] },
  { id: 4, name: "Semestr IV: Analityka i Skalowanie", lessons: [8, 9] },
];

export const lessons: Lesson[] = [
  {
    id: "sm-strategy", title: "1. Strategia Social Media w erze AI", duration: "20 min", semester: 1,
    content: [
      { type: "text", text: "AI zmienia zasady gry w social media. Kto **nie** wykorzysta AI w swojej strategii, zostanie w tyle." },
      { type: "highlight", icon: "Zap", title: "Kluczowy insight", text: "AI nie zastąpi Twojej autentyczności — ale 10x przyspieszy tworzenie contentu, analizę danych i optymalizację strategii." },
      { type: "title", text: "Nowa piramida strategii SM" },
      { type: "list", items: [
        "**1. Cel biznesowy:** Co chcesz osiągnąć? (leady, sprzedaż, budowanie marki)",
        "**2. Persona odbiorcy:** AI pomoże stworzyć szczegółowe persony na podstawie danych",
        "**3. Content pillars:** Filary treści dopasowane do Twojej branży",
        "**4. Kalendarz AI-assisted:** Automatyczny plan publikacji z uwzględnieniem trendów",
        "**5. Analityka predykcyjna:** AI przewiduje, co zadziała, zanim opublikujesz",
      ]},
      { type: "prompt-box", title: "Prompt: Strategia SM dla Twojej branży", code: "Jesteś ekspertem Social Media z 10-letnim doświadczeniem.\n\nMoja branża: [TWOJA BRANŻA]\nCel: [CEL BIZNESOWY]\nGrupa docelowa: [OPIS ODBIORCY]\n\nStwórz 30-dniową strategię social media zawierającą:\n1. 4 filary treści (content pillars) z uzasadnieniem\n2. Rozkład publikacji na tydzień (ile postów, jakie formaty)\n3. 5 hook'ów otwierających, które zatrzymają scrollowanie\n4. Plan zaangażowania (engagement strategy)\n\nFormat: tabela markdown z kolumnami: Dzień | Platforma | Format | Temat | CTA" },
    ],
    tips: ["AI to narzędzie, nie strategia — zawsze zaczynaj od celu biznesowego.", "Personalizacja > masowa produkcja contentu.", "Testuj strategie AI na małej skali przed skalowaniem.", "Monitoruj trendy AI w social media co tydzień."]
  },
  {
    id: "sm-audience", title: "2. Analiza odbiorców z AI — Persona Engineering", duration: "20 min", semester: 1,
    content: [
      { type: "text", text: "Zamiast zgadywać, kim jest Twój odbiorca — **poproś AI o analizę**. AI potrafi stworzyć persony na podstawie danych, zachowań i wzorców." },
      { type: "title", text: "Od demografii do psychografii" },
      { type: "text", text: "Tradycyjne persony: wiek, płeć, lokalizacja. **AI persony:** motywacje, lęki, język, platformy, godziny aktywności, styl komunikacji." },
      { type: "comparison", bad: "Moja grupa docelowa: kobiety 25-35, Polska.", good: "Persona: Anna, 29 lat, team leader w IT. Scrolluje LinkedIn w przerwie obiadowej 12-13. Szuka treści o work-life balance i AI w zarządzaniu. Reaguje na case studies i dane. Nie lubi clickbaitu. CTA: 'Sprawdź case study'." },
      { type: "prompt-box", title: "Prompt: Deep Persona", code: "Na podstawie tych informacji o moim biznesie:\n- Branża: [BRANŻA]\n- Produkt/usługa: [CO OFERUJESZ]\n- Obecni klienci: [KRÓTKI OPIS]\n\nStwórz 3 szczegółowe persony odbiorców social media. Dla każdej podaj:\n1. Imię, wiek, zawód\n2. Motywacje i bolączki (pain points)\n3. Preferowane platformy SM i godziny aktywności\n4. Styl komunikacji, który do nich trafia\n5. Typy contentu, które konsumują\n6. Słowa-klucze i hashtagi, które śledzą\n7. Obiekcje przed zakupem" },
    ],
    tips: ["Twórz persony na podstawie danych, nie wyobrażeń.", "Aktualizuj persony co kwartał — AI pomoże.", "Jedna persona = jeden styl komunikacji.", "Testuj różne persony w reklamach."]
  },
  {
    id: "sm-content-calendar", title: "3. AI Content Calendar — Planowanie na autopilocie", duration: "25 min", semester: 1,
    content: [
      { type: "text", text: "Planowanie contentu to największy ból social media managerów. AI potrafi **wygenerować cały miesiąc** w 15 minut." },
      { type: "title", text: "Framework SEED do planowania" },
      { type: "list", items: [
        "**S — Sezonowość:** Święta, eventy branżowe, trendy sezonowe",
        "**E — Evergreen:** Ponadczasowe treści, które zawsze działają",
        "**E — Engagement:** Posty interaktywne (ankiety, pytania, quizy)",
        "**D — Data-driven:** Treści bazujące na analityce (co już zadziałało)",
      ]},
      { type: "prompt-box", title: "Prompt: Miesięczny kalendarz", code: "Stwórz kalendarz publikacji na social media na [MIESIĄC] dla:\n- Branża: [BRANŻA]\n- Platformy: Instagram, LinkedIn, TikTok\n- Częstotliwość: 5x/tydzień Instagram, 3x/tydzień LinkedIn, 4x/tydzień TikTok\n\nDla każdego posta podaj:\n| Data | Platforma | Format (reel/karuzela/post/story) | Temat | Hook (pierwsze zdanie) | CTA | Hashtagi (5) |\n\nUwzględnij:\n- Święta i wydarzenia w [MIESIĄC]\n- Mix: 40% edukacja, 30% engagement, 20% sprzedaż, 10% behind-the-scenes\n- Trendy audio/formaty na TikTok i Reels" },
      { type: "highlight", icon: "Brain", title: "Pro tip", text: "Wygeneruj kalendarz, a potem poproś AI o 'Oceń ten kalendarz i zaproponuj 5 ulepszeń'. Self-Refine działa fantastycznie na planach contentowych." },
    ],
    tips: ["40/30/20/10 to złota proporcja contentu.", "Generuj kalendarz w tabeli — łatwo wrzucić do Notion/Sheets.", "Zawsze dodaj 'hook' do każdego posta.", "Recykluj evergreen content co 3 miesiące."]
  },
  {
    id: "sm-copywriting", title: "4. AI Copywriting dla Social Media", duration: "25 min", semester: 2,
    content: [
      { type: "text", text: "Dobry copy to różnica między scrollowaniem a zatrzymaniem. AI potrafi pisać copy, które **konwertuje** — jeśli dasz mu właściwy kontekst." },
      { type: "title", text: "Anatomia viral posta" },
      { type: "list", items: [
        "**Hook (1-2 zdania):** Zatrzymaj scrollowanie. Kontrowersja, pytanie, szok, obietnica.",
        "**Body:** Wartość. Edukacja, historia, dane. Krótkie akapity.",
        "**CTA:** Co odbiorca ma zrobić? Komentuj, udostępnij, kliknij link.",
        "**Format:** Łamanie linii, emoji (z umiarem), numeracja.",
      ]},
      { type: "comparison", bad: "Nasza firma oferuje świetne szkolenia AI. Sprawdź naszą ofertę na stronie.", good: "90% marketerów marnuje 3h dziennie na zadania, które AI robi w 10 minut.\n\nOto 5 narzędzi, które zmieniły moją pracę:\n\n1. ChatGPT → copy w 2 min\n2. Midjourney → grafiki bez grafika\n3. Make.com → automatyzacja postów\n4. Opus Clip → 10 klipów z 1 wideo\n5. Canva AI → templates w sekundę\n\nKtóre znasz? Napisz w komentarzu 👇" },
      { type: "prompt-box", title: "Prompt: Viral Post", code: "Napisz post na [PLATFORMA] dla branży [BRANŻA].\n\nTemat: [TEMAT]\nCel: [engagement/sprzedaż/edukacja]\nTon: [profesjonalny/luźny/prowokacyjny]\n\nStruktura:\n1. Hook (max 2 zdania, zatrzymaj scrollowanie)\n2. Body (3-5 krótkich akapitów, max 4 zdania każdy)\n3. CTA (jedno, jasne wezwanie do działania)\n\nOgraniczenia:\n- Max 200 słów\n- Max 3 emoji\n- Bez hashtagów w treści (dodam osobno)\n- Język: polski, naturalny, bez korporacyjnego żargonu\n\nDodatkowo: zaproponuj 3 warianty hooka (A/B/C test)" },
    ],
    tips: ["Hook decyduje o 80% sukcesu posta.", "Pisz jak mówisz — AI potrafi naśladować Twój styl.", "A/B testuj hooki — generuj 5, wybierz najlepszy.", "Krótkie akapity > ściany tekstu."]
  },
  {
    id: "sm-visuals", title: "5. Grafiki i Wideo z AI — Visual Content", duration: "25 min", semester: 2,
    content: [
      { type: "text", text: "W social media **obraz > tekst**. AI generuje grafiki, thumbnails i wideo w minuty zamiast godzin." },
      { type: "title", text: "Narzędzia do Visual Content" },
      { type: "list", items: [
        "**Midjourney / DALL-E 3:** Unikalne grafiki, ilustracje, tła",
        "**Canva AI (Magic Design):** Templates, edycja, resize na platformy",
        "**Opus Clip / Vidyo AI:** Automatyczne cięcie długich wideo na klipy",
        "**ElevenLabs:** Voiceover AI do reelsów i TikToków",
        "**HeyGen / Synthesia:** Awatary AI do wideo bez kamery",
        "**RunwayML:** Generowanie i edycja wideo z AI",
      ]},
      { type: "prompt-box", title: "Prompt: Thumbnail / Grafika", code: "Stwórz prompt do Midjourney/DALL-E dla grafiki na social media:\n\nTemat: [TEMAT POSTA]\nPlatforma: [Instagram/LinkedIn/YouTube thumbnail]\nStyl: [minimalistyczny/kolorowy/ciemny/profesjonalny]\nBranża: [BRANŻA]\n\nWymagania:\n- Wymiary: [1080x1080 / 1920x1080 / 9:16]\n- Musi przyciągać uwagę w feedzie\n- Bez tekstu na grafice (dodam w Canva)\n- Spójne z brandem: [OPIS KOLORYSTYKI/STYLU]" },
      { type: "highlight", icon: "Sparkles", title: "Trend 2025/2026", text: "Krótkie wideo (Reels, TikTok, Shorts) generują 2-3x więcej zasięgu niż statyczne posty. AI pozwala produkować 10 klipów z jednego materiału." },
    ],
    tips: ["Spójność wizualna > jednorazowe 'wow'.", "Generuj warianty i testuj, co działa.", "Używaj AI do resizing — jeden asset na 5 platform.", "Tekst na grafikach dodawaj w Canva, nie w AI image gen."]
  },
  {
    id: "sm-hashtags-seo", title: "6. Hashtagi, SEO i Discoverability z AI", duration: "20 min", semester: 2,
    content: [
      { type: "text", text: "Hashtagi to nadal istotny element strategii. AI potrafi analizować trendy i dobierać optymalne hashtagi i słowa kluczowe dla **każdego posta**." },
      { type: "title", text: "Social SEO — nowy paradygmat" },
      { type: "text", text: "Młodsze pokolenia szukają informacji na TikToku i Instagramie zamiast Google. **Social SEO** to optymalizacja treści pod wyszukiwarki wbudowane w platformy." },
      { type: "list", items: [
        "**Alt text:** Opisuj obrazy dla algorytmów i dostępności",
        "**Captions z keywords:** Umieszczaj słowa kluczowe naturalnie w treści",
        "**Hashtagi warstwowe:** 3 duże (>1M), 5 średnich (10K-1M), 7 niszowych (<10K)",
        "**Bio optimization:** Słowa kluczowe w bio i nazwie profilu",
      ]},
      { type: "prompt-box", title: "Prompt: Hashtagi + Social SEO", code: "Dla posta o temacie: [TEMAT]\nPlatforma: [Instagram/TikTok/LinkedIn]\nBranża: [BRANŻA]\nJęzyk: polski\n\nWygeneruj:\n1. 15 hashtagów w 3 warstwach:\n   - 3 duże (>500K postów)\n   - 5 średnie (10K-500K)\n   - 7 niszowych (<10K)\n2. 5 słów kluczowych do umieszczenia w caption\n3. Alt text dla grafiki (max 125 znaków)\n4. Sugerowany opis SEO-friendly (2-3 zdania)" },
    ],
    tips: ["Nie używaj tych samych hashtagów w każdym poście.", "Social SEO > hashtagi na LinkedIn.", "Analizuj hashtagi konkurencji z AI.", "Mniej hashtagów + trafne > dużo + losowe."]
  },
  {
    id: "sm-platforms", title: "7. Strategie per platforma — Instagram, LinkedIn, TikTok", duration: "25 min", semester: 3,
    content: [
      { type: "text", text: "Każda platforma ma inne algorytmy, formaty i publiczność. **Jeden post ≠ copy-paste na 5 platform.**" },
      { type: "title", text: "Instagram (2025/2026)" },
      { type: "list", items: [
        "**Reels:** Algorytm promuje krótkie wideo (15-30s). Hook w 1. sekundzie.",
        "**Karuzele:** Najwyższy engagement. 7-10 slajdów, wartość edukacyjna.",
        "**Stories:** Codziennie. Ankiety, quizy, behind-the-scenes.",
      ]},
      { type: "title", text: "LinkedIn" },
      { type: "list", items: [
        "**Posty tekstowe:** Storytelling, case studies, lekcje z porażek.",
        "**Dokumenty (PDF karuzele):** Ogromny zasięg organiczny.",
        "**Najlepsze godziny:** Wt-Czw, 8-10 rano i 17-18.",
      ]},
      { type: "title", text: "TikTok" },
      { type: "list", items: [
        "**Trend-jacking:** Używaj trendujących dźwięków i formatów.",
        "**Edutainment:** Edukacja + rozrywka = viral.",
        "**Konsystencja > jakość:** Publikuj codziennie. Algorytm nagradza regularność.",
      ]},
      { type: "prompt-box", title: "Prompt: Adaptacja posta na 3 platformy", code: "Mam post o: [TEMAT]\n\nPrzepisz go na 3 wersje:\n\n1. **Instagram Reel** (skrypt 30s):\n   - Hook (1s), problem (5s), rozwiązanie (15s), CTA (5s)\n   - Sugestia: tekst na ekranie + muzyka\n\n2. **LinkedIn post** (tekst):\n   - Hook, storytelling, lekcja, CTA\n   - Max 1300 znaków, 3 emoji\n\n3. **TikTok** (skrypt 15s):\n   - Trend format, szybki, bezpośredni\n   - Sugestia dźwięku/trendu\n\nBranża: [BRANŻA]" },
    ],
    tips: ["Twórz content 'platform-native' — nie kopiuj 1:1.", "LinkedIn = profesjonalizm. TikTok = autentyczność. IG = estetyka.", "Testuj różne formaty i mierz engagement rate.", "AI potrafi adaptować jeden pomysł na 5 platform w minuty."]
  },
  {
    id: "sm-engagement", title: "8. Engagement i Community Management z AI", duration: "20 min", semester: 3,
    content: [
      { type: "text", text: "Publikowanie to połowa sukcesu. Druga połowa to **interakcja** z odbiorcami. AI przyspiesza odpowiedzi i budowanie relacji." },
      { type: "title", text: "AI w Community Management" },
      { type: "list", items: [
        "**Odpowiedzi na komentarze:** AI generuje spersonalizowane odpowiedzi w Twoim stylu",
        "**DM templates:** Szablony wiadomości powitalnych, odpowiedzi na FAQ",
        "**Sentiment analysis:** AI wykrywa negatywne komentarze wymagające pilnej reakcji",
        "**Engagement prompts:** AI sugeruje pytania i tematy do dyskusji",
      ]},
      { type: "prompt-box", title: "Prompt: Odpowiedzi na komentarze", code: "Jestem [ROLA] w branży [BRANŻA].\nMój ton komunikacji: [przyjacielski/profesjonalny/luźny]\n\nWygeneruj odpowiedzi na te komentarze pod moim postem o [TEMAT]:\n\n1. \"Super treść! Jak zacząć?\"\n2. \"Nie zgadzam się, to nie działa w mojej branży\"\n3. \"❤️🔥\"\n4. \"Ile to kosztuje?\"\n5. \"Ciekawe, ale za długie\"\n\nKażda odpowiedź: max 2 zdania, naturalna, zachęcająca do dalszej rozmowy. Nie brzmi jak bot." },
      { type: "highlight", icon: "AlertCircle", title: "Uwaga", text: "NIGDY nie automatyzuj odpowiedzi w 100%. AI generuje draft — Ty personalizujesz i wysyłasz. Ludzie wyczuwają bota." },
    ],
    tips: ["Odpowiadaj w ciągu 1h od komentarza — algorytm to nagradza.", "AI draft + Twój human touch = idealna odpowiedź.", "Negatywne komentarze = szansa na pokazanie profesjonalizmu.", "Pytania w odpowiedziach zwiększają engagement."]
  },
  {
    id: "sm-analytics", title: "9. Analityka Social Media z AI", duration: "20 min", semester: 4,
    content: [
      { type: "text", text: "Dane bez analizy to tylko liczby. AI przekształca **surowe metryki w actionable insights** — konkretne rekomendacje." },
      { type: "title", text: "Kluczowe metryki" },
      { type: "list", items: [
        "**Engagement Rate:** Interakcje / Zasięg × 100. Benchmark: 3-6% IG, 2-4% LinkedIn.",
        "**Reach vs Impressions:** Zasięg (unikalni) vs wyświetlenia (łączne).",
        "**Save Rate:** Najważniejsza metryka IG — pokazuje wartość treści.",
        "**Click-Through Rate (CTR):** % kliknięć w link. Benchmark: 1-3%.",
        "**Follower Growth Rate:** Wzrost obserwujących tygodniowo.",
      ]},
      { type: "prompt-box", title: "Prompt: Analiza danych SM", code: "Przeanalizuj te dane z mojego Instagrama za ostatni miesiąc:\n\n- Posty: [LICZBA] | Avg. engagement: [%] | Top post: [TEMAT]\n- Reels: [LICZBA] | Avg. views: [LICZBA] | Best performing: [TEMAT]\n- Stories: [LICZBA] | Avg. views: [LICZBA]\n- Nowi followersi: [LICZBA] | Unfollows: [LICZBA]\n- Najlepsza godzina publikacji: [GODZINA]\n- Najgorszy post: [TEMAT]\n\nNa podstawie tych danych:\n1. Zidentyfikuj 3 wzorce (co działa, co nie)\n2. Zaproponuj 5 konkretnych zmian na następny miesiąc\n3. Przewidź, jaki typ contentu da najlepsze wyniki\n4. Zasugeruj optymalny harmonogram publikacji" },
    ],
    tips: ["Analizuj dane co tydzień, nie co miesiąc.", "Save Rate > Like Count na Instagramie.", "Porównuj się z benchmarkami branżowymi, nie ogólnymi.", "AI wykrywa wzorce, których nie widzisz gołym okiem."]
  },
  {
    id: "sm-scaling", title: "10. Skalowanie i Automatyzacja SM z AI", duration: "20 min", semester: 4,
    content: [
      { type: "text", text: "Kiedy strategia działa — czas **skalować**. AI pozwala prowadzić social media 5 marek jednocześnie z jakością jednej." },
      { type: "title", text: "Workflow automatyzacji SM" },
      { type: "list", items: [
        "**Batch Content Creation:** Generuj 30 postów w jednej sesji z AI",
        "**Scheduling:** Planowanie publikacji z Buffer, Later, Hootsuite",
        "**Repurposing:** 1 long-form → 10 short-form (AI robi to automatycznie)",
        "**UGC Generation:** AI tworzy szablony i briefy dla User Generated Content",
        "**Reporting:** Automatyczne raporty tygodniowe z AI insights",
      ]},
      { type: "prompt-box", title: "Prompt: Batch 30 postów", code: "Wygeneruj 30 pomysłów na posty na [PLATFORMA] na cały miesiąc.\n\nBranża: [BRANŻA]\nContent pillars: [PILLAR 1], [PILLAR 2], [PILLAR 3], [PILLAR 4]\n\nDla każdego posta podaj:\n| # | Pillar | Format | Hook (1 zdanie) | Temat | CTA |\n\nMix:\n- 12 postów edukacyjnych\n- 8 engagement (pytania, ankiety)\n- 6 sprzedażowych\n- 4 behind-the-scenes / personal\n\nUpewnij się, że żaden hook się nie powtarza." },
      { type: "comparison", bad: "Codziennie siedzę 3h nad jednym postem. Ręcznie tworzę grafiki. Odpowiadam na komentarze po 2 dniach.", good: "Poniedziałek: 2h batch session z AI → 10 postów gotowych.\nWt-Pt: 30min dziennie na engagement i komentarze.\nSobota: 15min analityka z AI.\nNiedziela: wolne." },
    ],
    tips: ["Batch > codzienne tworzenie. Oszczędzasz 70% czasu.", "Repurposing to klucz — jeden podcast = 20 klipów.", "Automatyzuj raportowanie, nie interakcje z ludźmi.", "Skalowanie wymaga systemów — buduj je z AI od pierwszego dnia."]
  },
];
