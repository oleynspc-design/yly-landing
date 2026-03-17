"use client";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import Image from "next/image";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080808]">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />

      {/* Cover image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/cover.png"
          alt="YLY Cover"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/60 via-[#080808]/30 to-[#080808]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {t.hero.badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-white mb-4"
            >
              {t.hero.headline1}{" "}
              <span className="gradient-text block">{t.hero.headline2}</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl"
            >
              {t.hero.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#offer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                {t.hero.cta1}
                <ArrowRight size={20} />
              </a>
              <a
                href="#mission"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-blue-500/50 text-white font-semibold rounded-full text-lg transition-all hover:bg-white/5"
              >
                {t.hero.cta2}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/5"
            >
              {[
                { val: "500+", label: t.hero.stats.s1 },
                { val: "20+", label: t.hero.stats.s2 },
                { val: "4", label: t.hero.stats.s3 },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-white">{stat.val}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Patryk photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-end"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/30 to-transparent blur-2xl" />
              {/* Blue accent line */}
              <div className="absolute -left-4 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
              <div className="relative w-[380px] h-[500px] rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src="/patryk-suit.jpg"
                  alt="Patryk Olejnik"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-[#111] border border-blue-500/30 rounded-2xl px-4 py-3 backdrop-blur"
              >
                <div className="text-blue-400 font-bold text-sm">Patryk Olejnik</div>
                <div className="text-gray-500 text-xs">AI Strategist & Founder</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
