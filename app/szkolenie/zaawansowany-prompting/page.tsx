"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Brain,
  ArrowLeft,
  Trophy,
  XCircle,
  Sparkles,
  Terminal,
  Cpu,
  Zap,
  Target,
  Copy,
  GraduationCap,
  Layers,
  ClipboardList,
  BookOpen,
} from "lucide-react";
import { lessons, semesters } from "./lessons";
import type { ContentBlock } from "./lessons";
import { quizQuestions } from "./quiz";
import { homeworkTasks } from "./homework";
import { useAccess, isLessonLocked, LessonLockOverlay } from "@/app/components/DemoGate";

const iconMap: Record<string, typeof Brain> = { Brain, AlertCircle, Sparkles };

const difficultyColors = {
  easy: "text-green-400 bg-green-500/10 border-green-500/20",
  medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  hard: "text-red-400 bg-red-500/10 border-red-500/20",
};
const difficultyLabels = { easy: "Łatwe", medium: "Średnie", hard: "Trudne" };

export default function ZaawansowanyPromptingPage() {
  const [view, setView] = useState<"syllabus" | "lesson" | "quiz" | "homework">("syllabus");
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPage, setQuizPage] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showLock, setShowLock] = useState(false);
  const { hasFullAccess } = useAccess();

  const QUIZ_PER_PAGE = 10;
  const totalQuizPages = Math.ceil(quizQuestions.length / QUIZ_PER_PAGE);
  const progress = view === "lesson" ? ((currentLesson + 1) / lessons.length) * 100 : 0;
  const PASS_SCORE = Math.ceil(quizQuestions.length * 0.8);

  const startLesson = (index: number) => {
    if (isLessonLocked(index, hasFullAccess)) { setShowLock(true); return; }
    setCurrentLesson(index);
    setView("lesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCompletedLessons([...new Set([...completedLessons, currentLesson])]);
      setView("quiz");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAnswer = (qi: number, ai: number) => {
    const a = [...quizAnswers];
    a[qi] = ai;
    setQuizAnswers(a);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calculateScore = () => {
    let c = 0;
    quizQuestions.forEach((q, i) => { if (quizAnswers[i] === q.correct) c++; });
    return c;
  };

  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "text":
        return (
          <p key={index} className="text-gray-300 leading-relaxed text-lg mb-6">
            {(block.text || "").split("**").map((part: string, i: number) =>
              i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
            )}
          </p>
        );
      case "title":
        return (
          <h3 key={index} className="text-2xl font-bold text-white mt-10 mb-6 flex items-center gap-3">
            <Target className="text-blue-500" size={24} />
            {block.text}
          </h3>
        );
      case "highlight": {
        const Icon = (block.icon && iconMap[block.icon]) || Sparkles;
        return (
          <div key={index} className="my-8 p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <h4 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
              <Icon size={20} />
              {block.title}
            </h4>
            <p className="text-gray-300 leading-relaxed">{block.text}</p>
          </div>
        );
      }
      case "list":
        return (
          <ul key={index} className="space-y-4 mb-8">
            {(block.items || []).map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 bg-[#111] p-4 rounded-xl border border-white/5">
                <ChevronRight className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-300">
                  {item.split("**").map((part: string, j: number) =>
                    j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
                  )}
                </span>
              </li>
            ))}
          </ul>
        );
      case "comparison":
        return (
          <div key={index} className="grid md:grid-cols-2 gap-4 my-8">
            <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 font-bold mb-4 border-b border-red-500/20 pb-3">
                <XCircle size={18} /> ZŁY PROMPT
              </div>
              <div className="text-gray-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">{block.bad}</div>
            </div>
            <div className="p-6 rounded-2xl bg-green-950/20 border border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 font-bold mb-4 border-b border-green-500/20 pb-3">
                <CheckCircle size={18} /> DOBRY PROMPT
              </div>
              <div className="text-gray-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">{block.good}</div>
            </div>
          </div>
        );
      case "prompt-box":
        return (
          <div key={index} className="my-8 rounded-2xl border border-white/10 bg-[#0c0c0c] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#151515] border-b border-white/5">
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <Terminal size={16} /> {block.title}
              </div>
              <button onClick={() => copyToClipboard(block.code || "")} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 transition-colors" title="Skopiuj">
                <Copy size={16} />
              </button>
            </div>
            <div className="p-6">
              <pre className="text-sm font-mono text-blue-100 whitespace-pre-wrap leading-relaxed">{block.code}</pre>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // ── HOMEWORK VIEW ─────────────────────────────
  if (view === "homework") {
    return (
      <main className="min-h-screen bg-[#080808]">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <button onClick={() => setView("syllabus")} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium mb-8">
              <ArrowLeft size={16} /> Wróć do programu
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                <ClipboardList size={28} className="text-orange-400" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white">Zadania Domowe</h1>
                <p className="text-gray-500 text-sm mt-1">Praktyczne projekty utrwalające wiedzę z kursu</p>
              </div>
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-blue-950/20 border border-blue-500/20 mb-10">
              <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><BookOpen size={18} /> Jak pracować z zadaniami?</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Każde zadanie stosuje techniki z kursu w praktyce</li>
                <li>• Zacznij od łatwych, przejdź do trudnych</li>
                <li>• Projekt końcowy (zadanie 5) łączy minimum 4 techniki</li>
                <li>• Dokumentuj swoje prompty i wyniki — to Twoje portfolio</li>
              </ul>
            </div>

            <div className="space-y-6">
              {homeworkTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-600/20 flex items-center justify-center">
                        <span className="text-orange-400 font-bold text-sm">{i + 1}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{task.title}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[task.difficulty]}`}>
                      {difficultyLabels[task.difficulty]}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">{task.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {task.techniques.map((tech, ti) => (
                      <span key={ti} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">{tech}</span>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/5 mb-4">
                    <p className="text-gray-400 text-sm"><strong className="text-white">Do oddania:</strong> {task.deliverable}</p>
                  </div>

                  <details className="group">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2">
                      <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
                      Podpowiedzi
                    </summary>
                    <ul className="mt-3 space-y-2 pl-5">
                      {task.hints.map((hint, hi) => (
                        <li key={hi} className="text-gray-400 text-sm flex items-start gap-2">
                          <Sparkles size={12} className="text-yellow-500 mt-1 flex-shrink-0" />
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </details>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button onClick={() => setView("syllabus")} className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/5 transition-all">
                Powrót do programu
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // ── SYLLABUS VIEW ──────────────────────────────
  if (view === "syllabus") {
    return (
      <main className="min-h-screen bg-[#080808]">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <a href="/szkolenie" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium mb-8">
              <ArrowLeft size={16} /> Wróć do Panelu
            </a>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                <GraduationCap size={28} className="text-purple-400" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white">Zaawansowany Prompting</h1>
                <p className="text-gray-500 text-sm mt-1">Pełny program nauczania · 4 Semestry · 12 Lekcji · Quiz 30 pytań · Zadania domowe</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 mb-12">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">12 lekcji</span>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">~5h materiału</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">30 pytań egzaminacyjnych</span>
              <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium">5 zadań domowych</span>
              <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium">Certyfikat: {PASS_SCORE}/{quizQuestions.length}</span>
            </div>

            {completedLessons.length > 0 && (
              <div className="mb-10 p-4 rounded-xl bg-[#0f0f0f] border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm font-medium">Postęp kursu</span>
                  <span className="text-white text-sm font-bold">{completedLessons.length}/{lessons.length} lekcji</span>
                </div>
                <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all" style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }} />
                </div>
              </div>
            )}
          </motion.div>

          {semesters.map((sem, si) => (
            <motion.div key={sem.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: si * 0.1 }} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Layers size={20} className="text-purple-400" />
                <h2 className="text-xl font-bold text-white">{sem.name}</h2>
              </div>
              <div className="space-y-3">
                {sem.lessons.map((li) => {
                  const lesson = lessons[li];
                  const done = completedLessons.includes(li);
                  if (!lesson) return null;
                  return (
                    <button key={li} onClick={() => startLesson(li)} className={`w-full text-left p-5 rounded-xl border transition-all group ${done ? "bg-green-950/10 border-green-500/20 hover:border-green-500/40" : "bg-[#0f0f0f] border-white/5 hover:border-purple-500/30"}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${done ? "bg-green-500/20" : "bg-purple-600/20"}`}>
                            {done ? <CheckCircle size={20} className="text-green-400" /> : <span className="text-purple-400 font-bold text-sm">{li + 1}</span>}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold group-hover:text-purple-400 transition-colors">{lesson.title}</h3>
                            <span className="text-gray-500 text-xs">{lesson.duration}</span>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <button
                onClick={() => { setView("quiz"); setQuizPage(0); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                disabled={completedLessons.length < lessons.length}
                className={`w-full p-6 rounded-2xl border text-left transition-all ${completedLessons.length >= lessons.length ? "bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30 hover:border-purple-500/50 cursor-pointer" : "bg-[#0a0a0a] border-white/5 opacity-50 cursor-not-allowed"}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                    <Trophy size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Quiz Końcowy — {quizQuestions.length} pytań</h3>
                    <p className="text-gray-500 text-sm">
                      {completedLessons.length >= lessons.length ? "Ukończyłeś wszystkie lekcje. Rozpocznij quiz!" : `Ukończ wszystkie ${lessons.length} lekcji (${completedLessons.length}/${lessons.length})`}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <button
                onClick={() => { setView("homework"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="w-full p-6 rounded-2xl border text-left transition-all bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border-orange-500/30 hover:border-orange-500/50 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-600/20 flex items-center justify-center">
                    <ClipboardList size={24} className="text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Zadania Domowe — {homeworkTasks.length} projektów</h3>
                    <p className="text-gray-500 text-sm">Praktyczne projekty utrwalające wiedzę z kursu</p>
                  </div>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    );
  }

  // ── QUIZ VIEW ──────────────────────────────────
  if (view === "quiz") {
    const pageQuestions = quizQuestions.slice(quizPage * QUIZ_PER_PAGE, (quizPage + 1) * QUIZ_PER_PAGE);
    const globalOffset = quizPage * QUIZ_PER_PAGE;

    return (
      <main className="min-h-screen bg-[#080808]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {!quizSubmitted && (
              <>
                <button onClick={() => setView("syllabus")} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium mb-8">
                  <ArrowLeft size={16} /> Wróć do programu
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <Brain size={32} className="text-purple-400" />
                  <h1 className="text-3xl font-black text-white">Quiz Końcowy</h1>
                </div>
                <p className="text-gray-400 mb-4">
                  {quizQuestions.length} pytań · Próg certyfikatu: {PASS_SCORE}/{quizQuestions.length} · Strona {quizPage + 1}/{totalQuizPages}
                </p>
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: totalQuizPages }).map((_, i) => (
                    <button key={i} onClick={() => setQuizPage(i)} className={`h-2 rounded-full transition-all ${i === quizPage ? "w-8 bg-purple-500" : "w-4 bg-white/10 hover:bg-white/20"}`} />
                  ))}
                </div>
              </>
            )}

            {quizSubmitted ? (
              <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="text-center">
                <Trophy size={80} className={`mx-auto mb-6 ${calculateScore() >= PASS_SCORE ? "text-yellow-400" : "text-gray-500"}`} />
                <h2 className="text-4xl font-black text-white mb-3">Wynik: {calculateScore()}/{quizQuestions.length}</h2>
                <div className="text-xl font-medium mb-10">
                  {calculateScore() >= PASS_SCORE
                    ? <span className="text-green-400">Gratulacje! Certyfikat Advanced Prompt Engineering odblokowany! 🏆</span>
                    : calculateScore() >= Math.ceil(quizQuestions.length * 0.5)
                      ? <span className="text-yellow-400">Solidna podstawa, ale warto powtórzyć materiał.</span>
                      : <span className="text-red-400">Wróć do lekcji i powtórz materiał.</span>}
                </div>

                <div className="text-left space-y-4 mb-12">
                  {quizQuestions.map((q, qi) => {
                    const correct = quizAnswers[qi] === q.correct;
                    return (
                      <div key={qi} className={`p-4 rounded-xl border ${correct ? "bg-green-950/10 border-green-500/20" : "bg-red-950/10 border-red-500/20"}`}>
                        <div className="flex items-start gap-3">
                          {correct ? <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0" /> : <XCircle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />}
                          <div>
                            <p className="text-white font-medium text-sm mb-1">{qi + 1}. {q.question}</p>
                            {!correct && <p className="text-green-400 text-xs">Poprawna: {q.options[q.correct]}</p>}
                            <p className="text-gray-500 text-xs mt-1">{q.explanation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setView("syllabus")} className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/5 transition-all">Powrót do programu</button>
                  {calculateScore() < PASS_SCORE && (
                    <button onClick={() => { setQuizAnswers([]); setQuizSubmitted(false); setQuizPage(0); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all">
                      Podejdź ponownie
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <>
                <div className="space-y-6">
                  {pageQuestions.map((q, localIdx) => {
                    const qi = globalOffset + localIdx;
                    return (
                      <div key={qi} className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/5">
                        <h3 className="text-lg font-semibold text-white mb-4"><span className="text-purple-500 font-black mr-2">{qi + 1}.</span>{q.question}</h3>
                        <div className="space-y-2">
                          {q.options.map((opt, oi) => {
                            const sel = quizAnswers[qi] === oi;
                            return (
                              <button key={oi} onClick={() => handleAnswer(qi, oi)} className={`w-full text-left p-3.5 rounded-xl border transition-all ${sel ? "bg-purple-600/20 border-purple-500/50 text-white" : "bg-[#151515] border-white/5 text-gray-300 hover:border-white/10"}`}>
                                <div className="flex items-start gap-3">
                                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0 ${sel ? "border-purple-500 bg-purple-500 text-white" : "border-gray-600 text-gray-500"}`}>
                                    {String.fromCharCode(65 + oi)}
                                  </span>
                                  <span className="leading-relaxed text-sm">{opt}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-8 gap-4">
                  <button onClick={() => { setQuizPage(Math.max(0, quizPage - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }} disabled={quizPage === 0} className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white font-medium border border-white/5 transition-all">
                    <ArrowLeft size={16} className="inline mr-2" />Poprzednia
                  </button>

                  {quizPage < totalQuizPages - 1 ? (
                    <button onClick={() => { setQuizPage(quizPage + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all">
                      Następna<ChevronRight size={16} className="inline ml-2" />
                    </button>
                  ) : (
                    <button onClick={handleSubmitQuiz} disabled={quizAnswers.filter(a => a !== undefined).length !== quizQuestions.length} className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold transition-all">
                      Zakończ Quiz ({quizAnswers.filter(a => a !== undefined).length}/{quizQuestions.length})
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </main>
    );
  }

  // ── LESSON VIEW ────────────────────────────────
  const lesson = lessons[currentLesson];

  return (
    <main className="min-h-screen bg-[#080808]">
      <div className="fixed top-0 left-0 w-full h-1.5 bg-[#111] z-50">
        <motion.div className="h-full bg-gradient-to-r from-purple-600 to-pink-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16" ref={contentRef}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setView("syllabus")} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
              <ArrowLeft size={16} /> Program
            </button>
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <Cpu size={16} /> Lekcja {currentLesson + 1}/{lessons.length}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={12} /> {lesson.duration} nauki
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-12 leading-tight">{lesson.title}</h1>
        </motion.div>

        <motion.div key={currentLesson} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-16">{lesson.content.map((block, i) => renderBlock(block, i))}</div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 mb-12">
            <h3 className="flex items-center gap-3 text-xl text-yellow-400 font-bold mb-6">
              <AlertCircle size={24} /> Złote zasady z tej lekcji
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {lesson.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 bg-black/20 p-4 rounded-xl">
                  <CheckCircle size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <button onClick={handlePrev} disabled={currentLesson === 0} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold border border-white/5 transition-all">
            <ArrowLeft size={18} /> Poprzednia
          </button>
          <button onClick={handleNext} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all hover:shadow-lg hover:shadow-purple-500/25">
            {currentLesson === lessons.length - 1 ? "Rozpocznij Quiz" : "Następna lekcja"}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}
