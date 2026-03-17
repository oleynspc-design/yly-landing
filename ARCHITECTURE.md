# Architektura YLY (Young Leading You)

Ten dokument opisuje architekturę systemu, model bazy danych oraz kluczowe przepływy (workflows), aby ułatwić przejęcie projektu lub jego dalszy rozwój (white-labeling).

## 1. Wybór Stosu Technologicznego

Aplikacja została napisana z myślą o maksymalnej wydajności i najniższych kosztach utrzymania na architekturze bezserwerowej (Serverless).

- **Framework:** Next.js 15 (App Router). Używany jest tryb dynamicznego renderowania (SSR) oraz Route Handlers dla API.
- **Baza Danych:** Vercel Postgres. Jest to standardowa relacyjna baza PostgreSQL obsługująca pule połączeń, co idealnie współgra z serverless dzięki natywnemu klientowi `@vercel/postgres`.
- **Autoryzacja:** Własny system ról oparty na **JWT (JSON Web Tokens)** zapisywanych w ciasteczkach `httpOnly`. Zrezygnowano z ciężkich frameworków auth, by mieć 100% kontroli nad sesjami i uprawnieniami per żądanie.
- **Płatności:** Stripe. Aplikacja korzysta ze Checkout Sessions oraz nasłuchuje zdarzeń Webhook (weryfikowanych kluczem podpisu).
- **AI:** Model OpenAI `gpt-4o-mini` - wybrany ze względu na optymalny stosunek ceny do jakości przy zapytaniach asystenta PROMPTLY.

## 2. Model Bazy Danych (ERD)

Baza danych zoptymalizowana jest pod kątem przechowywania kont, uprawnień szkoleniowych oraz systemu rezerwacji spotkań.

### Tabele (PostgreSQL):

#### `users`
Tabela główna z kontami użytkowników.
- `id` (SERIAL PRIMARY KEY)
- `email` (VARCHAR UNIQUE)
- `password_hash` (VARCHAR)
- `full_name` (VARCHAR)
- `role` (VARCHAR) - domyślnie `'user'`, lub `'admin'`
- `created_at` (TIMESTAMP)
- `last_active` (TIMESTAMP) - służy do określania, czy użytkownik jest obecnie Online (w panelu Admina).

#### `training_access`
Tabela relacyjna (1:1 z `users`) definiująca pakiety dostępowe do platformy.
- `user_id` (INTEGER UNIQUE, FOREIGN KEY -> users.id)
- `access_status` (VARCHAR) - np. `'granted'`
- `access_scope` (VARCHAR) - np. `'all'`
- `unlock_code` (VARCHAR) - użyty kod jeśli zrealizowany
- `granted_at` (TIMESTAMP)
- `package_type` (VARCHAR) - `'standard'`, `'pro'`, `'premium'`. Definiuje m.in. dostęp do narzędzia Spotkań.

#### `meetings`
System rezerwacji i CRM.
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER, FOREIGN KEY -> users.id)
- `date` (DATE) - dzień spotkania
- `time` (VARCHAR) - godzina spotkania, np. `"14:00"`
- `type` (VARCHAR) - np. `"konsultacja"`, `"strategia"`
- `status` (VARCHAR) - np. `"zaplanowane"`, `"odbyte"`
- `notes` (TEXT)
- `created_at` (TIMESTAMP)

#### `meeting_credits`
Zarządzanie ilością darmowych spotkań przysługujących w ramach pakietu.
- `user_id` (INTEGER UNIQUE, FOREIGN KEY -> users.id)
- `credits_total` (INTEGER) - całkowita pula spotkań z pakietu
- `credits_used` (INTEGER) - wykorzystane spotkania

