"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  MessageSquare,
  Send,
  Hash,
  Users,
  Globe,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";

interface Channel {
  id: string;
  slug: string;
  name: string;
  description: string | null;
}

interface ChatMessage {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
}

export default function GroupChat() {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasInitRef = useRef(false);

  // Only fetch user ID and messages when chat is first expanded
  useEffect(() => {
    if (collapsed || hasInitRef.current) return;
    hasInitRef.current = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => { if (data.user) setCurrentUserId(data.user.id); })
      .catch(() => {});
  }, [collapsed]);

  useEffect(() => {
    const handleVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  const fetchMessages = useCallback(async (channel: string) => {
    try {
      const res = await fetch(`/api/chat/group?channel=${channel}&limit=50`);
      const data = await res.json();
      if (data.channels) setChannels(data.channels);
      if (data.messages) setMessages(data.messages);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  // Only load messages when chat is visible
  useEffect(() => {
    if (collapsed) return;
    setLoading(true);
    fetchMessages(activeChannel);
  }, [activeChannel, collapsed, fetchMessages]);

  // Poll for new messages every 30s (paused when tab hidden or chat collapsed)
  useEffect(() => {
    if (collapsed || !tabVisible) return;
    pollRef.current = setInterval(() => {
      fetchMessages(activeChannel);
    }, 30000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [activeChannel, collapsed, tabVisible, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setSending(true);
    setInput("");

    try {
      const res = await fetch("/api/chat/group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text, channel: activeChannel }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch {
      // ignore
    } finally {
      setSending(false);
    }
  };

  const channelIcon = (slug: string) =>
    slug === "team" ? <Users size={14} /> : <Globe size={14} />;

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
  };

  // Group messages by date
  const groupedMessages: { date: string; msgs: ChatMessage[] }[] = [];
  let lastDate = "";
  for (const msg of messages) {
    const date = formatDate(msg.created_at);
    if (date !== lastDate) {
      groupedMessages.push({ date, msgs: [msg] });
      lastDate = date;
    } else {
      groupedMessages[groupedMessages.length - 1].msgs.push(msg);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <MessageSquare size={20} className="text-blue-400" />
          <div>
            <div className="text-sm font-bold text-white">Czat grupowy</div>
            <div className="text-xs text-gray-500">
              {channels.find((c) => c.slug === activeChannel)?.description || "Dyskusja"}
            </div>
          </div>
        </div>
        {collapsed ? (
          <ChevronDown size={16} className="text-gray-500" />
        ) : (
          <ChevronUp size={16} className="text-gray-500" />
        )}
      </button>

      {!collapsed && (
        <>
          {/* Channel tabs */}
          <div className="flex border-y border-white/5 bg-[#0a0a0a]">
            {channels.map((ch) => (
              <button
                key={ch.slug}
                onClick={() => setActiveChannel(ch.slug)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors ${
                  activeChannel === ch.slug
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Hash size={12} />
                {channelIcon(ch.slug)}
                {ch.name}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div ref={messagesContainerRef} className="h-80 overflow-y-auto px-4 py-3 space-y-1 scrollbar-thin">
            {loading ? (
              <div className="flex h-full items-center justify-center text-sm text-gray-600">
                Ładowanie...
              </div>
            ) : messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-gray-600">
                <MessageSquare size={32} className="mb-2 opacity-30" />
                <div className="text-sm">Brak wiadomości</div>
                <div className="text-xs">Bądź pierwszy i napisz coś!</div>
              </div>
            ) : (
              groupedMessages.map((group) => (
                <div key={group.date}>
                  <div className="my-3 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[10px] font-medium text-gray-600">{group.date}</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  {group.msgs.map((msg) => {
                    const isMe = msg.user_id === currentUserId;
                    return (
                      <div
                        key={msg.id}
                        className="group flex gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.02]"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {msg.avatar_url ? (
                            <img
                              src={msg.avatar_url}
                              alt=""
                              width={28}
                              height={28}
                              className="h-7 w-7 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600/20 text-[10px] font-bold text-blue-400">
                              {msg.full_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className={`text-xs font-semibold ${isMe ? "text-blue-400" : "text-white"}`}>
                              {msg.full_name}
                            </span>
                            {msg.role === "admin" && (
                              <Shield size={10} className="text-purple-400" />
                            )}
                            <span className="text-[10px] text-gray-600 opacity-0 transition-opacity group-hover:opacity-100">
                              {formatTime(msg.created_at)}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-gray-300 break-words">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-white/5 bg-[#0a0a0a] px-4 py-3"
          >
            <label htmlFor="group-chat-input" className="sr-only">
              Wiadomość
            </label>
            <input
              id="group-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Napisz na #${activeChannel}...`}
              maxLength={2000}
              className="flex-1 rounded-lg border border-white/10 bg-[#080808] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500/50"
            />
            <button
              type="submit"
              title="Wyślij wiadomość"
              disabled={sending || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-500 disabled:opacity-40"
            >
              <Send size={14} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
