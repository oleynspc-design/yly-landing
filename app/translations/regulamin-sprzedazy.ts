import { Lang } from "../context/LanguageContext";
import { LegalPageData } from "../components/LegalContent";

export const salesData: Record<Lang, LegalPageData> = {
  pl: {
    title: "Regulamin Sprzedazy",
    lastUpdated: "Ostatnia aktualizacja: 25 lutego 2026",
    sections: [
      {
        title: "\u00a71. Postanowienia ogolne",
        items: [
          { type: "ol", items: [
            { text: "Niniejszy Regulamin Sprzedazy okresla zasady i warunki sprzedazy tresci cyfrowych oferowanych za posrednictwem serwisu YLY." },
            { text: "Sprzedawca jest Patryk Olejnik, prowadzacy dzialalnosc gospodarcza." },
            { text: "Regulamin zostal sporządzony w oparciu o przepisy prawa polskiego, w szczegolnosci:", sub: { type: "ul", items: [
              { text: "Ustawe z dnia 23 kwietnia 1964 r. -- Kodeks cywilny;" },
              { text: "Ustawe z dnia 30 maja 2014 r. o prawach konsumenta;" },
              { text: "Ustawe z dnia 18 lipca 2002 r. o swiadczeniu uslug droga elektroniczna;" },
              { text: "Ustawe z dnia 11 marca 2004 r. o podatku od towarow i uslug (VAT);" },
              { text: "Ustawe z dnia 29 sierpnia 1997 r. -- Ordynacja podatkowa;" },
              { text: "Ustawe z dnia 26 lipca 1991 r. o podatku dochodowym od osob fizycznych." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a72. Definicje",
        items: [
          { type: "ul", items: [
            { text: "<strong>Kupujacy</strong> -- osoba fizyczna, osoba prawna lub jednostka organizacyjna dokonujaca zakupu tresci cyfrowych w Serwisie." },
            { text: "<strong>Konsument</strong> -- Kupujacy bedacy osoba fizyczna dokonujaca czynnosci prawnej niezwiazanej bezposrednio z jej dzialalnoscia gospodarcza lub zawodowa (art. 22\u00b9 Kodeksu cywilnego)." },
            { text: "<strong>Przedsiebiorca na prawach konsumenta</strong> -- osoba fizyczna prowadzaca jednoosobowa dzialalnosc gospodarcza, zawierajaca umowe bezposrednio zwiazana z jej dzialalnoscia, ale nieposiadajaca dla niej charakteru zawodowego." },
            { text: "<strong>Tresci cyfrowe</strong> -- produkty niemajace postaci materialnej: kursy wideo, e-booki (PDF), kolekcje promptow, dostep do platformy Skool." },
            { text: "<strong>Umowa</strong> -- umowa o dostarczanie tresci cyfrowych zawarta na odleglosc pomiedzy Sprzedawca a Kupujacym." },
            { text: "<strong>Zamowienie</strong> -- oswiadczenie woli Kupujacego zmierzajace do zawarcia Umowy za posrednictwem Serwisu." },
          ]},
        ],
      },
      {
        title: "\u00a73. Przedmiot sprzedazy",
        items: [
          { type: "ol", items: [
            { text: "Sprzedawca oferuje nastepujace tresci cyfrowe:", sub: { type: "ul", items: [
              { text: "<strong>Kursy AI</strong> -- kursy wideo dostepne online po dokonaniu zakupu;" },
              { text: "<strong>E-booki</strong> -- ksiazki elektroniczne w formacie PDF;" },
              { text: "<strong>Kolekcje promptow</strong> -- zestawy gotowych promptow do narzedzi AI;" },
              { text: "<strong>Dostep do Skool</strong> -- abonament miesieczny na zamknieta platforme edukacyjna." },
            ]}},
            { text: "Wszystkie ceny podane w Serwisie sa cenami brutto (zawierajacymi podatek VAT), wyrazonymi w zlotych polskich (PLN), o ile nie wskazano inaczej." },
          ]},
        ],
      },
      {
        title: "\u00a74. Skladanie zamowien",
        items: [
          { type: "ol", items: [
            { text: "Zamowienie sklada sie poprzez:", sub: { type: "ul", items: [
              { text: "wybor tresci cyfrowej w Serwisie;" },
              { text: "podanie wymaganych danych (imie, nazwisko, adres e-mail, a w przypadku faktury VAT -- dane firmy wraz z NIP);" },
              { text: "akceptacje niniejszego Regulaminu;" },
              { text: "dokonanie platnosci." },
            ]}},
            { text: "Zlozenie Zamowienia stanowi oferte zawarcia Umowy w rozumieniu art. 66 Kodeksu cywilnego." },
            { text: "Umowa zostaje zawarta z chwila potwierdzenia Zamowienia przez Sprzedawce, co nastepuje automatycznie po zaksiegowaniu platnosci." },
            { text: "Po zawarciu Umowy Kupujacy otrzymuje potwierdzenie na podany adres e-mail wraz z danymi dostepu do zakupionych tresci." },
          ]},
        ],
      },
      {
        title: "\u00a75. Ceny i platnosci",
        items: [
          { type: "ol", items: [
            { text: "Ceny tresci cyfrowych sa cenami brutto i zawieraja podatek VAT zgodnie z obowiazujaca stawka wynikajaca z ustawy o VAT." },
            { text: "Platnosci realizowane sa za posrednictwem:", sub: { type: "ul", items: [
              { text: "elektronicznych systemow platnosci (np. Stripe, Przelewy24, PayPal);" },
              { text: "przelewu bankowego na rachunek Sprzedawcy." },
            ]}},
            { text: "W przypadku subskrypcji (dostep do Skool) platnosc pobierana jest cyklicznie. Kupujacy moze anulowac subskrypcje w dowolnym momencie -- dostep wygasa z koncem oplaconego okresu rozliczeniowego." },
          ]},
        ],
      },
      {
        title: "\u00a76. Dostarczanie tresci cyfrowych",
        items: [
          { type: "ol", items: [
            { text: "Tresci cyfrowe dostarczane sa w formie elektronicznej:", sub: { type: "ul", items: [
              { text: "kursy wideo -- poprzez dostep online na platformie Serwisu lub Skool;" },
              { text: "e-booki i kolekcje promptow -- poprzez link do pobrania wyslany na adres e-mail Kupujacego;" },
              { text: "dostep do Skool -- poprzez zaproszenie do zamknietej grupy na platformie Skool." },
            ]}},
            { text: "Dostarczenie tresci cyfrowych nastepuje niezwlocznie po zaksiegowaniu platnosci, nie pozniej niz w ciagu 24 godzin." },
            { text: "W przypadku opoznien Kupujacy powinien skontaktowac sie ze Sprzedawca pod adresem: <strong>support@yly.com.pl</strong>." },
          ]},
        ],
      },
      {
        title: "\u00a77. Prawo odstapienia od umowy",
        items: [
          { type: "ol", items: [
            { text: "Konsument oraz Przedsiebiorca na prawach konsumenta maja prawo do odstapienia od Umowy w terminie <strong>14 dni</strong> od dnia zawarcia Umowy bez podawania przyczyny, zgodnie z art. 27 ustawy o prawach konsumenta." },
            { text: "<strong>Wyjatek:</strong> Prawo odstapienia od Umowy nie przysluguje, jezeli Sprzedawca dostarczyl tresc cyfrowa, a spelnianie swiadczenia rozpoczelo sie za wyrazna i uprzednia zgoda Konsumenta, ktory zostal poinformowany o utracie prawa odstapienia (art. 38 pkt 13 ustawy o prawach konsumenta)." },
            { text: "Przed dostarczeniem tresci cyfrowych Kupujacy zostanie poproszony o wyrazenie zgody na rozpoczecie swiadczenia przed uplywem terminu do odstapienia." },
            { text: "Oswiadczenie o odstapieniu od umowy Kupujacy moze zlozyc droga elektroniczna na adres: <strong>support@yly.com.pl</strong>." },
            { text: "W przypadku skutecznego odstapienia Sprzedawca zwraca wszystkie otrzymane platnosci nie pozniej niz w terminie 14 dni." },
          ]},
        ],
      },
      {
        title: "\u00a78. Reklamacje i rekojmia",
        items: [
          { type: "ol", items: [
            { text: "Sprzedawca ponosi odpowiedzialnosc za zgodnosc tresci cyfrowych z umowa na zasadach okreslonych w Rozdziale 5b ustawy o prawach konsumenta (art. 43a--43g)." },
            { text: "W przypadku niezgodnosci tresci cyfrowej z umowa Kupujacy moze zadac:", sub: { type: "ul", items: [
              { text: "doprowadzenia tresci cyfrowej do zgodnosci z umowa;" },
              { text: "obnizenia ceny lub odstapienia od umowy -- jezeli doprowadzenie do zgodnosci jest niemozliwe lub nadmiernie utrudnione." },
            ]}},
            { text: "Reklamacje nalezy zlozyc droga elektroniczna na adres: <strong>support@yly.com.pl</strong>, podajac:", sub: { type: "ul", items: [
              { text: "dane Kupujacego (imie, nazwisko, e-mail);" },
              { text: "date zakupu i nazwe produktu;" },
              { text: "opis niezgodnosci;" },
              { text: "zadanie Kupujacego." },
            ]}},
            { text: "Sprzedawca rozpatrzy reklamacje w terminie <strong>14 dni</strong> od daty jej otrzymania. Brak odpowiedzi w tym terminie oznacza uznanie reklamacji." },
          ]},
        ],
      },
      {
        title: "\u00a79. Dokumenty sprzedazy i obowiazki podatkowe",
        items: [
          { type: "ol", items: [
            { text: "Do kazdego zamowienia Sprzedawca wystawia <strong>paragon fiskalny</strong> lub -- na zyczenie Kupujacego -- <strong>fakture VAT</strong>, zgodnie z art. 106a--106q ustawy o VAT." },
            { text: "Faktura VAT wystawiana jest na podstawie danych podanych przez Kupujacego podczas skladania Zamowienia (w tym NIP w przypadku przedsiebiorcow)." },
            { text: "Zadanie wystawienia faktury VAT nalezy zglosic nie pozniej niz w terminie 3 miesiecy od konca miesiaca, w ktorym dokonano transakcji (art. 106b ust. 3 ustawy o VAT)." },
            { text: "Dokumenty sprzedazy wysylane sa w formie elektronicznej (e-faktura) na adres e-mail Kupujacego." },
            { text: "Sprzedawca jest podatnikiem VAT i odprowadza nalezny podatek zgodnie z obowiazujacymi przepisami." },
          ]},
        ],
      },
      {
        title: "\u00a710. Licencja na tresci cyfrowe",
        items: [
          { type: "ol", items: [
            { text: "Z chwila dostarczenia tresci cyfrowych Kupujacy otrzymuje niewylaczna, niezbywalna, ograniczona licencje na korzystanie z zakupionych tresci wylacznie na uzytek osobisty." },
            { text: "Licencja nie obejmuje prawa do:", sub: { type: "ul", items: [
              { text: "dalszego rozpowszechniania, odsprzedazy lub wynajmu tresci cyfrowych;" },
              { text: "publicznego odtwarzania lub prezentowania;" },
              { text: "modyfikowania tresci w celach komercyjnych;" },
              { text: "udostepniania danych logowania osobom trzecim." },
            ]}},
            { text: "Naruszenie warunkow licencji uprawnia Sprzedawce do zablokowania dostepu do tresci bez prawa do zwrotu platnosci." },
          ]},
        ],
      },
      {
        title: "\u00a711. Odpowiedzialnosc",
        items: [
          { type: "ol", items: [
            { text: "Tresci cyfrowe maja charakter edukacyjny i informacyjny. Sprzedawca nie gwarantuje osiagniecia konkretnych wynikow biznesowych, finansowych ani zawodowych." },
            { text: "Sprzedawca nie ponosi odpowiedzialnosci za sposob wykorzystania zakupionych tresci przez Kupujacego." },
          ]},
        ],
      },
      {
        title: "\u00a712. Pozasadowe rozwiazywanie sporow",
        items: [
          { type: "ol", items: [
            { text: "Konsument ma prawo skorzystac z pozasadowych sposobow rozpatrywania reklamacji:", sub: { type: "ul", items: [
              { text: "mediacja prowadzona przez Wojewodzkie Inspektoraty Inspekcji Handlowej;" },
              { text: "staly polubowny sad konsumencki;" },
              { text: "pomoc powiatowego (miejskiego) rzecznika konsumentow;" },
              { text: "platforma ODR: <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>https://ec.europa.eu/consumers/odr</a>." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a713. Postanowienia koncowe",
        items: [
          { type: "ol", items: [
            { text: "W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie maja przepisy prawa polskiego." },
            { text: "Sprzedawca zastrzega sobie prawo do zmiany Regulaminu. Zmiany wchodza w zycie po uplywie 14 dni od ich opublikowania w Serwisie." },
            { text: "Regulamin wchodzi w zycie z dniem 25 lutego 2026 r." },
          ]},
        ],
      },
    ],
  },
  en: {
    title: "Sales Terms",
    lastUpdated: "Last updated: February 25, 2026",
    sections: [
      {
        title: "\u00a71. General Provisions",
        items: [
          { type: "ol", items: [
            { text: "These Sales Terms define the rules and conditions for the sale of digital content offered through the YLY service." },
            { text: "The Seller is Patryk Olejnik, conducting business activity." },
            { text: "These Terms have been prepared based on Polish law, in particular:", sub: { type: "ul", items: [
              { text: "The Civil Code of April 23, 1964;" },
              { text: "The Consumer Rights Act of May 30, 2014;" },
              { text: "The Act on Provision of Electronic Services of July 18, 2002;" },
              { text: "The Act on Value Added Tax (VAT) of March 11, 2004;" },
              { text: "The Tax Ordinance of August 29, 1997;" },
              { text: "The Personal Income Tax Act of July 26, 1991." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a72. Definitions",
        items: [
          { type: "ul", items: [
            { text: "<strong>Buyer</strong> -- a natural person, legal person or organizational unit purchasing digital content in the Service." },
            { text: "<strong>Consumer</strong> -- a Buyer who is a natural person performing a legal action not directly related to their business or professional activity." },
            { text: "<strong>Entrepreneur with consumer rights</strong> -- a natural person conducting a sole proprietorship, entering into a contract directly related to their business activity but not of a professional nature for them." },
            { text: "<strong>Digital Content</strong> -- non-material products delivered electronically: video courses, e-books (PDF), prompt collections, access to the Skool platform." },
            { text: "<strong>Contract</strong> -- a contract for the supply of digital content concluded remotely between the Seller and the Buyer." },
            { text: "<strong>Order</strong> -- a declaration of intent by the Buyer to conclude a Contract through the Service." },
          ]},
        ],
      },
      {
        title: "\u00a73. Subject of Sale",
        items: [
          { type: "ol", items: [
            { text: "The Seller offers the following digital content:", sub: { type: "ul", items: [
              { text: "<strong>AI Courses</strong> -- video courses available online after purchase;" },
              { text: "<strong>E-books</strong> -- electronic books in PDF format;" },
              { text: "<strong>Prompt Collections</strong> -- sets of ready-made prompts for AI tools;" },
              { text: "<strong>Skool Access</strong> -- monthly subscription to a closed educational platform." },
            ]}},
            { text: "All prices in the Service are gross prices (including VAT), expressed in Polish zloty (PLN), unless stated otherwise." },
          ]},
        ],
      },
      {
        title: "\u00a74. Placing Orders",
        items: [
          { type: "ol", items: [
            { text: "An Order is placed by:", sub: { type: "ul", items: [
              { text: "selecting digital content in the Service;" },
              { text: "providing required data (name, surname, email address, and for VAT invoice -- company data with tax ID);" },
              { text: "accepting these Terms;" },
              { text: "making payment." },
            ]}},
            { text: "Placing an Order constitutes an offer to conclude a Contract within the meaning of Article 66 of the Polish Civil Code." },
            { text: "The Contract is concluded upon confirmation of the Order by the Seller, which occurs automatically after payment is registered." },
            { text: "After the Contract is concluded, the Buyer receives confirmation at the provided email address with access data for purchased content." },
          ]},
        ],
      },
      {
        title: "\u00a75. Prices and Payments",
        items: [
          { type: "ol", items: [
            { text: "Prices of digital content are gross prices and include VAT in accordance with the applicable rate under the VAT Act." },
            { text: "Payments are processed through:", sub: { type: "ul", items: [
              { text: "electronic payment systems (e.g., Stripe, Przelewy24, PayPal);" },
              { text: "bank transfer to the Seller's account." },
            ]}},
            { text: "For subscriptions (Skool access), payment is collected cyclically. The Buyer may cancel the subscription at any time -- access expires at the end of the paid billing period." },
          ]},
        ],
      },
      {
        title: "\u00a76. Delivery of Digital Content",
        items: [
          { type: "ol", items: [
            { text: "Digital content is delivered electronically:", sub: { type: "ul", items: [
              { text: "video courses -- through online access on the Service platform or Skool;" },
              { text: "e-books and prompt collections -- through a download link sent to the Buyer's email;" },
              { text: "Skool access -- through an invitation to a closed group on the Skool platform." },
            ]}},
            { text: "Digital content delivery occurs immediately after payment registration, no later than within 24 hours." },
            { text: "In case of delays, the Buyer should contact the Seller at: <strong>support@yly.com.pl</strong>." },
          ]},
        ],
      },
      {
        title: "\u00a77. Right of Withdrawal",
        items: [
          { type: "ol", items: [
            { text: "The Consumer and the Entrepreneur with consumer rights have the right to withdraw from the Contract within <strong>14 days</strong> of its conclusion without stating reasons, in accordance with the Consumer Rights Act." },
            { text: "<strong>Exception:</strong> The right of withdrawal does not apply if the Seller has delivered the digital content and performance has begun with the Consumer's express and prior consent, who was informed of the loss of the right of withdrawal (Art. 38(13) of the Consumer Rights Act)." },
            { text: "Before delivery, the Buyer will be asked to consent to the commencement of performance before the withdrawal period expires." },
            { text: "The withdrawal statement may be submitted electronically to: <strong>support@yly.com.pl</strong>." },
            { text: "In the case of effective withdrawal, the Seller returns all payments received no later than within 14 days." },
          ]},
        ],
      },
      {
        title: "\u00a78. Complaints and Warranty",
        items: [
          { type: "ol", items: [
            { text: "The Seller is liable for the conformity of digital content with the contract as defined in Chapter 5b of the Consumer Rights Act (Art. 43a-43g)." },
            { text: "In the case of non-conformity of digital content with the contract, the Buyer may request:", sub: { type: "ul", items: [
              { text: "bringing the digital content into conformity with the contract;" },
              { text: "a price reduction or withdrawal from the contract -- if bringing into conformity is impossible or excessively difficult." },
            ]}},
            { text: "Complaints should be submitted electronically to: <strong>support@yly.com.pl</strong>, providing:", sub: { type: "ul", items: [
              { text: "Buyer's data (name, surname, email);" },
              { text: "purchase date and product name;" },
              { text: "description of non-conformity;" },
              { text: "Buyer's request." },
            ]}},
            { text: "The Seller will review the complaint within <strong>14 days</strong> of receiving it. Failure to respond within this period means the complaint is accepted." },
          ]},
        ],
      },
      {
        title: "\u00a79. Sales Documents and Tax Obligations",
        items: [
          { type: "ol", items: [
            { text: "For each order, the Seller issues a <strong>fiscal receipt</strong> or -- at the Buyer's request -- a <strong>VAT invoice</strong>, in accordance with Art. 106a-106q of the VAT Act." },
            { text: "VAT invoices are issued based on data provided by the Buyer during the Order (including tax ID for entrepreneurs)." },
            { text: "A request for a VAT invoice must be made no later than 3 months from the end of the month in which the transaction was made (Art. 106b(3) of the VAT Act)." },
            { text: "Sales documents are sent electronically (e-invoice) to the Buyer's email address." },
            { text: "The Seller is a VAT taxpayer and remits the due tax in accordance with applicable regulations." },
          ]},
        ],
      },
      {
        title: "\u00a710. Digital Content License",
        items: [
          { type: "ol", items: [
            { text: "Upon delivery of digital content, the Buyer receives a non-exclusive, non-transferable, limited license to use the purchased content solely for personal use." },
            { text: "The license does not include the right to:", sub: { type: "ul", items: [
              { text: "further distribute, resell or rent digital content;" },
              { text: "publicly perform or present;" },
              { text: "modify content for commercial purposes;" },
              { text: "share login credentials with third parties." },
            ]}},
            { text: "Violation of license terms entitles the Seller to block access to content without the right to a refund." },
          ]},
        ],
      },
      {
        title: "\u00a711. Liability",
        items: [
          { type: "ol", items: [
            { text: "Digital content is educational and informational in nature. The Seller does not guarantee the achievement of specific business, financial or professional results." },
            { text: "The Seller is not liable for the manner in which the Buyer uses the purchased content." },
          ]},
        ],
      },
      {
        title: "\u00a712. Out-of-Court Dispute Resolution",
        items: [
          { type: "ol", items: [
            { text: "The Consumer has the right to use out-of-court complaint resolution methods:", sub: { type: "ul", items: [
              { text: "mediation conducted by Provincial Trade Inspectorates;" },
              { text: "permanent consumer arbitration court;" },
              { text: "assistance from the district (municipal) consumer ombudsman;" },
              { text: "ODR platform: <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>https://ec.europa.eu/consumers/odr</a>." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a713. Final Provisions",
        items: [
          { type: "ol", items: [
            { text: "In matters not regulated by these Terms, the provisions of Polish law shall apply." },
            { text: "The Seller reserves the right to amend the Terms. Changes take effect 14 days after publication in the Service." },
            { text: "These Terms enter into force on February 25, 2026." },
          ]},
        ],
      },
    ],
  },
  uk: {
    title: "Umovy prodazhu",
    lastUpdated: "Ostannje onovlennja: 25 ljutogo 2026",
    sections: [
      {
        title: "\u00a71. Zagalni polozhennja",
        items: [
          { type: "ol", items: [
            { text: "Ci Umovy prodazhu vyznachajut pravyla ta umovy prodazhu cyfrovogo kontentu, shcho proponujet sja cherez servis YLY." },
            { text: "Prodavcem je Patryk Olejnik, jakyj provadyt pidpryjemnyc ku dijal nist ." },
            { text: "Umovy skladeni na osnovi pol s kogo zakonodavstva, zokrema:", sub: { type: "ul", items: [
              { text: "Cyvil noho kodeksu vid 23 kvitnja 1964 r.;" },
              { text: "Zakonu pro prava spozhyvachiv vid 30 travnja 2014 r.;" },
              { text: "Zakonu pro nadannja elektronnyh poslug vid 18 lypnja 2002 r.;" },
              { text: "Zakonu pro podatok na dodanu vartist (PDV) vid 11 bereznja 2004 r.;" },
              { text: "Podatkovo ji ordynaciyi vid 29 serpnja 1997 r.;" },
              { text: "Zakonu pro podatok na dohody fizychnyh osib vid 26 lypnja 1991 r." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a72. Vyznachennja",
        items: [
          { type: "ul", items: [
            { text: "<strong>Pokupec</strong> -- fizychna osoba, jurydychna osoba abo organizacijna odynycja, shcho zdijsnjuje pokupku cyfrovogo kontentu v Servisi." },
            { text: "<strong>Spozhyvach</strong> -- Pokupec, jakyj je fizychnoju osoboju, shcho zdijsnjuje pravochyn, ne pov jazanyj bezposeredno z jogo pidpryjemnyc koju dijal nistju." },
            { text: "<strong>Cyfrovyj kontent</strong> -- produkty, shcho ne majut material no ji formy: videokursy, elektronni knyhy (PDF), kolekciyi promptiv, dostup do platformy Skool." },
            { text: "<strong>Dogovir</strong> -- dogovir pro postachannja cyfrovogo kontentu, ukladenyj dystancijno mizh Prodavcem ta Pokupcem." },
            { text: "<strong>Zamovlennja</strong> -- vyjavlennja voli Pokopcja uklasty Dogovir cherez Servis." },
          ]},
        ],
      },
      {
        title: "\u00a73. Predmet prodazhu",
        items: [
          { type: "ol", items: [
            { text: "Prodavec proponuje nastupnyj cyfrovyj kontent:", sub: { type: "ul", items: [
              { text: "<strong>Kursy ShI</strong> -- videokursy, dostupni onlajn pislja pokupky;" },
              { text: "<strong>Elektronni knyhy</strong> -- knyhy u formati PDF;" },
              { text: "<strong>Kolekciyi promptiv</strong> -- nabory gotovyh promptiv dlja instrumentiv ShI;" },
              { text: "<strong>Dostup do Skool</strong> -- misjachna pidpyska na zakrytu osvitn ju platformu." },
            ]}},
            { text: "Vsi ciny v Servisi je cinamy brutto (z PDV), vyrazhenym v pol s kyh zlotyh (PLN), jakshcho ne zaznacheno inshe." },
          ]},
        ],
      },
      {
        title: "\u00a74. Oformlennja zamovlen",
        items: [
          { type: "ol", items: [
            { text: "Zamovlennja oformljujet sja shljahom:", sub: { type: "ul", items: [
              { text: "vyboru cyfrovogo kontentu v Servisi;" },
              { text: "nadannja neobhidnyh danyh (im ja, prizvyshche, e-mail, a u vypadku rahunku-faktury -- dani firmy z podatkovym nomerom);" },
              { text: "pryjnjattja cyh Umov;" },
              { text: "zdijsnennja platezhu." },
            ]}},
            { text: "Dogovir ukladajet sja z momentu pidtverdzhennja Zamovlennja Prodavcem, shcho vidbuvajet sja avtomatychno pislja zaraestruvannja platezhu." },
            { text: "Pislja ukladennja Dogovoru Pokupec otrymajet pidtverdzhennja na zaznachenu e-mail adresu z danymy dostupu." },
          ]},
        ],
      },
      {
        title: "\u00a75. Ciny ta platezhi",
        items: [
          { type: "ol", items: [
            { text: "Ciny cyfrovogo kontentu je cinamy brutto i vkljuchajut PDV." },
            { text: "Platezhi zdijsnjujut sja cherez:", sub: { type: "ul", items: [
              { text: "elektronni platizni systemy (napryklad, Stripe, Przelewy24, PayPal);" },
              { text: "bankivs kyj perekaz na rahunok Prodavcja." },
            ]}},
            { text: "Dlja pidpysky (dostup do Skool) platizh znimajet sja cyklichno. Pokupec mozhe skasuvaty pidpysku v bud -jakyj chas." },
          ]},
        ],
      },
      {
        title: "\u00a76. Postachannja cyfrovogo kontentu",
        items: [
          { type: "ol", items: [
            { text: "Cyfrovyj kontent postachajet sja v elektronnij formi:", sub: { type: "ul", items: [
              { text: "videokursy -- cherez onlajn-dostup na platformi Servisu abo Skool;" },
              { text: "elektronni knyhy ta kolekciyi promptiv -- cherez posylannja dlja zavantaghennja;" },
              { text: "dostup do Skool -- cherez zaproshennja do zakryto ji hrupy." },
            ]}},
            { text: "Postachannja vidbuvajet sja nevidkladno pislja zaraestruvannja platezhu, ne piznishe nizh protyagom 24 godyn." },
            { text: "U vypadku zatrymky zvernit sja do Prodavcja: <strong>support@yly.com.pl</strong>." },
          ]},
        ],
      },
      {
        title: "\u00a77. Pravo na vidmovu vid dogovoru",
        items: [
          { type: "ol", items: [
            { text: "Spozhyvach maje pravo vidmovytysja vid Dogovoru protyagom <strong>14 dniv</strong> vid dnja jogo ukladennja bez zaznachennja prychyn." },
            { text: "<strong>Vynjatok:</strong> Pravo na vidmovu ne zastosovajet sja, jakshcho cyfrovyj kontent bulo dostavljeno i vykonannja pochalosia za javnoju zhodoju Spozhyvacha." },
            { text: "Zajavu pro vidmovu mozhna nadislaty elektronnym shljahom na adresu: <strong>support@yly.com.pl</strong>." },
            { text: "U razi efektyvno ji vidmovy Prodavec povertaje vsi otrymani platezhi protyagom 14 dniv." },
          ]},
        ],
      },
      {
        title: "\u00a78. Reklamaciyi ta garantija",
        items: [
          { type: "ol", items: [
            { text: "Prodavec nese vidpovidal nist za vidpovidnist cyfrovogo kontentu dogovoru." },
            { text: "U vypadku nevdpovidnosti Pokupec mozhe vymahaty:", sub: { type: "ul", items: [
              { text: "pryvedennja cyfrovogo kontentu u vidpovidnist z dogovorom;" },
              { text: "znyzhennja ciny abo vidmovy vid dogovoru." },
            ]}},
            { text: "Reklamaciyi nalezhyt podavaty na adresu: <strong>support@yly.com.pl</strong>." },
            { text: "Prodavec rozhljanet reklamaciju protyagom <strong>14 dniv</strong>." },
          ]},
        ],
      },
      {
        title: "\u00a79. Dokumenty prodazhu ta podatkovi zobov jazannja",
        items: [
          { type: "ol", items: [
            { text: "Do kozhnogo zamovlennja Prodavec vystavlaje <strong>fiskal nyj chek</strong> abo -- na vymahu Pokopcja -- <strong>rahunok-fakturu PDV</strong>." },
            { text: "Dokumenty prodazhu nadsilajut sja v elektronnij formi na e-mail Pokopcja." },
            { text: "Prodavec je platnyckom PDV i splachujet nalezni podatky vidpovidno do chynnogo zakonodavstva." },
          ]},
        ],
      },
      {
        title: "\u00a710. Licenzija na cyfrovyj kontent",
        items: [
          { type: "ol", items: [
            { text: "Z momentu postachannja Pokupec otrymujet nevykljuchnu, neperekhidnu, obmezhenu licenziyu dlja osobystoho vykorystannja." },
            { text: "Licenzija ne vkljuchaje prava na:", sub: { type: "ul", items: [
              { text: "podal she rozpovsjudzhennja, pereprodazh abo orendu cyfrovogo kontentu;" },
              { text: "publichne vidtvorennja abo prezentaciju;" },
              { text: "modyfikaciju v komercijnyh ciljah;" },
              { text: "nadannja danyh dlja vhodu tretim osobam." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a711. Vidpovidal nist",
        items: [
          { type: "ol", items: [
            { text: "Cyfrovyj kontent maje osvitnij ta informacijnyj harakter. Prodavec ne garantuje dosjahnennja konkretnyh rezul tativ." },
          ]},
        ],
      },
      {
        title: "\u00a712. Pozasudove vyrishennja sporiv",
        items: [
          { type: "ol", items: [
            { text: "Spozhyvach maje pravo skorystatysja pozasudovymy sposobamy vyrishennja sporiv, zokrema:", sub: { type: "ul", items: [
              { text: "mediacija cherez Vojevods ki inspektoraty torhovel no ji inspekciji;" },
              { text: "postijnyj spozhyvchyj arbitrazhnyj sud;" },
              { text: "platforma ODR: <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>https://ec.europa.eu/consumers/odr</a>." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a713. Zakljuchni polozhennja",
        items: [
          { type: "ol", items: [
            { text: "U pytannjah, ne vrehuljovanyh cymy Umovamy, zastosovujut sja normy pol s koho zakonodavstva." },
            { text: "Umovy nabuvajut chynnosti 25 ljutogo 2026 r." },
          ]},
        ],
      },
    ],
  },
  es: {
    title: "Terminos de Venta",
    lastUpdated: "Ultima actualizacion: 25 de febrero de 2026",
    sections: [
      {
        title: "\u00a71. Disposiciones generales",
        items: [
          { type: "ol", items: [
            { text: "Estos Terminos de Venta definen las reglas y condiciones para la venta de contenido digital ofrecido a traves del servicio YLY." },
            { text: "El Vendedor es Patryk Olejnik, que realiza actividad empresarial." },
            { text: "Estos Terminos se han elaborado sobre la base del derecho polaco, en particular:", sub: { type: "ul", items: [
              { text: "El Codigo Civil de 23 de abril de 1964;" },
              { text: "La Ley de Derechos de los Consumidores de 30 de mayo de 2014;" },
              { text: "La Ley sobre la prestacion de servicios electronicos de 18 de julio de 2002;" },
              { text: "La Ley del Impuesto sobre el Valor Anadido (IVA) de 11 de marzo de 2004;" },
              { text: "La Ordenanza Tributaria de 29 de agosto de 1997;" },
              { text: "La Ley del Impuesto sobre la Renta de las Personas Fisicas de 26 de julio de 1991." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a72. Definiciones",
        items: [
          { type: "ul", items: [
            { text: "<strong>Comprador</strong> -- una persona fisica, persona juridica o unidad organizativa que adquiere contenido digital en el Servicio." },
            { text: "<strong>Consumidor</strong> -- un Comprador que es una persona fisica que realiza una accion juridica no relacionada directamente con su actividad empresarial o profesional." },
            { text: "<strong>Contenido digital</strong> -- productos no materiales entregados electronicamente: cursos de video, e-books (PDF), colecciones de prompts, acceso a la plataforma Skool." },
            { text: "<strong>Contrato</strong> -- un contrato de suministro de contenido digital celebrado a distancia entre el Vendedor y el Comprador." },
            { text: "<strong>Pedido</strong> -- una declaracion de voluntad del Comprador para celebrar un Contrato a traves del Servicio." },
          ]},
        ],
      },
      {
        title: "\u00a73. Objeto de la venta",
        items: [
          { type: "ol", items: [
            { text: "El Vendedor ofrece el siguiente contenido digital:", sub: { type: "ul", items: [
              { text: "<strong>Cursos de IA</strong> -- cursos de video disponibles en linea tras la compra;" },
              { text: "<strong>E-books</strong> -- libros electronicos en formato PDF;" },
              { text: "<strong>Colecciones de prompts</strong> -- conjuntos de prompts listos para herramientas de IA;" },
              { text: "<strong>Acceso a Skool</strong> -- suscripcion mensual a una plataforma educativa cerrada." },
            ]}},
            { text: "Todos los precios en el Servicio son precios brutos (con IVA incluido), expresados en zlotys polacos (PLN), salvo que se indique lo contrario." },
          ]},
        ],
      },
      {
        title: "\u00a74. Realizacion de pedidos",
        items: [
          { type: "ol", items: [
            { text: "Un Pedido se realiza mediante:", sub: { type: "ul", items: [
              { text: "seleccion del contenido digital en el Servicio;" },
              { text: "proporcionar los datos requeridos (nombre, apellidos, email y, para factura con IVA, datos de la empresa con NIF);" },
              { text: "aceptacion de estos Terminos;" },
              { text: "realizacion del pago." },
            ]}},
            { text: "El Contrato se celebra tras la confirmacion del Pedido por el Vendedor, que se produce automaticamente tras el registro del pago." },
            { text: "Tras la celebracion del Contrato, el Comprador recibe la confirmacion en la direccion de correo electronico proporcionada con los datos de acceso al contenido adquirido." },
          ]},
        ],
      },
      {
        title: "\u00a75. Precios y pagos",
        items: [
          { type: "ol", items: [
            { text: "Los precios del contenido digital son precios brutos e incluyen el IVA." },
            { text: "Los pagos se procesan a traves de:", sub: { type: "ul", items: [
              { text: "sistemas de pago electronico (p. ej., Stripe, Przelewy24, PayPal);" },
              { text: "transferencia bancaria a la cuenta del Vendedor." },
            ]}},
            { text: "Para las suscripciones (acceso a Skool), el pago se cobra ciclicamente. El Comprador puede cancelar la suscripcion en cualquier momento." },
          ]},
        ],
      },
      {
        title: "\u00a76. Entrega de contenido digital",
        items: [
          { type: "ol", items: [
            { text: "El contenido digital se entrega electronicamente:", sub: { type: "ul", items: [
              { text: "cursos de video -- mediante acceso en linea en la plataforma del Servicio o Skool;" },
              { text: "e-books y colecciones de prompts -- mediante un enlace de descarga enviado al email del Comprador;" },
              { text: "acceso a Skool -- mediante una invitacion al grupo cerrado en la plataforma Skool." },
            ]}},
            { text: "La entrega se realiza inmediatamente despues del registro del pago, no mas tarde de 24 horas." },
            { text: "En caso de retrasos, contacte con el Vendedor en: <strong>support@yly.com.pl</strong>." },
          ]},
        ],
      },
      {
        title: "\u00a77. Derecho de desistimiento",
        items: [
          { type: "ol", items: [
            { text: "El Consumidor tiene derecho a desistir del Contrato en un plazo de <strong>14 dias</strong> desde su celebracion sin indicar motivos." },
            { text: "<strong>Excepcion:</strong> El derecho de desistimiento no se aplica si el contenido digital ha sido entregado y la ejecucion ha comenzado con el consentimiento expreso del Consumidor." },
            { text: "La declaracion de desistimiento puede enviarse electronicamente a: <strong>support@yly.com.pl</strong>." },
            { text: "En caso de desistimiento efectivo, el Vendedor devolvera todos los pagos recibidos en un plazo de 14 dias." },
          ]},
        ],
      },
      {
        title: "\u00a78. Reclamaciones y garantia",
        items: [
          { type: "ol", items: [
            { text: "El Vendedor es responsable de la conformidad del contenido digital con el contrato." },
            { text: "En caso de no conformidad, el Comprador puede solicitar:", sub: { type: "ul", items: [
              { text: "que el contenido digital se ponga en conformidad con el contrato;" },
              { text: "una reduccion del precio o el desistimiento del contrato." },
            ]}},
            { text: "Las reclamaciones deben enviarse a: <strong>support@yly.com.pl</strong>, indicando:", sub: { type: "ul", items: [
              { text: "datos del Comprador (nombre, apellidos, email);" },
              { text: "fecha de compra y nombre del producto;" },
              { text: "descripcion de la no conformidad;" },
              { text: "solicitud del Comprador." },
            ]}},
            { text: "El Vendedor revisara la reclamacion en un plazo de <strong>14 dias</strong>." },
          ]},
        ],
      },
      {
        title: "\u00a79. Documentos de venta y obligaciones fiscales",
        items: [
          { type: "ol", items: [
            { text: "Para cada pedido, el Vendedor emite un <strong>recibo fiscal</strong> o -- a peticion del Comprador -- una <strong>factura con IVA</strong>." },
            { text: "Los documentos de venta se envian electronicamente al correo electronico del Comprador." },
            { text: "El Vendedor es contribuyente del IVA y abona los impuestos debidos de conformidad con la normativa vigente." },
          ]},
        ],
      },
      {
        title: "\u00a710. Licencia de contenido digital",
        items: [
          { type: "ol", items: [
            { text: "Tras la entrega, el Comprador recibe una licencia no exclusiva, intransferible y limitada para uso personal." },
            { text: "La licencia no incluye el derecho a:", sub: { type: "ul", items: [
              { text: "distribuir, revender o alquilar el contenido digital;" },
              { text: "reproducir o presentar publicamente;" },
              { text: "modificar el contenido con fines comerciales;" },
              { text: "compartir credenciales de acceso con terceros." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a711. Responsabilidad",
        items: [
          { type: "ol", items: [
            { text: "El contenido digital tiene caracter educativo e informativo. El Vendedor no garantiza la obtencion de resultados especificos." },
          ]},
        ],
      },
      {
        title: "\u00a712. Resolucion extrajudicial de litigios",
        items: [
          { type: "ol", items: [
            { text: "El Consumidor tiene derecho a utilizar metodos extrajudiciales de resolucion de litigios:", sub: { type: "ul", items: [
              { text: "mediacion a traves de las Inspecciones Provinciales de Comercio;" },
              { text: "tribunal de arbitraje de consumo permanente;" },
              { text: "plataforma ODR: <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>https://ec.europa.eu/consumers/odr</a>." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a713. Disposiciones finales",
        items: [
          { type: "ol", items: [
            { text: "En asuntos no regulados por estos Terminos, se aplicaran las disposiciones del derecho polaco." },
            { text: "Estos Terminos entran en vigor el 25 de febrero de 2026." },
          ]},
        ],
      },
    ],
  },
};
