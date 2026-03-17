"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import LegalLayout from "../components/LegalLayout";
import { useLang } from "../context/LanguageContext";
import { faqData, FAQItem } from "../translations/faq";
import { legalUI } from "../translations/legal-ui";

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className={`text-base font-medium transition-colors ${open ? "text-blue-400" : "text-white group-hover:text-gray-300"}`}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown size={18} className={open ? "text-blue-400" : "text-gray-600"} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-sm leading-relaxed pb-5 pr-8">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const { lang } = useLang();
  const data = faqData[lang];
  const ui = legalUI[lang];
  return (
    <LegalLayout title={data.title} lastUpdated={data.lastUpdated} badge={ui.badge} backLabel={ui.backLabel}>
      <p className="text-gray-400 text-lg mb-10" dangerouslySetInnerHTML={{ __html: data.intro }} />

      {data.sections.map((section, i) => (
        <div key={i} className="mb-10">
          <h2 className="!mt-0 !mb-4">{section.title}</h2>
          <div className="rounded-xl bg-[#0f0f0f] border border-white/5 px-6">
            {section.items.map((item, j) => (
              <FAQAccordion key={j} item={item} />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-b from-[#0f1520] to-[#0a0a0a] border border-blue-500/20 text-center">
        <h3 className="!mt-0 !mb-2">{data.noAnswer}</h3>
        <p className="text-gray-400 mb-4">{data.noAnswerSub}</p>
        <a
          href="mailto:support@yly.com.pl"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-blue-500/25"
        >
          support@yly.com.pl
        </a>
      </div>
    </LegalLayout>
  );
}
