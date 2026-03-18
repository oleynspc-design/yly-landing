"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Shield,
  ShieldCheck,
  Clock,
  Key,
  CheckCircle,
  XCircle,
  Loader2,
  Camera,
  Award,
  Star,
  Zap,
  TrendingUp,
  Download,
  Target,
  Briefcase,
  Brain,
  Sparkles,
} from "lucide-react";

interface UserData {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin" | "moderator";
  avatarUrl: string | null;
  trainingAccessStatus: string;
  trainingAccessScope: string;
  packageType?: string;
  xp: number;
  level: number;
  levelName: string;
  levelColor: string;
}

interface Certificate {
  id: string;
  type: string;
  title: string;
  description: string | null;
  score: number | null;
  max_score: number | null;
  issued_at: string;
  downloadable: boolean;
}

interface OnboardingInfo {
  answers: {
    industry: string | null;
    experience: string | null;
    goals: string[] | null;
    expectations: string | null;
    challenge: string | null;
  } | null;
  trainingPath: { module: string; priority: string; reason: string }[] | null;
  industry: string | null;
}

const goalLabels: Record<string, string> = {
  automate: "Automatyzacja powtarzalnych zadań",
  content: "Tworzenie treści (posty, artykuły, newslettery)",
  marketing: "Lepszy marketing i sprzedaż",
  productivity: "Zwiększenie produktywności codziennej pracy",
  data: "Analiza danych i raportowanie",
  customer: "Lepsza obsługa klientów",
  learning: "Nauka i rozwój osobisty w AI",
  business: "Skalowanie biznesu z AI",
};

const experienceLabels: Record<string, string> = {
  beginner: "Początkujący",
  basic: "Podstawowy",
  intermediate: "Średniozaawansowany",
  advanced: "Zaawansowany",
};

