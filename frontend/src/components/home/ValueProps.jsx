import React from 'react';
import { Gift, ShieldCheck, Clock, Award, Sparkles, HeartHandshake } from 'lucide-react';

export default function ValueProps() {
  const pillars = [
    {
      icon: Gift,
      title: 'Free Gift Wrapping',
      desc: 'Every gift includes complimentary festive wrapping with double-sided satin ribbon and a personalized greeting card.'
    },
    {
      icon: Clock,
      title: 'Fast & Reliable Delivery',
      desc: 'On-time delivery across 18,000+ pin codes in India, with same-day dispatch available in major metro cities.'
    },
    {
      icon: ShieldCheck,
      title: '100% Quality Guaranteed',
      desc: 'All products are hand-inspected for flawless engraving, fresh chocolates, and sturdy packaging before shipment.'
    },
    {
      icon: HeartHandshake,
      title: 'Safe & Easy Payments',
      desc: 'Secure online checkout powered by Razorpay (UPI, Credit/Debit cards, NetBanking) and Cash on Delivery.'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-dark mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Shop With Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold">
            The AuraGifts Promise
          </h2>
          <div className="w-20 h-0.5 bg-secondary mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-background border border-border/80 hover:border-secondary hover:shadow-luxury transition-all text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5 border border-primary/20">
                  <Icon className="w-6 h-6 text-secondary-dark" />
                </div>
                <h3 className="font-serif text-lg font-bold text-primary mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
