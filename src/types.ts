export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  collection: string;
  tags: string[];
  img: string;
}

export interface Collection {
  slug: string;
  title: string;
  desc: string;
  img: string;
  badge?: string | null;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  perks: string[];
  featured?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  purchases: number[]; // Array of book IDs
}
