"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { Lock } from "lucide-react";
import Link from "next/link";

interface AccessInfo {
  hasFullAccess: boolean;
  loading: boolean;
}

const AccessContext = createContext<AccessInfo>({ hasFullAccess: false, loading: true });

export function useAccess() {
  return useContext(AccessContext);
}

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const [hasFullAccess, setHasFullAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          const u = data.user;
          setHasFullAccess(
            u.role === "admin" || (u.trainingAccessStatus === "granted" && u.trainingAccessScope === "all")
          );
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <AccessContext.Provider value={{ hasFullAccess, loading }}>
      {children}
    </AccessContext.Provider>
  );
}

export function isLessonLocked(lessonIndex: number, hasFullAccess: boolean): boolean {
  if (hasFullAccess) return false;
  return lessonIndex > 0;
}

export function LessonLockOverlay() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#080808]/90 backdrop-blur-sm">
      <div className="max-w-md text-center p-8 rounded-3xl border border-blue-500/20 bg-[#0f0f0f]">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
          <Lock size={32} className="text-blue-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-3">Ta lekcja jest zablokowana</h2>
        <p className="text-gray-400 mb-6">
          W trybie demo masz dostęp do pierwszej lekcji każdego modułu. Odblokuj pełny dostęp, aby kontynuować naukę.
        </p>
        <Link
          href="/sklep"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all hover:shadow-lg hover:shadow-blue-500/25"
        >
          Odblokuj pełny dostęp
        </Link>
        <div className="mt-4">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
            Wróć do dashboardu
          </Link>
        </div>
      </div>
    </div>
  );
}
