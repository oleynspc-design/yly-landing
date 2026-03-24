"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart,
  BookOpen,
  Sparkles,
  Package,
  FileText,
  Zap,
  Check,
  ArrowRight,
  Shield,
  Lock,
  Loader2,
  Video,
  Crown,
  Star,
  Clock,
} from "lucide-react";

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    
    const update = () => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        setTimeLeft(null);
        return;
      }
      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return <span className="text-xs text-red-400 font-bold uppercase">Promocja zakończona</span>;

  return (
    <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20 w-fit">
      <Clock size={12} className="animate-pulse" />
      Koniec za: {timeLeft.d}d {timeLeft.h.toString().padStart(2, '0')}:{timeLeft.m.toString().padStart(2, '0')}:{timeLeft.s.toString().padStart(2, '0')}
    </div>
  );
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_pln: number;
  type: string;
}

const typeIcons: Record<string, React.ReactNode> = {
  course: <BookOpen size={22} className="text-blue-400" />,
  bundle: <Package size={22} className="text-purple-400" />,
  ebook: <FileText size={22} className="text-green-400" />,
  prompts: <Zap size={22} className="text-yellow-400" />,
};

const typeLabels: Record<string, string> = {
  course: "Kurs online",
  bundle: "Pakiet",
  ebook: "E-book",
  prompts: "Kolekcja promptów",
};

