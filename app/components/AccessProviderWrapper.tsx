"use client";
import { AccessProvider } from "@/app/components/DemoGate";

export function AccessProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AccessProvider>{children}</AccessProvider>;
}
