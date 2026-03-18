import { redirect } from "next/navigation";
import { getCurrentUser, isAuthConfigured } from "@/lib/auth";
import TrainingNav from "@/app/components/TrainingNav";
import OnboardingGuard from "@/app/components/OnboardingGuard";
import HelplyWrapper from "@/app/components/HelplyWrapper";
import { AccessProviderWrapper } from "@/app/components/AccessProviderWrapper";

export default async function TrainingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isAuthConfigured()) {
    redirect("/logowanie?setup=1&next=/dashboard");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie?next=/dashboard");
  }

  // Allow demo users (pending) through — they see limited content
  // Only redirect if onboarding not done yet
  if (!user.onboardingDone) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-4 py-16">
        <OnboardingGuard />
      </main>
    );
  }

  const hasFullAccess = user.role === "admin" || (user.trainingAccessStatus === "granted" && user.trainingAccessScope === "all");

  // Determine banner message based on access level
  let bannerMsg = "";
  if (!hasFullAccess) {
    if (user.trainingAccessStatus === "granted") {
      bannerMsg = "Pakiet Basic — masz pełny dostęp do Podstaw Promptingu i semestr 1 pozostałych modułów.";
    } else {
      bannerMsg = "Tryb Demo — masz dostęp do semestru 1 modułu Podstawy Promptingu. Odblokuj pełny dostęp!";
    }
  }

  return (
    <AccessProviderWrapper>
      <TrainingNav />
      {!hasFullAccess && (
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-blue-500/20">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-blue-300">
              <span className="font-bold">{user.trainingAccessStatus === "granted" ? "Pakiet Basic" : "Tryb Demo"}</span> — {bannerMsg}
            </p>
            <a href="/sklep" className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all">
              Rozszerz dostęp
            </a>
          </div>
        </div>
      )}
      {children}
      <HelplyWrapper />
    </AccessProviderWrapper>
  );
}
