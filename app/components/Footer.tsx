"use client";
import { useLang } from "../context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

import { legalUI } from "../translations/legal-ui";

export default function Footer() {
  const { lang, t } = useLang();
  const ui = legalUI[lang];

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 relative">
              <Image src="/logo.jpg" alt="YLY" fill className="object-contain" />
            </div>
            <div>
              <div className="text-white font-black text-lg tracking-wider">YLY</div>
              <div className="text-gray-600 text-xs">{t.footer.by}</div>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <a href="#mission" className="hover:text-gray-400 transition-colors">{t.nav.mission}</a>
            <a href="#offer" className="hover:text-gray-400 transition-colors">{t.nav.offer}</a>
            <a href="#community" className="hover:text-gray-400 transition-colors">{t.nav.community}</a>
            <a href="#about" className="hover:text-gray-400 transition-colors">{t.nav.about}</a>
            <Link href="/sklep" className="hover:text-gray-400 transition-colors">Sklep</Link>
          </div>

          {/* Copyright */}
          <div className="text-gray-600 text-sm">{t.footer.copy}</div>
        </div>

        {/* Legal links */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
            <Link href="/regulamin" className="hover:text-gray-400 transition-colors">{ui.footerRegulamin}</Link>
            <span className="text-gray-800">|</span>
            <Link href="/polityka-prywatnosci" className="hover:text-gray-400 transition-colors">{ui.footerPrivacy}</Link>
            <span className="text-gray-800">|</span>
            <Link href="/regulamin-sprzedazy" className="hover:text-gray-400 transition-colors">{ui.footerSales}</Link>
            <span className="text-gray-800">|</span>
            <Link href="/faq" className="hover:text-gray-400 transition-colors">{ui.footerFaq}</Link>
            <span className="text-gray-800">|</span>
            <Link href="/regulamin-chatbota" className="hover:text-gray-400 transition-colors">{ui.footerChatbot}</Link>
          </div>
          <Link
            href="https://oleydesign.pl"
            className="inline-flex items-center gap-3 text-xs text-gray-700 transition-colors hover:text-gray-300"
          >
            <span>Projekt i wykonanie:</span>
            <span className="text-sm font-black tracking-[0.22em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-violet-500">
              oleydesign
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
