import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { POPULAR_CATEGORIES } from '../../utils/sampleData';

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-dark mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold">
              Shop by Category
            </h2>
            <p className="text-sm text-text-muted mt-2 max-w-xl font-normal">
              Browse popular gift categories with custom engraving, photo frames, and ready-to-ship celebration hampers.
            </p>
          </div>

          <a 
            href="/products" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs self-start sm:self-end group"
          >
            <span>Explore All Gifts</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {POPULAR_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-border shadow-xs hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-background-alt">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-[11px] font-semibold text-secondary-light uppercase tracking-wider flex items-center gap-1">
                    <span>View Gifts</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-primary px-2.5 py-0.5 rounded-full border border-border/60">
                  {cat.itemCount}
                </span>
              </div>

              {/* Title & Description */}
              <div className="p-3.5 text-center flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-serif text-sm font-bold text-primary group-hover:text-secondary-dark transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-text-subtle mt-0.5 line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
