/**
 * Comprehensive Catalog of Gifts across all categories
 */

export const POPULAR_CATEGORIES = [
  {
    id: 'cat-all',
    name: 'All Gifts',
    slug: 'all',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80',
    itemCount: '250+ gifts',
    subtitle: 'Browse Complete Collection'
  },
  {
    id: 'cat-1',
    name: 'Personalized Gifts',
    slug: 'personalized-gifts',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80',
    itemCount: '150+ gifts',
    subtitle: 'Custom Name, Photo & Dates'
  },
  {
    id: 'cat-2',
    name: 'Gift Hampers',
    slug: 'gift-hampers',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    itemCount: '90+ hampers',
    subtitle: 'Chocolates, Snacks & Goodies'
  },
  {
    id: 'cat-3',
    name: 'Birthday Gifts',
    slug: 'birthday-gifts',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80',
    itemCount: '120+ gifts',
    subtitle: 'Surprises for Loved Ones'
  },
  {
    id: 'cat-4',
    name: 'Anniversary Gifts',
    slug: 'anniversary-gifts',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    itemCount: '100+ gifts',
    subtitle: 'Romantic Keepsakes & Sets'
  },
  {
    id: 'cat-5',
    name: 'Photo Frames',
    slug: 'photo-frames',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=600&q=80',
    itemCount: '65+ frames',
    subtitle: 'Wooden & Acrylic Frames'
  },
  {
    id: 'cat-6',
    name: 'Flowers & Bouquets',
    slug: 'flowers-bouquets',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
    itemCount: '60+ arrangements',
    subtitle: 'Fresh Roses & Forever Blooms'
  },
  {
    id: 'cat-7',
    name: 'Chocolates & Sweets',
    slug: 'chocolates-sweets',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    itemCount: '50+ boxes',
    subtitle: 'Assorted Truffles & Sweet Boxes'
  },
  {
    id: 'cat-8',
    name: 'Home Decor',
    slug: 'home-decor',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
    itemCount: '80+ items',
    subtitle: 'Scented Candles & Lamps'
  },
  {
    id: 'cat-9',
    name: 'Mugs & Water Bottles',
    slug: 'mugs-bottles',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    itemCount: '70+ styles',
    subtitle: 'Coffee Mugs & Steel Flasks'
  },
  {
    id: 'cat-10',
    name: 'Corporate Gifts',
    slug: 'corporate-gifts',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    itemCount: '55+ kits',
    subtitle: 'Employee & Client Welcome Kits'
  }
];

