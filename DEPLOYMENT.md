# Instrukcja Wdrożenia (Deployment Guide)

Ten dokument opisuje krok po kroku jak wdrożyć platformę YLY na środowisko produkcyjne (Vercel) wraz z bazą danych i płatnościami Stripe.

## 1. Wymagania Wstępne
Do wdrożenia produkcyjnego będziesz potrzebować kont na:
- **Vercel** (do hostowania aplikacji i bazy danych Vercel Postgres)
- **Stripe** (do obsługi płatności)
- **OpenAI** (do obsługi chatbota PROMPTLY)
- **GitHub/GitLab/Bitbucket** (do repozytorium kodu)

## 2. Baza Danych (Vercel Postgres)

Platforma jest zaprojektowana do działania na Vercel Postgres.

1. Zaloguj się do panelu Vercel i przejdź do zakładki **Storage**.
2. Stwórz nową bazę danych typu **Postgres**.
3. Po utworzeniu skopiuj klucze dostępowe (przejdź do zakładki *.env.local* i skopiuj `POSTGRES_URL`).
4. Skonfiguruj bazę lokalnie, tworząc w głównym katalogu projektu plik `.env.local` ze skopiowanym adresem bazy.
5. Zainicjuj schemat bazy danych. W terminalu uruchom kolejno:
   ```bash
   node scripts/init-db.js
   node scripts/migrate-v2.js
   node scripts/migrate-v3.js
   node scripts/migrate-v4.js
   node scripts/migrate-v5.js
   node scripts/migrate-v6.js
   node scripts/migrate-v7.js
   node scripts/migrate-v8.js
   node scripts/migrate-v9.js
   ```

*Uwaga:* Jeśli wdrażasz projekt u klienta, powyższe skrypty odtworzą całą strukturę bazy danych gotową do pracy z nowym CRM i logowaniem.

## 3. Zmienne Środowiskowe (Environment Variables)

Aplikacja wymaga skonfigurowania następujących zmiennych w środowisku produkcyjnym (na Vercelu):

### Baza danych
- `POSTGRES_URL` - Adres URL do puli połączeń bazy PostgreSQL.
- Inne zmienne `POSTGRES_*` zazwyczaj są wstrzykiwane automatycznie przez Vercel po podpięciu Storage do projektu.

### Bezpieczeństwo i Logowanie
- `JWT_SECRET` - Silny, losowy ciąg znaków (np. 64 znaki) służący do podpisywania ciasteczek logowania. (Możesz wygenerować np. przez `openssl rand -hex 32`).

### AI (Chatbot PROMPTLY)
- `OPENAI_API_KEY` - Twój tajny klucz API z platformy OpenAI.
- Upewnij się, że masz podpiętą kartę w OpenAI i dodatnie saldo (credits), aby model `gpt-4o-mini` funkcjonował poprawnie.

### Stripe (Płatności)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Klucz publiczny Stripe (zaczyna się od `pk_live_` lub `pk_test_`).
- `STRIPE_SECRET_KEY` - Klucz tajny Stripe (zaczyna się od `sk_live_` lub `sk_test_`).
- `STRIPE_WEBHOOK_SECRET` - Tajny klucz Webhooka. Wygenerowany w panelu Stripe (zaczyna się od `whsec_`), autoryzuje przychodzące żądania o pomyślnej płatności.

## 4. Konfiguracja Płatności (Stripe)

Aby system automatycznie nadawał uprawnienia po zakupie:

1. W panelu Stripe włącz tryb deweloperski (do testów) lub produkcyjny.
2. Utwórz produkty (np. Pakiet Standard, Pro, Premium) i skopiuj ich **Price IDs** (np. `price_1P...`).
3. Zaktualizuj plik `app/api/checkout/route.ts` lub `app/sklep/page.tsx` wstawiając nowe Price ID odpowiednich pakietów.
4. Przejdź do **Developers -> Webhooks** i dodaj nowy endpoint:
   - Adres: `https://[TWOJA_DOMENA_PRODUKCYJNA]/api/webhook/stripe`
   - Nasłuchuj zdarzeń (Events to send): `checkout.session.completed`
5. Skopiuj *Signing secret* (to będzie twoje `STRIPE_WEBHOOK_SECRET`).

## 5. Deploy na Vercel

1. Wypchnij (push) projekt do swojego repozytorium GitHub.
2. W Vercel utwórz nowy projekt importując to repozytorium.
3. W sekcji *Environment Variables* dodaj wszystkie zmienne opisane w punkcie 3.
4. Kliknij **Deploy**.
5. Po udanym wdrożeniu, Vercel wygeneruje dla Ciebie adres URL (lub podepnij własną domenę).

## 6. Pierwsze Konto Administratora

Baza danych z migracjami jest gotowa do działania, ale nie ma jeszcze konta admina, który widzi CRM i spotkania wszystkich klientów.

1. Zarejestruj normalne konto na produkcji (przez `/rejestracja`).
2. Uruchom skrypt nadający uprawnienia administratora na Twoje konto e-mail. Masz dwie opcje:
   - Zmodyfikuj plik `scripts/make-admin.js`, ustawiając tam swój `POSTGRES_URL` z produkcji.
   - Odpal w terminalu (lokalnie, z włączonym `.env` z produkcyjnym URL bazy):
     ```bash
     node scripts/make-admin.js TWOJ_EMAIL@domena.pl
     ```
3. Zaloguj się ponownie. Otrzymasz pełen dostęp i nową zakładkę **Admin** na platformie oraz uprawnienia do podglądu całego CRM w sekcji Spotkania.

## Podsumowanie i sprzedaż
Projekt jest skalowalny (dzięki architekturze serverless Next.js), gotowy na zmiany wizualne (TailwindCSS) i odłączony od drogich, powolnych rozwiązań zewnętrznych autoryzacji (wbudowany JWT). Możesz pakować i oferować to oprogramowanie jako usługę gotową do instalacji u klientów (SaaS / White Label).
