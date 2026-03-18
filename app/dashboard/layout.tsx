import { redirect } from "next/navigation";
import { getCurrentUser, isAuthConfigured } from "@/lib/auth";
import TrainingNav from "@/app/components/TrainingNav";
import OnboardingGuard from "@/app/components/OnboardingGuard";
import ChatBot from "@/app/components/ChatBot";

export default async function DashboardLayout({
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

  if (!user.onboardingDone) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-4 py-16">
        <OnboardingGuard />
      </main>
    );
  }

  return (
    <>
      <TrainingNav />
      {children}
      <ChatBot />
    </>
  );
}
