import type { MicroQuizData } from "@/app/components/MicroQuiz";

export const microQuizzes: MicroQuizData[] = [
  {
    afterLesson: 1,
    title: "Sprawdź wiedzę: Audyt Pracy i Delegowanie",
    questions: [
      { question: "Jaki procent tygodnia pracy to zadania powtarzalne delegowalne do AI?", options: ["5-10%", "15-20%", "40-60%", "90%"], correct: 2, hint: "Większość ludzi nie zdaje sobie sprawy, że 40-60% ich tygodnia to zadania dla AI." },
      { question: "Co oznacza 'R' w frameworku RICE?", options: ["Research", "Rola — kim ma być AI", "Result", "Revenue"], correct: 1, hint: "RICE: Rola, Instrukcja, Kontekst, Efekt." },
      { question: "Ile iteracji warto planować przy pracy z AI?", options: ["1", "3 — draft → feedback → poprawka", "10", "0"], correct: 1, hint: "3 iteracje: AI generuje, Ty dajesz feedback, AI poprawia." },
    ],
  },
  {
    afterLesson: 3,
    title: "Sprawdź wiedzę: Szablony i Kontekst",
    questions: [
      { question: "Co to jest prompt chaining?", options: ["Łańcuch maili", "Seria promptów, wynik jednego = input następnego", "Blokada AI", "Kopiowanie"], correct: 1, hint: "Prompt chaining: Research → Outline → Draft → Edit. Każdy krok buduje na poprzednim." },
      { question: "Ile szablonów promptów warto mieć po miesiącu?", options: ["1-2", "5-10", "20-30", "100+"], correct: 2, hint: "1 prompt/dzień × 30 dni = 30 szablonów pokrywających 80% pracy." },
      { question: "Gdzie najlepiej trzymać bibliotekę promptów?", options: ["W pamięci", "Notion (baza danych z filtrami)", "Na karteczkach", "W historii chatu"], correct: 1, hint: "Notion oferuje bazę z filtrami, tagami i wyszukiwaniem." },
    ],
  },
  {
    afterLesson: 5,
    title: "Sprawdź wiedzę: Biblioteka Promptów",
    questions: [
      { question: "Co to jest zasada 80/20 w bibliotece promptów?", options: ["80% jest złych", "80% pracy pokrywa 20% promptów — Twoje TOP 10", "Używaj 80% czasu", "20% wystarczy"], correct: 1, hint: "Zidentyfikuj TOP 10 promptów jako Favorites — to Twój codzienny arsenał." },
      { question: "Jak często aktualizować bibliotekę promptów?", options: ["Nigdy", "Co piątek 10 min + co 2 tygodnie pełny przegląd", "Raz w roku", "Codziennie 2h"], correct: 1, hint: "Cotygodniowy mini-przegląd + dwutygodniowa aktualizacja ocen." },
      { question: "Co daje największy wpływ na jakość promptu?", options: ["Długość", "Rola + kontekst = 80% jakości", "Emoji", "Powtórzenia"], correct: 1, hint: "Rola (kim jest AI) i kontekst (branża, cel, grupa) decydują o jakości." },
    ],
  },
  {
    afterLesson: 7,
    title: "Sprawdź wiedzę: Automatyzacja i Integracje",
    questions: [
      { question: "Co to jest batch processing e-maili?", options: ["Masowe wysyłanie", "Przetwarzanie wszystkich maili w jednym bloku czasowym", "Kasowanie spamu", "Drukowanie"], correct: 1, hint: "Batch = odpowiadaj na maile z AI w jednym bloku rano, nie reaguj na bieżąco." },
      { question: "Co AI może zrobić z arkuszem Excel?", options: ["Nic", "Pisać formuły, makra VBA, analizować, wizualizować", "Tylko otwierać", "Tylko formatować"], correct: 1, hint: "AI pisze formuły, tworzy makra VBA, analizuje trendy i generuje wykresy." },
      { question: "Jakie narzędzie jest najlepsze na start do automatyzacji?", options: ["Kod od zera", "Make.com lub Zapier (no-code)", "SAP", "Paint"], correct: 1, hint: "Make.com i Zapier: wizualne budowanie workflowów bez kodowania." },
    ],
  },
  {
    afterLesson: 9,
    title: "Sprawdź wiedzę: Produktywność i Koszty",
    questions: [
      { question: "Ile czasu zajmuje poranny rytuał planowania z AI?", options: ["60 min", "10 minut", "2 godziny", "Cały dzień"], correct: 1, hint: "10 min rano: lista zadań → AI priorytetyzuje → bloki czasowe → plan dnia." },
      { question: "Jak obliczyć ROI z narzędzi AI?", options: ["Nie da się", "(Godziny zaoszczędzone × stawka) - koszt narzędzi", "Liczba narzędzi", "Ilość tekstów"], correct: 1, hint: "ROI = oszczędności (godziny × stawka) minus koszty. Mierz w PLN." },
      { question: "Co to jest 'tool fatigue'?", options: ["Zmęczenie fizyczne", "Subskrybujesz wiele narzędzi, używasz kilka", "Awaria", "Brak internetu"], correct: 1, hint: "Płacisz za 10, używasz 3. Rozwiązanie: kwartalny audyt i minimalizm." },
    ],
  },
];
