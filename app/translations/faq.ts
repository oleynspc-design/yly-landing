import { Lang } from "../context/LanguageContext";

export type FAQItem = { q: string; a: string };
export type FAQSection = { title: string; items: FAQItem[] };

export type FAQPageData = {
  title: string;
  lastUpdated: string;
  intro: string;
  noAnswer: string;
  noAnswerSub: string;
  sections: FAQSection[];
};

export const faqData: Record<Lang, FAQPageData> = {
  pl: {
    title: "Najczesciej Zadawane Pytania",
    lastUpdated: "Ostatnia aktualizacja: 25 lutego 2026",
    intro: "Znajdz odpowiedzi na najczesciej zadawane pytania dotyczace YLY, naszych produktow, platnosci i spolecznosci. Jesli nie znajdziesz odpowiedzi na swoje pytanie, skontaktuj sie z nami pod adresem <strong>support@yly.com.pl</strong>.",
    noAnswer: "Nie znalazles odpowiedzi?",
    noAnswerSub: "Napisz do nas -- odpowiemy w ciagu 24-48 godzin.",
    sections: [
      {
        title: "Ogolne pytania",
        items: [
          { q: "Czym jest YLY?", a: "YLY to srodowisko rozwoju AI stworzone przez Patryka Olejnika. Nasza misja to edukacja, szkolenia i budowanie spolecznosci ludzi, ktorzy chca wykorzystywac sztuczna inteligencje w pracy i zyciu codziennym." },
          { q: "Dla kogo jest YLY?", a: "YLY jest dla kazdego -- od poczatkujacych, ktorzy chca zrozumiec, czym jest AI i jak z niej korzystac, po zaawansowanych uzytkownikow szukajacych nowych technik i narzedzi." },
          { q: "Czy musze miec doswiadczenie z AI?", a: "Nie. Nasze kursy i materialy sa zaprojektowane tak, aby byly zrozumiale zarowno dla osob poczatkujacych, jak i zaawansowanych." },
          { q: "W jakim jezyku sa materialy?", a: "Wiekszosc naszych materialow jest dostepna w jezyku polskim. Strona internetowa obsluguje 4 jezyki: polski, angielski, ukrainski i hiszpanski." },
        ],
      },
      {
        title: "Zakupy i platnosci",
        items: [
          { q: "Jakie metody platnosci akceptujecie?", a: "Akceptujemy platnosci karta kredytowa/debetowa, szybkie przelewy online (Przelewy24), PayPal oraz tradycyjne przelewy bankowe." },
          { q: "Czy ceny zawieraja VAT?", a: "Tak. Wszystkie ceny podane w serwisie YLY sa cenami brutto, zawierajacymi podatek VAT zgodnie z obowiazujacymi przepisami ustawy o VAT." },
          { q: "Czy moge otrzymac fakture VAT?", a: "Tak. Fakture VAT wystawiamy na zyczenie Kupujacego. Podaj dane firmy (w tym NIP) podczas skladania zamowienia lub skontaktuj sie z nami pod adresem support@yly.com.pl w ciagu 3 miesiecy od zakupu." },
        ],
      },
      {
        title: "Kursy i tresci cyfrowe",
        items: [
          { q: "Jak uzyskam dostep do kursu po zakupie?", a: "Po zaksiegowaniu platnosci otrzymasz automatycznie e-mail z danymi dostepu do kursu. Dostep jest zazwyczaj aktywowany w ciagu kilku minut, maksymalnie do 24 godzin." },
          { q: "Czy dostep do kursow jest czasowo ograniczony?", a: "Kursy jednorazowe daja dostep bezterminowy. Dostep do platformy Skool wymaga aktywnej subskrypcji miesiecznej." },
          { q: "Czy moge udostepnic kurs innej osobie?", a: "Nie. Zakup kursu oznacza nabycie licencji na uzytek osobisty. Udostepnianie tresci osobom trzecim jest zabronione." },
          { q: "W jakim formacie sa e-booki?", a: "E-booki dostarczane sa w formacie PDF, ktory mozna odczytac na kazdym urzadzeniu." },
          { q: "Czym sa kolekcje promptow?", a: "Kolekcje promptow to gotowe, przetestowane zestawy polecen do narzedzi AI takich jak ChatGPT, Claude, Midjourney i inne." },
        ],
      },
      {
        title: "Platforma Skool",
        items: [
          { q: "Czym jest Skool?", a: "Skool to zamknieta platforma edukacyjna, na ktorej znajdziesz wszystkie nasze kursy premium, dodatkowe materialy, sesje na zywo z Patrykiem oraz aktywna spolecznosc." },
          { q: "Jak dziala subskrypcja Skool?", a: "Subskrypcja Skool to platnosc miesieczna, ktora daje Ci nieograniczony dostep do wszystkich tresci premium. Mozesz anulowac subskrypcje w dowolnym momencie." },
          { q: "Czy moge anulowac subskrypcje Skool?", a: "Tak, w dowolnym momencie. Po anulowaniu zachowasz dostep do konca biezacego okresu rozliczeniowego." },
        ],
      },
      {
        title: "Zwroty i reklamacje",
        items: [
          { q: "Czy moge zwrocic zakupiony kurs?", a: "Zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta, prawo odstapienia od umowy nie przysluguje w przypadku tresci cyfrowych dostarczonych online, jezeli spelnianie swiadczenia rozpoczelo sie za wyrazna zgoda Konsumenta. Jesli zgoda nie zostala wyrazona i tresc nie zostala jeszcze dostarczona, masz prawo do odstapienia w ciagu 14 dni." },
          { q: "Jak zlozyc reklamacje?", a: "Reklamacje mozesz zlozyc droga elektroniczna na adres support@yly.com.pl. Podaj: imie i nazwisko, e-mail, date zakupu, nazwe produktu, opis problemu oraz oczekiwany sposob rozwiazania. Rozpatrzymy reklamacje w ciagu 14 dni." },
          { q: "Co jesli produkt jest wadliwy?", a: "Jesli zakupiona tresc cyfrowa jest niezgodna z umowa, masz prawo zadac doprowadzenia tresci do zgodnosci z umowa, obnizenia ceny lub odstapienia od umowy." },
        ],
      },
      {
        title: "Spolecznosc i media",
        items: [
          { q: "Jak dolaczyc do spolecznosci na Discordzie?", a: "Dolaczenie do naszego Discorda jest bezplatne. Wystarczy kliknac link zapraszajacy dostepny na naszej stronie w sekcji Spolecznosc." },
          { q: "Na jakich platformach jestescie aktywni?", a: "Jestesmy aktywni na: Discord, Skool, Facebook, TikTok, YouTube oraz X/Twitter." },
          { q: "Czy tresci na YouTube i TikTok sa bezplatne?", a: "Tak. Tresci publikowane na YouTube i TikToku sa w pelni bezplatne." },
        ],
      },
      {
        title: "Dane osobowe i prywatnosc",
        items: [
          { q: "Jakie dane zbieracie?", a: "Zbieramy tylko dane niezbedne do realizacji uslug: imie, nazwisko, adres e-mail, dane transakcyjne oraz dane analityczne. Szczegoly znajdziesz w naszej Polityce Prywatnosci." },
          { q: "Czy moge usunac swoje dane?", a: "Tak. Zgodnie z art. 17 RODO (prawo do bycia zapomnianym) mozesz zazadac usuniecia swoich danych osobowych, kontaktujac sie z nami na adres support@yly.com.pl." },
          { q: "Czy przekazujecie dane osobom trzecim?", a: "Dane przekazujemy wylacznie zaufanym podmiotom niezbednym do realizacji uslug (dostawcy platnosci, hosting, ksiegowosc) oraz organom panstwowym na podstawie przepisow prawa. Nie sprzedajemy danych osobowych." },
        ],
      },
      {
        title: "Kontakt",
        items: [
          { q: "Jak sie z Wami skontaktowac?", a: "Najszybszy kontakt to e-mail: support@yly.com.pl. Odpowiadamy zazwyczaj w ciagu 24-48 godzin w dni robocze." },
          { q: "Czy oferujecie konsultacje indywidualne?", a: "Tak, oferujemy indywidualne konsultacje AI dla firm i osob prywatnych. Szczegoly i cennik dostepne po kontakcie mailowym na support@yly.com.pl." },
        ],
      },
    ],
  },
  en: {
    title: "Frequently Asked Questions",
    lastUpdated: "Last updated: February 25, 2026",
    intro: "Find answers to frequently asked questions about YLY, our products, payments and community. If you cannot find the answer to your question, contact us at <strong>support@yly.com.pl</strong>.",
    noAnswer: "Didn't find an answer?",
    noAnswerSub: "Write to us -- we'll respond within 24-48 hours.",
    sections: [
      {
        title: "General Questions",
        items: [
          { q: "What is YLY?", a: "YLY is an AI development environment created by Patryk Olejnik. Our mission is education, training and building a community of people who want to use artificial intelligence in work and everyday life." },
          { q: "Who is YLY for?", a: "YLY is for everyone -- from beginners who want to understand what AI is and how to use it, to advanced users looking for new techniques and tools." },
          { q: "Do I need AI experience?", a: "No. Our courses and materials are designed to be understandable for both beginners and advanced users." },
          { q: "What language are the materials in?", a: "Most of our materials are available in Polish. The website supports 4 languages: Polish, English, Ukrainian and Spanish." },
        ],
      },
      {
        title: "Purchases and Payments",
        items: [
          { q: "What payment methods do you accept?", a: "We accept credit/debit card payments, fast online transfers (Przelewy24), PayPal and traditional bank transfers." },
          { q: "Do prices include VAT?", a: "Yes. All prices on the YLY website are gross prices including VAT in accordance with the applicable provisions of the VAT Act." },
          { q: "Can I get a VAT invoice?", a: "Yes. We issue VAT invoices at the Buyer's request. Provide company data (including tax ID) when placing the order or contact us at support@yly.com.pl within 3 months of purchase." },
        ],
      },
      {
        title: "Courses and Digital Content",
        items: [
          { q: "How do I access a course after purchase?", a: "After payment is registered, you will automatically receive an email with access data for the course. Access is usually activated within minutes, up to 24 hours maximum." },
          { q: "Is course access time-limited?", a: "One-time purchase courses provide unlimited access. Access to the Skool platform requires an active monthly subscription." },
          { q: "Can I share a course with someone else?", a: "No. Purchasing a course means acquiring a personal use license. Sharing content with third parties is prohibited." },
          { q: "What format are e-books in?", a: "E-books are delivered in PDF format, which can be read on any device." },
          { q: "What are prompt collections?", a: "Prompt collections are ready-made, tested sets of commands for AI tools such as ChatGPT, Claude, Midjourney and more." },
        ],
      },
      {
        title: "Skool Platform",
        items: [
          { q: "What is Skool?", a: "Skool is a closed educational platform where you'll find all our premium courses, additional materials, live sessions with Patryk and an active community." },
          { q: "How does the Skool subscription work?", a: "The Skool subscription is a monthly payment that gives you unlimited access to all premium content. You can cancel the subscription at any time." },
          { q: "Can I cancel my Skool subscription?", a: "Yes, at any time. After cancellation, you will retain access until the end of the current billing period." },
        ],
      },
      {
        title: "Returns and Complaints",
        items: [
          { q: "Can I return a purchased course?", a: "In accordance with Art. 38(13) of the Consumer Rights Act, the right of withdrawal does not apply to digital content delivered online if performance has begun with the Consumer's express consent. If consent was not given and content has not been delivered yet, you have the right to withdraw within 14 days." },
          { q: "How do I file a complaint?", a: "You can file a complaint electronically at support@yly.com.pl. Include: name, email, purchase date, product name, problem description and expected resolution. We will review the complaint within 14 days." },
          { q: "What if the product is defective?", a: "If the purchased digital content does not conform to the contract, you have the right to request that the content be brought into conformity, a price reduction or withdrawal from the contract." },
        ],
      },
      {
        title: "Community and Media",
        items: [
          { q: "How do I join the Discord community?", a: "Joining our Discord is free. Simply click the invitation link available on our website in the Community section." },
          { q: "What platforms are you active on?", a: "We are active on: Discord, Skool, Facebook, TikTok, YouTube and X/Twitter." },
          { q: "Is YouTube and TikTok content free?", a: "Yes. Content published on YouTube and TikTok is completely free." },
        ],
      },
      {
        title: "Personal Data and Privacy",
        items: [
          { q: "What data do you collect?", a: "We only collect data necessary for service provision: name, email address, transaction data and analytics data. Details can be found in our Privacy Policy." },
          { q: "Can I delete my data?", a: "Yes. In accordance with Art. 17 GDPR (right to be forgotten) you can request deletion of your personal data by contacting us at support@yly.com.pl." },
          { q: "Do you share data with third parties?", a: "We only share data with trusted entities necessary for service provision (payment providers, hosting, accounting) and state authorities based on legal provisions. We do not sell personal data." },
        ],
      },
      {
        title: "Contact",
        items: [
          { q: "How can I contact you?", a: "The fastest contact is email: support@yly.com.pl. We usually respond within 24-48 hours on business days." },
          { q: "Do you offer individual consultations?", a: "Yes, we offer individual AI consultations for companies and individuals. Details and pricing available upon email contact at support@yly.com.pl." },
        ],
      },
    ],
  },
  uk: {
    title: "Chasto zadavani pytannja",
    lastUpdated: "Ostannje onovlennja: 25 ljutogo 2026",
    intro: "Znajdit vidpovidi na najchastishi pytannja pro YLY, nashi produkty, platezhi ta spil notu. Jakshcho vy ne znajdete vidpovidi, zvernit sja do nas za adresoju <strong>support@yly.com.pl</strong>.",
    noAnswer: "Ne znajshly vidpovidi?",
    noAnswerSub: "Napyshit nam -- my vidpovidemo protyagom 24-48 godyn.",
    sections: [
      {
        title: "Zagal ni pytannja",
        items: [
          { q: "Shcho take YLY?", a: "YLY -- ce seredovyshche rozvytku ShI, stvorene Patrykom Olejnikom. Nasha misija -- osvita, navchannja ta pobudova spil noty ljudej, jaki hochut vykorystovuvaty shtuchnyj intelekt." },
          { q: "Dlja kogo YLY?", a: "YLY dlja vsih -- vid pochatkivciv do dosvichenyh korystuvachiv, jaki shukajut novi tehnyky ta instrumenty." },
          { q: "Chy potribnyj dosvid z ShI?", a: "Ni. Nashi kursy ta materialy rozrobleni tak, shchob buly zrozumili jak dlja pochatkivciv, tak i dlja dosvichenyh korystuvachiv." },
          { q: "Jakoju movoju materialy?", a: "Bil shist nashyh materialiv dostupna pol s koju movoju. Sajt pidtrymuje 4 movy: pol s ku, anglijs ku, ukrajins ku ta ispans ku." },
        ],
      },
      {
        title: "Pokupky ta platezhi",
        items: [
          { q: "Jaki metody oplaty vy pryjmajete?", a: "My pryjmajemo oplatu kartoju, shvydki onlajn-perekazy (Przelewy24), PayPal ta tradycijni bankivs ki perekazy." },
          { q: "Chy ciny vkljuchajut PDV?", a: "Tak. Vsi ciny na sajti YLY je cinamy brutto z PDV vidpovidno do chynnogo zakonodavstva." },
          { q: "Chy mozhna otrymaty rahunok-fakturu z PDV?", a: "Tak. My vystavlajemo rahunky-faktury na vymagu Pokopcja. Nadajte dani firmy pid chas zamovlennja abo zvernit sja do nas na support@yly.com.pl." },
        ],
      },
      {
        title: "Kursy ta cyfrovyj kontent",
        items: [
          { q: "Jak otrymaty dostup do kursu pislja pokupky?", a: "Pislja zaraestruvannja platezhu vy avtomatychno otrimajete lyst z danymy dostupu. Dostup aktyvujet sja protyagom kil koh hvylyn, maksymum 24 godyny." },
          { q: "Chy dostup do kursiv obmezenyj u chasi?", a: "Odnorazovi kursy dajut bezstrokovyj dostup. Dostup do platformy Skool vymagaje aktyvno ji misjachno ji pidpysky." },
          { q: "Chy mozhna podilytysja kursom z inshoju osoboju?", a: "Ni. Pokupka kursu oznachaje otrymmannja licenziyi dlja osobystoho vykorystannja. Nadannja kontentutretim osobam zaboroneno." },
          { q: "U jakomu formati elektronni knyhy?", a: "Elektronni knyhy postachajut sja u formati PDF, jakyj mozhna chytaty na bud -jakomu prystroyi." },
          { q: "Shcho take kolekciyi promptiv?", a: "Kolekciyi promptiv -- ce gotovi, protestovani nabory komand dlja instrumentiv ShI, takyh jak ChatGPT, Claude, Midjourney ta inshi." },
        ],
      },
      {
        title: "Platforma Skool",
        items: [
          { q: "Shcho take Skool?", a: "Skool -- ce zakryta osvitnja platforma, de vy znajdete vsi nashi premijum-kursy, dodatkovi materialy, zhyvi sesiyi z Patrykom ta aktyvnu spil notu." },
          { q: "Jak pracjuje pidpyska Skool?", a: "Pidpyska Skool -- ce misjachnyj platizh, jakyj daje vam neobmezhenyj dostup do vsih premijum-materialiv. Vy mozhete skasuvaty pidpysku v bud -jakyj chas." },
          { q: "Chy mozhna skasuvaty pidpysku Skool?", a: "Tak, v bud -jakyj moment. Pislja skasuvannja vy zberezhete dostup do kincja potochnogo rozrahunkovogo periodu." },
        ],
      },
      {
        title: "Povernennja ta reklamaciyi",
        items: [
          { q: "Chy mozhna povernuty prydbanij kurs?", a: "Vidpovidno do zakonodavstva, pravo na vidmovu ne zastosovajet sja do cyfrovogo kontentu, dostavljenogo onlajn, jakshcho vykonannja pochalosia za zhodoju Spozhyvacha. Jakshcho zhoda ne bula nadana, vy majete pravo na vidmovu protyagom 14 dniv." },
          { q: "Jak podaty reklamaciju?", a: "Reklamaciju mozhna podaty elektronnym shljahom na adresu support@yly.com.pl. Vkazhit: im ja, e-mail, datu pokupky, nazvu produktu, opys problemy ta ochikuvane rishennja. My rozhljanemo reklamaciju protyagom 14 dniv." },
          { q: "Shcho jakshcho produkt maje defekt?", a: "Jakshcho prydbanij cyfrovyj kontent ne vidpovidaje dogovoru, vy majete pravo vymahaty pryvedennja kontentu u vidpovidnist, znyzhennja ciny abo vidmovy vid dogovoru." },
        ],
      },
      {
        title: "Spil nota ta media",
        items: [
          { q: "Jak pryjednaty sja do Discord?", a: "Pryjdnannja do nashoho Discord je bezkoshtovnym. Prosto natysnil na posylannja-zaproshennja, dostupne na nashomu sajti v rozdili Spil nota." },
          { q: "Na jakyh platformah vy aktyvni?", a: "My aktyvni na: Discord, Skool, Facebook, TikTok, YouTube ta X/Twitter." },
          { q: "Chy kontent na YouTube ta TikTok bezkoshtovnyj?", a: "Tak. Kontent, opublikovanyj na YouTube ta TikTok, je povnistju bezkoshtovnym." },
        ],
      },
      {
        title: "Personal ni dani ta konfidencijnist",
        items: [
          { q: "Jaki dani vy zbyrjete?", a: "My zbyrjemo lyshe dani, neobhidni dlja nadannja poslug: im ja, adresa e-mail, tranzakcijni ta analitychni dani. Detali -- v nashij Polityci konfidencijnosti." },
          { q: "Chy mozhna vydalyty moyi dani?", a: "Tak. Vidpovidno do st. 17 GDPR (pravo buty zabutym) vy mozhete zazhidaty vydalennja svoyih personal nyh danyh, zvernuvshys do nas na support@yly.com.pl." },
          { q: "Chy vy peredajete dani tretim osobam?", a: "My peredajemo dani lyshe nadijnym sub jektam, neobhidnym dlja nadannja poslug (postachal nyky platezhiv, hostyng, buhhalterija). My ne prodajemo personal ni dani." },
        ],
      },
      {
        title: "Kontakt",
        items: [
          { q: "Jak z vamy zv jazatysja?", a: "Najpashvydshyj kontakt -- e-mail: support@yly.com.pl. My vidpovidajemo zazwychaj protyagom 24-48 godyn u robochi dni." },
          { q: "Chy proponujete indyvidual ni konsul taciyi?", a: "Tak, my proponujemo indyvidual ni konsul taciyi z ShI dlja kompanij ta pryvatnyh osib. Detali za adresoju support@yly.com.pl." },
        ],
      },
    ],
  },
  es: {
    title: "Preguntas Frecuentes",
    lastUpdated: "Ultima actualizacion: 25 de febrero de 2026",
    intro: "Encuentra respuestas a las preguntas mas frecuentes sobre YLY, nuestros productos, pagos y comunidad. Si no encuentras la respuesta a tu pregunta, contactanos en <strong>support@yly.com.pl</strong>.",
    noAnswer: "No encontraste respuesta?",
    noAnswerSub: "Escribenos -- responderemos en 24-48 horas.",
    sections: [
      {
        title: "Preguntas generales",
        items: [
          { q: "Que es YLY?", a: "YLY es un entorno de desarrollo de IA creado por Patryk Olejnik. Nuestra mision es la educacion, la formacion y la construccion de una comunidad de personas que quieren utilizar la inteligencia artificial en el trabajo y la vida cotidiana." },
          { q: "Para quien es YLY?", a: "YLY es para todos -- desde principiantes que quieren entender que es la IA y como usarla, hasta usuarios avanzados que buscan nuevas tecnicas y herramientas." },
          { q: "Necesito experiencia con IA?", a: "No. Nuestros cursos y materiales estan disenados para ser comprensibles tanto para principiantes como para usuarios avanzados." },
          { q: "En que idioma estan los materiales?", a: "La mayoria de nuestros materiales estan disponibles en polaco. El sitio web admite 4 idiomas: polaco, ingles, ucraniano y espanol." },
        ],
      },
      {
        title: "Compras y pagos",
        items: [
          { q: "Que metodos de pago aceptan?", a: "Aceptamos pagos con tarjeta de credito/debito, transferencias rapidas en linea (Przelewy24), PayPal y transferencias bancarias tradicionales." },
          { q: "Los precios incluyen IVA?", a: "Si. Todos los precios en el sitio web de YLY son precios brutos con IVA incluido de acuerdo con la legislacion vigente." },
          { q: "Puedo obtener una factura con IVA?", a: "Si. Emitimos facturas con IVA a peticion del Comprador. Proporcione los datos de la empresa (incluido el NIF) al realizar el pedido o contactenos en support@yly.com.pl." },
        ],
      },
      {
        title: "Cursos y contenido digital",
        items: [
          { q: "Como accedo al curso despues de la compra?", a: "Despues del registro del pago, recibira automaticamente un correo electronico con los datos de acceso al curso. El acceso suele activarse en minutos, hasta un maximo de 24 horas." },
          { q: "El acceso al curso tiene limite de tiempo?", a: "Los cursos de compra unica proporcionan acceso ilimitado. El acceso a la plataforma Skool requiere una suscripcion mensual activa." },
          { q: "Puedo compartir un curso con otra persona?", a: "No. La compra de un curso significa la adquisicion de una licencia de uso personal. Compartir el contenido con terceros esta prohibido." },
          { q: "En que formato estan los e-books?", a: "Los e-books se entregan en formato PDF, que se puede leer en cualquier dispositivo." },
          { q: "Que son las colecciones de prompts?", a: "Las colecciones de prompts son conjuntos de comandos listos y probados para herramientas de IA como ChatGPT, Claude, Midjourney y mas." },
        ],
      },
      {
        title: "Plataforma Skool",
        items: [
          { q: "Que es Skool?", a: "Skool es una plataforma educativa cerrada donde encontraras todos nuestros cursos premium, materiales adicionales, sesiones en vivo con Patryk y una comunidad activa." },
          { q: "Como funciona la suscripcion a Skool?", a: "La suscripcion a Skool es un pago mensual que te da acceso ilimitado a todo el contenido premium. Puedes cancelar la suscripcion en cualquier momento." },
          { q: "Puedo cancelar mi suscripcion a Skool?", a: "Si, en cualquier momento. Despues de la cancelacion, mantendras el acceso hasta el final del periodo de facturacion actual." },
        ],
      },
      {
        title: "Devoluciones y reclamaciones",
        items: [
          { q: "Puedo devolver un curso comprado?", a: "De acuerdo con la legislacion, el derecho de desistimiento no se aplica al contenido digital entregado en linea si la ejecucion ha comenzado con el consentimiento expreso del Consumidor. Si no se dio el consentimiento, tiene derecho a desistir en un plazo de 14 dias." },
          { q: "Como presento una reclamacion?", a: "Puede presentar una reclamacion electronicamente en support@yly.com.pl. Incluya: nombre, email, fecha de compra, nombre del producto, descripcion del problema y resolucion esperada. Revisaremos la reclamacion en 14 dias." },
          { q: "Y si el producto es defectuoso?", a: "Si el contenido digital adquirido no se ajusta al contrato, tiene derecho a solicitar la conformidad, una reduccion del precio o el desistimiento del contrato." },
        ],
      },
      {
        title: "Comunidad y medios",
        items: [
          { q: "Como unirme a la comunidad de Discord?", a: "Unirse a nuestro Discord es gratuito. Simplemente haz clic en el enlace de invitacion disponible en nuestra web en la seccion Comunidad." },
          { q: "En que plataformas estais activos?", a: "Estamos activos en: Discord, Skool, Facebook, TikTok, YouTube y X/Twitter." },
          { q: "El contenido de YouTube y TikTok es gratuito?", a: "Si. El contenido publicado en YouTube y TikTok es completamente gratuito." },
        ],
      },
      {
        title: "Datos personales y privacidad",
        items: [
          { q: "Que datos recopilais?", a: "Solo recopilamos datos necesarios para la prestacion de servicios: nombre, email, datos de transacciones y datos analiticos. Los detalles se encuentran en nuestra Politica de Privacidad." },
          { q: "Puedo eliminar mis datos?", a: "Si. De acuerdo con el Art. 17 del RGPD (derecho al olvido) puede solicitar la eliminacion de sus datos personales contactandonos en support@yly.com.pl." },
          { q: "Compartis datos con terceros?", a: "Solo compartimos datos con entidades de confianza necesarias para la prestacion de servicios (proveedores de pago, hosting, contabilidad). No vendemos datos personales." },
        ],
      },
      {
        title: "Contacto",
        items: [
          { q: "Como puedo contactaros?", a: "El contacto mas rapido es el email: support@yly.com.pl. Normalmente respondemos en 24-48 horas en dias laborables." },
          { q: "Ofreceis consultas individuales?", a: "Si, ofrecemos consultas individuales de IA para empresas y particulares. Detalles y precios disponibles por email en support@yly.com.pl." },
        ],
      },
    ],
  },
};
