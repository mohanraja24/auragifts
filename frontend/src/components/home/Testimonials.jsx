import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../../utils/sampleData';

export default function Testimonials() {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-dark mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Reviews</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold">
            What Our Customers Say
          </h2>
          <div className="w-20 h-0.5 bg-secondary mx-auto mt-3"></div>
          <p className="text-xs text-text-muted mt-2">
            Over 10,000+ happy gifts delivered across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-8 border border-border shadow-xs hover:shadow-luxury transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-secondary mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>

                <p className="font-serif italic text-base text-primary leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-border/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary-dark block">
                  {rev.milestone}
                </span>
                <h4 className="font-serif font-bold text-sm text-primary mt-0.5">
                  {rev.client}
                </h4>
                <p className="text-[11px] text-text-subtle font-sans">
                  Verified Buyer, {rev.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
