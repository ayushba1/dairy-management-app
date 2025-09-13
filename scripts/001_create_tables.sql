-- Create farmers table for user profiles
CREATE TABLE IF NOT EXISTS public.farmers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create milk transactions table
CREATE TABLE IF NOT EXISTS public.milk_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES public.farmers(id) ON DELETE CASCADE,
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  quantity_liters DECIMAL(10,2) NOT NULL CHECK (quantity_liters > 0),
  fat_percentage DECIMAL(4,2) NOT NULL CHECK (fat_percentage >= 0 AND fat_percentage <= 100),
  snf_percentage DECIMAL(4,2) NOT NULL CHECK (snf_percentage >= 0 AND snf_percentage <= 100),
  rate_per_liter DECIMAL(8,2) NOT NULL CHECK (rate_per_liter > 0),
  total_amount DECIMAL(10,2) GENERATED ALWAYS AS (quantity_liters * rate_per_liter) STORED,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('buy', 'sell')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create monthly payments table
CREATE TABLE IF NOT EXISTS public.monthly_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES public.farmers(id) ON DELETE CASCADE,
  payment_month DATE NOT NULL, -- First day of the month
  total_quantity DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid')),
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(farmer_id, payment_month)
);

-- Enable Row Level Security
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milk_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for farmers table
CREATE POLICY "farmers_select_own" ON public.farmers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "farmers_insert_own" ON public.farmers FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "farmers_update_own" ON public.farmers FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for milk_transactions table
CREATE POLICY "transactions_select_own" ON public.milk_transactions FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "transactions_insert_own" ON public.milk_transactions FOR INSERT WITH CHECK (auth.uid() = farmer_id);
CREATE POLICY "transactions_update_own" ON public.milk_transactions FOR UPDATE USING (auth.uid() = farmer_id);

-- RLS Policies for monthly_payments table
CREATE POLICY "payments_select_own" ON public.monthly_payments FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "payments_insert_own" ON public.monthly_payments FOR INSERT WITH CHECK (auth.uid() = farmer_id);
CREATE POLICY "payments_update_own" ON public.monthly_payments FOR UPDATE USING (auth.uid() = farmer_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_milk_transactions_farmer_date ON public.milk_transactions(farmer_id, transaction_date);
CREATE INDEX IF NOT EXISTS idx_monthly_payments_farmer_month ON public.monthly_payments(farmer_id, payment_month);
