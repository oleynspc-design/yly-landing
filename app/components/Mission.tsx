"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Zap, Users } from "lucide-react";
import { useLang } from "../context/LanguageContext";

const icons = [Brain, Zap, Users];

export default function Mission() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="mission" className="relative py-24 lg:py-32 bg-[#080808]">
      {/* Top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-blue-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            {t.mission.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t.mission.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.mission.sub}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.mission.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
                className="card-glow relative p-8 rounded-2xl bg-[#0f0f0f] border border-white/5 group"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors">
                  <Icon size={28} className="text-blue-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-gray-500 leading-relaxed">{card.desc}</p>

                {/* Number */}
                <div className="absolute top-6 right-6 text-6xl font-black text-white/3 select-none">
                  {i + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
