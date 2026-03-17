import { Lang } from "../context/LanguageContext";

export const legalUI: Record<Lang, {
  badge: string;
  backLabel: string;
  updatedPrefix: string;
  footerCopy: string;
  footerRegulamin: string;
  footerPrivacy: string;
  footerSales: string;
  footerFaq: string;
  footerChatbot: string;
}> = {
  pl: {
    badge: "Dokument prawny",
    backLabel: "Powrót na stronę główną",
    updatedPrefix: "Ostatnia aktualizacja",
    footerCopy: "© 2026 YLY. Wszelkie prawa zastrzeżone.",
    footerRegulamin: "Regulamin",
    footerPrivacy: "Prywatność",
    footerSales: "Sprzedaż",
    footerFaq: "FAQ",
    footerChatbot: "Chatbot",
  },
  en: {
    badge: "Legal Document",
    backLabel: "Back to homepage",
    updatedPrefix: "Last updated",
    footerCopy: "© 2026 YLY. All rights reserved.",
    footerRegulamin: "Terms of Service",
    footerPrivacy: "Privacy",
    footerSales: "Sales Terms",
    footerFaq: "FAQ",
    footerChatbot: "Chatbot",
  },
  uk: {
    badge: "Юридичний документ",
    backLabel: "Повернутися на головну",
    updatedPrefix: "Останнє оновлення",
    footerCopy: "© 2026 YLY. Усі права захищено.",
    footerRegulamin: "Умови користування",
    footerPrivacy: "Конфіденційність",
    footerSales: "Умови продажу",
    footerFaq: "FAQ",
    footerChatbot: "Chatbot",
  },
  es: {
    badge: "Documento legal",
    backLabel: "Volver a la página principal",
    updatedPrefix: "Última actualización",
    footerCopy: "© 2026 YLY. Todos los derechos reservados.",
    footerRegulamin: "Términos de Servicio",
    footerPrivacy: "Privacidad",
    footerSales: "Términos de Venta",
    footerFaq: "FAQ",
    footerChatbot: "Chatbot",
  },
};
