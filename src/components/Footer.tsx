import React, { useState } from 'react';
import { Landmark, Mail, ArrowRight, Phone, MapPin, Globe, Facebook, Instagram, Linkedin, Shield } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  setActiveTab: (tab: string) => void;
}

export default function Footer({ darkMode, setActiveTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className={`border-t transition-colors duration-500 ${
        darkMode ? 'bg-[#050505] border-white/10 text-gray-400' : 'bg-slate-950 border-black/5 text-slate-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-9 h-9 rounded bg-[#C8A951] flex items-center justify-center">
                <Landmark className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="font-display text-sm font-bold tracking-widest text-white block">
                  TAUHEED
                </span>
                <span className="text-[10px] tracking-widest text-[#C8A951] font-mono block -mt-1 font-semibold">
                  ESTATE AGENCY
                </span>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed text-gray-400 font-sans">
              The premier luxury real estate consultants in Karachi. We specialize in buying, selling, and executing secure investments across DHA, Clifton, and sea-facing residential zones.
            </p>

            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded bg-white/5 hover:bg-[#C8A951] hover:text-black flex items-center justify-center transition-colors duration-300" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-white/5 hover:bg-[#C8A951] hover:text-black flex items-center justify-center transition-colors duration-300" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-white/5 hover:bg-[#C8A951] hover:text-black flex items-center justify-center transition-colors duration-300" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-6 font-display border-b border-white/10 pb-2">
              Explore
            </h3>
            <ul className="space-y-3.5 text-xs font-sans">
              {['Home', 'About', 'Properties', 'Projects', 'Services', 'Reviews', 'Blog', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const tab = item === 'Reviews' ? 'testimonials' : item.toLowerCase();
                      setActiveTab(tab);
                      if (tab === 'home') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        const el = document.getElementById(tab);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="hover:text-[#C8A951] transition-colors duration-200 uppercase text-[11px] tracking-wider"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-6 font-display border-b border-white/10 pb-2">
              Corporate Office
            </h3>
            <ul className="space-y-4 text-xs font-sans">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C8A951] shrink-0 mt-0.5" />
                <span>Plot 23-C, Al-Tauheed Commercial Area, DHA Phase 6, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#C8A951] shrink-0" />
                <span>+92 21 3555 8899</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#C8A951] shrink-0" />
                <span>info@tauheedestate.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-[#C8A951] shrink-0" />
                <span>www.tauheedestate.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Verification */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-4 font-display border-b border-white/10 pb-2">
                Luxury Newsletter
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Subscribe to receive private, off-market real estate listings and Karachi market forecasts.
              </p>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#C8A951] pr-12 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#C8A951] text-black rounded-md hover:bg-white transition-colors flex items-center justify-center group"
                >
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                  ✓ Successfully subscribed to exclusive listings!
                </p>
              )}
            </div>

            {/* Verification Seal */}
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center space-x-2.5">
              <Shield className="w-4 h-4 text-[#C8A951] shrink-0" />
              <div>
                <span className="text-[10px] text-white font-bold block uppercase tracking-wider">
                  DEFENCE HOUSING AUTHORITY
                </span>
                <span className="text-[9px] text-gray-400 block font-mono">
                  Registered Partner ID #DHA-30491
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500">
          <p>© {currentYear} TAUHEED ESTATE AGENCY. All Rights Reserved. Designed for elite real estate solutions in Karachi.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-mono">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <button onClick={() => setActiveTab('admin')} className="text-[#C8A951] hover:underline uppercase">
              Staff Portal Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
