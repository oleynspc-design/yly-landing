"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";

export default function CTA() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-blue-600/15 blur-[100px]" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="relative p-12 lg:p-16 rounded-3xl bg-gradient-to-b from-[#0f1520] to-[#0a0a0a] border border-blue-500/20"
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            YLY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4"
          >
            {t.cta.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-lg mb-10 max-w-xl mx-auto"
          >
            {t.cta.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/sklep"
              className="inline-flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-full transition-all hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1"
            >
              {t.cta.btn}
              <ArrowRight size={20} />
            </Link>
          </motion.div>

          {/* Bottom decoration */}
          <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
