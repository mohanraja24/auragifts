import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Gift, Smile, Award, Gem, Image as ImageIcon } from 'lucide-react';

export default function OccasionSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const giftHighlights = [
    {
      id: 'rings-chains',
      title: 'Chains & Couple Rings',
      tagline: 'Anniversary & Romantic Gifts',
      description: 'Engraved couple rings & custom name pendant chains presented in luxury velvet gift boxes.',
      category: 'personalized-gifts',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      badge: 'Bestseller Jewelry',
      itemCount: '85+ Styles',
      features: ['Velvet Box', 'Name Engraving', '18K Gold Finish'],
      icon: Gem
    },
    {
      id: 'teddy-toys',
      title: 'Teddy Bears & Toys',
      tagline: 'Birthday & Joyful Surprises',
      description: 'Ultra-soft huggable teddy bears, plush toys & companion stuffed animals with satin bows.',
      category: 'birthday-gifts',
      image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80',
      badge: 'Cutest Pick',
      itemCount: '120+ Plushies',
      features: ['Plush Velvet Cotton', 'Satin Ribbon Bow', 'Non-Allergic'],
      icon: Smile
    },
    {
      id: 'photo-frames',
      title: 'Personalized Photo Frames',
      tagline: 'Cherished Memories & Keepsakes',
      description: 'Brass border tabletop frames & engraved wooden double-sided picture frames with free HD printing.',
      category: 'photo-frames',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80',
      badge: 'Heirloom Quality',
      itemCount: '90+ Frames',
      features: ['Free Photo Print', 'Tempered Glass', 'Brass & Teak Wood'],
      icon: ImageIcon
    },
    {
      id: 'panda-plush',
      title: 'Cute Panda Plush Toys',
      tagline: 'Playful Surprises for Loved Ones',
      description: 'Adorable black & white cuddle panda soft toys, perfect for kids, birthdays, and sweethearts.',
      category: 'birthday-gifts',
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=800&q=80',
      badge: 'Trending Cute Gift',
      itemCount: '65+ Panda Toys',
      features: ['Super Soft Plush', 'Fluffy Cotton Fill', 'Gift Box Packed'],
      icon: Heart
    },
    {
      id: 'bangles-bracelets',
      title: 'Bangles & Charm Bracelets',
      tagline: 'Weddings & Festive Adornments',
      description: 'Traditional designer bangles sets, gold-toned bridal bracelets & handcrafted crystal bangles.',
      category: 'personalized-gifts',
      image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
      badge: 'Festive Favorite',
      itemCount: '75+ Sets',
      features: ['Traditional Finish', 'Set of 4 & 6', 'Protective Case'],
      icon: Award
    },
    {
      id: 'gift-wrap',
      title: 'Luxury Gift Wrap & Hampers',
      tagline: 'Ready-to-Gift Presentation',
      description: 'Artisanal gift wrapping with hand-tied satin ribbons, wax seal stickers & personalized greeting cards.',
      category: 'gift-hampers',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      badge: 'Free In All Orders',
      itemCount: 'Complimentary',
      features: ['Hand-Tied Satin Bow', 'Custom Message Note', 'Gold Foil Sticker'],
      icon: Gift
    }
  ];

  const filterTabs = [
    { id: 'all', label: 'All Featured Gifts' },
    { id: 'photo-frames', label: 'Photo Frames' },
    { id: 'teddy-toys', label: 'Teddies & Toys' },
    { id: 'panda-plush', label: 'Panda Plush' },
    { id: 'rings-chains', label: 'Chains & Rings' },
    { id: 'bangles-bracelets', label: 'Bangles' },
    { id: 'gift-wrap', label: 'Gift Wrap' }
  ];

  const displayedGifts = activeFilter === 'all'
    ? giftHighlights
    : giftHighlights.filter(g => g.id === activeFilter);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40 border-b border-slate-200 relative overflow-hidden">
      
      {/* Subtle Ambient Decorative Circles */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-rose-50/70 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-50/70 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/80 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Popular Handpicked Gifts</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold tracking-tight">
            Curated Gifts for Every Celebration
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-xs sm:text-sm text-slate-600 mt-3.5 font-normal leading-relaxed">
            From huggable teddy bears and panda plushies to custom photo frames, engraved rings, chains, bangles, and artisanal gift wrapping.
          </p>
        </div>

        {/* Quick Filter Pill Chips */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === tab.id
                  ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                  : 'bg-white text-slate-600 hover:text-primary hover:bg-rose-50/60 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modern Occasion Cards Grid */}
        <div className={`grid gap-6 sm:gap-8 ${
          displayedGifts.length === 1 
            ? 'max-w-md mx-auto grid-cols-1' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {displayedGifts.map((giftItem) => {
            const IconComponent = giftItem.icon;
            return (
              <div
                key={giftItem.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* 1. Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={giftItem.image}
                    alt={giftItem.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay for subtle contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>

                  {/* Top Badge: Category Highlight */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 text-slate-800 shadow-xs border border-white/60">
                      {giftItem.badge}
                    </span>
                  </div>

                  {/* Floating Occasion Icon */}
                  <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-primary shadow-xs">
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Bottom Counter Pill on Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                    <span className="bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-lg font-semibold text-[10px] uppercase tracking-wider">
                      {giftItem.itemCount}
                    </span>
                    <span className="text-[10px] text-white/90 drop-shadow-sm font-medium">
                      Free Gift Wrapping
                    </span>
                  </div>
                </div>

                {/* 2. Content Info Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 block mb-1">
                      {giftItem.tagline}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {giftItem.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {giftItem.description}
                    </p>

                    {/* Features Tags Pill Row */}
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
                      {giftItem.features.map((feat, idx) => (
                        <span 
                          key={idx}
                          className="text-[10px] font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100"
                        >
                          • {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <Link
                    to={`/products?category=${giftItem.category}`}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-200 bg-slate-50 hover:bg-primary hover:text-white hover:border-primary text-slate-800 transition-all shadow-2xs group/btn"
                  >
                    <span>View {giftItem.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA to All Products */}
        <div className="mt-14 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-900 text-white hover:bg-primary font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg group"
          >
            <Gift className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Explore All Gifts, Toys & Jewelry (250+ Items)</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
