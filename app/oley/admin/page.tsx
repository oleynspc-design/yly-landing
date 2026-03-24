"use client";
import { useEffect, useState, useCallback } from "react";
import {
  Users, FolderKanban, Plus, Loader2, Search, Mail, Phone, Building2,
  ChevronDown, ChevronUp, Send, Bell, RefreshCw, Eye, Trash2, KeyRound,
  Clock, CheckCircle, AlertCircle, Pause, Copy, MessageSquare, StickyNote,
  BarChart3, TrendingUp, Newspaper
} from "lucide-react";

type Client = {
  id: string;
  email: string;
  full_name: string;
  company: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  project_count: number;
  last_project_update: string | null;
};

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
  client_name: string;
  client_email: string;
  client_company: string | null;
  update_count: number;
  message_count: number;
};

type Update = {
  id: string;
  title: string;
  content: string | null;
  notify_client: boolean;
  created_at: string;
};

type Message = {
  id: string;
  content: string;
  is_from_client: boolean;
  created_at: string;
  sender_name: string;
  sender_email?: string;
  project_title?: string;
};

const STATUS_MAP: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  nowy: { label: "Nowy", color: "blue", icon: AlertCircle },
  w_trakcie: { label: "W trakcie", color: "yellow", icon: TrendingUp },
  oczekuje: { label: "Oczekuje", color: "orange", icon: Pause },
  zakonczone: { label: "Zakończone", color: "green", icon: CheckCircle },
};

type Subscriber = {
  id: string;
  email: string;
  full_name: string | null;
  source: string | null;
  discount_code: string | null;
  subscribed_at: string;
};

type Tab = "clients" | "projects" | "messages" | "newsletter";

