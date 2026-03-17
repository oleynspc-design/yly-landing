import type { MicroQuizData } from "@/app/components/MicroQuiz";

export const microQuizzes: MicroQuizData[] = [
  {
    afterLesson: 1,
    title: "Sprawdź wiedzę: Korzystanie z Kolekcji",
    questions: [
      { question: "Co jest kluczowe przy dostosowywaniu promptu z kolekcji?", options: ["Kopiowanie bez zmian", "Uzupełnienie zmiennych swoimi danymi i kontekstem", "Usunięcie instrukcji", "Zmiana na angielski"], correct: 1, hint: "Prompt z kolekcji to szablon — uzupełniasz zmienne, dostosowujesz ton." },
      { question: "Co daje największy wpływ na jakość promptu?", options: ["Długość", "Rola + kontekst = 80% jakości", "Emoji", "Powtórzenia słów"], correct: 1, hint: "Rola (kim jest AI) i kontekst (branża, grupa, cel) to 80% sukcesu." },
      { question: "Dlaczego warto podawać przykład oczekiwanego wyniku?", options: ["Nie warto", "AI uczy się przez naśladowanie — przykład definiuje standard", "Zajmuje miejsce", "AI ignoruje przykłady"], correct: 1, hint: "Przykład to najskuteczniejszy sposób komunikacji z AI." },
    ],
  },
  {
    afterLesson: 3,
    title: "Sprawdź wiedzę: Prompty Biznesowe",
    questions: [
      { question: "Co powinien zawierać prompt do analizy SWOT?", options: ["Tylko nazwę firmy", "Opis firmy, branżę, rynek + prośbę o uzasadnienie", "Tylko pytanie 'Zrób SWOT'", "Dane finansowe"], correct: 1, hint: "Im więcej kontekstu (firma, branża, rynek), tym trafniejsza analiza." },
      { question: "Jak AI pomaga w cold email?", options: ["Wysyła automatycznie", "Generuje spersonalizowane warianty do testowania", "Hakuje skrzynki", "Nie pomaga"], correct: 1, hint: "AI generuje warianty: pain point, social proof, pytanie — testujesz wyniki." },
      { question: "Co jest kluczowe w prompcie na landing page?", options: ["Długość tekstu", "Sekcje: hero → problem → rozwiązanie → korzyści → CTA", "Kolory", "Tylko cena"], correct: 1, hint: "Skuteczny LP: hook → problem → rozwiązanie → korzyści → dowody → CTA." },
    ],
  },
  {
    afterLesson: 5,
    title: "Sprawdź wiedzę: Prompty Sprzedażowe",
    questions: [
      { question: "Co jest lepsze w opisie produktu: korzyści czy cechy?", options: ["Cechy", "Korzyści — 'Oszczędź 2h' > 'Procesor 3.5 GHz'", "Oba równo", "Żadne"], correct: 1, hint: "Klienci kupują korzyści, nie cechy techniczne." },
      { question: "Jak generować pomysły z AI (brainstorming)?", options: ["Prosić o 1 pomysł", "20 pomysłów w 4 kategoriach ryzyka", "Kopiować konkurencję", "AI nie umie"], correct: 1, hint: "20 pomysłów: bezpieczne, kreatywne, szalone, hybrydowe — pełne spektrum." },
      { question: "Jaki jest najlepszy sposób na testowanie nowego promptu?", options: ["Użyć raz", "3 testy w różnych kontekstach i na różnych modelach", "Nie testować", "Przez miesiąc"], correct: 1, hint: "3 testy + różne konteksty + różne modele = rzetelna ocena." },
    ],
  },
  {
    afterLesson: 7,
    title: "Sprawdź wiedzę: Prompty Procesowe",
    questions: [
      { question: "Co daje prompt do SOP?", options: ["Nic", "Zamienia chaotyczny opis w uporządkowaną procedurę", "Tylko listę narzędzi", "Regulamin"], correct: 1, hint: "AI strukturyzuje opis procesu w: cel, zakres, kroki, wyjątki, metryki." },
      { question: "Jak używać AI do analizy danych w Excelu?", options: ["Nie da się", "Wgrać dane + opisać cel → AI pisze formuły i analizuje", "Tylko sumowanie", "Trzeba Python"], correct: 1, hint: "Opisujesz dane i cel → AI pisze formuły, analizuje, generuje wnioski." },
      { question: "Co to jest Chain-of-Thought?", options: ["Łańcuch maili", "Technika wymuszająca rozpisanie kroków rozumowania", "Typ modelu AI", "Format pliku"], correct: 1, hint: "CoT zmusza AI do rozpisania kroków — drastycznie poprawia jakość w złożonych zadaniach." },
    ],
  },
  {
    afterLesson: 9,
    title: "Sprawdź wiedzę: Prompty Branżowe i Zaawansowane",
    questions: [
      { question: "Ile branżowych pakietów promptów zawiera ta kolekcja?", options: ["1", "3", "6", "20"], correct: 2, hint: "6 branż: Marketing, E-commerce, HR, Finanse, Edukacja, Social Media." },
      { question: "Co to jest prompt chaining?", options: ["Kopiowanie", "Seria promptów: wynik jednego = input następnego", "Blokada", "Łańcuch maili"], correct: 1, hint: "Research → Outline → Draft → Edit. Każdy krok buduje na wyniku poprzedniego." },
      { question: "Ile promptów warto mieć po 3 miesiącach?", options: ["5", "15", "50+", "500+"], correct: 2, hint: "Cel: 50+ przetestowanych promptów pokrywających 90% codziennej pracy." },
    ],
  },
];
