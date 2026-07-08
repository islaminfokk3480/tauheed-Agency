export interface Property {
  id: string;
  title: string;
  price: number; // in PKR, e.g. 150000000
  location: string; // e.g. "DHA Phase 8, Karachi"
  purpose: 'buy' | 'rent';
  type: 'Apartment' | 'House' | 'Plot' | 'Commercial';
  bedrooms: number;
  bathrooms: number;
  garage: number;
  area: string; // e.g. "500 Sq. Yds"
  image: string;
  gallery: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  featured: boolean;
  status: 'Available' | 'Sold' | 'Reserved';
  agentId: string;
  description: string;
  yearBuilt?: string;
  amenities?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'Under Construction' | 'Completed' | 'Newly Launched';
  location: string;
  priceRange: string; // e.g. "PKR 4.5 Crore onwards"
  developer: string;
}

export interface Agent {
  id: string;
  name: string;
  designation: string;
  experience: string;
  photo: string;
  phone: string;
  whatsapp: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export interface Review {
  id: string;
  name: string;
  review: string;
  rating: number;
  location: string;
  photo: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Investment' | 'Buying Guide' | 'Market Trends' | 'Latest News';
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyTitle?: string;
  date: string;
  status: 'New' | 'Contacted' | 'Archived';
}

export interface BusinessHours {
  weekday: string;
  weekend: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
}
