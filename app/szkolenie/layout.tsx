import { redirect } from "next/navigation";
import { getCurrentUser, isAuthConfigured } from "@/lib/auth";
import TrainingNav from "@/app/components/TrainingNav";
import OnboardingGuard from "@/app/components/OnboardingGuard";

export default async function TrainingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isAuthConfigured()) {
    redirect("/logowanie?setup=1&next=/szkolenie");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie?next=/szkolenie");
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

  return (
    <>
      <TrainingNav />
      {!hasFullAccess && (
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-blue-500/20">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-blue-300">
              <span className="font-bold">Tryb Demo</span> — masz dostęp do pierwszej lekcji każdego modułu. Odblokuj pełny dostęp!
            </p>
            <a href="/sklep" className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all">
              Kup dostęp
            </a>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
