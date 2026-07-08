import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Landmark, LayoutDashboard, Building2, Users, FileText, HelpCircle, Mail, Clock, ShieldCheck, Plus, Trash2, Edit2, LogOut, Check, X, Eye, Settings, Key, Star } from 'lucide-react';
import { Property, Project, Agent, Review, FAQ, BlogPost, ContactRequest, BusinessHours, SEOMetadata } from '../types';
import { formatPKRPrice } from './PropertyCard';

interface AdminDashboardProps {
  darkMode: boolean;
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  agents: Agent[];
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  faqs: FAQ[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQ[]>>;
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  contactRequests: ContactRequest[];
  setContactRequests: React.Dispatch<React.SetStateAction<ContactRequest[]>>;
  businessHours: BusinessHours;
  setBusinessHours: (bh: BusinessHours) => void;
  seoMetadata: SEOMetadata;
  setSeoMetadata: (seo: SEOMetadata) => void;
}

export default function AdminDashboard({
  darkMode,
  properties,
  setProperties,
  projects,
  setProjects,
  agents,
  setAgents,
  reviews,
  setReviews,
  faqs,
  setFaqs,
  blogs,
  setBlogs,
  contactRequests,
  setContactRequests,
  businessHours,
  setBusinessHours,
  seoMetadata,
  setSeoMetadata,
}: AdminDashboardProps) {
  // Login State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('tauheed_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab State
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'properties' | 'projects' | 'team' | 'contacts' | 'config'>('overview');

  // Form States (Adding/Editing)
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [propertyForm, setPropertyForm] = useState<Omit<Property, 'id'>>({
    title: '',
    price: 30000000,
    location: '',
    purpose: 'buy',
    type: 'House',
    bedrooms: 4,
    bathrooms: 4,
    garage: 1,
    area: '500 Sq. Yds',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    virtualTourUrl: '360-active',
    featured: false,
    status: 'Available',
    agentId: 'agent-1',
    description: '',
    yearBuilt: '2025',
    amenities: ['Smart Home Automation', 'Maid Room', 'Basement Parking']
  });

  // Project Form
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    status: 'Under Construction',
    location: '',
    priceRange: '',
    developer: ''
  });

  // Agent Form
  const [isAddingAgent, setIsAddingAgent] = useState(false);
  const [agentForm, setAgentForm] = useState<Omit<Agent, 'id'>>({
    name: '',
    designation: '',
    experience: '',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    phone: '',
    whatsapp: '',
    facebook: '#',
    instagram: '#',
    linkedin: '#'
  });

  // FAQ Form
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [faqForm, setFaqForm] = useState<Omit<FAQ, 'id'>>({
    question: '',
    answer: ''
  });

  // Blog Form
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [blogForm, setBlogForm] = useState<Omit<BlogPost, 'id'>>({
    title: '',
    category: 'Latest News',
    date: 'Today',
    readTime: '5 Mins Read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    excerpt: '',
    content: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'tauheed123') {
      setIsAuthenticated(true);
      setLoginError('');
      localStorage.setItem('tauheed_admin_auth', 'true');
    } else {
      setLoginError('Invalid Username or Security Key.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('tauheed_admin_auth');
  };

  // ━━━━━━━━ PROPERTIES CMS ACTIONS ━━━━━━━━
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyForm.title || !propertyForm.location) return;

    if (editingPropertyId) {
      setProperties(prev =>
        prev.map(p => (p.id === editingPropertyId ? { ...p, ...propertyForm } : p))
      );
      setEditingPropertyId(null);
    } else {
      const newProp: Property = {
        id: `prop-${Date.now()}`,
        ...propertyForm
      };
      setProperties(prev => [newProp, ...prev]);
    }
    setIsAddingProperty(false);
    // Reset
    setPropertyForm({
      title: '',
      price: 30000000,
      location: '',
      purpose: 'buy',
      type: 'House',
      bedrooms: 4,
      bathrooms: 4,
      garage: 1,
      area: '500 Sq. Yds',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      virtualTourUrl: '360-active',
      featured: false,
      status: 'Available',
      agentId: 'agent-1',
      description: '',
      yearBuilt: '2025',
      amenities: ['Smart Home Automation']
    });
  };

  const handleEditProperty = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setPropertyForm(prop);
    setIsAddingProperty(true);
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm('Are you sure you want to delete this property from the public registry?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  // ━━━━━━━━ PROJECTS CMS ACTIONS ━━━━━━━━
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.location) return;

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      ...projectForm
    };
    setProjects(prev => [newProj, ...prev]);
    setIsAddingProject(false);
    setProjectForm({
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
      status: 'Under Construction',
      location: '',
      priceRange: '',
      developer: ''
    });
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this development project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  // ━━━━━━━━ AGENTS CMS ACTIONS ━━━━━━━━
  const handleSaveAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentForm.name || !agentForm.designation) return;

    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      ...agentForm
    };
    setAgents(prev => [...prev, newAgent]);
    setIsAddingAgent(false);
    setAgentForm({
      name: '',
      designation: '',
      experience: '',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      phone: '',
      whatsapp: '',
      facebook: '#',
      instagram: '#',
      linkedin: '#'
    });
  };

  const handleDeleteAgent = (id: string) => {
    if (confirm('Are you sure you want to retire this agent?')) {
      setAgents(prev => prev.filter(a => a.id !== id));
    }
  };

  // ━━━━━━━━ FAQ CMS ACTIONS ━━━━━━━━
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) return;

    const newFaq: FAQ = {
      id: `faq-${Date.now()}`,
      ...faqForm
    };
    setFaqs(prev => [...prev, newFaq]);
    setIsAddingFaq(false);
    setFaqForm({ question: '', answer: '' });
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  // ━━━━━━━━ BLOG CMS ACTIONS ━━━━━━━━
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) return;

    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      ...blogForm
    };
    setBlogs(prev => [newBlog, ...prev]);
    setIsAddingBlog(false);
    setBlogForm({
      title: '',
      category: 'Latest News',
      date: 'Today',
      readTime: '5 Mins Read',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      excerpt: '',
      content: ''
    });
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  // ━━━━━━━━ CONTACTS MANAGEMENT ━━━━━━━━
  const handleUpdateContactStatus = (id: string, newStatus: 'New' | 'Contacted' | 'Archived') => {
    setContactRequests(prev =>
      prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleDeleteContact = (id: string) => {
    setContactRequests(prev => prev.filter(c => c.id !== id));
  };

  // UN-AUTHENTICATED: LOGIN VIEW
  if (!isAuthenticated) {
    return (
      <div id="admin-login-screen" className="flex items-center justify-center py-20 px-4 min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-full max-w-md p-8 rounded-2xl border ${
            darkMode
              ? 'bg-[#0e0e0e] border-white/10 shadow-[0_10px_40px_rgba(200,169,81,0.05)]'
              : 'bg-white border-black/5 shadow-xl'
          }`}
        >
          <div className="text-center mb-8 space-y-2">
            <div className="w-12 h-12 rounded-lg bg-[#C8A951]/10 flex items-center justify-center text-[#C8A951] mx-auto">
              <Key className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className={`font-display font-extrabold text-lg uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Corporate Portal Gate
            </h2>
            <p className="text-[10px] font-mono text-[#C8A951] uppercase tracking-widest font-bold">
              Tauheed Estate Agency Staff Login
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] text-gray-500 font-mono uppercase block mb-1">Username ID</label>
              <input
                type="text"
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-[#C8A951] transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-500 font-mono uppercase block mb-1">Security Key / Password</label>
              <input
                type="password"
                placeholder="e.g. tauheed123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-[#C8A951] transition-all"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 font-semibold text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#C8A951] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow"
            >
              Verify Security clearance
            </button>
          </form>

          {/* Quick instructions so the user knows the passcode */}
          <div className="mt-6 p-4 rounded-lg bg-[#C8A951]/5 border border-[#C8A951]/10 text-center text-[11px] text-gray-500">
            <span className="font-bold text-[#C8A951]">Default Credentials:</span>
            <div className="font-mono mt-1">Username: <span className="text-[#C8A951]">admin</span></div>
            <div className="font-mono">Password: <span className="text-[#C8A951]">tauheed123</span></div>
          </div>
        </motion.div>
      </div>
    );
  }

  // AUTHENTICATED: DASHBOARD SHELL
  return (
    <div id="admin-main-panel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Control Panel / Tabs */}
        <div className="lg:w-1/4 space-y-6">
          <div className={`p-5 rounded-2xl border ${
            darkMode ? 'bg-[#0c0c0c] border-white/10' : 'bg-slate-50 border-black/5'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-[#C8A951] flex items-center justify-center text-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-display font-bold text-xs uppercase ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Ali Shah Portal
                </h3>
                <span className="text-[9px] font-mono font-extrabold text-[#C8A951] uppercase tracking-wider block">
                  ROLE: Administrator
                </span>
              </div>
            </div>

            {/* Nav Tabs */}
            <div className="space-y-1">
              {[
                { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
                { id: 'properties', label: 'Manage Properties', icon: Building2 },
                { id: 'projects', label: 'Manage Projects', icon: Landmark },
                { id: 'team', label: 'Manage Advisors', icon: Users },
                { id: 'contacts', label: 'Client Messages', icon: Mail, badge: contactRequests.filter(c => c.status === 'New').length },
                { id: 'config', label: 'System Configuration', icon: Settings },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAdminTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all ${
                      activeAdminTab === tab.id
                        ? 'bg-[#C8A951] text-black font-bold'
                        : darkMode
                        ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                        : 'text-slate-600 hover:bg-black/5 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <IconComponent className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge && tab.badge > 0 ? (
                      <span className="w-5 h-5 rounded-full bg-red-500 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                        {tab.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 mt-8 py-2.5 rounded-lg border border-red-500/20 text-red-500 text-xs font-semibold uppercase hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out Secure Portal</span>
            </button>
          </div>
        </div>

        {/* Right Dynamic CMS Working Area */}
        <div className="lg:w-3/4">
          <AnimatePresence mode="wait">
            {/* 1. OVERVIEW TAB */}
            {activeAdminTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#C8A951]">
                    Operational Overview
                  </h2>
                  <p className="text-xs text-gray-400">
                    Real-time state stats and client communication pipelines
                  </p>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-xl border text-center ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'}`}>
                    <span className="text-gray-400 text-[10px] uppercase font-mono block">Registered Listings</span>
                    <span className="text-2xl font-bold font-mono text-[#C8A951] mt-1 block">{properties.length}</span>
                  </div>
                  <div className={`p-4 rounded-xl border text-center ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'}`}>
                    <span className="text-gray-400 text-[10px] uppercase font-mono block">Corporate Projects</span>
                    <span className="text-2xl font-bold font-mono text-white mt-1 block">{projects.length}</span>
                  </div>
                  <div className={`p-4 rounded-xl border text-center ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'}`}>
                    <span className="text-gray-400 text-[10px] uppercase font-mono block">Client Requests</span>
                    <span className="text-2xl font-bold font-mono text-white mt-1 block">{contactRequests.length}</span>
                  </div>
                  <div className={`p-4 rounded-xl border text-center ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'}`}>
                    <span className="text-gray-400 text-[10px] uppercase font-mono block">Active Agents</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">{agents.length}</span>
                  </div>
                </div>

                {/* Recent Leads */}
                <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-[#0b0b0b] border-white/10' : 'bg-white border-black/5 shadow-sm'}`}>
                  <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-[#C8A951]">
                    Pending Leads & Inquiries
                  </h3>

                  {contactRequests.length === 0 ? (
                    <p className="text-xs text-gray-500 font-mono py-8 text-center">No active contact requests registered yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {contactRequests.slice(0, 4).map((req) => (
                        <div
                          key={req.id}
                          className={`p-3 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-3 ${
                            darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'
                          }`}
                        >
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold">{req.name}</span>
                              <span className="text-gray-500 text-[10px] font-mono">({req.phone})</span>
                              {req.propertyTitle && (
                                <span className="text-[#C8A951] text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C8A951]/10">
                                  {req.propertyTitle.substring(0, 30)}...
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-[11px] mt-1 font-sans">{req.message}</p>
                            <span className="text-[9px] text-gray-500 font-mono mt-1 block">{req.date}</span>
                          </div>

                          <div className="flex space-x-1.5">
                            {req.status === 'New' && (
                              <button
                                onClick={() => handleUpdateContactStatus(req.id, 'Contacted')}
                                className="px-2.5 py-1 bg-[#C8A951] text-black text-[10px] font-mono rounded hover:bg-white font-bold"
                              >
                                Mark Contacted
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteContact(req.id)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 2. PROPERTIES CMS */}
            {activeAdminTab === 'properties' && (
              <motion.div
                key="properties"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#C8A951]">
                      Property Registry
                    </h2>
                    <p className="text-xs text-gray-400">
                      Instantly publish, edit, or delete listings from the system
                    </p>
                  </div>
                  {!isAddingProperty && (
                    <button
                      onClick={() => setIsAddingProperty(true)}
                      className="px-4 py-2.5 bg-[#C8A951] text-black text-xs font-bold uppercase tracking-widest hover:bg-white rounded-xl transition-all shadow flex items-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Property</span>
                    </button>
                  )}
                </div>

                {isAddingProperty ? (
                  <form onSubmit={handleSaveProperty} className={`p-6 rounded-2xl border space-y-4 ${
                    darkMode ? 'bg-[#0d0d0d] border-white/10' : 'bg-slate-50 border-black/5'
                  }`}>
                    <div className="flex justify-between items-center border-b border-gray-700/20 pb-3">
                      <h3 className="text-xs uppercase font-bold text-[#C8A951] font-mono tracking-wider">
                        {editingPropertyId ? 'Modify Property Details' : 'Publish New Property'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingProperty(false);
                          setEditingPropertyId(null);
                        }}
                        className="text-gray-500 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono block">Title Heading</label>
                        <input
                          type="text"
                          required
                          value={propertyForm.title}
                          onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono block">Price (PKR)</label>
                        <input
                          type="number"
                          required
                          value={propertyForm.price}
                          onChange={(e) => setPropertyForm({ ...propertyForm, price: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-white mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono block">Location / Block</label>
                        <input
                          type="text"
                          required
                          value={propertyForm.location}
                          onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                          placeholder="e.g. DHA Phase 8, Karachi"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono block">Purpose</label>
                        <select
                          value={propertyForm.purpose}
                          onChange={(e) => setPropertyForm({ ...propertyForm, purpose: e.target.value as any })}
                          className="w-full px-2 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-gray-400 mt-1"
                        >
                          <option value="buy">For Sale</option>
                          <option value="rent">For Rent</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono block">Property Type</label>
                        <select
                          value={propertyForm.type}
                          onChange={(e) => setPropertyForm({ ...propertyForm, type: e.target.value as any })}
                          className="w-full px-2 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-gray-400 mt-1"
                        >
                          <option value="House">House</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Plot">Plot</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono block">Bedrooms</label>
                        <input
                          type="number"
                          value={propertyForm.bedrooms}
                          onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono block">Bathrooms</label>
                        <input
                          type="number"
                          value={propertyForm.bathrooms}
                          onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono block">Garage Spaces</label>
                        <input
                          type="number"
                          value={propertyForm.garage}
                          onChange={(e) => setPropertyForm({ ...propertyForm, garage: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono block">Area (e.g. 500 Sq Yds)</label>
                        <input
                          type="text"
                          value={propertyForm.area}
                          onChange={(e) => setPropertyForm({ ...propertyForm, area: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-white mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono block">Featured Cover Image URL</label>
                        <input
                          type="text"
                          value={propertyForm.image}
                          onChange={(e) => setPropertyForm({ ...propertyForm, image: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono block">Assigned Consultant Agent</label>
                        <select
                          value={propertyForm.agentId}
                          onChange={(e) => setPropertyForm({ ...propertyForm, agentId: e.target.value })}
                          className="w-full px-2 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-gray-400 mt-1"
                        >
                          {agents.map(a => (
                            <option key={a.id} value={a.id}>{a.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-mono block">Description Narrative</label>
                      <textarea
                        rows={3}
                        value={propertyForm.description}
                        onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] text-white mt-1 resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#C8A951] text-black text-xs font-bold uppercase tracking-widest hover:bg-white rounded-lg transition-all"
                    >
                      {editingPropertyId ? 'Save Modifications' : 'Publish Property Listing'}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3">
                    {properties.map((prop) => (
                      <div
                        key={prop.id}
                        className={`p-4 rounded-xl border flex justify-between items-center text-xs ${
                          darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={prop.image}
                            alt={prop.title}
                            referrerPolicy="no-referrer"
                            className="w-12 h-10 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-bold text-[#C8A951]">{formatPKRPrice(prop.price, prop.purpose)}</h4>
                            <p className="text-gray-400 font-sans">{prop.title.substring(0, 50)}...</p>
                            <span className="text-[9px] font-mono text-gray-500">{prop.location} • {prop.type}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProperty(prop)}
                            className="p-2 bg-[#C8A951]/10 text-[#C8A951] hover:bg-[#C8A951] hover:text-black rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(prop.id)}
                            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* 3. PROJECTS CMS */}
            {activeAdminTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#C8A951]">
                      Real Estate Projects
                    </h2>
                    <p className="text-xs text-gray-400">
                      Manage large landmark structural listings and developer profiles
                    </p>
                  </div>
                  {!isAddingProject && (
                    <button
                      onClick={() => setIsAddingProject(true)}
                      className="px-4 py-2 bg-[#C8A951] text-black text-xs font-bold uppercase hover:bg-white rounded-lg flex items-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project</span>
                    </button>
                  )}
                </div>

                {isAddingProject ? (
                  <form onSubmit={handleSaveProject} className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono">Project Title</label>
                        <input
                          type="text"
                          required
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-xs mt-1 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono">Location</label>
                        <input
                          type="text"
                          required
                          value={projectForm.location}
                          onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                          className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-xs mt-1 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-mono">Developer Entity</label>
                      <input
                        type="text"
                        required
                        value={projectForm.developer}
                        onChange={(e) => setProjectForm({ ...projectForm, developer: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-xs mt-1 text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#C8A951] text-black font-bold uppercase rounded text-xs mt-4"
                    >
                      Save Landmark Project
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3">
                    {projects.map(proj => (
                      <div key={proj.id} className="p-3.5 rounded-xl border border-white/5 bg-white/5 flex justify-between items-center text-xs">
                        <div>
                          <h4 className="font-bold text-[#C8A951]">{proj.title}</h4>
                          <p className="text-gray-400">{proj.developer}</p>
                          <span className="text-[9px] text-gray-500">{proj.location} • {proj.status}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* 4. TEAM CMS */}
            {activeAdminTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#C8A951]">
                      Agency Advising Board
                    </h2>
                    <p className="text-xs text-gray-400">
                      Manage real estate consultants and public contact handles
                    </p>
                  </div>
                  {!isAddingAgent && (
                    <button
                      onClick={() => setIsAddingAgent(true)}
                      className="px-4 py-2 bg-[#C8A951] text-black text-xs font-bold uppercase hover:bg-white rounded-lg flex items-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Advisor</span>
                    </button>
                  )}
                </div>

                {isAddingAgent ? (
                  <form onSubmit={handleSaveAgent} className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-mono">Agent Full Name</label>
                      <input
                        type="text"
                        required
                        value={agentForm.name}
                        onChange={(e) => setAgentForm({ ...agentForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-xs mt-1 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono">Designation Role</label>
                        <input
                          type="text"
                          required
                          value={agentForm.designation}
                          onChange={(e) => setAgentForm({ ...agentForm, designation: e.target.value })}
                          className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-xs mt-1 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-mono">Experience Years</label>
                        <input
                          type="text"
                          required
                          value={agentForm.experience}
                          onChange={(e) => setAgentForm({ ...agentForm, experience: e.target.value })}
                          className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-xs mt-1 text-white"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#C8A951] text-black font-bold uppercase rounded text-xs mt-4"
                    >
                      Register Professional Advisor
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3">
                    {agents.map(ag => (
                      <div key={ag.id} className="p-3.5 rounded-xl border border-white/5 bg-white/5 flex justify-between items-center text-xs">
                        <div className="flex items-center space-x-3">
                          <img src={ag.photo} alt={ag.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <h4 className="font-bold text-white">{ag.name}</h4>
                            <p className="text-gray-400 text-[11px] font-mono">{ag.designation}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteAgent(ag.id)}
                          className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* 5. CLIENT LEADS (MESSAGES) */}
            {activeAdminTab === 'contacts' && (
              <motion.div
                key="contacts"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#C8A951]">
                    Leads & Communication Channels
                  </h2>
                  <p className="text-xs text-gray-400">
                    Process booked property consultations and biometrics registration requests
                  </p>
                </div>

                <div className="space-y-3">
                  {contactRequests.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 font-mono text-xs border border-dashed border-gray-700/30 rounded-xl">
                      No customer leads have been captured in the browser session yet.
                    </div>
                  ) : (
                    contactRequests.map((req) => (
                      <div
                        key={req.id}
                        className={`p-5 rounded-xl border relative flex flex-col justify-between text-xs gap-4 ${
                          req.status === 'New'
                            ? 'bg-[#C8A951]/5 border-[#C8A951]/20'
                            : darkMode
                            ? 'bg-white/5 border-white/5'
                            : 'bg-slate-50 border-black/5'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-sm text-white">{req.name}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-[#C8A951]">
                                STATUS: {req.status}
                              </span>
                            </div>
                            <div className="text-[11px] text-gray-400 mt-1 font-mono">
                              Email: <a href={`mailto:${req.email}`} className="underline text-gray-300">{req.email || 'N/A'}</a> | Phone: {req.phone}
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono">{req.date}</span>
                        </div>

                        {req.propertyTitle && (
                          <div className="p-2.5 rounded bg-black/40 text-[11px] font-mono border border-white/5">
                            <span className="text-[#C8A951] font-semibold">TARGET LISTING:</span> {req.propertyTitle}
                          </div>
                        )}

                        <p className="text-xs text-gray-300 bg-black/20 p-3 rounded font-sans leading-relaxed">
                          {req.message}
                        </p>

                        <div className="flex justify-end gap-2 border-t border-gray-700/10 pt-3 mt-1">
                          {req.status !== 'Contacted' && (
                            <button
                              onClick={() => handleUpdateContactStatus(req.id, 'Contacted')}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] rounded"
                            >
                              ✓ Contacted Lead
                            </button>
                          )}
                          {req.status !== 'Archived' && (
                            <button
                              onClick={() => handleUpdateContactStatus(req.id, 'Archived')}
                              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white font-mono text-[10px] rounded"
                            >
                              Archive
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteContact(req.id)}
                            className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-mono text-[10px] rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* 6. SYSTEM CONFIGURATION */}
            {activeAdminTab === 'config' && (
              <motion.div
                key="config"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#C8A951]">
                    System Configuration
                  </h2>
                  <p className="text-xs text-gray-400">
                    Configure corporate business profiles, metadata parameters, and FAQ sets
                  </p>
                </div>

                {/* SEO Configuration */}
                <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'}`}>
                  <h3 className="font-display font-bold text-xs uppercase text-[#C8A951] flex items-center gap-1.5">
                    <Settings className="w-4 h-4" /> SEO Metadata Engine
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-mono block">Site Title</label>
                      <input
                        type="text"
                        value={seoMetadata.title}
                        onChange={(e) => setSeoMetadata({ ...seoMetadata, title: e.target.value })}
                        className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-xs mt-1 text-white focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-mono block">Meta Description</label>
                      <textarea
                        rows={2}
                        value={seoMetadata.description}
                        onChange={(e) => setSeoMetadata({ ...seoMetadata, description: e.target.value })}
                        className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-xs mt-1 text-white focus:outline-none focus:border-[#C8A951] resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* FAQ CMS */}
                <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'}`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-display font-bold text-xs uppercase text-[#C8A951] flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" /> FAQ Registry Setup
                    </h3>
                    <button
                      onClick={() => setIsAddingFaq(!isAddingFaq)}
                      className="px-2.5 py-1 bg-[#C8A951] text-black font-mono text-[10px] font-bold rounded hover:bg-white"
                    >
                      {isAddingFaq ? 'Close' : '+ Add Question'}
                    </button>
                  </div>

                  {isAddingFaq && (
                    <form onSubmit={handleSaveFaq} className="p-4 rounded bg-black/40 border border-white/10 space-y-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Frequently Asked Question"
                          required
                          value={faqForm.question}
                          onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                          className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <textarea
                          placeholder="Comprehensive response"
                          rows={2}
                          required
                          value={faqForm.answer}
                          onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                          className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-xs text-white resize-none"
                        ></textarea>
                      </div>
                      <button type="submit" className="px-3 py-1 bg-[#C8A951] text-black text-xs font-mono rounded">
                        Publish Question
                      </button>
                    </form>
                  )}

                  <div className="space-y-2">
                    {faqs.map(f => (
                      <div key={f.id} className="p-3 bg-black/20 rounded flex justify-between items-start text-xs">
                        <div>
                          <p className="font-bold text-white">Q: {f.question}</p>
                          <p className="text-gray-400 mt-1 font-sans">{f.answer}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteFaq(f.id)}
                          className="text-red-500 p-1 hover:bg-red-500/10 rounded shrink-0 ml-3"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Hours */}
                <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'}`}>
                  <h3 className="font-display font-bold text-xs uppercase text-[#C8A951] flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Office Operation Hours
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-mono">Weekdays (Mon-Fri)</label>
                      <input
                        type="text"
                        value={businessHours.weekday}
                        onChange={(e) => setBusinessHours({ ...businessHours, weekday: e.target.value })}
                        className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-xs mt-1 text-white focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-mono">Weekends (Sat-Sun)</label>
                      <input
                        type="text"
                        value={businessHours.weekend}
                        onChange={(e) => setBusinessHours({ ...businessHours, weekend: e.target.value })}
                        className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-xs mt-1 text-white focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
