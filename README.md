# YLY (Young Leading You) - Platforma Szkoleniowo-Biznesowa AI

Kompleksowa platforma szkoleniowa i CRM zaprojektowana do monetyzacji kursów z inżynierii promptów, automatyzacji AI oraz zarządzania spotkaniami z klientami. Zbudowana na nowoczesnym stosie technologicznym Next.js 15, React 19, i bazie PostgreSQL (Vercel Postgres).

## 🌟 Główne funkcjonalności

### 1. Platforma e-learningowa (LMS)
- **Moduły szkoleniowe:** 
  - Podstawy promptingu (kurs + quizy)
  - Zaawansowany prompting (zaawansowane techniki, prace domowe)
  - Social media & AI workflows
- **Grywalizacja i certyfikaty:** System śledzenia postępów (progress bar), dynamiczne quizy i zadania domowe.
- **Odblokowywanie dostępu:** Kody dostępowe i automatyczna integracja ze Stripe do odblokowywania płatnych materiałów po zakupie.
- **Onboarding:** Personalizacja szkoleń i promptów na podstawie branży użytkownika.

### 2. PROMPTLY - Wbudowany Asystent AI
- Kontekstowy chatbot AI oparty o model GPT-4o-mini (OpenAI).
- Posiada system person i role-promptingu dostosowany do profili zawodowych użytkownika (wybieranych w onboardingu).
- Generowanie gotowych strategii, kodów i analiz biznesowych w czasie rzeczywistym.

### 3. CRM i Zarządzanie Spotkaniami (Spotkania)
- **Kalendarz rezerwacji:** Użytkownicy z pakietami (Pro, Premium) mogą rezerwować i widzieć spotkania w dostępnych slotach czasowych.
- **Panel Admina / Widok CRM:** Administrator widzi kalendarz zbiorczy wszystkich spotkań i klientów w jednym miejscu. Brak limitów spotkań dla administracji.
- **Zarządzanie kredytami spotkań:** Pakiety definiują pulę spotkań 1:1, a API waliduje kredyty podczas umawiania.

### 4. System Autoryzacji i Ról
- Własna, lekka implementacja logowania JWT. Role użytkowników (`user`, `admin`).
- Panel zarządzania użytkownikami dla administratorów (przyznawanie dostępu, zmiana ról, przydzielanie pakietów szkoleniowych).
- Śledzenie aktywności (last_active) do monitorowania, kto aktualnie korzysta z platformy (status Online).

### 5. Płatności i Monetyzacja
- Zintegrowane płatności Stripe.
- Skonfigurowany Webhook nasłuchujący pomyślnych transakcji (nadawanie statusu "premium", "pro", przydzielanie kredytów spotkań).
- Koszyk i checkout dla pakietów edukacyjnych w aplikacji.

## 💻 Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion, Lucide React.
- **Backend:** Next.js Route Handlers (API / Edge Functions).
- **Baza Danych:** PostgreSQL (`@vercel/postgres`). Migracje przeprowadzane autorskimi skryptami w folderze `/scripts`.
- **Integracje:** OpenAI API (dla PROMPTLY), Stripe API (płatności).

## 🚀 Uruchomienie lokalne

1. **Sklonuj repozytorium i zainstaluj zależności:**
```bash
npm install
```

2. **Skonfiguruj zmienne środowiskowe:**
Stwórz plik `.env.local` ze swoimi kluczami (wzór niżej):

```env
# Database
POSTGRES_URL="postgres://user:password@host/dbname"

# Security
JWT_SECRET="twoj_bardzo_tajny_sekret"

# OpenAI
OPENAI_API_KEY="sk-..."

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

3. **Inicjalizacja i migracja bazy danych:**
Uruchom skrypty migracyjne w kolejności, aby zbudować i zaktualizować pełny schemat bazy:
```bash
node scripts/init-db.js
node scripts/migrate-v2.js
# ... odpal wszystkie w kolejności do v9
```

4. **Uruchomienie serwera developerskiego:**
```bash
npm run dev
```
Otwórz przeglądarkę pod adresem [http://localhost:3000](http://localhost:3000).

## 📁 Struktura Projektu

- `/app` - Kod źródłowy frontendu i backendu.
  - `/app/api` - Backend (autoryzacja, zarządzanie, stripe webhook, OpenAI endpoints).
  - `/app/szkolenie` - Moduły szkoleniowe (LMS).
  - `/app/admin` - Panel administracyjny CRM i listowanie użytkowników.
  - `/app/components` - Współdzielone komponenty UI.
- `/lib` - Integracje API i utils (`db.ts`, `auth.ts`, `stripe.ts`).
- `/scripts` - Skrypty Node.js do migracji PostgreSQL (v1 do v9).
- `/public` - Assety graficzne, czcionki i ikony.

## 🛡️ Architektura i Baza Danych
Więcej informacji technicznych (ERD bazy danych, przepływ logowania i płatności) znajdziesz w pliku [ARCHITECTURE.md](ARCHITECTURE.md).

## 🌐 Gotowość do sprzedaży (White Label)
Aplikacja jest zaprojektowana tak, aby łatwo można było zmienić barwy (Tailwind), treści szkoleń (`lessons.ts`) i zintegrować ją na własnych kontach Stripe/Vercel dla dowolnego klienta edukacyjno-konsultingowego.
