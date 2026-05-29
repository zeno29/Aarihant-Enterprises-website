export type Brand = 'HP' | 'Lenovo' | 'ASUS' | 'Acer';
export type Category = 'Laptops' | 'Desktops' | 'Printers' | 'Accessories';

export interface ProductSpec {
  processor?: string;
  ram?: string;
  storage?: string;
  gpu?: string;
  screen?: string;
  connectivity?: string;
  printSpeed?: string;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isNew?: boolean;
  isPromo?: boolean;
  promoText?: string;
  description: string;
  specs: ProductSpec;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  email: string;
  coordinates: { x: number; y: number }; // Simulated coordinate offsets for fallback
  lat?: number;
  lng?: number;
}
