"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Shield,
  Eye,
  KeyRound,
  Users,
  Loader2,
  Search,
  ArrowUpDown,
  Briefcase,
  Zap,
  CheckCircle,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Monitor,
  UserCheck,
  Unlock,
  AlertTriangle,
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
  industry: string | null;
  xp: number;
  onboarding_done: boolean;
};

const PKG_BADGE: Record<string, { label: string; cls: string }> = {
  basic: { label: "Basic", cls: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
  pro: { label: "Pro", cls: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  premium: { label: "Premium", cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
};

function resolveAccessTier(u: UserWithAccess): { label: string; cls: string; isDemo: boolean } {
  if (u.role === "admin") return { label: "Admin", cls: "text-purple-400 bg-purple-500/10 border-purple-500/20", isDemo: false };
  if (u.status === "granted" && u.granted_scope === "all") {
    if (u.package_type === "premium") return { label: "Premium", cls: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", isDemo: false };
    if (u.package_type === "pro") return { label: "Pro", cls: "text-blue-400 bg-blue-500/10 border-blue-500/20", isDemo: false };
    if (u.package_type === "basic") return { label: "Basic", cls: "text-gray-300 bg-gray-500/10 border-gray-500/20", isDemo: false };
    return { label: "Full", cls: "text-green-400 bg-green-500/10 border-green-500/20", isDemo: false };
  }
  if (u.status === "granted") return { label: "Partial", cls: "text-orange-400 bg-orange-500/10 border-orange-500/20", isDemo: false };
  return { label: "DEMO", cls: "text-red-400 bg-red-500/10 border-red-500/20", isDemo: true };
}

function isOnline(lastActive: string | null): boolean {
  if (!lastActive) return false;
  return Date.now() - new Date(lastActive).getTime() < 5 * 60 * 1000;
}

function timeAgo(date: string | null): string {
  if (!date) return "Nigdy";
  const diff = Date.now() - new Date(date).getTime();
  if (diff < 60000) return "Teraz";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min temu`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h temu`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d temu`;
  return new Date(date).toLocaleDateString("pl-PL");
}

type CurrentAdmin = { role: string };

const ROLE_CONFIG: Record<string, { label: string; color: string; icon: typeof Shield }> = {
  admin: { label: "Admin", color: "purple", icon: ShieldCheck },
  moderator: { label: "Moderator", color: "blue", icon: ShieldAlert },
  user: { label: "User", color: "gray", icon: Shield },
};

type SortKey = "name" | "created" | "xp" | "last_active" | "role" | "status";
type FilterAccess = "all" | "granted" | "pending" | "none" | "demo";
type FilterRole = "all" | "admin" | "moderator" | "user";

const PER_PAGE = 25;

export default function AdminPage() {
  const [users, setUsers] = useState<UserWithAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Record<string, string>>({});
  const [changingRole, setChangingRole] = useState<string | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<CurrentAdmin | null>(null);
  const [fixingAccess, setFixingAccess] = useState(false);
  const [fixMessage, setFixMessage] = useState<string | null>(null);
  const [showTools, setShowTools] = useState(false);
  const [quickGranting, setQuickGranting] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created");
  const [sortAsc, setSortAsc] = useState(false);
  const [filterAccess, setFilterAccess] = useState<FilterAccess>("all");
  const [filterRole, setFilterRole] = useState<FilterRole>("all");
  const [page, setPage] = useState(0);

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
      if (res.ok) await fetchUsers();
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
      if (res.ok) await fetchUsers();
    } catch (error) {
      console.error(error);
    } finally {
      setChangingRole(null);
    }
  };

  const isAdmin = currentAdmin?.role === "admin";

  const quickGrant = async (userId: string, pkg: string) => {
    setQuickGranting(userId);
    try {
      await fetch("/api/admin/fix-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "grant-single", userId, packageType: pkg }),
      });
      await fetchUsers();
    } catch (error) {
      console.error(error);
    } finally {
      setQuickGranting(null);
    }
  };

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

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
    setPage(0);
  };

  const filtered = useMemo(() => {
    let list = [...users];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(u =>
        u.full_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.industry && u.industry.toLowerCase().includes(q))
      );
    }
    if (filterAccess !== "all") {
      list = list.filter(u => {
        if (filterAccess === "granted") return u.status === "granted";
        if (filterAccess === "pending") return u.status === "pending";
        if (filterAccess === "demo") return resolveAccessTier(u).isDemo;
        return !u.status || (u.status !== "granted" && u.status !== "pending");
      });
    }
    if (filterRole !== "all") list = list.filter(u => u.role === filterRole);

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name": cmp = a.full_name.localeCompare(b.full_name); break;
        case "created": cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime(); break;
        case "xp": cmp = (a.xp || 0) - (b.xp || 0); break;
        case "last_active": cmp = (a.last_active ? new Date(a.last_active).getTime() : 0) - (b.last_active ? new Date(b.last_active).getTime() : 0); break;
        case "role": cmp = a.role.localeCompare(b.role); break;
        case "status": cmp = (a.status || "").localeCompare(b.status || ""); break;
      }
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [users, searchQuery, filterAccess, filterRole, sortKey, sortAsc]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const onlineCount = users.filter(u => isOnline(u.last_active)).length;
  const onboardedCount = users.filter(u => u.onboarding_done).length;
  const totalXp = users.reduce((s, u) => s + (u.xp || 0), 0);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
            <Users size={24} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Zarządzanie Użytkownikami</h1>
            <p className="text-sm text-gray-500">{users.length} użytkowników · {onlineCount} online</p>
          </div>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowTools(!showTools)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium hover:bg-yellow-500/20 transition-all"
          >
            <Wrench size={14} />
            {showTools ? "Ukryj narzędzia" : "Narzędzia"}
          </button>
        )}
      </div>

      {/* Admin Tools (collapsible) */}
      {showTools && (
        <div className="mb-6 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 animate-in fade-in">
          <h3 className="text-sm font-bold text-yellow-400 mb-3">Narzędzia naprawcze dostępu</h3>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => fixAccess("ensure-rows")} disabled={fixingAccess} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-medium transition-all">{fixingAccess ? "..." : "Utwórz brakujące rekordy (demo)"}</button>
            <button onClick={() => fixAccess("reset-all-to-demo")} disabled={fixingAccess} className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-medium transition-all">{fixingAccess ? "..." : "Resetuj wszystkich do demo"}</button>
            <button onClick={() => fixAccess("grant-all-access")} disabled={fixingAccess} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-xs font-medium transition-all">{fixingAccess ? "..." : "Nadaj wszystkim pełny dostęp"}</button>
          </div>
          {fixMessage && <p className="mt-2 text-xs text-gray-400">{fixMessage}</p>}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-6">
        <div className="rounded-xl border border-white/10 bg-[#111] p-3.5 text-center">
          <div className="text-xl font-bold text-white">{users.length}</div>
          <div className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Wszyscy</div>
        </div>
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-3.5 text-center">
          <div className="text-xl font-bold text-green-400">{onlineCount}</div>
          <div className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Online</div>
        </div>
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3.5 text-center">
          <div className="text-xl font-bold text-blue-400">{users.filter(u => u.status === "granted").length}</div>
          <div className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Z dostępem</div>
        </div>
        <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3.5 text-center">
          <div className="text-xl font-bold text-purple-400">{onboardedCount}</div>
          <div className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Onboarding</div>
        </div>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3.5 text-center">
          <div className="text-xl font-bold text-yellow-400">{totalXp.toLocaleString()}</div>
          <div className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">XP łącznie</div>
        </div>
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3.5 text-center">
          <div className="text-xl font-bold text-cyan-400">{users.filter(u => u.industry).length}</div>
          <div className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Z branżą</div>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3.5 text-center">
          <div className="flex items-center justify-center gap-1">
            <Monitor size={14} className="text-red-400" />
            <span className="text-xl font-bold text-red-400">{users.filter(u => resolveAccessTier(u).isDemo).length}</span>
          </div>
          <div className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Demo</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
            placeholder="Szukaj po nazwie, emailu lub branży..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white placeholder:text-gray-600 text-sm outline-none focus:border-blue-500/50"
          />
        </div>
        <div className="flex gap-2">
          <select
            title="Filtruj dostęp"
            value={filterAccess}
            onChange={(e) => { setFilterAccess(e.target.value as FilterAccess); setPage(0); }}
            className="rounded-xl border border-white/10 bg-[#111] px-3 py-2.5 text-xs text-gray-300 outline-none"
          >
            <option value="all">Dostęp: Wszystkie</option>
            <option value="granted">Aktywny</option>
            <option value="pending">Oczekujący</option>
            <option value="none">Brak</option>
            <option value="demo">Demo</option>
          </select>
          <select
            title="Filtruj rolę"
            value={filterRole}
            onChange={(e) => { setFilterRole(e.target.value as FilterRole); setPage(0); }}
            className="rounded-xl border border-white/10 bg-[#111] px-3 py-2.5 text-xs text-gray-300 outline-none"
          >
            <option value="all">Rola: Wszystkie</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500">
          Wyświetlono {page * PER_PAGE + 1}–{Math.min((page + 1) * PER_PAGE, filtered.length)} z {filtered.length}
          {filtered.length !== users.length && ` (filtrowano z ${users.length})`}
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30 transition-all"><ChevronLeft size={14} /></button>
            <span className="text-xs text-gray-500 px-2">{page + 1}/{totalPages}</span>
            <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30 transition-all"><ChevronRight size={14} /></button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111]">
        <table className="w-full min-w-[1050px] text-left text-sm text-gray-300">
          <thead className="bg-[#1a1a1a] text-[11px] font-semibold uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort("name")}>
                <span className="inline-flex items-center gap-1">Użytkownik <ArrowUpDown size={10} className={sortKey === "name" ? "text-blue-400" : ""} /></span>
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort("role")}>
                <span className="inline-flex items-center gap-1">Rola <ArrowUpDown size={10} className={sortKey === "role" ? "text-blue-400" : ""} /></span>
              </th>
              <th className="px-4 py-3">Pakiet</th>
              <th className="px-4 py-3 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort("status")}>
                <span className="inline-flex items-center gap-1">Dostęp <ArrowUpDown size={10} className={sortKey === "status" ? "text-blue-400" : ""} /></span>
              </th>
              <th className="px-4 py-3">Branża</th>
              <th className="px-4 py-3 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort("xp")}>
                <span className="inline-flex items-center gap-1">XP <ArrowUpDown size={10} className={sortKey === "xp" ? "text-blue-400" : ""} /></span>
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort("last_active")}>
                <span className="inline-flex items-center gap-1">Aktywność <ArrowUpDown size={10} className={sortKey === "last_active" ? "text-blue-400" : ""} /></span>
              </th>
              <th className="px-4 py-3 text-right">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {paged.map((u) => {
              const rc = ROLE_CONFIG[u.role] || ROLE_CONFIG.user;
              const RoleIcon = rc.icon;
              return (
                <tr key={u.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className={`inline-block h-2 w-2 rounded-full flex-shrink-0 ${isOnline(u.last_active) ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" : "bg-gray-700"}`} />
                      <div className="min-w-0">
                        <div className="font-medium text-white text-sm truncate">{u.full_name}</div>
                        <div className="text-gray-600 text-[11px] truncate">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {isAdmin ? (
                      <div className="relative">
                        <select title="Zmień rolę" value={u.role} onChange={(e) => changeRole(u.id, e.target.value)} disabled={changingRole === u.id}
                          className={`appearance-none cursor-pointer rounded-lg border px-2.5 py-1 pr-6 text-[11px] font-medium outline-none transition-colors disabled:opacity-50 bg-[#0a0a0a] ${u.role === "admin" ? "border-purple-500/30 text-purple-400" : u.role === "moderator" ? "border-blue-500/30 text-blue-400" : "border-white/10 text-gray-400"}`}
                        >
                          <option value="user">User</option>
                          <option value="moderator">Mod</option>
                          <option value="admin">Admin</option>
                        </select>
                        {changingRole === u.id && <Loader2 size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />}
                      </div>
                    ) : (
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${u.role === "admin" ? "bg-purple-500/10 text-purple-400" : u.role === "moderator" ? "bg-blue-500/10 text-blue-400" : "bg-gray-500/10 text-gray-400"}`}>
                        <RoleIcon size={10} />{rc.label}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {(() => {
                      const pkg = PKG_BADGE[u.package_type || "basic"] || PKG_BADGE.basic;
                      return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${pkg.cls}`}>{pkg.label}</span>;
                    })()}
                  </td>
                  <td className="px-4 py-3">
                    {(() => {
                      const tier = resolveAccessTier(u);
                      return (
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${tier.cls}`}>
                          {tier.isDemo && <AlertTriangle size={9} />}
                          {tier.label}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-3">
                    {u.industry ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                        <Briefcase size={10} className="text-gray-600" />{u.industry}
                      </span>
                    ) : <span className="text-gray-700 text-[11px]">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium">
                      <Zap size={10} className="text-yellow-500" />
                      <span className={u.xp > 0 ? "text-yellow-400" : "text-gray-700"}>{u.xp || 0}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {u.onboarding_done && <span title="Onboarding ukończony"><ClipboardCheck size={10} className="text-cyan-500" /></span>}
                      <span className="text-[11px] text-gray-500">{timeAgo(u.last_active)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`/admin/users/${u.id}`} className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white">
                        <Eye size={12} /> Profil
                      </Link>
                      {isAdmin && u.status !== "granted" && u.role !== "admin" && (
                        <>
                          <div className="flex items-center gap-1">
                            <select title="Pakiet" value={selectedPackage[u.id] || "basic"} onChange={(e) => setSelectedPackage((p) => ({ ...p, [u.id]: e.target.value }))}
                              className="appearance-none rounded-lg border border-white/10 bg-[#0a0a0a] px-1.5 py-1.5 text-[11px] text-gray-300 outline-none">
                              <option value="basic">Basic</option>
                              <option value="pro">Pro</option>
                              <option value="premium">Premium</option>
                            </select>
                            <button onClick={() => generateCode(u.id)} disabled={generating === u.id}
                              className="inline-flex items-center gap-1 rounded-lg bg-blue-600/20 px-2.5 py-1.5 text-[11px] font-medium text-blue-400 transition-colors hover:bg-blue-600/30 disabled:opacity-50">
                              <KeyRound size={12} />{generating === u.id ? "..." : "Kod"}
                            </button>
                          </div>
                          <button onClick={() => quickGrant(u.id, selectedPackage[u.id] || "pro")} disabled={quickGranting === u.id}
                            className="inline-flex items-center gap-1 rounded-lg bg-green-600/20 px-2 py-1.5 text-[11px] font-medium text-green-400 transition-colors hover:bg-green-600/30 disabled:opacity-50">
                            <Unlock size={11} />{quickGranting === u.id ? "..." : "Grant"}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30 text-xs transition-all"><ChevronLeft size={12} className="inline mr-1" />Poprzednia</button>
          <span className="text-xs text-gray-500">{page + 1} z {totalPages}</span>
          <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30 text-xs transition-all">Następna<ChevronRight size={12} className="inline ml-1" /></button>
        </div>
      )}
    </div>
  );
}
