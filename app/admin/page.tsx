"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Shield,
  Eye,
  KeyRound,
  Users,
  Loader2,
} from "lucide-react";

type UserWithAccess = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  status: string | null;
  granted_scope: string | null;
  unlock_code: string | null;
  package_type: string | null;
  last_active: string | null;
};

const PKG_BADGE: Record<string, { label: string; cls: string }> = {
  basic: { label: "Basic", cls: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
  pro: { label: "Pro", cls: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  premium: { label: "Premium", cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
};

function isOnline(lastActive: string | null): boolean {
  if (!lastActive) return false;
  return Date.now() - new Date(lastActive).getTime() < 5 * 60 * 1000; // 5 min
}

type CurrentAdmin = {
  role: string;
};

const ROLE_CONFIG: Record<string, { label: string; color: string; icon: typeof Shield }> = {
  admin: { label: "Admin", color: "purple", icon: ShieldCheck },
  moderator: { label: "Moderator", color: "blue", icon: ShieldAlert },
  user: { label: "User", color: "gray", icon: Shield },
};

export default function AdminPage() {
  const [users, setUsers] = useState<UserWithAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Record<string, string>>({});
  const [changingRole, setChangingRole] = useState<string | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<CurrentAdmin | null>(null);
  const [fixingAccess, setFixingAccess] = useState(false);
  const [fixMessage, setFixMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchCurrentAdmin();
  }, []);

  const fetchCurrentAdmin = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.user) setCurrentAdmin({ role: data.user.role });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateCode = async (userId: string) => {
    setGenerating(userId);
    try {
      const packageType = selectedPackage[userId] || "basic";
      const res = await fetch("/api/admin/codes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, packageType }),
      });
      if (res.ok) {
        await fetchUsers();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setGenerating(null);
    }
  };

  const changeRole = async (userId: string, role: string) => {
    setChangingRole(userId);
    try {
      const res = await fetch("/api/admin/users/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role }),
      });
      if (res.ok) {
        await fetchUsers();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setChangingRole(null);
    }
  };

  const isAdmin = currentAdmin?.role === "admin";

  const fixAccess = async (action: string) => {
    setFixingAccess(true);
    setFixMessage(null);
    try {
      const res = await fetch("/api/admin/fix-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (res.ok) {
        setFixMessage(data.message);
        await fetchUsers();
      } else {
        setFixMessage(data.error || "Błąd");
      }
    } catch {
      setFixMessage("Błąd połączenia");
    } finally {
      setFixingAccess(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Users size={28} className="text-blue-400" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Zarządzanie Użytkownikami</h1>
          <p className="text-sm text-gray-500 mt-1">{users.length} użytkowników w systemie</p>
        </div>
      </div>

      {/* Admin Tools */}
      <div className="mb-8 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
        <h3 className="text-sm font-bold text-yellow-400 mb-3">🛠️ Narzędzia naprawcze dostępu</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => fixAccess("ensure-rows")}
            disabled={fixingAccess}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-medium transition-all"
          >
            {fixingAccess ? "..." : "Utwórz brakujące rekordy (demo)"}
          </button>
          <button
            onClick={() => fixAccess("reset-all-to-demo")}
            disabled={fixingAccess}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-medium transition-all"
          >
            {fixingAccess ? "..." : "Resetuj wszystkich do demo"}
          </button>
          <button
            onClick={() => fixAccess("grant-all-access")}
            disabled={fixingAccess}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-xs font-medium transition-all"
          >
            {fixingAccess ? "..." : "Nadaj wszystkim pełny dostęp"}
          </button>
        </div>
        {fixMessage && (
          <p className="mt-2 text-xs text-gray-400">{fixMessage}</p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-white/10 bg-[#111] p-4 text-center">
          <div className="text-2xl font-bold text-white">{users.length}</div>
          <div className="text-xs text-gray-500">Wszyscy</div>
        </div>
        <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{users.filter(u => u.role === "admin").length}</div>
          <div className="text-xs text-gray-500">Adminów</div>
        </div>
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{users.filter(u => u.role === "moderator").length}</div>
          <div className="text-xs text-gray-500">Moderatorów</div>
        </div>
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{users.filter(u => u.status === "granted").length}</div>
          <div className="text-xs text-gray-500">Z dostępem</div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111]">
        <table className="w-full min-w-[900px] text-left text-sm text-gray-300">
          <thead className="bg-[#1a1a1a] text-xs font-semibold uppercase text-gray-400">
            <tr>
              <th className="px-6 py-4">Użytkownik</th>
              <th className="px-6 py-4">Rola</th>
              <th className="px-6 py-4">Pakiet</th>
              <th className="px-6 py-4">Dostęp</th>
              <th className="px-6 py-4">Kod</th>
              <th className="px-6 py-4 text-right">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((u) => {
              const rc = ROLE_CONFIG[u.role] || ROLE_CONFIG.user;
              const RoleIcon = rc.icon;
              return (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block h-2.5 w-2.5 rounded-full flex-shrink-0 ${isOnline(u.last_active) ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" : "bg-gray-600"}`} title={isOnline(u.last_active) ? "Online" : u.last_active ? `Ostatnio: ${new Date(u.last_active).toLocaleString("pl-PL")}` : "Nigdy"} />
                      <div>
                        <div className="font-medium text-white">{u.full_name}</div>
                        <div className="text-gray-500 text-xs">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {isAdmin ? (
                      <div className="relative">
                        <select
                          title="Zmień rolę użytkownika"
                          value={u.role}
                          onChange={(e) => changeRole(u.id, e.target.value)}
                          disabled={changingRole === u.id}
                          className={`appearance-none cursor-pointer rounded-lg border px-3 py-1.5 pr-7 text-xs font-medium outline-none transition-colors disabled:opacity-50 bg-[#0a0a0a] ${
                            u.role === "admin"
                              ? "border-purple-500/30 text-purple-400"
                              : u.role === "moderator"
                              ? "border-blue-500/30 text-blue-400"
                              : "border-white/10 text-gray-400"
                          }`}
                        >
                          <option value="user">User</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                        {changingRole === u.id && (
                          <Loader2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />
                        )}
                      </div>
                    ) : (
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        u.role === "admin"
                          ? "bg-purple-500/10 text-purple-400"
                          : u.role === "moderator"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-gray-500/10 text-gray-400"
                      }`}>
                        <RoleIcon size={12} />
                        {rc.label}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {(() => {
                      const pkg = PKG_BADGE[u.package_type || "basic"] || PKG_BADGE.basic;
                      return (
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold uppercase ${pkg.cls}`}>
                          {pkg.label}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      u.status === "granted"
                        ? "bg-green-500/10 text-green-400"
                        : u.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-red-500/10 text-red-400"
                    }`}>
                      {u.status === "granted" ? "Aktywny" : u.status === "pending" ? "Oczekujący" : u.status || "Brak"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-blue-400">
                    {u.unlock_code || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${u.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <Eye size={14} />
                        Profil
                      </Link>
                      {isAdmin && u.status !== "granted" && (
                        <div className="flex items-center gap-1.5">
                          <select
                            title="Pakiet"
                            value={selectedPackage[u.id] || "basic"}
                            onChange={(e) => setSelectedPackage((p) => ({ ...p, [u.id]: e.target.value }))}
                            className="appearance-none rounded-lg border border-white/10 bg-[#0a0a0a] px-2 py-1.5 text-xs text-gray-300 outline-none"
                          >
                            <option value="basic">Basic</option>
                            <option value="pro">Pro</option>
                            <option value="premium">Premium</option>
                          </select>
                          <button
                            onClick={() => generateCode(u.id)}
                            disabled={generating === u.id}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/20 px-3 py-1.5 text-xs font-medium text-blue-400 transition-colors hover:bg-blue-600/30 disabled:opacity-50"
                          >
                            <KeyRound size={14} />
                            {generating === u.id ? "..." : "Generuj"}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
