"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center py-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center mx-auto mb-6"
        >
          <XCircle size={40} className="text-orange-400" />
        </motion.div>

        <h1 className="text-3xl font-black text-white mb-3">Płatność anulowana</h1>
        <p className="text-gray-400 mb-8">
          Twoja płatność nie została zrealizowana. Nie pobrano żadnych środków.
          Możesz wrócić do sklepu i spróbować ponownie.
        </p>

        <div className="space-y-3">
          <Link
            href="/sklep"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/25"
          >
            <ShoppingCart size={18} />
            Wróć do sklepu
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/5 transition-all"
          >
            <ArrowLeft size={16} />
            Strona główna
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
