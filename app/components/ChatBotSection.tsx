"use client";
import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import Image from "next/image";
import { Bot, Sparkles, Globe, ShieldCheck } from "lucide-react";

const content = {
  pl: {
    badge: "Asystent AI",
    title: "Poznaj Łajli",
    subtitle: "Twojego osobistego doradcę AI, gotowego pomóc Ci osiągnąć Twoje cele — od kursów po realne wsparcie w pracy z AI.",
    features: [
      { icon: Bot, title: "Zawsze dostępna", desc: "Łajli działa 24/7 — zapytaj ją o cokolwiek związanego z AI i YLY." },
      { icon: Sparkles, title: "Napedzany GPT-4o", desc: "Korzysta z najnowszej technologii OpenAI, by dawac precyzyjne i pomocne odpowiedzi." },
      { icon: Globe, title: "Wielojezyczny", desc: "Komunikuje sie po polsku, angielsku, ukrainsku i hiszpansku." },
      { icon: ShieldCheck, title: "Bezpieczny", desc: "Nie zbiera danych osobowych. Rozmowy nie sa przechowywane." },
    ],
    cta: "Kliknij ikonke w prawym dolnym rogu, aby rozpoczac rozmowe!",
  },
  en: {
    badge: "AI Assistant",
    title: "Meet Łajli",
    subtitle: "Your personal AI advisor, ready to help you achieve your goals — from courses to real AI support at work.",
    features: [
      { icon: Bot, title: "Always available", desc: "Łajli works 24/7 — ask her anything about AI and YLY." },
      { icon: Sparkles, title: "Powered by GPT-4o", desc: "Uses the latest OpenAI technology to give precise and helpful answers." },
      { icon: Globe, title: "Multilingual", desc: "Communicates in Polish, English, Ukrainian and Spanish." },
      { icon: ShieldCheck, title: "Safe", desc: "Does not collect personal data. Conversations are not stored." },
    ],
    cta: "Click the icon in the bottom right corner to start a conversation!",
  },
  uk: {
    badge: "AI Asystent",
    title: "Poznajomtes z Łajli",
    subtitle: "Vash osobystyj doradca AI, gotovyj dopomogty vam dosjagty vashyh cilej.",
    features: [
      { icon: Bot, title: "Zavzhdy dostupna", desc: "Łajli pracjuje 24/7 — zapytajte jiji pro shcho zavgodno." },
      { icon: Sparkles, title: "Na bazi GPT-4o", desc: "Vykorystovuje najnovishu tehnologiju OpenAI." },
      { icon: Globe, title: "Bagatolomovnyj", desc: "Spilkujet sja polskoju, anglijskoju, ukrajinskoju ta ispanskoju." },
      { icon: ShieldCheck, title: "Bezpechnyj", desc: "Ne zbyraje personalnyh danyh. Rozmovy ne zberigajutsja." },
    ],
    cta: "Natysnil na ikonku v pravomu nyzhnomu kuti!",
  },
  es: {
    badge: "Asistente IA",
    title: "Conoce a Łajli",
    subtitle: "Tu asesora personal de IA, lista para ayudarte a alcanzar tus objetivos — desde cursos hasta soporte real con IA.",
    features: [
      { icon: Bot, title: "Siempre disponible", desc: "Łajli funciona 24/7 — pregúntale lo que quieras sobre IA y YLY." },
      { icon: Sparkles, title: "Impulsado por GPT-4o", desc: "Utiliza la ultima tecnologia de OpenAI para dar respuestas precisas." },
      { icon: Globe, title: "Multilingue", desc: "Se comunica en polaco, ingles, ucraniano y espanol." },
      { icon: ShieldCheck, title: "Seguro", desc: "No recopila datos personales. Las conversaciones no se almacenan." },
    ],
    cta: "Haz clic en el icono en la esquina inferior derecha para iniciar una conversacion!",
  },
};

export default function ChatBotSection() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0a1020] to-[#080808]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — image + glow */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-blue-500/20 shadow-2xl shadow-blue-500/10">
                <Image
                  src="/yly-guy.jpg"
                  alt="Łajli"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
              <Bot size={14} />
              {t.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.title}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{t.subtitle}</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {t.features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-colors"
                >
                  <feat.icon size={20} className="text-blue-400 mb-2" />
                  <div className="text-white text-sm font-semibold mb-1">{feat.title}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{feat.desc}</div>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-500 text-sm italic">{t.cta}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