interface UserStats {
  xp: number;
  level: number;
  levelName: string;
  levelColor: string;
  nextLevel: { level: number; name: string; xpNeeded: number } | null;
  progress: { current: number; needed: number; percent: number };
  certificates: Certificate[];
  xpLog: { amount: number; source: string; description: string | null; created_at: string }[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Avatar state
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redeem code state
  const [code, setCode] = useState("");
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemError, setRedeemError] = useState("");
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [onboarding, setOnboarding] = useState<OnboardingInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/user/stats").then((r) => r.json()),
      fetch("/api/user/onboarding").then((r) => r.json()).catch(() => null),
    ]).then(([authData, statsData, onboardingData]) => {
      if (authData.user) setUser(authData.user);
      if (statsData.xp !== undefined) setStats(statsData);
      if (onboardingData) setOnboarding(onboardingData);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarUploading(true);
    setAvatarError("");

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("/api/auth/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Wystąpił błąd");
      }

      setUser((prev) => prev ? { ...prev, avatarUrl: data.avatarUrl } : prev);
    } catch (err: unknown) {
      setAvatarError(err instanceof Error ? err.message : "Wystąpił błąd");
    } finally {
      setAvatarUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemLoading(true);
    setRedeemError("");

    try {
      const res = await fetch("/api/access/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Wystąpił błąd");
      }

      setRedeemSuccess(true);
      setTimeout(() => {
        router.push("/szkolenie/dashboard");
        router.refresh();
      }, 1500);
    } catch (err: unknown) {
      setRedeemError(err instanceof Error ? err.message : "Wystąpił błąd");
    } finally {
      setRedeemLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#080808]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </main>
    );
  }

  if (!user) return null;

  const hasAccess = user.trainingAccessStatus === "granted" && user.trainingAccessScope === "all";
  const pkgLabel: Record<string, string> = { basic: "Basic", pro: "Pro", premium: "Premium" };
  const pkgColor: Record<string, string> = {
    basic: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    pro: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    premium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-white">Profil i ustawienia</h1>
          <p className="mt-2 text-gray-500">Zarządzaj swoim kontem i dostępem do szkoleń.</p>
        </div>

        {/* User Info Card */}
        <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-white">
            <User size={20} className="text-blue-400" />
            Dane konta
          </h2>

          {/* Avatar */}
          <div className="mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative group">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Avatar"
                  width={72}
                  height={72}
                  className="rounded-full object-cover h-[72px] w-[72px] border-2 border-white/10"
                />
              ) : (
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-white/10 bg-blue-600/20 text-xl font-bold text-blue-400">
                  {user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}
              <button
                type="button"
                title="Zmień zdjęcie profilowe"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarUploading}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
              >
                {avatarUploading ? (
                  <Loader2 size={20} className="animate-spin text-white" />
                ) : (
                  <Camera size={20} className="text-white" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                title="Wybierz zdjęcie profilowe"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{user.fullName}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
              {avatarError && (
                <div className="mt-1 text-xs text-red-400">{avatarError}</div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                {avatarUploading ? "Przesyłam..." : "Zmień zdjęcie"}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <User size={16} className="text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Imię i nazwisko</div>
                <div className="text-sm font-medium text-white">{user.fullName}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <Mail size={16} className="text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Adres e-mail</div>
                <div className="text-sm font-medium text-white">{user.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <Shield size={16} className="text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Rola w systemie</div>
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  {user.role === "admin" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-400">
                      <ShieldCheck size={12} />
                      Administrator
                    </span>
                  ) : user.role === "moderator" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
                      <Shield size={12} />
                      Moderator
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-gray-500/10 px-2.5 py-0.5 text-xs font-semibold text-gray-400">
                      Użytkownik
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Access Status Card */}
        <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
          <h2 className="mb-5 flex items-center justify-between text-lg font-bold text-white">
            <span className="flex items-center gap-2">
              <Key size={20} className="text-blue-400" />
              Dostęp do szkoleń
            </span>
            {user.packageType && (
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase ${pkgColor[user.packageType] || pkgColor.basic}`}>
                {pkgLabel[user.packageType] || user.packageType}
              </span>
            )}
          </h2>
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-4">
            {hasAccess ? (
              <>
                <CheckCircle size={24} className="text-green-400" />
                <div>
                  <div className="text-sm font-semibold text-green-400">Pełny dostęp aktywny</div>
                  <div className="text-xs text-gray-500">Masz dostęp do wszystkich materiałów szkoleniowych.</div>
                </div>
              </>
            ) : user.trainingAccessStatus === "revoked" ? (
              <>
                <XCircle size={24} className="text-red-400" />
                <div>
                  <div className="text-sm font-semibold text-red-400">Dostęp wyłączony</div>
                  <div className="text-xs text-gray-500">Twój dostęp został wyłączony przez system.</div>
                </div>
              </>
            ) : (
              <>
                <Clock size={24} className="text-yellow-400" />
                <div>
                  <div className="text-sm font-semibold text-yellow-400">Oczekujący</div>
                  <div className="text-xs text-gray-500">Dostęp nie został jeszcze nadany. Wpisz kod poniżej, aby go odblokować.</div>
                </div>
              </>
            )}
          </div>

          {/* Redeem Code Section */}
          {!hasAccess && (
            <div className="mt-6 rounded-xl border border-white/5 bg-[#0a0a0a] p-5">
              <h3 className="mb-2 text-sm font-semibold text-white">Wpisz kod dostępu</h3>
              <p className="mb-4 text-xs text-gray-500">
                Jeśli otrzymałeś kod odblokowujący (np. po zakupie), wpisz go tutaj.
              </p>

              {redeemSuccess ? (
                <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-center text-sm text-green-400">
                  <CheckCircle size={20} className="mx-auto mb-1" />
                  Dostęp odblokowany! Przekierowuję...
                </div>
              ) : (
                <form onSubmit={handleRedeem} className="space-y-3">
                  {redeemError && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                      {redeemError}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <label htmlFor="access-code" className="sr-only">Kod dostępu</label>
                    <input
                      id="access-code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Wpisz swój kod (np. A3F7B2C1)"
                      required
                      className="flex-1 rounded-lg border border-white/10 bg-[#080808] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500/50"
                    />
                    <button
                      type="submit"
                      disabled={redeemLoading || !code.trim()}
                      className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {redeemLoading ? "..." : "Odblokuj"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {hasAccess && (
            <div className="mt-4">
              <Link
                href="/szkolenie"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-600/20"
              >
                Przejdź do szkoleń &rarr;
              </Link>
            </div>
          )}
        </section>

        {/* Twoje cele */}
        {onboarding?.answers && (
          <section className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-900/5 to-[#111] p-6">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-white">
              <Target size={20} className="text-green-400" />
              Twoje cele
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {onboarding.answers.industry && (
                <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
                  <Briefcase size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Branża</div>
                    <div className="text-sm font-medium text-white">{onboarding.answers.industry}</div>
                  </div>
                </div>
              )}
              {onboarding.answers.experience && (
                <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
                  <Brain size={18} className="text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Poziom doświadczenia</div>
                    <div className="text-sm font-medium text-white">{experienceLabels[onboarding.answers.experience] || onboarding.answers.experience}</div>
                  </div>
                </div>
              )}
            </div>

            {onboarding.answers.goals && onboarding.answers.goals.length > 0 && (
              <div className="mb-5">
                <div className="text-xs font-medium text-gray-500 mb-3">Co chcesz osiągnąć</div>
                <div className="flex flex-wrap gap-2">
                  {onboarding.answers.goals.map((g) => (
                    <span key={g} className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1.5 text-xs font-medium text-green-400">
                      <CheckCircle size={12} />
                      {goalLabels[g] || g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {onboarding.answers.expectations && (
              <div className="mb-4 rounded-xl bg-white/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-yellow-400" />
                  <span className="text-xs font-medium text-gray-500">Oczekiwania po szkoleniu</span>
                </div>
                <p className="text-sm text-gray-300">{onboarding.answers.expectations}</p>
              </div>
            )}

            {onboarding.answers.challenge && (
              <div className="mb-4 rounded-xl bg-white/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-orange-400" />
                  <span className="text-xs font-medium text-gray-500">Największe wyzwanie</span>
                </div>
                <p className="text-sm text-gray-300">{onboarding.answers.challenge}</p>
              </div>
            )}

            {onboarding.trainingPath && onboarding.trainingPath.length > 0 && (
              <div className="rounded-xl bg-white/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={14} className="text-blue-400" />
                  <span className="text-xs font-medium text-gray-500">Twoja spersonalizowana ścieżka nauki</span>
                </div>
                <div className="space-y-2">
                  {onboarding.trainingPath.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className={`mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex-shrink-0 ${
                        item.priority === "high" ? "bg-red-500/10 text-red-400" :
                        item.priority === "medium" ? "bg-yellow-500/10 text-yellow-400" :
                        "bg-gray-500/10 text-gray-400"
                      }`}>{item.priority === "high" ? "Priorytet" : item.priority === "medium" ? "Ważne" : "Opcja"}</span>
                      <div>
                        <div className="text-sm font-medium text-white">{item.module}</div>
                        <div className="text-xs text-gray-500">{item.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <Link
                href="/szkolenie/onboarding"
                className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
              >
                Zmień cele i preferencje →
              </Link>
            </div>
          </section>
        )}

        {/* Level & XP Section */}
        <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-white">
            <TrendingUp size={20} className="text-yellow-400" />
            Poziom i doświadczenie
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Level badge */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 text-3xl font-black"
                style={{ borderColor: user.levelColor, color: user.levelColor, background: `${user.levelColor}15` }}
              >
                {user.level}
              </div>
              <div className="text-sm font-semibold text-white">{user.levelName}</div>
            </div>

            {/* XP Progress */}
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-yellow-400" />
                  <span className="text-sm font-semibold text-white">{user.xp} XP</span>
                </div>
                {stats?.nextLevel && (
                  <span className="text-xs text-gray-500">
                    Następny: Lv.{stats.nextLevel.level} {stats.nextLevel.name} ({stats.nextLevel.xpNeeded} XP)
                  </span>
                )}
              </div>
              <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${stats?.progress.percent ?? 0}%`,
                    background: `linear-gradient(90deg, ${user.levelColor}, ${user.levelColor}cc)`,
                  }}
                />
              </div>
              {stats?.progress && stats.progress.needed > 0 && (
                <div className="mt-1 text-xs text-gray-600">
                  {stats.progress.current} / {stats.progress.needed} XP do następnego poziomu
                </div>
              )}

              {/* Recent XP log */}
              {stats?.xpLog && stats.xpLog.length > 0 && (
                <div className="mt-4 space-y-1">
                  <div className="text-xs font-medium text-gray-500 mb-2">Ostatnia aktywność</div>
                  {stats.xpLog.slice(0, 5).map((log, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{log.description || log.source}</span>
                      <span className="font-semibold text-yellow-400">+{log.amount} XP</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-white">
            <Award size={20} className="text-blue-400" />
            Certyfikaty
          </h2>

          {stats?.certificates && stats.certificates.length > 0 ? (
            <div className="space-y-4">
              {stats.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 flex-shrink-0">
                    <Star size={24} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white">{cert.title}</div>
                    {cert.description && (
                      <div className="text-xs text-gray-500 mt-0.5">{cert.description}</div>
                    )}
                    <div className="flex items-center gap-3 mt-1">
                      {cert.score !== null && cert.max_score !== null && (
                        <span className="text-xs text-green-400 font-medium">
                          Wynik: {cert.score}/{cert.max_score}
                        </span>
                      )}
                      <span className="text-xs text-gray-600">
                        {new Date(cert.issued_at).toLocaleDateString("pl-PL")}
                      </span>
                    </div>
                  </div>
                  {cert.downloadable ? (
                    <button
                      className="flex items-center gap-1.5 rounded-lg bg-blue-600/10 px-3 py-2 text-xs font-medium text-blue-400 transition-colors hover:bg-blue-600/20"
                      title="Pobierz certyfikat"
                    >
                      <Download size={14} />
                      Pobierz
                    </button>
                  ) : (
                    <span className="rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-500">
                      Wkrótce
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8 text-center">
              <Award size={40} className="mx-auto mb-3 text-gray-700" />
              <div className="text-sm font-medium text-gray-400">Brak certyfikatów</div>
              <div className="text-xs text-gray-600 mt-1">
                Ukończ kurs i zdaj egzamin, aby zdobyć certyfikat.
              </div>
              {hasAccess && (
                <Link
                  href="/szkolenie"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-600/20"
                >
                  Przejdź do szkolenia →
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Admin Card */}
        {(user.role === "admin" || user.role === "moderator") && (
          <section className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-purple-400">
              <ShieldCheck size={20} />
              {user.role === "admin" ? "Panel administratora" : "Panel moderatora"}
            </h2>
            <p className="mb-4 text-sm text-gray-400">
              {user.role === "admin"
                ? "Jako administrator masz dostęp do zarządzania użytkownikami i generowania kodów dostępu."
                : "Jako moderator masz dostęp do podglądu użytkowników i ich profili."}
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600/20 px-4 py-2 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-600/30"
            >
              Otwórz panel admina &rarr;
            </Link>
          </section>
        )}

        {/* Logout */}
        <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
          <h2 className="mb-3 text-lg font-bold text-white">Sesja</h2>
          <p className="mb-4 text-sm text-gray-500">
            Wyloguj się z systemu. Twoja sesja zostanie zakończona i będziesz musiał zalogować się ponownie.
          </p>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
          >
            Wyloguj się
          </button>
        </section>
      </div>
    </main>
  );
}
