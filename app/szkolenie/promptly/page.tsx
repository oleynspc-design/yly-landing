"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Loader2,
  ArrowLeft,
  Sparkles,
  Wand2,
  Search,
  BarChart3,
  Globe,
  Copy,
  Check,
  Zap,
  BookmarkPlus,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useLang } from "@/app/context/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const modes = [
  { id: "improve", label: "Ulepsz prompt", icon: Wand2, desc: "Wklej prompt — AI go udoskonali" },
  { id: "create", label: "Stwórz od zera", icon: Sparkles, desc: "Opisz cel — AI stworzy prompt" },
  { id: "analyze", label: "Analizuj prompt", icon: BarChart3, desc: "Oceń i dostań rekomendacje" },
  { id: "adapt", label: "Dostosuj do branży", icon: Globe, desc: "Adaptuj prompt pod Twoją niszę" },
];

export default function PromptlyPage() {
  const { lang } = useLang();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("improve");
  const [industry, setIndustry] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedToLib, setSavedToLib] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("/api/user/industry")
      .then((r) => r.json())
      .then((d) => { if (d.industry) setIndustry(d.industry); })
      .catch(() => {});

    // Pick up content from Helply or notes
    const fromHelply = sessionStorage.getItem("helply_to_promptly");
    if (fromHelply) {
      setInput(fromHelply);
      sessionStorage.removeItem("helply_to_promptly");
      setMode("improve");
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/promptly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          industry,
          mode,
          lang,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: "Przepraszam, wystąpił błąd. Spróbuj ponownie." }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Nie udało się połączyć z serwerem." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToLibrary = async (content: string) => {
    try {
      const title = content.length > 60 ? content.slice(0, 60) + "..." : content;
      await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `PROMPTLY: ${title}`,
          content,
          category: "general",
          isPublic: false,
          source: "promptly",
        }),
      });
      setSavedToLib(content.slice(0, 20));
      setTimeout(() => setSavedToLib(null), 3000);
    } catch {}
  };

  const extractCodeBlocks = (text: string) => {
    const parts: { type: "text" | "code"; content: string }[] = [];
    const regex = /```[\s\S]*?```/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
      }
      const code = match[0].replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
      parts.push({ type: "code", content: code });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: "text", content: text.slice(lastIndex) });
    }

    return parts;
  };

  const renderMessage = (msg: Message, i: number) => {
    if (msg.role === "user") {
      return (
        <div key={i} className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-blue-600/20 border border-blue-500/20 px-4 py-3">
            <p className="text-sm text-gray-200 whitespace-pre-wrap">{msg.content}</p>
          </div>
        </div>
      );
    }

    const parts = extractCodeBlocks(msg.content);

    return (
      <div key={i} className="flex justify-start">
        <div className="max-w-[90%]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="text-xs font-bold text-purple-400">PROMPTLY</span>
          </div>
          <div className="rounded-2xl rounded-bl-sm bg-[#111] border border-white/5 px-4 py-3 space-y-3">
            {parts.map((part, j) => {
              if (part.type === "code") {
                return (
                  <div key={j} className="relative rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 bg-[#0f0f0f] border-b border-white/5">
                      <span className="text-xs text-gray-500 font-medium">Prompt</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => saveToLibrary(part.content)}
                          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-amber-400 hover:bg-amber-500/10 transition-colors"
                          title="Zapisz do biblioteki"
                        >
                          {savedToLib && part.content.startsWith(savedToLib) ? <CheckCircle size={12} className="text-green-400" /> : <BookmarkPlus size={12} />}
                          {savedToLib && part.content.startsWith(savedToLib) ? "Zapisano!" : "Biblioteka"}
                        </button>
                        <button
                          onClick={() => copyToClipboard(part.content)}
                          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-gray-400 hover:bg-white/5 transition-colors"
                          title="Kopiuj prompt"
                        >
                          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                          {copied ? "Skopiowano" : "Kopiuj"}
                        </button>
                      </div>
                    </div>
                    <pre className="p-4 text-sm font-mono text-purple-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">{part.content}</pre>
                  </div>
                );
              }
              return (
                <div key={j} className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {part.content.split("**").map((seg: string, k: number) =>
                    k % 2 === 1 ? <strong key={k} className="text-white font-semibold">{seg}</strong> : seg
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#080808] flex flex-col">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/szkolenie"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm"
              >
                <ArrowLeft size={14} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-black text-white flex items-center gap-2">
                    PROMPTLY
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold">BETA</span>
                  </h1>
                  <p className="text-xs text-gray-500">Asystent inżynierii promptów</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/szkolenie/biblioteka-promptow"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 hover:bg-amber-500/20 transition-colors"
              >
                <BookOpen size={12} />
                Biblioteka
              </Link>
              {industry && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400">
                  <Globe size={12} />
                  {industry}
                </div>
              )}
            </div>
          </div>

          {/* Mode selector */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {modes.map((m) => {
              const Icon = m.icon;
              const active = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? "bg-purple-600/20 border border-purple-500/40 text-purple-300"
                      : "bg-white/[0.02] border border-white/5 text-gray-500 hover:text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <Icon size={14} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
                <Sparkles size={36} className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Witaj w PROMPTLY!</h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                Wklej swój prompt, opisz cel lub poproś o analizę. AI pomoże Ci stworzyć idealny prompt dla Twojej branży.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {[
                  { text: "Ulepsz mój prompt do tworzenia postów na LinkedIn", icon: Wand2 },
                  { text: "Stwórz prompt do analizy konkurencji w mojej branży", icon: Search },
                  { text: "Jak napisać system prompt dla chatbota obsługi klienta?", icon: Zap },
                  { text: "Oceń i popraw ten prompt: 'Napisz mi artykuł o AI'", icon: BarChart3 },
                ].map((example, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(example.text); inputRef.current?.focus(); }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 text-left text-sm text-gray-400 hover:text-gray-200 transition-all"
                  >
                    <example.icon size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    {example.text}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((msg, i) => renderMessage(msg, i))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#111] border border-white/5">
                <Loader2 size={14} className="animate-spin text-purple-400" />
                <span className="text-xs text-gray-400">PROMPTLY myśli...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                mode === "improve" ? "Wklej prompt do ulepszenia..." :
                mode === "create" ? "Opisz cel — stworzę prompt od zera..." :
                mode === "analyze" ? "Wklej prompt do analizy..." :
                "Wklej prompt do dostosowania pod Twoją branżę..."
              }
              rows={2}
              className="flex-1 resize-none rounded-xl bg-[#111] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="self-end px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all"
              title="Wyślij"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
          <p className="text-[10px] text-gray-600 mt-2 text-center">
            PROMPTLY używa AI do generowania rekomendacji. Zawsze weryfikuj wyniki.
          </p>
        </div>
      </div>
    </main>
  );
}
