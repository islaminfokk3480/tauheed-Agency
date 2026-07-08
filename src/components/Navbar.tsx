import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Phone, MessageSquare, Menu, X, Landmark } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenFavorites: () => void;
  onOpenCompare: () => void;
  favoritesCount: number;
  compareCount: number;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  activeTab,
  setActiveTab,
  onOpenFavorites,
  onOpenCompare,
  favoritesCount,
  compareCount,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'properties', label: 'Properties' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? darkMode
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/20'
            : 'bg-white/80 backdrop-blur-md border-b border-black/5 py-3 shadow-lg shadow-black/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 border-2 border-[#C8A951] rounded-lg flex items-center justify-center font-bold text-[#C8A951] text-xl tracking-tight transition-all duration-300 group-hover:bg-[#C8A951]/10 group-hover:scale-105">
              T
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold tracking-[0.2em] leading-none transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                TAUHEED
              </span>
              <span className="text-[10px] tracking-[0.4em] text-[#C8A951] font-medium uppercase font-display mt-1">
                ESTATE AGENCY
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div id="desktop-menu" className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id !== 'home') {
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`px-3 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all duration-300 relative ${
                  activeTab === item.id
                    ? 'text-[#C8A951]'
                    : darkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C8A951]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            {/* Quick Access Badges for Fav / Compare */}
            {favoritesCount > 0 && (
              <button
                id="btn-favorites-badge"
                onClick={onOpenFavorites}
                className="ml-2 px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] font-mono font-bold transition-all"
              >
                ♥ {favoritesCount}
              </button>
            )}
            {compareCount > 0 && (
              <button
                id="btn-compare-badge"
                onClick={onOpenCompare}
                className="ml-1 px-2 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 text-[10px] font-mono font-bold transition-all"
              >
                ⇄ {compareCount}
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div id="nav-actions" className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle Switch */}
            <div
              id="theme-toggle-container"
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 mr-2 cursor-pointer select-none group"
            >
              <div className={`w-8 h-4 rounded-full relative p-0.5 transition-colors duration-300 flex items-center ${
                darkMode ? 'bg-white/10' : 'bg-black/10'
              }`}>
                <motion.div
                  layout
                  className={`w-3 h-3 rounded-full shadow-md transition-all ${
                    darkMode ? 'bg-white ml-auto shadow-white/20' : 'bg-slate-600 mr-auto'
                  }`}
                />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider font-mono transition-colors ${
                darkMode ? 'text-white group-hover:text-[#C8A951]' : 'text-slate-600 group-hover:text-black'
              }`}>
                {darkMode ? 'Night' : 'Day'}
              </span>
            </div>

            {/* Quick Contact Buttons */}
            <a
              id="nav-call-btn"
              href="tel:+923219876543"
              className="bg-[#C8A951] text-black px-6 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-[#b09440] transition-all duration-300 shadow-[0_0_20px_rgba(200,169,81,0.2)] flex items-center space-x-1.5 shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Agency</span>
            </a>

            <a
              id="nav-whatsapp-btn"
              href="https://wa.me/923219876543?text=Hi%20Tauheed%20Estate%20Agency,%20I%20am%20interested%20in%20buying/renting%20a%20luxury%20property."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-emerald-600/10 hover:shadow-emerald-500/20"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Admin Console Entry */}
            <button
              id="nav-admin-btn"
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 text-xs font-mono rounded border transition-colors ${
                activeTab === 'admin'
                  ? 'border-[#C8A951] bg-[#C8A951]/10 text-[#C8A951]'
                  : 'border-dashed border-gray-500/40 text-gray-500 hover:text-[#C8A951] hover:border-[#C8A951]'
              }`}
            >
              ADMIN
            </button>
          </div>

          {/* Mobile Menu Icon & Theme Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile Fav / Compare markers */}
            {favoritesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
            {compareCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">
                {compareCount}
              </span>
            )}

            {/* Mobile Theme Toggle */}
            <button
              id="mobile-theme-toggle-btn"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode ? 'text-yellow-400' : 'text-slate-700'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Hamburger Button */}
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${
                darkMode ? 'text-white hover:bg-white/5' : 'text-black hover:bg-black/5'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t ${
              darkMode ? 'bg-black border-white/10' : 'bg-white border-black/5'
            } overflow-hidden`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                    if (item.id !== 'home') {
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`w-full text-left px-3 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all ${
                    activeTab === item.id
                      ? 'bg-[#C8A951]/10 text-[#C8A951] border-l-4 border-[#C8A951]'
                      : darkMode
                      ? 'text-gray-300 hover:bg-white/5'
                      : 'text-gray-600 hover:bg-black/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-gray-700/20 flex flex-col space-y-2.5">
                {favoritesCount > 0 && (
                  <button
                    onClick={() => {
                      onOpenFavorites();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2.5 rounded bg-red-500/10 text-red-500 text-xs font-mono font-bold"
                  >
                    ♥ Saved Properties ({favoritesCount})
                  </button>
                )}

                {compareCount > 0 && (
                  <button
                    onClick={() => {
                      onOpenCompare();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2.5 rounded bg-blue-500/10 text-blue-500 text-xs font-mono font-bold"
                  >
                    ⇄ Compare Properties ({compareCount})
                  </button>
                )}

                <a
                  href="tel:+923219876543"
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-lg border border-[#C8A951] text-[#C8A951] text-xs font-semibold tracking-wider uppercase bg-transparent"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/923219876543?text=Hi%20Tauheed%20Estate%20Agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold tracking-wider uppercase"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>

                <button
                  onClick={() => {
                    setActiveTab('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-3 rounded text-center text-xs font-mono border ${
                    activeTab === 'admin'
                      ? 'border-[#C8A951] bg-[#C8A951]/10 text-[#C8A951]'
                      : 'border-dashed border-gray-500/40 text-gray-400'
                  }`}
                >
                  ADMIN SYSTEM
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
