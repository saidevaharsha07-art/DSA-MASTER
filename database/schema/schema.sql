-- ==============================================================================
-- DSA MAGNA PRODUCTION DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Target Engine: PostgreSQL 15+ / Supabase
-- RLS Enforcement: Mandatory on all user tables (auth.uid() = user_id)
-- Multi-Tenant Isolation: Complete strict data separation per learner
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS & PROFILES TABLE (1:1 with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    email TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PROGRESS TABLE (1:1 with Auth User)
CREATE TABLE IF NOT EXISTS public.progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
    level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1),
    current_streak INTEGER NOT NULL DEFAULT 0 CHECK (current_streak >= 0),
    longest_streak INTEGER NOT NULL DEFAULT 0 CHECK (longest_streak >= 0),
    daily_goal INTEGER NOT NULL DEFAULT 3 CHECK (daily_goal >= 1),
    completed_problem_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    completed_legacy_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    favorites JSONB NOT NULL DEFAULT '[]'::jsonb,
    notes JSONB NOT NULL DEFAULT '{}'::jsonb,
    last_active_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_progress UNIQUE (user_id)
);

-- 4. SUBMISSIONS TABLE (1:N with Auth User)
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_id TEXT NOT NULL,
    platform TEXT NOT NULL DEFAULT 'leetcode',
    language TEXT NOT NULL,
    verdict TEXT NOT NULL CHECK (verdict IN ('Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Compilation Error', 'Compile Error', 'Runtime Error', 'Memory Limit Exceeded')),
    runtime_ms INTEGER NOT NULL DEFAULT 0,
    memory_mb NUMERIC(6, 2) NOT NULL DEFAULT 0.0,
    testcases_passed INTEGER NOT NULL DEFAULT 0,
    testcases_total INTEGER NOT NULL DEFAULT 0,
    xp_earned INTEGER NOT NULL DEFAULT 0,
    code_snapshot TEXT NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_user_problem ON public.submissions (user_id, problem_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user_submitted ON public.submissions (user_id, submitted_at DESC);

-- 5. CODE DRAFTS TABLE (1:N with Auth User per problem and language)
CREATE TABLE IF NOT EXISTS public.drafts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_id TEXT NOT NULL,
    language TEXT NOT NULL,
    code TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_problem_language_draft UNIQUE (user_id, problem_id, language)
);

-- 6. ACTIVITIES TABLE (Append-only audit log)
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    problem_id TEXT,
    platform TEXT DEFAULT 'leetcode',
    xp_earned INTEGER DEFAULT 0,
    duration_seconds INTEGER DEFAULT 0,
    topic TEXT,
    pattern TEXT,
    difficulty TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_user_timestamp ON public.activities (user_id, timestamp DESC);

-- 7. MEMORY & SRS PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.memory_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    concept_id TEXT NOT NULL,
    topic TEXT DEFAULT 'General',
    pattern TEXT DEFAULT 'Basic',
    state TEXT DEFAULT 'New',
    mastery_score NUMERIC(5, 2) DEFAULT 0.0,
    memory_strength NUMERIC(5, 2) DEFAULT 0.0,
    stability_score NUMERIC(6, 3) DEFAULT 1.0,
    retention_rate NUMERIC(5, 2) DEFAULT 80.0,
    forgetting_risk NUMERIC(5, 2) DEFAULT 20.0,
    review_count INTEGER DEFAULT 0,
    successful_reviews INTEGER DEFAULT 0,
    failed_reviews INTEGER DEFAULT 0,
    first_learned TIMESTAMPTZ DEFAULT NOW(),
    last_reviewed TIMESTAMPTZ DEFAULT NOW(),
    next_review TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 day'),
    CONSTRAINT unique_user_concept_memory UNIQUE (user_id, concept_id)
);

