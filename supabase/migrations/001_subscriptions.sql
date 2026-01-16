CREATE TABLE IF NOT EXISTS plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  interval TEXT NOT NULL CHECK (interval IN ('month', 'year')),
  features JSONB NOT NULL DEFAULT '{}',
  stripe_price_id TEXT UNIQUE,
  stripe_product_id TEXT,
  active BOOLEAN DEFAULT true,
  popular BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT REFERENCES plans(id),
  stripe_customer_id TEXT UNIQUE NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  stripe_payment_method_id TEXT,
  status TEXT NOT NULL CHECK (
    status IN ('active', 'canceled', 'past_due', 'unpaid', 'trialing', 'incomplete')
  ),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  canceled_at TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  messages_count INTEGER DEFAULT 0,
  searches_count INTEGER DEFAULT 0,
  file_uploads_count INTEGER DEFAULT 0,
  api_calls_count INTEGER DEFAULT 0,
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, period_start)
);

CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  stripe_invoice_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL,
  invoice_pdf TEXT,
  period_start TIMESTAMP WITH TIME ZONE,
  period_end TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_period_end ON subscriptions(current_period_end);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_usage_user_id ON usage(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_period ON usage(user_id, period_start, period_end);

CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at DESC);

CREATE OR REPLACE FUNCTION check_user_limit(
  p_user_id UUID,
  p_limit_type TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_plan_limit INTEGER;
  v_current_usage INTEGER;
  v_subscription RECORD;
BEGIN
  SELECT s.*, p.features 
  INTO v_subscription
  FROM subscriptions s
  JOIN plans p ON s.plan_id = p.id
  WHERE s.user_id = p_user_id 
  AND s.status = 'active'
  LIMIT 1;
  
  IF NOT FOUND THEN
    IF p_limit_type = 'messages' THEN
      v_plan_limit := 20;
    ELSE
      RETURN false;
    END IF;
  ELSE
    v_plan_limit := (v_subscription.features->>p_limit_type)::INTEGER;
  END IF;
  
  SELECT COALESCE(SUM(messages_count), 0)
  INTO v_current_usage
  FROM usage
  WHERE user_id = p_user_id
  AND period_start >= CURRENT_DATE;
  
  RETURN v_current_usage < v_plan_limit;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_usage(
  p_user_id UUID,
  p_type TEXT,
  p_count INTEGER DEFAULT 1
) RETURNS VOID AS $$
BEGIN
  INSERT INTO usage (
    user_id,
    period_start,
    period_end,
    messages_count,
    searches_count,
    file_uploads_count,
    api_calls_count
  ) VALUES (
    p_user_id,
    DATE_TRUNC('day', NOW()),
    DATE_TRUNC('day', NOW()) + INTERVAL '1 day',
    CASE WHEN p_type = 'message' THEN p_count ELSE 0 END,
    CASE WHEN p_type = 'search' THEN p_count ELSE 0 END,
    CASE WHEN p_type = 'file' THEN p_count ELSE 0 END,
    CASE WHEN p_type = 'api' THEN p_count ELSE 0 END
  )
  ON CONFLICT (user_id, period_start) 
  DO UPDATE SET
    messages_count = usage.messages_count + 
      CASE WHEN p_type = 'message' THEN p_count ELSE 0 END,
    searches_count = usage.searches_count + 
      CASE WHEN p_type = 'search' THEN p_count ELSE 0 END,
    file_uploads_count = usage.file_uploads_count + 
      CASE WHEN p_type = 'file' THEN p_count ELSE 0 END,
    api_calls_count = usage.api_calls_count + 
      CASE WHEN p_type = 'api' THEN p_count ELSE 0 END,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

INSERT INTO plans (id, name, description, price, interval, features, active, popular, sort_order)
VALUES 
  ('free', 'Free', 'Get started with basic features', 0, 'month', 
   '{"models": ["gpt-4o-mini"], "web_search": false, "file_upload": false, "api_access": false, "priority_support": false, "messages_per_month": 20, "searches_per_day": 0, "max_file_size_mb": 0}', 
   true, false, 0),
  ('starter', 'Starter', 'Perfect for personal use', 4.99, 'month', 
   '{"models": ["gpt-4o", "claude-sonnet"], "web_search": true, "file_upload": true, "api_access": false, "priority_support": false, "messages_per_month": 500, "searches_per_day": null, "max_file_size_mb": 10}', 
   true, false, 1),
  ('pro', 'Pro', 'Best for professionals', 9.99, 'month', 
   '{"models": ["gpt-4", "claude-opus", "gemini-pro", "grok"], "web_search": true, "file_upload": true, "api_access": true, "priority_support": true, "messages_per_month": null, "searches_per_day": null, "max_file_size_mb": 50}', 
   true, true, 2),
  ('business', 'Business', 'For teams and enterprises', 29.99, 'month', 
   '{"models": ["gpt-4", "claude-opus", "gemini-pro", "grok"], "web_search": true, "file_upload": true, "api_access": true, "priority_support": true, "messages_per_month": null, "searches_per_day": null, "max_file_size_mb": 100}', 
   true, false, 3)
ON CONFLICT (id) DO NOTHING;
