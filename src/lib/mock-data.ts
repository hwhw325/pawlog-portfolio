import { Pet, HealthLog, Vaccine, Subscription, User } from './types';

// Mock User
export const mockUser: User = {
  id: 'user_mock_123',
  email: 'mockuser@pawlog.app',
  created_at: new Date().toISOString(),
};

// Mock Subscription (Free Plan)
export const mockSubscriptionFree: Subscription = {
  id: 'sub_mock_free',
  user_id: mockUser.id,
  stripe_customer_id: null,
  stripe_subscription_id: null,
  plan: 'free',
  status: 'active',
  current_period_end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
};

// Mock Subscription (Pro Plan)
export const mockSubscriptionPro: Subscription = {
  id: 'sub_mock_pro',
  user_id: mockUser.id,
  stripe_customer_id: 'cus_mock',
  stripe_subscription_id: 'sub_mock',
  plan: 'pro',
  status: 'active',
  current_period_end: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
};

// Mock Pet
export const mockPets: Pet[] = [
  {
    id: 'pet_mock_1',
    user_id: mockUser.id,
    name: 'Max',
    species: 'dog',
    breed: 'Golden Retriever',
    gender: 'male',
    birth_date: '2020-05-14',
    photo_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200&h=200',
    created_at: new Date().toISOString(),
  },
  {
    id: 'pet_mock_2',
    user_id: mockUser.id,
    name: 'Luna',
    species: 'cat',
    breed: 'Siamese',
    gender: 'female',
    birth_date: '2022-08-21',
    photo_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200&h=200',
    created_at: new Date().toISOString(),
  }
];

// Mock Health Logs for Max
export const mockHealthLogs: HealthLog[] = [
  {
    id: 'log_mock_1',
    pet_id: mockPets[0].id,
    date: new Date().toISOString().split('T')[0],
    weight_kg: 32.5,
    meal_amount_grams: 500,
    water_ml: 1200,
    symptoms: ['lethargy'],
    activity_notes: 'Ran in the park for 30 mins, seemed a bit tired afterwards.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'log_mock_2',
    pet_id: mockPets[0].id,
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
    weight_kg: 32.6,
    meal_amount_grams: 550,
    water_ml: 1300,
    symptoms: [],
    activity_notes: 'Normal activity. Played fetch.',
    created_at: new Date().toISOString(),
  }
];

// Mock Vaccines for Max
export const mockVaccines: Vaccine[] = [
  {
    id: 'vac_mock_1',
    pet_id: mockPets[0].id,
    name: 'Rabies',
    date_administered: '2025-10-01',
    next_due_date: '2026-10-01',
    provider: 'Anytown Vet Clinic',
    created_at: new Date().toISOString(),
  },
  {
    id: 'vac_mock_2',
    pet_id: mockPets[0].id,
    name: 'DHPP',
    date_administered: '2025-10-01',
    next_due_date: '2026-10-01',
    provider: 'Anytown Vet Clinic',
    created_at: new Date().toISOString(),
  }
];

// Context Mock setup
export const currentMockState = {
  user: mockUser,
  subscription: mockSubscriptionPro, // Set to Free to test limits
  activePetId: mockPets[0].id,
  pets: mockPets,
  logs: mockHealthLogs,
  vaccines: mockVaccines
};
