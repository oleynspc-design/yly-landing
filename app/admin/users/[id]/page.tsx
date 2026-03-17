"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Key,
  CheckCircle,
  XCircle,
  MessageSquare,
  Monitor,
  Calendar,
  Loader2,
  Brain,
  Briefcase,
  Target,
  Sparkles,
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  accessStatus: string;
  accessScope: string;
  unlockCode: string | null;
  grantedAt: string | null;
  accessSource: string | null;
  industry: string | null;
  onboardingAnswers: Record<string, unknown> | null;
  aiProfileSummary: string | null;
  trainingPath: { module: string; priority: string; reason: string }[] | null;
  stats: {
    messageCount: number;
    activeSessions: number;
    lastMessage: string | null;
  };
}

export default function AdminUserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/admin/users/${userId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.profile) setProfile(data.profile);
        else setError(data.error || "Nie znaleziono użytkownika");
      })
      .catch(() => setError("Błąd połączenia z serwerem"))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center py-20">
        <XCircle size={48} className="mx-auto mb-4 text-red-400" />
        <p className="text-red-400 text-lg">{error || "Nie znaleziono użytkownika"}</p>
        <Link href="/admin" className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm">
          <ArrowLeft size={16} /> Powrót do panelu
        </Link>
      </div>
    );
  }

  const roleConfig: Record<string, { label: string; color: string; icon: typeof Shield }> = {
    admin: { label: "Administrator", color: "purple", icon: ShieldCheck },
    moderator: { label: "Moderator", color: "blue", icon: ShieldAlert },
    user: { label: "Użytkownik", color: "gray", icon: Shield },
  };

  const rc = roleConfig[profile.role] || roleConfig.user;
  const RoleIcon = rc.icon;

  const formatDate = (d: string | null) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-3 transition-colors">
            <ArrowLeft size={16} /> Powrót do listy użytkowników
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Profil użytkownika</h1>
        </div>
      </div>

      {/* User Identity Card */}
      <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt="Avatar"
              className="rounded-full object-cover h-20 w-20 border-2 border-white/10"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/10 bg-blue-600/20 text-2xl font-bold text-blue-400">
              {profile.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-white">{profile.fullName}</h2>
            <p className="text-gray-400 text-sm">{profile.email}</p>
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-${rc.color}-500/10 text-${rc.color}-400`}>
                <RoleIcon size={14} />
                {rc.label}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/10 bg-[#111] p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
            <MessageSquare size={14} />
            Wiadomości na czacie
          </div>
          <div className="text-2xl font-bold text-white">{profile.stats.messageCount}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111] p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
            <Monitor size={14} />
            Aktywne sesje
          </div>
          <div className="text-2xl font-bold text-white">{profile.stats.activeSessions}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111] p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
            <Calendar size={14} />
            Rejestracja
          </div>
          <div className="text-sm font-medium text-white">{formatDate(profile.createdAt)}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111] p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
            <Clock size={14} />
            Ostatnia wiadomość
          </div>
          <div className="text-sm font-medium text-white">{formatDate(profile.stats.lastMessage)}</div>
        </div>
      </div>

      {/* AI Profile Summary — only visible to admin */}
      {(profile.aiProfileSummary || profile.onboardingAnswers) && (
        <section className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-[#111] p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <Brain size={20} className="text-purple-400" />
            Profil uczestnika (AI)
          </h3>

          {profile.industry && (
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={14} className="text-blue-400" />
              <span className="text-sm text-gray-400">Branża:</span>
              <span className="text-sm font-medium text-white">{profile.industry}</span>
            </div>
          )}

          {profile.aiProfileSummary && (
            <div className="mb-5 rounded-xl bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-yellow-400" />
                <span className="text-xs font-bold text-yellow-400 uppercase">Streszczenie AI</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{profile.aiProfileSummary}</p>
            </div>
          )}

          {profile.onboardingAnswers && (
            <div className="mb-5 rounded-xl bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target size={14} className="text-green-400" />
                <span className="text-xs font-bold text-green-400 uppercase">Odpowiedzi z quizu</span>
              </div>
              <div className="space-y-2 text-sm">
                {Object.entries(profile.onboardingAnswers).map(([key, val]) => (
                  <div key={key} className="flex gap-2">
                    <span className="text-gray-500 font-medium min-w-[100px]">{key}:</span>
                    <span className="text-gray-300">{Array.isArray(val) ? (val as string[]).join(", ") : String(val ?? "—")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.trainingPath && profile.trainingPath.length > 0 && (
            <div className="rounded-xl bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={14} className="text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase">Rekomendowana ścieżka nauki</span>
              </div>
              <div className="space-y-2">
                {profile.trainingPath.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.priority === "high" ? "bg-red-500/10 text-red-400" :
                      item.priority === "medium" ? "bg-yellow-500/10 text-yellow-400" :
                      "bg-gray-500/10 text-gray-400"
                    }`}>{item.priority}</span>
                    <div>
                      <div className="text-white font-medium">{item.module}</div>
                      <div className="text-gray-500 text-xs">{item.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Details */}
        <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <User size={20} className="text-blue-400" />
            Dane konta
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <User size={16} className="text-gray-500 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs text-gray-500">Imię i nazwisko</div>
                <div className="text-sm font-medium text-white truncate">{profile.fullName}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <Mail size={16} className="text-gray-500 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs text-gray-500">E-mail</div>
                <div className="text-sm font-medium text-white truncate">{profile.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <Shield size={16} className="text-gray-500 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Rola</div>
                <div className="text-sm font-medium text-white">{rc.label}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <Calendar size={16} className="text-gray-500 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Ostatnia aktualizacja</div>
                <div className="text-sm font-medium text-white">{formatDate(profile.updatedAt)}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Access Details */}
        <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <Key size={20} className="text-blue-400" />
            Dostęp do szkoleń
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              {profile.accessStatus === "granted" ? (
                <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
              ) : profile.accessStatus === "revoked" ? (
                <XCircle size={16} className="text-red-400 flex-shrink-0" />
              ) : (
                <Clock size={16} className="text-yellow-400 flex-shrink-0" />
              )}
              <div>
                <div className="text-xs text-gray-500">Status</div>
                <div className={`text-sm font-medium ${
                  profile.accessStatus === "granted" ? "text-green-400" :
                  profile.accessStatus === "revoked" ? "text-red-400" :
                  "text-yellow-400"
                }`}>
                  {profile.accessStatus === "granted" ? "Aktywny" :
                   profile.accessStatus === "revoked" ? "Wyłączony" : "Oczekujący"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <Key size={16} className="text-gray-500 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Zakres dostępu</div>
                <div className="text-sm font-medium text-white">
                  {profile.accessScope === "all" ? "Pełny dostęp" : "Brak"}
                </div>
              </div>
            </div>
            {profile.unlockCode && (
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                <Key size={16} className="text-blue-400 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500">Kod odblokowujący</div>
                  <div className="text-sm font-mono font-medium text-blue-400">{profile.unlockCode}</div>
                </div>
              </div>
            )}
            {profile.grantedAt && (
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                <Calendar size={16} className="text-gray-500 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500">Data nadania dostępu</div>
                  <div className="text-sm font-medium text-white">{formatDate(profile.grantedAt)}</div>
                </div>
              </div>
            )}
            {profile.accessSource && (
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                <Shield size={16} className="text-gray-500 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500">Źródło dostępu</div>
                  <div className="text-sm font-medium text-white">{profile.accessSource}</div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
