export interface HomeworkTask {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  techniques: string[];
  deliverable: string;
  hints: string[];
}

export const homeworkTasks: HomeworkTask[] = [
  {
    id: "hw-1",
    title: "Chain-of-Thought dla analizy finansowej",
    description: "Stwórz prompt z Few-Shot CoT, który analizuje rentowność projektu biznesowego. Prompt musi zawierać 3 przykłady z rozpisanym rozumowaniem (przychody → koszty → marża → ROI → rekomendacja).",
    difficulty: "easy",
    techniques: ["Chain-of-Thought", "Few-Shot"],
    deliverable: "Prompt + 3 przykłady + test na nowym przypadku",
    hints: ["Użyj identycznej struktury w każdym przykładzie", "Dodaj edge case (np. projekt z ujemnym ROI)", "Zakończ promptem 'Pomyślmy krok po kroku'"],
  },
  {
    id: "hw-2",
    title: "Głęboka Persona dla Twojej branży",
    description: "Zaprojektuj głęboką personę eksperta w TWOJEJ branży. Persona musi zawierać: doświadczenie, specjalizację, styl komunikacji, wartości, ograniczenia. Przetestuj ją na 3 różnych zadaniach i porównaj wyniki z prostym 'Jesteś ekspertem'.",
    difficulty: "medium",
    techniques: ["Role Prompting", "Persona"],
    deliverable: "Persona + 3 zadania + porównanie wyników (z personą vs bez)",
    hints: ["Im więcej szczegółów, tym lepiej", "Dodaj 'wartości' i 'priorytety' — to robi największą różnicę", "Testuj na zadaniach o różnej złożoności"],
  },
  {
    id: "hw-3",
    title: "Tree-of-Thoughts — decyzja strategiczna",
    description: "Użyj Tree-of-Thoughts do rozwiązania realnego problemu decyzyjnego (np. wybór technologii, strategii marketingowej, lokalizacji biura). Wymagane: 3 podejścia, scoring z wagami, tabela porównawcza, finalna rekomendacja.",
    difficulty: "medium",
    techniques: ["Tree-of-Thoughts", "Scoring System"],
    deliverable: "Prompt + output z 3 podejściami + tabela + rekomendacja",
    hints: ["Zdefiniuj wagi kryteriów PRZED generowaniem", "Minimum 5 kryteriów oceny", "Dodaj sekcję 'ryzyka' dla każdego podejścia"],
  },
  {
    id: "hw-4",
    title: "Prompt Chaining Pipeline",
    description: "Zaprojektuj 4-krokowy pipeline do tworzenia treści (np. artykuł blogowy, opis produktu, post social media). Każdy krok: osobny prompt, output N → input N+1. Dodaj Gate Keeping między krokami.",
    difficulty: "hard",
    techniques: ["Prompt Chaining", "Gate Keeping"],
    deliverable: "4 prompty + schemat pipeline'u + przykład pełnego przebiegu",
    hints: ["Krok 1: Research, Krok 2: Outline, Krok 3: Draft, Krok 4: Edit", "Gate Keeping: sprawdź czy output jest wystarczająco dobry", "Dokumentuj co jest inputem i outputem każdego kroku"],
  },
  {
    id: "hw-5",
    title: "Projekt końcowy: System promptów produkcyjny",
    description: "Zaprojektuj kompletny system promptów dla realnego use case (np. customer support bot, content generator, code reviewer). System musi używać minimum 4 technik z kursu. Dostarcz: dokumentację problemu, architekturę systemu, prompty, wyniki testów.",
    difficulty: "hard",
    techniques: ["Dowolne 4+ techniki z kursu"],
    deliverable: "Dokumentacja: Problem → Solution → Prompty → Architektura → Wyniki testów",
    hints: ["Zacznij od Reverse Prompting — niech AI pomoże zdefiniować wymagania", "Użyj Chaining do rozbicia na kroki", "Testuj Self-Consistency na krytycznych krokach", "Dodaj sekcję 'kosztów' (ile tokenów zużywa system)"],
  },
];
