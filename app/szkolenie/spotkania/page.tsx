"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, Video, ChevronLeft, ChevronRight, Loader2, CheckCircle, ShoppingCart, Shield, User, Mail, FileText, Search, Users } from "lucide-react";
import Link from "next/link";

interface Meeting {
  id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  notes: string | null;
  meeting_url: string | null;
  admin_name: string | null;
  user_name?: string | null;
  user_email?: string | null;
}

interface UserOption {
  id: string;
  full_name: string;
  email: string;
}

interface MeetingData {
  meetings: Meeting[];
  credits: { total: number; used: number; remaining: number };
  packageType: string;
  role: string;
  allBooked: string[];
  userList?: UserOption[];
}

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const DAY_NAMES = ["Niedz.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."];
const MONTH_NAMES = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

function getWeekDays(baseDate: Date) {
  const start = new Date(baseDate);
  start.setDate(start.getDate() - start.getDay() + 1); // Monday
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}

export default function MeetingsPage() {
  const [data, setData] = useState<MeetingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [userSearch, setUserSearch] = useState("");

  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + weekOffset * 7);
  const weekDays = getWeekDays(baseDate);

  useEffect(() => {
    fetch("/api/meetings")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        if (d.allBooked) {
          setBookedSlots(new Set(d.allBooked.map((s: string) => new Date(s).toISOString())));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const refreshData = async () => {
    const d = await fetch("/api/meetings").then((r) => r.json());
    setData(d);
    if (d.allBooked) {
      setBookedSlots(new Set(d.allBooked.map((s: string) => new Date(s).toISOString())));
    }
  };

  const handleBook = async () => {
    if (!selectedSlot) return;
    setBooking(true);
    setError("");
    try {
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scheduledAt: selectedSlot,
          notes: notes.trim() || null,
          ...(data?.role === "admin" && selectedUserId ? { userId: selectedUserId } : {}),
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setBookingSuccess(true);
      setSelectedSlot(null);
      setNotes("");
      await refreshData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wystąpił błąd");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-[#080808]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </main>
    );
  }

  const isAdmin = data?.role === "admin";
  const hasPackage = data?.packageType === "premium" || data?.packageType === "pro" || isAdmin;
  const canBook = hasPackage && (isAdmin || (data && data.credits.remaining > 0));

  // Separate upcoming and past meetings for admin CRM view
  const now = new Date();
  const upcomingMeetings = data?.meetings?.filter((m) => new Date(m.scheduled_at) >= now && m.status === "scheduled") || [];
  const pastMeetings = data?.meetings?.filter((m) => new Date(m.scheduled_at) < now || m.status !== "scheduled") || [];

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            Spotkania online
            {isAdmin && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-sm font-bold text-purple-400">
                <Shield size={14} /> Admin CRM
              </span>
            )}
          </h1>
          <p className="mt-2 text-gray-500">
            {isAdmin ? "Zarządzaj spotkaniami — widok wszystkich zaplanowanych sesji" : "Zarezerwuj spotkanie 1-na-1 z Patrykiem (1.5h)"}
          </p>
        </div>

        {/* === NO PACKAGE VIEW === */}
        {!hasPackage && (
          <section className="rounded-2xl border border-yellow-500/20 bg-[#111] p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
              <Video size={32} className="text-yellow-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Spotkania online 1-na-1</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Zarezerwuj 1.5h spotkanie online z Patrykiem. Dostępne w pakiecie <strong className="text-purple-400">Pro</strong> i <strong className="text-yellow-400">Premium</strong>. Możesz też dokupić pojedyncze spotkanie za 200 zł.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/sklep" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-bold text-white transition-all">
                <ShoppingCart size={16} /> Zobacz pakiety
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                <div className="text-xs font-bold text-gray-400 uppercase mb-1">Pro</div>
                <div className="text-lg font-black text-purple-400">1 spotkanie</div>
                <div className="text-xs text-gray-500 mt-1">W pakiecie Pro</div>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                <div className="text-xs font-bold text-gray-400 uppercase mb-1">Premium</div>
                <div className="text-lg font-black text-yellow-400">3 spotkania</div>
                <div className="text-xs text-gray-500 mt-1">W pakiecie Premium</div>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                <div className="text-xs font-bold text-gray-400 uppercase mb-1">Dodatkowe</div>
                <div className="text-lg font-black text-blue-400">200 zł</div>
                <div className="text-xs text-gray-500 mt-1">Za jedno spotkanie</div>
              </div>
            </div>
          </section>
        )}

        {/* === ADMIN CRM: All upcoming meetings === */}
        {isAdmin && (
          <section className="rounded-2xl border border-purple-500/20 bg-[#111] p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <Calendar size={20} className="text-purple-400" />
              Zaplanowane spotkania ({upcomingMeetings.length})
            </h2>
            {upcomingMeetings.length > 0 ? (
              <div className="space-y-3">
                {upcomingMeetings.map((m) => (
                  <div key={m.id} className="rounded-xl bg-white/5 border border-white/5 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 flex-shrink-0">
                        <Video size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-white">
                            {new Date(m.scheduled_at).toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long" })}
                          </span>
                          <span className="text-xs text-blue-400 font-mono">
                            {new Date(m.scheduled_at).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase">
                            {m.duration_minutes} min
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><User size={12} className="text-gray-500" /> {m.user_name || "—"}</span>
                          <span className="flex items-center gap-1"><Mail size={12} className="text-gray-500" /> {m.user_email || "—"}</span>
                        </div>
                        {m.notes && (
                          <div className="flex items-start gap-1 mt-2 text-xs text-gray-500">
                            <FileText size={12} className="mt-0.5 flex-shrink-0" />
                            <span>{m.notes}</span>
                          </div>
                        )}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold flex-shrink-0">
                        Zaplanowane
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white/[0.02] border border-white/5 p-8 text-center">
                <Calendar size={40} className="mx-auto mb-3 text-gray-700" />
                <div className="text-sm text-gray-400">Brak zaplanowanych spotkań</div>
              </div>
            )}
          </section>
        )}

        {/* === Credits info (for users with package, not admin) === */}
        {hasPackage && !isAdmin && (
          <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <Video size={24} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Dostępne spotkania</div>
                  <div className="text-2xl font-black text-blue-400">{data?.credits.remaining ?? 0}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Wykorzystane: {data?.credits.used ?? 0}/{data?.credits.total ?? 0}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  data?.packageType === "premium" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                  data?.packageType === "pro" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                  "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                }`}>
                  {data?.packageType || "basic"}
                </span>
              </div>
            </div>
            {data?.credits.remaining === 0 && (
              <div className="mt-4 rounded-xl bg-orange-500/5 border border-orange-500/20 p-4 text-sm text-orange-400">
                <ShoppingCart size={16} className="inline mr-2" />
                Wykorzystałeś wszystkie spotkania. Dokup kolejne za 200 zł.{" "}
                <Link href="/sklep" className="underline font-semibold">Kup spotkanie →</Link>
              </div>
            )}
          </section>
        )}

        {/* Booking success */}
        {bookingSuccess && (
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6 text-center">
            <CheckCircle size={40} className="mx-auto mb-3 text-green-400" />
            <h3 className="text-lg font-bold text-white mb-1">Spotkanie zarezerwowane!</h3>
            <p className="text-sm text-gray-400">Otrzymasz potwierdzenie i link do spotkania przed terminem.</p>
          </div>
        )}

        {/* Calendar (admin always sees it, users with credits too) */}
        {canBook && (
          <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <Calendar size={20} className="text-blue-400" />
                {isAdmin ? "Kalendarz spotkań" : "Wybierz termin"}
              </h2>
              <div className="flex items-center gap-2">
                <button onClick={() => setWeekOffset((w) => w - 1)} disabled={weekOffset <= 0} title="Poprzedni tydzień" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 transition-all">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-gray-400 min-w-[140px] text-center">
                  {MONTH_NAMES[weekDays[0].getMonth()]} {weekDays[0].getFullYear()}
                </span>
                <button onClick={() => setWeekOffset((w) => w + 1)} disabled={weekOffset >= 8} title="Następny tydzień" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 transition-all">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">{error}</div>
            )}

            {/* Grid */}
            <div className="overflow-x-auto">
              <div className="grid grid-cols-6 gap-1 min-w-[600px]">
                {/* Header */}
                <div className="p-2 text-xs text-gray-600 font-medium" />
                {weekDays.map((day) => (
                  <div key={day.toISOString()} className="p-2 text-center">
                    <div className="text-xs text-gray-500">{DAY_NAMES[day.getDay()]}</div>
                    <div className="text-sm font-bold text-white">{day.getDate()}</div>
                  </div>
                ))}

                {/* Time slots */}
                {HOURS.map((hour) => (
                  <>
                    <div key={`h-${hour}`} className="p-2 text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {hour}:00
                    </div>
                    {weekDays.map((day) => {
                      const slotDate = new Date(day);
                      slotDate.setHours(hour, 0, 0, 0);
                      const slotISO = slotDate.toISOString();
                      const isPast = slotDate < new Date();
                      const isBooked = bookedSlots.has(slotISO);
                      const isSelected = selectedSlot === slotISO;
                      const isWeekend = day.getDay() === 0 || day.getDay() === 6;

                      return (
                        <button
                          key={slotISO}
                          disabled={isPast || isBooked || isWeekend}
                          onClick={() => setSelectedSlot(isSelected ? null : slotISO)}
                          className={`p-2 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? "bg-blue-600 text-white border border-blue-500"
                              : isBooked
                              ? "bg-red-500/10 text-red-400/50 cursor-not-allowed border border-red-500/10"
                              : isPast || isWeekend
                              ? "bg-white/[0.02] text-gray-700 cursor-not-allowed"
                              : "bg-white/[0.03] text-gray-400 hover:bg-blue-500/10 hover:text-blue-400 border border-transparent hover:border-blue-500/20"
                          }`}
                        >
                          {isBooked ? "Zajęte" : isPast || isWeekend ? "—" : "Wolne"}
                        </button>
                      );
                    })}
                  </>
                ))}
              </div>
            </div>

            {/* Booking form */}
            {selectedSlot && (
              <div className="mt-6 rounded-xl bg-blue-500/5 border border-blue-500/20 p-5">
                <h3 className="text-sm font-bold text-white mb-3">
                  Potwierdzenie: {new Date(selectedSlot).toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long" })} o {new Date(selectedSlot).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                </h3>
                <p className="text-xs text-gray-500 mb-3">Czas trwania: 1.5h | Spotkanie online z Patrykiem</p>

                {/* Admin: Employee selection */}
                {isAdmin && data?.userList && data.userList.length > 0 && (
                  <div className="mb-4">
                    <label htmlFor="employee-select" className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                      <Users size={12} /> Wybierz uczestnika spotkania
                    </label>
                    <div className="relative mb-2">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input
                        type="text"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        placeholder="Szukaj po nazwisku lub emailu..."
                        className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0a0a0a] border border-white/10 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50"
                      />
                    </div>
                    <div className="max-h-40 overflow-y-auto rounded-lg border border-white/10 bg-[#0a0a0a] divide-y divide-white/5">
                      {data.userList
                        .filter((u) => {
                          if (!userSearch.trim()) return true;
                          const q = userSearch.toLowerCase();
                          return u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
                        })
                        .slice(0, 20)
                        .map((u) => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => setSelectedUserId(u.id === selectedUserId ? "" : u.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                              selectedUserId === u.id
                                ? "bg-blue-600/10 border-l-2 border-blue-500"
                                : "hover:bg-white/5 border-l-2 border-transparent"
                            }`}
                          >
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-xs font-bold text-gray-400 flex-shrink-0">
                              {u.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-white truncate">{u.full_name}</div>
                              <div className="text-[11px] text-gray-500 truncate">{u.email}</div>
                            </div>
                            {selectedUserId === u.id && <CheckCircle size={14} className="text-blue-400 flex-shrink-0" />}
                          </button>
                        ))}
                    </div>
                    {selectedUserId && (
                      <div className="mt-2 text-xs text-blue-400">
                        Wybrano: {data.userList.find((u) => u.id === selectedUserId)?.full_name || "—"}
                      </div>
                    )}
                  </div>
                )}

                <label htmlFor="meeting-notes" className="block text-xs text-gray-400 mb-1">Notatka (opcjonalna)</label>
                <textarea
                  id="meeting-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Czego chcesz się dowiedzieć na spotkaniu?"
                  rows={2}
                  className="w-full rounded-lg bg-[#0a0a0a] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 mb-3 resize-none"
                />
                <button
                  onClick={handleBook}
                  disabled={booking}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all disabled:opacity-50"
                >
                  {booking ? <><Loader2 size={16} className="animate-spin" /> Rezerwuję...</> : "Zarezerwuj spotkanie"}
                </button>
              </div>
            )}
          </section>
        )}

        {/* User's own meetings list (not admin — they see CRM above) */}
        {hasPackage && !isAdmin && (
          <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <Video size={20} className="text-green-400" />
              Twoje spotkania
            </h2>
            {data?.meetings && data.meetings.length > 0 ? (
              <div className="space-y-3">
                {data.meetings.map((m) => (
                  <div key={m.id} className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${
                      m.status === "scheduled" ? "bg-blue-500/10 text-blue-400" :
                      m.status === "completed" ? "bg-green-500/10 text-green-400" :
                      "bg-gray-500/10 text-gray-400"
                    }`}>
                      <Video size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">
                        {new Date(m.scheduled_at).toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(m.scheduled_at).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })} • {m.duration_minutes} min • {m.admin_name || "Patryk"}
                      </div>
                      {m.notes && <div className="text-xs text-gray-400 mt-1 truncate">{m.notes}</div>}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      m.status === "scheduled" ? "bg-blue-500/10 text-blue-400" :
                      m.status === "completed" ? "bg-green-500/10 text-green-400" :
                      "bg-gray-500/10 text-gray-400"
                    }`}>
                      {m.status === "scheduled" ? "Zaplanowane" : m.status === "completed" ? "Zakończone" : "Anulowane"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white/[0.02] border border-white/5 p-8 text-center">
                <Calendar size={40} className="mx-auto mb-3 text-gray-700" />
                <div className="text-sm text-gray-400">Brak zaplanowanych spotkań</div>
              </div>
            )}
          </section>
        )}

        {/* Admin: Past/completed meetings history */}
        {isAdmin && pastMeetings.length > 0 && (
          <section className="rounded-2xl border border-white/10 bg-[#111] p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <Clock size={20} className="text-gray-400" />
              Historia spotkań ({pastMeetings.length})
            </h2>
            <div className="space-y-2">
              {pastMeetings.map((m) => (
                <div key={m.id} className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/5 p-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 ${
                    m.status === "completed" ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-500"
                  }`}>
                    <Video size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-300">
                        {new Date(m.scheduled_at).toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
                      </span>
                      <span className="text-xs text-gray-600">
                        {new Date(m.scheduled_at).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span className="text-xs text-gray-500">• {m.user_name || "—"}</span>
                    </div>
                    {m.notes && <div className="text-xs text-gray-600 truncate mt-0.5">{m.notes}</div>}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    m.status === "completed" ? "bg-green-500/10 text-green-400" :
                    m.status === "cancelled" ? "bg-red-500/10 text-red-400" :
                    "bg-gray-500/10 text-gray-400"
                  }`}>
                    {m.status === "completed" ? "Zakończone" : m.status === "cancelled" ? "Anulowane" : "Zaplanowane"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
