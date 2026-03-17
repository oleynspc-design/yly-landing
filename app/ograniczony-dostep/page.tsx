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
        <OnboardingQuiz redirectTo="/szkolenie" />
      </main>
    );
  }

  // After onboarding, send to training demo mode
  redirect("/szkolenie");
}
