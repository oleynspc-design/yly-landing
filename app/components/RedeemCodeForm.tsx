"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RedeemCodeForm() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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

      setSuccess(true);
      setTimeout(() => {
        router.push(data.redirectTo || "/szkolenie");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Wystąpił błąd");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6 text-center text-green-400">
        <div className="mb-2 text-xl font-bold">Dostęp odblokowany!</div>
        <p>Za chwilę nastąpi przekierowanie do szkolenia...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-white/10 bg-[#111] p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Masz kod dostępu?</h3>
      <p className="mb-6 text-sm text-gray-400">
        Jeśli otrzymałeś kod odblokowujący na e-mail (np. po zakupie), wpisz go poniżej, aby uzyskać pełny dostęp do szkoleń.
      </p>
      
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Wpisz swój kod"
          required
          className="flex-1 rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50"
        />
        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sprawdzam..." : "Odblokuj"}
        </button>
      </div>
    </form>
  );
}
