"use client";
import { useEffect, useState, useCallback } from "react";
import {
  FolderKanban, Loader2, Clock, CheckCircle, AlertCircle, Pause,
  TrendingUp, ChevronDown, ChevronUp, Send, MessageSquare, Bell,
  Calendar, Wallet
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  progress: number;
  deadline: string | null;
  budget: string | null;
  created_at: string;
  updated_at: string;
  update_count: number;
  message_count: number;
};

type Update = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
};

type Message = {
  id: string;
  content: string;
  is_from_client: boolean;
  created_at: string;
  sender_name: string;
};

const STATUS_MAP: Record<string, { label: string; color: string; icon: typeof Clock; desc: string }> = {
  nowy: { label: "Nowy", color: "blue", icon: AlertCircle, desc: "Projekt został przyjęty i czeka na rozpoczęcie prac." },
  w_trakcie: { label: "W trakcie realizacji", color: "yellow", icon: TrendingUp, desc: "Aktywnie pracujemy nad Twoim projektem." },
  oczekuje: { label: "Oczekuje", color: "orange", icon: Pause, desc: "Projekt oczekuje na dodatkowe informacje lub decyzję." },
  zakonczone: { label: "Zakończone", color: "green", icon: CheckCircle, desc: "Projekt został ukończony." },
};