const typeBadgeColors: Record<string, string> = {
  course: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  bundle: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ebook: "bg-green-500/10 text-green-400 border-green-500/20",
  prompts: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

function formatPrice(pricePln: number) {
  return (pricePln / 100).toFixed(2).replace(".", ",") + " zł";
}

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; trainingAccessStatus: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/auth/me").then((r) => r.json()),
    ]).then(([productsData, authData]) => {
      if (productsData.products) setProducts(productsData.products);
      if (authData.user) setUser(authData.user);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleBuy = async (slug: string) => {
    setError("");

    if (!user) {
      router.push(`/logowanie?redirect=/sklep`);
      return;
    }

    setBuying(slug);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: slug }),
      });
      const data = await res.json();

      if (data.url) {
        router.push(data.url);
      } else {
        setError(data.error || "Wystąpił błąd.");
        setBuying(null);
      }
    } catch {
      setError("Nie udało się połączyć z serwerem.");
      setBuying(null);
    }
  };

  const hasAccess = user?.trainingAccessStatus === "granted";

  return (
    <main className="min-h-screen bg-[#080808]">
      {/* Header */}
      <header className="relative py-20 border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <ShoppingCart size={14} />
              Sklep
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              Kursy i materiały AI
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Wybierz kurs lub pakiet, który najlepiej odpowiada Twoim potrzebom. Płatność bezpieczna przez Stripe.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Trust badges */}
      <section className="py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-500" />
              Bezpieczna płatność Stripe
            </div>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-blue-500" />
              Szyfrowanie SSL
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-purple-500" />
              Natychmiastowy dostęp
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-blue-500" />
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              {hasAccess && (
                <div className="mb-8 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                  ✅ Masz już pełny dostęp do szkolenia!{" "}
                  <Link href="/szkolenie" className="underline font-semibold">
                    Przejdź do nauki →
                  </Link>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, i) => {
                  const isBest = product.type === "bundle";
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`relative flex flex-col rounded-2xl border transition-all ${
                        isBest
                          ? "border-purple-500/40 bg-gradient-to-b from-purple-500/5 to-[#0f0f0f]"
                          : "border-white/5 bg-[#0f0f0f] hover:border-blue-500/30"
                      }`}
                    >
                      {isBest && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white text-xs font-bold">
                          <Sparkles size={12} className="inline mr-1" />
                          NAJLEPSZA WARTOŚĆ
                        </div>
                      )}

                      <div className="p-6 flex-1 flex flex-col">
                        {/* Type badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${typeBadgeColors[product.type] || typeBadgeColors.course}`}>
                            {typeIcons[product.type]}
                            {typeLabels[product.type] || product.type}
                          </span>
                        </div>

                        {/* Name & Description */}
                        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-6 flex-1">{product.description}</p>

                        {/* Features for bundle */}
                        {isBest && (
                          <ul className="space-y-2 mb-6">
                            {["Wszystkie kursy AI", "E-booki i materiały", "Kolekcje promptów", "Dostęp do społeczności premium", "Przyszłe aktualizacje gratis"].map((f) => (
                              <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                                <Check size={14} className="text-purple-400 flex-shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Price */}
                        <div className="mb-4">
                          <span className="text-3xl font-black text-white">{formatPrice(product.price_pln)}</span>
                          <span className="text-gray-500 text-sm ml-2">brutto</span>
                        </div>

                        {/* Buy button */}
                        <button
                          onClick={() => handleBuy(product.slug)}
                          disabled={buying === product.slug || hasAccess}
                          className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            isBest
                              ? "bg-purple-600 hover:bg-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
                              : "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/25"
                          }`}
                        >
                          {buying === product.slug ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Przekierowanie...
                            </>
                          ) : hasAccess ? (
                            "Masz już dostęp"
                          ) : !user ? (
                            <>
                              <Lock size={16} />
                              Zaloguj się, aby kupić
                            </>
                          ) : (
                            <>
                              Kup teraz
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Package Tiers */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
                <Crown size={14} />
                Pakiety
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Wybierz swój pakiet</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Każdy pakiet daje dostęp do szkoleń. Pakiety Pro i Premium zawierają spotkania online 1-na-1 z Patrykiem.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Basic */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-col rounded-2xl border border-white/5 bg-[#0f0f0f] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star size={20} className="text-gray-400" />
                <span className="text-xs font-bold uppercase text-gray-400 bg-gray-500/10 px-2.5 py-0.5 rounded-full">Basic</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pakiet Basic</h3>
              <div className="mb-4"><span className="text-3xl font-black text-white">99 zł</span><span className="text-gray-500 text-sm ml-2">jednorazowo</span></div>
              <p className="text-gray-500 text-sm mb-4 flex-1">Wszystko co w pakiecie Pro, ale tylko jedno szkolenie (1h) z możliwością dokupienia kolejnego za 69 zł.</p>
              <ul className="space-y-2 mb-6">
                {["1x szkolenie online (1h)", "Prezentacja ze szkolenia", "Dostęp do dysku Google z materiałami", "Kursy z materiałami w panelu", "Certyfikat ukończenia", "Możliwość dokupienia szkolenia (+69 zł)"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300"><Check size={14} className="text-gray-500 flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <button onClick={() => handleBuy("basic")} disabled={buying === "basic" || hasAccess} className="w-full mt-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {buying === "basic" ? <><Loader2 size={16} className="inline animate-spin mr-2" />Przekierowanie...</> : hasAccess ? "Masz już dostęp" : !user ? <><Lock size={16} className="inline mr-2" />Zaloguj się</> : <>Kup Basic<ArrowRight size={16} className="inline ml-2" /></>}
              </button>
            </motion.div>

            {/* Pro */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="relative flex flex-col rounded-2xl border border-pink-500/40 bg-gradient-to-b from-purple-500/5 to-[#0f0f0f] p-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-bold flex items-center gap-1 shadow-lg shadow-pink-500/30 whitespace-nowrap">
                🐰 PRZECENA WIELKANOCNA
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-pink-400" />
                  <span className="text-xs font-bold uppercase text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-full">Pro</span>
                </div>
                <CountdownTimer targetDate="2026-04-07T23:59:59" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pakiet Pro</h3>
              <div className="mb-4 flex flex-col items-start">
                <span className="text-gray-500 line-through text-lg font-medium mb-[-4px]">599 zł</span>
                <div className="flex items-baseline">
                  <span className="text-3xl font-black text-white">399 zł</span><span className="text-gray-500 text-sm ml-2">jednorazowo</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-4 flex-1">Pakiet z 2 spotkaniami online, prezentacją, dostępem do dysku Google z materiałami, kursami w panelu oraz certyfikatem. Przecena z okazji Świąt Wielkanocnych (do 07.04.2026).</p>
              <ul className="space-y-2 mb-6">
                {["2x spotkania online", "Prezentacja ze szkolenia", "Dostęp do dysku Google z materiałami", "Kursy z materiałami w panelu", "Certyfikat ukończenia"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300"><Check size={14} className="text-pink-400 flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <button onClick={() => handleBuy("pro")} disabled={buying === "pro" || hasAccess} className="w-full mt-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-500 hover:to-orange-400 text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed">
                {buying === "pro" ? <><Loader2 size={16} className="inline animate-spin mr-2" />Przekierowanie...</> : hasAccess ? "Masz już dostęp" : !user ? <><Lock size={16} className="inline mr-2" />Zaloguj się</> : <>Kup Pro<ArrowRight size={16} className="inline ml-2" /></>}
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Spotkanie indywidualne addon */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 flex flex-col justify-between gap-4 h-full">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
                  <Video size={28} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Spotkanie indywidualne</h3>
                  <p className="text-sm text-gray-400">1.5h spotkanie 1-na-1 z Patrykiem. Dowolny temat (np. AI, produktywność).</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-blue-500/10 pt-4 mt-2">
                <span className="text-2xl font-black text-white">149 zł</span>
                <button
                  onClick={() => handleBuy("meeting-addon")}
                  disabled={!user || buying === "meeting-addon"}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all disabled:opacity-50"
                >
                  {buying === "meeting-addon" ? "..." : "Kup spotkanie"}
                </button>
              </div>
            </motion.div>

            {/* Kolejne szkolenie addon */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 flex flex-col justify-between gap-4 h-full">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 flex-shrink-0">
                  <BookOpen size={28} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Dodatkowe szkolenie</h3>
                  <p className="text-sm text-gray-400">Kolejne 1h szkolenie tematyczne. Idealne jako rozszerzenie dla pakietu Basic.</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-purple-500/10 pt-4 mt-2">
                <span className="text-2xl font-black text-white">69 zł</span>
                <button
                  onClick={() => handleBuy("extra-training")}
                  disabled={!user || buying === "extra-training"}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all disabled:opacity-50"
                >
                  {buying === "extra-training" ? "..." : "Kup szkolenie"}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ mini */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Masz pytania?</h2>
          <p className="text-gray-400 mb-6">
            Skontaktuj się z nami przed zakupem — chętnie pomożemy dobrać najlepszy produkt.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:support@yly.com.pl"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/5 transition-all"
            >
              support@yly.com.pl
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/5 transition-all"
            >
              FAQ
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
