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
  {
    id: 'hp-omen-16',
    name: 'HP OMEN Transcend 16',
    brand: 'HP',
    category: 'Laptops',
    price: 159999,
    rating: 4.7,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600',
    description: 'Sleek, powerful high-refresh-rate gaming excellence. Built with magnesium-aluminum alloy and Tempest Cooling technology.',
    specs: {
      processor: 'Intel Core i9-14900HX (24 Cores, up to 5.8GHz)',
      ram: '32GB DDR5 5600MHz',
      storage: '2TB PCIe Gen4 SSD',
      gpu: 'NVIDIA GeForce RTX 4070 (8GB GDDR6)',
      screen: '16" WQXGA (2560 x 1600) IPS 240Hz, G-Sync',
      features: ['RGB backlit keyboard (4-zone)', 'Omen Tempest Cooling 4.0', 'DTS:X Ultra Audio', '97Wh battery']
    }
  },
  {
    id: 'hp-laserjet-pro',
    name: 'HP LaserJet Pro MFP 4101fdw',
    brand: 'HP',
    category: 'Printers',
    price: 41500,
    originalPrice: 45500,
    rating: 4.6,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=600',
    isPromo: true,
    promoText: 'Business Promo',
    description: 'Fast, high-fidelity wireless black-and-white printing built for medium-sized teams and corporate offices with secure remote cloud management.',
    specs: {
      printSpeed: 'Up to 42 ppm (Monochrome)',
      connectivity: 'Dual-band Wi-Fi, Ethernet, USB 2.0, Bluetooth LE',
      features: ['Automatic double-sided printing', 'HP Wolf Pro Security integrated', '50-sheet Auto Document Feeder', 'Smart App cloud print scan']
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
  {
    id: 'lenovo-legion-pro-7',
    name: 'Lenovo Legion Pro 7i Gen 9',
    brand: 'Lenovo',
    category: 'Laptops',
    price: 209999,
    originalPrice: 224999,
    rating: 4.9,
    reviewsCount: 114,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600',
    isPromo: true,
    promoText: '₹15,000 Cashback',
    description: 'Uncompromising esport dominance. Harness the peak of performance with Lenovo AI Engine+ to dynamically optimize CPU and GPU limits.',
    specs: {
      processor: 'Intel Core i9-14900HX (24 Cores, up to 5.8GHz)',
      ram: '32GB Dual-Channel DDR5',
      storage: '2TB PCIe Gen4 Performance SSD (RAID 0 ready)',
      gpu: 'NVIDIA GeForce RTX 4080 (12GB GDDR6, 175W TGP)',
      screen: '16" WQXGA (2560 x 1600) IPS 240Hz, HDR 400',
      features: ['Legion Coldfront 5.0 liquid cooling', 'Per-key RGB steelseries engine', 'Nahimic 3D Gaming audio', 'Super Rapid Charge Pro']
    }
  },
  {
    id: 'lenovo-ideacentre-aio',
    name: 'Lenovo IdeaCentre AIO 5i',
    brand: 'Lenovo',
    category: 'Desktops',
    price: 87999,
    rating: 4.5,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600',
    description: 'Elegant home and office All-In-One centerpiece. High-contrast borderless display, integrated mobile charging pad, and clean slide-up web-cam.',
    specs: {
      processor: 'Intel Core i7-13700H (14 Cores, up to 5.0GHz)',
      ram: '16GB DDR5 5200MHz',
      storage: '512GB NVMe M.2 SSD',
      gpu: 'Intel Iris Xe Graphics',
      screen: '27" QHD (2560 x 1440) IPS 350 nits',
      features: ['Wireless QI charging built into stand', 'JBL Certified Stereo Audio', 'Integrated pop-up 5MP camera', 'HDMI In/Out ports']
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
  {
    id: 'asus-zenbook-duo',
    name: 'ASUS Zenbook DUO (2024)',
    brand: 'ASUS',
    category: 'Laptops',
    price: 174999,
    rating: 4.9,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
    isNew: true,
    description: 'Revolutionary dual 14-inch OLED screens. Multitask seamlessly using a detachable magnetic Bluetooth keyboard and built-in kickstand design.',
    specs: {
      processor: 'Intel Core Ultra 9 185H (16 Cores, up to 5.1GHz)',
      ram: '32GB LPDDR5X',
      storage: '2TB NVMe Gen4 SSD',
      gpu: 'Intel Arc Graphics',
      screen: 'Dual 14" 3K (2880 x 1800) OLED 120Hz Touchscreens',
      features: ['Dual Screen laptop multitasking', 'Detachable wireless backlit keyboard', 'ASUS Pen 2.0 stylus support', 'Harman Kardon Atmos Speakers']
    }
  },
  {
    id: 'asus-proart-desktop',
    name: 'ASUS ProArt Station PD5',
    brand: 'ASUS',
    category: 'Desktops',
    price: 182999,
    originalPrice: 199999,
    rating: 4.7,
    reviewsCount: 32,
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=600',
    isPromo: true,
    promoText: 'Creator Pack Included',
    description: 'Engineered for video editing, 3D modeling, and render clusters. Dynamic LED indicators on case show active rendering workloads instantly.',
    specs: {
      processor: 'Intel Core i7-13700 (16 Cores, up to 5.2GHz)',
      ram: '64GB DDR5 4800MHz',
      storage: '2TB PCIe Gen4 SSD + 2TB HDD 7200RPM',
      gpu: 'NVIDIA GeForce RTX 4070 Ti (12GB GDDR6X)',
      features: ['ProArt LUMI LED Smart Indicators', 'ISV Certification for Adobe/Autodesk', 'Integrated carry handle in frame design', 'Gold-rated 80+ Power Supply']
    }
  },

  // --- ACER ---
  {
    id: 'acer-predator-helios-16',
    name: 'Acer Predator Helios 16',
    brand: 'Acer',
    category: 'Laptops',
    price: 141999,
    originalPrice: 157999,
    rating: 4.6,
    reviewsCount: 178,
    image: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&q=80&w=600',
    isPromo: true,
    promoText: '₹16,000 Discount',
    description: 'Immersive gameplay powered by Acer 5th Gen AeroBlade 3D fan technology. Liquid metal cooling interface delivers stable thermal limits.',
    specs: {
      processor: 'Intel Core i7-13700HX (16 Cores, up to 5.0GHz)',
      ram: '16GB DDR5 4800MHz',
      storage: '1TB NVMe Gen4 SSD',
      gpu: 'NVIDIA GeForce RTX 4070 (8GB, 140W max TGP)',
      screen: '16" WQXGA IPS 240Hz, G-Sync compatible',
      features: ['5th Gen AeroBlade 3D Cooling fans', 'PredatorSense control cockpit app', 'Neon glow logo ambient RGB bar', 'Killer DoubleShot Pro Wi-Fi']
    }
  },
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
  },

  // --- ACCESSORIES ---
  {
    id: 'hp-950-soundbar',
    name: 'HP Elite Speaker & Sound System',
    brand: 'HP',
    category: 'Accessories',
    price: 12499,
    rating: 4.4,
    reviewsCount: 55,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=600',
    description: 'Premium mountable desk audio soundbar with crystal-clear vocal profile tuning and dedicated teleconferencing controls.',
    specs: {
      features: ['Dual deep woofer sound profile', 'Plug and play USB-C connectivity', 'Dedicated Teams / mute touch keys', 'Hi-Res Stereo Surround audio']
    }
  },
  {
    id: 'asus-rog-harpe',
    name: 'ASUS ROG Harpe Ace Aim Lab Edition',
    brand: 'ASUS',
    category: 'Accessories',
    price: 10999,
    rating: 4.8,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=600',
    description: 'Co-developed with esports legends. Ultra light-weight 54g design configured with the ROG AimPoint optical sensor for perfect accuracy.',
    specs: {
      features: [' ROG AimPoint 36,000 DPI Optical Sensor', '54g Ultra Lightweight frame', 'ROG Speed智能Wireless Tech', 'Aim Lab software tuning suite']
    }
  },
  {
    id: 'lenovo-legion-k500',
    name: 'Lenovo Legion K500 Mechanical Keyboard',
    brand: 'Lenovo',
    category: 'Accessories',
    price: 7999,
    rating: 4.6,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33faf9c1?auto=format&fit=crop&q=80&w=600',
    description: 'Minimum layout footprint meeting tactile gaming responsiveness. Outfitted with high-durability red mechanical switches.',
    specs: {
      features: ['Red Mechanical Switches (50M keystrokes)', 'Detachable texturized palm support', 'Full per-key RGB backlight profiling', 'Dedicated multimedia sound controls']
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
    lng: 81.840215
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
