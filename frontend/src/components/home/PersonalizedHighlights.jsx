import React from 'react';
import { Sparkles, Edit3, Image, Gift, ArrowRight } from 'lucide-react';

export default function PersonalizedHighlights() {
  const steps = [
    {
      icon: Edit3,
      title: '1. Choose Custom Text & Names',
      desc: 'Add meaningful initials, significant anniversary dates, or heartfelt messages.'
    },
    {
      icon: Image,
      title: '2. Upload Cherished Photos',
      desc: 'Our photo enhancement studio prints high-resolution, fade-proof memories.'
    },
    {
      icon: Gift,
      title: '3. Luxury Ribbon & Wax Seal',
      desc: 'Packed in signature matte burgundy boxes with handwritten greeting cards.'
    }
  ];

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Bespoke Customization Studio</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Craft a One-of-a-Kind Gift <br />
                <span className="italic font-normal text-secondary-light font-serif">Engraved with Love</span>
              </h2>

              <p className="text-sm sm:text-base text-background/80 max-w-lg leading-relaxed font-light">
                Turn ordinary keepsakes into timeless heirlooms. Whether it's an engraved wooden frame, a custom birthstone charm, or a monogrammed mug, we bring your vision to life.
              </p>

              {/* 3 Step Process */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10">
                      <Icon className="w-5 h-5 text-accent mb-2" />
                      <h4 className="font-serif text-sm font-semibold text-white">{step.title}</h4>
                      <p className="text-[11px] text-background/70 mt-1 leading-snug">{step.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <a
                  href="/products?category=personalized-gifts"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-secondary text-primary font-semibold text-sm hover:bg-secondary-light transition-all shadow-md"
                >
                  <span>Explore Personalized Gifts</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=700&q=80"
                  alt="Personalized gifts demonstration"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
                      Live Engraving Preview
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white mt-1">
                      "Forever & Always • 14.02.2024"
                    </h3>
                    <p className="text-xs text-background/80 mt-0.5">Laser precision on natural teakwood</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
