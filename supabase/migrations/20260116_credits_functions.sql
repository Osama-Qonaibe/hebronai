-- ============================================
-- CREDITS MANAGEMENT FUNCTIONS
-- ============================================

-- Function to increment used credits
CREATE OR REPLACE FUNCTION increment_used_credits(
  user_id UUID,
  amount INTEGER
)
RETURNS VOID AS $$
BEGIN
  UPDATE public.user_credits
  SET 
    used_credits = used_credits + amount,
    updated_at = NOW()
  WHERE user_credits.user_id = increment_used_credits.user_id;
  
  -- Create row if doesn't exist
  IF NOT FOUND THEN
    INSERT INTO public.user_credits (user_id, total_credits, used_credits)
    VALUES (increment_used_credits.user_id, 100, amount);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check available credits
CREATE OR REPLACE FUNCTION get_available_credits(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  available INTEGER;
BEGIN
  SELECT (total_credits - used_credits) INTO available
  FROM public.user_credits
  WHERE user_credits.user_id = get_available_credits.user_id;
  
  -- Return 0 if no record found
  RETURN COALESCE(available, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset credits (monthly)
CREATE OR REPLACE FUNCTION reset_user_credits(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.user_credits
  SET 
    used_credits = 0,
    last_reset_at = NOW(),
    updated_at = NOW()
  WHERE user_credits.user_id = reset_user_credits.user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add bonus credits
CREATE OR REPLACE FUNCTION add_bonus_credits(
  user_id UUID,
  amount INTEGER
)
RETURNS VOID AS $$
BEGIN
  UPDATE public.user_credits
  SET 
    total_credits = total_credits + amount,
    updated_at = NOW()
  WHERE user_credits.user_id = add_bonus_credits.user_id;
  
  IF NOT FOUND THEN
    INSERT INTO public.user_credits (user_id, total_credits, used_credits)
    VALUES (add_bonus_credits.user_id, 100 + amount, 0);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
