"use client";
import LegalLayout from "../components/LegalLayout";
import LegalContent from "../components/LegalContent";
import { useLang } from "../context/LanguageContext";
import { legalUI } from "../translations/legal-ui";
import type { LegalPageData } from "../components/LegalContent";
import type { Lang } from "../context/LanguageContext";

const chatbotTerms: Record<Lang, LegalPageData> = {
  pl: {
    title: "Regulamin Chatbota Łajli",
    lastUpdated: "Ostatnia aktualizacja: 25 lutego 2026",
    sections: [
      {
        title: "\u00A71. Postanowienia ogolne",
        items: [
          { type: "ol", items: [
            { text: "Niniejszy Regulamin okresla zasady korzystania z chatbota \u00ABŁajli\u00BB (dalej: \u00ABChatbot\u00BB), dostepnego w serwisie YLY." },
            { text: "Chatbot jest narzedziem opartym na sztucznej inteligencji (model GPT-4o firmy OpenAI), stworzonym w celu udzielania informacji o YLY, produktach, kursach oraz ogolnych zagadnieniach zwiazanych ze sztuczna inteligencja." },
            { text: "Wlascicielem i administratorem Chatbota jest Patryk Olejnik, prowadzacy dzialalnosc gospodarcza (dalej: \u00ABUsługodawca\u00BB)." },
            { text: "Korzystanie z Chatbota jest bezplatne i dobrowolne." },
            { text: "Korzystanie z Chatbota oznacza akceptacje niniejszego Regulaminu." },
          ]},
        ],
      },
      {
        title: "\u00A72. Charakter informacji",
        items: [
          { type: "ol", items: [
            { text: "<strong>Chatbot jest narzedziem informacyjnym i edukacyjnym. Odpowiedzi generowane przez Chatbota nie stanowia porad prawnych, podatkowych, finansowych, medycznych ani zadnych innych porad profesjonalnych.</strong>" },
            { text: "Tresci generowane przez Chatbota sa tworzone automatycznie przez model jezykowy AI i moga zawierac bledy, nieścislosci lub byc nieaktualne." },
            { text: "Chatbot nie zastepuje konsultacji z wlasciwymi specjalistami (prawnikami, doradcami podatkowymi, lekarzami itp.)." },
            { text: "Uzytkownik powinien samodzielnie weryfikowac informacje uzyskane od Chatbota przed podjecziem jakichkolwiek decyzji." },
          ]},
        ],
      },
      {
        title: "\u00A73. Ograniczenie odpowiedzialnosci",
        items: [
          { type: "ol", items: [
            { text: "<strong>Uslugodawca nie ponosi odpowiedzialnosci za tresci generowane przez Chatbota.</strong> Odpowiedzi sa generowane automatycznie przez model AI i nie sa weryfikowane przez czlowieka w czasie rzeczywistym." },
            { text: "Uslugodawca nie ponosi odpowiedzialnosci za jakiekolwiek szkody (bezposrednie, posrednie, przypadkowe, wynikowe lub inne) powstale w wyniku korzystania z informacji udzielonych przez Chatbota, w tym w szczegolnosci za:" ,
              sub: { type: "ul", items: [
                { text: "decyzje podjete na podstawie odpowiedzi Chatbota;" },
                { text: "straty finansowe wynikajace z zastosowania sie do informacji Chatbota;" },
                { text: "bledy, nieścislosci lub luki w odpowiedziach;" },
                { text: "przerwy w dzialaniu Chatbota lub jego niedostepnosc." },
              ]},
            },
            { text: "Chatbot nie gwarantuje poprawnosci, kompletnosci ani aktualnosci generowanych odpowiedzi." },
            { text: "Uslugodawca nie ponosi odpowiedzialnosci za dzialania dostawcy technologii AI (OpenAI) ani za zmiany w dzialaniu modelu jezykowego." },
          ]},
        ],
      },
      {
        title: "\u00A74. Dane osobowe i prywatnosc",
        items: [
          { type: "ol", items: [
            { text: "Chatbot nie zbiera, nie przetwarza ani nie przechowuje danych osobowych Uzytkownikow." },
            { text: "Rozmowy z Chatbotem nie sa zapisywane na serwerach Uslugodawcy po zakonczeniu sesji przegladarki." },
            { text: "Uzytkownik nie powinien podawac Chatbotowi swoich danych osobowych, w tym imienia i nazwiska, numeru PESEL, NIP, adresu, numeru telefonu ani danych finansowych." },
            { text: "W przypadku dobrowolnego podania danych osobowych w tresci wiadomosci, Uslugodawca nie ponosi odpowiedzialnosci za ich przetwarzanie przez dostawce technologii AI (OpenAI). Zasady przetwarzania danych przez OpenAI reguluje polityka prywatnosci OpenAI." },
          ]},
        ],
      },
      {
        title: "\u00A75. Zasady korzystania",
        items: [
          { type: "ol", items: [
            { text: "Uzytkownik zobowiazuje sie do korzystania z Chatbota zgodnie z obowiazujacym prawem i dobrymi obyczajami." },
            { text: "Zabrania sie:" ,
              sub: { type: "ul", items: [
                { text: "wykorzystywania Chatbota do generowania tresci niezgodnych z prawem, szkodliwych lub naruszajacych prawa osob trzecich;" },
                { text: "prob obchodzenia zabezpieczen lub manipulowania odpowiedziami Chatbota;" },
                { text: "automatycznego odpytywania Chatbota (botami, skryptami itp.);" },
                { text: "wykorzystywania Chatbota w celach komercyjnych bez zgody Uslugodawcy." },
              ]},
            },
            { text: "Uslugodawca zastrzega sobie prawo do ograniczenia lub zablokowania dostepu do Chatbota w przypadku naruszenia powyzszych zasad." },
          ]},
        ],
      },
      {
        title: "\u00A76. Dostepnosc i zmiany",
        items: [
          { type: "ol", items: [
            { text: "Uslugodawca nie gwarantuje nieprzerwanej dostepnosci Chatbota." },
            { text: "Chatbot moze byc czasowo niedostepny z powodu prac konserwacyjnych, awarii lub zmian technologicznych." },
            { text: "Uslugodawca zastrzega sobie prawo do modyfikacji, zawieszenia lub zakonczenia dzialania Chatbota w dowolnym momencie, bez wczesniejszego powiadomienia." },
            { text: "Uslugodawca zastrzega sobie prawo do zmiany niniejszego Regulaminu. Aktualna wersja jest zawsze dostepna w serwisie YLY." },
          ]},
        ],
      },
      {
        title: "\u00A77. Postanowienia koncowe",
        items: [
          { type: "ol", items: [
            { text: "W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie maja przepisy prawa polskiego." },
            { text: "Korzystajac z Chatbota, Uzytkownik potwierdza, ze zapoznal sie z niniejszym Regulaminem i akceptuje jego postanowienia." },
            { text: "Regulamin wchodzi w zycie z dniem 25 lutego 2026 r." },
          ]},
        ],
      },
    ],
  },
  en: {
    title: "Łajli Chatbot Terms of Use",
    lastUpdated: "Last updated: February 25, 2026",
    sections: [
      {
        title: "\u00A71. General Provisions",
        items: [
          { type: "ol", items: [
            { text: "These Terms of Use define the rules for using the \u00ABŁajli\u00BB chatbot (hereinafter: \u00ABChatbot\u00BB), available on the YLY website." },
            { text: "The Chatbot is an artificial intelligence tool (GPT-4o model by OpenAI), created to provide information about YLY, products, courses and general topics related to artificial intelligence." },
            { text: "The owner and administrator of the Chatbot is Patryk Olejnik, conducting business activity (hereinafter: \u00ABService Provider\u00BB)." },
            { text: "Use of the Chatbot is free of charge and voluntary." },
            { text: "Using the Chatbot constitutes acceptance of these Terms." },
          ]},
        ],
      },
      {
        title: "\u00A72. Nature of Information",
        items: [
          { type: "ol", items: [
            { text: "<strong>The Chatbot is an informational and educational tool. Responses generated by the Chatbot do not constitute legal, tax, financial, medical or any other professional advice.</strong>" },
            { text: "Content generated by the Chatbot is created automatically by an AI language model and may contain errors, inaccuracies or be outdated." },
            { text: "The Chatbot does not replace consultation with appropriate specialists (lawyers, tax advisors, doctors, etc.)." },
            { text: "Users should independently verify information obtained from the Chatbot before making any decisions." },
          ]},
        ],
      },
      {
        title: "\u00A73. Limitation of Liability",
        items: [
          { type: "ol", items: [
            { text: "<strong>The Service Provider is not liable for content generated by the Chatbot.</strong> Responses are generated automatically by an AI model and are not verified by a human in real time." },
            { text: "The Service Provider is not liable for any damages (direct, indirect, incidental, consequential or otherwise) arising from the use of information provided by the Chatbot, including but not limited to:",
              sub: { type: "ul", items: [
                { text: "decisions made based on the Chatbot's responses;" },
                { text: "financial losses resulting from following the Chatbot's information;" },
                { text: "errors, inaccuracies or gaps in responses;" },
                { text: "interruptions in the Chatbot's operation or its unavailability." },
              ]},
            },
            { text: "The Chatbot does not guarantee the accuracy, completeness or timeliness of generated responses." },
            { text: "The Service Provider is not liable for the actions of the AI technology provider (OpenAI) or for changes in the language model's operation." },
          ]},
        ],
      },
      {
        title: "\u00A74. Personal Data and Privacy",
        items: [
          { type: "ol", items: [
            { text: "The Chatbot does not collect, process or store Users' personal data." },
            { text: "Conversations with the Chatbot are not saved on the Service Provider's servers after the browser session ends." },
            { text: "Users should not provide the Chatbot with their personal data, including name, national ID numbers, tax IDs, address, phone number or financial data." },
            { text: "If personal data is voluntarily provided in the message content, the Service Provider is not liable for its processing by the AI technology provider (OpenAI). Data processing by OpenAI is governed by OpenAI's privacy policy." },
          ]},
        ],
      },
      {
        title: "\u00A75. Rules of Use",
        items: [
          { type: "ol", items: [
            { text: "The User agrees to use the Chatbot in compliance with applicable law and good practice." },
            { text: "It is prohibited to:",
              sub: { type: "ul", items: [
                { text: "use the Chatbot to generate content that is illegal, harmful or violates the rights of third parties;" },
                { text: "attempt to bypass security measures or manipulate the Chatbot's responses;" },
                { text: "automatically query the Chatbot (with bots, scripts, etc.);" },
                { text: "use the Chatbot for commercial purposes without the Service Provider's consent." },
              ]},
            },
            { text: "The Service Provider reserves the right to limit or block access to the Chatbot in case of violation of the above rules." },
          ]},
        ],
      },
      {
        title: "\u00A76. Availability and Changes",
        items: [
          { type: "ol", items: [
            { text: "The Service Provider does not guarantee uninterrupted availability of the Chatbot." },
            { text: "The Chatbot may be temporarily unavailable due to maintenance, failures or technological changes." },
            { text: "The Service Provider reserves the right to modify, suspend or terminate the Chatbot at any time without prior notice." },
            { text: "The Service Provider reserves the right to change these Terms. The current version is always available on the YLY website." },
          ]},
        ],
      },
      {
        title: "\u00A77. Final Provisions",
        items: [
          { type: "ol", items: [
            { text: "In matters not regulated by these Terms, the provisions of Polish law shall apply." },
            { text: "By using the Chatbot, the User confirms that they have read and accept these Terms." },
            { text: "These Terms come into effect on February 25, 2026." },
          ]},
        ],
      },
    ],
  },
  uk: {
    title: "Reguljamin chatbota Łajli",
    lastUpdated: "Ostannje onovlennja: 25 ljutogo 2026",
    sections: [
      {
        title: "\u00A71. Zagalni polozhennja",
        items: [
          { type: "ol", items: [
            { text: "Cej Reguljamin vyznachaje pravyla korystuvannja chatbotom \u00ABŁajli\u00BB (dali: \u00ABChatbot\u00BB), dostupnym na sajti YLY." },
            { text: "Chatbot — ce instrument na bazi shtuchnogo intelektu (model GPT-4o vid OpenAI), stvorenyj dlja nadannja informaciyi pro YLY, produkty, kursy ta zagalni pytannja z ShI." },
            { text: "Vlasnykom ta administratorom Chatbota je Patryk Olejnik (dali: \u00ABPostachalnik poslug\u00BB)." },
            { text: "Korystuvannja Chatbotom je bezkoshtovnym ta dobrovil nym." },
            { text: "Korystuvannja Chatbotom oznachaje pryjnjattja cogo Reguljaminu." },
          ]},
        ],
      },
      {
        title: "\u00A72. Harakter informaciyi",
        items: [
          { type: "ol", items: [
            { text: "<strong>Chatbot je informacijnym ta osvitnij instrumentom. Vidpovidi, zgenerovani Chatbotom, ne je jurydychnymy, podatkovymy, finansovymy, medychnymy chy bud-jakymy inshymy profesijnymy poradamy.</strong>" },
            { text: "Zmist, zgenerovanyj Chatbotom, stvoryujet sja avtomatychno movnoju modellju ShI ta mozhe mistity pomylky." },
            { text: "Chatbot ne zaminjajesonsul taciyi z vidpovidnymy specialistamy." },
            { text: "Korystuvach povynen samostijno pereviryaty informaciju, otrymanu vid Chatbota." },
          ]},
        ],
      },
      {
        title: "\u00A73. Obmezhennja vidpovidalnosti",
        items: [
          { type: "ol", items: [
            { text: "<strong>Postachalnik poslug ne nese vidpovidalnosti za zmist, zgenerovanyj Chatbotom.</strong>" },
            { text: "Postachalnik poslug ne nese vidpovidalnosti za bud-jaki zbytky, shcho vynykly vnaslidok vykorystannja informaciyi vid Chatbota." },
            { text: "Chatbot ne garantuje pravyl nist, povnotu chy aktualnist zgenerovanyh vidpovidej." },
          ]},
        ],
      },
      {
        title: "\u00A74. Personalni dani",
        items: [
          { type: "ol", items: [
            { text: "Chatbot ne zbyraje, ne obrobljaje ta ne zberihaje personalnyh danyh Korystuvachiv." },
            { text: "Rozmovy z Chatbotom ne zberigajutsja pislja zavershennja sesiyi brauzera." },
            { text: "Korystuvach ne povynen nadavaty Chatbotu svoyih personalnyh danyh." },
          ]},
        ],
      },
      {
        title: "\u00A75. Kincevi polozhennja",
        items: [
          { type: "ol", items: [
            { text: "Korystujuchys Chatbotom, Korystuvach pidtverdzhuje, shcho oznajomyvsja z cym Reguljaminom." },
            { text: "Reguljamin nabuvaje chynnosti z 25 ljutogo 2026 r." },
          ]},
        ],
      },
    ],
  },
  es: {
    title: "Terminos de Uso del Chatbot Łajli",
    lastUpdated: "Ultima actualizacion: 25 de febrero de 2026",
    sections: [
      {
        title: "\u00A71. Disposiciones Generales",
        items: [
          { type: "ol", items: [
            { text: "Estos Terminos definen las reglas de uso del chatbot \u00ABŁajli\u00BB (en adelante: \u00ABChatbot\u00BB), disponible en el sitio web de YLY." },
            { text: "El Chatbot es una herramienta de inteligencia artificial (modelo GPT-4o de OpenAI), creada para proporcionar informacion sobre YLY, productos, cursos y temas generales de IA." },
            { text: "El propietario y administrador del Chatbot es Patryk Olejnik (en adelante: \u00ABProveedor del Servicio\u00BB)." },
            { text: "El uso del Chatbot es gratuito y voluntario." },
            { text: "El uso del Chatbot implica la aceptacion de estos Terminos." },
          ]},
        ],
      },
      {
        title: "\u00A72. Naturaleza de la Informacion",
        items: [
          { type: "ol", items: [
            { text: "<strong>El Chatbot es una herramienta informativa y educativa. Las respuestas generadas por el Chatbot no constituyen asesoramiento legal, fiscal, financiero, medico ni ningun otro asesoramiento profesional.</strong>" },
            { text: "El contenido generado por el Chatbot se crea automaticamente por un modelo de lenguaje de IA y puede contener errores, inexactitudes o estar desactualizado." },
            { text: "El Chatbot no sustituye la consulta con especialistas apropiados." },
            { text: "El Usuario debe verificar de forma independiente la informacion obtenida del Chatbot." },
          ]},
        ],
      },
      {
        title: "\u00A73. Limitacion de Responsabilidad",
        items: [
          { type: "ol", items: [
            { text: "<strong>El Proveedor del Servicio no es responsable del contenido generado por el Chatbot.</strong> Las respuestas se generan automaticamente y no son verificadas por un humano en tiempo real." },
            { text: "El Proveedor del Servicio no es responsable de ningun dano derivado del uso de la informacion proporcionada por el Chatbot." },
            { text: "El Chatbot no garantiza la exactitud, integridad ni actualidad de las respuestas generadas." },
          ]},
        ],
      },
      {
        title: "\u00A74. Datos Personales",
        items: [
          { type: "ol", items: [
            { text: "El Chatbot no recopila, procesa ni almacena datos personales de los Usuarios." },
            { text: "Las conversaciones con el Chatbot no se guardan tras finalizar la sesion del navegador." },
            { text: "El Usuario no debe proporcionar al Chatbot sus datos personales." },
          ]},
        ],
      },
      {
        title: "\u00A75. Disposiciones Finales",
        items: [
          { type: "ol", items: [
            { text: "Al utilizar el Chatbot, el Usuario confirma que ha leido y acepta estos Terminos." },
            { text: "Estos Terminos entran en vigor el 25 de febrero de 2026." },
          ]},
        ],
      },
    ],
  },
};

export default function RegulaminChatbotaPage() {
  const { lang } = useLang();
  const data = chatbotTerms[lang];
  const ui = legalUI[lang];
  return (
    <LegalLayout title={data.title} lastUpdated={data.lastUpdated} badge={ui.badge} backLabel={ui.backLabel}>
      <LegalContent sections={data.sections} />
    </LegalLayout>
  );
}
