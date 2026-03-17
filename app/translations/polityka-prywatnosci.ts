import { Lang } from "../context/LanguageContext";
import { LegalPageData } from "../components/LegalContent";

export const privacyData: Record<Lang, LegalPageData> = {
  pl: {
    title: "Polityka Prywatnosci",
    lastUpdated: "Ostatnia aktualizacja: 25 lutego 2026",
    sections: [
      {
        title: "\u00a71. Informacje ogolne",
        items: [
          { type: "ol", items: [
            { text: "Niniejsza Polityka Prywatnosci okreslya zasady przetwarzania i ochrony danych osobowych Uzytkownikow serwisu YLY (dalej: \u00abSerwis\u00bb)." },
            { text: "Administratorem danych osobowych jest Patryk Olejnik (dalej: \u00abAdministrator\u00bb), prowadzacy dzialalnosc gospodarcza." },
            { text: "Dane osobowe przetwarzane sa zgodnie z:", sub: { type: "ul", items: [
              { text: "Rozporzadzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO);" },
              { text: "Ustawa z dnia 10 maja 2018 r. o ochronie danych osobowych (Dz.U. z 2019 r. poz. 1781);" },
              { text: "Ustawa z dnia 18 lipca 2002 r. o swiadczeniu uslug droga elektroniczna (Dz.U. z 2020 r. poz. 344)." },
            ]}},
            { text: "Administrator doklada wszelkich staran, aby dane osobowe byly przetwarzane zgodnie z obowiazujacymi przepisami prawa oraz w sposob zapewniajacy ich bezpieczenstwo." },
          ]},
        ],
      },
      {
        title: "\u00a72. Zakres zbieranych danych",
        items: [
          { type: "ol", items: [
            { text: "Administrator zbiera nastepujace dane osobowe Uzytkownikow:", sub: { type: "ul", items: [
              { text: "imie i nazwisko;" },
              { text: "adres e-mail;" },
              { text: "adres IP;" },
              { text: "dane dotyczace aktywnosci w Serwisie (np. przegladane strony, czas wizyty);" },
              { text: "dane transakcyjne (w przypadku zakupu tresci cyfrowych);" },
              { text: "informacje przekazane dobrowolnie poprzez formularze kontaktowe." },
            ]}},
            { text: "Podanie danych osobowych jest dobrowolne, lecz niezbedne do korzystania z niektorych funkcjonalnosci Serwisu (np. zakupu kursow, dostepu do platformy Skool)." },
          ]},
        ],
      },
      {
        title: "\u00a73. Cele i podstawy prawne przetwarzania danych",
        items: [
          { type: "p", text: "Dane osobowe przetwarzane sa w nastepujacych celach i na podstawie nastepujacych przepisow:" },
          { type: "ul", items: [
            { text: "<strong>Realizacja umowy sprzedazy tresci cyfrowych</strong> -- art. 6 ust. 1 lit. b RODO (wykonanie umowy)." },
            { text: "<strong>Obsluga zapytan i reklamacji</strong> -- art. 6 ust. 1 lit. b RODO (wykonanie umowy) oraz art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora)." },
            { text: "<strong>Prowadzenie ksiegowosci i wypelnianie obowiazkow podatkowych</strong> -- art. 6 ust. 1 lit. c RODO (obowiazek prawny) w zwiazku z ustawa z dnia 29 wrzesnia 1994 r. o rachunkowosci oraz ustawa z dnia 11 marca 2004 r. o podatku od towarow i uslug (VAT)." },
            { text: "<strong>Marketing bezposredni wlasnych uslug</strong> -- art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora)." },
            { text: "<strong>Wysylka newslettera</strong> -- art. 6 ust. 1 lit. a RODO (zgoda Uzytkownika) w zwiazku z art. 10 ustawy o swiadczeniu uslug droga elektroniczna." },
            { text: "<strong>Analiza statystyczna i poprawa jakosci uslug</strong> -- art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora)." },
            { text: "<strong>Ustalenie, dochodzenie lub obrona roszczen</strong> -- art. 6 ust. 1 lit. f RODO." },
          ]},
        ],
      },
      {
        title: "\u00a74. Okres przechowywania danych",
        items: [
          { type: "ol", items: [
            { text: "Dane osobowe przechowywane sa przez okres niezbedny do realizacji celow, w jakich zostaly zebrane:", sub: { type: "ul", items: [
              { text: "dane zwiazane z realizacja umowy -- przez czas trwania umowy oraz 6 lat po jej zakonczeniu (okres przedawnienia roszczen cywilnoprawnych);" },
              { text: "dane przetwarzane na podstawie zgody -- do momentu wycofania zgody;" },
              { text: "dane ksiegowe i podatkowe -- przez okres 5 lat od konca roku kalendarzowego, w ktorym uplynal termin platnosci podatku, zgodnie z art. 86 \u00a71 Ordynacji podatkowej;" },
              { text: "dane przetwarzane w celach marketingowych -- do momentu wniesienia sprzeciwu." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a75. Prawa Uzytkownikow",
        items: [
          { type: "ol", items: [
            { text: "Uzytkownikowi przysluguja nastepujace prawa wynikajace z RODO:", sub: { type: "ul", items: [
              { text: "<strong>prawo dostepu do danych</strong> (art. 15 RODO) -- uzyskanie informacji o przetwarzanych danych;" },
              { text: "<strong>prawo do sprostowania danych</strong> (art. 16 RODO) -- zadanie poprawienia nieprawidlowych lub uzupelnienia niekompletnych danych;" },
              { text: "<strong>prawo do usuniecia danych</strong> (art. 17 RODO) -- tzw. prawo do bycia zapomnianym;" },
              { text: "<strong>prawo do ograniczenia przetwarzania</strong> (art. 18 RODO);" },
              { text: "<strong>prawo do przenoszenia danych</strong> (art. 20 RODO);" },
              { text: "<strong>prawo do sprzeciwu</strong> (art. 21 RODO) -- w tym sprzeciw wobec przetwarzania w celach marketingowych;" },
              { text: "<strong>prawo do cofniecia zgody</strong> w dowolnym momencie, bez wplywu na zgodnosc z prawem przetwarzania dokonanego przed cofnieciem." },
            ]}},
            { text: "W celu realizacji powyzszych praw nalezy skontaktowac sie z Administratorem pod adresem: <strong>support@yly.com.pl</strong>." },
            { text: "Uzytkownik ma prawo wniesienia skargi do Prezesa Urzedu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa), jezeli uzna, ze przetwarzanie danych narusza przepisy RODO." },
          ]},
        ],
      },
      {
        title: "\u00a76. Odbiorcy danych",
        items: [
          { type: "ol", items: [
            { text: "Dane osobowe moga byc przekazywane nastepujacym kategoriom odbiorcow:", sub: { type: "ul", items: [
              { text: "dostawcom uslug hostingowych i serwerowych;" },
              { text: "dostawcom systemow platnosci elektronicznych;" },
              { text: "dostawcom uslug e-mail marketingowych;" },
              { text: "platformie Skool (w zakresie niezbednym do swiadczenia uslug);" },
              { text: "biurom rachunkowym i doradcom podatkowym;" },
              { text: "organom panstwowym na podstawie przepisow prawa (np. urzedy skarbowe, sady)." },
            ]}},
            { text: "Dane moga byc przekazywane do panstw trzecich (poza EOG) wylacznie wtedy, gdy podmiot przetwarzajacy zapewnia odpowiedni poziom ochrony (np. standardowe klauzule umowne zatwierdzone przez Komisje Europejska)." },
          ]},
        ],
      },
      {
        title: "\u00a77. Pliki cookies",
        items: [
          { type: "ol", items: [
            { text: "Serwis wykorzystuje pliki cookies (ciasteczka) -- male pliki tekstowe przechowywane na urzadzeniu Uzytkownika." },
            { text: "Pliki cookies stosowane sa w celu:", sub: { type: "ul", items: [
              { text: "zapewnienia prawidlowego funkcjonowania Serwisu;" },
              { text: "zapamietania preferencji Uzytkownika (np. wybranego jezyka);" },
              { text: "prowadzenia analiz statystycznych (Google Analytics);" },
              { text: "wyswietlania spersonalizowanych tresci." },
            ]}},
            { text: "Uzytkownik moze w dowolnym momencie zmienic ustawienia dotyczace plikow cookies w przegladarce internetowej, w tym zablokowac ich zapisywanie. Moze to jednak wplynac na dzialanie niektorych funkcji Serwisu." },
          ]},
        ],
      },
      {
        title: "\u00a78. Bezpieczenstwo danych",
        items: [
          { type: "ol", items: [
            { text: "Administrator stosuje odpowiednie srodki techniczne i organizacyjne zapewniajace ochrone danych osobowych, w szczegolnosci:", sub: { type: "ul", items: [
              { text: "szyfrowanie polaczenia (protokol SSL/TLS);" },
              { text: "ograniczenie dostepu do danych wylacznie do osob upowaznionych;" },
              { text: "regularne tworzenie kopii zapasowych;" },
              { text: "stosowanie zabezpieczen przed nieuprawnionym dostepem." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a79. Zmiany Polityki Prywatnosci",
        items: [
          { type: "ol", items: [
            { text: "Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatnosci." },
            { text: "O istotnych zmianach Uzytkownicy zostana poinformowani za posrednictwem Serwisu lub droga e-mail." },
            { text: "Aktualna wersja Polityki Prywatnosci jest zawsze dostepna w Serwisie." },
          ]},
        ],
      },
      {
        title: "\u00a710. Kontakt",
        items: [
          { type: "p", text: "W sprawach dotyczacych ochrony danych osobowych prosimy o kontakt:" },
          { type: "ul", items: [
            { text: "<strong>E-mail:</strong> support@yly.com.pl" },
            { text: "<strong>Administrator:</strong> Patryk Olejnik" },
          ]},
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: February 25, 2026",
    sections: [
      {
        title: "\u00a71. General Information",
        items: [
          { type: "ol", items: [
            { text: "This Privacy Policy defines the rules for processing and protecting personal data of Users of the YLY service (hereinafter: the Service)." },
            { text: "The controller of personal data is Patryk Olejnik (hereinafter: the Controller), conducting business activity." },
            { text: "Personal data is processed in accordance with:", sub: { type: "ul", items: [
              { text: "Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 (GDPR);" },
              { text: "Polish Act of 10 May 2018 on the Protection of Personal Data;" },
              { text: "Polish Act of 18 July 2002 on the Provision of Electronic Services." },
            ]}},
            { text: "The Controller makes every effort to ensure that personal data is processed in accordance with applicable law and in a manner ensuring its security." },
          ]},
        ],
      },
      {
        title: "\u00a72. Scope of Collected Data",
        items: [
          { type: "ol", items: [
            { text: "The Controller collects the following personal data of Users:", sub: { type: "ul", items: [
              { text: "first and last name;" },
              { text: "email address;" },
              { text: "IP address;" },
              { text: "data regarding activity in the Service (e.g., pages viewed, visit duration);" },
              { text: "transaction data (in the case of purchasing digital content);" },
              { text: "information provided voluntarily through contact forms." },
            ]}},
            { text: "Providing personal data is voluntary but necessary to use certain functionalities of the Service (e.g., purchasing courses, access to the Skool platform)." },
          ]},
        ],
      },
      {
        title: "\u00a73. Purposes and Legal Bases for Data Processing",
        items: [
          { type: "p", text: "Personal data is processed for the following purposes and on the following legal bases:" },
          { type: "ul", items: [
            { text: "<strong>Performance of the digital content sales contract</strong> -- Art. 6(1)(b) GDPR (contract performance)." },
            { text: "<strong>Handling inquiries and complaints</strong> -- Art. 6(1)(b) GDPR (contract performance) and Art. 6(1)(f) GDPR (legitimate interest of the Controller)." },
            { text: "<strong>Accounting and tax obligations</strong> -- Art. 6(1)(c) GDPR (legal obligation) in connection with the Polish Accounting Act and VAT Act." },
            { text: "<strong>Direct marketing of own services</strong> -- Art. 6(1)(f) GDPR (legitimate interest of the Controller)." },
            { text: "<strong>Newsletter distribution</strong> -- Art. 6(1)(a) GDPR (User consent)." },
            { text: "<strong>Statistical analysis and service improvement</strong> -- Art. 6(1)(f) GDPR (legitimate interest of the Controller)." },
            { text: "<strong>Establishing, pursuing or defending claims</strong> -- Art. 6(1)(f) GDPR." },
          ]},
        ],
      },
      {
        title: "\u00a74. Data Retention Period",
        items: [
          { type: "ol", items: [
            { text: "Personal data is stored for the period necessary to fulfill the purposes for which it was collected:", sub: { type: "ul", items: [
              { text: "data related to contract performance -- for the duration of the contract and 6 years after its termination (statute of limitations for civil claims);" },
              { text: "data processed based on consent -- until the consent is withdrawn;" },
              { text: "accounting and tax data -- for a period of 5 years from the end of the calendar year in which the tax payment deadline expired, in accordance with Art. 86 \u00a71 of the Polish Tax Ordinance;" },
              { text: "data processed for marketing purposes -- until an objection is raised." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a75. User Rights",
        items: [
          { type: "ol", items: [
            { text: "The User has the following rights under the GDPR:", sub: { type: "ul", items: [
              { text: "<strong>right of access</strong> (Art. 15 GDPR) -- obtaining information about processed data;" },
              { text: "<strong>right to rectification</strong> (Art. 16 GDPR) -- requesting correction of incorrect or completion of incomplete data;" },
              { text: "<strong>right to erasure</strong> (Art. 17 GDPR) -- the so-called right to be forgotten;" },
              { text: "<strong>right to restriction of processing</strong> (Art. 18 GDPR);" },
              { text: "<strong>right to data portability</strong> (Art. 20 GDPR);" },
              { text: "<strong>right to object</strong> (Art. 21 GDPR) -- including objection to processing for marketing purposes;" },
              { text: "<strong>right to withdraw consent</strong> at any time, without affecting the lawfulness of processing carried out before the withdrawal." },
            ]}},
            { text: "To exercise the above rights, please contact the Controller at: <strong>support@yly.com.pl</strong>." },
            { text: "The User has the right to lodge a complaint with the President of the Personal Data Protection Office (ul. Stawki 2, 00-193 Warsaw, Poland) if they believe that data processing violates the GDPR." },
          ]},
        ],
      },
      {
        title: "\u00a76. Data Recipients",
        items: [
          { type: "ol", items: [
            { text: "Personal data may be transferred to the following categories of recipients:", sub: { type: "ul", items: [
              { text: "hosting and server service providers;" },
              { text: "electronic payment system providers;" },
              { text: "email marketing service providers;" },
              { text: "the Skool platform (to the extent necessary for service provision);" },
              { text: "accounting offices and tax advisors;" },
              { text: "state authorities based on legal provisions (e.g., tax offices, courts)." },
            ]}},
            { text: "Data may be transferred to third countries (outside the EEA) only when the processing entity ensures an appropriate level of protection (e.g., standard contractual clauses approved by the European Commission)." },
          ]},
        ],
      },
      {
        title: "\u00a77. Cookies",
        items: [
          { type: "ol", items: [
            { text: "The Service uses cookies -- small text files stored on the User's device." },
            { text: "Cookies are used to:", sub: { type: "ul", items: [
              { text: "ensure proper functioning of the Service;" },
              { text: "remember User preferences (e.g., selected language);" },
              { text: "conduct statistical analyses (Google Analytics);" },
              { text: "display personalized content." },
            ]}},
            { text: "The User can change cookie settings in their web browser at any time, including blocking their storage. However, this may affect the functioning of some Service features." },
          ]},
        ],
      },
      {
        title: "\u00a78. Data Security",
        items: [
          { type: "ol", items: [
            { text: "The Controller applies appropriate technical and organizational measures to ensure the protection of personal data, in particular:", sub: { type: "ul", items: [
              { text: "connection encryption (SSL/TLS protocol);" },
              { text: "restricting data access to authorized persons only;" },
              { text: "regular backup creation;" },
              { text: "applying safeguards against unauthorized access." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a79. Changes to the Privacy Policy",
        items: [
          { type: "ol", items: [
            { text: "The Controller reserves the right to make changes to this Privacy Policy." },
            { text: "Users will be informed of significant changes through the Service or by email." },
            { text: "The current version of the Privacy Policy is always available in the Service." },
          ]},
        ],
      },
      {
        title: "\u00a710. Contact",
        items: [
          { type: "p", text: "For matters related to personal data protection, please contact:" },
          { type: "ul", items: [
            { text: "<strong>Email:</strong> support@yly.com.pl" },
            { text: "<strong>Controller:</strong> Patryk Olejnik" },
          ]},
        ],
      },
    ],
  },
  uk: {
    title: "Polityka konfidencijnosti",
    lastUpdated: "Ostannje onovlennja: 25 ljutogo 2026",
    sections: [
      {
        title: "\u00a71. Zagal\u02bcna informacija",
        items: [
          { type: "ol", items: [
            { text: "Cja Polityka konfidencijnosti vyznachaje pravyla obrobky ta zahystu personal\u02bcnyh danyh Korystuvachiv servisu YLY (dali: Servis)." },
            { text: "Administratorom personal\u02bcnyh danyh je Patryk Olejnik (dali: Administrator), jakyj provadyt\u02bc pidpryjemnyc\u02bcku dijal\u02bcnist\u02bc." },
            { text: "Personal\u02bcni dani obrobljajut\u02bcsja vidpovidno do:", sub: { type: "ul", items: [
              { text: "Reglamentu (JeS) 2016/679 Jevropejs\u02bckogo Parlamentu ta Rady vid 27 kvitnja 2016 r. (GDPR);" },
              { text: "Zakonu Pol\u02bcshchi vid 10 travnja 2018 r. pro zahyst personal\u02bcnyh danyh;" },
              { text: "Zakonu Pol\u02bcshchi vid 18 lypnja 2002 r. pro nadannja elektronnyh poslug." },
            ]}},
            { text: "Administrator dokladaje vsih zusyl\u02bc, shchob personal\u02bcni dani obrobljulysja vidpovidno do chynnogo zakonodavstva ta u sposib, shcho zabezpechuje jih bezpeku." },
          ]},
        ],
      },
      {
        title: "\u00a72. Obsyag zbiranyh danyh",
        items: [
          { type: "ol", items: [
            { text: "Administrator zbyraje nastupni personal\u02bcni dani Korystuvachiv:", sub: { type: "ul", items: [
              { text: "im\u02bcja ta prizvyshche;" },
              { text: "adresa elektronno\u02bci poshty;" },
              { text: "IP-adresa;" },
              { text: "dani pro aktyvnist\u02bc u Servisi (napryklad, peregljanuti storinky, tryvalit\u02bc vizytu);" },
              { text: "tranzakcijni dani (u vypadku prydbannja cyfrovogo kontentu);" },
              { text: "informaciju, nadanu dobrovil\u02bcno cherez kontaktni formy." },
            ]}},
            { text: "Nadannja personal\u02bcnyh danyh je dobrovil\u02bcnym, ale neobhidnym dlja korystuvannja dejakymy funkcijamy Servisu (napryklad, prydbannja kursiv, dostupu do platformy Skool)." },
          ]},
        ],
      },
      {
        title: "\u00a73. Cili ta pravovi pidstavy obrobky danyh",
        items: [
          { type: "p", text: "Personal\u02bcni dani obrobljajut\u02bcsja z nastupnymy ciljamy ta na nastupnyh pravovyh pidstavah:" },
          { type: "ul", items: [
            { text: "<strong>Vykonannja dogovoru prodazhu cyfrovogo kontentu</strong> -- st. 6(1)(b) GDPR." },
            { text: "<strong>Obrobka zapytiv ta reklamacij</strong> -- st. 6(1)(b) ta st. 6(1)(f) GDPR." },
            { text: "<strong>Vedennija buhgalteriyi ta vykonannja podatkovyh zobov\u02bcjazan\u02bc</strong> -- st. 6(1)(c) GDPR." },
            { text: "<strong>Prjamyj marketyng vlasnyh poslug</strong> -- st. 6(1)(f) GDPR." },
            { text: "<strong>Rozsilka njuzletera</strong> -- st. 6(1)(a) GDPR (zgoda Korystuvacha)." },
            { text: "<strong>Statystychnyj analiz ta pokrashchennja jakosti poslug</strong> -- st. 6(1)(f) GDPR." },
            { text: "<strong>Vstanovlennja, zdiysnennja abo zahyst vymog</strong> -- st. 6(1)(f) GDPR." },
          ]},
        ],
      },
      {
        title: "\u00a74. Period zberigannja danyh",
        items: [
          { type: "ol", items: [
            { text: "Personal\u02bcni dani zberigajut\u02bcsja protyagom periodu, neobhidnogo dlja realizaciyi cilej, dlja jakyh vony buly zibrani:", sub: { type: "ul", items: [
              { text: "dani, pov\u02bcjazani z vykonannjam dogovoru -- protyagom diyj dogovoru ta 6 rokiv pislja jogo zakinchennja;" },
              { text: "dani, shcho obrobljajut\u02bcsja na pidstavi zgody -- do momentu vidklykannja zgody;" },
              { text: "buhgalters\u02bcki ta podatkovi dani -- protyagom 5 rokiv vid kincja kalendarnogo roku;" },
              { text: "dani, shcho obrobljajut\u02bcsja v marketyngovyh ciljah -- do momentu podannja zaperechnnja." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a75. Prava Korystuvachiv",
        items: [
          { type: "ol", items: [
            { text: "Korystuvach maje nastupni prava zgidno z GDPR:", sub: { type: "ul", items: [
              { text: "<strong>pravo dostupu do danyh</strong> (st. 15 GDPR);" },
              { text: "<strong>pravo na vypravlennja danyh</strong> (st. 16 GDPR);" },
              { text: "<strong>pravo na vydalennja danyh</strong> (st. 17 GDPR) -- pravo buty zabutym;" },
              { text: "<strong>pravo na obmezhennja obrobky</strong> (st. 18 GDPR);" },
              { text: "<strong>pravo na perenesennja danyh</strong> (st. 20 GDPR);" },
              { text: "<strong>pravo na zaperechennja</strong> (st. 21 GDPR);" },
              { text: "<strong>pravo na vidklykannja zgody</strong> v bud\u02bc-jakyj moment." },
            ]}},
            { text: "Dlja realizaciyi prav zvernit\u02bcsja do Administratora: <strong>support@yly.com.pl</strong>." },
            { text: "Korystuvach maje pravo podaty skargu do Prezydenta Urjadu Ohorony Personal\u02bcnyh Danyh (ul. Stawki 2, 00-193 Varshava, Pol\u02bcshcha)." },
          ]},
        ],
      },
      {
        title: "\u00a76. Otrymuvachi danyh",
        items: [
          { type: "ol", items: [
            { text: "Personal\u02bcni dani mozhut\u02bc peredavatysja nastupnym kategorijam otrymuvachiv:", sub: { type: "ul", items: [
              { text: "postachal\u02bcnykam hostyngovyh ta servernyh poslug;" },
              { text: "postachal\u02bcnykam system elektronnyh platezhiv;" },
              { text: "postachal\u02bcnykam poslug e-mail marketyngu;" },
              { text: "platformi Skool;" },
              { text: "buhgalters\u02bckim biuram ta podatkovym konsul\u02bctantam;" },
              { text: "derzhavnym organam na pidstavi zakonodavstva." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a77. Fajly cookies",
        items: [
          { type: "ol", items: [
            { text: "Servis vykorystovuje fajly cookies -- neveleky tekstovi fajly, shcho zberigajut\u02bcsja na prystroyi Korystuvacha." },
            { text: "Fajly cookies vykorystovujut\u02bcsja dlja:", sub: { type: "ul", items: [
              { text: "zabezpechennja nalezhnogo funkcionuvannja Servisu;" },
              { text: "zapam\u02bcjatovuvannja vpodobain Korystuvacha;" },
              { text: "provedennja statystychnyh analiziv (Google Analytics);" },
              { text: "vidobrazhennja personalizovanogo kontentu." },
            ]}},
            { text: "Korystuvach mozhe zminyty nalashtuvannja cookies u brauzeri v bud\u02bc-jakyj chas." },
          ]},
        ],
      },
      {
        title: "\u00a78. Bezpeka danyh",
        items: [
          { type: "ol", items: [
            { text: "Administrator zastosovuje vidpovidni tehnichni ta organizacijni zahody dlja zahystu personal\u02bcnyh danyh:", sub: { type: "ul", items: [
              { text: "shyfruvannja z\u02bcjednannja (protokol SSL/TLS);" },
              { text: "obmezhennja dostupu do danyh lyshe dlja upovnovazhenyh osib;" },
              { text: "reguljarne stvorennja rezervnyh kopij;" },
              { text: "zastosuvannja zahistu vid nesankcionovanogo dostupu." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a79. Zminy Polityky konfidencijnosti",
        items: [
          { type: "ol", items: [
            { text: "Administrator zalishaje za soboju pravo vnosyty zminy do cijeyi Polityky konfidencijnosti." },
            { text: "Pro istotni zminy Korystuvachi budut\u02bc povidomleni cherez Servis abo elektronoju poshtoju." },
            { text: "Aktual\u02bcna versija Polityky konfidencijnosti zavzhdy dostupna u Servisi." },
          ]},
        ],
      },
      {
        title: "\u00a710. Kontakt",
        items: [
          { type: "p", text: "Z pytan\u02bc, shcho stosujut\u02bcsja zahystu personal\u02bcnyh danyh, zvernit\u02bcsja:" },
          { type: "ul", items: [
            { text: "<strong>E-mail:</strong> support@yly.com.pl" },
            { text: "<strong>Administrator:</strong> Patryk Olejnik" },
          ]},
        ],
      },
    ],
  },
  es: {
    title: "Politica de Privacidad",
    lastUpdated: "Ultima actualizacion: 25 de febrero de 2026",
    sections: [
      {
        title: "\u00a71. Informacion general",
        items: [
          { type: "ol", items: [
            { text: "Esta Politica de Privacidad define las reglas para el tratamiento y la proteccion de los datos personales de los Usuarios del servicio YLY (en adelante: el Servicio)." },
            { text: "El responsable del tratamiento de datos personales es Patryk Olejnik (en adelante: el Responsable), que realiza actividad empresarial." },
            { text: "Los datos personales se tratan de conformidad con:", sub: { type: "ul", items: [
              { text: "El Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 (RGPD);" },
              { text: "La Ley polaca de 10 de mayo de 2018 sobre la proteccion de datos personales;" },
              { text: "La Ley polaca de 18 de julio de 2002 sobre la prestacion de servicios electronicos." },
            ]}},
            { text: "El Responsable hace todo lo posible para garantizar que los datos personales se traten de conformidad con la legislacion vigente y de manera que garantice su seguridad." },
          ]},
        ],
      },
      {
        title: "\u00a72. Alcance de los datos recopilados",
        items: [
          { type: "ol", items: [
            { text: "El Responsable recopila los siguientes datos personales de los Usuarios:", sub: { type: "ul", items: [
              { text: "nombre y apellidos;" },
              { text: "direccion de correo electronico;" },
              { text: "direccion IP;" },
              { text: "datos sobre la actividad en el Servicio (p. ej., paginas visitadas, duracion de la visita);" },
              { text: "datos de transacciones (en caso de compra de contenido digital);" },
              { text: "informacion proporcionada voluntariamente a traves de formularios de contacto." },
            ]}},
            { text: "Proporcionar datos personales es voluntario, pero necesario para utilizar ciertas funcionalidades del Servicio (p. ej., compra de cursos, acceso a la plataforma Skool)." },
          ]},
        ],
      },
      {
        title: "\u00a73. Finalidades y bases legales del tratamiento de datos",
        items: [
          { type: "p", text: "Los datos personales se tratan con las siguientes finalidades y bases legales:" },
          { type: "ul", items: [
            { text: "<strong>Ejecucion del contrato de venta de contenido digital</strong> -- Art. 6(1)(b) RGPD." },
            { text: "<strong>Gestion de consultas y reclamaciones</strong> -- Art. 6(1)(b) y Art. 6(1)(f) RGPD." },
            { text: "<strong>Contabilidad y obligaciones fiscales</strong> -- Art. 6(1)(c) RGPD." },
            { text: "<strong>Marketing directo de servicios propios</strong> -- Art. 6(1)(f) RGPD." },
            { text: "<strong>Envio de boletin informativo</strong> -- Art. 6(1)(a) RGPD (consentimiento del Usuario)." },
            { text: "<strong>Analisis estadistico y mejora de la calidad del servicio</strong> -- Art. 6(1)(f) RGPD." },
            { text: "<strong>Establecimiento, ejercicio o defensa de reclamaciones</strong> -- Art. 6(1)(f) RGPD." },
          ]},
        ],
      },
      {
        title: "\u00a74. Periodo de conservacion de datos",
        items: [
          { type: "ol", items: [
            { text: "Los datos personales se conservan durante el periodo necesario para cumplir los fines para los que fueron recopilados:", sub: { type: "ul", items: [
              { text: "datos relacionados con la ejecucion del contrato -- durante la vigencia del contrato y 6 anos despues de su finalizacion;" },
              { text: "datos tratados sobre la base del consentimiento -- hasta que se retire el consentimiento;" },
              { text: "datos contables y fiscales -- durante un periodo de 5 anos desde el final del ano calendario;" },
              { text: "datos tratados con fines de marketing -- hasta que se presente una objecion." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a75. Derechos de los Usuarios",
        items: [
          { type: "ol", items: [
            { text: "El Usuario tiene los siguientes derechos en virtud del RGPD:", sub: { type: "ul", items: [
              { text: "<strong>derecho de acceso</strong> (Art. 15 RGPD);" },
              { text: "<strong>derecho de rectificacion</strong> (Art. 16 RGPD);" },
              { text: "<strong>derecho de supresion</strong> (Art. 17 RGPD) -- derecho al olvido;" },
              { text: "<strong>derecho a la limitacion del tratamiento</strong> (Art. 18 RGPD);" },
              { text: "<strong>derecho a la portabilidad de los datos</strong> (Art. 20 RGPD);" },
              { text: "<strong>derecho de oposicion</strong> (Art. 21 RGPD);" },
              { text: "<strong>derecho a retirar el consentimiento</strong> en cualquier momento." },
            ]}},
            { text: "Para ejercer los derechos anteriores, pongase en contacto con el Responsable en: <strong>support@yly.com.pl</strong>." },
            { text: "El Usuario tiene derecho a presentar una reclamacion ante la Agencia Espanola de Proteccion de Datos o ante la autoridad de proteccion de datos polaca (UODO, ul. Stawki 2, 00-193 Varsovia)." },
          ]},
        ],
      },
      {
        title: "\u00a76. Destinatarios de los datos",
        items: [
          { type: "ol", items: [
            { text: "Los datos personales pueden transferirse a las siguientes categorias de destinatarios:", sub: { type: "ul", items: [
              { text: "proveedores de servicios de alojamiento y servidores;" },
              { text: "proveedores de sistemas de pago electronico;" },
              { text: "proveedores de servicios de marketing por correo electronico;" },
              { text: "la plataforma Skool;" },
              { text: "oficinas contables y asesores fiscales;" },
              { text: "autoridades estatales sobre la base de disposiciones legales." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a77. Cookies",
        items: [
          { type: "ol", items: [
            { text: "El Servicio utiliza cookies -- pequenos archivos de texto almacenados en el dispositivo del Usuario." },
            { text: "Las cookies se utilizan para:", sub: { type: "ul", items: [
              { text: "garantizar el correcto funcionamiento del Servicio;" },
              { text: "recordar las preferencias del Usuario (p. ej., idioma seleccionado);" },
              { text: "realizar analisis estadisticos (Google Analytics);" },
              { text: "mostrar contenido personalizado." },
            ]}},
            { text: "El Usuario puede cambiar la configuracion de cookies en su navegador en cualquier momento. Sin embargo, esto puede afectar al funcionamiento de algunas funciones del Servicio." },
          ]},
        ],
      },
      {
        title: "\u00a78. Seguridad de los datos",
        items: [
          { type: "ol", items: [
            { text: "El Responsable aplica medidas tecnicas y organizativas adecuadas para garantizar la proteccion de los datos personales:", sub: { type: "ul", items: [
              { text: "cifrado de la conexion (protocolo SSL/TLS);" },
              { text: "restriccion del acceso a los datos solo a personas autorizadas;" },
              { text: "creacion periodica de copias de seguridad;" },
              { text: "aplicacion de protecciones contra el acceso no autorizado." },
            ]}},
          ]},
        ],
      },
      {
        title: "\u00a79. Cambios en la Politica de Privacidad",
        items: [
          { type: "ol", items: [
            { text: "El Responsable se reserva el derecho de realizar cambios en esta Politica de Privacidad." },
            { text: "Los Usuarios seran informados de los cambios significativos a traves del Servicio o por correo electronico." },
            { text: "La version actual de la Politica de Privacidad esta siempre disponible en el Servicio." },
          ]},
        ],
      },
      {
        title: "\u00a710. Contacto",
        items: [
          { type: "p", text: "Para asuntos relacionados con la proteccion de datos personales, contacte con:" },
          { type: "ul", items: [
            { text: "<strong>Email:</strong> support@yly.com.pl" },
            { text: "<strong>Responsable:</strong> Patryk Olejnik" },
          ]},
        ],
      },
    ],
  },
};
