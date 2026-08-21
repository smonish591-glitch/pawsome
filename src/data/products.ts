import { Product, Review } from '../types';

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'prod-collar-01',
    name: 'Adjustable Leather-Trim Collar',
    category: 'collars',
    petType: 'dog',
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.9,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    isFeatured: true,
    description: 'Handcrafted with vegetable-tanned full-grain leather accents and ultra-soft padded webbing for ultimate neck comfort and safety.',
    features: [
      'Reinforced zinc alloy D-ring tested up to 400 lbs tensile pull',
      'Weather-resistant soft lining to prevent fur chafing',
      'Reflective safety stitching for night walks',
      'Quick-release heavy duty buckle'
    ],
    materials: ['Full-grain leather', 'Military-grade nylon webbing', 'Zinc alloy hardware'],
    inStock: true,
    colors: [
      { name: 'Terracotta Tan', hex: '#c46927' },
      { name: 'Cognac Brown', hex: '#633718' },
      { name: 'Deep Midnight', hex: '#1e293b' },
      { name: 'Sage Olive', hex: '#4a5d4e' }
    ],
    sizes: ['Small (10"-14")', 'Medium (14"-18")', 'Large (18"-24")', 'XL (24"-30")'],
    benefits: ['Zero neck pinch', 'Water-repellent finish', 'Lifetime hardware warranty']
  },
  {
    id: 'prod-bed-01',
    name: 'Round-Pet-Bed (Cloud Comfort)',
    category: 'beds',
    petType: 'all',
    price: 39.00,
    originalPrice: 49.00,
    rating: 5.0,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    isFeatured: true,
    description: 'Anxiety-relieving round donut cuddler bed crafted with orthopedic memory foam flakes and ultra-plush faux shag fur for restorative sleep.',
    features: [
      'Raised rim creates a sense of security and provides head/neck support',
      'High-density orthopedic base relieves joint & muscle pain',
      'Removable and 100% machine-washable zippered outer cover',
      'Non-skid silicone dot waterproof bottom'
    ],
    materials: ['Hypoallergenic faux fur', 'CertiPUR-US memory foam fill', 'Waterproof nylon liner'],
    inStock: true,
    colors: [
      { name: 'Sand Cream', hex: '#dfd2c0' },
      { name: 'Warm Terracotta', hex: '#b9652d' },
      { name: 'Slate Charcoal', hex: '#3f3f46' }
    ],
    sizes: ['Small (24" - up to 25 lbs)', 'Medium (30" - up to 45 lbs)', 'Large (36" - up to 75 lbs)', 'Jumbo (42" - 75+ lbs)'],
    benefits: ['Relieves joint tension', 'Machine washable', 'Calms nervous pets']
  },
  {
    id: 'prod-chew-01',
    name: 'Durable Dog Chew Toy',
    category: 'toys',
    petType: 'dog',
    price: 5.99,
    originalPrice: 8.99,
    rating: 4.8,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=800&q=80',
    badge: 'Tough Chew',
    isFeatured: true,
    description: 'Constructed from natural food-grade rubber with textured ridges designed to massage gums and clean tartar while satisfying natural chewing instincts.',
    features: [
      'Engineered for aggressive chewers with puncture-resistant core',
      'Treat dispenser cavity holds peanut butter or kibble',
      'Dental nubs help reduce plaque build-up',
      'Infused with real beef scent'
    ],
    materials: ['100% All-Natural Hevea Rubber (BPA & Phthalate Free)'],
    inStock: true,
    colors: [
      { name: 'Amber Bone', hex: '#cf7b38' },
      { name: 'Forest Moss', hex: '#486950' },
      { name: 'Ocean Blue', hex: '#2563eb' }
    ],
    sizes: ['Regular (5.5")', 'Large (7.5")'],
    benefits: ['Dental tartar control', 'Virtually indestructible', 'Boredom buster']
  },
  {
    id: 'prod-leash-01',
    name: 'Rope Dog Leash (Marine Grade)',
    category: 'collars',
    petType: 'dog',
    price: 15.00,
    originalPrice: 22.00,
    rating: 4.9,
    reviewsCount: 204,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80',
    badge: 'Staff Pick',
    isFeatured: true,
    description: 'Mountain-climbing braided rope leash featuring genuine leather-bound splices and 360-degree swivel alloy carabiner for tangle-free strolls.',
    features: [
      '1/2" diameter heavy-duty braided rock climbing rope',
      'Padded handle prevents rope burn on sudden pulls',
      '360° rustproof zinc alloy swivel clasp',
      'Leather accent stitching at joint terminals'
    ],
    materials: ['High-strength polypropylene rope', 'Full grain harness leather', 'Matte black alloy clip'],
    inStock: true,
    colors: [
      { name: 'Royal Indigo Blue', hex: '#1e40af' },
      { name: 'Cinnamon Clay', hex: '#c26224' },
      { name: 'Evergreen', hex: '#166534' },
      { name: 'Desert Sand', hex: '#d97706' }
    ],
    sizes: ['5 Feet (Standard)', '6 Feet (Long Reach)'],
    benefits: ['Shock absorbing', 'Weatherproof', 'Tangle-free swivel']
  }
];

