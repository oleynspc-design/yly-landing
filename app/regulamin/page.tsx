"use client";
import LegalLayout from "../components/LegalLayout";
import LegalContent from "../components/LegalContent";
import { useLang } from "../context/LanguageContext";
import { regulaminData } from "../translations/regulamin";
import { legalUI } from "../translations/legal-ui";

export default function RegulaminPage() {
  const { lang } = useLang();
  const data = regulaminData[lang];
  const ui = legalUI[lang];
  return (
    <LegalLayout title={data.title} lastUpdated={data.lastUpdated} badge={ui.badge} backLabel={ui.backLabel}>
      <LegalContent sections={data.sections} />
    </LegalLayout>
  );
}
