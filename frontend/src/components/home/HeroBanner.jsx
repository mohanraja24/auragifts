import React, { useState } from 'react';
import { ArrowRight, Sparkles, Gift, CheckCircle2 } from 'lucide-react';

export default function HeroBanner() {
  const [recipient, setRecipient] = useState('For Her');
  const [occasion, setOccasion] = useState('Birthday');
  const [budget, setBudget] = useState('₹1,000 - ₹2,500');

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-16 border-b border-border bg-grain">
      
      {/* Background Soft Celebration Glows */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clear, Warm Headlines & Gift Finder */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Handcrafted With Love</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-text font-bold leading-[1.15] tracking-tight">
              Thoughtful Gifts for <br />
              <span className="italic font-normal text-primary">Every Special</span> <br />
              Moment & Milestone.
            </h1>

            <p className="text-base sm:text-lg text-text-muted max-w-xl font-normal leading-relaxed">
              Discover personalized name gifts, delicious chocolate hampers, fresh flower bouquets, and custom photo frames delivered right to your loved one’s door.
            </p>

            {/* Quick Gift Finder Assistant */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-border shadow-luxury max-w-xl">
              <div className="flex items-center justify-between mb-3 border-b border-border/80 pb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-primary flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" /> Quick Gift Finder
                </span>
                <span className="text-[11px] text-text-subtle">Find the perfect present fast</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Who is this for */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-text-subtle font-semibold mb-1">
                    Who is this for?
                  </label>
                  <select
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full text-xs font-medium bg-background border border-border rounded-lg px-2.5 py-2 text-text focus:outline-none focus:border-primary"
                  >
                    <option>For Her</option>
                    <option>For Him</option>
                    <option>For Couples</option>
                    <option>For Parents</option>
                    <option>For Friends</option>
                  </select>
                </div>

                {/* 2. Occasion */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-text-subtle font-semibold mb-1">
                    Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full text-xs font-medium bg-background border border-border rounded-lg px-2.5 py-2 text-text focus:outline-none focus:border-primary"
                  >
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Wedding</option>
                    <option>Festival</option>
                    <option>Congratulations</option>
                  </select>
                </div>

                {/* 3. Budget */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-text-subtle font-semibold mb-1">
                    Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full text-xs font-medium bg-background border border-border rounded-lg px-2.5 py-2 text-text focus:outline-none focus:border-primary"
                  >
                    <option>Under ₹1,000</option>
                    <option>₹1,000 - ₹2,500</option>
                    <option>₹2,500 - ₹5,000</option>
                    <option>Above ₹5,000</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-text-muted">
                  Looking for <strong className="text-primary">{recipient}</strong> for <strong className="text-primary">{occasion}</strong>
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href="/products"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-hover transition-all shadow-sm"
                  >
                    <span>Show Gifts</span>
                    <ArrowRight className="w-3.5 h-3.5 text-secondary-light" />
                  </a>
                  <a
                    href="/products"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:border-primary transition-all shadow-xs"
                  >
                    <span>All Gifts</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Benefits Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-text-muted">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Free Greeting Card & Wrapping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Same-Day Metro Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Gift Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Product Visual */}
              <div className="relative rounded-arch overflow-hidden shadow-2xl border-2 border-border bg-white aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80"
                  alt="Artisanal Handcrafted Gift Keepsake Box"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80";
                  }}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/25 to-transparent"></div>

                {/* Card description overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-secondary block mb-1">
                    ★ Handcrafted Luxury Collection
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Royal Keepsake Gift Box
                  </h3>
                  <p className="text-xs text-white/90 mt-1">
                    Custom engraved name & date, satin ribbons & complimentary message card
                  </p>
                </div>
              </div>

              {/* Floating Gift Wrapping Highlight Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200 max-w-[210px] hidden sm:block">
                <div className="aspect-square rounded-xl overflow-hidden mb-2.5 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80"
                    alt="Authentic handcrafted gift wrapping with satin ribbon"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    Free
                  </span>
                </div>
                <p className="font-serif text-xs font-bold text-slate-900">Premium Gift Wrap</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Hand-tied satin ribbon & custom message card</p>
              </div>

              {/* Top rating badge */}
              <div className="absolute -top-3 right-2 sm:-right-4 bg-primary text-white py-1.5 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg border border-secondary/40 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                <span className="text-secondary">★ ★ ★ ★ ★</span>
                <span className="font-bold">4.9 / 5 (2k+ reviews)</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
