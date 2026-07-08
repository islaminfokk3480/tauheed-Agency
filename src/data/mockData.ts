import { Property, Project, Agent, Review, FAQ, BlogPost, BusinessHours, SEOMetadata } from '../types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Muhammad Ali Shah',
    designation: 'Managing Director & Founder',
    experience: '18 Years',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    phone: '+92 321 9876543',
    whatsapp: '923219876543',
    facebook: '#',
    linkedin: '#'
  },
  {
    id: 'agent-2',
    name: 'Zainab Fatima',
    designation: 'Senior Investment Advisor',
    experience: '10 Years',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    phone: '+92 300 1234567',
    whatsapp: '923001234567',
    instagram: '#',
    linkedin: '#'
  },
  {
    id: 'agent-3',
    name: 'Hamza Farooq',
    designation: 'Head of Commercial Listings',
    experience: '8 Years',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    phone: '+92 333 5556677',
    whatsapp: '923335556677',
    facebook: '#',
    instagram: '#',
    linkedin: '#'
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Spectacular 1000 Sq. Yds Modern Architectural Masterpiece',
    price: 320000000, // 32 Crore
    location: 'DHA Phase 8, Karachi',
    purpose: 'buy',
    type: 'House',
    bedrooms: 6,
    bathrooms: 7,
    garage: 4,
    area: '1000 Sq. Yds',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Standard embedded test video
    virtualTourUrl: '360-active-room',
    featured: true,
    status: 'Available',
    agentId: 'agent-1',
    description: 'A masterpiece of contemporary architecture situated in the prestigious Phase 8 of DHA Karachi. Designed by a world-class architect, this villa offers double-height ceilings, a private heated infinity pool, smart home automation, imported Italian tile flooring, and fully fitted Scavolini kitchens. Perfect for elite families seeking luxury combined with state-of-the-art security systems.',
    yearBuilt: '2024',
    amenities: ['Infinity Pool', 'Smart Home Automation', 'Home Theater', 'Elevator', 'Basement Parking', 'Maid Room', 'Guard Room']
  },
  {
    id: 'prop-2',
    title: 'Ultra-Luxury Sea-Facing 4 Bedroom Penthouse',
    price: 185000000, // 18.5 Crore
    location: 'Emaar Crescent Bay, Clifton, Karachi',
    purpose: 'buy',
    type: 'Apartment',
    bedrooms: 4,
    bathrooms: 5,
    garage: 2,
    area: '4200 Sq. Ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    virtualTourUrl: '360-sea-view',
    featured: true,
    status: 'Available',
    agentId: 'agent-2',
    description: 'Experience pure opulence at Emaar Crescent Bay with unmatched, panoramic vistas of the Arabian Sea. This penthouse comes complete with private elevator access, floor-to-ceiling double-glazed glass panels, built-in wardrobes, a Gaggenau culinary kitchen, and an expansive sea-facing terrace. Exclusive access to the infinity pool, luxury private gym, and yacht club facilities.',
    yearBuilt: '2023',
    amenities: ['Sea View Terrace', 'Private Gym Access', 'Infinity Pool', 'Concierge Service', 'High-Speed Elevators', '24/7 Power Backup']
  },
  {
    id: 'prop-3',
    title: '500 Sq. Yds Designer Villa with Scenic Park Views',
    price: 145000000, // 14.5 Crore
    location: 'DHA Phase 6, Karachi',
    purpose: 'buy',
    type: 'House',
    bedrooms: 5,
    bathrooms: 6,
    garage: 3,
    area: '500 Sq. Yds',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    virtualTourUrl: '360-garden',
    featured: false,
    status: 'Available',
    agentId: 'agent-1',
    description: 'A modern aesthetic marvel situated right opposite a tranquil, beautifully landscaped community park in DHA Phase 6. Featuring solid teak woodwork, Spanio fixtures, split levels, dual-family sitting areas, two dirty-kitchen setups, and beautifully landscaped front and side lawns. Exceptional ventilation and absolute privacy.',
    yearBuilt: '2022',
    amenities: ['Park Facing', 'Teak Woodwork', 'Lush Lawns', 'Solar System Pre-installed', 'Dual Living Areas']
  },
  {
    id: 'prop-4',
    title: 'High-Yield Commercial Office Tower Floor',
    price: 450000000, // 45 Crore
    location: 'Shahrah-e-Faisal, Karachi',
    purpose: 'buy',
    type: 'Commercial',
    bedrooms: 0,
    bathrooms: 4,
    garage: 10,
    area: '12000 Sq. Ft',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    status: 'Available',
    agentId: 'agent-3',
    description: 'An exceptional commercial investment opportunity consisting of an entire corporate floor in a premium, ultra-modern corporate tower on Shahrah-e-Faisal. Pre-leased to a high-profile multinational tenant yielding stable 8.5% annual ROI. Features central VRF air-conditioning, double-layered acoustic insulation, and 24/7 dedicated surveillance.',
    yearBuilt: '2021',
    amenities: ['Multinational Tenant Pre-leased', 'Dedicated High-Speed Lift', 'Fiber Optic Connectivity', 'VRF Climate System', 'Reserved Basement Parking']
  },
  {
    id: 'prop-5',
    title: 'Elegant 3 Bedroom Luxury Apartment for Rent',
    price: 350000, // 3.5 Lakh / month
    location: 'Clifton Block 4, Karachi',
    purpose: 'rent',
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 4,
    garage: 2,
    area: '2800 Sq. Ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    status: 'Available',
    agentId: 'agent-2',
    description: 'Fabulous, fully furnished luxury flat located in a secure gated community in the heart of Clifton Block 4. High-quality marble floors, imported sanitary wear, spacious bedrooms with built-in cupboards, laundry room, and a massive kitchen with branded appliances. Ready to move in immediately.',
    yearBuilt: '2020',
    amenities: ['Fully Furnished', 'Gated Community', 'Branded Kitchen Appliances', 'Standby Generator', 'Reserved Parking']
  },
  {
    id: 'prop-6',
    title: '500 Sq. Yds Prime Residential Corner Plot',
    price: 95000000, // 9.5 Crore
    location: 'DHA Phase 8 (Zone B), Karachi',
    purpose: 'buy',
    type: 'Plot',
    bedrooms: 0,
    bathrooms: 0,
    garage: 0,
    area: '500 Sq. Yds',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    status: 'Available',
    agentId: 'agent-3',
    description: 'An exceptional, clear corner plot positioned in one of the most up-and-coming zones of DHA Phase 8. Double road access, high potential for commercial valuation growth, fully paid dues, and ready for immediate transfer. Ideal for building a custom bespoke modern architectural villa.',
    yearBuilt: 'N/A',
    amenities: ['Corner Lot', 'Double Road Access', 'Sewerage Connected', 'Electricity Paid', 'Immediate Transfer']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Tauheed Heights & Executive Suites',
    description: 'A 28-storey luxurious architectural landmark offering super-premium 3 & 4 bedroom duplexes, private elevators, sky gym, and 360-degree skyline views.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    status: 'Under Construction',
    location: 'Clifton Block 5, Karachi',
    priceRange: 'PKR 12.0 Crore onwards',
    developer: 'Tauheed Developers Ltd'
  },
  {
    id: 'proj-2',
    title: 'The Gold Crest Royal Villas',
    description: 'A prestigious collection of 40 fully-detached modern designer villas with private swimming pools, individual solar setups, and smart automation systems.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    status: 'Newly Launched',
    location: 'DHA Phase 8 Extension, Karachi',
    priceRange: 'PKR 22.5 Crore onwards',
    developer: 'Tauheed & Partners Realty'
  },
  {
    id: 'proj-3',
    title: 'Emaar Oceanfront - Marine Residences',
    description: 'The epitome of high-end seaside living with private marina access, high-society dining boardwalk, and exquisite double-glazed architectural penthouses.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    status: 'Completed',
    location: 'Emaar Crescent Bay, Karachi',
    priceRange: 'PKR 15.0 Crore onwards',
    developer: 'Emaar Pakistan'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Tariq Mehmood',
    review: 'Tauheed Estate Agency is undoubtedly the most professional agency in Karachi. Muhammad Ali Shah personally oversaw our plot acquisition in DHA Phase 8 and made sure all documentation was verified. Excellent experience!',
    rating: 5,
    location: 'Karachi, Pakistan',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'June 14, 2026'
  },
  {
    id: 'rev-2',
    name: 'Dr. Sarah Chishti',
    review: 'Buying a luxury penthouse in Crescent Bay was stress-free because of Zainab. She arranged complete legal assistance, answered all our 24/7 calls, and handled negotiate with complete transparency. Highly recommend!',
    rating: 5,
    location: 'London, UK / Overseas Client',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    date: 'May 20, 2026'
  },
  {
    id: 'rev-3',
    name: 'Farhan Zaidi',
    review: 'Absolutely reliable. They do not work like typical brokers. They gave me deep market analysis reports before I invested in Clifton commercial property. Best consultancy in the city.',
    rating: 5,
    location: 'Karachi, Pakistan',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    date: 'April 02, 2026'
  }
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Why should I choose Tauheed Estate Agency over other brokers in Karachi?',
    answer: 'We operate with absolute corporate transparency, legal scrutiny, and verified ownership. Unlike conventional brokers, we provide comprehensive land registration searches, legal verification, direct seller-to-buyer transactions, and market analysis reports so you can invest with zero risk.'
  },
  {
    id: 'faq-2',
    question: 'How do you assist overseas Pakistani clients in real estate transactions?',
    answer: 'We specialize in Overseas Client Management. We offer virtual 360-degree video tours, remote power of attorney documentation assistance, digital escrow-like legal support, and direct coordination with major banks to secure seamless, transparent investments from any country.'
  },
  {
    id: 'faq-3',
    question: 'Are there any hidden service fees or registration charges?',
    answer: 'Absolutely none. All our agency commissions, government tax obligations, property registration fees, and legal documentation costs are laid out transparently in writing in our initial client brief before any agreement is signed.'
  },
  {
    id: 'faq-4',
    question: 'Can you assist in securing bank financing and mortgage calculations?',
    answer: 'Yes! We have exclusive partnerships with major private banks in Pakistan. We help prepare documentation, coordinate with credit teams, and facilitate quick mortgage evaluation with complete transparency.'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Karachi Real Estate Forecast: Where to Invest in 2026',
    category: 'Market Trends',
    date: 'July 01, 2026',
    readTime: '6 Mins Read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    excerpt: 'An in-depth analysis of high-growth residential and commercial property sectors in DHA Phase 8, Clifton, and emerging coastal developments.',
    content: 'The Karachi real estate landscape in 2026 is seeing massive capital re-allocation towards secure coastal properties. DHA Phase 8 and Clifton remain the premium choice for elite luxury housing due to outstanding infrastructure development, backup power grid configurations, and immediate maritime leisure access. This article details which block valuations are expected to rise by 25% over the next 18 months, driven by commercial projects and luxury high-rises.'
  },
  {
    id: 'blog-2',
    title: 'The Ultimate Guide for Buying Property as an Overseas Pakistani',
    category: 'Buying Guide',
    date: 'June 18, 2026',
    readTime: '8 Mins Read',
    image: 'https://images.unsplash.com/photo-1434064511983-18c6dae20ed5?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Learn the complete legal process, required biometric verifications, and digital money transfer regulations to safely buy land.',
    content: 'Investing in Pakistan while residing abroad requires strict attention to money transfer channels and power of attorney definitions. Ensure you utilize banking channels with valid remittance slips to claim tax benefits. In this guide, we walk you step-by-step through biometric checks, secure direct transfer workflows, and how to verify structural completion certificates virtually.'
  },
  {
    id: 'blog-3',
    title: 'Taxation Reforms on Real Estate in Pakistan: What Has Changed?',
    category: 'Latest News',
    date: 'May 24, 2026',
    readTime: '5 Mins Read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Understanding the impact of the latest federal budget on filer and non-filer tax percentages for buy/sell operations.',
    content: 'The new federal regulatory guidelines introduce strict filership constraints to encourage compliance. Filer transaction taxes have been minimized to spur corporate property developments, whereas non-filer rates face substantial elevation. Our head of legal services breaks down these numbers and explains how custom investment trusts (REITs) can optimize tax obligations for family-run estates.'
  }
];

export const INITIAL_BUSINESS_HOURS: BusinessHours = {
  weekday: 'Monday - Friday: 09:00 AM - 08:00 PM',
  weekend: 'Saturday: 10:00 AM - 05:00 PM (Sunday: Closed)'
};

export const INITIAL_SEO: SEOMetadata = {
  title: 'TAUHEED ESTATE AGENCY | Premium & Luxury Real Estate Karachi',
  description: 'Buy, Sell, Rent and Invest with Complete Transparency in Karachi’s Premier Residential Areas (DHA, Clifton, Emaar Crescent Bay). High-end properties and projects with professional legal verification.',
  keywords: 'real estate karachi, tauheed estate agency, luxury homes karachi, dha phase 8 plots, clifton apartment rent, emaar crescent bay sea facing, luxury property pakistan'
};
