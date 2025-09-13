-- Insert sample farmer data (this will be replaced by real signups)
-- Note: This is just for demonstration, real farmers will sign up through the app

-- Sample milk transactions for demonstration
-- These would normally be created through the app interface
INSERT INTO public.milk_transactions (farmer_id, transaction_date, quantity_liters, fat_percentage, snf_percentage, rate_per_liter, transaction_type)
SELECT 
  f.id,
  CURRENT_DATE - INTERVAL '1 day' * (random() * 30)::int,
  (random() * 50 + 10)::decimal(10,2), -- 10-60 liters
  (random() * 2 + 3.5)::decimal(4,2), -- 3.5-5.5% fat
  (random() * 1 + 8.5)::decimal(4,2), -- 8.5-9.5% SNF
  (random() * 10 + 25)::decimal(8,2), -- ₹25-35 per liter
  'sell'
FROM public.farmers f
LIMIT 0; -- Set to 0 since we don't have farmers yet, will be populated after signup
