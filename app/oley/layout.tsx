import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OleyDesign — Panel Klienta",
  description: "Panel zarządzania projektami OleyDesign",
};

export default function OleyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
