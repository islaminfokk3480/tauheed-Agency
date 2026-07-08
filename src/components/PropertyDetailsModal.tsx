import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BedDouble, Bath, Car, Maximize, MapPin, Calendar, User, Phone, MessageSquare, Compass, Play, Image as ImageIcon, ShieldCheck, Mail, Sparkles, Clock } from 'lucide-react';
import { Property, Agent, ContactRequest } from '../types';
import { formatPKRPrice } from './PropertyCard';
import MortgageCalculator from './MortgageCalculator';

interface PropertyDetailsModalProps {
  property: Property;
  agent: Agent;
  darkMode: boolean;
  onClose: () => void;
  onSubmitVisitRequest: (req: Omit<ContactRequest, 'id' | 'date' | 'status'>) => void;
}

export default function PropertyDetailsModal({
  property,
  agent,
  darkMode,
  onClose,
  onSubmitVisitRequest,
}: PropertyDetailsModalProps) {
  // Tabs for media
  const [mediaTab, setMediaTab] = useState<'gallery' | 'video' | '360'>('gallery');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // 360 Virtual Tour state
  const [virtualAngle, setVirtualAngle] = useState(120); // Simulated panning degree
  const [activeVirtualRoom, setActiveVirtualRoom] = useState<'Lobby' | 'Master Bedroom' | 'Infinity Pool' | 'Kitchen'>('Lobby');

  // Book Visit Form States
  const [visitName, setVisitName] = useState('');
  const [visitEmail, setVisitEmail] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [visitMessage, setVisitMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const virtualRooms = {
    'Lobby': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'Master Bedroom': 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    'Infinity Pool': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    'Kitchen': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
  };

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitName || !visitPhone || !visitDate) return;

    onSubmitVisitRequest({
      name: visitName,
      email: visitEmail,
      phone: visitPhone,
      message: `[Visit Booked for ${visitDate} at ${visitTime}] - ${visitMessage || 'No notes left.'}`,
      propertyTitle: property.title,
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setVisitName('');
      setVisitEmail('');
      setVisitPhone('');
      setVisitDate('');
      setVisitMessage('');
    }, 5000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className={`relative w-full max-w-5xl rounded-2xl overflow-hidden border shadow-2xl z-10 max-h-[90vh] flex flex-col ${
            darkMode ? 'bg-[#090909] border-white/10 text-white' : 'bg-white border-black/5 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className={`p-4 flex items-center justify-between border-b ${
            darkMode ? 'border-white/10' : 'border-black/5'
          }`}>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-[#C8A951] text-black">
                {property.type}
              </span>
              <span className="text-xs text-gray-500 font-mono">ID: {property.id}</span>
            </div>
            
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/5 text-slate-500 hover:text-black'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-5 sm:p-8 space-y-8 flex-grow">
            {/* Title Block */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight leading-tight">
                  {property.title}
                </h1>
                <span className="font-mono text-2xl font-black text-[#C8A951]">
                  {formatPKRPrice(property.price, property.purpose)}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#C8A951]" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Media Showcasing Engine */}
            <div className="space-y-4">
              {/* Media Sub-nav */}
              <div className="flex border-b border-gray-700/20 gap-4">
                <button
                  onClick={() => setMediaTab('gallery')}
                  className={`pb-3.5 text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                    mediaTab === 'gallery' ? 'text-[#C8A951] border-b-2 border-[#C8A951]' : 'text-gray-500'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Interactive Gallery</span>
                </button>
                <button
                  onClick={() => setMediaTab('video')}
                  className={`pb-3.5 text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                    mediaTab === 'video' ? 'text-[#C8A951] border-b-2 border-[#C8A951]' : 'text-gray-500'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>Video Walkthrough</span>
                </button>
                <button
                  onClick={() => setMediaTab('360')}
                  className={`pb-3.5 text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                    mediaTab === '360' ? 'text-[#C8A951] border-b-2 border-[#C8A951]' : 'text-gray-500'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>360° Virtual Tour</span>
                </button>
              </div>

              {/* Media Box */}
              <div className={`aspect-[16/9] w-full rounded-xl overflow-hidden relative border ${
                darkMode ? 'bg-black border-white/5' : 'bg-slate-100 border-black/5'
              }`}>
                {/* 1. Gallery Tab */}
                {mediaTab === 'gallery' && (
                  <div className="w-full h-full relative group">
                    <img
                      src={property.gallery[activeImageIndex] || property.image}
                      alt={`${property.title} - Fullscreen View`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />

                    {/* Left/Right controls */}
                    {property.gallery.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : property.gallery.length - 1))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-[#C8A951] hover:text-black transition-all"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setActiveImageIndex((prev) => (prev < property.gallery.length - 1 ? prev + 1 : 0))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-[#C8A951] hover:text-black transition-all"
                        >
                          ›
                        </button>
                      </>
                    )}

                    {/* Small image selectors */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
                      {property.gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                            activeImageIndex === idx ? 'border-[#C8A951] scale-105 shadow-md' : 'border-white/20 hover:border-white/50'
                          }`}
                        >
                          <img src={img} alt="Thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Video Tab */}
                {mediaTab === 'video' && (
                  <div className="w-full h-full flex items-center justify-center relative">
                    {/* Simulated elegant video layout if none is added, else an iframe */}
                    {property.videoUrl ? (
                      <iframe
                        src={property.videoUrl}
                        title="YouTube video player"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="text-center p-6 space-y-4">
                        <Play className="w-12 h-12 text-[#C8A951] mx-auto animate-pulse" />
                        <h4 className="font-semibold text-sm uppercase">Simulated Video Walkthrough</h4>
                        <p className="text-xs text-gray-400 max-w-sm">
                          Connect with your assigned agent for a direct cinematic live tour or pre-recorded aerial drone footage.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. 360 Virtual Tour Tab */}
                {mediaTab === '360' && (
                  <div className="w-full h-full relative overflow-hidden select-none">
                    {/* Background */}
                    <div
                      style={{
                        backgroundImage: `url(${virtualRooms[activeVirtualRoom]})`,
                        backgroundPosition: `${virtualAngle}px center`,
                        backgroundSize: '250% 120%',
                      }}
                      className="w-full h-full transition-all duration-300 ease-out"
                    />

                    {/* Left/Right rotation controls */}
                    <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                      <button
                        onMouseDown={() => setVirtualAngle((prev) => prev - 50)}
                        onClick={() => setVirtualAngle((prev) => prev - 50)}
                        className="w-12 h-12 pointer-events-auto rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C8A951] hover:text-black transition-all"
                        title="Rotate Left"
                      >
                        ↺
                      </button>
                      <button
                        onMouseDown={() => setVirtualAngle((prev) => prev + 50)}
                        onClick={() => setVirtualAngle((prev) => prev + 50)}
                        className="w-12 h-12 pointer-events-auto rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C8A951] hover:text-black transition-all"
                        title="Rotate Right"
                      >
                        ↻
                      </button>
                    </div>

                    {/* Room selectors inside the portal */}
                    <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-white/10 p-3 rounded-lg space-y-2">
                      <span className="text-[9px] font-mono font-bold text-[#C8A951] tracking-widest block uppercase mb-1">
                        Select Camera Node
                      </span>
                      <div className="flex flex-col space-y-1">
                        {(Object.keys(virtualRooms) as Array<keyof typeof virtualRooms>).map((rm) => (
                          <button
                            key={rm}
                            onClick={() => setActiveVirtualRoom(rm)}
                            className={`text-[10px] text-left px-2 py-1 rounded transition-colors uppercase font-mono ${
                              activeVirtualRoom === rm ? 'bg-[#C8A951] text-black font-semibold' : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            {rm}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interactive panning compass */}
                    <div className="absolute bottom-4 right-4 bg-black/65 backdrop-blur-md p-3 rounded-full border border-[#C8A951]/20 flex items-center space-x-2">
                      <Compass
                        style={{ transform: `rotate(${virtualAngle}deg)` }}
                        className="w-5 h-5 text-[#C8A951] transition-transform"
                      />
                      <span className="text-[10px] font-mono text-gray-300 font-bold">
                        Compass: {(Math.abs(virtualAngle) % 360)}°
                      </span>
                    </div>

                    {/* Overlay info */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded text-[10px] font-mono text-[#C8A951] border border-[#C8A951]/10 uppercase font-bold">
                      Interactive 360° Portal Simulation • Drag & Rotate
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Split specifications and Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Details, Description, Features */}
              <div className="lg:col-span-7 space-y-6">
                {/* Structural Specs */}
                <div className={`p-5 rounded-xl border grid grid-cols-2 sm:grid-cols-4 gap-4 ${
                  darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'
                }`}>
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">Bedrooms</span>
                    <span className="text-sm font-bold flex items-center justify-center sm:justify-start gap-1.5 mt-1 font-sans">
                      <BedDouble className="w-4 h-4 text-[#C8A951]" /> {property.bedrooms > 0 ? property.bedrooms : 'N/A'}
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">Bathrooms</span>
                    <span className="text-sm font-bold flex items-center justify-center sm:justify-start gap-1.5 mt-1 font-sans">
                      <Bath className="w-4 h-4 text-[#C8A951]" /> {property.bathrooms > 0 ? property.bathrooms : 'N/A'}
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">Garage Spaces</span>
                    <span className="text-sm font-bold flex items-center justify-center sm:justify-start gap-1.5 mt-1 font-sans">
                      <Car className="w-4 h-4 text-[#C8A951]" /> {property.garage > 0 ? property.garage : 'None'}
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">Area Specs</span>
                    <span className="text-sm font-bold flex items-center justify-center sm:justify-start gap-1.5 mt-1 font-sans">
                      <Maximize className="w-4 h-4 text-[#C8A951]" /> {property.area}
                    </span>
                  </div>
                </div>

                {/* About and Description */}
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#C8A951]">
                    Listing Narrative
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans text-justify">
                    {property.description}
                  </p>
                </div>

                {/* Amenities List */}
                {property.amenities && property.amenities.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#C8A951]">
                      Premium Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {property.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2 text-xs text-gray-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#C8A951]" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Map Area */}
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#C8A951]">
                    Location Map (DHA Karachi Zone)
                  </h3>
                  <div className={`h-48 rounded-xl relative overflow-hidden flex items-center justify-center border ${
                    darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-black/5'
                  }`}>
                    {/* Simulated High-End Map Layout */}
                    <div
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')`,
                        backgroundSize: 'cover',
                        opacity: 0.2,
                      }}
                      className="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="relative text-center p-4 z-10 space-y-2">
                      <MapPin className="w-8 h-8 text-[#C8A951] mx-auto animate-bounce" />
                      <span className="font-display font-bold text-xs uppercase block text-[#C8A951]">
                        {property.location}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono block">
                        Latitude: 24.8607° N | Longitude: 67.0011° E
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Assigned Agent & Book Visit Request Form */}
              <div className="lg:col-span-5 space-y-6">
                {/* Agent Board */}
                <div className={`p-5 rounded-xl border ${
                  darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'
                }`}>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-4">
                    Listing Executed By
                  </span>

                  <div className="flex items-center space-x-4">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border border-[#C8A951]"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm tracking-tight text-[#C8A951]">
                        {agent.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-mono">{agent.designation}</p>
                      <p className="text-[10px] text-gray-500">Exp: {agent.experience}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-dashed border-gray-700/20">
                    <a
                      href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                      className="flex items-center justify-center space-x-1.5 py-2.5 rounded-lg border border-[#C8A951]/40 hover:border-[#C8A951] text-[#C8A951] text-[11px] font-semibold tracking-wider uppercase transition-all bg-transparent"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call {agent.name.split(' ')[0]}</span>
                    </a>
                    <a
                      href={`https://wa.me/${agent.whatsapp}?text=Hi%20${agent.name},%20I%20am%20interested%20in%20property%20listing%20ID%20${property.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-1.5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold tracking-wider uppercase transition-all"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Form to book visit */}
                <div className={`p-5 rounded-xl border relative overflow-hidden ${
                  darkMode ? 'bg-black/50 border-white/5' : 'bg-white border-black/5 shadow-sm'
                }`}>
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[#C8A951]" />
                    <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-[#C8A951]">
                      Request Private Showing
                    </h3>
                  </div>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-6 space-y-3"
                    >
                      <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                      <h4 className="font-bold text-sm uppercase">Booking Filed!</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Your private reservation request has been transmitted securely. {agent.name} will contact you shortly to confirm structural biometric access.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBookVisit} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          required
                          value={visitName}
                          onChange={(e) => setVisitName(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="email"
                          placeholder="Email"
                          value={visitEmail}
                          onChange={(e) => setVisitEmail(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] transition-all"
                        />
                        <input
                          type="tel"
                          placeholder="Phone / Mobile"
                          required
                          value={visitPhone}
                          onChange={(e) => setVisitPhone(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-500 uppercase font-mono block">Preferred Date</label>
                          <input
                            type="date"
                            required
                            value={visitDate}
                            onChange={(e) => setVisitDate(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] transition-all text-gray-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-500 uppercase font-mono block">Preferred Time</label>
                          <select
                            value={visitTime}
                            onChange={(e) => setVisitTime(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] transition-all text-gray-400"
                          >
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:30 AM">11:30 AM</option>
                            <option value="01:00 PM">01:00 PM</option>
                            <option value="03:00 PM">03:00 PM</option>
                            <option value="05:30 PM">05:30 PM</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <textarea
                          placeholder="Note or special requests (optional)"
                          rows={2}
                          value={visitMessage}
                          onChange={(e) => setVisitMessage(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs focus:outline-none focus:border-[#C8A951] transition-all resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded bg-[#C8A951] text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow"
                      >
                        Transmit Reservation
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Mortgage Calculator Integration */}
            <div className="border-t border-gray-700/20 pt-8">
              <div className="mb-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                  Financial Planning
                </span>
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                  Mortgage Projection for this Property
                </h3>
              </div>
              <MortgageCalculator darkMode={darkMode} initialPrice={property.price} />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
