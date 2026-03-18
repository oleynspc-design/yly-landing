import OnboardingQuiz from "@/app/components/OnboardingQuiz";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center">
      <OnboardingQuiz redirectTo="/dashboard" />
    </main>
  );
}