#### `access_codes`
Tabela dla kodów promocyjnych/odblokowujących.
- `id` (SERIAL PRIMARY KEY)
- `code` (VARCHAR UNIQUE)
- `created_by` (INTEGER, FOREIGN KEY -> users.id)
- `is_used` (BOOLEAN)
- `used_by` (INTEGER, FOREIGN KEY -> users.id)
- `used_at` (TIMESTAMP)

#### `user_metadata`
Przechowuje informacje uzyskane podczas onboardingu (np. branża), wykorzystywane do personalizacji promptów AI.
- `user_id` (INTEGER UNIQUE, FOREIGN KEY -> users.id)
- `industry` (VARCHAR)
- `updated_at` (TIMESTAMP)

## 3. Kluczowe Przepływy (Workflows)

### A. Rejestracja i Autoryzacja
1. Użytkownik podaje e-mail, hasło i imię.
2. Endpoint `/api/auth/register` hashuje hasło w `bcrypt` i zapisuje użytkownika do `users`.
3. Po logowaniu w `/api/auth/login`, generowany jest token JWT ważny przez 7 dni z zapisanym `userId`, `role` i `email`.
4. Token odsyłany jest jako ciasteczko `auth_token` z atrybutami `HttpOnly`, `Secure` i `SameSite=Lax`.
5. Frontend z użyciem endpointu `/api/auth/me` odpytuje o dane bieżące (przy okazji robi tzw. "heartbeat" odświeżając datę `last_active`).

### B. Odbieranie Płatności i Przyznawanie Pakietu
1. Użytkownik wybiera pakiet na stronie Cennik/Sklep.
2. Endpoint `/api/checkout` tworzy sesję `Stripe Checkout`, wstrzykując do metadata z `client_reference_id` równe `userId` oraz odpowiedni `packageType`.
3. Po udanej opłacie Stripe uderza w endpoint webhooka `/api/webhook/stripe`.
4. Webhook weryfikuje podpis Stripe. Jeśli to zdarzenie `checkout.session.completed`, aktualizuje w bazie `training_access` pole `package_type` i ładuje użytkownikowi kredyty w `meeting_credits`.

### C. System Spotkań i Widok CRM (Admin)
1. Klienci z pakietem `pro/premium` wchodzą w zakładkę Spotkania i wybierają wolny termin w kalendarzu.
2. Endpoint `/api/meetings` weryfikuje, czy `credits_used < credits_total`. Jeśli tak, rezerwuje spotkanie w `meetings` i podbija użyte kredyty o 1.
3. **Konto Administratora** (rola: `admin`) przy wejściu w ten sam endpoint i tę samą stronę `/szkolenie/spotkania` wyzwala zapytanie zwrotne całego CRM (dołącza `users.full_name` i pobiera WSZYSTKIE spotkania w systemie, niezależnie od właściciela). Administrator może tam zarządzać terminami i widzi wszystkie dane klientów.

### D. PROMPTLY AI (Chatbot)
1. `/api/promptly` używa Vercel AI SDK i OpenAI (`gpt-4o-mini`).
2. Kontekst systemowy bota ulega modyfikacji na podstawie branży użytkownika pobranej z `user_metadata`.
3. Zaimplementowano Role Prompting i Context Filtering na poziomie wstrzykiwania instrukcji do OpenAI, dzięki czemu odpowiedzi są precyzyjne, a chatbot pełni rolę nauczyciela inżynierii promptów.

## 4. Architektura Migracji Bazy Danych
Zamiast korzystać z ciężkich narzędzi ORM typu Prisma/TypeORM, w projekcie zaimplementowano małe, czyste migracje SQL zlokalizowane w folderze `/scripts`.
Gwarantuje to 100% transparentności i kontroli nad strukturą w chmurze serverless.
- Pliki typu `migrate-vX.js` można uruchamiać w środowisku lokalnym, Node, lub podpinać pod pipeline CD przed wdrożeniem z Vercel CLI.
- Pozwala to szybko zaadaptować bazę dla nowych klientów B2B przy sprzedaży platformy jako White Label.
