-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users safely)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table (updated by Stripe Webhooks)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  status TEXT DEFAULT 'active',
  current_period_end TIMESTAMP WITH TIME ZONE
);

-- Pets table
CREATE TABLE IF NOT EXISTS public.pets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  species TEXT NOT NULL CHECK (species IN ('dog', 'cat', 'other')),
  breed TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'unknown')),
  birth_date DATE,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Health Logs table
CREATE TABLE IF NOT EXISTS public.health_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  weight_kg NUMERIC(5,2),
  meal_amount_grams INTEGER,
  water_ml INTEGER,
  symptoms TEXT[],
  activity_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vaccines table
CREATE TABLE IF NOT EXISTS public.vaccines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  date_administered DATE NOT NULL,
  next_due_date DATE,
  provider TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaccines ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own data
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Subscriptions RLS
CREATE POLICY "Users can view own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Pets RLS
CREATE POLICY "Users can view own pets" ON public.pets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pets" ON public.pets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pets" ON public.pets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own pets" ON public.pets FOR DELETE USING (auth.uid() = user_id);

-- Health Logs (accessible if user owns the pet)
CREATE POLICY "Users can view own pet logs" ON public.health_logs FOR SELECT USING (
  pet_id IN (SELECT id FROM public.pets WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert pet logs" ON public.health_logs FOR INSERT WITH CHECK (
  pet_id IN (SELECT id FROM public.pets WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update pet logs" ON public.health_logs FOR UPDATE USING (
  pet_id IN (SELECT id FROM public.pets WHERE user_id = auth.uid())
);
CREATE POLICY "Users can delete pet logs" ON public.health_logs FOR DELETE USING (
  pet_id IN (SELECT id FROM public.pets WHERE user_id = auth.uid())
);

-- Vaccines RLS (same logic as Health Logs)
CREATE POLICY "Users can view own pet vaccines" ON public.vaccines FOR SELECT USING (
  pet_id IN (SELECT id FROM public.pets WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert pet vaccines" ON public.vaccines FOR INSERT WITH CHECK (
  pet_id IN (SELECT id FROM public.pets WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update pet vaccines" ON public.vaccines FOR UPDATE USING (
  pet_id IN (SELECT id FROM public.pets WHERE user_id = auth.uid())
);
CREATE POLICY "Users can delete pet vaccines" ON public.vaccines FOR DELETE USING (
  pet_id IN (SELECT id FROM public.pets WHERE user_id = auth.uid())
);
