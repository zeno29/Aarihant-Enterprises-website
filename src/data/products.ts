import { Product, StoreLocation } from '../types';

export const PRODUCTS: Product[] = [
  // --- HP ---
  {
    id: 'hp-spectre-x360',
    name: 'HP Spectre x360 2-in-1',
    brand: 'HP',
    category: 'Laptops',
    price: 114999,
    originalPrice: 129999,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600',
    isNew: true,
    isPromo: true,
    promoText: 'Save ₹15,000',
    description: 'Immersive premium convertible laptop with OLED stunning touch display, auto-framing AI camera, and state-of-the-art Intel Core Ultra processors.',
    specs: {
      processor: 'Intel Core Ultra 7 155H (16 Cores, up to 4.8GHz)',
      ram: '32GB LPDDR5x (Dual Channel)',
      storage: '1TB PCIe Gen4 NVMe SSD',
      gpu: 'Intel Arc Graphics',
      screen: '14" 2.8K (2880 x 1800) OLED Touchscreen, 120Hz',
      features: ['HP Tilt Pen included', 'Quad Speakers by Poly Studio', 'Wi-Fi 7 Ready', '9.0MP AI IR Camera']
    }
  },

  // --- LENOVO ---
  {
    id: 'lenovo-thinkpad-x1',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    category: 'Laptops',
    price: 139999,
    rating: 4.9,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=600',
    isNew: true,
    description: 'The ultimate business standard. Featherlight carbon-fiber chassis, legendary spill-resistant tactile keyboard, and unparalleled cybersecurity arrays.',
    specs: {
      processor: 'Intel Core Ultra 7 165U vPro (12 Cores, up to 4.9GHz)',
      ram: '32GB LPDDR5x',
      storage: '1TB PCIe Gen4 Performance SSD',
      gpu: 'Intel Graphics',
      screen: '14" WUXGA (1920 x 1200) IPS Anti-glare Touch, 400 nits',
      features: ['vPro Secure Hardware Shield', 'Legendary TrackPoint Red node', 'Spill-resistant backlit keyboard', 'MIL-SPEC 810H certified']
    }
  },

  // --- ASUS ---
  {
    id: 'asus-rog-zephyrus-g14',
    name: 'ASUS ROG Zephyrus G14 OLED',
    brand: 'ASUS',
    category: 'Laptops',
    price: 132999,
    rating: 4.8,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600',
    isNew: true,
    description: 'Sleek premium architectural chassis with AniMe Matrix animation lid. G-Sync ROG Nebula OLED display creating cinematic vivid game rendering.',
    specs: {
      processor: 'AMD Ryzen 9 8945HS (8 Cores / 16 Threads, up to 5.2GHz)',
      ram: '32GB LPDDR5X 6400MHz',
      storage: '1TB PCIe Gen4 SSD',
      gpu: 'NVIDIA GeForce RTX 4060 (8GB, Premium Tech Tuning)',
      screen: '14" 3K (2880 x 1800) OLED 120Hz, Dolby Vision',
      features: ['Nebula HDR certified matrix display', 'Tri-Fan advanced layout tech', 'Hi-Res certified audio suite', 'Full aluminium frame (1.5kg)']
    }
  },

  // --- ACER ---
  {
    id: 'acer-swift-go-14',
    name: 'Acer Swift Go 14 OLED',
    brand: 'Acer',
    category: 'Laptops',
    price: 69999,
    rating: 4.5,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=600',
    isNew: true,
    description: 'Lightweight everyday multi-tool. Stunning 90Hz OLED aspect-ratio design that enhances screen-to-body reading layout efficiency.',
    specs: {
      processor: 'Intel Core i5-13500H (12 Cores, up to 4.7GHz)',
      ram: '16GB LPDDR5 4800MHz',
      storage: '512GB PCIe NVMe SSD',
      gpu: 'Intel Iris Xe Graphics',
      screen: '14" 2.8K (2880 x 1800) OLED 90Hz panel',
      features: ['QHD 1440p camera with AI noise reduction', 'Eco-friendly OceanGlass Trackpad', 'Wi-Fi 6E connectivity', 'Lightweight 1.25kg chassis']
    }
  }
];

export const LOCATIONS: StoreLocation[] = [
  {
    id: 'prayagraj-tashkand',
    name: 'HP World - Tashkand Marg',
    address: 'LG3, Vashistha Vinayak Tower, Tashkent Marg, Civil Lines, Prayagraj, Uttar Pradesh 211001, India',
    phone: '+91 7234991010',
    hours: 'Mon-Sun: 10:00 AM - 8:00 PM',
    email: 'tashkand.prayagraj@hpworldstores.in',
    coordinates: { x: 52, y: 43 },
    lat: 25.449712,
    lng: 81.840215,
    mapUrl: 'https://maps.app.goo.gl/aL61j3RPyY9gWc5g7'
  },
  {
    id: 'prayagraj-asus',
    name: 'Computer Castle - ASUS Store',
    address: 'Shop no 2, LDA Centre, Nawab Yusuf Rd, behind Mahindra Showroom, Civil Lines, Prayagraj, Uttar Pradesh 211001, India',
    phone: '+91 7007463636',
    hours: 'Mon-Sun: 11:00 AM - 8:00 PM',
    email: 'prayagraj@computercastle.co.in',
    coordinates: { x: 50, y: 46 },
    lat: 25.451842,
    lng: 81.832962
  },
  {
    id: 'prayagraj-lenovo',
    name: 'Lenovo Exclusive Store - Tushar Infotech',
    address: '124E/20/L L.G-7 M.G Marg Vinayak Tower, opp. Coffee House, Civil Lines, Prayagraj, Uttar Pradesh 211001, India',
    phone: '+91 7991497077',
    hours: 'Mon-Sun: 10:30 AM - 9:00 PM',
    email: 'tushar.prayagraj@lenovostores.in',
    coordinates: { x: 54, y: 41 },
    lat: 25.451011,
    lng: 81.838318
  },
  {
    id: 'prayagraj-acer',
    name: 'Acer Mall - Exclusive Store',
    address: '124E/20/G-3, M.G Marg, Vinayak Tower (Opp. Coffee House), Civil Lines, Prayagraj (Allahabad), Uttar Pradesh, 211001',
    phone: '+91 8853010224',
    hours: 'Mon-Sun: 11:00 AM - 8:30 PM',
    email: 'prayagraj.acer@acermallstores.in',
    coordinates: { x: 55, y: 39 },
    lat: 25.451050,
    lng: 81.838350
  }
];
