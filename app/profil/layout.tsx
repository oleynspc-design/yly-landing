import { redirect } from "next/navigation";
import { getCurrentUser, isAuthConfigured } from "@/lib/auth";
import TrainingNav from "@/app/components/TrainingNav";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isAuthConfigured()) {
    redirect("/logowanie?next=/profil");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie?next=/profil");
  }

  return (
    <>
      <TrainingNav />
      {children}
    </>
  );
}
