import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || (user.role !== "admin" && user.role !== "moderator")) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      <header className="border-b border-white/10 bg-[#111] px-4 sm:px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="text-lg sm:text-xl font-bold text-white">YLY Admin Panel</div>
          <div className="text-xs sm:text-sm text-gray-400 truncate max-w-full">{user.email}</div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4 sm:p-6">{children}</main>
    </div>
  );
}
