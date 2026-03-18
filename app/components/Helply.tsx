"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  BookOpen,
  Lightbulb,
  FileText,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Copy,
  Check,
  Minimize2,
  BookmarkPlus,
  CheckCircle,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface HelplyProps {
  moduleSlug?: string;
  moduleName?: string;
  currentLesson?: string;
  lessonNotes?: string;
}

const quickActions = [
  { id: "summarize", label: "Streść moduł", icon: BookOpen },
  { id: "tips", label: "Daj tipy", icon: Lightbulb },
  { id: "examples", label: "Przykłady", icon: FileText },
  { id: "homework-help", label: "Pomoc z zadaniem", icon: HelpCircle },
];

export default function Helply({ moduleSlug, moduleName, currentLesson, lessonNotes }: HelplyProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [savedToLib, setSavedToLib] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Listen for open-helply custom event from other components
  useEffect(() => {
    const handleOpenHelply = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setOpen(true);
      if (detail?.notes && detail?.action === "notes-to-prompt") {
        setTimeout(() => {
          sendMessage(`Przekształć te notatki w profesjonalny prompt:\n\n${detail.notes}`, "notes-to-prompt");
        }, 300);
      }
    };
    window.addEventListener("open-helply", handleOpenHelply);
    return () => window.removeEventListener("open-helply", handleOpenHelply);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const sendMessage = async (text: string, action?: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/helply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          moduleSlug,
          action,
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

  const handleQuickAction = (actionId: string) => {
    const contextMsg = currentLesson ? ` (aktualna lekcja: ${currentLesson})` : "";
    const moduleMsg = moduleName ? ` modułu "${moduleName}"` : "";

    const actionMessages: Record<string, string> = {
      summarize: `Streść kluczowe punkty${moduleMsg}${contextMsg}`,
      tips: `Daj mi praktyczne tipy${moduleMsg}${contextMsg}`,
      examples: `Podaj konkretne przykłady zastosowania${moduleMsg}${contextMsg}`,
      "homework-help": `Potrzebuję pomocy z zadaniem domowym${contextMsg}`,
    };

    sendMessage(actionMessages[actionId] || "", actionId);
  };

  const handleNotesToPrompt = () => {
    if (!lessonNotes) return;
    sendMessage(`Przekształć te notatki w profesjonalny prompt:\n\n${lessonNotes}`, "notes-to-prompt");
  };

  const handleSendToPromptly = (content: string) => {
    sessionStorage.setItem("helply_to_promptly", content);
    window.open("/szkolenie/promptly", "_blank");
  };

  const saveToLibrary = async (content: string, idx: number) => {
    try {
      const title = content.length > 60 ? content.slice(0, 60) + "..." : content;
      await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Helply: ${title}`,
          content,
          category: "general",
          isPublic: false,
          source: "helply",
        }),
      });
      setSavedToLib(idx);
      setTimeout(() => setSavedToLib(null), 3000);
    } catch {}
  };

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const renderMessage = (msg: Message, i: number) => {
    if (msg.role === "user") {
      return (
        <div key={i} className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-600/20 border border-emerald-500/20 px-3 py-2">
            <p className="text-xs text-gray-200 whitespace-pre-wrap">{msg.content}</p>
          </div>
        </div>
      );
    }

    return (
      <div key={i} className="flex justify-start">
        <div className="max-w-[90%]">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <MessageCircle size={10} className="text-white" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400">HELPLY</span>
          </div>
          <div className="rounded-2xl rounded-bl-sm bg-[#111] border border-white/5 px-3 py-2">
            <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
              {msg.content.split("**").map((seg: string, k: number) =>
                k % 2 === 1 ? <strong key={k} className="text-white font-semibold">{seg}</strong> : seg
              )}
            </div>
            <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-white/5">
              <button
                onClick={() => copyText(msg.content, i)}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
              >
                {copied === i ? <Check size={10} className="text-green-400" /> : <Copy size={10} />}
                {copied === i ? "Skopiowano" : "Kopiuj"}
              </button>
              <button
                onClick={() => saveToLibrary(msg.content, i)}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-gray-500 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
              >
                {savedToLib === i ? <CheckCircle size={10} className="text-green-400" /> : <BookmarkPlus size={10} />}
                {savedToLib === i ? "Zapisano!" : "Biblioteka"}
              </button>
              <button
                onClick={() => handleSendToPromptly(msg.content)}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-gray-500 hover:text-purple-300 hover:bg-purple-500/10 transition-colors"
              >
                <Sparkles size={10} />
                PROMPTLY
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating Messenger-style animated button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -6, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              scale: { type: "spring", stiffness: 400, damping: 15 },
              y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
            }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/25 flex items-center justify-center hover:shadow-xl hover:shadow-emerald-500/40 transition-shadow group cursor-pointer"
          >
            {/* Breathing pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-400/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              }}
            />
            {/* Second pulse ring (offset) */}
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-400/15"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <MessageCircle size={24} className="text-white" />
            </motion.div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-[#080808] flex items-center justify-center">
              <motion.span
                className="text-[8px] font-bold text-white"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                AI
              </motion.span>
            </div>
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: [0, 1, 1, 0], x: [10, 0, 0, -5] }}
              transition={{ repeat: Infinity, duration: 5, times: [0, 0.1, 0.7, 1], repeatDelay: 8 }}
              className="absolute right-16 whitespace-nowrap bg-[#111] border border-white/10 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl pointer-events-none"
            >
              Zapytaj Helply!
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[600px] rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-gradient-to-r from-emerald-900/30 to-cyan-900/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    HELPLY
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-bold">MENTOR</span>
                  </h3>
                  <p className="text-[10px] text-gray-500">
                    {moduleName ? `Moduł: ${moduleName}` : "Twój AI mentor"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                  <Minimize2 size={14} />
                </button>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 min-h-[200px] max-h-[380px]">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                    <MessageCircle size={20} className="text-emerald-400" />
                  </div>
                  <p className="text-sm font-bold text-white mb-1">Cześć! Jestem Helply</p>
                  <p className="text-[11px] text-gray-500 mb-4">Twój AI mentor. Zapytaj mnie o cokolwiek!</p>

                  {/* Quick actions */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {quickActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleQuickAction(action.id)}
                          className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 text-[10px] text-gray-400 hover:text-gray-200 transition-all text-left"
                        >
                          <Icon size={12} className="text-emerald-400 flex-shrink-0" />
                          {action.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Notes to prompt button */}
                  {lessonNotes && (
                    <button
                      onClick={handleNotesToPrompt}
                      className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300 hover:bg-purple-500/20 transition-colors"
                    >
                      <Sparkles size={12} />
                      Notatki → Prompt (PROMPTLY)
                    </button>
                  )}
                </div>
              )}

              {messages.map((msg, i) => renderMessage(msg, i))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#111] border border-white/5">
                    <Loader2 size={12} className="animate-spin text-emerald-400" />
                    <span className="text-[10px] text-gray-400">Helply myśli...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick actions bar when in conversation */}
            {messages.length > 0 && (
              <div className="px-3 pb-1 flex gap-1 overflow-x-auto">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action.id)}
                      className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[9px] text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      <Icon size={10} />
                      {action.label}
                    </button>
                  );
                })}
                {lessonNotes && (
                  <button
                    onClick={handleNotesToPrompt}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-purple-500/5 border border-purple-500/10 text-[9px] text-purple-400 hover:bg-purple-500/10 transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    <ArrowRight size={10} />
                    Notatki→Prompt
                  </button>
                )}
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-2 border-t border-white/5">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder="Zapytaj Helply..."
                  rows={1}
                  className="flex-1 resize-none rounded-lg bg-[#111] border border-white/10 px-3 py-2 text-xs text-white placeholder:text-gray-600 outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  className="self-end px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
