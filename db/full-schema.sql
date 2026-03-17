-- ============================================================
-- YLY Platform — Full Database Schema
-- Run this on a fresh Neon database to set up everything.
-- All statements use IF NOT EXISTS / IF NOT EXISTS for safety.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ─── CORE: Users ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  avatar_url TEXT,
  industry TEXT,
  onboarding_answers JSONB,
  ai_profile_summary TEXT,
  training_path JSONB,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  last_active TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CORE: Training Access ───────────────────────────────
CREATE TABLE IF NOT EXISTS training_access (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'granted', 'revoked')),
  granted_scope TEXT NOT NULL DEFAULT 'none' CHECK (granted_scope IN ('none', 'all')),
  source TEXT,
  granted_at TIMESTAMPTZ,
  unlock_code TEXT UNIQUE,
  package_type TEXT DEFAULT 'basic',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CORE: Sessions ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CHAT: Channels & Messages ───────────────────────────
CREATE TABLE IF NOT EXISTS chat_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES chat_channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── SHOP: Products & Orders ─────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  price_pln INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL DEFAULT 'course' CHECK (type IN ('course', 'bundle', 'ebook', 'prompts')),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  access_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── ACCESS CODES (universal/bulk) ───────────────────────
CREATE TABLE IF NOT EXISTS access_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  scope TEXT NOT NULL DEFAULT 'all',
  active BOOLEAN NOT NULL DEFAULT true,
  max_uses INTEGER NOT NULL DEFAULT 1,
  times_used INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── XP & LEVELS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS xp_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CERTIFICATES ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'completion',
  title TEXT NOT NULL,
  description TEXT,
  score INTEGER,
  max_score INTEGER,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  downloadable BOOLEAN NOT NULL DEFAULT true
);

-- ─── MEETINGS & CREDITS ──────────────────────────────────
CREATE TABLE IF NOT EXISTS meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 90,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  meeting_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS meeting_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total INTEGER NOT NULL DEFAULT 0,
  used INTEGER NOT NULL DEFAULT 0,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── HELPLY: Progress, Notes, Homework ───────────────────
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_slug TEXT NOT NULL,
  lesson_index INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, module_slug, lesson_index)
);

CREATE TABLE IF NOT EXISTS user_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_slug TEXT NOT NULL,
  lesson_index INTEGER NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, module_slug, lesson_index)
);

CREATE TABLE IF NOT EXISTS homework_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_slug TEXT NOT NULL,
  lesson_index INTEGER NOT NULL,
  answer TEXT NOT NULL,
  ai_feedback TEXT,
  score INTEGER,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, module_slug, lesson_index)
);

-- ─── PROMPT LIBRARY ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS prompt_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  source TEXT NOT NULL DEFAULT 'manual',
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prompt_likes (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES prompt_library(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY(user_id, prompt_id)
);

-- ─── HELPLY CONVERSATIONS ────────────────────────────────
CREATE TABLE IF NOT EXISTS helply_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_slug TEXT,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═════════════════════════════════════════════════════════
-- INDEXES
-- ═════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_expires_at_idx ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS chat_messages_channel_idx ON chat_messages(channel_id, created_at DESC);
CREATE INDEX IF NOT EXISTS chat_messages_user_idx ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS orders_user_idx ON orders(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS orders_stripe_idx ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS xp_log_user_idx ON xp_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS certificates_user_idx ON certificates(user_id);
CREATE INDEX IF NOT EXISTS meetings_user_idx ON meetings(user_id, scheduled_at);
CREATE INDEX IF NOT EXISTS meetings_status_idx ON meetings(status, scheduled_at);
CREATE INDEX IF NOT EXISTS user_progress_user_idx ON user_progress(user_id, module_slug);
CREATE INDEX IF NOT EXISTS user_notes_user_idx ON user_notes(user_id, module_slug);
CREATE INDEX IF NOT EXISTS homework_user_idx ON homework_submissions(user_id, module_slug);
CREATE INDEX IF NOT EXISTS prompt_library_public_idx ON prompt_library(is_public, created_at DESC);
CREATE INDEX IF NOT EXISTS prompt_library_user_idx ON prompt_library(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS helply_conv_user_idx ON helply_conversations(user_id, module_slug, created_at);

-- ═════════════════════════════════════════════════════════
-- SEED DATA
-- ═════════════════════════════════════════════════════════

-- Default chat channel
INSERT INTO chat_channels (slug, name, description)
VALUES ('general', 'Ogólny', 'Główny kanał dyskusji')
ON CONFLICT (slug) DO NOTHING;

-- Default products (pricing tiers)
INSERT INTO products (slug, name, description, price_pln, type) VALUES
  ('basic', 'Pakiet Basic', 'Dostęp do wszystkich modułów szkoleniowych, quizów i certyfikatów', 19900, 'course'),
  ('pro', 'Pakiet Pro', 'Basic + PROMPTLY AI + Biblioteka promptów + priorytetowe wsparcie', 39900, 'bundle'),
  ('premium', 'Pakiet Premium', 'Pro + 2 spotkania 1:1 z mentorem + dostęp VIP', 69900, 'bundle')
ON CONFLICT (slug) DO NOTHING;
