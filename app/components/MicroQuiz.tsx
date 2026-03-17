"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Brain, ChevronRight, Sparkles } from "lucide-react";

export interface MicroQuizQuestion {
  question: string;
  options: string[];
  correct: number;
  hint: string;
}

export interface MicroQuizData {
  afterLesson: number;
  title: string;
  questions: MicroQuizQuestion[];
}

interface MicroQuizProps {
  quiz: MicroQuizData;
  onComplete: () => void;
  accentColor?: string;
}

export default function MicroQuiz({ quiz, onComplete, accentColor = "blue" }: MicroQuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const q = quiz.questions[current];
  const isCorrect = selected === q.correct;
  const isLast = current === quiz.questions.length - 1;
  const allDone = current >= quiz.questions.length;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.correct) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (isLast) {
      setCurrent(quiz.questions.length);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  if (allDone) {
    const perfect = correctCount === quiz.questions.length;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="my-12 p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] text-center"
      >
        <Sparkles size={40} className={`mx-auto mb-4 ${perfect ? "text-yellow-400" : "text-blue-400"}`} />
        <h3 className="text-2xl font-black text-white mb-2">
          {perfect ? "Perfekcyjnie!" : correctCount >= Math.ceil(quiz.questions.length * 0.5) ? "Dobra robota!" : "Warto powtórzyć!"}
        </h3>
        <p className="text-gray-400 mb-6">
          {correctCount}/{quiz.questions.length} poprawnych odpowiedzi
        </p>
        <button
          onClick={onComplete}
          className={`px-8 py-3.5 rounded-xl bg-${accentColor}-600 hover:bg-${accentColor}-500 text-white font-bold transition-all`}
        >
          Kontynuuj naukę
          <ChevronRight size={16} className="inline ml-2" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-12 rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden"
    >
      <div className={`px-6 py-4 bg-${accentColor}-600/10 border-b border-white/5 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Brain size={18} className={`text-${accentColor}-400`} />
          <span className="text-sm font-bold text-white">{quiz.title}</span>
        </div>
        <span className="text-xs text-gray-500">{current + 1}/{quiz.questions.length}</span>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h4 className="text-lg font-semibold text-white mb-5">{q.question}</h4>

            <div className="space-y-2.5">
              {q.options.map((opt, oi) => {
                let cls = "bg-[#111] border-white/5 text-gray-300 hover:border-white/15";
                if (showResult && oi === q.correct) cls = "bg-green-950/20 border-green-500/30 text-green-300";
                else if (showResult && oi === selected && !isCorrect) cls = "bg-red-950/20 border-red-500/30 text-red-300";
                else if (selected === oi && !showResult) cls = `bg-${accentColor}-600/20 border-${accentColor}-500/50 text-white`;

                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(oi)}
                    disabled={showResult}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${cls}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">
                        {showResult && oi === q.correct ? <CheckCircle size={14} className="text-green-400" /> : showResult && oi === selected ? <XCircle size={14} className="text-red-400" /> : String.fromCharCode(65 + oi)}
                      </span>
                      <span className="text-sm leading-relaxed">{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <div className={`p-3 rounded-lg text-sm ${isCorrect ? "bg-green-950/20 border border-green-500/20 text-green-300" : "bg-yellow-950/20 border border-yellow-500/20 text-yellow-300"}`}>
                  {isCorrect ? "Dobrze!" : "Nie tym razem."} {q.hint}
                </div>
                <button
                  onClick={handleNext}
                  className={`mt-4 px-6 py-2.5 rounded-xl bg-${accentColor}-600 hover:bg-${accentColor}-500 text-white text-sm font-bold transition-all`}
                >
                  {isLast ? "Zobacz wynik" : "Następne pytanie"}
                  <ChevronRight size={14} className="inline ml-1" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-4 flex gap-1">
        {quiz.questions.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < current ? "bg-green-500" : i === current ? `bg-${accentColor}-500` : "bg-white/10"}`} />
        ))}
      </div>
    </motion.div>
  );
}
