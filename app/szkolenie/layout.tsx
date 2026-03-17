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

  if (user.role !== "admin" && (user.trainingAccessStatus !== "granted" || user.trainingAccessScope !== "all")) {
    redirect("/ograniczony-dostep");
  }

  return (
    <>
      {!user.onboardingDone && <OnboardingGuard />}
      <TrainingNav />
      {children}
    </>
  );
}
