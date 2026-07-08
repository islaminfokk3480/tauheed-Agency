import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, MapPin, Building2, ChevronDown, CheckCircle, ArrowRight, ShieldAlert,
  Star, Users, Phone, MessageSquare, BookOpen, HelpCircle, Mail, Map, Sparkles,
  Award, FileText, Landmark, Clock, ArrowUpRight, Heart, X, Check, ArrowRightLeft,
  Briefcase, Landmark as BankIcon, BadgePercent, TrendingUp
} from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PropertyCard, { formatPKRPrice } from './components/PropertyCard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import AdminDashboard from './components/AdminDashboard';
import { Property, Project, Agent, Review, FAQ, BlogPost, ContactRequest, BusinessHours, SEOMetadata } from './types';

import {
  INITIAL_AGENTS,
  INITIAL_PROPERTIES,
  INITIAL_PROJECTS,
  INITIAL_REVIEWS,
  INITIAL_FAQS,
  INITIAL_BLOGS,
  INITIAL_BUSINESS_HOURS,
  INITIAL_SEO
} from './data/mockData';

export default function App() {
  // ━━━━━━━━ THEME STATE ━━━━━━━━
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('tauheed_theme');
    return saved ? saved === 'dark' : true; // Default to luxury dark
  });

  useEffect(() => {
    localStorage.setItem('tauheed_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // ━━━━━━━━ CORE LISTS STATE (LocalStorage Backed) ━━━━━━━━
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('tauheed_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('tauheed_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [agents, setAgents] = useState<Agent[]>(() => {
    const saved = localStorage.getItem('tauheed_agents');
    return saved ? JSON.parse(saved) : INITIAL_AGENTS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('tauheed_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    const saved = localStorage.getItem('tauheed_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('tauheed_blogs');
    return saved ? JSON.parse(saved) : INITIAL_BLOGS;
  });

  const [contactRequests, setContactRequests] = useState<ContactRequest[]>(() => {
    const saved = localStorage.getItem('tauheed_contacts');
    return saved ? JSON.parse(saved) : [];
  });

  const [businessHours, setBusinessHours] = useState<BusinessHours>(() => {
    const saved = localStorage.getItem('tauheed_hours');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESS_HOURS;
  });

  const [seoMetadata, setSeoMetadata] = useState<SEOMetadata>(() => {
    const saved = localStorage.getItem('tauheed_seo');
    return saved ? JSON.parse(saved) : INITIAL_SEO;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('tauheed_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('tauheed_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('tauheed_agents', JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    localStorage.setItem('tauheed_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('tauheed_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('tauheed_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('tauheed_contacts', JSON.stringify(contactRequests));
  }, [contactRequests]);

  useEffect(() => {
    localStorage.setItem('tauheed_hours', JSON.stringify(businessHours));
  }, [businessHours]);

  useEffect(() => {
    localStorage.setItem('tauheed_seo', JSON.stringify(seoMetadata));
  }, [seoMetadata]);

  // ━━━━━━━━ NAVIGATION & VIEW STATE ━━━━━━━━
  const [activeTab, setActiveTab] = useState('home');

  // ━━━━━━━━ INTERACTIVE SPECIAL STATE ━━━━━━━━
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('tauheed_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState<Property[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  
  // Selected Property for details Modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Selected Blog Post for luxury reading modal
  const [activeBlogPost, setActiveBlogPost] = useState<any | null>(null);

  useEffect(() => {
    localStorage.setItem('tauheed_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const toggleCompare = (prop: Property) => {
    setCompareList(prev => {
      if (prev.find(p => p.id === prop.id)) {
        return prev.filter(p => p.id !== prop.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 luxury properties side-by-side.');
        return prev;
      }
      return [...prev, prop];
    });
  };

  // ━━━━━━━━ ADVANCED FILTER STATE ━━━━━━━━
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPurpose, setFilterPurpose] = useState<'all' | 'buy' | 'rent'>('all');
  const [filterType, setFilterType] = useState('all');
  const [filterArea, setFilterArea] = useState('all');
  const [filterBeds, setFilterBeds] = useState('all');
  const [filterMaxPrice, setFilterMaxPrice] = useState<number>(500000000); // Max 50 Crore

  const handleSearchReset = () => {
    setFilterLocation('');
    setFilterPurpose('all');
    setFilterType('all');
    setFilterArea('all');
    setFilterBeds('all');
    setFilterMaxPrice(500000000);
  };

  // Filter logic
  const filteredProperties = properties.filter((prop) => {
    const matchLocation = prop.location.toLowerCase().includes(filterLocation.toLowerCase());
    const matchPurpose = filterPurpose === 'all' || prop.purpose === filterPurpose;
    const matchType = filterType === 'all' || prop.type === filterType;
    
    // Beds matching
    let matchBeds = true;
    if (filterBeds !== 'all') {
      if (filterBeds === '5+') {
        matchBeds = prop.bedrooms >= 5;
      } else {
        matchBeds = prop.bedrooms === Number(filterBeds);
      }
    }

    // Area matching
    let matchArea = true;
    if (filterArea !== 'all') {
      matchArea = prop.area.toLowerCase().includes(filterArea.toLowerCase());
    }

    // Price matching
    const matchPrice = prop.price <= filterMaxPrice;

    return matchLocation && matchPurpose && matchType && matchBeds && matchArea && matchPrice;
  });

  // ━━━━━━━━ PUBLIC CONTACT FORM STATE ━━━━━━━━
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactMsg) return;

    const newRequest: ContactRequest = {
      id: `req-${Date.now()}`,
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      message: contactMsg,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'New'
    };

    setContactRequests(prev => [newRequest, ...prev]);
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMsg('');
    }, 5000);
  };

  // Direct visit submit from details modal
  const handleVisitSubmit = (req: Omit<ContactRequest, 'id' | 'date' | 'status'>) => {
    const newRequest: ContactRequest = {
      id: `req-${Date.now()}`,
      ...req,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'New'
    };
    setContactRequests(prev => [newRequest, ...prev]);
  };

  // Blog Category State
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<'All' | 'Market Trends' | 'Buying Guide' | 'Latest News'>('All');
  const filteredBlogs = selectedBlogCategory === 'All' ? blogs : blogs.filter(b => b.category === selectedBlogCategory);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 overflow-x-hidden relative ${
      darkMode ? 'bg-[#090909] text-white' : 'bg-[#fafafa] text-slate-950'
    }`}>
      {/* ━━━━━━━━ LUXURY BACKDROP AMBIENT GLOWS (ELEGANT DARK) ━━━━━━━━ */}
      <div className={`absolute top-[-10%] left-[-15%] w-[60%] h-[50%] rounded-full blur-[140px] pointer-events-none z-0 transition-opacity duration-1000 ${
        darkMode ? 'bg-[#C8A951]/10 opacity-100' : 'bg-[#C8A951]/4 opacity-60'
      }`} />
      <div className={`absolute bottom-[20%] right-[-15%] w-[50%] h-[50%] rounded-full blur-[140px] pointer-events-none z-0 transition-opacity duration-1000 ${
        darkMode ? 'bg-[#C8A951]/6 opacity-100' : 'bg-[#C8A951]/2 opacity-50'
      }`} />
      {/* ━━━━━━━━ TOP BANNER SEO COMPATIBILITY ━━━━━━━━ */}
      <header className="sr-only">
        <h1>{seoMetadata.title}</h1>
        <p>{seoMetadata.description}</p>
        <span>{seoMetadata.keywords}</span>
      </header>

      {/* ━━━━━━━━ NAVIGATION ━━━━━━━━ */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        favoritesCount={favorites.length}
        compareCount={compareList.length}
      />

      {/* ━━━━━━━━ BODY WORKING SLATE ━━━━━━━━ */}
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          {activeTab === 'admin' ? (
            <AdminDashboard
              darkMode={darkMode}
              properties={properties}
              setProperties={setProperties}
              projects={projects}
              setProjects={setProjects}
              agents={agents}
              setAgents={setAgents}
              reviews={reviews}
              setReviews={setReviews}
              faqs={faqs}
              setFaqs={setFaqs}
              blogs={blogs}
              setBlogs={setBlogs}
              contactRequests={contactRequests}
              setContactRequests={setContactRequests}
              businessHours={businessHours}
              setBusinessHours={setBusinessHours}
              seoMetadata={seoMetadata}
              setSeoMetadata={setSeoMetadata}
            />
          ) : (
            // PUBLIC VISITOR VIEWS
            <div id="public-views" className="space-y-24 pb-20">
              
              {/* 1. HERO SECTION */}
              <section id="home" className="relative py-12 sm:py-20 lg:py-32 overflow-hidden flex items-center min-h-[85vh]">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
                    alt="Luxury Mansion Background"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-[0.25] dark:brightness-[0.15]"
                  />
                  {/* Subtle pulsing gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-transparent mix-blend-overlay" />
                  {/* Gold radial ambient light */}
                  <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-[#C8A951]/10 rounded-full blur-[120px] pointer-events-none" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Hero Left Content */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#C8A951]/10 border border-[#C8A951]/30 text-[#C8A951] text-[10px] font-mono tracking-widest uppercase font-bold"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>PREMIUM PROPERTY PORTFOLIO</span>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1] text-white"
                      >
                        Your Trusted Real <br />
                        Estate Partner in <span className="text-[#C8A951]">Karachi</span>
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-sm sm:text-base text-gray-300 max-w-xl font-sans font-light leading-relaxed"
                      >
                        Buying, Selling, Renting & Investment Solutions with Complete Transparency. Experience high-end property curation with deep legal verification.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                      >
                        <button
                          onClick={() => {
                            const el = document.getElementById('properties');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-6 py-3.5 rounded-xl bg-[#C8A951] hover:bg-white text-black hover:text-black text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#C8A951]/20 flex items-center space-x-2"
                        >
                          <span>Explore Properties</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        
                        <a
                          href="https://wa.me/923219876543?text=Hi%20Tauheed%20Estate%20Agency"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3.5 rounded-xl border border-white/20 hover:border-[#C8A951] text-white hover:text-[#C8A951] bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center space-x-2"
                        >
                          <MessageSquare className="w-4 h-4 text-emerald-400" />
                          <span>Contact on WhatsApp</span>
                        </a>
                      </motion.div>
                    </div>

                    {/* Hero Right: Floating Stat Cards */}
                    <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
                      <div className="grid grid-cols-2 gap-4 w-full max-w-sm relative z-10">
                        {[
                          { val: '500+', label: 'Elite Properties', desc: 'DHA, Clifton, Emaar', color: 'border-yellow-500/20' },
                          { val: '1200+', label: 'Happy Clients', desc: 'Overseas & Local', color: 'border-emerald-500/20' },
                          { val: '15+', label: 'Years Experience', desc: 'Proven Integrity', color: 'border-blue-500/20' },
                          { val: '4.9★', label: 'Google Rating', desc: '100% Secure Deals', color: 'border-red-500/20' },
                        ].map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 * idx }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`p-5 rounded-2xl border bg-black/60 backdrop-blur-md flex flex-col justify-between ${stat.color} shadow-2xl relative group overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-2xl sm:text-3xl font-mono font-black text-[#C8A951] block tracking-tight">
                              {stat.val}
                            </span>
                            <div>
                              <span className="text-xs font-bold font-display text-white block mt-2">
                                {stat.label}
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono block mt-0.5 uppercase">
                                {stat.desc}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* 2. ADVANCED PROPERTY SEARCH ENGINE */}
              <section id="search-engine" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-20">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`p-6 sm:p-8 rounded-[32px] border shadow-2xl relative overflow-hidden transition-all duration-500 ${
                    darkMode
                      ? 'bg-white/[0.03] border-white/10 shadow-black/60 backdrop-blur-2xl border-t-white/20 border-l-white/20'
                      : 'bg-white/90 border-black/5 shadow-slate-200 backdrop-blur-2xl border-t-white border-l-white'
                  }`}
                >
                  {/* Accent Header */}
                  <div className={`flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b ${
                    darkMode ? 'border-white/5' : 'border-black/5'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Search className="w-4.5 h-4.5 text-[#C8A951]" />
                      <h3 className={`font-display font-bold text-xs uppercase tracking-[0.2em] ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                        Advanced Property Search Engine
                      </h3>
                    </div>
                    <button
                      onClick={handleSearchReset}
                      className="text-[10px] font-mono text-gray-500 hover:text-[#C8A951] uppercase transition-colors font-semibold tracking-wider"
                    >
                      Reset Filter Criteria ↺
                    </button>
                  </div>

                  {/* Filter Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Location Keyword */}
                    <div className={`space-y-1.5 lg:border-r ${darkMode ? 'border-white/10' : 'border-black/5'} lg:pr-4`}>
                      <label className="text-[9px] text-[#C8A951] uppercase font-mono block font-bold tracking-[0.15em]">Location / Sector</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          placeholder="e.g. DHA, Clifton"
                          value={filterLocation}
                          onChange={(e) => setFilterLocation(e.target.value)}
                          className={`w-full pl-10 pr-3.5 py-3 border rounded-xl text-xs focus:outline-none focus:border-[#C8A951] transition-all ${
                            darkMode
                              ? 'bg-white/[0.04] border-white/10 text-white placeholder-gray-500 hover:bg-white/[0.06]'
                              : 'bg-slate-50 border-black/10 text-slate-900 placeholder-gray-400 hover:bg-slate-100'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Purpose Select */}
                    <div className={`space-y-1.5 lg:border-r ${darkMode ? 'border-white/10' : 'border-black/5'} lg:pr-4`}>
                      <label className="text-[9px] text-[#C8A951] uppercase font-mono block font-bold tracking-[0.15em]">Purpose</label>
                      <select
                        value={filterPurpose}
                        onChange={(e) => setFilterPurpose(e.target.value as any)}
                        className={`w-full px-3.5 py-3 border rounded-xl text-xs focus:outline-none focus:border-[#C8A951] transition-all ${
                          darkMode
                            ? 'bg-white/[0.04] border-white/10 text-gray-300 hover:bg-white/[0.06] [&_option]:bg-slate-950 [&_option]:text-white'
                            : 'bg-slate-50 border-black/10 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <option value="all">All Purposes (Buy / Rent)</option>
                        <option value="buy">For Sale</option>
                        <option value="rent">For Rent</option>
                      </select>
                    </div>

                    {/* Property Type Select */}
                    <div className={`space-y-1.5 lg:border-r ${darkMode ? 'border-white/10' : 'border-black/5'} lg:pr-4`}>
                      <label className="text-[9px] text-[#C8A951] uppercase font-mono block font-bold tracking-[0.15em]">Property Type</label>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className={`w-full px-3.5 py-3 border rounded-xl text-xs focus:outline-none focus:border-[#C8A951] transition-all ${
                          darkMode
                            ? 'bg-white/[0.04] border-white/10 text-gray-300 hover:bg-white/[0.06] [&_option]:bg-slate-950 [&_option]:text-white'
                            : 'bg-slate-50 border-black/10 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <option value="all">All Types</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Plot">Plot</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>

                    {/* Bedrooms Select */}
                    <div className={`space-y-1.5 lg:border-r ${darkMode ? 'border-white/10' : 'border-black/5'} lg:pr-4`}>
                      <label className="text-[9px] text-[#C8A951] uppercase font-mono block font-bold tracking-[0.15em]">Bedrooms</label>
                      <select
                        value={filterBeds}
                        onChange={(e) => setFilterBeds(e.target.value)}
                        className={`w-full px-3.5 py-3 border rounded-xl text-xs focus:outline-none focus:border-[#C8A951] transition-all ${
                          darkMode
                            ? 'bg-white/[0.04] border-white/10 text-gray-300 hover:bg-white/[0.06] [&_option]:bg-slate-950 [&_option]:text-white'
                            : 'bg-slate-50 border-black/10 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <option value="all">Any Beds</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4">4 Bedrooms</option>
                        <option value="5">5 Bedrooms</option>
                        <option value="5+">5+ Bedrooms</option>
                      </select>
                    </div>

                    {/* Maximum Price Slider */}
                    <div className="space-y-1.5 lg:pl-2">
                      <div className="flex justify-between items-baseline">
                        <label className="text-[9px] text-[#C8A951] uppercase font-mono block font-bold tracking-[0.15em]">Max Price</label>
                        <span className="text-[10px] font-mono text-[#C8A951] font-bold">
                          {formatPKRPrice(filterMaxPrice, 'buy')}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={100000}
                        max={500000000}
                        step={1000000}
                        value={filterMaxPrice}
                        onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
                        className="w-full accent-[#C8A951] h-1.5 rounded-lg bg-white/10 mt-3 cursor-pointer"
                      />
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* 3. FEATURED PROPERTIES GRID */}
              <section id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-[11px] font-mono font-bold text-[#C8A951] tracking-widest uppercase">
                    OUR SIGNATURE SELECTIONS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight">
                    Featured Properties in Karachi
                  </h2>
                  <p className="text-xs text-gray-500">
                    Sift through our highly validated collection of premier houses, plots, and apartments.
                  </p>
                </div>

                {filteredProperties.length === 0 ? (
                  <div className="text-center py-20 p-6 rounded-2xl border border-dashed border-gray-700/20 max-w-lg mx-auto space-y-3">
                    <ShieldAlert className="w-8 h-8 text-yellow-500 mx-auto" />
                    <h3 className="font-bold text-sm uppercase">No matching properties found</h3>
                    <p className="text-xs text-gray-400">
                      We currently don't have registered properties matching your exact search. Try resetting the location or price slider values.
                    </p>
                    <button
                      onClick={handleSearchReset}
                      className="px-4 py-2 bg-[#C8A951] text-black text-[10px] font-bold uppercase rounded-lg"
                    >
                      Reset Search Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((prop, idx) => (
                      <motion.div
                        key={prop.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                      >
                        <PropertyCard
                          property={prop}
                          darkMode={darkMode}
                          onQuickView={(p) => setSelectedProperty(p)}
                          isFavorite={favorites.includes(prop.id)}
                          onToggleFavorite={toggleFavorite}
                          isComparing={!!compareList.find(c => c.id === prop.id)}
                          onToggleCompare={toggleCompare}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>

              {/* 4. WHY CHOOSE US */}
              <section id="why-choose-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-[11px] font-mono font-bold text-[#C8A951] tracking-widest uppercase">
                    THE CORPORATE PROMISE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight">
                    Why Choose Tauheed Estate
                  </h2>
                  <p className="text-xs text-gray-500">
                    Why high-net-worth investors and families in Karachi trust us with their assets.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'Verified Properties', desc: '100% authenticated ownership verifications and land registry approvals on all listings.', icon: CheckCircle },
                    { title: 'Trusted Investment', desc: 'In-depth market rate reports and yield projections before you finalize any land.', icon: TrendingUp },
                    { title: 'Legal Assistance', desc: 'Complete conveyancing support, biometric registration help, and tax clearance.', icon: Award },
                    { title: 'Professional Agents', desc: 'Managed by licensed, experienced consultants committed to your complete satisfaction.', icon: Users },
                  ].map((card, idx) => {
                    const IconComponent = card.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/[0.02] border-white/5 hover:border-[#C8A951]/35 hover:bg-white/[0.04]'
                            : 'bg-white border border-black/5 shadow-md hover:border-[#C8A951]/20'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#C8A951]/10 flex items-center justify-center text-[#C8A951] mb-4">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-xs uppercase tracking-wide mb-2 text-white dark:text-white light:text-slate-900">
                            {card.title}
                          </h3>
                          <p className="text-xs text-gray-500 leading-relaxed font-sans">
                            {card.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* 5. PORTFOLIO LANDMARK PROJECTS */}
              <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono font-bold text-[#C8A951] tracking-widest uppercase">
                      PRESTIGIOUS DEVELOPMENTS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight">
                      Landmark Projects & High-Rises
                    </h2>
                    <p className="text-xs text-gray-500 max-w-md">
                      Off-market and newly launched gated communities and commercial developments in Karachi.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('properties')}
                    className="text-xs font-semibold text-[#C8A951] uppercase tracking-widest flex items-center space-x-1 hover:underline"
                  >
                    <span>View all listings</span>
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {projects.map((proj, idx) => (
                    <motion.div
                      key={proj.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                      whileHover={{ y: -8 }}
                      className={`rounded-2xl overflow-hidden border flex flex-col group transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/[0.02] border-white/5 hover:border-[#C8A951]/30 hover:shadow-[0_20px_40px_rgba(200,169,81,0.05)]'
                          : 'bg-white border-black/5 shadow-md hover:border-[#C8A951]/20'
                      }`}
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-[9px] font-mono font-bold uppercase bg-black text-[#C8A951] border border-[#C8A951]/30 rounded">
                            {proj.status}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[9px] text-[#C8A951] font-mono font-semibold uppercase tracking-widest block">
                            DEVELOPER: {proj.developer}
                          </span>
                          <h3 className="font-display font-bold text-sm uppercase tracking-wide text-white dark:text-white light:text-slate-900">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-gray-400 font-sans line-clamp-2 leading-relaxed">
                            {proj.description}
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-gray-700/10 flex justify-between items-center">
                          <div>
                            <span className="text-[9px] text-gray-500 block uppercase font-mono">Location</span>
                            <span className="text-xs text-gray-300 font-medium">{proj.location}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] text-gray-500 block uppercase font-mono">Pricing</span>
                            <span className="text-xs text-[#C8A951] font-bold font-mono">{proj.priceRange}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* 6. SERVICES */}
              <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-[11px] font-mono font-bold text-[#C8A951] tracking-widest uppercase">
                    OUR CORE SPECIALTIES
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight">
                    Professional Real Estate Services
                  </h2>
                  <p className="text-xs text-gray-500">
                    Comprehensive property curations, legal consultancies, and construction managements in Karachi.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: 'Property Acquisitions & Sales', desc: 'Secure high-value properties across Karachi with direct title deed verifications and transparent negotiation frameworks.', icon: Building2 },
                    { title: 'Commercial Real Estate', desc: 'Corporate office suites, retail structures, and raw industrial zones designed for maximum yields and corporate presence.', icon: Landmark },
                    { title: 'Maritime Coastal Rentals', desc: 'Secure sea-facing corporate flats and penthouses in Emaar Oceanfront or Clifton Block 4 with full standby energy grids.', icon: Sparkles },
                    { title: 'Legal & Conveyancing Services', desc: 'Corporate legal counsel on tax structures, bio-metric verifications, transfer filings, and bank mortgage allocations.', icon: FileText },
                    { title: 'Property Valuations', desc: 'Accurate architectural property valuation reports based on market rate trends, inflation models, and historical gains.', icon: Briefcase },
                    { title: 'Investment Consulting', desc: 'Elite capital investment planning to help overseas and local high-society families build bulletproof generational real estates.', icon: BankIcon },
                  ].map((svc, idx) => {
                    const IconComp = svc.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                        whileHover={{ y: -6, scale: 1.01 }}
                        className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/[0.02] border-white/5 hover:border-[#C8A951]/30 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_rgba(200,169,81,0.04)]'
                            : 'bg-white border-black/5 shadow-md hover:border-[#C8A951]/20 hover:shadow-black/5'
                        }`}
                      >
                        <div>
                          <div className="w-10 h-10 rounded-lg bg-[#C8A951]/10 flex items-center justify-center text-[#C8A951] mb-5">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <h3 className="font-display font-bold text-xs uppercase tracking-wide mb-3 text-white dark:text-white light:text-slate-900">
                            {svc.title}
                          </h3>
                          <p className="text-xs text-gray-500 leading-relaxed font-sans">
                            {svc.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* 7. ABOUT COMPANY & OFFICE GALLERY */}
              <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Story Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7 }}
                    className="lg:col-span-6 space-y-6"
                  >
                    <span className="text-[11px] font-mono font-bold text-[#C8A951] tracking-widest uppercase block">
                      OUR CORPORATE ANCESTRY
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white dark:text-white light:text-slate-900">
                      Tauheed Estate Agency Story
                    </h2>
                    
                    <p className="text-xs text-gray-400 font-sans leading-relaxed text-justify">
                      Established over 15 years ago in Karachi, Tauheed Estate Agency has grown into the city’s premier boutique real estate agency. Founded with a mission to bring corporate transparency, accountability, and legal rigor into a heavily fragmented brokerage environment, we have successfully completed over 250+ major high-value residential and commercial transfers.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#C8A951]/20 transition-all duration-300">
                        <span className="text-xs font-bold text-[#C8A951] uppercase font-display block">Our Mission</span>
                        <p className="text-[10px] text-gray-500 mt-1 font-sans">To make property acquisitions transparent, fully verified, and stress-free for global Pakistanis.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#C8A951]/20 transition-all duration-300">
                        <span className="text-xs font-bold text-[#C8A951] uppercase font-display block">Our Vision</span>
                        <p className="text-[10px] text-gray-500 mt-1 font-sans">To be the trusted real estate advisory for high-net-worth investments in coastal Pakistan.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#C8A951]/20 transition-all duration-300">
                        <span className="text-xs font-bold text-[#C8A951] uppercase font-display block">Core Values</span>
                        <p className="text-[10px] text-gray-500 mt-1 font-sans">Corporate integrity, absolute legal scrutiny, client confidentiality, and direct seller-buyer transfers.</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Office Gallery */}
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7 }}
                    className="lg:col-span-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <img
                          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80"
                          alt="Corporate Office Interior"
                          referrerPolicy="no-referrer"
                          className="rounded-2xl aspect-[4/5] object-cover border border-[#C8A951]/20 shadow-xl hover:scale-102 transition-transform duration-500 cursor-pointer"
                        />
                      </div>
                      <div className="space-y-4 pt-8">
                        <img
                          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80"
                          alt="Consultation Room"
                          referrerPolicy="no-referrer"
                          className="rounded-2xl aspect-[4/5] object-cover border border-[#C8A951]/20 shadow-xl hover:scale-102 transition-transform duration-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </motion.div>

                </div>
              </section>

              {/* 8. MEET OUR TEAM */}
              <section id="agents" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-[11px] font-mono font-bold text-[#C8A951] tracking-widest uppercase">
                    OUR PORTAL OF PROFESSIONALS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight">
                    Meet Our Advisor Board
                  </h2>
                  <p className="text-xs text-gray-500">
                    Direct access to licensed advisors specializing in DHA, Clifton, and maritime investments.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {agents.map((ag, idx) => (
                    <motion.div
                      key={ag.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      whileHover={{ y: -8 }}
                      className={`rounded-2xl overflow-hidden border relative flex flex-col group transition-all duration-300 ${
                        darkMode ? 'bg-white/[0.02] border-white/5 hover:border-[#C8A951]/30 hover:shadow-[0_20px_40px_rgba(200,169,81,0.04)]' : 'bg-white border border-black/5 shadow-md hover:border-[#C8A951]/20'
                      }`}
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-slate-900 relative">
                        <img
                          src={ag.photo}
                          alt={ag.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        {/* Text Overlay on image */}
                        <div className="absolute bottom-5 left-5 right-5 text-left space-y-1">
                          <span className="text-[10px] font-mono font-bold text-[#C8A951] tracking-widest uppercase block">
                            EXP: {ag.experience}
                          </span>
                          <h4 className="font-display font-bold text-sm text-white">
                            {ag.name}
                          </h4>
                          <p className="text-[11px] text-gray-300 font-mono">{ag.designation}</p>
                        </div>
                      </div>

                      {/* Contact panel */}
                      <div className="p-4 grid grid-cols-2 gap-2 mt-auto shrink-0 border-t border-gray-700/15">
                        <a
                          href={`tel:${ag.phone.replace(/\s+/g, '')}`}
                          className="flex items-center justify-center space-x-1.5 py-2.5 rounded-xl border border-[#C8A951]/40 hover:border-[#C8A951] text-[#C8A951] hover:text-black hover:bg-[#C8A951] text-[10px] font-semibold tracking-wider uppercase transition-all bg-transparent"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Direct Call</span>
                        </a>
                        <a
                          href={`https://wa.me/${ag.whatsapp}?text=Hi%20${ag.name},%20I%20am%20consulting%20via%20Tauheed%20Estate%20Agency`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-semibold tracking-wider uppercase transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* 9. TESTIMONIALS / GOOGLE REVIEWS */}
              <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-[11px] font-mono font-bold text-[#C8A951] tracking-widest uppercase">
                    CLIENT ACCOLADES
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight">
                    Google Reviews & Stories
                  </h2>
                  <div className="flex items-center justify-center space-x-1.5">
                    <span className="text-[#C8A951] font-mono text-sm font-bold">4.9 / 5.0 Rating</span>
                    <div className="flex text-[#C8A951]">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {reviews.map((rev, idx) => (
                    <motion.div
                      key={rev.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                        darkMode ? 'bg-white/[0.01] border-white/5 shadow-inner hover:border-[#C8A951]/20' : 'bg-white border border-black/5 shadow-md hover:border-[#C8A951]/20'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed font-sans italic text-justify">
                          "{rev.review}"
                        </p>
                      </div>

                      <div className="flex items-center space-x-3.5 mt-6 pt-4 border-t border-gray-700/10">
                        <img
                          src={rev.photo}
                          alt={rev.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-display font-semibold text-xs text-white dark:text-white light:text-slate-900">{rev.name}</h4>
                          <span className="text-[10px] text-gray-500 font-mono">{rev.location} • {rev.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* 10. REAL ESTATE BLOG */}
              <section id="blog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-[11px] font-mono font-bold text-[#C8A951] tracking-widest uppercase">
                    MARKET INTELLIGENCE REPORTS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight">
                    Latest Insights & Guides
                  </h2>
                  <p className="text-xs text-gray-500">
                    Keep track of federal budget tax changes, land zoning updates, and DHA valuation trends.
                  </p>
                </div>

                {/* Categories Tabs */}
                <div className="flex flex-wrap justify-center gap-2">
                  {['All', 'Market Trends', 'Buying Guide', 'Latest News'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedBlogCategory(cat as any)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-widest border transition-all ${
                        selectedBlogCategory === cat
                          ? 'bg-[#C8A951] border-[#C8A951] text-black font-bold shadow'
                          : darkMode
                          ? 'bg-white/5 border-white/5 text-gray-400 hover:border-[#C8A951]/30'
                          : 'bg-black/5 border-black/5 text-slate-600 hover:border-[#C8A951]/30'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filteredBlogs.map((post, idx) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                      whileHover={{ y: -8 }}
                      className={`rounded-2xl overflow-hidden border flex flex-col group transition-all duration-300 ${
                        darkMode ? 'bg-white/[0.02] border-white/5 hover:border-[#C8A951]/20' : 'bg-white border border-black/5 shadow-md'
                      }`}
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-slate-900 relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <span className="absolute top-4 left-4 bg-black text-[#C8A951] border border-[#C8A951]/20 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>

                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[9px] text-gray-500 font-mono uppercase block">
                            {post.date} • {post.readTime}
                          </span>
                          <h3 className="font-display font-bold text-xs uppercase tracking-wide text-white dark:text-white light:text-slate-900 group-hover:text-[#C8A951] transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-[11px] text-gray-400 font-sans line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Expanded details simulated using custom state modal */}
                        <div className="mt-5 pt-4 border-t border-gray-700/10 flex justify-end">
                          <button
                            onClick={() => setActiveBlogPost(post)}
                            className="text-[10px] font-mono font-bold uppercase text-[#C8A951] hover:underline flex items-center space-x-1"
                          >
                            <span>Read Full Insight</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* 11. FAQ ACCORDION */}
              <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center space-y-3">
                  <span className="text-[11px] font-mono font-bold text-[#C8A951] tracking-widest uppercase">
                    COMMON QUERY RESOLUTIONS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-4">
                  {faqs.map((item) => (
                    <details
                      key={item.id}
                      className={`group p-5 rounded-2xl border transition-all duration-300 [&_summary::-webkit-details-marker]:hidden ${
                        darkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-black/5 shadow-sm'
                      }`}
                    >
                      <summary className="flex justify-between items-center cursor-pointer focus:outline-none list-none">
                        <h4 className="font-display font-semibold text-xs uppercase tracking-wide text-white dark:text-white light:text-slate-900">
                          {item.question}
                        </h4>
                        <span className="transition-transform duration-300 group-open:rotate-180 text-[#C8A951]">
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </summary>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed mt-3.5 pt-3.5 border-t border-gray-700/10">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              {/* 12. CONTACT / APPOINTMENT PORTAL */}
              <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                  
                  {/* Left Form Panel */}
                  <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${
                    darkMode ? 'bg-[#0b0b0b]/80 border-white/10' : 'bg-white border-black/5 shadow-sm'
                  }`}>
                    <div className="space-y-3 mb-6">
                      <span className="text-[11px] font-mono font-bold text-[#C8A951] tracking-widest uppercase block">
                        SECURE INQUIRY CHANNEL
                      </span>
                      <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-white dark:text-white light:text-slate-900">
                        Schedule a Consultation
                      </h2>
                      <p className="text-xs text-gray-500">
                        Interested in buying or selling? Secure complete confidentiality.
                      </p>
                    </div>

                    {contactSubmitted ? (
                      <div className="text-center py-12 space-y-4">
                        <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                        <h3 className="font-display font-bold text-sm uppercase">Consultation Filed</h3>
                        <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                          Your query has been logged securely. Our Managing Director Muhammad Ali Shah or a senior investment consultant will coordinate with you via phone or secure biometrics channel.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-[#C8A951] text-white transition-all"
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-[#C8A951] text-white transition-all"
                          />
                        </div>
                        <input
                          type="tel"
                          placeholder="Phone / Mobile Number"
                          required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-[#C8A951] text-white transition-all"
                        />
                        <textarea
                          placeholder="Please describe your buying, selling, or rental query."
                          rows={4}
                          required
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-[#C8A951] text-white transition-all resize-none font-sans"
                        ></textarea>

                        <button
                          type="submit"
                          className="w-full py-4 bg-[#C8A951] text-black text-xs font-bold uppercase tracking-widest hover:bg-white rounded-xl transition-all shadow"
                        >
                          Transmit Secure Inquiry
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Right Coordinates Panel */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                    <div className={`p-6 rounded-3xl border flex-grow flex flex-col justify-between ${
                      darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'
                    }`}>
                      <div className="space-y-5 text-xs font-sans">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded bg-[#C8A951]/10 flex items-center justify-center text-[#C8A951]">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 block uppercase font-mono">Headquarters Location</span>
                            <span className="font-semibold text-white dark:text-white light:text-slate-900">Plot 23-C, Al-Tauheed Commercial, DHA Phase 6, Karachi</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded bg-[#C8A951]/10 flex items-center justify-center text-[#C8A951]">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 block uppercase font-mono">Operations Schedule</span>
                            <span className="font-semibold block text-white dark:text-white light:text-slate-900">{businessHours.weekday}</span>
                            <span className="text-gray-400 font-normal">{businessHours.weekend}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded bg-[#C8A951]/10 flex items-center justify-center text-[#C8A951]">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 block uppercase font-mono">Inquiries Hub</span>
                            <span className="font-semibold text-white dark:text-white light:text-slate-900">info@tauheedestate.com</span>
                          </div>
                        </div>
                      </div>

                      {/* Map area */}
                      <div className="mt-6 aspect-[16/9] w-full rounded-2xl relative overflow-hidden border border-gray-700/10">
                        {/* Static Elegant Map design */}
                        <div
                          style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.15,
                          }}
                          className="absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-1">
                          <Map className="w-7 h-7 text-[#C8A951] animate-bounce" />
                          <span className="font-display font-extrabold text-xs text-[#C8A951] uppercase">Tauheed Corporate Towers</span>
                          <span className="text-[9px] text-gray-500 font-mono">Al-Tauheed Commercial, DHA Phase 6, Karachi</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

            </div>
          )}
        </AnimatePresence>
      </main>

      {/* ━━━━━━━━ FOOTER ━━━━━━━━ */}
      <Footer darkMode={darkMode} setActiveTab={setActiveTab} />

      {/* ━━━━━━━━ INTERACTIVE SPECIALS MODALS/DRAWERS ━━━━━━━━ */}
      {/* 1. PROPERTY DETAILS OVERLAY MODAL */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          agent={agents.find(a => a.id === selectedProperty.agentId) || agents[0]}
          darkMode={darkMode}
          onClose={() => setSelectedProperty(null)}
          onSubmitVisitRequest={handleVisitSubmit}
        />
      )}

      {/* 2. FAVORITES SLIDE-OVER DRAWER */}
      <AnimatePresence>
        {isFavoritesOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFavoritesOpen(false)}
              className="absolute inset-0 bg-black/80"
            />
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`w-screen max-w-md border-l relative flex flex-col ${
                  darkMode ? 'bg-[#0c0c0c] border-white/10 text-white' : 'bg-white border-black/5 text-slate-900'
                }`}
              >
                <div className="p-6 border-b border-gray-700/20 flex justify-between items-center">
                  <h3 className="font-display font-bold text-xs uppercase tracking-widest text-[#C8A951] flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-[#C8A951]" />
                    <span>Saved Properties ({favorites.length})</span>
                  </h3>
                  <button onClick={() => setIsFavoritesOpen(false)} className="text-gray-500 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {favorites.length === 0 ? (
                    <div className="text-center text-gray-500 text-xs font-mono py-12">
                      No saved properties yet. Click the heart icon on cards to save.
                    </div>
                  ) : (
                    properties
                      .filter(p => favorites.includes(p.id))
                      .map(p => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between gap-3 p-3 rounded-lg border border-white/5 bg-white/5 text-xs"
                        >
                          <div
                            className="flex items-center space-x-2.5 cursor-pointer flex-grow"
                            onClick={() => {
                              setSelectedProperty(p);
                              setIsFavoritesOpen(false);
                            }}
                          >
                            <img src={p.image} alt="prop" className="w-10 h-8 object-cover rounded" />
                            <div className="truncate max-w-[180px]">
                              <span className="font-mono text-[#C8A951] font-bold block">{formatPKRPrice(p.price, p.purpose)}</span>
                              <span className="text-[10px] text-gray-400 block truncate">{p.title}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleFavorite(p.id)}
                            className="text-red-500 p-1 hover:bg-red-500/10 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. COMPARE SIDE-BY-SIDE OVERLAY DRAWER */}
      <AnimatePresence>
        {isCompareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-4xl rounded-2xl overflow-hidden border p-6 z-10 ${
                darkMode ? 'bg-[#090909] border-white/10 text-white' : 'bg-white border-black/5 text-slate-900'
              }`}
            >
              <div className="flex justify-between items-center border-b border-gray-700/20 pb-4 mb-6">
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-[#C8A951] flex items-center space-x-2">
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>Compare Properties ({compareList.length}/3)</span>
                </h3>
                <button onClick={() => setIsCompareOpen(false)} className="text-gray-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {compareList.length === 0 ? (
                <p className="text-center text-gray-500 text-xs font-mono py-12">
                  No properties added to compare. Use the exchange icon on property cards.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {compareList.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-white/5 bg-white/5 relative flex flex-col justify-between text-xs space-y-4">
                      <button
                        onClick={() => toggleCompare(p)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-gray-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="space-y-2">
                        <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover rounded" />
                        <span className="font-mono text-sm font-bold text-[#C8A951] block">
                          {formatPKRPrice(p.price, p.purpose)}
                        </span>
                        <h4 className="font-display font-semibold text-[11px] uppercase tracking-wide truncate">{p.title}</h4>
                      </div>

                      <div className="space-y-2 text-[10px] font-mono border-t border-gray-700/10 pt-3">
                        <div className="flex justify-between"><span className="text-gray-500">TYPE:</span><span>{p.type}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">LOCATION:</span><span>{p.location}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">AREA:</span><span>{p.area}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">BEDROOMS:</span><span>{p.bedrooms || 'N/A'}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">BATHS:</span><span>{p.bathrooms || 'N/A'}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">GARAGE:</span><span>{p.garage || 'None'}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">STATUS:</span><span className="text-emerald-400">{p.status}</span></div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedProperty(p);
                          setIsCompareOpen(false);
                        }}
                        className="w-full py-2 border border-[#C8A951]/40 hover:border-[#C8A951] text-[#C8A951] text-[10px] font-bold uppercase rounded-lg tracking-widest mt-2"
                      >
                        View details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Luxury Blog Article Reader Modal */}
        {activeBlogPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBlogPost(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-2xl max-h-[85vh] rounded-3xl overflow-y-auto border p-6 sm:p-8 z-10 scrollbar-none ${
                darkMode ? 'bg-[#060606] border-white/10 text-white' : 'bg-white border-black/5 text-slate-900'
              }`}
            >
              <button
                onClick={() => setActiveBlogPost(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#C8A951] text-gray-400 hover:text-white transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div className="space-y-2 text-left">
                  <span className="text-[10px] text-[#C8A951] font-mono font-bold tracking-widest uppercase block">
                    {activeBlogPost.category} • {activeBlogPost.readTime}
                  </span>
                  <h2 className="font-display font-bold text-lg sm:text-xl uppercase tracking-tight leading-snug">
                    {activeBlogPost.title}
                  </h2>
                  <span className="text-[10px] text-gray-500 font-sans block">Published on {activeBlogPost.date} by Tauheed Research Board</span>
                </div>

                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900">
                  <img src={activeBlogPost.image} alt={activeBlogPost.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>

                <p className="text-xs text-gray-400 font-sans leading-relaxed text-justify whitespace-pre-line border-t border-gray-700/10 pt-6">
                  {activeBlogPost.content}
                </p>

                <div className="border-t border-gray-700/10 pt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#C8A951]/10 flex items-center justify-center text-[#C8A951] font-display font-bold text-xs">
                      TE
                    </div>
                    <div className="text-left">
                      <h4 className="text-[11px] font-bold font-display uppercase tracking-wide">Tauheed Estate Board</h4>
                      <p className="text-[9px] text-gray-500">Corporate Intelligence Dept</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveBlogPost(null);
                      setActiveTab('contact');
                      setTimeout(() => {
                        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-4 py-2 bg-[#C8A951] text-black text-[10px] font-bold uppercase rounded-lg tracking-widest hover:bg-white transition-all"
                  >
                    Discuss With Advisor
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━ STICKY CORNER FLOATING CALLS ━━━━━━━━ */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 pointer-events-auto">
        {/* Floating Call */}
        <a
          id="floating-call-btn"
          href="tel:+923219876543"
          className="w-12 h-12 rounded-full bg-[#C8A951] hover:bg-white text-black flex items-center justify-center shadow-2xl transition-all duration-300 relative group"
          title="Call Now"
        >
          <span className="absolute inset-0 rounded-full border border-[#C8A951] animate-ping opacity-40" />
          <Phone className="w-5 h-5 group-hover:scale-105" />
        </a>

        {/* Floating WhatsApp */}
        <a
          id="floating-whatsapp-btn"
          href="https://wa.me/923219876543?text=Hi%20Tauheed%20Estate%20Agency"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition-all duration-300 relative group"
          title="WhatsApp Chat"
        >
          <span className="absolute inset-0 rounded-full border border-emerald-600 animate-ping opacity-40" />
          <MessageSquare className="w-5 h-5 group-hover:scale-105" />
        </a>
      </div>
    </div>
  );
}

// Custom trash helper
function Trash2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
