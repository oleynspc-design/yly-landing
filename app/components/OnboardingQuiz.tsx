"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  ShoppingCart,
  Heart,
  GraduationCap,
  Building2,
  Utensils,
  Scale,
  Wrench,
  Palette,
  TrendingUp,
  Globe,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  Search,
  Target,
  Brain,
  Zap,
  CheckCircle,
} from "lucide-react";

/* ── Step 1: Industries ── */
const industries = [
  { id: "marketing", label: "Marketing & Reklama", icon: TrendingUp, color: "blue" },
  { id: "ecommerce", label: "E-commerce & Sprzedaż", icon: ShoppingCart, color: "green" },
  { id: "it", label: "IT & Technologia", icon: Globe, color: "purple" },
  { id: "finanse", label: "Finanse & Bankowość", icon: Briefcase, color: "yellow" },
  { id: "edukacja", label: "Edukacja & Szkolenia", icon: GraduationCap, color: "indigo" },
  { id: "zdrowie", label: "Zdrowie & Medycyna", icon: Heart, color: "red" },
  { id: "nieruchomosci", label: "Nieruchomości", icon: Building2, color: "orange" },
  { id: "gastronomia", label: "Gastronomia & HoReCa", icon: Utensils, color: "pink" },
  { id: "prawo", label: "Prawo & Doradztwo", icon: Scale, color: "slate" },
  { id: "produkcja", label: "Produkcja & Logistyka", icon: Wrench, color: "emerald" },
  { id: "kreacja", label: "Kreacja & Design", icon: Palette, color: "fuchsia" },
  { id: "social-media", label: "Social Media & Content", icon: Sparkles, color: "cyan" },
];

const colorMap: Record<string, { bg: string; border: string; text: string; activeBg: string; activeBorder: string }> = {
  blue: { bg: "bg-blue-500/5", border: "border-blue-500/10", text: "text-blue-400", activeBg: "bg-blue-500/20", activeBorder: "border-blue-500/50" },
  green: { bg: "bg-green-500/5", border: "border-green-500/10", text: "text-green-400", activeBg: "bg-green-500/20", activeBorder: "border-green-500/50" },
  purple: { bg: "bg-purple-500/5", border: "border-purple-500/10", text: "text-purple-400", activeBg: "bg-purple-500/20", activeBorder: "border-purple-500/50" },
  yellow: { bg: "bg-yellow-500/5", border: "border-yellow-500/10", text: "text-yellow-400", activeBg: "bg-yellow-500/20", activeBorder: "border-yellow-500/50" },
  indigo: { bg: "bg-indigo-500/5", border: "border-indigo-500/10", text: "text-indigo-400", activeBg: "bg-indigo-500/20", activeBorder: "border-indigo-500/50" },
  red: { bg: "bg-red-500/5", border: "border-red-500/10", text: "text-red-400", activeBg: "bg-red-500/20", activeBorder: "border-red-500/50" },
  orange: { bg: "bg-orange-500/5", border: "border-orange-500/10", text: "text-orange-400", activeBg: "bg-orange-500/20", activeBorder: "border-orange-500/50" },
  pink: { bg: "bg-pink-500/5", border: "border-pink-500/10", text: "text-pink-400", activeBg: "bg-pink-500/20", activeBorder: "border-pink-500/50" },
  slate: { bg: "bg-slate-500/5", border: "border-slate-500/10", text: "text-slate-400", activeBg: "bg-slate-500/20", activeBorder: "border-slate-500/50" },
  emerald: { bg: "bg-emerald-500/5", border: "border-emerald-500/10", text: "text-emerald-400", activeBg: "bg-emerald-500/20", activeBorder: "border-emerald-500/50" },
  fuchsia: { bg: "bg-fuchsia-500/5", border: "border-fuchsia-500/10", text: "text-fuchsia-400", activeBg: "bg-fuchsia-500/20", activeBorder: "border-fuchsia-500/50" },
  cyan: { bg: "bg-cyan-500/5", border: "border-cyan-500/10", text: "text-cyan-400", activeBg: "bg-cyan-500/20", activeBorder: "border-cyan-500/50" },
};

/* ── Step 2: Experience levels ── */
const experienceLevels = [
  { id: "beginner", label: "Początkujący", desc: "Dopiero zaczynam przygodę z AI", icon: "🌱" },
  { id: "basic", label: "Podstawowy", desc: "Używam ChatGPT do prostych zadań", icon: "📝" },
  { id: "intermediate", label: "Średniozaawansowany", desc: "Znam techniki promptów, używam kilku narzędzi AI", icon: "⚡" },
  { id: "advanced", label: "Zaawansowany", desc: "Buduję automatyzacje, integruję API, optymalizuję procesy z AI", icon: "🚀" },
];

