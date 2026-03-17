"use client";
import LegalLayout from "../components/LegalLayout";
import LegalContent from "../components/LegalContent";
import { useLang } from "../context/LanguageContext";
import { salesData } from "../translations/regulamin-sprzedazy";
import { legalUI } from "../translations/legal-ui";

export default function RegulaminSprzedazyPage() {
  const { lang } = useLang();
  const data = salesData[lang];
  const ui = legalUI[lang];
  return (
    <LegalLayout title={data.title} lastUpdated={data.lastUpdated} badge={ui.badge} backLabel={ui.backLabel}>
      <LegalContent sections={data.sections} />
    </LegalLayout>
  );
}