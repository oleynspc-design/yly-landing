"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function OnboardingGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.includes("/onboarding")) return;
    router.replace("/szkolenie/onboarding");
  }, [pathname, router]);

  return null;
}
