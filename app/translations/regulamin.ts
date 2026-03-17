import { Lang } from "../context/LanguageContext";
import { LegalPageData } from "../components/LegalContent";

export const regulaminData: Record<Lang, LegalPageData> = {
  pl: {
    title: "Regulamin Serwisu",
    lastUpdated: "Ostatnia aktualizacja: 25 lutego 2026",
    sections: [
      {
        title: "§1. Postanowienia ogólne",
        items: [
          { type: "ol", items: [
            { text: "Niniejszy Regulamin określa zasady korzystania z serwisu internetowego YLY (dalej: \u00ABSerwis\u00BB), dostępnego pod adresem internetowym yly.pl." },
            { text: "Właścicielem i administratorem Serwisu jest Patryk Olejnik, prowadzący działalność gospodarczą (dalej: \u00ABUsługodawca\u00BB)." },
            { text: "Regulamin stanowi regulamin świadczenia usług drogą elektroniczną w rozumieniu art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną (Dz.U. z 2020 r. poz. 344)." },
            { text: "Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu." },
            { text: "Regulamin jest udostępniany nieodpłatnie za pośrednictwem Serwisu w formie umożliwiającej jego pobranie, utrwalenie i wydrukowanie." },
          ]},
        ],
      },
      {
        title: "§2. Definicje",
        items: [
          { type: "p", text: "Użyte w Regulaminie pojęcia oznaczają:" },
          { type: "ul", items: [
            { text: "<strong>Serwis</strong> — strona internetowa YLY wraz ze wszystkimi podstronami." },
            { text: "<strong>Usługodawca</strong> — Patryk Olejnik, właściciel serwisu YLY." },
            { text: "<strong>Użytkownik</strong> — każda osoba fizyczna, osoba prawna lub jednostka organizacyjna korzystająca z Serwisu." },
            { text: "<strong>Konsument</strong> — Użytkownik będący osobą fizyczną dokonującą czynności prawnej niezwiązanej bezpośrednio z jej działalnością gospodarczą lub zawodową (art. 22¹ Kodeksu cywilnego)." },
            { text: "<strong>Treści cyfrowe</strong> — kursy online, e-booki, kolekcje promptów oraz inne materiały cyfrowe oferowane w Serwisie." },
            { text: "<strong>Usługa</strong> — usługa świadczona drogą elektroniczną przez Usługodawcę na rzecz Użytkownika za pośrednictwem Serwisu." },
            { text: "<strong>Konto</strong> — indywidualne konto Użytkownika w Serwisie lub na platformie Skool." },
          ]},
        ],
      },
      {
        title: "§3. Rodzaje i zakres usług",
        items: [
          { type: "ol", items: [
            { text: "Usługodawca świadczy za pośrednictwem Serwisu następujące usługi:", sub: { type: "ul", items: [
              { text: "udostępnianie treści informacyjnych o tematyce sztucznej inteligencji;" },
              { text: "sprzedaż treści cyfrowych (kursy, e-booki, kolekcje promptów);" },
              { text: "zapewnienie dostępu do zamkniętej społeczności na platformie Skool;" },
              { text: "udostępnianie kanałów społecznościowych (Discord, Facebook, YouTube, TikTok, X)." },
            ]}},
            { text: "Korzystanie z części usług może wymagać założenia Konta lub dokonania płatności." },
            { text: "Szczegółowe warunki sprzedaży treści cyfrowych reguluje odrębny Regulamin Sprzedaży." },
          ]},
        ],
      },
      {
        title: "§4. Warunki techniczne",
        items: [
          { type: "ol", items: [
            { text: "Do korzystania z Serwisu niezbędne jest:", sub: { type: "ul", items: [
              { text: "urządzenie z dostępem do sieci Internet;" },
              { text: "przeglądarka internetowa obsługująca JavaScript i pliki cookies;" },
              { text: "aktywny adres e-mail (w przypadku zakupu treści cyfrowych)." },
            ]}},
            { text: "Usługodawca nie ponosi odpowiedzialności za problemy techniczne wynikające z niespełnienia powyższych wymagań." },
          ]},
        ],
      },
      {
        title: "§5. Zasady korzystania z Serwisu",
        items: [
          { type: "ol", items: [
            { text: "Użytkownik zobowiązuje się do korzystania z Serwisu zgodnie z obowiązującym prawem, postanowieniami niniejszego Regulaminu oraz dobrymi obyczajami." },
            { text: "Zabrania się:", sub: { type: "ul", items: [
              { text: "kopiowania, rozpowszechniania i udostępniania treści cyfrowych osobom trzecim bez zgody Usługodawcy;" },
              { text: "podejmowania działań mogących zakłócić prawidłowe funkcjonowanie Serwisu;" },
              { text: "wykorzystywania Serwisu w sposób niezgodny z jego przeznaczeniem;" },
              { text: "dostarczania treści o charakterze bezprawnym." },
            ]}},
            { text: "Naruszenie powyższych zasad może skutkować zablokowaniem dostępu do Serwisu oraz treści cyfrowych." },
          ]},
        ],
      },
      {
        title: "§6. Prawa autorskie i własność intelektualna",
        items: [
          { type: "ol", items: [
            { text: "Wszelkie treści dostępne w Serwisie, w tym teksty, grafiki, logotypy, zdjęcia, filmy, kursy, e-booki i prompty, stanowią własność Usługodawcy lub zostały wykorzystane za zgodą podmiotów uprawnionych i podlegają ochronie na podstawie ustawy z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych." },
            { text: "Zakup treści cyfrowych oznacza nabycie licencji na użytek osobisty. Licencja nie obejmuje prawa do dalszego rozpowszechniania, odsprzedaży ani modyfikacji w celach komercyjnych." },
            { text: "Jakiekolwiek kopiowanie, reprodukcja lub redystrybucja treści bez pisemnej zgody Usługodawcy stanowi naruszenie praw autorskich." },
          ]},
        ],
      },
      {
        title: "§7. Odpowiedzialność",
        items: [
          { type: "ol", items: [
            { text: "Usługodawca dokłada wszelkich starań, aby Serwis działał prawidłowo i nieprzerwanie." },
            { text: "Usługodawca nie ponosi odpowiedzialności za:", sub: { type: "ul", items: [
              { text: "czasowe przerwy w dostępności Serwisu spowodowane pracami konserwacyjnymi lub awariami;" },
              { text: "skutki korzystania z treści cyfrowych w sposób niezgodny z Regulaminem;" },
              { text: "działania osób trzecich, które mogą mieć wpływ na funkcjonowanie Serwisu." },
            ]}},
            { text: "Treści dostępne w Serwisie mają charakter edukacyjny i informacyjny. Usługodawca nie gwarantuje osiągnięcia konkretnych wyników przez Użytkowników." },
          ]},
        ],
      },
      {
        title: "§8. Ochrona danych osobowych",
        items: [
          { type: "ol", items: [
            { text: "Administratorem danych osobowych Użytkowników jest Usługodawca." },
            { text: "Dane osobowe przetwarzane są zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) oraz ustawą z dnia 10 maja 2018 r. o ochronie danych osobowych." },
            { text: "Szczegółowe zasady przetwarzania danych osobowych określa Polityka Prywatności dostępna w Serwisie." },
          ]},
        ],
      },
      {
        title: "§9. Reklamacje",
        items: [
          { type: "ol", items: [
            { text: "Użytkownik ma prawo złożyć reklamację dotyczącą funkcjonowania Serwisu lub zakupionych treści cyfrowych." },
            { text: "Reklamacje należy zgłaszać drogą elektroniczną na adres e-mail: <strong>support@yly.com.pl</strong>." },
            { text: "Reklamacja powinna zawierać: dane Użytkownika, opis problemu oraz oczekiwany sposób rozwiązania." },
            { text: "Usługodawca rozpatrzy reklamację w terminie 14 dni od daty jej otrzymania i poinformuje Użytkownika o sposobie jej rozpatrzenia drogą elektroniczną." },
          ]},
        ],
      },
      {
        title: "§10. Pozasądowe sposoby rozwiązywania sporów",
        items: [
          { type: "ol", items: [
            { text: "Konsument ma prawo skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń, w szczególności:", sub: { type: "ul", items: [
              { text: "zwrócenia się do stałego polubownego sądu konsumenckiego przy Wojewódzkim Inspektorze Inspekcji Handlowej;" },
              { text: "zwrócenia się do Wojewódzkiego Inspektora Inspekcji Handlowej z wnioskiem o wszczęcie postępowania mediacyjnego;" },
              { text: "skorzystania z platformy ODR dostępnej pod adresem: <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>https://ec.europa.eu/consumers/odr</a>." },
            ]}},
          ]},
        ],
      },
      {
        title: "§11. Zmiana Regulaminu",
        items: [
          { type: "ol", items: [
            { text: "Usługodawca zastrzega sobie prawo do zmiany niniejszego Regulaminu w dowolnym czasie." },
            { text: "O wszelkich zmianach Użytkownicy zostaną poinformowani za pośrednictwem Serwisu lub drogą elektroniczną z wyprzedzeniem co najmniej 14 dni przed wejściem zmian w życie." },
            { text: "Korzystanie z Serwisu po wejściu w życie zmian oznacza ich akceptację." },
          ]},
        ],
      },
      {
        title: "§12. Postanowienia końcowe",
        items: [
          { type: "ol", items: [
            { text: "W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego, ustawy o prawach konsumenta z dnia 30 maja 2014 r. oraz ustawy o świadczeniu usług drogą elektroniczną." },
            { text: "Ewentualne spory pomiędzy Usługodawcą a Użytkownikiem niebędącym Konsumentem rozstrzygane będą przez sąd właściwy dla siedziby Usługodawcy." },
            { text: "Regulamin wchodzi w życie z dniem 25 lutego 2026 r." },
          ]},
        ],
      },
    ],
  },
  en: {
    title: "Terms of Service",
    lastUpdated: "Last updated: February 25, 2026",
    sections: [
      {
        title: "§1. General Provisions",
        items: [
          { type: "ol", items: [
            { text: "These Terms of Service define the rules for using the YLY website (hereinafter: \"Service\"), available at yly.pl." },
            { text: "The owner and administrator of the Service is Patryk Olejnik, conducting business activity (hereinafter: \"Service Provider\")." },
            { text: "These Terms constitute the terms of providing electronic services within the meaning of Article 8 of the Polish Act of July 18, 2002 on the Provision of Electronic Services." },
            { text: "Using the Service constitutes acceptance of these Terms." },
            { text: "The Terms are made available free of charge through the Service in a form that allows downloading, saving and printing." },
          ]},
        ],
      },
      {
        title: "§2. Definitions",
        items: [
          { type: "p", text: "Terms used in these Terms of Service mean:" },
          { type: "ul", items: [
            { text: "<strong>Service</strong> — the YLY website together with all subpages." },
            { text: "<strong>Service Provider</strong> — Patryk Olejnik, owner of the YLY service." },
            { text: "<strong>User</strong> — any natural person, legal person or organizational unit using the Service." },
            { text: "<strong>Consumer</strong> — a User who is a natural person performing a legal action not directly related to their business or professional activity (Article 22¹ of the Polish Civil Code)." },
            { text: "<strong>Digital Content</strong> — online courses, e-books, prompt collections and other digital materials offered in the Service." },
            { text: "<strong>Electronic Service</strong> — a service provided electronically by the Service Provider to the User through the Service." },
            { text: "<strong>Account</strong> — the User's individual account in the Service or on the Skool platform." },
          ]},
        ],
      },
      {
        title: "§3. Types and Scope of Services",
        items: [
          { type: "ol", items: [
            { text: "The Service Provider offers the following services through the Service:", sub: { type: "ul", items: [
              { text: "providing informational content on artificial intelligence topics;" },
              { text: "selling digital content (courses, e-books, prompt collections);" },
              { text: "providing access to a closed community on the Skool platform;" },
              { text: "providing social media channels (Discord, Facebook, YouTube, TikTok, X)." },
            ]}},
            { text: "Using some services may require creating an Account or making a payment." },
            { text: "Detailed terms and conditions for the sale of digital content are governed by a separate Sales Terms document." },
          ]},
        ],
      },
      {
        title: "§4. Technical Requirements",
        items: [
          { type: "ol", items: [
            { text: "To use the Service, the following is required:", sub: { type: "ul", items: [
              { text: "a device with Internet access;" },
              { text: "a web browser supporting JavaScript and cookies;" },
              { text: "an active email address (for purchasing digital content)." },
            ]}},
            { text: "The Service Provider is not liable for technical problems resulting from failure to meet the above requirements." },
          ]},
        ],
      },
      {
        title: "§5. Rules for Using the Service",
        items: [
          { type: "ol", items: [
            { text: "The User agrees to use the Service in accordance with applicable law, the provisions of these Terms and good practices." },
            { text: "It is prohibited to:", sub: { type: "ul", items: [
              { text: "copy, distribute and share digital content with third parties without the Service Provider's consent;" },
              { text: "take actions that may disrupt the proper functioning of the Service;" },
              { text: "use the Service in a manner inconsistent with its purpose;" },
              { text: "provide unlawful content." },
            ]}},
            { text: "Violation of the above rules may result in blocking access to the Service and digital content." },
          ]},
        ],
      },
      {
        title: "§6. Copyright and Intellectual Property",
        items: [
          { type: "ol", items: [
            { text: "All content available in the Service, including texts, graphics, logos, photos, videos, courses, e-books and prompts, is the property of the Service Provider or has been used with the consent of authorized entities and is protected under applicable copyright law." },
            { text: "Purchasing digital content means acquiring a license for personal use. The license does not include the right to further distribute, resell or modify for commercial purposes." },
            { text: "Any copying, reproduction or redistribution of content without the written consent of the Service Provider constitutes a copyright infringement." },
          ]},
        ],
      },
      {
        title: "§7. Liability",
        items: [
          { type: "ol", items: [
            { text: "The Service Provider makes every effort to ensure that the Service operates correctly and without interruptions." },
            { text: "The Service Provider is not liable for:", sub: { type: "ul", items: [
              { text: "temporary interruptions in Service availability caused by maintenance work or failures;" },
              { text: "consequences of using digital content in a manner inconsistent with the Terms;" },
              { text: "actions of third parties that may affect the functioning of the Service." },
            ]}},
            { text: "Content available in the Service is educational and informational in nature. The Service Provider does not guarantee that Users will achieve specific results." },
          ]},
        ],
      },
      {
        title: "§8. Personal Data Protection",
        items: [
          { type: "ol", items: [
            { text: "The controller of Users' personal data is the Service Provider." },
            { text: "Personal data is processed in accordance with Regulation (EU) 2016/679 (GDPR) and the Polish Act of May 10, 2018 on Personal Data Protection." },
            { text: "Detailed rules for personal data processing are set out in the Privacy Policy available in the Service." },
          ]},
        ],
      },
      {
        title: "§9. Complaints",
        items: [
          { type: "ol", items: [
            { text: "The User has the right to file a complaint regarding the functioning of the Service or purchased digital content." },
            { text: "Complaints should be submitted electronically to the email address: <strong>support@yly.com.pl</strong>." },
            { text: "A complaint should contain: User's data, description of the problem and expected resolution." },
            { text: "The Service Provider will review the complaint within 14 days of receiving it and will inform the User of the resolution electronically." },
          ]},
        ],
      },
      {
        title: "§10. Out-of-Court Dispute Resolution",
        items: [
          { type: "ol", items: [
            { text: "The Consumer has the right to use out-of-court complaint and claim resolution methods, in particular:", sub: { type: "ul", items: [
              { text: "applying to a permanent consumer arbitration court at the Provincial Trade Inspection;" },
              { text: "applying to the Provincial Inspector of Trade Inspection for mediation proceedings;" },
              { text: "using the ODR platform available at: <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>https://ec.europa.eu/consumers/odr</a>." },
            ]}},
          ]},
        ],
      },
      {
        title: "§11. Amendment of Terms",
        items: [
          { type: "ol", items: [
            { text: "The Service Provider reserves the right to amend these Terms at any time." },
            { text: "Users will be informed of any changes through the Service or electronically at least 14 days before the changes take effect." },
            { text: "Using the Service after the changes take effect constitutes acceptance thereof." },
          ]},
        ],
      },
      {
        title: "§12. Final Provisions",
        items: [
          { type: "ol", items: [
            { text: "In matters not regulated by these Terms, the provisions of Polish law shall apply, in particular the Civil Code, the Consumer Rights Act of May 30, 2014 and the Act on the Provision of Electronic Services." },
            { text: "Any disputes between the Service Provider and a User who is not a Consumer shall be resolved by the court having jurisdiction over the Service Provider's registered office." },
            { text: "These Terms enter into force on February 25, 2026." },
          ]},
        ],
      },
    ],
  },
  uk: {
    title: "Умови користування сервісом",
    lastUpdated: "Останнє оновлення: 25 лютого 2026",
    sections: [
      {
        title: "§1. Загальні положення",
        items: [
          { type: "ol", items: [
            { text: "Цей Регламент визначає правила користування інтернет-сервісом YLY (далі: «Сервіс»), доступним за адресою yly.pl." },
            { text: "Власником та адміністратором Сервісу є Патрик Олєйнік, який веде підприємницьку діяльність (далі: «Постачальник послуг»)." },
            { text: "Регламент є правилами надання електронних послуг відповідно до ст. 8 Закону Польщі від 18 липня 2002 р. про надання електронних послуг." },
            { text: "Користування Сервісом означає прийняття цього Регламенту." },
            { text: "Регламент надається безкоштовно через Сервіс у формі, що дозволяє його завантаження, збереження та друк." },
          ]},
        ],
      },
      {
        title: "§2. Визначення",
        items: [
          { type: "p", text: "Терміни, використані в Регламенті, означають:" },
          { type: "ul", items: [
            { text: "<strong>Сервіс</strong> — веб-сайт YLY разом з усіма підсторінками." },
            { text: "<strong>Постачальник послуг</strong> — Патрик Олєйнік, власник сервісу YLY." },
            { text: "<strong>Користувач</strong> — будь-яка фізична особа, юридична особа або організаційна одиниця, що користується Сервісом." },
            { text: "<strong>Споживач</strong> — Користувач, який є фізичною особою, що здійснює правочин, не пов'язаний безпосередньо з її підприємницькою або професійною діяльністю." },
            { text: "<strong>Цифровий контент</strong> — онлайн-курси, електронні книги, колекції промптів та інші цифрові матеріали, запропоновані в Сервісі." },
            { text: "<strong>Послуга</strong> — послуга, що надається електронним способом Постачальником послуг Користувачу через Сервіс." },
            { text: "<strong>Обліковий запис</strong> — індивідуальний обліковий запис Користувача в Сервісі або на платформі Skool." },
          ]},
        ],
      },
      {
        title: "§3. Види та обсяг послуг",
        items: [
          { type: "ol", items: [
            { text: "Постачальник послуг надає через Сервіс такі послуги:", sub: { type: "ul", items: [
              { text: "надання інформаційного контенту з тематики штучного інтелекту;" },
              { text: "продаж цифрового контенту (курси, електронні книги, колекції промптів);" },
              { text: "надання доступу до закритої спільноти на платформі Skool;" },
              { text: "надання каналів у соціальних мережах (Discord, Facebook, YouTube, TikTok, X)." },
            ]}},
            { text: "Користування деякими послугами може вимагати створення облікового запису або здійснення оплати." },
            { text: "Детальні умови продажу цифрового контенту регулюються окремими Умовами продажу." },
          ]},
        ],
      },
      {
        title: "§4. Технічні вимоги",
        items: [
          { type: "ol", items: [
            { text: "Для користування Сервісом необхідно:", sub: { type: "ul", items: [
              { text: "пристрій з доступом до мережі Інтернет;" },
              { text: "веб-браузер, що підтримує JavaScript та файли cookies;" },
              { text: "активна електронна адреса (у випадку придбання цифрового контенту)." },
            ]}},
            { text: "Постачальник послуг не несе відповідальності за технічні проблеми, що виникають через невиконання вищезазначених вимог." },
          ]},
        ],
      },
      {
        title: "§5. Правила користування Сервісом",
        items: [
          { type: "ol", items: [
            { text: "Користувач зобов'язується користуватися Сервісом відповідно до чинного законодавства, положень цього Регламенту та добрих звичаїв." },
            { text: "Забороняється:", sub: { type: "ul", items: [
              { text: "копіювання, розповсюдження та надання доступу до цифрового контенту третім особам без згоди Постачальника послуг;" },
              { text: "вчинення дій, які можуть порушити належне функціонування Сервісу;" },
              { text: "використання Сервісу у спосіб, що суперечить його призначенню;" },
              { text: "надання контенту протиправного характеру." },
            ]}},
            { text: "Порушення вищезазначених правил може призвести до блокування доступу до Сервісу та цифрового контенту." },
          ]},
        ],
      },
      {
        title: "§6. Авторські права та інтелектуальна власність",
        items: [
          { type: "ol", items: [
            { text: "Весь контент, доступний у Сервісі, включаючи тексти, графіку, логотипи, фотографії, відео, курси, електронні книги та промпти, є власністю Постачальника послуг або використовується за згодою уповноважених суб'єктів і захищений відповідним законодавством про авторське право." },
            { text: "Придбання цифрового контенту означає отримання ліцензії для особистого використання. Ліцензія не включає право на подальше розповсюдження, перепродаж або модифікацію в комерційних цілях." },
            { text: "Будь-яке копіювання, відтворення або перерозповсюдження контенту без письмової згоди Постачальника послуг є порушенням авторських прав." },
          ]},
        ],
      },
      {
        title: "§7. Відповідальність",
        items: [
          { type: "ol", items: [
            { text: "Постачальник послуг докладає всіх зусиль для забезпечення належної та безперервної роботи Сервісу." },
            { text: "Постачальник послуг не несе відповідальності за:", sub: { type: "ul", items: [
              { text: "тимчасові перерви в доступності Сервісу, спричинені технічним обслуговуванням або аваріями;" },
              { text: "наслідки використання цифрового контенту у спосіб, що суперечить Регламенту;" },
              { text: "дії третіх осіб, які можуть вплинути на функціонування Сервісу." },
            ]}},
            { text: "Контент, доступний у Сервісі, має освітній та інформаційний характер. Постачальник послуг не гарантує досягнення конкретних результатів Користувачами." },
          ]},
        ],
      },
      {
        title: "§8. Захист персональних даних",
        items: [
          { type: "ol", items: [
            { text: "Адміністратором персональних даних Користувачів є Постачальник послуг." },
            { text: "Персональні дані обробляються відповідно до Регламенту (ЄС) 2016/679 (GDPR) та Закону Польщі від 10 травня 2018 р. про захист персональних даних." },
            { text: "Детальні правила обробки персональних даних визначені в Політиці конфіденційності, доступній у Сервісі." },
          ]},
        ],
      },
      {
        title: "§9. Рекламації",
        items: [
          { type: "ol", items: [
            { text: "Користувач має право подати рекламацію щодо функціонування Сервісу або придбаного цифрового контенту." },
            { text: "Рекламації слід подавати електронною поштою на адресу: <strong>support@yly.com.pl</strong>." },
            { text: "Рекламація повинна містити: дані Користувача, опис проблеми та очікуваний спосіб вирішення." },
            { text: "Постачальник послуг розгляне рекламацію протягом 14 днів з дати її отримання та повідомить Користувача про спосіб її вирішення електронною поштою." },
          ]},
        ],
      },
      {
        title: "§10. Позасудове вирішення спорів",
        items: [
          { type: "ol", items: [
            { text: "Споживач має право скористатися позасудовими способами розгляду скарг та задоволення вимог, зокрема:", sub: { type: "ul", items: [
              { text: "звернення до постійного споживчого арбітражного суду при Воєводському інспекторі торговельної інспекції;" },
              { text: "звернення до Воєводського інспектора торговельної інспекції із заявою про початок медіаційного провадження;" },
              { text: "використання платформи ODR, доступної за адресою: <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>https://ec.europa.eu/consumers/odr</a>." },
            ]}},
          ]},
        ],
      },
      {
        title: "§11. Зміна Регламенту",
        items: [
          { type: "ol", items: [
            { text: "Постачальник послуг залишає за собою право змінювати цей Регламент у будь-який час." },
            { text: "Про будь-які зміни Користувачі будуть повідомлені через Сервіс або електронною поштою не менше ніж за 14 днів до набуття чинності змінами." },
            { text: "Користування Сервісом після набуття чинності змінами означає їх прийняття." },
          ]},
        ],
      },
      {
        title: "§12. Заключні положення",
        items: [
          { type: "ol", items: [
            { text: "У питаннях, не врегульованих цим Регламентом, застосовуються норми польського законодавства, зокрема Цивільного кодексу, Закону про права споживачів від 30 травня 2014 р. та Закону про надання електронних послуг." },
            { text: "Можливі спори між Постачальником послуг та Користувачем, який не є Споживачем, вирішуються судом за місцезнаходженням Постачальника послуг." },
            { text: "Регламент набуває чинності 25 лютого 2026 р." },
          ]},
        ],
      },
    ],
  },
  es: {
    title: "Términos de Servicio",
    lastUpdated: "Última actualización: 25 de febrero de 2026",
    sections: [
      {
        title: "§1. Disposiciones generales",
        items: [
          { type: "ol", items: [
            { text: "Estos Términos de Servicio definen las reglas para el uso del sitio web YLY (en adelante: \"Servicio\"), disponible en yly.pl." },
            { text: "El propietario y administrador del Servicio es Patryk Olejnik, que realiza actividad empresarial (en adelante: \"Proveedor del Servicio\")." },
            { text: "Estos Términos constituyen las condiciones de prestación de servicios electrónicos en el sentido del artículo 8 de la Ley polaca de 18 de julio de 2002 sobre la prestación de servicios electrónicos." },
            { text: "El uso del Servicio implica la aceptación de estos Términos." },
            { text: "Los Términos se ponen a disposición de forma gratuita a través del Servicio en un formato que permite su descarga, almacenamiento e impresión." },
          ]},
        ],
      },
      {
        title: "§2. Definiciones",
        items: [
          { type: "p", text: "Los términos utilizados en este documento significan:" },
          { type: "ul", items: [
            { text: "<strong>Servicio</strong> — el sitio web YLY junto con todas sus subpáginas." },
            { text: "<strong>Proveedor del Servicio</strong> — Patryk Olejnik, propietario del servicio YLY." },
            { text: "<strong>Usuario</strong> — cualquier persona física, persona jurídica o unidad organizativa que utilice el Servicio." },
            { text: "<strong>Consumidor</strong> — un Usuario que es una persona física que realiza una acción jurídica no relacionada directamente con su actividad empresarial o profesional (artículo 22¹ del Código Civil polaco)." },
            { text: "<strong>Contenido digital</strong> — cursos en línea, e-books, colecciones de prompts y otros materiales digitales ofrecidos en el Servicio." },
            { text: "<strong>Servicio electrónico</strong> — un servicio proporcionado electrónicamente por el Proveedor del Servicio al Usuario a través del Servicio." },
            { text: "<strong>Cuenta</strong> — la cuenta individual del Usuario en el Servicio o en la plataforma Skool." },
          ]},
        ],
      },
      {
        title: "§3. Tipos y alcance de los servicios",
        items: [
          { type: "ol", items: [
            { text: "El Proveedor del Servicio ofrece los siguientes servicios a través del Servicio:", sub: { type: "ul", items: [
              { text: "proporcionar contenido informativo sobre inteligencia artificial;" },
              { text: "venta de contenido digital (cursos, e-books, colecciones de prompts);" },
              { text: "proporcionar acceso a una comunidad cerrada en la plataforma Skool;" },
              { text: "proporcionar canales en redes sociales (Discord, Facebook, YouTube, TikTok, X)." },
            ]}},
            { text: "El uso de algunos servicios puede requerir la creación de una Cuenta o la realización de un pago." },
            { text: "Las condiciones detalladas de venta del contenido digital están reguladas por los Términos de Venta independientes." },
          ]},
        ],
      },
      {
        title: "§4. Requisitos técnicos",
        items: [
          { type: "ol", items: [
            { text: "Para utilizar el Servicio se requiere:", sub: { type: "ul", items: [
              { text: "un dispositivo con acceso a Internet;" },
              { text: "un navegador web compatible con JavaScript y cookies;" },
              { text: "una dirección de correo electrónico activa (para la compra de contenido digital)." },
            ]}},
            { text: "El Proveedor del Servicio no es responsable de los problemas técnicos derivados del incumplimiento de los requisitos anteriores." },
          ]},
        ],
      },
      {
        title: "§5. Reglas de uso del Servicio",
        items: [
          { type: "ol", items: [
            { text: "El Usuario se compromete a utilizar el Servicio de conformidad con la legislación vigente, las disposiciones de estos Términos y las buenas prácticas." },
            { text: "Queda prohibido:", sub: { type: "ul", items: [
              { text: "copiar, distribuir y compartir contenido digital con terceros sin el consentimiento del Proveedor del Servicio;" },
              { text: "realizar acciones que puedan perturbar el correcto funcionamiento del Servicio;" },
              { text: "utilizar el Servicio de manera incompatible con su finalidad;" },
              { text: "proporcionar contenido ilegal." },
            ]}},
            { text: "La violación de las reglas anteriores puede resultar en el bloqueo del acceso al Servicio y al contenido digital." },
          ]},
        ],
      },
      {
        title: "§6. Derechos de autor y propiedad intelectual",
        items: [
          { type: "ol", items: [
            { text: "Todo el contenido disponible en el Servicio, incluidos textos, gráficos, logotipos, fotos, vídeos, cursos, e-books y prompts, es propiedad del Proveedor del Servicio o se ha utilizado con el consentimiento de las entidades autorizadas y está protegido por la legislación aplicable sobre derechos de autor." },
            { text: "La compra de contenido digital significa la adquisición de una licencia para uso personal. La licencia no incluye el derecho a distribuir, revender o modificar con fines comerciales." },
            { text: "Cualquier copia, reproducción o redistribución del contenido sin el consentimiento escrito del Proveedor del Servicio constituye una infracción de los derechos de autor." },
          ]},
        ],
      },
      {
        title: "§7. Responsabilidad",
        items: [
          { type: "ol", items: [
            { text: "El Proveedor del Servicio hace todo lo posible para garantizar que el Servicio funcione correctamente y sin interrupciones." },
            { text: "El Proveedor del Servicio no es responsable de:", sub: { type: "ul", items: [
              { text: "interrupciones temporales en la disponibilidad del Servicio causadas por trabajos de mantenimiento o averías;" },
              { text: "consecuencias del uso del contenido digital de manera incompatible con los Términos;" },
              { text: "acciones de terceros que puedan afectar al funcionamiento del Servicio." },
            ]}},
            { text: "El contenido disponible en el Servicio tiene carácter educativo e informativo. El Proveedor del Servicio no garantiza que los Usuarios obtengan resultados específicos." },
          ]},
        ],
      },
      {
        title: "§8. Protección de datos personales",
        items: [
          { type: "ol", items: [
            { text: "El responsable del tratamiento de los datos personales de los Usuarios es el Proveedor del Servicio." },
            { text: "Los datos personales se tratan de conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley polaca de 10 de mayo de 2018 sobre la protección de datos personales." },
            { text: "Las normas detalladas de tratamiento de datos personales se establecen en la Política de Privacidad disponible en el Servicio." },
          ]},
        ],
      },
      {
        title: "§9. Reclamaciones",
        items: [
          { type: "ol", items: [
            { text: "El Usuario tiene derecho a presentar una reclamación relativa al funcionamiento del Servicio o al contenido digital adquirido." },
            { text: "Las reclamaciones deben enviarse electrónicamente a la dirección de correo electrónico: <strong>support@yly.com.pl</strong>." },
            { text: "La reclamación debe contener: datos del Usuario, descripción del problema y resolución esperada." },
            { text: "El Proveedor del Servicio revisará la reclamación en un plazo de 14 días desde su recepción e informará al Usuario de la resolución por vía electrónica." },
          ]},
        ],
      },
      {
        title: "§10. Resolución extrajudicial de litigios",
        items: [
          { type: "ol", items: [
            { text: "El Consumidor tiene derecho a utilizar métodos extrajudiciales de resolución de reclamaciones y reclamaciones, en particular:", sub: { type: "ul", items: [
              { text: "dirigirse al tribunal de arbitraje de consumo permanente de la Inspección Provincial de Comercio;" },
              { text: "dirigirse al Inspector Provincial de Inspección de Comercio para procedimientos de mediación;" },
              { text: "utilizar la plataforma ODR disponible en: <a href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>https://ec.europa.eu/consumers/odr</a>." },
            ]}},
          ]},
        ],
      },
      {
        title: "§11. Modificación de los Términos",
        items: [
          { type: "ol", items: [
            { text: "El Proveedor del Servicio se reserva el derecho de modificar estos Términos en cualquier momento." },
            { text: "Los Usuarios serán informados de cualquier cambio a través del Servicio o electrónicamente con al menos 14 días de antelación antes de que los cambios entren en vigor." },
            { text: "El uso del Servicio después de la entrada en vigor de los cambios implica su aceptación." },
          ]},
        ],
      },
      {
        title: "§12. Disposiciones finales",
        items: [
          { type: "ol", items: [
            { text: "En asuntos no regulados por estos Términos, se aplicarán las disposiciones del derecho polaco, en particular el Código Civil, la Ley de Derechos de los Consumidores de 30 de mayo de 2014 y la Ley sobre la prestación de servicios electrónicos." },
            { text: "Los posibles litigios entre el Proveedor del Servicio y un Usuario que no sea Consumidor serán resueltos por el tribunal competente del domicilio del Proveedor del Servicio." },
            { text: "Estos Términos entran en vigor el 25 de febrero de 2026." },
          ]},
        ],
      },
    ],
  },
};