export const ALL_PRODUCTS: Product[] = [
  ...FEATURED_PRODUCTS,
  {
    id: 'prod-treat-01',
    name: 'Artisan Baked Salmon & Sweet Potato Biscuits',
    category: 'treats',
    petType: 'dog',
    price: 12.50,
    originalPrice: 15.00,
    rating: 5.0,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80',
    badge: '100% Organic',
    description: 'Small-batch oven-baked crunchy biscuits loaded with wild Alaskan salmon, organic sweet potato, and flaxseed for shiny coats and healthy digestion.',
    features: [
      'Grain-free, corn-free, wheat-free recipe',
      'Rich in Omega-3 and Omega-6 fatty acids',
      'No artificial preservatives, flavors, or fillers',
      'Only 14 calories per biscuit'
    ],
    ingredients: ['Wild Alaskan Salmon', 'Organic Sweet Potato', 'Pea Flour', 'Ground Flaxseed', 'Cinnamon', 'Rosemary Extract'],
    weight: '12 oz (340g) Pouch',
    inStock: true,
    benefits: ['Glossy coat & skin health', 'Easy on sensitive stomachs', 'Irresistible crunch']
  },
  {
    id: 'prod-treat-02',
    name: 'Freeze-Dried Raw Grass-Fed Beef Liver Bites',
    category: 'treats',
    petType: 'all',
    price: 18.99,
    rating: 4.9,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80',
    badge: 'Single Ingredient',
    description: '100% human-grade pasture-raised beef liver flash freeze-dried to lock in maximum vital vitamins, minerals, and enzymes.',
    features: [
      'Single ingredient - pure beef liver',
      'High protein (65% min), zero carbohydrates',
      'Great for training and food topper hydration',
      'Sourced from local certified humane ranches'
    ],
    ingredients: ['100% Pasture-Raised Beef Liver'],
    weight: '6 oz (170g) resealable bag',
    inStock: true,
    benefits: ['High value training reward', 'Rich in iron & Vitamin A', 'Suitable for both dogs & cats']
  },
  {
    id: 'prod-bowl-01',
    name: 'Ergonomic Ceramic Pet Bowl with Wood Stand',
    category: 'grooming',
    petType: 'all',
    price: 28.00,
    originalPrice: 34.00,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    badge: 'Eco Design',
    description: 'Weighted matte glazed heavy ceramic bowl seated in a sustainable bamboo elevation stand to promote spine-friendly digestion and prevent bowl spills.',
    features: [
      'Elevated 3.5" to reduce neck strain and acid reflux',
      'Heavy ceramic base prevents push-around spills',
      'Dishwasher and microwave safe bowl',
      'Water-sealed bamboo timber stand'
    ],
    materials: ['Food-grade glazed lead-free ceramic', 'Natural bamboo stand'],
    inStock: true,
    colors: [
      { name: 'Warm Terracotta', hex: '#c46927' },
      { name: 'Matte Cream', hex: '#fdfbf7' },
      { name: 'Sage Green', hex: '#4a6552' }
    ],
    sizes: ['400ml (Cats / Puppies)', '850ml (Medium Dogs)', '1800ml (Large Dogs)'],
    benefits: ['Reduces gulping & bloat', 'Easy dishwasher clean', 'Whisker fatigue relief']
  },
  {
    id: 'prod-crate-01',
    name: 'Voyager Heavy-Duty Pet Travel Carrier Crate',
    category: 'crates',
    petType: 'all',
    price: 64.00,
    originalPrice: 79.00,
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=800&q=80',
    badge: 'Airline Approved',
    description: 'Engineered for seamless car and airplane travel with 360-degree ventilation grids, secure spring-latch gate, and ergonomic padded handle.',
    features: [
      'Meets IATA in-cabin and cargo travel specifications',
      'Tear-resistant matte polycarbonate shell',
      'Includes removable plush washable sherpa pad',
      'Seatbelt safety loops for car transit security'
    ],
    materials: ['High-impact recycled polypropylene', 'Stainless steel gate mesh'],
    inStock: true,
    colors: [
      { name: 'Matte Cocoa Charcoal', hex: '#27272a' },
      { name: 'Warm Sand Taupe', hex: '#d1bfa7' }
    ],
    sizes: ['Small (Up to 15 lbs)', 'Medium (Up to 28 lbs)', 'Large (Up to 45 lbs)'],
    benefits: ['Zero rattling noise', 'Crash-tested latches', 'Quick wipe cleaning']
  },
  {
    id: 'prod-groom-01',
    name: 'Organic Herbal Paw Balm & Snout Butter',
    category: 'grooming',
    petType: 'all',
    price: 9.99,
    originalPrice: 12.99,
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
    badge: '100% Lick Safe',
    description: 'Deeply moisturizing all-natural salve crafted with organic shea butter, coconut oil, and calendula to heal cracked paws and protect against hot pavement and snow ice.',
    features: [
      '100% organic and lick-safe ingredients',
      'Fast-absorbing, non-greasy formula',
      'Forms a breathable shield against extreme hot & cold weather',
      'Fragrance-free for sensitive canine and feline noses'
    ],
    ingredients: ['Organic Shea Butter', 'Extra Virgin Coconut Oil', 'Beeswax', 'Calendula Extract', 'Vitamin E Oil'],
    weight: '2 oz (60ml) Twist Tin',
    inStock: true,
    benefits: ['Instant dry paw relief', 'Protects from salt & snow', 'All-natural vegan base']
  },
  {
    id: 'prod-toy-02',
    name: 'Natural Braided Cotton Infinity Chew Rope',
    category: 'toys',
    petType: 'dog',
    price: 8.50,
    rating: 4.7,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
    badge: 'Tug & Play',
    description: 'Triple-twisted 100% unbleached natural cotton fiber rope designed for energetic games of tug-of-war while naturally flossing teeth as they bite.',
    features: [
      'Dye-free natural organic cotton fibers',
      'Interlocking knots stimulate gums',
      'Washable in cold water cycles',
      'Gentle on dog jaws yet tough on pull'
    ],
    materials: ['100% Organic Raw Cotton'],
    inStock: true,
    benefits: ['Natural teeth flossing', 'Safe digestible fibers', 'Promotes active bonding']
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    petName: 'Milo',
    petBreed: 'Golden Retriever (2 yrs)',
    rating: 5,
    date: '3 days ago',
    title: 'The bed and salmon treats are exceptional!',
    comment: 'Milo jumped right into the Round Cloud bed the second I unpacked it. The terracotta color is gorgeous in our living room, and the salmon biscuits smell so fresh and clean! Delivery was super fast too.',
    verified: true,
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80',
    helpfulCount: 34
  },
  {
    id: 'rev-2',
    author: 'David Chen',
    petName: 'Bella & Winston',
    petBreed: 'Beagle & Frenchie',
    rating: 5,
    date: '1 week ago',
    title: 'Best quality collar & leash combo we have ever owned',
    comment: 'The leather accents and marine-grade rope leash are extraordinarily well made. No hand burn when Winston spots a squirrel! The checkout was seamless with Apple Pay.',
    verified: true,
    photoUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=300&q=80',
    helpfulCount: 28
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    petName: 'Biscuit',
    petBreed: 'Tabby Cat (4 yrs)',
    rating: 5,
    date: '2 weeks ago',
    title: 'The AI Advisor nailed our food recommendation',
    comment: 'The interactive AI pet quiz recommended the freeze-dried beef liver bites and ceramic elevated bowl for Biscuit who had sensitive digestion. He has not vomited once since switching bowls!',
    verified: true,
    photoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
    helpfulCount: 42
  }
];

export const PET_BREEDS = [
  'Golden Retriever', 'Labrador Retriever', 'French Bulldog', 'German Shepherd', 
  'Beagle', 'Poodle / Doodle', 'Dachshund', 'Corgi', 'Bulldog', 'Yorkshire Terrier', 
  'Australian Shepherd', 'Siberian Husky', 'Domestic Short Hair (Cat)', 'Maine Coon', 
  'Persian Cat', 'Siamese Cat', 'Ragdoll Cat', 'Other Beloved Breed'
];
