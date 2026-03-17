"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import GroupChat from "../components/GroupChat";
import { 
  Brain, 
  MessageSquare, 
  Zap, 
  Target, 
  BookOpen, 
  ChevronRight,
  CheckCircle,
  Copy,
  Sparkles,
  Wand2,
  Workflow,
  Lightbulb,
  ArrowRight,
  Share2,
} from "lucide-react";
import { useLang } from "../context/LanguageContext";

const icons = [MessageSquare, Wand2, Zap, Workflow, Target, Share2, BookOpen];

export default function TrainingPage() {
  const { t } = useLang();
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-100px" });
  const [showOnboardingBanner, setShowOnboardingBanner] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("yly_onboarding_dismissed")) return;
    fetch("/api/user/industry")
      .then((r) => r.json())
      .then((d) => { if (!d.industry) setShowOnboardingBanner(true); })
      .catch(() => {});
  }, []);

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const trainingModules = [
    {
      id: "prompt-basics",
      title: t.training.modules.basics.title,
      desc: t.training.modules.basics.desc,
      lessons: [
        t.training.modules.basics.lessons.l1,
        t.training.modules.basics.lessons.l2,
        t.training.modules.basics.lessons.l3,
        t.training.modules.basics.lessons.l4,
      ],
    },
    {
      id: "prompt-advanced",
      title: t.training.modules.advanced.title,
      desc: t.training.modules.advanced.desc,
      lessons: [
        t.training.modules.advanced.lessons.l1,
        t.training.modules.advanced.lessons.l2,
        t.training.modules.advanced.lessons.l3,
        t.training.modules.advanced.lessons.l4,
      ],
    },
    {
      id: "ai-optimization",
      title: t.training.modules.optimization.title,
      desc: t.training.modules.optimization.desc,
      lessons: [
        t.training.modules.optimization.lessons.l1,
        t.training.modules.optimization.lessons.l2,
        t.training.modules.optimization.lessons.l3,
        t.training.modules.optimization.lessons.l4,
      ],
    },
    {
      id: "workflows",
      title: t.training.modules.workflows.title,
      desc: t.training.modules.workflows.desc,
      lessons: [
        t.training.modules.workflows.lessons.l1,
        t.training.modules.workflows.lessons.l2,
        t.training.modules.workflows.lessons.l3,
        t.training.modules.workflows.lessons.l4,
      ],
    },
    {
      id: "business",
      title: t.training.modules.business.title,
      desc: t.training.modules.business.desc,
      lessons: [
        t.training.modules.business.lessons.l1,
        t.training.modules.business.lessons.l2,
        t.training.modules.business.lessons.l3,
        t.training.modules.business.lessons.l4,
      ],
    },
    {
      id: "social-media",
      title: t.training.modules.socialMedia.title,
      desc: t.training.modules.socialMedia.desc,
      lessons: [
        t.training.modules.socialMedia.lessons.l1,
        t.training.modules.socialMedia.lessons.l2,
        t.training.modules.socialMedia.lessons.l3,
        t.training.modules.socialMedia.lessons.l4,
      ],
    },
    {
      id: "prompts-collection",
      title: t.training.modules.prompts.title,
      desc: t.training.modules.prompts.desc,
      lessons: [
        t.training.modules.prompts.lessons.l1,
        t.training.modules.prompts.lessons.l2,
        t.training.modules.prompts.lessons.l3,
        t.training.modules.prompts.lessons.l4,
      ],
    },
  ];

  const promptExamples = [
    {
      title: "Analiza biznesowa",
      prompt: `Przeanalizuj poniższy scenariusz biznesowy i zaproponuj 3 strategie rozwoju:

[OPIS TWOJEGO BIZNESU]

Dla każdej strategii podaj:
1. Szacowany czas wdrożenia
2. Wymagane zasoby
3. Potencjalny zwrot z inwestycji
4. Główne ryzyka i sposoby ich minimalizacji`,
      category: "business",
    },
    {
      title: "Kodowanie",
      prompt: `Napisz funkcję w [JĘZYK PROGRAMOWANIA], która:

1. [OPIS FUNKCJONALNOŚCI]
2. Obsługuje błędy i wyjątki
3. Jest zgodna z najlepszymi praktykami
4. Zawiera dokumentację

Dodaj przykłady użycia i testy jednostkowe.`,
      category: "code",
    },
    {
      title: "Kreatywna treść",
      prompt: `Napisz [TYP TREŚCI] na temat [TEMAT].

Wymagania:
- Ton: [TON]
- Długość: [DŁUGOŚĆ]
- Grupa docelowa: [GRUPA]
- Główny przekaz: [PRZEKAZ]

Struktura:
1. Hook (przyciągający uwagę)
2. Rozwinięcie z argumentami
3. Call to action

Styl: [STYL]`,
      category: "content",
    },
  ];

  const dismissOnboarding = () => {
    localStorage.setItem("yly_onboarding_dismissed", "1");
    setShowOnboardingBanner(false);
  };

  return (
    <main className="min-h-screen bg-[#080808]">
      {showOnboardingBanner && (
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-blue-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-300">
              <span className="font-bold text-white">Spersonalizuj szkolenie!</span>{" "}
              Wybierz swoją branżę, aby treści i prompty były dopasowane do Ciebie.
            </p>
            <div className="flex items-center gap-2">
              <Link href="/szkolenie/onboarding" className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
                Wybierz branżę
              </Link>
              <button onClick={dismissOnboarding} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 text-sm transition-colors">
                Później
              </button>
            </div>
          </div>
        </div>
      )}
      <header className="relative py-20 border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <Sparkles size={14} />
              {t.training.badge}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              {t.training.title}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              {t.training.subtitle}
            </p>
          </motion.div>
        </div>
      </header>

      <section className="py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.training.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-white mb-1">{stat.val}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-2">{t.training.modulesTitle}</h2>
            <p className="text-gray-400">{t.training.modulesSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {trainingModules.map((module, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-6 rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-blue-500/30 transition-all"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/50 transition-all" />
                  
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-blue-400" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{module.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{module.desc}</p>
                  
                  <ul className="space-y-2 mb-4">
                    {module.lessons.map((lesson, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle size={14} className="text-green-500" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                  
                  {module.id === "prompt-basics" ? (
                    <Link
                      href="/szkolenie/podstawy-promptingu"
                      className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                    >
                      {t.training.startModule}
                      <ArrowRight size={14} />
                    </Link>
                  ) : module.id === "prompt-advanced" ? (
                    <Link
                      href="/szkolenie/zaawansowany-prompting"
                      className="inline-flex items-center gap-2 text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors"
                    >
                      {t.training.startModule}
                      <ArrowRight size={14} />
                    </Link>
                  ) : module.id === "workflows" ? (
                    <Link
                      href="/szkolenie/ai-workflows"
                      className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                    >
                      {t.training.startModule}
                      <ArrowRight size={14} />
                    </Link>
                  ) : module.id === "social-media" ? (
                    <Link
                      href="/szkolenie/social-media"
                      className="inline-flex items-center gap-2 text-pink-400 text-sm font-medium hover:text-pink-300 transition-colors"
                    >
                      {t.training.startModule}
                      <ArrowRight size={14} />
                    </Link>
                  ) : module.id === "business" ? (
                    <Link
                      href="/szkolenie/ai-w-biznesie"
                      className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors"
                    >
                      {t.training.startModule}
                      <ArrowRight size={14} />
                    </Link>
                  ) : module.id === "ai-optimization" ? (
                    <Link
                      href="/szkolenie/optymalizacja-pracy"
                      className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors"
                    >
                      {t.training.startModule}
                      <ArrowRight size={14} />
                    </Link>
                  ) : module.id === "prompts-collection" ? (
                    <Link
                      href="/szkolenie/kolekcja-promptow"
                      className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors"
                    >
                      {t.training.startModule}
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <button className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                      {t.training.startModule}
                      <ArrowRight size={14} />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROMPTLY Banner */}
      <section className="py-16 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/szkolenie/promptly" className="block group">
              <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/20 via-[#0f0f0f] to-pink-900/20 p-8 sm:p-10 hover:border-purple-500/40 transition-all">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl sm:text-3xl font-black text-white">PROMPTLY</h2>
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold">BETA</span>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                      Wbudowany asystent inżynierii promptów. Ulepszaj, twórz i analizuj prompty z AI — dostosowane do Twojej branży.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 group-hover:bg-purple-500 text-white font-bold transition-all">
                    Otwórz
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb size={24} className="text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">{t.training.promptLibrary}</h2>
            </div>
            <p className="text-gray-400">{t.training.promptLibrarySubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promptExamples.map((example, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-6 rounded-2xl bg-[#0f0f0f] border border-white/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{example.title}</h3>
                  <button
                    onClick={() => copyPrompt(example.prompt)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                    title={t.training.copyPrompt}
                  >
                    <Copy size={16} />
                  </button>
                </div>
                
                <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                    {example.prompt}
                  </pre>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {example.category}
                  </span>
                  <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                    {t.training.tryIt}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Brain size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold text-white">{t.training.bestPractices}</h2>
            </div>
            <p className="text-gray-400">{t.training.bestPracticesSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.training.practices.map((practice, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl bg-[#0f0f0f] border border-white/5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                  <span className="text-purple-400 font-bold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{practice.title}</h3>
                  <p className="text-gray-400 text-sm">{practice.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-black text-white mb-4">{t.training.ctaTitle}</h2>
            <p className="text-gray-400 mb-8">{t.training.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                {t.training.ctaBtn}
                <ChevronRight size={18} />
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/5 transition-all"
              >
                {t.training.backToHome}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Group Chat */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <GroupChat />
      </section>
    </main>
  );
}