export const ALL_PRODUCTS = [
  // Personalized Gifts
  // 1. Personalized Keepsake Box
  {
    id: 'prod-1',
    name: 'Personalized Wooden Keepsake Box with Custom Name',
    subtitle: 'Engraved with your custom names, anniversary date & free message card',
    sku: 'GS-BOX-01',
    category: 'Personalized Gifts',
    categorySlug: 'personalized-gifts',
    price: 1499,
    originalPrice: 2199,
    discount: 32,
    rating: 4.9,
    reviewsCount: 184,
    primaryImage: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    tag: 'Best Seller',
    isPersonalizable: true,
    material: 'Natural Teak Wood',
    inStock: true,
    isFeatured: true
  },
  // 2. Photo Frame
  {
    id: 'prod-4',
    name: 'Personalized Double Photo Frame with Brass Border',
    subtitle: 'Double side frame for cherished pictures, includes high-resolution printing',
    sku: 'GS-FRM-04',
    category: 'Photo Frames',
    categorySlug: 'photo-frames',
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    rating: 4.8,
    reviewsCount: 96,
    primaryImage: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    tag: 'Top Rated Frame',
    isPersonalizable: true,
    material: 'Brass & Clear Glass',
    inStock: true,
    isFeatured: true
  },
  // 3. Teddy Bear
  {
    id: 'prod-10',
    name: 'Fluffy Brown Huggable Teddy Bear with Ribbon (40 cm)',
    subtitle: 'Ultra-soft plush toy made with safe hypoallergenic cotton & satin bow',
    sku: 'GS-TOY-10',
    category: 'Birthday Gifts',
    categorySlug: 'birthday-gifts',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.9,
    reviewsCount: 175,
    primaryImage: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    tag: 'Cute Teddy Gift',
    isPersonalizable: true,
    material: 'Plush Velvet Cotton',
    inStock: true,
    isFeatured: true
  },
  // 4. Gift Hamper
  {
    id: 'prod-2',
    name: 'Luxury Celebration Gift Hamper with Chocolates & Snacks',
    subtitle: 'Assorted Belgian chocolates, gourmet cookies, scented candle & brass jar',
    sku: 'GS-HMP-02',
    category: 'Gift Hampers',
    categorySlug: 'gift-hampers',
    price: 2999,
    originalPrice: 3899,
    discount: 23,
    rating: 5.0,
    reviewsCount: 112,
    primaryImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    tag: 'Popular Hamper',
    isPersonalizable: true,
    material: 'Premium Gift Box',
    inStock: true,
    isFeatured: true
  },
  // 5. Couple Frame
  {
    id: 'prod-11',
    name: 'Romantic Couple Love Frame with Custom Names & Date',
    subtitle: 'Wooden silhouette design with backlight for memorable bedroom decor',
    sku: 'GS-ANV-11',
    category: 'Anniversary Gifts',
    categorySlug: 'anniversary-gifts',
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    rating: 4.95,
    reviewsCount: 198,
    primaryImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80',
    tag: 'Couple Favorite',
    isPersonalizable: true,
    material: 'Wood & Acrylic LED',
    inStock: true,
    isFeatured: true
  },
  // 6. Cute Panda Plush Toy
  {
    id: 'prod-15',
    name: 'Cuddly Black & White Panda Huggable Plush Soft Toy (35 cm)',
    subtitle: 'Hypoallergenic ultra-soft velvet plush with bamboo leaf accessory & gift card',
    sku: 'GS-PND-15',
    category: 'Birthday Gifts',
    categorySlug: 'birthday-gifts',
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.9,
    reviewsCount: 168,
    primaryImage: 'https://images.unsplash.com/photo-1593433684254-99145b2e58b6?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1576763453251-aa72aa016f62?auto=format&fit=crop&w=800&q=80',
    tag: 'Cute Panda Plush',
    isPersonalizable: true,
    material: 'Ultra-Soft Velvet Cotton',
    inStock: true,
    isFeatured: true
  },
  // 7. Chain & Pendant
  {
    id: 'prod-16',
    name: 'Personalized 18K Gold Plated Custom Name Pendant Chain',
    subtitle: 'Laser-cut custom name calligraphy pendant with anti-tarnish link chain in velvet case',
    sku: 'GS-CHN-16',
    category: 'Personalized Gifts',
    categorySlug: 'personalized-gifts',
    price: 1299,
    originalPrice: 1899,
    discount: 31,
    rating: 4.95,
    reviewsCount: 220,
    primaryImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    tag: 'Trending Name Chain',
    isPersonalizable: true,
    material: '18K Gold Plated Stainless Steel',
    inStock: true,
    isFeatured: true
  },
  // 8. Couple Rings in Velvet Box
  {
    id: 'prod-17',
    name: 'Adjustable Sterling Silver Couple Promise Rings in Velvet Box',
    subtitle: 'Matching his & her couple bands with cubic zirconia in romantic red velvet presentation case',
    sku: 'GS-RNG-17',
    category: 'Anniversary Gifts',
    categorySlug: 'anniversary-gifts',
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    rating: 4.9,
    reviewsCount: 145,
    primaryImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    tag: 'Couple Rings Set',
    isPersonalizable: true,
    material: '925 Sterling Silver & Velvet Box',
    inStock: true,
    isFeatured: true
  },
  // 9. Traditional Bangles Set
  {
    id: 'prod-18',
    name: 'Traditional Designer Gold-Plated Handcrafted Bangles Set (Set of 4)',
    subtitle: 'Intricate royal craftsmanship with micro gold-plating and luxury jewelry pouch',
    sku: 'GS-BNG-18',
    category: 'Personalized Gifts',
    categorySlug: 'personalized-gifts',
    price: 1499,
    originalPrice: 2199,
    discount: 32,
    rating: 4.85,
    reviewsCount: 110,
    primaryImage: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80',
    tag: 'Festive Bangles',
    isPersonalizable: false,
    material: 'Brass with 24K Gold Micro-Plating',
    inStock: true,
    isFeatured: true
  },
  // 10. Gift Wrap & Presentation
  {
    id: 'prod-19',
    name: 'Artisanal Luxury Gift Box with Hand-Tied Satin Ribbon & Seal',
    subtitle: 'Thick rigid presentation keepsake box with wax seal sticker and handwritten greeting card',
    sku: 'GS-WRP-19',
    category: 'Gift Hampers',
    categorySlug: 'gift-hampers',
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 5.0,
    reviewsCount: 340,
    primaryImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80',
    tag: 'Artisan Gift Wrap',
    isPersonalizable: true,
    material: 'Rigid Gift Box & Satin Ribbon',
    inStock: true,
    isFeatured: true
  },
  // 6. Leather Wallet
  {
    id: 'prod-6',
    name: 'Custom Engraved Name Leather Wallet & Keyring Combo',
    subtitle: 'Genuine leather wallet with personalized gold foil name engraving',
    sku: 'GS-WLT-06',
    category: 'Personalized Gifts',
    categorySlug: 'personalized-gifts',
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    rating: 4.9,
    reviewsCount: 140,
    primaryImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    tag: 'Gift for Him',
    isPersonalizable: true,
    material: 'Genuine Leather',
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-7',
    name: 'Custom Ceramic Coffee Mug with Photo & Name',
    subtitle: 'Microwave and dishwasher safe mug with glossy finish and vibrant colors',
    sku: 'GS-MUG-07',
    category: 'Personalized Gifts',
    categorySlug: 'personalized-gifts',
    price: 499,
    originalPrice: 799,
    discount: 38,
    rating: 4.7,
    reviewsCount: 310,
    primaryImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    tag: 'Budget Pick',
    isPersonalizable: true,
    material: 'Glazed Ceramic',
    inStock: true,
    isFeatured: false
  },

  // Gift Hampers
  {
    id: 'prod-8',
    name: 'Royal Gourmet Sweet & Savory Festive Basket',
    subtitle: 'Dry fruit jars, dark chocolate pralines, herbal green tea & cookies',
    sku: 'GS-HMP-08',
    category: 'Gift Hampers',
    categorySlug: 'gift-hampers',
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.9,
    reviewsCount: 88,
    primaryImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80',
    tag: 'Festival Special',
    isPersonalizable: false,
    material: 'Woven Basket',
    inStock: true,
    isFeatured: false
  },

  // Birthday Gifts
  {
    id: 'prod-9',
    name: 'Happy Birthday Surprise Gift Box with LED Lights',
    subtitle: 'Includes birthday mug, dairy chocolates, mini teddy & wish card',
    sku: 'GS-BDY-09',
    category: 'Birthday Gifts',
    categorySlug: 'birthday-gifts',
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.85,
    reviewsCount: 260,
    primaryImage: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    tag: 'Birthday Special',
    isPersonalizable: true,
    material: 'Rigid Gift Box',
    inStock: true,
    isFeatured: true
  },

  // Anniversary Gifts
  {
    id: 'prod-12',
    name: 'Mr & Mrs Ceramic Marble Mugs with Golden Spoons',
    subtitle: 'Set of 2 elegant mugs in luxury packaging for weddings & anniversaries',
    sku: 'GS-ANV-12',
    category: 'Anniversary Gifts',
    categorySlug: 'anniversary-gifts',
    price: 1099,
    originalPrice: 1599,
    discount: 31,
    rating: 4.8,
    reviewsCount: 142,
    primaryImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    tag: 'Wedding Gift',
    isPersonalizable: false,
    material: 'Marble Glazed Ceramic',
    inStock: true,
    isFeatured: false
  },

  // Flowers & Bouquets
  {
    id: 'prod-3',
    name: 'Red Rose in Glass Dome with Warm Fairy Lights',
    subtitle: 'Long-lasting preserved red rose with wooden base and LED lights',
    sku: 'GS-FLW-03',
    category: 'Flowers & Bouquets',
    categorySlug: 'flowers-bouquets',
    price: 1999,
    originalPrice: 2699,
    discount: 26,
    rating: 4.9,
    reviewsCount: 228,
    primaryImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    tag: 'Trending Flower',
    isPersonalizable: false,
    material: 'Glass & Natural Wood',
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-13',
    name: 'Bouquet of 12 Fresh Dutch Red Roses with Gypsophila',
    subtitle: 'Fresh hand-tied flower arrangement in luxury matte wrapping paper',
    sku: 'GS-FLW-13',
    category: 'Flowers & Bouquets',
    categorySlug: 'flowers-bouquets',
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.75,
    reviewsCount: 310,
    primaryImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    tag: 'Same Day Dispatch',
    isPersonalizable: false,
    material: 'Fresh Natural Roses',
    inStock: true,
    isFeatured: false
  },

  // Corporate Gifts
  {
    id: 'prod-14',
    name: 'Executive Metal Pen, Temperature Flask & Diary Combo',
    subtitle: 'Custom laser engraved company logo or employee name on all 3 items',
    sku: 'GS-CORP-14',
    category: 'Corporate Gifts',
    categorySlug: 'corporate-gifts',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.9,
    reviewsCount: 75,
    primaryImage: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80',
    tag: 'Best for Work',
    isPersonalizable: true,
    material: 'Stainless Steel & PU Leather',
    inStock: true,
    isFeatured: true
  },

  // Home Decor
  {
    id: 'prod-5',
    name: 'Aromatherapy Scented Candle Set (Lavender & Vanilla)',
    subtitle: 'Soy wax candles in fluted ceramic jars for a relaxing home ambience',
    sku: 'GS-CND-05',
    category: 'Home Decor',
    categorySlug: 'home-decor',
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.9,
    reviewsCount: 164,
    primaryImage: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    tag: 'Great for Home',
    isPersonalizable: false,
    material: '100% Pure Soy Wax',
    inStock: true,
    isFeatured: true
  }
];

export const FEATURED_PRODUCTS = ALL_PRODUCTS.filter(p => p.isFeatured);

export const CUSTOMER_REVIEWS = [
  {
    id: 1,
    client: 'Sneha Patel',
    milestone: 'Ordered for 1st Anniversary',
    comment: 'The wooden box with our names engraved looked even better than the photos. My husband loved the thoughtful packaging and greeting card. Fast delivery too!',
    location: 'Bangalore',
    rating: 5
  },
  {
    id: 2,
    client: 'Rohit Sharma',
    milestone: 'Ordered Birthday Hamper for Sister',
    comment: 'The chocolates were fresh and delicious, and the packaging was super neat with a pretty satin ribbon. Best gift delivery service I have used so far.',
    location: 'Mumbai',
    rating: 5
  },
  {
    id: 3,
    client: 'Pooja Verma',
    milestone: 'Customized Photo Frame',
    comment: 'Picture quality was sharp and the frame is very sturdy. Customer support helped me preview my photo before printing. Very happy with the purchase!',
    location: 'Delhi NCR',
    rating: 5
  }
];
