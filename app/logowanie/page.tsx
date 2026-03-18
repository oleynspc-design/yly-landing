import { redirect } from "next/navigation";
import { Suspense } from "react";
import AuthForm from "@/app/components/AuthForm";
import { getCurrentUser, isAuthConfigured } from "@/lib/auth";

export default async function LoginPage() {
  if (isAuthConfigured()) {
    const user = await getCurrentUser();

    if (user) {
      redirect(
        user.trainingAccessStatus === "granted" && user.trainingAccessScope === "all"
          ? "/dashboard"
          : "/ograniczony-dostep"
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-4 py-16">
      <Suspense fallback={null}>
        <AuthForm mode="login" />
      </Suspense>
    </main>
  );
}
