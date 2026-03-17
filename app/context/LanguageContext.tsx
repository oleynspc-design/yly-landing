"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "pl" | "en" | "uk" | "es";

export const translations = {
  pl: {
    nav: {
      mission: "Misja",
      offer: "Oferta",
      community: "Społeczność",
      about: "O mnie",
      contact: "Kontakt",
    },
    hero: {
      badge: "Środowisko Rozwoju AI",
      headline1: "Przyszłość należy do",
      headline2: "tych, którzy rozumieją AI",
      sub: "YLY to społeczność ludzi, którzy uczą się, wdrażają i tworzą z pomocą sztucznej inteligencji. Dołącz do rewolucji.",
      cta1: "Dołącz teraz",
      cta2: "Poznaj ofertę",
      stats: {
        s1: "Członków społeczności",
        s2: "Kursów i materiałów",
        s3: "Krajów",
      },
    },
    mission: {
      badge: "Nasza misja",
      title: "Udostępniamy AI każdemu",
      sub: "Wierzymy, że każdy człowiek powinien mieć dostęp do wiedzy o sztucznej inteligencji. Nasze środowisko powstało po to, by szkolić, inspirować i tworzyć innowacje razem z Tobą.",
      cards: [
        {
          title: "Szkolenia AI",
          desc: "Praktyczne kursy i warsztaty z zakresu AI, które zmieniają sposób, w jaki pracujesz.",
        },
        {
          title: "Innowacje",
          desc: "Tworzymy rozwiązania przyszłości — od automatyzacji po zaawansowane modele językowe.",
        },
        {
          title: "Społeczność",
          desc: "Sieć ekspertów, entuzjastów i twórców AI gotowych dzielić się wiedzą.",
        },
      ],
    },
    offer: {
      badge: "Cennik",
      title: "Wybierz swój pakiet",
      sub: "7 kompletnych szkoleń AI, egzaminy, certyfikaty, asystent AI PROMPTLY i czat grupowy. Zacznij za darmo — pierwsza lekcja każdego modułu gratis!",
      tiers: [
        {
          name: "Basic",
          price: "199",
          period: "jednorazowo",
          desc: "Pełny dostęp do wszystkich 7 szkoleń AI z egzaminami i certyfikatami.",
          features: ["7 kompletnych szkoleń (84+ lekcji)", "Egzaminy i certyfikaty", "Kolekcja 200+ promptów", "Asystent AI PROMPTLY", "Czat grupowy", "Przyszłe aktualizacje"],
          cta: "Kup Basic",
          popular: false,
        },
        {
          name: "Pro",
          price: "399",
          period: "jednorazowo",
          desc: "Wszystko z Basic + spotkanie online 1-na-1 z ekspertem AI.",
          features: ["Wszystko z pakietu Basic", "1x spotkanie online 1.5h", "Spersonalizowana ścieżka AI", "Priorytetowe wsparcie", "Materiały dodatkowe"],
          cta: "Kup Pro",
          popular: true,
        },
        {
          name: "Premium",
          price: "699",
          period: "jednorazowo",
          desc: "Pełne wsparcie — 3 spotkania, VIP dostęp, wszystkie przyszłe materiały.",
          features: ["Wszystko z pakietu Pro", "3x spotkanie online 1.5h", "Dostęp do kalendarza spotkań", "VIP wsparcie", "Przyszłe kursy gratis"],
          cta: "Kup Premium",
          popular: false,
        },
      ],
    },
    community: {
      badge: "Społeczność",
      title: "Dołącz do naszej społeczności",
      sub: "Jesteśmy wszędzie tam, gdzie rozmawiasz o AI. Wybierz swoje ulubione medium i bądź na bieżąco.",
      platforms: [
        { name: "Discord", desc: "Codzienne rozmowy, Q&A, projekty", color: "#5865F2" },
        { name: "Skool", desc: "Kursy premium i społeczność", color: "#3b82f6" },
        { name: "Facebook", desc: "Aktualności i posty", color: "#1877F2" },
        { name: "TikTok", desc: "Krótkie lekcje AI codziennie", color: "#ff0050" },
        { name: "YouTube", desc: "Darmowe kursy i poradniki", color: "#FF0000" },
        { name: "X (Twitter)", desc: "Myśli i aktualności ze świata AI", color: "#e4e4e4" },
      ],
    },
    about: {
      badge: "Twórca YLY",
      name: "Patryk Olejnik",
      role: "Założyciel & Strateg AI",
      bio1: "Cześć, jestem Patryk — twórca środowiska YLY. Od lat fascynuje mnie sztuczna inteligencja i jej potencjał do transformacji biznesu i życia codziennego.",
      bio2: "Moją misją jest sprawić, żeby AI stała się dostępna dla każdego — bez względu na poziom technicznego zaawansowania. Buduję społeczność, w której uczymy się razem i razem tworzymy przyszłość.",
      stats: [
        { val: "3+", label: "Lat w AI" },
        { val: "500+", label: "Kursantów" },
        { val: "10K+", label: "Obserwujących" },
      ],
    },
    cta: {
      title: "Gotowy na zmianę?",
      sub: "Dołącz do tysięcy ludzi, którzy już korzystają z AI na co dzień. Zacznij dziś.",
      btn: "Dołącz do YLY",
    },
    footer: {
      copy: "© 2026 YLY. Wszelkie prawa zastrzeżone.",
      by: "Stworzone przez Patryka Olejnika",
    },
    training: {
      badge: "Szkolenie Premium",
      title: "Optymalizacja Pracy z AI",
      subtitle: "Naucz się pisać skuteczne prompty i maksymalizować wykorzystanie sztucznej inteligencji w swojej pracy.",
      stats: [
        { val: "6", label: "Modułów szkoleniowych" },
        { val: "24+", label: "Lekcji wideo" },
        { val: "50+", label: "Gotowych promptów" },
        { val: "∞", label: "Dostęp" },
      ],
      modulesTitle: "Moduły szkoleniowe",
      modulesSubtitle: "Przejdź przez wszystkie moduły aby opanować sztukę pracy z AI",
      startModule: "Rozpocznij",
      promptLibrary: "Biblioteka Promptów",
      promptLibrarySubtitle: "Skopiuj i dostosuj gotowe prompty do swoich potrzeb",
      copyPrompt: "Kopiuj",
      tryIt: "Wypróbuj",
      bestPractices: "Najlepsze Praktyki",
      bestPracticesSubtitle: "Zasady które pozwolą Ci wyciągnąć maximum z AI",
      practices: [
        { title: "Bądź konkretny", desc: "Im bardziej szczegółowy prompt, tym lepsze wyniki. Określ kontekst, format i oczekiwany rezultat." },
        { title: "Używaj kontekstu", desc: "Dodaj informacje backgroundowe, które pomogą AI zrozumieć sytuację i dostosować odpowiedź." },
        { title: "Iteruj i poprawiaj", desc: "Nie bój się refinować promptów. Czasem drobna zmiana znacząco poprawia jakość wyników." },
        { title: "Strukturyzuj odpowiedzi", desc: "Poproś o konkretny format wyjściowy - lista, tabela, kod - to ułatwia późniejszą pracę." },
      ],
      ctaTitle: "Gotowy na więcej?",
      ctaSubtitle: "Dołącz do naszej społeczności w Skool aby uzyskać dostęp do jeszcze więcej materiałów",
      ctaBtn: "Dołącz do Skool",
      backToHome: "Wróć do strony głównej",
      modules: {
        basics: {
          title: "Podstawy Promptingu",
          desc: "Nauka fundamentów pisania efektywnych promptów",
          lessons: {
            l1: "Czym jest prompt i jak działa AI",
            l2: "Struktura dobrego promptu",
            l3: "Najczęstsze błędy i jak ich unikać",
            l4: "Ćwiczenia praktyczne",
          },
        },
        advanced: {
          title: "Zaawansowany Prompting",
          desc: "Techniki dla profesjonalistów",
          lessons: {
            l1: "Chain of Thought prompting",
            l2: "Few-shot learning w praktyce",
            l3: "Roleplaying i persona",
            l4: "Kontekstowe filtrowanie",
          },
        },
        optimization: {
          title: "Optymalizacja Pracy",
          desc: "Jak przyspieszyć i usprawnić workflow z AI",
          lessons: {
            l1: "Automatyzacja powtarzalnych zadań",
            l2: "Tworzenie szablonów promptów",
            l3: "Integracja z narzędziami",
            l4: "Zarządzanie kontekstem",
          },
        },
        workflows: {
          title: "AI Workflows",
          desc: "Budowanie automatycznych procesów",
          lessons: {
            l1: "Projektowanie workflow",
            l2: "Łączenie wielu AI",
            l3: "Pipeline'y przetwarzania",
            l4: "Testowanie i optymalizacja",
          },
        },
        business: {
          title: "AI w Biznesie",
          desc: "Zastosowania komercyjne AI",
          lessons: {
            l1: "Automatyzacja obsługi klienta",
            l2: "Generowanie treści marketingowych",
            l3: "Analiza danych i raporty",
            l4: "Optymalizacja procesów",
          },
        },
        socialMedia: {
          title: "Social Media & AI",
          desc: "Strategia, content i automatyzacja SM z AI",
          lessons: {
            l1: "Strategia SM z AI",
            l2: "AI Copywriting i Visual Content",
            l3: "Platformy i algorytmy",
            l4: "Analityka i skalowanie",
          },
        },
        prompts: {
          title: "Kolekcja Promptów",
          desc: "Gotowe prompty do różnych zastosowań",
          lessons: {
            l1: "Prompty biznesowe",
            l2: "Prompty kreatywne",
            l3: "Prompty techniczne",
            l4: "Prompty edukacyjne",
          },
        },
      },
    },
  },
  en: {
    nav: {
      mission: "Mission",
      offer: "Offer",
      community: "Community",
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "AI Development Environment",
      headline1: "The future belongs to",
      headline2: "those who understand AI",
      sub: "YLY is a community of people who learn, implement and create with the help of artificial intelligence. Join the revolution.",
      cta1: "Join Now",
      cta2: "Explore Offer",
      stats: {
        s1: "Community Members",
        s2: "Courses & Materials",
        s3: "Countries",
      },
    },
    mission: {
      badge: "Our Mission",
      title: "We Democratize AI",
      sub: "We believe everyone should have access to knowledge about artificial intelligence. Our environment was created to train, inspire and create innovations together with you.",
      cards: [
        {
          title: "AI Training",
          desc: "Practical AI courses and workshops that transform the way you work.",
        },
        {
          title: "Innovation",
          desc: "We create solutions of the future — from automation to advanced language models.",
        },
        {
          title: "Community",
          desc: "A network of experts, enthusiasts and AI creators ready to share knowledge.",
        },
      ],
    },
    offer: {
      badge: "Pricing",
      title: "Choose Your Plan",
      sub: "7 complete AI trainings, exams, certificates, PROMPTLY AI assistant and group chat. Start free — first lesson of every module is on us!",
      tiers: [
        { name: "Basic", price: "199", period: "one-time", desc: "Full access to all 7 AI trainings with exams and certificates.", features: ["7 complete trainings (84+ lessons)", "Exams and certificates", "200+ prompt collection", "PROMPTLY AI assistant", "Group chat", "Future updates"], cta: "Buy Basic", popular: false },
        { name: "Pro", price: "399", period: "one-time", desc: "Everything in Basic + 1-on-1 online meeting with AI expert.", features: ["Everything in Basic", "1x online meeting 1.5h", "Personalized AI path", "Priority support", "Bonus materials"], cta: "Buy Pro", popular: true },
        { name: "Premium", price: "699", period: "one-time", desc: "Full support — 3 meetings, VIP access, all future materials.", features: ["Everything in Pro", "3x online meeting 1.5h", "Calendar access", "VIP support", "Future courses free"], cta: "Buy Premium", popular: false },
      ],
    },
    community: {
      badge: "Community",
      title: "Join Our Community",
      sub: "We are everywhere you talk about AI. Choose your favorite medium and stay up to date.",
      platforms: [
        { name: "Discord", desc: "Daily talks, Q&A, projects", color: "#5865F2" },
        { name: "Skool", desc: "Premium courses and community", color: "#3b82f6" },
        { name: "Facebook", desc: "News and posts", color: "#1877F2" },
        { name: "TikTok", desc: "Short AI lessons every day", color: "#ff0050" },
        { name: "YouTube", desc: "Free courses and tutorials", color: "#FF0000" },
        { name: "X (Twitter)", desc: "Thoughts and AI news", color: "#e4e4e4" },
      ],
    },
    about: {
      badge: "YLY Founder",
      name: "Patryk Olejnik",
      role: "Founder & AI Strategist",
      bio1: "Hi, I'm Patryk — the creator of the YLY environment. For years I have been fascinated by artificial intelligence and its potential to transform business and everyday life.",
      bio2: "My mission is to make AI accessible to everyone — regardless of technical skill level. I'm building a community where we learn together and create the future together.",
      stats: [
        { val: "3+", label: "Years in AI" },
        { val: "500+", label: "Students" },
        { val: "10K+", label: "Followers" },
      ],
    },
    cta: {
      title: "Ready for change?",
      sub: "Join thousands of people who already use AI every day. Start today.",
      btn: "Join YLY",
    },
    footer: {
      copy: "© 2025 YLY. All rights reserved.",
      by: "Created by Patryk Olejnik",
    },
    training: {
      badge: "Premium Training",
      title: "AI Work Optimization",
      subtitle: "Learn to write effective prompts and maximize your artificial intelligence workflow.",
      stats: [
        { val: "6", label: "Training Modules" },
        { val: "24+", label: "Video Lessons" },
        { val: "50+", label: "Ready Prompts" },
        { val: "∞", label: "Access" },
      ],
      modulesTitle: "Training Modules",
      modulesSubtitle: "Go through all modules to master the art of working with AI",
      startModule: "Start",
      promptLibrary: "Prompt Library",
      promptLibrarySubtitle: "Copy and customize ready-made prompts for your needs",
      copyPrompt: "Copy",
      tryIt: "Try it",
      bestPractices: "Best Practices",
      bestPracticesSubtitle: "Principles that will help you get the most out of AI",
      practices: [
        { title: "Be specific", desc: "The more detailed the prompt, the better the results. Specify context, format and expected outcome." },
        { title: "Use context", desc: "Add background information that will help AI understand the situation and tailor the response." },
        { title: "Iterate and improve", desc: "Don't be afraid to refine prompts. Sometimes a small change significantly improves quality." },
        { title: "Structure responses", desc: "Ask for specific output format - list, table, code - it makes later work easier." },
      ],
      ctaTitle: "Ready for more?",
      ctaSubtitle: "Join our Skool community to get access to even more materials",
      ctaBtn: "Join Skool",
      backToHome: "Back to homepage",
      modules: {
        basics: {
          title: "Prompting Basics",
          desc: "Learning the foundations of writing effective prompts",
          lessons: {
            l1: "What is a prompt and how AI works",
            l2: "Structure of a good prompt",
            l3: "Common mistakes and how to avoid them",
            l4: "Practical exercises",
          },
        },
        advanced: {
          title: "Advanced Prompting",
          desc: "Techniques for professionals",
          lessons: {
            l1: "Chain of Thought prompting",
            l2: "Few-shot learning in practice",
            l3: "Roleplaying and persona",
            l4: "Contextual filtering",
          },
        },
        optimization: {
          title: "Work Optimization",
          desc: "How to speed up and improve AI workflow",
          lessons: {
            l1: "Automating repetitive tasks",
            l2: "Creating prompt templates",
            l3: "Tool integration",
            l4: "Context management",
          },
        },
        workflows: {
          title: "AI Workflows",
          desc: "Building automated processes",
          lessons: {
            l1: "Workflow design",
            l2: "Connecting multiple AIs",
            l3: "Processing pipelines",
            l4: "Testing and optimization",
          },
        },
        business: {
          title: "AI in Business",
          desc: "Commercial AI applications",
          lessons: {
            l1: "Customer service automation",
            l2: "Marketing content generation",
            l3: "Data analysis and reports",
            l4: "Process optimization",
          },
        },
        socialMedia: {
          title: "Social Media & AI",
          desc: "Strategy, content and SM automation with AI",
          lessons: {
            l1: "SM strategy with AI",
            l2: "AI Copywriting and Visual Content",
            l3: "Platforms and algorithms",
            l4: "Analytics and scaling",
          },
        },
        prompts: {
          title: "Prompt Collection",
          desc: "Ready prompts for various applications",
          lessons: {
            l1: "Business prompts",
            l2: "Creative prompts",
            l3: "Technical prompts",
            l4: "Educational prompts",
          },
        },
      },
    },
  },
  uk: {
    nav: {
      mission: "Місія",
      offer: "Пропозиція",
      community: "Спільнота",
      about: "Про мене",
      contact: "Контакт",
    },
    hero: {
      badge: "Середовище розвитку ШІ",
      headline1: "Майбутнє належить",
      headline2: "тим, хто розуміє ШІ",
      sub: "YLY — це спільнота людей, які навчаються, впроваджують і творять за допомогою штучного інтелекту. Приєднуйся до революції.",
      cta1: "Приєднатись",
      cta2: "Переглянути пропозицію",
      stats: {
        s1: "Учасників спільноти",
        s2: "Курсів та матеріалів",
        s3: "Країн",
      },
    },
    mission: {
      badge: "Наша місія",
      title: "Демократизуємо ШІ",
      sub: "Ми віримо, що кожна людина повинна мати доступ до знань про штучний інтелект. Наше середовище створене для навчання, натхнення та інновацій разом з тобою.",
      cards: [
        {
          title: "Навчання ШІ",
          desc: "Практичні курси та воркшопи з ШІ, які змінюють спосіб роботи.",
        },
        {
          title: "Інновації",
          desc: "Ми створюємо рішення майбутнього — від автоматизації до передових мовних моделей.",
        },
        {
          title: "Спільнота",
          desc: "Мережа експертів, ентузіастів та творців ШІ, готових ділитися знаннями.",
        },
      ],
    },
    offer: {
      badge: "Ціни",
      title: "Обери свій пакет",
      sub: "7 повних навчань з ШІ, іспити, сертифікати, асистент PROMPTLY та груповий чат. Почни безкоштовно!",
      tiers: [
        { name: "Basic", price: "199", period: "одноразово", desc: "Повний доступ до всіх 7 навчань з іспитами та сертифікатами.", features: ["7 навчань (84+ уроків)", "Іспити та сертифікати", "200+ промптів", "Асистент PROMPTLY", "Груповий чат", "Оновлення"], cta: "Купити Basic", popular: false },
        { name: "Pro", price: "399", period: "одноразово", desc: "Все з Basic + онлайн-зустріч 1-на-1 з експертом.", features: ["Все з Basic", "1x зустріч 1.5г", "Персоналізований шлях", "Пріоритетна підтримка", "Додаткові матеріали"], cta: "Купити Pro", popular: true },
        { name: "Premium", price: "699", period: "одноразово", desc: "Повна підтримка — 3 зустрічі, VIP доступ.", features: ["Все з Pro", "3x зустріч 1.5г", "Доступ до календаря", "VIP підтримка", "Майбутні курси безкоштовно"], cta: "Купити Premium", popular: false },
      ],
    },
    community: {
      badge: "Спільнота",
      title: "Приєднуйся до нашої спільноти",
      sub: "Ми скрізь, де говорять про ШІ. Вибирай свій улюблений канал і будь в курсі.",
      platforms: [
        { name: "Discord", desc: "Щоденні розмови, Q&A, проєкти", color: "#5865F2" },
        { name: "Skool", desc: "Преміум курси та спільнота", color: "#3b82f6" },
        { name: "Facebook", desc: "Новини та публікації", color: "#1877F2" },
        { name: "TikTok", desc: "Короткі уроки ШІ щодня", color: "#ff0050" },
        { name: "YouTube", desc: "Безкоштовні курси та туторіали", color: "#FF0000" },
        { name: "X (Twitter)", desc: "Думки та новини зі світу ШІ", color: "#e4e4e4" },
      ],
    },
    about: {
      badge: "Засновник YLY",
      name: "Патрик Олєйнік",
      role: "Засновник & ШІ Стратег",
      bio1: "Привіт, я Патрик — творець середовища YLY. Роками я захоплений штучним інтелектом та його потенціалом для трансформації бізнесу і повсякденного життя.",
      bio2: "Моя місія — зробити ШІ доступним для кожного, незалежно від рівня технічних знань. Я будую спільноту, де ми навчаємось разом і разом творимо майбутнє.",
      stats: [
        { val: "3+", label: "Роки в ШІ" },
        { val: "500+", label: "Студентів" },
        { val: "10K+", label: "Підписників" },
      ],
    },
    cta: {
      title: "Готовий до змін?",
      sub: "Приєднуйся до тисяч людей, які вже використовують ШІ щодня. Починай сьогодні.",
      btn: "Приєднатись до YLY",
    },
    footer: {
      copy: "© 2025 YLY. Усі права захищено.",
      by: "Створено Патриком Олєйніком",
    },
    training: {
      badge: "Преміум навчання",
      title: "Оптимізація роботи з ШІ",
      subtitle: "Навчись писати ефективні промпти та максимізувати використання штучного інтелекту в своїй роботі.",
      stats: [
        { val: "6", label: "Навчальних модулів" },
        { val: "24+", label: "Відео уроків" },
        { val: "50+", label: "Готових промптів" },
        { val: "∞", label: "Доступ" },
      ],
      modulesTitle: "Навчальні модулі",
      modulesSubtitle: "Пройди всі модулі щоб опанувати мистецтво роботи з ШІ",
      startModule: "Почати",
      promptLibrary: "Бібліотека промптів",
      promptLibrarySubtitle: "Копіюй та налаштовуй готові промпти під свої потреби",
      copyPrompt: "Копіювати",
      tryIt: "Спробуй",
      bestPractices: "Найкращі практики",
      bestPracticesSubtitle: "Принципи які допоможуть витягнути максимум з ШІ",
      practices: [
        { title: "Будь конкретним", desc: "Що детальніший промпт, тим кращі результати. Вкажи контекст, формат та очікуваний результат." },
        { title: "Використовуй контекст", desc: "Додай фонтову інформацію, яка допоможе ШІ зрозуміти ситуацію та адаптувати відповідь." },
        { title: "Ітеруй та покращуй", desc: "Не бійся удосконалювати промпти. Іноді незначна зміна значно покращує якість." },
        { title: "Структуруй відповіді", desc: "Проси конкретний формат виводу - список, таблиця, код - це полегшує подальшу роботу." },
      ],
      ctaTitle: "Готовий до більшого?",
      ctaSubtitle: "Приєднуйся до нашої спільноти в Skool щоб отримати доступ до ще більше матеріалів",
      ctaBtn: "Приєднатись до Skool",
      backToHome: "Назад на головну",
      modules: {
        basics: {
          title: "Основи промптингу",
          desc: "Вивчення фундаменту написання ефективних промптів",
          lessons: {
            l1: "Що таке промпт і як працює ШІ",
            l2: "Структура хорошого промпту",
            l3: "Найпоширеніші помилки та як їх уникати",
            l4: "Практичні вправи",
          },
        },
        advanced: {
          title: "Просунутий промптинг",
          desc: "Техніки для професіоналів",
          lessons: {
            l1: "Chain of Thought промптинг",
            l2: "Few-shot навчання на практиці",
            l3: "Рольові ігри та персона",
            l4: "Контекстна фільтрація",
          },
        },
        optimization: {
          title: "Оптимізація роботи",
          desc: "Як прискорити та покращити робочий процес з ШІ",
          lessons: {
            l1: "Автоматизація повторюваних завдань",
            l2: "Створення шаблонів промптів",
            l3: "Інтеграція з інструментами",
            l4: "Управління контекстом",
          },
        },
        workflows: {
          title: "AI Workflows",
          desc: "Побудова автоматизованих процесів",
          lessons: {
            l1: "Проектування workflow",
            l2: "З'єднання кількох ШІ",
            l3: "Конвеєри обробки",
            l4: "Тестування та оптимізація",
          },
        },
        business: {
          title: "ШІ в бізнесі",
          desc: "Комерційні застосування ШІ",
          lessons: {
            l1: "Автоматизація обслуговування клієнтів",
            l2: "Створення маркетингового контенту",
            l3: "Аналіз даних та звіти",
            l4: "Оптимізація процесів",
          },
        },
        socialMedia: {
          title: "Social Media & AI",
          desc: "Стратегія, контент та автоматизація SM з ШІ",
          lessons: {
            l1: "Стратегія SM з ШІ",
            l2: "AI Копірайтинг і Візуальний контент",
            l3: "Платформи та алгоритми",
            l4: "Аналітика та масштабування",
          },
        },
        prompts: {
          title: "Колекція промптів",
          desc: "Готові промпти для різних застосувань",
          lessons: {
            l1: "Бізнес промпти",
            l2: "Креативні промпти",
            l3: "Технічні промпти",
            l4: "Освітні промпти",
          },
        },
      },
    },
  },
  es: {
    nav: {
      mission: "Misión",
      offer: "Oferta",
      community: "Comunidad",
      about: "Sobre mí",
      contact: "Contacto",
    },
    hero: {
      badge: "Entorno de Desarrollo IA",
      headline1: "El futuro pertenece a",
      headline2: "quienes entienden la IA",
      sub: "YLY es una comunidad de personas que aprenden, implementan y crean con la ayuda de la inteligencia artificial. Únete a la revolución.",
      cta1: "Únete Ahora",
      cta2: "Ver Oferta",
      stats: {
        s1: "Miembros de la Comunidad",
        s2: "Cursos y Materiales",
        s3: "Países",
      },
    },
    mission: {
      badge: "Nuestra Misión",
      title: "Democratizamos la IA",
      sub: "Creemos que todos deben tener acceso al conocimiento sobre inteligencia artificial. Nuestro entorno fue creado para formar, inspirar y crear innovaciones contigo.",
      cards: [
        {
          title: "Formación IA",
          desc: "Cursos y talleres prácticos de IA que transforman tu forma de trabajar.",
        },
        {
          title: "Innovación",
          desc: "Creamos soluciones del futuro — desde automatización hasta modelos de lenguaje avanzados.",
        },
        {
          title: "Comunidad",
          desc: "Una red de expertos, entusiastas y creadores de IA dispuestos a compartir conocimiento.",
        },
      ],
    },
    offer: {
      badge: "Precios",
      title: "Elige tu Plan",
      sub: "7 formaciones completas de IA, exámenes, certificados, asistente PROMPTLY y chat grupal. ¡Empieza gratis!",
      tiers: [
        { name: "Basic", price: "199", period: "único", desc: "Acceso completo a las 7 formaciones con exámenes y certificados.", features: ["7 formaciones (84+ lecciones)", "Exámenes y certificados", "200+ prompts", "Asistente PROMPTLY", "Chat grupal", "Actualizaciones"], cta: "Comprar Basic", popular: false },
        { name: "Pro", price: "399", period: "único", desc: "Todo de Basic + reunión online 1-a-1 con experto.", features: ["Todo de Basic", "1x reunión 1.5h", "Ruta personalizada", "Soporte prioritario", "Materiales extra"], cta: "Comprar Pro", popular: true },
        { name: "Premium", price: "699", period: "único", desc: "Soporte completo — 3 reuniones, acceso VIP.", features: ["Todo de Pro", "3x reunión 1.5h", "Acceso al calendario", "Soporte VIP", "Cursos futuros gratis"], cta: "Comprar Premium", popular: false },
      ],
    },
    community: {
      badge: "Comunidad",
      title: "Únete a Nuestra Comunidad",
      sub: "Estamos en todos los lugares donde se habla de IA. Elige tu medio favorito y mantente al día.",
      platforms: [
        { name: "Discord", desc: "Conversaciones diarias, Q&A, proyectos", color: "#5865F2" },
        { name: "Skool", desc: "Cursos premium y comunidad", color: "#3b82f6" },
        { name: "Facebook", desc: "Noticias y publicaciones", color: "#1877F2" },
        { name: "TikTok", desc: "Lecciones cortas de IA cada día", color: "#ff0050" },
        { name: "YouTube", desc: "Cursos y tutoriales gratuitos", color: "#FF0000" },
        { name: "X (Twitter)", desc: "Pensamientos y noticias de IA", color: "#e4e4e4" },
      ],
    },
    about: {
      badge: "Fundador de YLY",
      name: "Patryk Olejnik",
      role: "Fundador & Estratega de IA",
      bio1: "Hola, soy Patryk — el creador del entorno YLY. Durante años me ha fascinado la inteligencia artificial y su potencial para transformar los negocios y la vida cotidiana.",
      bio2: "Mi misión es hacer que la IA sea accesible para todos, independientemente del nivel técnico. Estoy construyendo una comunidad donde aprendemos juntos y creamos el futuro juntos.",
      stats: [
        { val: "3+", label: "Años en IA" },
        { val: "500+", label: "Estudiantes" },
        { val: "10K+", label: "Seguidores" },
      ],
    },
    cta: {
      title: "¿Listo para el cambio?",
      sub: "Únete a miles de personas que ya usan IA cada día. Empieza hoy.",
      btn: "Únete a YLY",
    },
    footer: {
      copy: "© 2025 YLY. Todos los derechos reservados.",
      by: "Creado por Patryk Olejnik",
    },
    training: {
      badge: "Entrenamiento Premium",
      title: "Optimización del trabajo con IA",
      subtitle: "Aprende a escribir prompts efectivos y maximizar el uso de la inteligencia artificial en tu trabajo.",
      stats: [
        { val: "6", label: "Módulos de entrenamiento" },
        { val: "24+", label: "Lecciones en video" },
        { val: "50+", label: "Prompts listos" },
        { val: "∞", label: "Acceso" },
      ],
      modulesTitle: "Módulos de entrenamiento",
      modulesSubtitle: "Pasa por todos los módulos para dominar el arte de trabajar con IA",
      startModule: "Iniciar",
      promptLibrary: "Biblioteca de Prompts",
      promptLibrarySubtitle: "Copia y personaliza prompts listos para tus necesidades",
      copyPrompt: "Copiar",
      tryIt: "Pruébalo",
      bestPractices: "Mejores prácticas",
      bestPracticesSubtitle: "Principios que te ayudará a sacarle el máximo a la IA",
      practices: [
        { title: "Sé específico", desc: "Cuanto más detallado el prompt, mejores resultados. Especifica contexto, formato y resultado esperado." },
        { title: "Usa contexto", desc: "Añade información de fondo que ayude a la IA a entender la situación y adaptar la respuesta." },
        { title: "Itera y mejora", desc: "No temas refinar los prompts. A veces un pequeño cambio mejora significativamente la calidad." },
        { title: "Estructura las respuestas", desc: "Pide un formato de salida específico - lista, tabla, código - facilita el trabajo posterior." },
      ],
      ctaTitle: "¿Listo para más?",
      ctaSubtitle: "Únete a nuestra comunidad en Skool para obtener acceso a más materiales",
      ctaBtn: "Unirse a Skool",
      backToHome: "Volver al inicio",
      modules: {
        basics: {
          title: "Fundamentos de Prompting",
          desc: "Aprende los fundamentos de escribir prompts efectivos",
          lessons: {
            l1: "Qué es un prompt y cómo funciona la IA",
            l2: "Estructura de un buen prompt",
            l3: "Errores comunes y cómo evitarlos",
            l4: "Ejercicios prácticos",
          },
        },
        advanced: {
          title: "Prompting Avanzado",
          desc: "Técnicas para profesionales",
          lessons: {
            l1: "Chain of Thought prompting",
            l2: "Few-shot learning en la práctica",
            l3: "Roleplaying y persona",
            l4: "Filtrado contextual",
          },
        },
        optimization: {
          title: "Optimización del Trabajo",
          desc: "Cómo acelerar y mejorar el flujo de trabajo con IA",
          lessons: {
            l1: "Automatización de tareas repetitivas",
            l2: "Creación de plantillas de prompts",
            l3: "Integración con herramientas",
            l4: "Gestión del contexto",
          },
        },
        workflows: {
          title: "AI Workflows",
          desc: "Construcción de procesos automatizados",
          lessons: {
            l1: "Diseño de workflows",
            l2: "Conexión de múltiples IAs",
            l3: "Pipelines de procesamiento",
            l4: "Pruebas y optimización",
          },
        },
        business: {
          title: "IA en Negocios",
          desc: "Aplicaciones comerciales de IA",
          lessons: {
            l1: "Automatización de atención al cliente",
            l2: "Generación de contenido de marketing",
            l3: "Análisis de datos e informes",
            l4: "Optimización de procesos",
          },
        },
        socialMedia: {
          title: "Social Media & AI",
          desc: "Estrategia, contenido y automatización SM con IA",
          lessons: {
            l1: "Estrategia SM con IA",
            l2: "AI Copywriting y Contenido Visual",
            l3: "Plataformas y algoritmos",
            l4: "Analítica y escalado",
          },
        },
        prompts: {
          title: "Colección de Prompts",
          desc: "Prompts listos para varias aplicaciones",
          lessons: {
            l1: "Prompts de negocios",
            l2: "Prompts creativos",
            l3: "Prompts técnicos",
            l4: "Prompts educativos",
          },
        },
      },
    },
  },
};

type TranslationType = typeof translations.pl;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TranslationType;
}

const LangContext = createContext<LangContextType>({
  lang: "pl",
  setLang: () => {},
  t: translations.pl,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pl");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
