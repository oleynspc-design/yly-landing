"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  badge?: string;
  backLabel?: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, badge, backLabel, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#080808] text-gray-300">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 relative">
                <Image src="/logo.jpg" alt="YLY" fill className="object-contain group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-white font-black text-xl tracking-wider">YLY</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 text-sm font-medium transition-colors"
            >
              <ArrowLeft size={16} />
              {backLabel || "Powrót na stronę główną"}
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-12 pb-8 border-b border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
                {badge || "Dokument prawny"}
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">{title}</h1>
              <p className="text-gray-500 text-sm">{lastUpdated}</p>
            </div>

            {/* Body */}
            <div className="prose prose-invert prose-gray max-w-none
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:text-gray-400 [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-gray-400
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-gray-400
              [&_li]:mb-2 [&_li]:leading-relaxed
              [&_strong]:text-white [&_strong]:font-semibold
              [&_a]:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-300
            ">
              {children}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <span>© 2026 YLY. Wszelkie prawa zastrzeżone.</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/regulamin" className="hover:text-gray-400 transition-colors">Regulamin</Link>
            <Link href="/polityka-prywatnosci" className="hover:text-gray-400 transition-colors">Prywatność</Link>
            <Link href="/regulamin-sprzedazy" className="hover:text-gray-400 transition-colors">Sprzedaż</Link>
            <Link href="/faq" className="hover:text-gray-400 transition-colors">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
