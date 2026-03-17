"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play, BookOpen, Sparkles, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

const icons = [Play, BookOpen, Sparkles, Star];
const tagColors: Record<string, string> = {
  Bestseller: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Popularny: "bg-green-500/10 text-green-400 border-green-500/20",
  Popular: "bg-green-500/10 text-green-400 border-green-500/20",
  Популярний: "bg-green-500/10 text-green-400 border-green-500/20",
  Nowy: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  New: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Новий: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Nuevo: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Premium: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Бестселер: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export default function Offer() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="offer" className="relative py-24 lg:py-32 bg-[#060606]">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            {t.offer.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t.offer.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.offer.sub}</p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.offer.items.map((item, i) => {
            const Icon = icons[i];
            const isPremium = item.tag === "Premium";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className={`card-glow relative flex flex-col p-6 rounded-2xl border ${
                  isPremium
                    ? "bg-gradient-to-b from-blue-900/20 to-[#0f0f0f] border-blue-500/30"
                    : "bg-[#0f0f0f] border-white/5"
                }`}
              >
                {isPremium && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                )}

                {/* Tag */}
                <span
                  className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${
                    tagColors[item.tag] || "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}
                >
                  {item.tag}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isPremium
                      ? "bg-blue-600/20 border border-blue-500/30"
                      : "bg-white/5 border border-white/5"
                  }`}
                >
                  <Icon size={22} className={isPremium ? "text-blue-400" : "text-gray-400"} />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{item.desc}</p>

                {/* Price */}
                <div className="text-blue-400 font-bold text-sm mb-4">{item.price}</div>

                {/* CTA */}
                <Link
                  href="/sklep"
                  className={`inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isPremium
                      ? "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/25"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/5"
                  }`}
                >
                  {item.cta}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