-- 8. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    theme TEXT DEFAULT 'light',
    accent_color TEXT DEFAULT '#38BDF8',
    editor_font_size INTEGER DEFAULT 14,
    editor_font_family TEXT DEFAULT 'Consolas',
    editor_word_wrap TEXT DEFAULT 'on',
    editor_minimap BOOLEAN DEFAULT FALSE,
    handles JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_settings UNIQUE (user_id)
);

-- 9. USER ONBOARDING TABLE (1:1 with Auth User)
CREATE TABLE IF NOT EXISTS public.user_onboarding (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'ONBOARDING_NOT_STARTED' CHECK (status IN ('ONBOARDING_NOT_STARTED', 'ONBOARDING_IN_PROGRESS', 'ONBOARDING_COMPLETED', 'ONBOARDING_SKIPPED')),
    current_step INTEGER NOT NULL DEFAULT 1 CHECK (current_step >= 1 AND current_step <= 6),
    self_reported_level TEXT,
    learning_goal TEXT,
    selected_topics JSONB NOT NULL DEFAULT '[]'::jsonb,
    assessment_score INTEGER,
    assessment_evidence JSONB NOT NULL DEFAULT '[]'::jsonb,
    assessment_result JSONB,
    first_mission JSONB,
    completed_at TIMESTAMPTZ,
    skipped_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_onboarding UNIQUE (user_id)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memory_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_onboarding ENABLE ROW LEVEL SECURITY;

-- 1. Profiles RLS
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can delete own profile" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- 2. Progress RLS
CREATE POLICY "Users can view own progress" ON public.progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.progress FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own progress" ON public.progress FOR DELETE USING (auth.uid() = user_id);

-- 3. Submissions RLS
CREATE POLICY "Users can view own submissions" ON public.submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON public.submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own submissions" ON public.submissions FOR DELETE USING (auth.uid() = user_id);

-- 4. Drafts RLS
CREATE POLICY "Users can view own drafts" ON public.drafts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own drafts" ON public.drafts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own drafts" ON public.drafts FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own drafts" ON public.drafts FOR DELETE USING (auth.uid() = user_id);

-- 5. Activities RLS
CREATE POLICY "Users can view own activities" ON public.activities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activities" ON public.activities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own activities" ON public.activities FOR DELETE USING (auth.uid() = user_id);

-- 6. Memory Progress RLS
CREATE POLICY "Users can view own memory progress" ON public.memory_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own memory progress" ON public.memory_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own memory progress" ON public.memory_progress FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own memory progress" ON public.memory_progress FOR DELETE USING (auth.uid() = user_id);

-- 7. Settings RLS
CREATE POLICY "Users can view own settings" ON public.settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own settings" ON public.settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own settings" ON public.settings FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own settings" ON public.settings FOR DELETE USING (auth.uid() = user_id);

-- 8. User Onboarding RLS
CREATE POLICY "Users can view own onboarding" ON public.user_onboarding FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own onboarding" ON public.user_onboarding FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own onboarding" ON public.user_onboarding FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own onboarding" ON public.user_onboarding FOR DELETE USING (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC USER INITIALIZATION TRIGGER
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- 1. Create Profile
    INSERT INTO public.profiles (id, username, display_name, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.email
    )
    ON CONFLICT (id) DO NOTHING;

    -- 2. Initialize Clean Progress (0 Solved, 0 XP, 0 Streak)
    INSERT INTO public.progress (user_id, xp, level, current_streak, longest_streak, daily_goal)
    VALUES (NEW.id, 0, 1, 0, 0, 3)
    ON CONFLICT (user_id) DO NOTHING;

    -- 3. Initialize Default Settings
    INSERT INTO public.settings (user_id, theme, accent_color)
    VALUES (NEW.id, 'light', '#38BDF8')
    ON CONFLICT (user_id) DO NOTHING;

    -- 4. Initialize Clean Onboarding Profile (NOT_STARTED)
    INSERT INTO public.user_onboarding (user_id, status, current_step)
    VALUES (NEW.id, 'ONBOARDING_NOT_STARTED', 1)
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger firing on every new auth.users signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
