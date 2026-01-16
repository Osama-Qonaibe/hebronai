-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- GENERATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'audio', 'video', 'webapp')),
  prompt TEXT NOT NULL,
  result_url TEXT,
  metadata JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error TEXT,
  credits_used INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_generations_user_id ON public.generations(user_id);
CREATE INDEX idx_generations_type ON public.generations(type);
CREATE INDEX idx_generations_status ON public.generations(status);
CREATE INDEX idx_generations_created_at ON public.generations(created_at DESC);

-- ============================================
-- FINANCE QUERIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.finance_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_type TEXT NOT NULL CHECK (tool_type IN ('crypto', 'stocks', 'currency', 'calculator')),
  query_params JSONB NOT NULL,
  result_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_finance_user_id ON public.finance_queries(user_id);
CREATE INDEX idx_finance_tool_type ON public.finance_queries(tool_type);
CREATE INDEX idx_finance_created_at ON public.finance_queries(created_at DESC);

-- ============================================
-- DESIGN REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.design_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_type TEXT NOT NULL CHECK (tool_type IN ('canva', 'figma', 'screenshot', 'logo')),
  input_data JSONB NOT NULL,
  output_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_design_user_id ON public.design_requests(user_id);
CREATE INDEX idx_design_tool_type ON public.design_requests(tool_type);
CREATE INDEX idx_design_status ON public.design_requests(status);

-- ============================================
-- DEV TASKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.dev_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_type TEXT NOT NULL CHECK (tool_type IN ('github', 'gmail', 'api', 'deploy')),
  task_data JSONB NOT NULL,
  result JSONB,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_dev_user_id ON public.dev_tasks(user_id);
CREATE INDEX idx_dev_tool_type ON public.dev_tasks(tool_type);
CREATE INDEX idx_dev_status ON public.dev_tasks(status);

-- ============================================
-- USER CREDITS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_credits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_credits INTEGER DEFAULT 100,
  used_credits INTEGER DEFAULT 0,
  last_reset_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS POLICIES
-- ============================================

-- Generations policies
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generations"
  ON public.generations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations"
  ON public.generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own generations"
  ON public.generations FOR UPDATE
  USING (auth.uid() = user_id);

-- Finance queries policies
ALTER TABLE public.finance_queries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own finance queries"
  ON public.finance_queries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own finance queries"
  ON public.finance_queries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Design requests policies
ALTER TABLE public.design_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own design requests"
  ON public.design_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own design requests"
  ON public.design_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own design requests"
  ON public.design_requests FOR UPDATE
  USING (auth.uid() = user_id);

-- Dev tasks policies
ALTER TABLE public.dev_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own dev tasks"
  ON public.dev_tasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own dev tasks"
  ON public.dev_tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own dev tasks"
  ON public.dev_tasks FOR UPDATE
  USING (auth.uid() = user_id);

-- User credits policies
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own credits"
  ON public.user_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own credits"
  ON public.user_credits FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_generations_updated_at
  BEFORE UPDATE ON public.generations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_design_requests_updated_at
  BEFORE UPDATE ON public.design_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dev_tasks_updated_at
  BEFORE UPDATE ON public.dev_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_credits_updated_at
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create user credits on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, total_credits, used_credits)
  VALUES (NEW.id, 100, 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create storage buckets (run this in Supabase SQL Editor)
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('generations', 'generations', true),
  ('designs', 'designs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload to generations bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'generations' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own files in generations bucket"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'generations' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload to designs bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'designs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own files in designs bucket"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'designs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
