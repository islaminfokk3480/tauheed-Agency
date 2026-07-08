import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Share2, ArrowRightLeft, BedDouble, Bath, Car, Maximize, MapPin, Eye, Calendar } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  darkMode: boolean;
  onQuickView: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isComparing: boolean;
  onToggleCompare: (property: Property) => void;
}

export function formatPKRPrice(price: number, purpose: 'buy' | 'rent'): string {
  let formatted = '';
  if (price >= 10000000) {
    const crore = price / 10000000;
    formatted = `PKR ${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(1)} Crore`;
  } else if (price >= 100000) {
    const lakh = price / 100000;
    formatted = `PKR ${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)} Lakh`;
  } else {
    formatted = `PKR ${price.toLocaleString()}`;
  }
  return purpose === 'rent' ? `${formatted} / Month` : formatted;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  darkMode,
  onQuickView,
  isFavorite,
  onToggleFavorite,
  isComparing,
  onToggleCompare,
}) => {
  const [shareCopied, setShareCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = window.location.href;
    navigator.clipboard.writeText(`${url}?property=${property.id}`);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <motion.div
      id={`property-card-${property.id}`}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className={`group transition-all duration-500 relative flex flex-col h-full ${
        darkMode
          ? 'border border-white/10 bg-white/[0.03] backdrop-blur-2xl rounded-[24px] p-3 border-t-white/20 border-l-white/20 shadow-2xl hover:border-[#C8A951]/50 hover:shadow-[#C8A951]/10'
          : 'bg-white border border-black/5 shadow-xl rounded-[24px] p-3 border-t-white border-l-white hover:border-[#C8A951]/30 hover:shadow-black/5'
      }`}
    >
      {/* Upper Media Section */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shrink-0">
        <img
          src={property.image}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Badges on top */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase bg-[#C8A951] text-black rounded-full shadow">
            {property.purpose === 'buy' ? 'FOR SALE' : 'FOR RENT'}
          </span>
          {property.featured && (
            <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase bg-black border border-[#C8A951] text-[#C8A951] rounded-full shadow-lg">
              LUXURY PLATINUM
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex space-x-2">
          {/* Favorite */}
          <button
            id={`btn-favorite-${property.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isFavorite
                ? 'bg-red-500 text-white shadow'
                : 'bg-black/40 backdrop-blur-md text-white hover:bg-[#C8A951] hover:text-black'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Compare */}
          <button
            id={`btn-compare-${property.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(property);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isComparing
                ? 'bg-blue-500 text-white shadow'
                : 'bg-black/40 backdrop-blur-md text-white hover:bg-[#C8A951] hover:text-black'
            }`}
            title={isComparing ? 'Remove from comparison' : 'Add to comparison'}
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
          
          {/* Share */}
          <button
            id={`btn-share-${property.id}`}
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-[#C8A951] hover:text-black flex items-center justify-center transition-all"
            title="Copy Share Link"
          >
            {shareCopied ? (
              <span className="text-[9px] font-bold font-mono text-emerald-400">OK</span>
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Location Badge on lower photo frame */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 text-white/90 text-xs font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#C8A951]" />
          <span className="truncate max-w-[200px] font-sans text-shadow">{property.location}</span>
        </div>

        {/* Property Type Badge bottom right */}
        <span className="absolute bottom-4 right-4 bg-black/65 backdrop-blur-md text-[#C8A951] border border-[#C8A951]/20 text-[10px] font-mono px-2.5 py-0.5 rounded font-semibold uppercase">
          {property.type}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Price Tag */}
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-xl font-black text-[#C8A951] tracking-tight">
            {formatPKRPrice(property.price, property.purpose)}
          </span>
          <span className={`text-[10px] uppercase tracking-wider font-mono ${property.status === 'Available' ? 'text-emerald-400' : 'text-red-400'}`}>
            ● {property.status}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-sm font-semibold font-display tracking-tight leading-tight line-clamp-2 mb-3 h-10 ${
          darkMode ? 'text-white group-hover:text-[#C8A951]' : 'text-slate-900 group-hover:text-[#C8A951]'
        } transition-colors`}>
          {property.title}
        </h3>

        {/* Mini Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed font-sans">
          {property.description}
        </p>

        {/* Structural Specs - Elegant Dark Luxury Style */}
        <div className={`h-16 flex items-center justify-around px-2 shrink-0 my-3 border-t border-b ${
          darkMode ? 'border-white/5' : 'border-black/5'
        }`}>
          <div className="text-center">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-mono font-medium">Bedrooms</p>
            <p className={`font-bold font-display text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {property.bedrooms > 0 ? String(property.bedrooms).padStart(2, '0') : '—'}
            </p>
          </div>
          <div className={`w-[1px] h-8 ${darkMode ? 'bg-white/10' : 'bg-black/10'}`}></div>
          <div className="text-center">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-mono font-medium">Bathrooms</p>
            <p className={`font-bold font-display text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {property.bathrooms > 0 ? String(property.bathrooms).padStart(2, '0') : '—'}
            </p>
          </div>
          <div className={`w-[1px] h-8 ${darkMode ? 'bg-white/10' : 'bg-black/10'}`}></div>
          <div className="text-center">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-mono font-medium">Square Area</p>
            <p className={`font-bold font-display text-xs ${darkMode ? 'text-white' : 'text-slate-900'} truncate max-w-[80px]`}>
              {property.area}
            </p>
          </div>
        </div>

        {/* View Actions */}
        <div className="mt-auto">
          <button
            id={`btn-view-details-${property.id}`}
            onClick={() => onQuickView(property)}
            className="w-full py-3 rounded-xl bg-[#C8A951]/10 text-[#C8A951] border border-[#C8A951]/30 hover:bg-[#C8A951]/20 font-bold text-[11px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details & Virtual Tour</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
