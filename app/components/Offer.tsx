"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles, Crown, Star, Zap, ArrowRight, Shield, Gift } from "lucide-react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

const tierIcons = [Star, Zap, Crown];
const tierColors = [
  { border: "border-white/10", bg: "bg-[#0f0f0f]", accent: "text-gray-400", btn: "bg-white/5 hover:bg-white/10 border border-white/5", check: "text-gray-500" },
  { border: "border-purple-500/40", bg: "bg-gradient-to-b from-purple-500/5 to-[#0f0f0f]", accent: "text-purple-400", btn: "bg-purple-600 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/25", check: "text-purple-400" },
  { border: "border-yellow-500/30", bg: "bg-gradient-to-b from-yellow-500/5 to-[#0f0f0f]", accent: "text-yellow-400", btn: "bg-yellow-600 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/25", check: "text-yellow-400" },
];

export default function Offer() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const tiers = t.offer.tiers || [];

  return (
    <section id="offer" className="relative py-24 lg:py-32 bg-[#060606]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            {t.offer.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t.offer.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.offer.sub}</p>
        </motion.div>

        {/* Demo banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 p-4 rounded-2xl bg-green-500/5 border border-green-500/20 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-green-400 font-bold text-sm mb-1">
            <Gift size={16} />
            Tryb Demo — za darmo!
          </div>
          <p className="text-gray-400 text-sm">Zarejestruj się i przetestuj pierwszą lekcję każdego modułu bez płacenia. Gdy będziesz gotowy — odblokuj pełny dostęp.</p>
        </motion.div>

        {/* Pricing tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier: { name: string; price: string; period: string; desc: string; features: string[]; cta: string; popular: boolean }, i: number) => {
            const Icon = tierIcons[i] || Star;
            const colors = tierColors[i] || tierColors[0];
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className={`relative flex flex-col rounded-2xl border p-8 ${colors.border} ${colors.bg}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center gap-1">
                    <Sparkles size={12} />
                    NAJPOPULARNIEJSZY
                  </div>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <Icon size={20} className={colors.accent} />
                  <span className={`text-xs font-bold uppercase ${colors.accent}`}>{tier.name}</span>
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-black text-white">{tier.price}</span>
                  <span className="text-gray-500 text-sm ml-2">zł {tier.period}</span>
                </div>

                <p className="text-gray-400 text-sm mb-6">{tier.desc}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Check size={16} className={`flex-shrink-0 mt-0.5 ${colors.check}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/sklep"
                  className={`inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold transition-all text-white ${colors.btn}`}
                >
                  {tier.cta}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-green-500" />
            Bezpieczna płatność Stripe
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-blue-500" />
            Natychmiastowy dostęp po płatności
          </div>
          <div className="flex items-center gap-2">
            <Gift size={16} className="text-purple-500" />
            Darmowe demo bez karty
          </div>
        </motion.div>
      </div>
    </section>
  );
}
