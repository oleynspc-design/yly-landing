"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Heart,
  Copy,
  Check,
  Plus,
  X,
  Globe,
  Lock,
  Sparkles,
  BookOpen,
  Filter,
  Trash2,
  Edit3,
  Share2,
} from "lucide-react";
import Link from "next/link";

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  source: string;
  is_public: boolean;
  user_liked?: boolean;
  author_name?: string;
  created_at: string;
}

const CATEGORIES = [
  { id: "all", label: "Wszystkie" },
  { id: "business", label: "Biznes" },
  { id: "content", label: "Treści" },
  { id: "code", label: "Kodowanie" },
  { id: "marketing", label: "Marketing" },
  { id: "analysis", label: "Analiza" },
  { id: "education", label: "Edukacja" },
  { id: "general", label: "Ogólne" },
];

export default function PromptLibraryPage() {
  const [section, setSection] = useState<"community" | "personal">("community");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [copied, setCopied] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [newIsPublic, setNewIsPublic] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPrompts();
  }, [section, category, searchQuery]);

  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ section });
      if (category !== "all") params.set("category", category);
      if (searchQuery) params.set("q", searchQuery);
      const res = await fetch(`/api/prompts?${params}`);
      const data = await res.json();
      setPrompts(data.prompts || []);
    } catch {
      setPrompts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (promptId: string) => {
    try {
      const res = await fetch("/api/prompts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId }),
      });
      const data = await res.json();
      setPrompts((prev) =>
        prev.map((p) =>
          p.id === promptId
            ? { ...p, user_liked: data.liked, likes: data.liked ? p.likes + 1 : p.likes - 1 }
            : p
        )
      );
    } catch {}
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSave = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        await fetch("/api/prompts", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, title: newTitle, content: newContent, category: newCategory, isPublic: newIsPublic }),
        });
      } else {
        await fetch("/api/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newTitle, content: newContent, category: newCategory, isPublic: newIsPublic, source: "manual" }),
        });
      }
      resetForm();
      fetchPrompts();
    } catch {} finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Usunąć ten prompt?")) return;
    try {
      await fetch("/api/prompts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchPrompts();
    } catch {}
  };

  const startEdit = (p: Prompt) => {
    setEditingId(p.id);
    setNewTitle(p.title);
    setNewContent(p.content);
    setNewCategory(p.category);
    setNewIsPublic(p.is_public);
    setShowNewForm(true);
  };

  const resetForm = () => {
    setShowNewForm(false);
    setEditingId(null);
    setNewTitle("");
    setNewContent("");
    setNewCategory("general");
    setNewIsPublic(false);
  };

  const sendToPromptly = (content: string) => {
    sessionStorage.setItem("helply_to_promptly", content);
    window.open("/szkolenie/promptly", "_blank");
  };

  return (
    <main className="min-h-screen bg-[#080808]">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link href="/szkolenie" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm">
                <ArrowLeft size={14} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <BookOpen size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-black text-white">Biblioteka Promptów</h1>
                  <p className="text-xs text-gray-500">Społeczność & Twoje prompty</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => { resetForm(); setShowNewForm(true); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold transition-colors"
            >
              <Plus size={14} />
              Nowy prompt
            </button>
          </div>

          {/* Section tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSection("community")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                section === "community"
                  ? "bg-amber-600/20 border border-amber-500/40 text-amber-300"
                  : "bg-white/[0.02] border border-white/5 text-gray-500 hover:text-gray-300"
              }`}
            >
              <Globe size={14} />
              Społeczność
            </button>
            <button
              onClick={() => setSection("personal")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                section === "personal"
                  ? "bg-purple-600/20 border border-purple-500/40 text-purple-300"
                  : "bg-white/[0.02] border border-white/5 text-gray-500 hover:text-gray-300"
              }`}
            >
              <Lock size={14} />
              Moje prompty
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj promptów..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#111] border border-white/10 text-sm text-white placeholder:text-gray-600 outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    category === cat.id
                      ? "bg-amber-600/20 border border-amber-500/30 text-amber-300"
                      : "bg-white/[0.02] border border-white/5 text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New/Edit Form */}
      {showNewForm && (
        <div className="border-b border-white/5 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="rounded-xl border border-white/10 bg-[#111] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">{editingId ? "Edytuj prompt" : "Nowy prompt"}</h3>
                <button onClick={resetForm} className="p-1 rounded-lg hover:bg-white/5 text-gray-400"><X size={14} /></button>
              </div>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Tytuł promptu..."
                className="w-full mb-3 px-4 py-2 rounded-lg bg-[#0a0a0a] border border-white/10 text-sm text-white placeholder:text-gray-600 outline-none focus:border-amber-500/50"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Treść promptu..."
                rows={6}
                className="w-full mb-3 px-4 py-3 rounded-lg bg-[#0a0a0a] border border-white/10 text-sm text-white font-mono placeholder:text-gray-600 outline-none focus:border-amber-500/50 resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#0a0a0a] border border-white/10 text-sm text-white outline-none"
                  >
                    {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                  <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newIsPublic}
                      onChange={(e) => setNewIsPublic(e.target.checked)}
                      className="rounded border-gray-600"
                    />
                    <Share2 size={12} />
                    Udostępnij społeczności
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={resetForm} className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-colors">Anuluj</button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !newTitle.trim() || !newContent.trim()}
                    className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold disabled:opacity-40 transition-colors"
                  >
                    {saving ? "Zapisuję..." : editingId ? "Zapisz zmiany" : "Dodaj prompt"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prompts Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-500">Ładowanie promptów...</p>
          </div>
        ) : prompts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={40} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">
              {section === "community" ? "Brak promptów w społeczności" : "Nie masz jeszcze żadnych promptów"}
            </p>
            <p className="text-xs text-gray-600">
              {section === "personal" ? "Dodaj swój pierwszy prompt lub użyj PROMPTLY do wygenerowania!" : "Bądź pierwszy! Dodaj prompt i udostępnij społeczności."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prompts.map((prompt, i) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-white/5 bg-[#0f0f0f] p-5 hover:border-amber-500/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{prompt.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-medium">{prompt.category}</span>
                      {prompt.source === "promptly" && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-medium flex items-center gap-1">
                          <Sparkles size={8} /> PROMPTLY
                        </span>
                      )}
                      {section === "community" && prompt.author_name && (
                        <span className="text-[10px] text-gray-600">by {prompt.author_name}</span>
                      )}
                    </div>
                  </div>
                  {section === "personal" && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(prompt)} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                        <Edit3 size={12} />
                      </button>
                      <button onClick={() => handleDelete(prompt.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-lg bg-black/50 border border-white/5 mb-3">
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono line-clamp-6">{prompt.content}</pre>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {section === "community" && (
                      <button
                        onClick={() => handleLike(prompt.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors ${
                          prompt.user_liked ? "bg-red-500/10 text-red-400" : "bg-white/5 text-gray-500 hover:text-red-400"
                        }`}
                      >
                        <Heart size={12} fill={prompt.user_liked ? "currentColor" : "none"} />
                        {prompt.likes}
                      </button>
                    )}
                    <button
                      onClick={() => handleCopy(prompt.content, prompt.id)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-xs text-gray-500 hover:text-white transition-colors"
                    >
                      {copied === prompt.id ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                      {copied === prompt.id ? "Skopiowano" : "Kopiuj"}
                    </button>
                  </div>
                  <button
                    onClick={() => sendToPromptly(prompt.content)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/10 text-xs text-purple-400 hover:bg-purple-500/20 transition-colors"
                  >
                    <Sparkles size={12} />
                    Ulepsz w PROMPTLY
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