export default function OleyClientPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [messageContent, setMessageContent] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/oley/client/projects");
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch {
      console.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleExpand = async (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
      return;
    }
    setExpandedProject(projectId);
    setLoadingDetails(true);
    setMessageSent(false);
    try {
      const [uRes, mRes] = await Promise.all([
        fetch(`/api/oley/client/updates?projectId=${projectId}`),
        fetch(`/api/oley/client/messages?projectId=${projectId}`),
      ]);
      const [uData, mData] = await Promise.all([uRes.json(), mRes.json()]);
      setUpdates(uData.updates || []);
      setMessages(mData.messages || []);
    } catch {
      setUpdates([]);
      setMessages([]);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleSendMessage = async (projectId: string) => {
    if (!messageContent.trim()) return;
    setSendingMessage(true);
    setMessageSent(false);
    try {
      const res = await fetch("/api/oley/client/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, content: messageContent }),
      });
      if (res.ok) {
        setMessageContent("");
        setMessageSent(true);
        // Refresh messages
        const mRes = await fetch(`/api/oley/client/messages?projectId=${projectId}`);
        const mData = await mRes.json();
        setMessages(mData.messages || []);
      } else {
        alert("Nie udało się wysłać wiadomości");
      }
    } catch {
      alert("Błąd połączenia");
    } finally {
      setSendingMessage(false);
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });
  const formatDateTime = (d: string) => new Date(d).toLocaleString("pl-PL", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Twoje projekty</h1>
        <p className="text-gray-500 text-sm">Tutaj możesz śledzić postępy realizacji swoich projektów i komunikować się z nami.</p>
      </div>

      {/* Projects */}
      <div className="space-y-4">
        {projects.map(project => {
          const st = STATUS_MAP[project.status] || STATUS_MAP.nowy;
          const StIcon = st.icon;
          const isExpanded = expandedProject === project.id;

          return (
            <div key={project.id} className={`bg-[#111] rounded-2xl border transition-all ${isExpanded ? "border-emerald-500/30 shadow-lg shadow-emerald-500/5" : "border-white/10 hover:border-white/20"}`}>
              {/* Header */}
              <div className="p-5 sm:p-6 cursor-pointer" onClick={() => handleExpand(project.id)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-lg sm:text-xl font-bold text-white">{project.title}</h2>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase border
                        ${st.color === "blue" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : ""}
                        ${st.color === "yellow" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : ""}
                        ${st.color === "orange" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : ""}
                        ${st.color === "green" ? "bg-green-500/10 text-green-400 border-green-500/20" : ""}
                      `}>
                        <StIcon size={11} />{st.label}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-gray-500">Postęp realizacji</span>
                        <span className="text-sm font-bold text-emerald-400">{project.progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: `${project.progress}%`,
                            background: project.progress === 100
                              ? "linear-gradient(90deg, #059669, #10b981)"
                              : "linear-gradient(90deg, #059669, #34d399)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      {project.deadline && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={11} />Termin: {formatDate(project.deadline)}
                        </span>
                      )}
                      {project.budget && (
                        <span className="inline-flex items-center gap-1">
                          <Wallet size={11} />{project.budget}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Bell size={11} />{project.update_count} aktualizacji
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageSquare size={11} />{project.message_count} wiadomości
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} />Ostatnia aktualizacja: {formatDate(project.updated_at)}
                      </span>
                    </div>
                  </div>
                  <div className="pt-1">
                    {isExpanded ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                  </div>
                </div>
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div className="border-t border-white/5 p-5 sm:p-6 space-y-6">
                  {loadingDetails ? (
                    <div className="flex justify-center py-8"><Loader2 size={24} className="animate-spin text-emerald-500" /></div>
                  ) : (
                    <>
                      {/* Status description */}
                      <div className={`rounded-xl p-4 border
                        ${st.color === "blue" ? "bg-blue-500/5 border-blue-500/10" : ""}
                        ${st.color === "yellow" ? "bg-yellow-500/5 border-yellow-500/10" : ""}
                        ${st.color === "orange" ? "bg-orange-500/5 border-orange-500/10" : ""}
                        ${st.color === "green" ? "bg-green-500/5 border-green-500/10" : ""}
                      `}>
                        <div className="flex items-center gap-2 mb-1">
                          <StIcon size={14} className={`
                            ${st.color === "blue" ? "text-blue-400" : ""}
                            ${st.color === "yellow" ? "text-yellow-400" : ""}
                            ${st.color === "orange" ? "text-orange-400" : ""}
                            ${st.color === "green" ? "text-green-400" : ""}
                          `} />
                          <span className="text-sm font-medium text-white">Status: {st.label}</span>
                        </div>
                        <p className="text-xs text-gray-400">{st.desc}</p>
                      </div>

                      {/* Project description */}
                      {project.description && (
                        <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5">
                          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Opis projektu</h3>
                          <p className="text-sm text-gray-300 whitespace-pre-wrap">{project.description}</p>
                        </div>
                      )}

                      {/* Updates Timeline */}
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                          <Bell size={12} className="text-emerald-400" />
                          Historia aktualizacji
                        </h3>
                        {updates.length > 0 ? (
                          <div className="relative pl-4 border-l-2 border-emerald-500/20 space-y-4">
                            {updates.map((u, i) => (
                              <div key={u.id} className="relative">
                                <div className={`absolute -left-[21px] w-3 h-3 rounded-full border-2 ${i === 0 ? "bg-emerald-500 border-emerald-400" : "bg-[#111] border-emerald-500/30"}`} />
                                <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5 ml-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-semibold text-white">{u.title}</span>
                                    <span className="text-[10px] text-gray-600">{formatDateTime(u.created_at)}</span>
                                  </div>
                                  {u.content && <p className="text-xs text-gray-400 mt-1 whitespace-pre-wrap">{u.content}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600 italic">Brak aktualizacji — wkrótce pojawią się informacje o postępach.</p>
                        )}
                      </div>

                      {/* Messages */}
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                          <MessageSquare size={12} className="text-blue-400" />
                          Wiadomości
                        </h3>

                        {messages.length > 0 && (
                          <div className="space-y-2 mb-4 max-h-72 overflow-y-auto">
                            {messages.map(m => (
                              <div key={m.id} className={`rounded-xl p-3 text-sm ${
                                m.is_from_client
                                  ? "bg-emerald-500/5 border border-emerald-500/10 ml-8 sm:ml-16"
                                  : "bg-blue-500/5 border border-blue-500/10 mr-8 sm:mr-16"
                              }`}>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-xs font-medium ${m.is_from_client ? "text-emerald-400" : "text-blue-400"}`}>
                                    {m.is_from_client ? "Ty" : "OleyDesign"}
                                  </span>
                                  <span className="text-[10px] text-gray-600">{formatDateTime(m.created_at)}</span>
                                </div>
                                <p className="text-gray-300 whitespace-pre-wrap">{m.content}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Send message form */}
                        <div className="bg-[#0a0a0a] rounded-xl border border-white/10 p-4">
                          <h4 className="text-sm font-medium text-white mb-3">Napisz do nas</h4>
                          <textarea
                            value={messageContent}
                            onChange={e => setMessageContent(e.target.value)}
                            placeholder="Opisz swoje pytanie lub uwagi..."
                            rows={3}
                            className="w-full px-3 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white placeholder:text-gray-600 text-sm outline-none focus:border-emerald-500/50 resize-none mb-3"
                          />
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] text-gray-600">
                              Wiadomość zostanie wysłana do zespołu OleyDesign
                            </p>
                            <button
                              onClick={() => handleSendMessage(project.id)}
                              disabled={sendingMessage || !messageContent.trim()}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-medium transition-colors"
                            >
                              {sendingMessage ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                              {sendingMessage ? "Wysyłanie..." : "Wyślij wiadomość"}
                            </button>
                          </div>
                          {messageSent && (
                            <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-sm text-emerald-400 flex items-center gap-2">
                              <CheckCircle size={14} />
                              Wiadomość została wysłana! Odpowiemy najszybciej jak to możliwe.
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {projects.length === 0 && (
          <div className="text-center py-16">
            <FolderKanban size={56} className="mx-auto mb-4 text-gray-700" />
            <h2 className="text-xl font-bold text-white mb-2">Brak projektów</h2>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              Nie masz jeszcze przypisanych projektów. Skontaktuj się z OleyDesign, aby rozpocząć współpracę.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-xs text-gray-700 border-t border-white/5 pt-6">
        <p>OleyDesign &mdash; Panel Klienta</p>
        <p className="mt-1">Pytania? Napisz na <a href="mailto:kontakt@oleydesign.pl" className="text-emerald-500 hover:underline">kontakt@oleydesign.pl</a></p>
      </div>
    </div>
  );
}
