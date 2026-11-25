import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowRight, Sparkles, Star, Gift, Check } from 'lucide-react';
import { ALL_PRODUCTS } from '../utils/sampleData';

export default function WishlistPage() {
  // Initial sample wishlist items matching navbar badge (1 item)
  const [wishlistItems, setWishlistItems] = useState([
    ALL_PRODUCTS.find(p => p.id === 'prod-1') || ALL_PRODUCTS[0],
    ALL_PRODUCTS.find(p => p.id === 'prod-15') || ALL_PRODUCTS[3]
  ]);

  const [addedItem, setAddedItem] = useState(null);

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (item) => {
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs text-slate-500">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-primary font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <span className="font-medium">My Wishlist ({wishlistItems.length} saved)</span>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 mb-2">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>Cherished Favorites</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            My Saved Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Gifts and personalized keepsakes you have saved for upcoming birthdays, anniversaries, and celebrations.
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={item.primaryImage}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover"
                    />

                    {/* Tag */}
                    <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                      {item.tag}
                    </span>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-slate-400 hover:text-rose-600 shadow-xs flex items-center justify-center transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Free Wrap Pill */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-xs rounded-xl px-2.5 py-1 flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-800 border border-slate-200">
                      <Gift className="w-3.5 h-3.5 text-primary" />
                      <span>Complimentary Gift Wrap</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span className="font-semibold text-primary text-[10px] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1 font-semibold text-slate-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <Link to={`/products/${item.id}`}>
                      <h3 className="font-serif text-base font-bold text-slate-900 hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-lg font-bold text-slate-900">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {item.discount}% OFF
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                        addedItem === item.id
                          ? 'bg-emerald-700 text-white'
                          : 'bg-primary text-white hover:bg-primary-hover'
                      }`}
                    >
                      {addedItem === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Cart</span>
                        </>
                      )}
                    </button>

                    <Link
                      to={`/products/${item.id}`}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:border-primary hover:text-primary text-xs font-bold transition-colors"
                      title="View Details"
                    >
                      View
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty Wishlist State */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Your Wishlist is Empty</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Tap the heart icon on any gift, teddy bear, or photo frame to save it to your wishlist for quick access later!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-hover transition-all shadow-md mt-2"
            >
              <span>Discover Gifts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
