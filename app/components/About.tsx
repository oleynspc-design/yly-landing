"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "../context/LanguageContext";
import Image from "next/image";

export default function About() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#060606] overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-600/20 to-transparent blur-xl" />
              <div className="absolute -right-4 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />

              {/* Photo */}
              <div className="relative w-[320px] sm:w-[380px] h-[480px] rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src="/patryk-casual.jpg"
                  alt="Patryk Olejnik"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent" />
              </div>

              {/* Stat overlays */}
              {t.about.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  className={`absolute bg-[#0f0f0f] border border-white/10 backdrop-blur-sm rounded-xl px-4 py-3 ${
                    i === 0 ? "-left-8 top-16" : i === 1 ? "-right-8 top-1/2 -translate-y-1/2" : "-left-8 bottom-16"
                  }`}
                >
                  <div className="text-2xl font-black text-white">{stat.val}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              {t.about.badge}
            </span>

            <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">
              {t.about.name}
            </h2>
            <p className="text-blue-400 font-semibold mb-6">{t.about.role}</p>

            <p className="text-gray-400 text-lg leading-relaxed mb-4">{t.about.bio1}</p>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">{t.about.bio2}</p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mb-10 pb-10 border-b border-white/5">
              {t.about.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-white">{stat.val}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {["YouTube", "TikTok", "Discord", "X"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-600/10 text-gray-400 hover:text-blue-400 text-sm font-medium transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
