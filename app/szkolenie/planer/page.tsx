"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  CheckCircle,
  Circle,
  BookOpen,
  Play,
  ClipboardCheck,
  RotateCcw,
  Loader2,
  TrendingUp,
  Clock,
  Target,
  Flame,
  Trophy,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface PlanDay {
  day: number;
  title: string;
  description: string;
  category: string;
  duration: string;
}

interface PlannerData {
  actionPlan30d: PlanDay[] | null;
  aiSummary: string | null;
  completedDays: number[];
}

const CAT_CONFIG: Record<string, { icon: typeof BookOpen; color: string; bg: string; label: string }> = {
  learning: { icon: BookOpen, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", label: "Nauka" },
  practice: { icon: Play, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", label: "Praktyka" },
  project: { icon: ClipboardCheck, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", label: "Projekt" },
  review: { icon: RotateCcw, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", label: "Powtórka" },
};

function getStreakDays(completed: number[]): number {
  if (completed.length === 0) return 0;
  const sorted = [...completed].sort((a, b) => a - b);
  let streak = 1;
  for (let i = sorted.length - 1; i > 0; i--) {
    if (sorted[i] - sorted[i - 1] === 1) streak++;
    else break;
  }
  return streak;
}

export default function PlanerPage() {
  const [data, setData] = useState<PlannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [saving, setSaving] = useState(false);
  const [activeWeek, setActiveWeek] = useState(0);
  const [viewMode, setViewMode] = useState<"week" | "calendar">("week");

  useEffect(() => {
    Promise.all([
      fetch("/api/user/onboarding").then((r) => r.json()),
      fetch("/api/user/planner").then((r) => r.json()).catch(() => ({ completedDays: [] })),
    ]).then(([onboarding, planner]) => {
      setData({
        actionPlan30d: onboarding.actionPlan30d || null,
        aiSummary: onboarding.aiSummary || null,
        completedDays: planner.completedDays || [],
      });
      setCompletedDays(new Set(planner.completedDays || []));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const toggleDay = async (day: number) => {
    const next = new Set(completedDays);
    if (next.has(day)) next.delete(day);
    else next.add(day);
    setCompletedDays(next);

    setSaving(true);
    try {
      await fetch("/api/user/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completedDays: Array.from(next) }),
      });
    } catch { /* silent */ }
    finally { setSaving(false); }
  };

  const plan = data?.actionPlan30d || [];
  const totalDays = plan.length;
  const completedCount = completedDays.size;
  const progressPercent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;
  const streak = getStreakDays(Array.from(completedDays));

  const weekDays = useMemo(() => {
    return plan.filter((d) => {
      if (activeWeek === 0) return d.day >= 1 && d.day <= 7;
      if (activeWeek === 1) return d.day >= 8 && d.day <= 14;
      if (activeWeek === 2) return d.day >= 15 && d.day <= 21;
      return d.day >= 22 && d.day <= 30;
    });
  }, [plan, activeWeek]);

  const catStats = useMemo(() => {
    const stats: Record<string, { total: number; done: number }> = {};
    plan.forEach((d) => {
      if (!stats[d.category]) stats[d.category] = { total: 0, done: 0 };
      stats[d.category].total++;
      if (completedDays.has(d.day)) stats[d.category].done++;
    });
    return stats;
  }, [plan, completedDays]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </main>
    );
  }

  if (!plan || plan.length === 0) {
    return (
      <main className="min-h-screen bg-[#080808] px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
            <Calendar size={40} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-4">30-dniowy Plan Działania</h1>
          <p className="text-gray-400 mb-8">Twój spersonalizowany plan zostanie wygenerowany po ukończeniu onboardingu.</p>
          <Link href="/szkolenie/onboarding" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all">
            Rozpocznij onboarding <ChevronRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <Calendar size={24} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">30-dniowy Plan AI</h1>
              <p className="text-sm text-gray-500">Twój spersonalizowany plan rozwoju</p>
            </div>
          </div>
          <Link href="/szkolenie" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-all">
            <ArrowLeft size={14} /> Szkolenia
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-center">
            <div className="text-2xl font-black text-blue-400">{progressPercent}%</div>
            <div className="text-[10px] text-gray-500 uppercase font-medium mt-1">Ukończone</div>
            <div className="mt-2 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-center">
            <div className="text-2xl font-black text-green-400">{completedCount}/{totalDays}</div>
            <div className="text-[10px] text-gray-500 uppercase font-medium mt-1">Zadania</div>
          </div>
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Flame size={18} className="text-orange-400" />
              <span className="text-2xl font-black text-orange-400">{streak}</span>
            </div>
            <div className="text-[10px] text-gray-500 uppercase font-medium mt-1">Seria dni</div>
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Trophy size={18} className="text-purple-400" />
              <span className="text-2xl font-black text-purple-400">
                {progressPercent >= 100 ? "🏆" : progressPercent >= 50 ? "⭐" : "🎯"}
              </span>
            </div>
            <div className="text-[10px] text-gray-500 uppercase font-medium mt-1">
              {progressPercent >= 100 ? "Ukończono!" : progressPercent >= 50 ? "Połowa drogi!" : "W trakcie"}
            </div>
          </div>
        </div>

        {/* Category Progress */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-4">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-blue-400" /> Postęp wg kategorii
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(catStats).map(([cat, stats]) => {
              const cfg = CAT_CONFIG[cat] || CAT_CONFIG.learning;
              const CatIcon = cfg.icon;
              const pct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
              return (
                <div key={cat} className={`p-3 rounded-lg border ${cfg.bg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <CatIcon size={14} className={cfg.color} />
                    <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  <div className="text-lg font-bold text-white">{stats.done}/{stats.total}</div>
                  <div className="mt-1.5 h-1 bg-black/30 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${cat === "learning" ? "bg-blue-500" : cat === "practice" ? "bg-green-500" : cat === "project" ? "bg-purple-500" : "bg-yellow-500"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 30-day calendar overview */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-4">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Calendar size={14} className="text-blue-400" /> Kalendarz 30 dni
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {plan.map((d) => {
              const done = completedDays.has(d.day);
              const cfg = CAT_CONFIG[d.category] || CAT_CONFIG.learning;
              return (
                <button
                  key={d.day}
                  onClick={() => toggleDay(d.day)}
                  title={`Dzień ${d.day}: ${d.title}`}
                  className={`w-8 h-8 rounded-lg text-[10px] font-bold flex items-center justify-center transition-all ${
                    done
                      ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                      : "bg-white/[0.03] text-gray-600 border border-white/5 hover:border-white/20 hover:text-gray-400"
                  }`}
                >
                  {done ? "✓" : d.day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Week tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[0, 1, 2, 3].map((w) => {
            const weekRange = w === 0 ? "1-7" : w === 1 ? "8-14" : w === 2 ? "15-21" : "22-30";
            const weekPlan = plan.filter((d) => {
              if (w === 0) return d.day >= 1 && d.day <= 7;
              if (w === 1) return d.day >= 8 && d.day <= 14;
              if (w === 2) return d.day >= 15 && d.day <= 21;
              return d.day >= 22 && d.day <= 30;
            });
            const weekDone = weekPlan.filter((d) => completedDays.has(d.day)).length;
            return (
              <button
                key={w}
                onClick={() => setActiveWeek(w)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeWeek === w
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                Tydzień {w + 1}
                <span className="text-[10px] opacity-70">({weekDone}/{weekPlan.length})</span>
              </button>
            );
          })}
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {weekDays.map((d) => {
            const done = completedDays.has(d.day);
            const cfg = CAT_CONFIG[d.category] || CAT_CONFIG.learning;
            const CatIcon = cfg.icon;
            return (
              <div
                key={d.day}
                className={`flex gap-4 p-4 rounded-xl border transition-all ${
                  done
                    ? "bg-green-950/10 border-green-500/20"
                    : "bg-[#111] border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => toggleDay(d.day)}
                  className="flex-shrink-0 mt-0.5"
                  disabled={saving}
                >
                  {done ? (
                    <CheckCircle size={22} className="text-green-400" />
                  ) : (
                    <Circle size={22} className="text-gray-600 hover:text-blue-400 transition-colors" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-xs flex-shrink-0">
                        {d.day}
                      </span>
                      <h4 className={`text-sm font-semibold ${done ? "text-green-300 line-through" : "text-white"}`}>{d.title}</h4>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.color}`}>
                      <CatIcon size={10} />
                      {cfg.label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-gray-500">
                      <Clock size={10} /> {d.duration}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${done ? "text-gray-600" : "text-gray-400"}`}>{d.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Summary */}
        {data?.aiSummary && (
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-purple-400 mb-3">
              <Sparkles size={14} /> Twoja analiza AI
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{data.aiSummary}</p>
          </div>
        )}
      </div>
    </main>
  );
}
