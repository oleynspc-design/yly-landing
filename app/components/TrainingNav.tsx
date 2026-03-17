"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { User, Settings, LogOut, Shield, ChevronDown, Menu, X, ShoppingCart, Video } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";

const langs: { code: Lang; label: string; flag: string }[] = [
  { code: "pl", label: "PL", flag: "🇵🇱" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "uk", label: "UA", flag: "🇺🇦" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

interface UserData {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin";
  avatarUrl: string | null;
  trainingAccessStatus: string;
  trainingAccessScope: string;
  packageType?: string;
}

export default function TrainingNav() {
  const { lang, setLang } = useLang();
  const [user, setUser] = useState<UserData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const currentLang = langs.find((l) => l.code === lang);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/szkolenie" className="flex items-center gap-2 group">
            <div className="w-8 h-8 relative">
              <Image
                src="/logo.jpg"
                alt="YLY Logo"
                fill
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-white font-black text-lg tracking-wider hidden sm:inline-block">YLY</span>
          </Link>
          <div className="hidden sm:flex items-center gap-1 text-sm">
            <Link
              href="/szkolenie"
              className="rounded-lg px-3 py-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              Szkolenia
            </Link>
            <Link
              href="/sklep"
              className="rounded-lg px-3 py-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              Sklep
            </Link>
            <Link
              href="/profil"
              className="rounded-lg px-3 py-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              Profil
            </Link>
            {(user?.packageType === "pro" || user?.packageType === "premium" || user?.role === "admin") && (
              <Link
                href="/szkolenie/spotkania"
                className="rounded-lg px-3 py-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <span className="flex items-center gap-1">
                  <Video size={14} />
                  Spotkania
                </span>
              </Link>
            )}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="rounded-lg px-3 py-1.5 text-purple-400 transition-colors hover:bg-purple-500/10 hover:text-purple-300"
              >
                <span className="flex items-center gap-1">
                  <Shield size={14} />
                  Admin
                </span>
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-all"
            >
              <span>{currentLang?.flag}</span>
              <span className="hidden sm:inline font-medium">{currentLang?.label}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`flex items-center gap-2 px-4 py-2.5 w-full text-left text-sm hover:bg-white/5 transition-colors ${
                      lang === l.code ? "text-blue-400" : "text-gray-300"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Admin quick-access button */}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 transition-all"
              title="Panel Admina"
            >
              <Shield size={16} />
            </Link>
          )}

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 sm:px-3 py-1.5 sm:py-2 text-sm text-gray-300 transition-all hover:bg-white/10"
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  width={28}
                  height={28}
                  className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                  <User size={14} />
                </div>
              )}
              <span className="hidden sm:inline max-w-[120px] truncate">
                {user?.fullName || "..."}
              </span>
              <ChevronDown size={14} className={`hidden sm:block transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-2xl shadow-black/40">
                <div className="border-b border-white/5 px-4 py-3">
                  <div className="text-sm font-semibold text-white">{user?.fullName}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      user?.trainingAccessStatus === "granted"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}>
                      {user?.trainingAccessStatus === "granted" ? "Aktywny" : "Oczekujący"}
                    </span>
                    {user?.role === "admin" && (
                      <span className="inline-flex rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-400">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                <div className="py-1">
                  <Link
                    href="/profil"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 transition-colors hover:bg-white/5"
                  >
                    <Settings size={16} />
                    Profil i ustawienia
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-purple-400 transition-colors hover:bg-purple-500/5"
                    >
                      <Shield size={16} />
                      Panel admina
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/5"
                  >
                    <LogOut size={16} />
                    Wyloguj się
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 sm:hidden transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-white/10 bg-[#0a0a0a]">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/szkolenie"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            >
              Szkolenia
            </Link>
            <Link
              href="/sklep"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <span className="flex items-center gap-2"><ShoppingCart size={16} /> Sklep</span>
            </Link>
            <Link
              href="/profil"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            >
              Profil
            </Link>
            {(user?.packageType === "pro" || user?.packageType === "premium" || user?.role === "admin") && (
              <Link
                href="/szkolenie/spotkania"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
              >
                <span className="flex items-center gap-2"><Video size={16} /> Spotkania</span>
              </Link>
            )}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-purple-400 hover:bg-purple-500/10"
              >
                Panel Admina
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
