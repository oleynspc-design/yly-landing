import type { MicroQuizData } from "@/app/components/MicroQuiz";

export const microQuizzes: MicroQuizData[] = [
  {
    afterLesson: 1,
    title: "Sprawdź wiedzę: Fundamenty AI w Biznesie",
    questions: [
      { question: "Co daje 80% wartości z AI w firmie według Zasady Pareto AI?", options: ["Wszystkie procesy jednocześnie", "20% zastosowań — powtarzalne, tekstowe zadania", "Tylko marketing", "Tylko obsługa klienta"], correct: 1, hint: "Kluczem jest znalezienie 20% zastosowań, które dają 80% wartości." },
      { question: "Jaki jest wspólny wzorzec sukcesu firm wdrażających AI?", options: ["Wdrożenie AI wszędzie naraz", "Zaczęcie od JEDNEGO procesu i udowodnienie ROI", "Zatrudnienie zespołu AI", "Kupienie najdroższego narzędzia"], correct: 1, hint: "Najlepsze firmy zaczynają od 1 procesu, mierzą wyniki, potem skalują." },
      { question: "Co wchodzi w skład 'Minimalnego Stacka AI' dla małego biznesu?", options: ["SAP + Salesforce", "ChatGPT Plus + Claude Pro + Canva AI + Make.com", "Tylko ChatGPT", "15 różnych narzędzi"], correct: 1, hint: "Minimalny stack: ChatGPT + Claude + Canva + Make.com za ~$60/mies." },
    ],
  },
  {
    afterLesson: 3,
    title: "Sprawdź wiedzę: AI w Marketingu",
    questions: [
      { question: "Ile kawałków contentu można stworzyć z jednego artykułu dzięki AI?", options: ["1-2", "5-10", "Około 20", "100+"], correct: 2, hint: "Recykling treści: 1 artykuł → posty, newsletter, stories, podcast script, infografiki." },
      { question: "Co decyduje o 80% sukcesu posta na social media?", options: ["Hashtagi", "Hook — pierwsze zdanie", "Godzina publikacji", "Długość"], correct: 1, hint: "Hook (pierwsze zdanie) zatrzymuje scrollowanie — to klucz do zaangażowania." },
      { question: "Jaki jest najlepszy sposób na generowanie wariantów reklamowych z AI?", options: ["1 wariant wystarczy", "Minimum 10 wariantów, Ty wybierasz najlepsze", "Kopiowanie konkurencji", "Tylko grafiki AI"], correct: 1, hint: "AI generuje ilość, Ty selekcjonujesz jakość — minimum 10 wariantów." },
    ],
  },
  {
    afterLesson: 5,
    title: "Sprawdź wiedzę: Obsługa Klienta i Operacje",
    questions: [
      { question: "Jaki procent zapytań klientów może obsługiwać AI chatbot?", options: ["10%", "30%", "Około 80%", "100%"], correct: 2, hint: "AI obsługuje ~80% typowych zapytań (FAQ, status, cennik), eskalując resztę." },
      { question: "Od jakiego poziomu automatyzacji obsługi klienta warto zacząć?", options: ["Pełna automatyzacja", "FAQ Bot (Poziom 1)", "Inteligentny asystent", "Wszystkie naraz"], correct: 1, hint: "FAQ Bot daje 60% oszczędności przy minimalnym ryzyku." },
      { question: "Co AI może zrobić z fakturą PDF?", options: ["Nic", "Przeczytać, wyciągnąć dane i wpisać do arkusza", "Tylko wyświetlić", "Opłacić automatycznie"], correct: 1, hint: "AI czyta PDF-y, rozpoznaje dane (kwota, NIP, data) i strukturyzuje je." },
    ],
  },
  {
    afterLesson: 7,
    title: "Sprawdź wiedzę: Dokumenty i SOP-y",
    questions: [
      { question: "Co oznacza SOP?", options: ["System Operating Plan", "Standard Operating Procedure", "Simple Online Process", "Secure Output Protocol"], correct: 1, hint: "SOP = Standard Operating Procedure — uporządkowana procedura krok po kroku." },
      { question: "Kto powinien tworzyć SOP z AI?", options: ["Tylko AI", "Ekspert procesowy z pomocą AI", "Tylko nowy pracownik", "Zewnętrzna firma"], correct: 1, hint: "AI strukturyzuje, ale wiedzę ekspercką dodaje człowiek znający proces." },
      { question: "Jak często aktualizować SOP-y?", options: ["Nigdy", "Co kwartał", "Codziennie", "Raz na 10 lat"], correct: 1, hint: "Procesy się zmieniają — kwartalny przegląd utrzymuje SOP-y aktualne." },
    ],
  },
  {
    afterLesson: 9,
    title: "Sprawdź wiedzę: Analityka i Prawo",
    questions: [
      { question: "Czego NIE wolno wrzucać do publicznych narzędzi AI?", options: ["Ogólnych pytań", "Danych osobowych klientów i tajemnic handlowych", "Prośb o tłumaczenie", "Pytań o formaty"], correct: 1, hint: "Dane osobowe, tajemnice handlowe, dane medyczne = NIE do publicznych AI." },
      { question: "Co to jest AI Act?", options: ["Aplikacja mobilna", "Regulacja UE dotycząca systemów AI", "Firma tech", "Typ modelu"], correct: 1, hint: "AI Act to regulacja Unii Europejskiej klasyfikująca systemy AI." },
      { question: "Jak bezpiecznie używać AI z danymi firmowymi?", options: ["Wrzucać wszystko do darmowego ChatGPT", "Używać wersji enterprise/team, anonimizować dane", "Nie używać AI", "Szyfrować ręcznie"], correct: 1, hint: "Wersje enterprise nie trenują modeli na Twoich danych + anonimizacja." },
    ],
  },
];
