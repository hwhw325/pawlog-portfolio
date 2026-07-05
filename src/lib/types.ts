export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan: 'free' | 'pro';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  current_period_end: string;
};

export type Pet = {
  id: string;
  user_id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed: string | null;
  gender: 'male' | 'female' | 'unknown';
  birth_date: string | null;
  photo_url: string | null;
  created_at: string;
};

export type HealthLog = {
  id: string;
  pet_id: string;
  date: string;
  weight_kg: number | null;
  meal_amount_grams: number | null;
  water_ml: number | null;
  symptoms: string[];
  activity_notes: string | null;
  created_at: string;
};

export type Vaccine = {
  id: string;
  pet_id: string;
  name: string;
  date_administered: string;
  next_due_date: string | null;
  provider: string | null;
  created_at: string;
};
