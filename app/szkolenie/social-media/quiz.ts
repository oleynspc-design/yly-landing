export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Jaka jest złota proporcja typów contentu w social media?",
    options: ["50% sprzedaż, 50% edukacja", "40% edukacja, 30% engagement, 20% sprzedaż, 10% behind-the-scenes", "80% edukacja, 20% sprzedaż", "Równe proporcje wszystkich typów"],
    correct: 1,
    explanation: "Proporcja 40/30/20/10 zapewnia balans między wartością dla odbiorcy a celami biznesowymi."
  },
  {
    question: "Co oznacza 'Social SEO'?",
    options: ["Optymalizacja strony internetowej pod social media", "Kupowanie reklam na platformach SM", "Optymalizacja treści pod wyszukiwarki wbudowane w platformy SM", "Linkowanie z social media do strony"],
    correct: 2,
    explanation: "Social SEO to nowy paradygmat — młodsze pokolenia szukają informacji bezpośrednio na TikToku i Instagramie."
  },
  {
    question: "Który element posta decyduje o 80% jego sukcesu?",
    options: ["Hashtagi", "Grafika", "Hook (pierwsze zdanie)", "CTA"],
    correct: 2,
    explanation: "Hook zatrzymuje scrollowanie — bez niego nawet najlepsza treść nie zostanie przeczytana."
  },
  {
    question: "Jaka jest najważniejsza metryka na Instagramie?",
    options: ["Liczba lajków", "Save Rate (zapisania)", "Liczba komentarzy", "Liczba followerów"],
    correct: 1,
    explanation: "Save Rate pokazuje realną wartość treści — użytkownik chce do niej wrócić. Algorytm IG mocno promuje posty z wysokim save rate."
  },
  {
    question: "Co oznacza framework SEED w planowaniu contentu?",
    options: ["Search, Engage, Educate, Deliver", "Sezonowość, Evergreen, Engagement, Data-driven", "Strategy, Execution, Evaluation, Development", "Social, Email, Events, Direct"],
    correct: 1,
    explanation: "SEED to framework: Sezonowość, Evergreen, Engagement, Data-driven — 4 filary planowania kalendarza contentowego."
  },
  {
    question: "Dlaczego NIE należy automatyzować odpowiedzi na komentarze w 100%?",
    options: ["Bo jest to za drogie", "Bo algorytmy to wykrywają i blokują", "Bo ludzie wyczuwają bota i tracisz autentyczność", "Bo komentarze nie są ważne"],
    correct: 2,
    explanation: "AI generuje draft odpowiedzi, ale Twój human touch jest kluczowy. Ludzie wyczuwają zautomatyzowane odpowiedzi."
  },
  {
    question: "Jaki jest optymalny system hashtagów warstwowych?",
    options: ["Tylko duże hashtagi (>1M)", "Tylko niszowe hashtagi (<10K)", "3 duże + 5 średnich + 7 niszowych", "15 identycznych hashtagów w każdym poście"],
    correct: 2,
    explanation: "System warstwowy łączy zasięg dużych hashtagów z targetowaniem niszowych, maksymalizując discoverability."
  },
  {
    question: "Co oznacza 'repurposing' w kontekście SM?",
    options: ["Usuwanie starych postów", "Przekształcanie jednego contentu w wiele formatów na różne platformy", "Kopiowanie postów konkurencji", "Powtarzanie tego samego posta co tydzień"],
    correct: 1,
    explanation: "Repurposing to klucz do skalowania: 1 podcast = 20 klipów, 1 artykuł = 10 postów SM."
  },
  {
    question: "Jaki format ma najwyższy engagement na Instagramie?",
    options: ["Pojedyncze zdjęcie", "Karuzela (7-10 slajdów)", "Story", "IGTV"],
    correct: 1,
    explanation: "Karuzele generują najwyższy engagement dzięki wielokrotnemu wyświetlaniu (każde przesunięcie = nowe wyświetlenie)."
  },
  {
    question: "Kiedy najlepiej publikować na LinkedIn?",
    options: ["Weekendy, 10-12", "Poniedziałek rano, 7-8", "Wtorek-Czwartek, 8-10 i 17-18", "Codziennie o północy"],
    correct: 2,
    explanation: "LinkedIn to platforma profesjonalna — Wt-Czw, przed pracą (8-10) i po pracy (17-18) to peak engagement."
  },
  {
    question: "Co to jest 'batch content creation'?",
    options: ["Tworzenie contentu na bieżąco codziennie", "Generowanie wielu postów w jednej sesji", "Kupowanie gotowego contentu", "Automatyczne publikowanie bez kontroli"],
    correct: 1,
    explanation: "Batch creation oszczędza ~70% czasu: jedna sesja z AI = 30 postów gotowych na cały miesiąc."
  },
  {
    question: "Jaki styl contentu najlepiej działa na TikToku?",
    options: ["Formalny, korporacyjny", "Edutainment (edukacja + rozrywka)", "Długie wykłady", "Tylko zdjęcia"],
    correct: 1,
    explanation: "TikTok nagradza edutainment — treści edukacyjne podane w rozrywkowy sposób mają największy potencjał viralowy."
  },
  {
    question: "Jak AI może pomóc w analizie persona odbiorcy?",
    options: ["Tylko liczy followerów", "Tworzy szczegółowe persony z motywacjami, bolączkami i preferencjami komunikacyjnymi", "Automatycznie wysyła wiadomości do odbiorców", "Nie może pomóc w analizie persona"],
    correct: 1,
    explanation: "AI tworzy deep persony wykraczające poza demografię — uwzględnia psychografię, motywacje, styl komunikacji."
  },
  {
    question: "Jak często należy analizować dane SM?",
    options: ["Raz na kwartał", "Raz na miesiąc", "Co tydzień", "Codziennie przez 3 godziny"],
    correct: 2,
    explanation: "Cotygodniowa analiza pozwala szybko reagować na trendy i optymalizować strategię w czasie rzeczywistym."
  },
  {
    question: "Co to jest 'trend-jacking' na TikToku?",
    options: ["Kopiowanie filmów innych twórców", "Wykorzystywanie trendujących dźwięków i formatów w swojej treści branżowej", "Kupowanie trendujących hashtagów", "Tworzenie własnych trendów od zera"],
    correct: 1,
    explanation: "Trend-jacking to adaptowanie popularnych formatów/dźwięków do własnej niszy — algorytm TikToka promuje treści używające trendujących elementów."
  },
  {
    question: "Jaka jest rola CTA w poście SM?",
    options: ["Dekoracyjna — wygląda profesjonalnie", "Mówi odbiorcy, co dokładnie ma zrobić (komentuj, kliknij, udostępnij)", "Nie jest potrzebna w social media", "Służy tylko do sprzedaży"],
    correct: 1,
    explanation: "CTA to jasne wezwanie do działania — bez niego odbiorca scrolluje dalej, nawet jeśli treść mu się podobała."
  },
  {
    question: "Jakie podejście jest najskuteczniejsze przy tworzeniu grafik z AI?",
    options: ["Generuj jeden wariant i publikuj", "Generuj warianty, testuj i wybierz najlepszy", "Nie używaj AI do grafik", "Kopiuj grafiki z internetu"],
    correct: 1,
    explanation: "Generowanie wariantów i testowanie A/B to klucz — AI pozwala szybko iterować i znaleźć najskuteczniejszy visual."
  },
  {
    question: "Co oznacza 'Lost in the Middle' w kontekście promptów dla SM?",
    options: ["Posty publikowane w środku tygodnia mają gorszy zasięg", "Informacje w środku długiego promptu są gorzej przetwarzane przez AI", "Średnie hashtagi działają najgorzej", "Treści w środku karuzeli są pomijane"],
    correct: 1,
    explanation: "LLM gorzej przetwarzają informacje w środku kontekstu — kluczowe instrukcje dawaj na początku lub końcu promptu."
  },
  {
    question: "Ile czasu oszczędza batch content creation z AI?",
    options: ["10%", "30%", "~70%", "0% — nie oszczędza czasu"],
    correct: 2,
    explanation: "Batch creation z AI oszczędza ok. 70% czasu — jedna 2h sesja zastępuje 3h dziennie przez cały miesiąc."
  },
  {
    question: "Jak powinna wyglądać optymalna strategia odpowiedzi na komentarze?",
    options: ["Ignoruj komentarze — treść mówi sama za siebie", "AI generuje drafty, Ty personalizujesz i wysyłasz w ciągu 1h", "Odpowiadaj po tygodniu zbiorczo", "Używaj jednej automatycznej odpowiedzi na wszystko"],
    correct: 1,
    explanation: "AI draft + human touch + szybki czas reakcji (1h) to optymalna strategia. Algorytm nagradza szybkie odpowiedzi."
  },
];
