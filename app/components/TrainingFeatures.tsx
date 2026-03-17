"use client";
import { useState, useEffect, useCallback } from "react";
import {
  StickyNote,
  Save,
  CheckCircle,
  FileText,
  Send,
  Loader2,
  Star,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowRight,
} from "lucide-react";

// ─── Notes Panel ─────────────────────────────────────────
interface NotesPanelProps {
  moduleSlug: string;
  lessonIndex: number;
  onNotesChange?: (notes: string) => void;
}

export function NotesPanel({ moduleSlug, lessonIndex, onNotesChange }: NotesPanelProps) {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setSaved(false);
    fetch(`/api/notes?module=${moduleSlug}&lesson=${lessonIndex}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.note?.content) {
          setContent(d.note.content);
          onNotesChange?.(d.note.content);
        } else {
          setContent("");
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [moduleSlug, lessonIndex]);

  const saveNote = async () => {
    setSaving(true);
    try {
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleSlug, lessonIndex, content }),
      });
      setSaved(true);
      onNotesChange?.(content);
      setTimeout(() => setSaved(false), 2000);
    } catch {} finally {
      setSaving(false);
    }
  };

  const sendToHelply = () => {
    if (!content.trim()) return;
    sessionStorage.setItem("notes_for_helply", JSON.stringify({ moduleSlug, lessonIndex, content }));
    // Trigger Helply open via custom event
    window.dispatchEvent(new CustomEvent("open-helply", { detail: { action: "notes-to-prompt", notes: content } }));
  };

  if (!loaded) return null;

  return (
    <div className="rounded-xl border border-white/5 bg-[#0f0f0f] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <StickyNote size={14} className="text-yellow-400" />
          <span className="text-sm font-bold text-white">Notatki</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={sendToHelply}
            disabled={!content.trim()}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-400 hover:bg-purple-500/20 disabled:opacity-30 transition-colors"
          >
            <Sparkles size={10} />
            Notatki → Prompt
          </button>
          <button
            onClick={saveNote}
            disabled={saving}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-yellow-600/20 border border-yellow-500/30 text-xs text-yellow-400 hover:bg-yellow-600/30 disabled:opacity-50 transition-colors"
          >
            {saved ? <CheckCircle size={12} /> : saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
            {saved ? "Zapisano!" : "Zapisz"}
          </button>
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Zapisz swoje notatki z tej lekcji..."
        rows={4}
        className="w-full resize-none rounded-lg bg-[#080808] border border-white/5 px-3 py-2 text-sm text-gray-300 placeholder:text-gray-700 outline-none focus:border-yellow-500/30 transition-colors"
      />
    </div>
  );
}

// ─── Homework Panel ──────────────────────────────────────
interface HomeworkPanelProps {
  moduleSlug: string;
  lessonIndex: number;
  task: { title: string; description: string; hints: string[] };
}

export function HomeworkPanel({ moduleSlug, lessonIndex, task }: HomeworkPanelProps) {
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ score: number; feedback: string } | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFeedback(null);
    setAnswer("");
    setLoaded(false);
    fetch(`/api/homework?module=${moduleSlug}&lesson=${lessonIndex}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.submission) {
          setAnswer(d.submission.answer || "");
          setFeedback({ score: d.submission.score, feedback: d.submission.ai_feedback });
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [moduleSlug, lessonIndex]);

  const submit = async () => {
    if (!answer.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/homework", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleSlug, lessonIndex, answer, homeworkTask: task.description }),
      });
      const data = await res.json();
      setFeedback({ score: data.score, feedback: data.feedback });
    } catch {} finally {
      setSubmitting(false);
    }
  };

  const askHelply = () => {
    window.dispatchEvent(new CustomEvent("open-helply", {
      detail: { action: "homework-help", notes: `Zadanie: ${task.description}\nMoja odpowiedź do tej pory: ${answer}` }
    }));
  };

  if (!loaded) return null;

  return (
    <div className="rounded-xl border border-blue-500/10 bg-[#0f0f0f] overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-blue-400" />
          <span className="text-sm font-bold text-white">Zadanie domowe</span>
          {feedback && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              feedback.score >= 8 ? "bg-green-500/10 text-green-400" :
              feedback.score >= 6 ? "bg-yellow-500/10 text-yellow-400" :
              "bg-red-500/10 text-red-400"
            }`}>
              {feedback.score}/10
            </span>
          )}
        </div>
        {expanded ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <div className="rounded-lg bg-blue-500/5 border border-blue-500/10 p-3">
            <h4 className="text-xs font-bold text-blue-300 mb-1">{task.title}</h4>
            <p className="text-xs text-gray-400 leading-relaxed">{task.description}</p>
          </div>

          {/* Hints */}
          <button
            onClick={() => setShowHints(!showHints)}
            className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
          >
            {showHints ? "Ukryj wskazówki ▲" : "Pokaż wskazówki ▼"}
          </button>
          {showHints && (
            <ul className="space-y-1">
              {task.hints.map((hint, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[10px] text-gray-500">
                  <Star size={8} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                  {hint}
                </li>
              ))}
            </ul>
          )}

          {/* Answer */}
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Napisz swoją odpowiedź..."
            rows={5}
            className="w-full resize-none rounded-lg bg-[#080808] border border-white/5 px-3 py-2 text-sm text-gray-300 placeholder:text-gray-700 outline-none focus:border-blue-500/30 transition-colors"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={askHelply}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            >
              <BookOpen size={12} />
              Zapytaj Helply
            </button>
            <button
              onClick={submit}
              disabled={submitting || !answer.trim()}
              className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold transition-colors"
            >
              {submitting ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
              {feedback ? "Wyślij ponownie" : "Wyślij do oceny AI"}
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`rounded-lg p-3 border ${
              feedback.score >= 8 ? "bg-green-500/5 border-green-500/20" :
              feedback.score >= 6 ? "bg-yellow-500/5 border-yellow-500/20" :
              "bg-red-500/5 border-red-500/20"
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-white">Ocena AI: {feedback.score}/10</span>
                <div className="flex">
                  {Array.from({ length: 10 }, (_, i) => (
                    <Star key={i} size={10} className={i < feedback.score ? "text-yellow-400" : "text-gray-700"} fill={i < feedback.score ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{feedback.feedback}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Progress Bar ────────────────────────────────────────
interface ProgressBarProps {
  moduleSlug: string;
  totalLessons: number;
  currentLesson: number;
  onResumeLesson?: (index: number) => void;
}

export function ProgressTracker({ moduleSlug, totalLessons, currentLesson, onResumeLesson }: ProgressBarProps) {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [lastLesson, setLastLesson] = useState<number>(0);

  useEffect(() => {
    fetch(`/api/progress?module=${moduleSlug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.progress) {
          const completed = (d.progress as { lesson_index: number; completed: boolean }[])
            .filter((p) => p.completed)
            .map((p) => p.lesson_index);
          setCompletedLessons(completed);
          // Last lesson = highest completed + 1, or 0
          const maxCompleted = completed.length > 0 ? Math.max(...completed) : -1;
          setLastLesson(Math.min(maxCompleted + 1, totalLessons - 1));
        }
      })
      .catch(() => {});
  }, [moduleSlug, totalLessons]);

  const saveProgress = useCallback((lessonIndex: number) => {
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleSlug, lessonIndex }),
    }).catch(() => {});
    setCompletedLessons((prev) => [...new Set([...prev, lessonIndex])]);
  }, [moduleSlug]);

  const percent = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  return (
    <div className="rounded-xl border border-white/5 bg-[#0f0f0f] p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CheckCircle size={14} className="text-green-400" />
          <span className="text-sm font-bold text-white">Postępy</span>
          <span className="text-xs text-gray-500">{completedLessons.length}/{totalLessons} lekcji</span>
        </div>
        {lastLesson > 0 && onResumeLesson && (
          <button
            onClick={() => onResumeLesson(lastLesson)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600/20 border border-blue-500/30 text-xs text-blue-400 hover:bg-blue-600/30 transition-colors"
          >
            <ArrowRight size={12} />
            Kontynuuj (L{lastLesson + 1})
          </button>
        )}
      </div>
      <div className="w-full h-2 rounded-full bg-[#1a1a1a] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-[10px] text-gray-600 mt-1">{percent}% ukończone</p>

      {/* Expose saveProgress for parent components */}
      <input type="hidden" data-save-progress="true" data-module={moduleSlug} />
    </div>
  );
}

// Hook for parent components to save progress
export function useSaveProgress(moduleSlug: string) {
  const saveProgress = useCallback((lessonIndex: number) => {
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleSlug, lessonIndex }),
    }).catch(() => {});
  }, [moduleSlug]);

  return { saveProgress };
}
