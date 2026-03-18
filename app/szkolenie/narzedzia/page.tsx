"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, MessageCircle, Library, Wand2, Bot, Lock } from "lucide-react";

interface Tool {
  id: string;
  title: string;
  desc: string;
  icon: typeof Sparkles;
  href: string;
  color: string;
  bgGlow: string;
  comingSoon?: boolean;
}

const tools: Tool[] = [
  {
    id: "promptly",
    title: "PROMPTLY",
    desc: "Generator i asystent promptów AI. Twórz profesjonalne prompty w różnych stylach.",
    icon: Sparkles,
    href: "/szkolenie/promptly",
    color: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
  },
  {
    id: "helply",
    title: "HELPLY",
    desc: "Twój asystent nauki. Pomoc kontekstowa, podsumowania i wsparcie podczas lekcji.",
    icon: MessageCircle,
    href: "#helply",
    color: "from-emerald-500 to-cyan-500",
    bgGlow: "bg-emerald-500/20",
  },
  {
    id: "biblioteka",
    title: "Biblioteka Promptów",
    desc: "Zapisuj, organizuj i udostępniaj swoje najlepsze prompty.",
    icon: Library,
    href: "/szkolenie/biblioteka-promptow",
    color: "from-amber-500 to-orange-500",
    bgGlow: "bg-amber-500/20",
  },
  {
    id: "enhancer",
    title: "AI Enhancer",
    desc: "Ulepsz swoje prompty automatycznie za pomocą AI.",
    icon: Wand2,
    href: "/szkolenie/biblioteka-promptow",
    color: "from-blue-500 to-indigo-500",
    bgGlow: "bg-blue-500/20",
  },
  {
    id: "lajli",
    title: "Łajli",
    desc: "Główny chatbot YLY. Doradca AI dostępny na każdej stronie.",
    icon: Bot,
    href: "#lajli",
    color: "from-blue-600 to-blue-400",
    bgGlow: "bg-blue-600/20",
  },
  {
    id: "automations",
    title: "Automatyzacje",
    desc: "Twórz własne workflow AI (wkrótce)",
    icon: Lock,
    href: "#",
    color: "from-gray-500 to-gray-600",
    bgGlow: "bg-gray-500/20",
    comingSoon: true,
  },
];

export default function NarzedziaPage() {
  const handleOpenHelply = () => {
    window.dispatchEvent(new CustomEvent("open-helply"));
  };

  const handleOpenLajli = () => {
    const lajliBtn = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
    if (lajliBtn) lajliBtn.click();
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#080808] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm mb-6"
          >
            <ArrowLeft size={14} />
            Dashboard
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            🛠️ Narzędzia AI
          </h1>
          <p className="text-gray-400">
            Wszystkie narzędzia dostępne w ramach Twojego szkolenia
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              {tool.href.startsWith("#") ? (
                <button
                  onClick={() => {
                    if (tool.id === "helply") handleOpenHelply();
                    else if (tool.id === "lajli") handleOpenLajli();
                  }}
                  disabled={tool.comingSoon}
                  aria-label={`Otwórz ${tool.title}`}
                  className={`group relative block w-full text-left rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 transition-all hover:border-white/20 hover:bg-[#141414] ${
                    tool.comingSoon ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  <ToolContent tool={tool} />
                </button>
              ) : (
                <Link
                  href={tool.comingSoon ? "#" : tool.href}
                  className={`group relative block rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 transition-all hover:border-white/20 hover:bg-[#141414] ${
                    tool.comingSoon ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={(e) => tool.comingSoon && e.preventDefault()}
                >
                  <ToolContent tool={tool} />
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]"
        >
          <p className="text-center text-gray-600 text-sm">
            💡 <span className="text-gray-400">Tip:</span> Helply i Łajli są dostępne jako pływające przyciski w prawym dolnym rogu ekranu.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function ToolContent({ tool }: { tool: Tool }) {
  return (
    <>
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl ${tool.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10`}
      />

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <tool.icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
        {tool.title}
        {tool.comingSoon && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-medium">
            Wkrótce
          </span>
        )}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{tool.desc}</p>
    </>
  );
}
