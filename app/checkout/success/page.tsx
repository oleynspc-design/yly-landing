"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Loader2, BookOpen } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#080808] flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-blue-500" />
      </main>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const initialStatus = sessionId ? "loading" : "error";
  const [status, setStatus] = useState<"loading" | "success" | "error">(initialStatus);

  useEffect(() => {
    if (!sessionId) return;
    // Give webhook a moment to process
    const timer = setTimeout(() => {
      setStatus("success");
    }, 2000);
    return () => clearTimeout(timer);
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {status === "loading" ? (
          <div className="py-20">
            <Loader2 size={48} className="animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Przetwarzanie płatności...</p>
          </div>
        ) : status === "error" ? (
          <div className="py-20">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-red-400 text-2xl">✕</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Coś poszło nie tak</h1>
            <p className="text-gray-400 mb-6">Nie udało się potwierdzić płatności. Skontaktuj się z nami.</p>
            <Link
              href="/sklep"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all"
            >
              Wróć do sklepu
            </Link>
          </div>
        ) : (
          <div className="py-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={40} className="text-green-400" />
            </motion.div>

            <h1 className="text-3xl font-black text-white mb-3">Płatność udana! 🎉</h1>
            <p className="text-gray-400 mb-2">
              Dziękujemy za zakup! Twój dostęp został aktywowany.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Potwierdzenie zostało wysłane na Twój adres e-mail.
            </p>

            <div className="space-y-3">
              <Link
                href="/szkolenie"
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                <BookOpen size={18} />
                Przejdź do szkolenia
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/profil"
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/5 transition-all"
              >
                Mój profil
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </main>
  );
}