/* ── Step 3: Goals (multi-select) ── */
const goalOptions = [
  { id: "automate", label: "Automatyzacja powtarzalnych zadań", icon: Zap },
  { id: "content", label: "Tworzenie treści (posty, artykuły, newslettery)", icon: Palette },
  { id: "marketing", label: "Lepszy marketing i sprzedaż", icon: TrendingUp },
  { id: "productivity", label: "Zwiększenie produktywności codziennej pracy", icon: Target },
  { id: "data", label: "Analiza danych i raportowanie", icon: Brain },
  { id: "customer", label: "Lepsza obsługa klientów", icon: Heart },
  { id: "learning", label: "Nauka i rozwój osobisty w AI", icon: GraduationCap },
  { id: "business", label: "Skalowanie biznesu z AI", icon: Briefcase },
];

const TOTAL_STEPS = 4;

interface OnboardingQuizProps {
  redirectTo?: string;
}

export default function OnboardingQuiz({ redirectTo = "/dashboard" }: OnboardingQuizProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [search, setSearch] = useState("");

  // Answers
  const [industry, setIndustry] = useState<string | null>(null);
  const [customIndustry, setCustomIndustry] = useState("");
  const [experience, setExperience] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [expectations, setExpectations] = useState("");
  const [challenge, setChallenge] = useState("");

  const filtered = search.trim()
    ? industries.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
    : industries;

  const canNext = () => {
    if (step === 0) return !!industry && (industry !== "custom" || customIndustry.trim().length > 1);
    if (step === 1) return !!experience;
    if (step === 2) return goals.length > 0;
    if (step === 3) return true;
    return false;
  };

  const toggleGoal = (id: string) => {
    setGoals((prev) => prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]);
  };

  const handleSubmit = async () => {
    setSaving(true);
    const finalIndustry = industry === "custom" ? customIndustry.trim() : industry;

    const answers = {
      industry: finalIndustry,
      experience,
      goals,
      expectations: expectations.trim() || null,
      challenge: challenge.trim() || null,
    };

    try {
      await fetch("/api/user/industry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry: finalIndustry }),
      });

      await fetch("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, industry: finalIndustry }),
      });

      localStorage.removeItem("yly_onboarding_dismissed");
      setDone(true);

      setTimeout(() => {
        router.push(redirectTo);
        router.refresh();
      }, 2500);
    } catch {
      setSaving(false);
    }
  };

  if (done) {
    return (
      <div className="flex items-center justify-center px-4 py-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-green-400" />
          </motion.div>
          <h1 className="text-3xl font-black text-white mb-3">Gotowe!</h1>
          <p className="text-gray-400 text-lg">AI przygotowuje Twój spersonalizowany program...</p>
          <Loader2 size={24} className="animate-spin text-blue-400 mx-auto mt-6" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-12">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/5">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: i <= step ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ))}
        <span className="text-xs text-gray-500 ml-2">{step + 1}/{TOTAL_STEPS}</span>
      </div>

      <AnimatePresence mode="wait">
        {/* ── STEP 0: Industry ── */}
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-5">
                <Briefcase size={28} className="text-blue-400" />
              </div>
              <h1 className="text-3xl font-black text-white mb-2">W jakiej branży działasz?</h1>
              <p className="text-gray-400 max-w-xl mx-auto">Dostosujemy treści i prompty do Twojego codziennego kontekstu.</p>
            </div>

            <div className="relative mb-5">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj branży..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 text-sm" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {filtered.map((ind) => {
                const Icon = ind.icon;
                const c = colorMap[ind.color] || colorMap.blue;
                const isActive = industry === ind.id;
                return (
                  <button key={ind.id} onClick={() => { setIndustry(ind.id); setCustomIndustry(""); }} className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${isActive ? `${c.activeBg} ${c.activeBorder}` : `${c.bg} ${c.border}`}`}>
                    <Icon size={18} className={c.text} />
                    <span className={`text-sm font-medium ${isActive ? "text-white" : "text-gray-300"}`}>{ind.label}</span>
                  </button>
                );
              })}
            </div>

            <button onClick={() => setIndustry("custom")} className={`w-full text-left p-3.5 rounded-xl border transition-all mb-2 ${industry === "custom" ? "bg-white/10 border-white/30" : "bg-white/[0.02] border-white/5"}`}>
              <span className="text-sm font-medium text-gray-300">Inna branża? Wpisz własną:</span>
            </button>
            {industry === "custom" && (
              <input type="text" value={customIndustry} onChange={(e) => setCustomIndustry(e.target.value)} placeholder="np. Fotografia, Fitness, Architektura..." className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 text-sm mt-2" autoFocus />
            )}
          </motion.div>
        )}

        {/* ── STEP 1: Experience ── */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-5">
                <Brain size={28} className="text-purple-400" />
              </div>
              <h1 className="text-3xl font-black text-white mb-2">Jaki jest Twój poziom?</h1>
              <p className="text-gray-400 max-w-xl mx-auto">Dopasujemy trudność i tempo szkolenia do Twojego doświadczenia.</p>
            </div>

            <div className="space-y-3">
              {experienceLevels.map((lvl) => (
                <button key={lvl.id} onClick={() => setExperience(lvl.id)} className={`w-full flex items-center gap-4 p-5 rounded-xl border transition-all text-left ${experience === lvl.id ? "bg-purple-500/15 border-purple-500/40" : "bg-white/[0.02] border-white/5 hover:border-white/15"}`}>
                  <span className="text-2xl">{lvl.icon}</span>
                  <div>
                    <div className={`font-bold ${experience === lvl.id ? "text-white" : "text-gray-200"}`}>{lvl.label}</div>
                    <div className="text-sm text-gray-500">{lvl.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Goals ── */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-green-600/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                <Target size={28} className="text-green-400" />
              </div>
              <h1 className="text-3xl font-black text-white mb-2">Co chcesz osiągnąć?</h1>
              <p className="text-gray-400 max-w-xl mx-auto">Wybierz cele, które są dla Ciebie najważniejsze (możesz zaznaczyć kilka).</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goalOptions.map((g) => {
                const Icon = g.icon;
                const isSelected = goals.includes(g.id);
                return (
                  <button key={g.id} onClick={() => toggleGoal(g.id)} className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${isSelected ? "bg-green-500/15 border-green-500/40" : "bg-white/[0.02] border-white/5 hover:border-white/15"}`}>
                    <Icon size={18} className={isSelected ? "text-green-400" : "text-gray-500"} />
                    <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-300"}`}>{g.label}</span>
                    {isSelected && <CheckCircle size={16} className="text-green-400 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Free text ── */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-yellow-600/20 border border-yellow-500/30 flex items-center justify-center mx-auto mb-5">
                <Sparkles size={28} className="text-yellow-400" />
              </div>
              <h1 className="text-3xl font-black text-white mb-2">Opowiedz więcej</h1>
              <p className="text-gray-400 max-w-xl mx-auto">Te odpowiedzi pomogą nam lepiej dostosować Twój program (opcjonalne).</p>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="expectations" className="block text-sm font-medium text-gray-300 mb-2">
                  Co chciałbyś/chciałabyś osiągnąć po ukończeniu szkolenia?
                </label>
                <textarea
                  id="expectations"
                  value={expectations}
                  onChange={(e) => setExpectations(e.target.value)}
                  placeholder="np. Chcę automatyzować tworzenie ofert dla klientów, pisać posty z AI, analizować dane sprzedażowe..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-yellow-500/50 text-sm resize-none"
                />
              </div>
              <div>
                <label htmlFor="challenge" className="block text-sm font-medium text-gray-300 mb-2">
                  Jaki jest Twój największy problem/wyzwanie w pracy, które AI mogłoby rozwiązać?
                </label>
                <textarea
                  id="challenge"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="np. Tracę dużo czasu na tworzenie treści marketingowych, nie wiem jak analizować dane klientów..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder:text-gray-600 outline-none focus:border-yellow-500/50 text-sm resize-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center gap-3 mt-8">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-all">
            <ArrowLeft size={16} />
            Wstecz
          </button>
        )}
        <button
          onClick={step < TOTAL_STEPS - 1 ? () => setStep((s) => s + 1) : handleSubmit}
          disabled={!canNext() || saving}
          className="flex-1 flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold transition-all hover:shadow-lg hover:shadow-blue-500/25"
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              AI analizuje Twoje odpowiedzi...
            </>
          ) : step < TOTAL_STEPS - 1 ? (
            <>
              Dalej
              <ArrowRight size={18} />
            </>
          ) : (
            <>
              Zakończ i stwórz program
              <Sparkles size={18} />
            </>
          )}
        </button>
      </div>

      {step === 0 && (
        <p className="text-center text-xs text-gray-600 mt-4">
          Możesz zmienić branżę w każdej chwili w ustawieniach profilu.
        </p>
      )}
    </div>
  );
}
