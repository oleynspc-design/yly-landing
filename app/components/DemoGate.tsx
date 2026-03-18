"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { Lock } from "lucide-react";
import Link from "next/link";

// ────────────────────────────────────────────────
// Access tiers:
//   "demo"    → only semester 1 of podstawy-promptingu, everything else locked
//   "basic"   → full podstawy-promptingu, semester 1 of other modules
//   "pro"     → all modules full access
//   "premium" → all modules full access + meetings
//   "admin"   → everything
// ────────────────────────────────────────────────

export type AccessTier = "demo" | "basic" | "pro" | "premium" | "admin";

interface AccessInfo {
  hasFullAccess: boolean;
  accessTier: AccessTier;
  packageType: string;
  role: string;
  loading: boolean;
}

const AccessContext = createContext<AccessInfo>({
  hasFullAccess: false,
  accessTier: "demo",
  packageType: "demo",
  role: "user",
  loading: true,
});

export function useAccess() {
  return useContext(AccessContext);
}

function resolveAccessTier(role: string, accessStatus: string, accessScope: string, packageType: string): AccessTier {
  if (role === "admin") return "admin";
  if (accessStatus === "granted" && accessScope === "all") {
    if (packageType === "premium") return "premium";
    if (packageType === "pro") return "pro";
    if (packageType === "basic") return "basic";
    // granted + all but no specific package → full access (pro level)
    return "pro";
  }
  // Any granted status but not scope=all → basic
  if (accessStatus === "granted") return "basic";
  return "demo";
}

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const [accessTier, setAccessTier] = useState<AccessTier>("demo");
  const [packageType, setPackageType] = useState("demo");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          const u = data.user;
          const tier = resolveAccessTier(
            u.role,
            u.trainingAccessStatus || "pending",
            u.trainingAccessScope || "none",
            u.packageType || "demo"
          );
          setAccessTier(tier);
          setPackageType(u.packageType || "demo");
          setRole(u.role || "user");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const hasFullAccess = accessTier === "admin" || accessTier === "pro" || accessTier === "premium";

  return (
    <AccessContext.Provider value={{ hasFullAccess, accessTier, packageType, role, loading }}>
      {children}
    </AccessContext.Provider>
  );
}

// ────────────────────────────────────────────────
// Module-aware access checks
// ────────────────────────────────────────────────

// Whether a user can access a module at all (even partially)
export function isModuleAccessible(moduleId: string, accessTier: AccessTier): boolean {
  if (accessTier === "admin" || accessTier === "pro" || accessTier === "premium") return true;
  if (accessTier === "basic") return true; // basic has sem1 of every module + full podstawy
  // demo → only podstawy-promptingu
  return moduleId === "podstawy-promptingu";
}

// Whether a specific lesson is locked in a given module
export function isLessonLocked(lessonIndex: number, hasFullAccess: boolean, moduleId?: string, accessTier?: AccessTier): boolean {
  const tier = accessTier ?? (hasFullAccess ? "admin" : "demo");
  if (tier === "admin" || tier === "pro" || tier === "premium") return false;

  if (tier === "basic") {
    // basic: full access to podstawy-promptingu, sem1 (lessons 0-2) for others
    if (moduleId === "podstawy-promptingu") return false;
    return lessonIndex > 2;
  }

  // demo: only sem1 of podstawy-promptingu
  if (moduleId !== "podstawy-promptingu") return true; // all lessons locked in other modules
  return lessonIndex > 2;
}

// Whether a semester is locked in a given module
export function isSemesterLocked(semesterId: number, hasFullAccess: boolean, moduleId?: string, accessTier?: AccessTier): boolean {
  const tier = accessTier ?? (hasFullAccess ? "admin" : "demo");
  if (tier === "admin" || tier === "pro" || tier === "premium") return false;

  if (tier === "basic") {
    if (moduleId === "podstawy-promptingu") return false;
    return semesterId > 1;
  }

  // demo
  if (moduleId !== "podstawy-promptingu") return true;
  return semesterId > 1;
}

// ────────────────────────────────────────────────
// Overlay components
// ────────────────────────────────────────────────

export function ModuleLockOverlay() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#080808]/90 backdrop-blur-sm">
      <div className="max-w-md text-center p-8 rounded-3xl border border-blue-500/20 bg-[#0f0f0f]">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
          <Lock size={32} className="text-blue-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-3">Ten moduł jest zablokowany</h2>
        <p className="text-gray-400 mb-6">
          W trybie demo masz dostęp tylko do pierwszego semestru modułu &quot;Podstawy Promptingu&quot;. Odblokuj pełny dostęp, aby kontynuować naukę.
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

export function LessonLockOverlay() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#080808]/90 backdrop-blur-sm">
      <div className="max-w-md text-center p-8 rounded-3xl border border-blue-500/20 bg-[#0f0f0f]">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
          <Lock size={32} className="text-blue-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-3">Ta lekcja jest zablokowana</h2>
        <p className="text-gray-400 mb-6">
          W trybie demo masz dostęp tylko do pierwszego semestru. Odblokuj pełny dostęp, aby kontynuować naukę.
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
