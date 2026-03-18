"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Wrench,
  ShoppingBag,
  User,
  BookOpen,
  Shield,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface UserData {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin";
  avatarUrl: string | null;
}

const tiles = [
  {
    id: "szkolenia",
    title: "Szkolenia",
    desc: "Moduły, lekcje i ćwiczenia AI",
    icon: GraduationCap,
    href: "/szkolenie",
    color: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/20",
  },
  {
    id: "narzedzia",
    title: "Narzędzia",
    desc: "PROMPTLY, Helply i więcej",
    icon: Wrench,
    href: "/szkolenie/promptly",
    color: "from-emerald-500 to-teal-500",
    bgGlow: "bg-emerald-500/20",
  },
  {
    id: "sklep",
    title: "Sklep",
    desc: "Pakiety i rozszerzenia",
    icon: ShoppingBag,
    href: "/sklep",
    color: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
  },
  {
    id: "profil",
    title: "Profil",
    desc: "Twoje ustawienia i postępy",
    icon: User,
    href: "/profil",
    color: "from-orange-500 to-amber-500",
    bgGlow: "bg-orange-500/20",
  },
  {
    id: "baza-wiedzy",
    title: "Baza Wiedzy",
    desc: "Artykuły i poradniki (wkrótce)",
    icon: BookOpen,
    href: "#",
    color: "from-indigo-500 to-violet-500",
    bgGlow: "bg-indigo-500/20",
    comingSoon: true,
  },
];

const adminTile = {
  id: "admin",
  title: "Panel Admina",
  desc: "Zarządzaj użytkownikami i treścią",
  icon: Shield,
  href: "/admin",
  color: "from-red-500 to-rose-500",
  bgGlow: "bg-red-500/20",
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allTiles = user?.role === "admin" ? [...tiles, adminTile] : tiles;

  const getFirstName = (fullName: string | undefined) => {
    if (!fullName) return "";
    return fullName.split(" ")[0];
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#080808] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {loading ? (
                <span className="inline-block w-48 h-10 bg-white/10 rounded-lg animate-pulse" />
              ) : (
                <>
                  Witaj, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{getFirstName(user?.fullName) || "Użytkowniku"}</span>! 👋
                </>
              )}
            </h1>
          </div>
          <p className="text-gray-400 text-lg ml-11">
            Co chcesz dziś zrobić?
          </p>
        </motion.div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allTiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={tile.comingSoon ? "#" : tile.href}
                className={`group relative block rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 transition-all hover:border-white/20 hover:bg-[#141414] ${
                  tile.comingSoon ? "cursor-not-allowed opacity-60" : ""
                }`}
                onClick={(e) => tile.comingSoon && e.preventDefault()}
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl ${tile.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tile.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <tile.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                      {tile.title}
                      {tile.comingSoon && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-medium">
                          Wkrótce
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{tile.desc}</p>
                  </div>
                  {!tile.comingSoon && (
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]"
        >
          <p className="text-center text-gray-600 text-sm">
            💡 <span className="text-gray-400">Tip:</span> Zacznij od modułu <Link href="/szkolenie/podstawy-promptingu" className="text-blue-400 hover:underline">Podstawy Promptingu</Link> jeśli dopiero zaczynasz przygodę z AI!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
