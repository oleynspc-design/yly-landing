"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import Image from "next/image";

const langs: { code: Lang; label: string; flag: string }[] = [
  { code: "pl", label: "PL", flag: "🇵🇱" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "uk", label: "UA", flag: "🇺🇦" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

const authLabels: Record<Lang, string> = {
  pl: "Logowanie",
  en: "Sign in",
  uk: "Вхід",
  es: "Acceso",
};

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#mission", label: t.nav.mission },
    { href: "#offer", label: t.nav.offer },
    { href: "#community", label: t.nav.community },
    { href: "#about", label: t.nav.about },
    { href: "/sklep", label: "Sklep" },
  ];

  const currentLang = langs.find((l) => l.code === lang);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 relative">
              <Image
                src="/logo.jpg"
                alt="YLY Logo"
                fill
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-white font-black text-xl tracking-wider">YLY</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase hover:text-blue-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-all"
              >
                <span>{currentLang?.flag}</span>
                <span className="font-medium">{currentLang?.label}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA button */}
            <Link
              href="/logowanie"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-300 transition-all hover:text-white"
            >
              {authLabels[lang]}
            </Link>

            <a
              href="#offer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-blue-500/25"
            >
              {t.hero.cta1}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium uppercase tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/logowanie"
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium uppercase tracking-wide"
              >
                {authLabels[lang]}
              </Link>
              <a
                href="#offer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full mt-2"
              >
                {t.hero.cta1}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
