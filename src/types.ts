export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  name: string;
  category: 'treats' | 'collars' | 'beds' | 'toys' | 'crates' | 'grooming';
  petType: 'dog' | 'cat' | 'all';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  description: string;
  features: string[];
  ingredients?: string[];
  materials?: string[];
  inStock: boolean;
  isFeatured?: boolean;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  weight?: string;
  benefits?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  purchaseType: 'one-time' | 'subscription';
  subscriptionFrequency?: '2-weeks' | '4-weeks' | '6-weeks' | '8-weeks';
}

export interface Review {
  id: string;
  author: string;
  petName: string;
  petBreed: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  photoUrl?: string;
  helpfulCount: number;
}

export interface PetProfile {
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed: string;
  age: string;
  weight: string;
  activityLevel: 'low' | 'moderate' | 'high';
  dietaryNeeds: string[];
  healthGoals: string[];
}

export interface AiRecommendation {
  summary: string;
  dailyRoutine: {
    morning: string;
    afternoon: string;
    evening: string;
  };
  recommendedProductIds: string[];
  dietaryTip: string;
  treatPortionGuide: string;
}

export interface OrderDetails {
  id: string;
  items: CartItem[];
  customer: {
    fullName: string;
    email: string;
    phone: string;
    petName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingMethod: {
    id: string;
    name: string;
    price: number;
    estimatedDays: string;
  };
  paymentMethod: {
    type: 'card' | 'apple-pay' | 'google-pay' | 'paypal' | 'klarna';
    lastFour?: string;
    cardBrand?: string;
  };
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
  status: 'confirmed' | 'packing' | 'shipped' | 'delivered';
  trackingNumber: string;
}