export default function OleyAdminPage() {
  const [tab, setTab] = useState<Tab>("clients");
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Client form
  const [showAddClient, setShowAddClient] = useState(false);
  const [clientForm, setClientForm] = useState({ email: "", fullName: "", company: "", phone: "", notes: "", sendEmail: true });
  const [savingClient, setSavingClient] = useState(false);
  const [newClientPassword, setNewClientPassword] = useState<string | null>(null);

  // Project form
  const [showAddProject, setShowAddProject] = useState(false);
  const [projectForm, setProjectForm] = useState({ clientId: "", title: "", description: "", deadline: "", budget: "" });
  const [savingProject, setSavingProject] = useState(false);

  // Expanded project
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [projectUpdates, setProjectUpdates] = useState<Update[]>([]);
  const [projectMessages, setProjectMessages] = useState<Message[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Update form
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [updateForm, setUpdateForm] = useState({ title: "", content: "", notifyClient: true, newProgress: "", newStatus: "" });
  const [savingUpdate, setSavingUpdate] = useState(false);

  // Edit project
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", status: "", progress: 0, deadline: "", budget: "" });
  const [savingEdit, setSavingEdit] = useState(false);

  // Admin reply
  const [replyContent, setReplyContent] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // Password reset
  const [resetPwResult, setResetPwResult] = useState<{ id: string; pw: string } | null>(null);

  const fetchClients = useCallback(async () => {
    const res = await fetch("/api/oley/admin/clients");
    const data = await res.json();
    if (data.clients) setClients(data.clients);
  }, []);

  const fetchProjects = useCallback(async () => {
    const res = await fetch("/api/oley/admin/projects");
    const data = await res.json();
    if (data.projects) setProjects(data.projects);
  }, []);

  const fetchMessages = useCallback(async () => {
    const res = await fetch("/api/oley/admin/messages");
    const data = await res.json();
    if (data.messages) setMessages(data.messages);
  }, []);

  const fetchSubscribers = useCallback(async () => {
    const res = await fetch("/api/oley/newsletter");
    const data = await res.json();
    if (data.subscribers) setSubscribers(data.subscribers);
  }, []);

  useEffect(() => {
    Promise.all([fetchClients(), fetchProjects(), fetchMessages(), fetchSubscribers()]).finally(() => setLoading(false));
  }, [fetchClients, fetchProjects, fetchMessages, fetchSubscribers]);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingClient(true);
    setNewClientPassword(null);
    try {
      const res = await fetch("/api/oley/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientForm),
      });
      const data = await res.json();
      if (res.ok) {
        setNewClientPassword(data.password);
        setClientForm({ email: "", fullName: "", company: "", phone: "", notes: "", sendEmail: true });
        await fetchClients();
      } else {
        alert(data.error);
      }
    } catch {
      alert("Błąd serwera");
    } finally {
      setSavingClient(false);
    }
  };

  const handleResetPassword = async (clientId: string) => {
    if (!confirm("Resetować hasło tego klienta?")) return;
    const res = await fetch("/api/oley/admin/clients", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, action: "reset-password" }),
    });
    const data = await res.json();
    if (res.ok) {
      setResetPwResult({ id: clientId, pw: data.password });
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    if (!confirm("Usunąć tego klienta i wszystkie jego projekty?")) return;
    await fetch("/api/oley/admin/clients", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId }),
    });
    await fetchClients();
    await fetchProjects();
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProject(true);
    try {
      const res = await fetch("/api/oley/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm),
      });
      if (res.ok) {
        setShowAddProject(false);
        setProjectForm({ clientId: "", title: "", description: "", deadline: "", budget: "" });
        await fetchProjects();
        await fetchClients();
      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch {
      alert("Błąd serwera");
    } finally {
      setSavingProject(false);
    }
  };

  const handleExpandProject = async (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
      return;
    }
    setExpandedProject(projectId);
    setLoadingDetails(true);
    setShowAddUpdate(false);
    setEditingProject(null);
    try {
      const [uRes, mRes] = await Promise.all([
        fetch(`/api/oley/admin/updates?projectId=${projectId}`),
        fetch(`/api/oley/admin/messages?projectId=${projectId}`),
      ]);
      const [uData, mData] = await Promise.all([uRes.json(), mRes.json()]);
      setProjectUpdates(uData.updates || []);
      setProjectMessages(mData.messages || []);
    } catch {
      setProjectUpdates([]);
      setProjectMessages([]);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expandedProject) return;
    setSavingUpdate(true);
    try {
      const body: Record<string, unknown> = {
        projectId: expandedProject,
        title: updateForm.title,
        content: updateForm.content,
        notifyClient: updateForm.notifyClient,
      };
      if (updateForm.newProgress) body.newProgress = parseInt(updateForm.newProgress);
      if (updateForm.newStatus) body.newStatus = updateForm.newStatus;

      const res = await fetch("/api/oley/admin/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowAddUpdate(false);
        setUpdateForm({ title: "", content: "", notifyClient: true, newProgress: "", newStatus: "" });
        await handleExpandProject(expandedProject);
        await fetchProjects();
      }
    } catch {
      alert("Błąd serwera");
    } finally {
      setSavingUpdate(false);
    }
  };

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setSavingEdit(true);
    try {
      await fetch("/api/oley/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: editingProject,
          ...editForm,
        }),
      });
      setEditingProject(null);
      await fetchProjects();
    } catch {
      alert("Błąd serwera");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Usunąć ten projekt?")) return;
    await fetch("/api/oley/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    });
    setExpandedProject(null);
    await fetchProjects();
    await fetchClients();
  };

  const handleAdminReply = async (projectId: string) => {
    if (!replyContent.trim()) return;
    setSendingReply(true);
    try {
      await fetch("/api/oley/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, content: replyContent }),
      });
      setReplyContent("");
      await handleExpandProject(projectId);
    } catch {
      alert("Błąd");
    } finally {
      setSendingReply(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("pl-PL", { day: "2-digit", month: "short", year: "numeric" });
  const formatDateTime = (d: string) => new Date(d).toLocaleString("pl-PL", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  const activeProjects = projects.filter(p => p.status !== "zakonczone");

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl border border-white/10 bg-[#111] p-4 text-center">
          <div className="text-2xl font-bold text-white">{clients.length}</div>
          <div className="text-[11px] text-gray-500 uppercase font-medium mt-1">Klienci</div>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{projects.length}</div>
          <div className="text-[11px] text-gray-500 uppercase font-medium mt-1">Projekty</div>
        </div>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{activeProjects.length}</div>
          <div className="text-[11px] text-gray-500 uppercase font-medium mt-1">Aktywne</div>
        </div>
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{messages.filter(m => m.is_from_client).length}</div>
          <div className="text-[11px] text-gray-500 uppercase font-medium mt-1">Wiadomości</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10 pb-3">
        {([
          { key: "clients" as Tab, label: "Klienci", icon: Users },
          { key: "projects" as Tab, label: "Projekty", icon: FolderKanban },
          { key: "messages" as Tab, label: "Wiadomości", icon: MessageSquare },
          { key: "newsletter" as Tab, label: "Newsletter", icon: Newspaper },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === t.key
                ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ===== CLIENTS TAB ===== */}
      {tab === "clients" && (
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Szukaj klienta..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white placeholder:text-gray-600 text-sm outline-none focus:border-emerald-500/50"
              />
            </div>
            <button
              onClick={() => { setShowAddClient(!showAddClient); setNewClientPassword(null); }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              Nowy klient
            </button>
          </div>

          {/* Add Client Form */}
          {showAddClient && (
            <div className="mb-6 bg-[#111] rounded-2xl border border-emerald-500/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Dodaj nowego klienta</h3>
              <form onSubmit={handleAddClient} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Email *</label>
                  <input type="email" required value={clientForm.email} onChange={e => setClientForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Imię i nazwisko *</label>
                  <input type="text" required value={clientForm.fullName} onChange={e => setClientForm(f => ({ ...f, fullName: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Firma</label>
                  <input type="text" value={clientForm.company} onChange={e => setClientForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Telefon</label>
                  <input type="text" value={clientForm.phone} onChange={e => setClientForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-gray-400 mb-1">Notatki</label>
                  <textarea value={clientForm.notes} onChange={e => setClientForm(f => ({ ...f, notes: e.target.value }))} rows={2}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50 resize-none" />
                </div>
                <div className="sm:col-span-2 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input type="checkbox" checked={clientForm.sendEmail} onChange={e => setClientForm(f => ({ ...f, sendEmail: e.target.checked }))}
                      className="rounded border-gray-600 accent-emerald-500" />
                    <Mail size={14} className="text-emerald-400" />
                    Wyślij dane logowania na email klienta
                  </label>
                  <button type="submit" disabled={savingClient}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-medium transition-colors">
                    {savingClient ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                    {savingClient ? "Tworzenie..." : "Utwórz klienta"}
                  </button>
                </div>
              </form>
              {newClientPassword && (
                <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <p className="text-sm text-emerald-400 font-medium mb-2">Klient utworzony! Wygenerowane hasło:</p>
                  <div className="flex items-center gap-3">
                    <code className="text-xl font-bold text-white tracking-widest bg-[#0a0a0a] px-4 py-2 rounded-lg">{newClientPassword}</code>
                    <button onClick={() => copyToClipboard(newClientPassword)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                      <Copy size={16} />
                    </button>
                  </div>
                  {clientForm.sendEmail && <p className="text-xs text-gray-500 mt-2">Email z danymi logowania został wysłany.</p>}
                </div>
              )}
            </div>
          )}

          {/* Clients List */}
          <div className="space-y-3">
            {clients
              .filter(c => {
                if (!search) return true;
                const q = search.toLowerCase();
                return c.full_name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || (c.company && c.company.toLowerCase().includes(q));
              })
              .map(client => (
                <div key={client.id} className="bg-[#111] rounded-xl border border-white/10 p-4 hover:border-white/20 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{client.full_name}</span>
                        {client.company && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                            <Building2 size={10} />{client.company}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1"><Mail size={10} />{client.email}</span>
                        {client.phone && <span className="inline-flex items-center gap-1"><Phone size={10} />{client.phone}</span>}
                        <span className="inline-flex items-center gap-1"><FolderKanban size={10} />{client.project_count} projektów</span>
                        <span className="inline-flex items-center gap-1"><Clock size={10} />Od: {formatDate(client.created_at)}</span>
                      </div>
                      {client.notes && (
                        <div className="mt-2 text-xs text-gray-600 flex items-start gap-1">
                          <StickyNote size={10} className="mt-0.5 flex-shrink-0" />
                          {client.notes}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleResetPassword(client.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 text-[11px] font-medium hover:bg-yellow-500/20 transition-colors">
                        <KeyRound size={12} />Reset hasła
                      </button>
                      <button onClick={() => handleDeleteClient(client.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-[11px] font-medium hover:bg-red-500/20 transition-colors">
                        <Trash2 size={12} />Usuń
                      </button>
                    </div>
                  </div>
                  {resetPwResult && resetPwResult.id === client.id && (
                    <div className="mt-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-center gap-3">
                      <span className="text-xs text-yellow-400">Nowe hasło:</span>
                      <code className="text-sm font-bold text-white">{resetPwResult.pw}</code>
                      <button onClick={() => copyToClipboard(resetPwResult.pw)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-400"><Copy size={12} /></button>
                    </div>
                  )}
                </div>
              ))}
            {clients.length === 0 && (
              <div className="text-center py-12 text-gray-600">
                <Users size={48} className="mx-auto mb-3 opacity-30" />
                <p>Brak klientów. Dodaj pierwszego klienta powyżej.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== PROJECTS TAB ===== */}
      {tab === "projects" && (
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj projektu..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white placeholder:text-gray-600 text-sm outline-none focus:border-emerald-500/50" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => { fetchProjects(); fetchClients(); }}
                className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <RefreshCw size={16} />
              </button>
              <button onClick={() => setShowAddProject(!showAddProject)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors">
                <Plus size={16} />Nowy projekt
              </button>
            </div>
          </div>

          {/* Add Project Form */}
          {showAddProject && (
            <div className="mb-6 bg-[#111] rounded-2xl border border-emerald-500/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Nowy projekt</h3>
              <form onSubmit={handleAddProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-gray-400 mb-1">Klient *</label>
                  <select required value={projectForm.clientId} onChange={e => setProjectForm(f => ({ ...f, clientId: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white text-sm outline-none">
                    <option value="">Wybierz klienta...</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.full_name} ({c.email})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Tytuł projektu *</label>
                  <input type="text" required value={projectForm.title} onChange={e => setProjectForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Budżet</label>
                  <input type="text" value={projectForm.budget} onChange={e => setProjectForm(f => ({ ...f, budget: e.target.value }))} placeholder="np. 5000 zł"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Deadline</label>
                  <input type="date" value={projectForm.deadline} onChange={e => setProjectForm(f => ({ ...f, deadline: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Opis</label>
                  <textarea value={projectForm.description} onChange={e => setProjectForm(f => ({ ...f, description: e.target.value }))} rows={2}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50 resize-none" />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button type="submit" disabled={savingProject}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-medium transition-colors">
                    {savingProject ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                    {savingProject ? "Tworzenie..." : "Utwórz projekt"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Projects List */}
          <div className="space-y-3">
            {projects
              .filter(p => {
                if (!search) return true;
                const q = search.toLowerCase();
                return p.title.toLowerCase().includes(q) || p.client_name.toLowerCase().includes(q) || p.client_email.toLowerCase().includes(q);
              })
              .map(project => {
                const st = STATUS_MAP[project.status] || STATUS_MAP.nowy;
                const StIcon = st.icon;
                const isExpanded = expandedProject === project.id;

                return (
                  <div key={project.id} className={`bg-[#111] rounded-xl border transition-colors ${isExpanded ? "border-emerald-500/30" : "border-white/10 hover:border-white/20"}`}>
                    {/* Project Header */}
                    <div className="p-4 cursor-pointer" onClick={() => handleExpandProject(project.id)}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">{project.title}</span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border
                              ${st.color === "blue" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : ""}
                              ${st.color === "yellow" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : ""}
                              ${st.color === "orange" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : ""}
                              ${st.color === "green" ? "bg-green-500/10 text-green-400 border-green-500/20" : ""}
                            `}>
                              <StIcon size={9} />{st.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                            <span>{project.client_name}</span>
                            {project.client_company && <span className="text-gray-600">({project.client_company})</span>}
                            {project.deadline && <span><Clock size={10} className="inline mr-0.5" />Deadline: {formatDate(project.deadline)}</span>}
                            {project.budget && <span>Budżet: {project.budget}</span>}
                            <span>{project.update_count} aktualizacji</span>
                            <span>{project.message_count} wiadomości</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Progress bar */}
                          <div className="hidden sm:flex items-center gap-2">
                            <div className="w-24 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                            </div>
                            <span className="text-xs font-medium text-gray-400">{project.progress}%</span>
                          </div>
                          {isExpanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-white/5 p-4">
                        {loadingDetails ? (
                          <div className="flex justify-center py-6"><Loader2 size={20} className="animate-spin text-emerald-500" /></div>
                        ) : (
                          <div className="space-y-4">
                            {/* Project description */}
                            {project.description && (
                              <div className="text-sm text-gray-400 bg-[#0a0a0a] rounded-lg p-3 border border-white/5">
                                {project.description}
                              </div>
                            )}

                            {/* Action buttons */}
                            <div className="flex flex-wrap gap-2">
                              <button onClick={(e) => { e.stopPropagation(); setShowAddUpdate(!showAddUpdate); }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 text-xs font-medium hover:bg-emerald-600/30 transition-colors">
                                <Plus size={12} />Dodaj aktualizację
                              </button>
                              <button onClick={(e) => {
                                e.stopPropagation();
                                if (editingProject === project.id) { setEditingProject(null); } else {
                                  setEditingProject(project.id);
                                  setEditForm({ title: project.title, description: project.description || "", status: project.status, progress: project.progress, deadline: project.deadline || "", budget: project.budget || "" });
                                }
                              }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors">
                                <BarChart3 size={12} />Edytuj projekt
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors">
                                <Trash2 size={12} />Usuń
                              </button>
                            </div>

                            {/* Edit Project Form */}
                            {editingProject === project.id && (
                              <form onSubmit={handleEditProject} className="bg-[#0a0a0a] rounded-xl border border-blue-500/20 p-4 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-1">Status</label>
                                    <select value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}
                                      className="w-full px-3 py-2 rounded-lg bg-[#111] border border-white/10 text-white text-sm outline-none">
                                      <option value="nowy">Nowy</option>
                                      <option value="w_trakcie">W trakcie</option>
                                      <option value="oczekuje">Oczekuje</option>
                                      <option value="zakonczone">Zakończone</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-1">Postęp: {editForm.progress}%</label>
                                    <input type="range" min="0" max="100" step="5" value={editForm.progress} onChange={e => setEditForm(f => ({ ...f, progress: parseInt(e.target.value) }))}
                                      className="w-full accent-emerald-500" />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-1">Deadline</label>
                                    <input type="date" value={editForm.deadline} onChange={e => setEditForm(f => ({ ...f, deadline: e.target.value }))}
                                      className="w-full px-3 py-2 rounded-lg bg-[#111] border border-white/10 text-white text-sm outline-none" />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-1">Budżet</label>
                                    <input type="text" value={editForm.budget} onChange={e => setEditForm(f => ({ ...f, budget: e.target.value }))}
                                      className="w-full px-3 py-2 rounded-lg bg-[#111] border border-white/10 text-white text-sm outline-none" />
                                  </div>
                                </div>
                                <button type="submit" disabled={savingEdit}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-medium transition-colors">
                                  {savingEdit ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                                  Zapisz zmiany
                                </button>
                              </form>
                            )}

                            {/* Add Update Form */}
                            {showAddUpdate && (
                              <form onSubmit={handleAddUpdate} className="bg-[#0a0a0a] rounded-xl border border-emerald-500/20 p-4 space-y-3">
                                <h4 className="text-sm font-bold text-emerald-400">Nowa aktualizacja</h4>
                                <input type="text" required placeholder="Tytuł aktualizacji" value={updateForm.title} onChange={e => setUpdateForm(f => ({ ...f, title: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-lg bg-[#111] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50" />
                                <textarea placeholder="Opis (opcjonalnie)" value={updateForm.content} onChange={e => setUpdateForm(f => ({ ...f, content: e.target.value }))} rows={3}
                                  className="w-full px-3 py-2 rounded-lg bg-[#111] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50 resize-none" />
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-1">Nowy postęp (%)</label>
                                    <input type="number" min="0" max="100" value={updateForm.newProgress} onChange={e => setUpdateForm(f => ({ ...f, newProgress: e.target.value }))} placeholder="np. 50"
                                      className="w-full px-3 py-2 rounded-lg bg-[#111] border border-white/10 text-white text-sm outline-none" />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-1">Nowy status</label>
                                    <select value={updateForm.newStatus} onChange={e => setUpdateForm(f => ({ ...f, newStatus: e.target.value }))}
                                      className="w-full px-3 py-2 rounded-lg bg-[#111] border border-white/10 text-white text-sm outline-none">
                                      <option value="">Bez zmiany</option>
                                      <option value="nowy">Nowy</option>
                                      <option value="w_trakcie">W trakcie</option>
                                      <option value="oczekuje">Oczekuje</option>
                                      <option value="zakonczone">Zakończone</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                                    <input type="checkbox" checked={updateForm.notifyClient} onChange={e => setUpdateForm(f => ({ ...f, notifyClient: e.target.checked }))}
                                      className="accent-emerald-500" />
                                    <Bell size={14} className="text-emerald-400" />
                                    Powiadom klienta mailem
                                  </label>
                                  <button type="submit" disabled={savingUpdate}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-medium transition-colors">
                                    {savingUpdate ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                                    Dodaj
                                  </button>
                                </div>
                              </form>
                            )}

                            {/* Updates Timeline */}
                            {projectUpdates.length > 0 && (
                              <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Historia aktualizacji</h4>
                                <div className="space-y-2">
                                  {projectUpdates.map(u => (
                                    <div key={u.id} className="flex gap-3 bg-[#0a0a0a] rounded-lg p-3 border border-white/5">
                                      <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium text-white">{u.title}</span>
                                          {u.notify_client && <Bell size={10} className="text-emerald-500" />}
                                          <span className="text-[10px] text-gray-600">{formatDateTime(u.created_at)}</span>
                                        </div>
                                        {u.content && <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{u.content}</p>}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Messages */}
                            {projectMessages.length > 0 && (
                              <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Wiadomości</h4>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                  {projectMessages.map(m => (
                                    <div key={m.id} className={`rounded-lg p-3 text-sm ${m.is_from_client ? "bg-blue-500/5 border border-blue-500/10 ml-0 mr-8" : "bg-emerald-500/5 border border-emerald-500/10 ml-8 mr-0"}`}>
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-medium ${m.is_from_client ? "text-blue-400" : "text-emerald-400"}`}>{m.sender_name}</span>
                                        <span className="text-[10px] text-gray-600">{formatDateTime(m.created_at)}</span>
                                      </div>
                                      <p className="text-gray-300 whitespace-pre-wrap">{m.content}</p>
                                    </div>
                                  ))}
                                </div>
                                {/* Admin reply */}
                                <div className="flex gap-2 mt-2">
                                  <input type="text" value={replyContent} onChange={e => setReplyContent(e.target.value)} placeholder="Odpowiedz..."
                                    onKeyDown={e => { if (e.key === "Enter") handleAdminReply(project.id); }}
                                    className="flex-1 px-3 py-2 rounded-lg bg-[#0a0a0a] border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50" />
                                  <button onClick={() => handleAdminReply(project.id)} disabled={sendingReply || !replyContent.trim()}
                                    className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-colors">
                                    <Send size={14} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            {projects.length === 0 && (
              <div className="text-center py-12 text-gray-600">
                <FolderKanban size={48} className="mx-auto mb-3 opacity-30" />
                <p>Brak projektów. Dodaj pierwszy projekt powyżej.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== MESSAGES TAB ===== */}
      {tab === "messages" && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Ostatnie wiadomości od klientów</h2>
          <div className="space-y-3">
            {messages.map(m => (
              <div key={m.id} className="bg-[#111] rounded-xl border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-blue-400">{m.sender_name}</span>
                  {m.sender_email && <span className="text-xs text-gray-600">({m.sender_email})</span>}
                  <span className="text-[10px] text-gray-600">{formatDateTime(m.created_at)}</span>
                </div>
                {m.project_title && (
                  <div className="text-xs text-gray-500 mb-2">Projekt: <span className="text-white">{m.project_title}</span></div>
                )}
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{m.content}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center py-12 text-gray-600">
                <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
                <p>Brak wiadomości od klientów.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== NEWSLETTER TAB ===== */}
      {tab === "newsletter" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Baza newslettera ({subscribers.length} subskrybentów)</h2>
            <button onClick={() => fetchSubscribers()}
              className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              <RefreshCw size={16} />
            </button>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111]">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-[#1a1a1a] text-[11px] font-semibold uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Imię</th>
                  <th className="px-4 py-3">Źródło</th>
                  <th className="px-4 py-3">Kod zniżkowy</th>
                  <th className="px-4 py-3">Data zapisu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subscribers.map(s => (
                  <tr key={s.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3 font-medium text-white">{s.email}</td>
                    <td className="px-4 py-3">{s.full_name || <span className="text-gray-600">—</span>}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/10">{s.source || "website"}</span>
                    </td>
                    <td className="px-4 py-3">
                      {s.discount_code ? (
                        <code className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{s.discount_code}</code>
                      ) : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(s.subscribed_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {subscribers.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              <Newspaper size={48} className="mx-auto mb-3 opacity-30" />
              <p>Brak subskrybentów newslettera.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
