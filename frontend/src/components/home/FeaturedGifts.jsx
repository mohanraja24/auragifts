import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Check, Sparkles, Eye, ArrowRight, Gift } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../utils/sampleData';
import CustomizationModal from '../common/CustomizationModal';

export default function FeaturedGifts() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [addedItem, setAddedItem] = useState(null);
  const [customizingProduct, setCustomizingProduct] = useState(null);

  const handleQuickAdd = (product) => {
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-dark mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Popular Picks</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold">
            Best-Selling Gifts of the Season
          </h2>
          <div className="w-20 h-0.5 bg-secondary mx-auto mt-3"></div>
          <p className="text-sm text-text-muted mt-3 font-normal">
            Handpicked customer favorites with premium gift wrapping and 5-star reviews.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_PRODUCTS.map((product) => {
            const isHovered = hoveredProduct === product.id;
            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group bg-white rounded-3xl overflow-hidden border border-border shadow-xs hover:shadow-luxury transition-all duration-500 flex flex-col"
              >
                {/* Visual Image */}
                <Link to={`/products/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-background-alt cursor-pointer">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />

                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-primary text-secondary-light text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {product.tag}
                  </span>

                  {/* Material & Feature Bar */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md rounded-xl px-3 py-1.5 flex items-center justify-between text-[11px] text-primary border border-border/60">
                    <span className="font-medium">{product.material}</span>
                    {product.isPersonalizable && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-dark flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Personalized
                      </span>
                    )}
                  </div>
                </Link>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-text-subtle mb-1.5">
                      <span className="uppercase tracking-wider text-[11px] font-bold text-secondary-dark">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 font-semibold text-text">
                        <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                        <span>{product.rating}</span>
                        <span className="text-[10px] text-text-subtle">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-serif text-lg font-bold text-primary hover:text-primary-light transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-xl font-bold text-primary">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-text-subtle line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {product.discount}% OFF
                      </span>
                    </div>

                    {/* Customize & Convey to Admin button */}
                    {product.isPersonalizable && (
                      <button
                        type="button"
                        onClick={() => setCustomizingProduct(product)}
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-secondary/15 hover:bg-secondary/25 text-primary border border-secondary/40 flex items-center justify-center gap-1.5 transition-all mb-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-secondary-dark" />
                        <span>✨ Customize & Convey to Admin</span>
                      </button>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(product)}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                          addedItem === product.id
                            ? 'bg-emerald-700 text-white'
                            : 'bg-primary text-white hover:bg-primary-light shadow-xs'
                        }`}
                      >
                        {addedItem === product.id ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-300" />
                            <span>Added to Cart!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 text-secondary-light" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                      <Link
                        to={`/products/${product.id}`}
                        className="p-3 rounded-xl border border-border text-primary hover:bg-background-alt transition-colors"
                        title="View Gift Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Explore All Gifts Section CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-widest hover:bg-primary-hover transition-all shadow-md hover:shadow-lg group"
          >
            <Gift className="w-4 h-4 text-secondary group-hover:rotate-12 transition-transform" />
            <span>Explore All Gifts Collection</span>
            <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Client-to-Admin Customization Modal */}
      {customizingProduct && (
        <CustomizationModal
          isOpen={!!customizingProduct}
          onClose={() => setCustomizingProduct(null)}
          product={customizingProduct}
        />
      )}
    </section>
  );
}
