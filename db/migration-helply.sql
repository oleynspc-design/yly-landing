-- Helply & Prompt Library & Progress & Notes migration

-- User progress tracking per module/lesson
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

-- User notes per lesson
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

-- Homework submissions
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

-- Prompt library
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

-- Prompt likes (prevent double-likes)
CREATE TABLE IF NOT EXISTS prompt_likes (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES prompt_library(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY(user_id, prompt_id)
);

-- Helply conversation history (per module)
CREATE TABLE IF NOT EXISTS helply_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_slug TEXT,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS user_progress_user_idx ON user_progress(user_id, module_slug);
CREATE INDEX IF NOT EXISTS user_notes_user_idx ON user_notes(user_id, module_slug);
CREATE INDEX IF NOT EXISTS homework_user_idx ON homework_submissions(user_id, module_slug);
CREATE INDEX IF NOT EXISTS prompt_library_public_idx ON prompt_library(is_public, created_at DESC);
CREATE INDEX IF NOT EXISTS prompt_library_user_idx ON prompt_library(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS helply_conv_user_idx ON helply_conversations(user_id, module_slug, created_at);
