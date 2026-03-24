"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, FolderKanban, Sparkles, CheckCircle, Gift } from "lucide-react";

export default function OleyClientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Newsletter
  const [nlEmail, setNlEmail] = useState("");
  const [nlName, setNlName] = useState("");
  const [nlLoading, setNlLoading] = useState(false);
  const [nlResult, setNlResult] = useState<{ discountCode?: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/oley/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Błąd logowania");
        return;
      }

      if (data.user.role === "admin") {
        router.push("/oley/admin");
      } else {
        router.push("/oley/panel");
      }
    } catch {
      setError("Błąd połączenia z serwerem");
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNlLoading(true);
    setNlResult(null);
    try {
      const res = await fetch("/api/oley/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nlEmail, fullName: nlName, source: "client-login" }),
      });
      const data = await res.json();
      if (res.ok) {
        setNlResult({ discountCode: data.discountCode, message: data.message });
        setNlEmail("");
        setNlName("");
      } else {
        setNlResult({ message: data.error || "Wystąpił błąd" });
      }
    } catch {
      setNlResult({ message: "Błąd połączenia z serwerem" });
    } finally {
      setNlLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 mb-4">
            <FolderKanban size={32} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">OleyDesign</h1>
          <p className="text-gray-500 mt-2">Panel Klienta — śledź postępy swojego projektu</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="bg-[#111] rounded-2xl border border-white/10 p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@email.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-white placeholder:text-gray-600 text-sm outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Hasło</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-white placeholder:text-gray-600 text-sm outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs">
          Dane logowania otrzymasz od OleyDesign po podpisaniu umowy.
        </p>

        {/* Newsletter signup with 15% discount */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/10 rounded-2xl border border-emerald-500/20 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Gift size={20} className="text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Zapisz się na newsletter</h3>
            </div>
            <p className="text-sm text-gray-400 mb-1">
              Otrzymaj <span className="text-emerald-400 font-bold text-base">-15% zniżki</span> na dowolną usługę OleyDesign!
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Bądź na bieżąco z nowościami, poradami i ekskluzywnymi ofertami.
            </p>

            {nlResult ? (
              <div className={`rounded-xl p-4 ${nlResult.discountCode ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-white/5 border border-white/10"}`}>
                <div className="flex items-start gap-2">
                  {nlResult.discountCode ? (
                    <CheckCircle size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Sparkles size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm text-gray-300">{nlResult.message}</p>
                    {nlResult.discountCode && (
                      <div className="mt-3 bg-[#0a0a0a] rounded-lg p-3 text-center border border-emerald-500/30">
                        <p className="text-[10px] text-emerald-400 uppercase font-semibold tracking-widest mb-1">Twój kod zniżkowy</p>
                        <p className="text-2xl font-black text-white tracking-widest font-mono">{nlResult.discountCode}</p>
                        <p className="text-xs text-emerald-400 mt-1 font-medium">-15% na dowolną usługę</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nlName}
                    onChange={(e) => setNlName(e.target.value)}
                    placeholder="Imię (opcjonalnie)"
                    className="w-1/3 px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white placeholder:text-gray-600 text-sm outline-none focus:border-emerald-500/50 transition-colors"
                  />
                  <input
                    type="email"
                    value={nlEmail}
                    onChange={(e) => setNlEmail(e.target.value)}
                    placeholder="Twój adres email"
                    required
                    className="flex-1 px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white placeholder:text-gray-600 text-sm outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={nlLoading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {nlLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  {nlLoading ? "Zapisywanie..." : "Zapisz się i odbierz -15%"}
                </button>
                <p className="text-[10px] text-gray-600 text-center">
                  Kod zniżkowy wyślemy na Twój email. Bez spamu, obiecujemy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
