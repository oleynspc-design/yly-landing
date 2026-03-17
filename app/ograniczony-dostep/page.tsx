import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/components/LogoutButton";
import RedeemCodeForm from "@/app/components/RedeemCodeForm";
import OnboardingQuiz from "@/app/components/OnboardingQuiz";
import { getCurrentUser, isAuthConfigured } from "@/lib/auth";

export default async function RestrictedAccessPage() {
  if (!isAuthConfigured()) {
    redirect("/logowanie?setup=1&next=/szkolenie");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie?next=/szkolenie");
  }

  if (user.trainingAccessStatus === "granted" && user.trainingAccessScope === "all") {
    redirect("/szkolenie");
  }

  // Show onboarding quiz first if not completed
  if (!user.onboardingDone) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-4 py-16">
        <OnboardingQuiz redirectTo="/ograniczony-dostep" />
      </main>
    );
  }

  const statusText = user.trainingAccessStatus === "revoked"
    ? "Twój dostęp do szkolenia został obecnie wyłączony przez system."
    : "Twoje konto zostało zapisane, ale dostęp do szkolenia nie został jeszcze nadany przez system.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-4 py-16">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0f0f0f] p-8 shadow-2xl shadow-black/20">
        <div className="mb-4 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
          Ograniczony dostęp
        </div>
        <h1 className="mb-4 text-3xl font-black text-white">Strefa szkoleniowa jest zablokowana</h1>
        <p className="mb-4 text-base leading-relaxed text-gray-300">{statusText}</p>
        <div className="mb-8 rounded-2xl border border-white/10 bg-[#111] p-5">
          <div className="mb-2 text-sm font-medium text-gray-400">Konto</div>
          <div className="text-lg font-semibold text-white">{user.fullName}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
            <div>Status dostępu: <span className="font-semibold text-yellow-400">{user.trainingAccessStatus}</span></div>
            {user.role === 'admin' && (
              <Link href="/admin" className="text-blue-400 hover:text-blue-300 transition-colors">
                Przejdź do panelu admina &rarr;
              </Link>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 text-center">
          <h3 className="mb-2 text-lg font-bold text-white">Chcesz odblokować dostęp?</h3>
          <p className="mb-4 text-sm text-gray-400">
            Kup kurs lub pakiet w naszym sklepie — dostęp zostanie aktywowany automatycznie po płatności.
          </p>
          <Link
            href="/sklep"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Przejdź do sklepu →
          </Link>
        </div>

        <RedeemCodeForm />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Wróć na landing page
          </Link>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
