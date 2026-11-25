import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  Sparkles, 
  X, 
  Gift, 
  Truck, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { ALL_PRODUCTS, POPULAR_CATEGORIES } from '../utils/sampleData';
import CustomizationModal from '../components/common/CustomizationModal';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategorySlug = searchParams.get('category') || 'all';

  // Filters State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [onlyPersonalized, setOnlyPersonalized] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [addedItem, setAddedItem] = useState(null);
  const [customizingProduct, setCustomizingProduct] = useState(null);

  // Price Range Options
  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-1000', label: 'Under ₹1,000', min: 0, max: 1000 },
    { id: '1000-2000', label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
    { id: 'above-2000', label: 'Above ₹2,000', min: 2000, max: 99999 }
  ];

  // Category change handler
  const handleCategorySelect = (slug) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  // Quick Add To Cart feedback
  const handleQuickAdd = (product) => {
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // 1. Category filter
      if (activeCategorySlug !== 'all' && product.categorySlug !== activeCategorySlug) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesSubtitle) {
          return false;
        }
      }

      // 3. Price range filter
      if (selectedPriceRange !== 'all') {
        const range = priceRanges.find(r => r.id === selectedPriceRange);
        if (range && (product.price < range.min || product.price > range.max)) {
          return false;
        }
      }

      // 4. Personalized checkbox
      if (onlyPersonalized && !product.isPersonalizable) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured order
    });
  }, [activeCategorySlug, searchQuery, selectedPriceRange, onlyPersonalized, sortBy]);

  // Current category metadata
  const currentCategoryObj = POPULAR_CATEGORIES.find(c => c.slug === activeCategorySlug) || {
    name: 'All Gifts Collection',
    subtitle: 'Browse all handcrafted gifts, personalized items, and celebration hampers'
  };

  // Category Icon helper
  const getCategoryIcon = (slug) => {
    switch(slug) {
      case 'personalized-gifts': return '✍️';
      case 'gift-hampers': return '🧺';
      case 'birthday-gifts': return '🎂';
      case 'anniversary-gifts': return '💍';
      case 'flowers-bouquets': return '🌸';
      case 'photo-frames': return '🖼️';
      case 'corporate-gifts': return '💼';
      default: return '🎁';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Attractive Category Hero Banner Card */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-rose-50 via-white to-amber-50 p-6 sm:p-10 border border-rose-100 shadow-sm relative overflow-hidden">
          
          {/* Subtle Decorative Ambient Circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left Title & Info */}
            <div className="space-y-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <span className="text-slate-800 font-bold">{currentCategoryObj.name}</span>
              </div>

              {/* Title with Category Icon & Item Count */}
              <div className="flex items-center gap-3 flex-wrap pt-1">
                <span className="text-3xl sm:text-4xl">{getCategoryIcon(activeCategorySlug)}</span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                  {currentCategoryObj.name}
                </h1>
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Gift' : 'Gifts'} Available
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-normal leading-relaxed">
                {currentCategoryObj.subtitle}
              </p>

              {/* Trust Badges */}
              <div className="pt-3 flex flex-wrap items-center gap-5 text-xs text-slate-700 font-medium">
                <span className="flex items-center gap-1.5 text-primary">
                  <Gift className="w-4 h-4 text-primary" /> Free Gift Wrap & Card
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Truck className="w-4 h-4 text-secondary-dark" /> Express Metro Delivery
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Star className="w-4 h-4 fill-secondary text-secondary" /> 4.9/5 Verified Quality
                </span>
              </div>
            </div>

            {/* Right Search Input Box */}
            <div className="relative max-w-xs w-full self-start md:self-center">
              <input
                type="text"
                placeholder="Search gifts in this list..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-xs font-medium rounded-full border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary shadow-xs transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Filter Toolbar: Price Range, Personalization Toggle & Sort */}
        <div className="bg-white rounded-2xl p-4 mb-8 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          
          {/* Price Range Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" /> Price:
            </span>
            {priceRanges.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedPriceRange(r.id)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  selectedPriceRange === r.id
                    ? 'border-primary bg-primary text-white shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Personalization Toggle & Sort */}
          <div className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyPersonalized}
                onChange={(e) => setOnlyPersonalized(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
              />
              <span className="text-slate-800 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> Personalizable Only
              </span>
            </label>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Area */}
                <div>
                  <Link to={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-slate-100 cursor-pointer">
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
                    <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      {product.tag}
                    </span>

                    {/* Feature Bar */}
                    {product.isPersonalizable && (
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-800 border border-slate-200">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span>Custom Name & Photo</span>
                      </div>
                    )}
                  </Link>

                  {/* Info Area */}
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-primary text-[10px] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 font-semibold text-slate-800">
                        <Star className="w-3 h-3 fill-secondary text-secondary" />
                        <span>{product.rating}</span>
                        <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-serif text-sm font-bold text-slate-900 hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>
                </div>

                {/* Pricing & Add To Cart Button */}
                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-lg font-bold text-slate-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {product.discount}% OFF
                    </span>
                  </div>

                  {/* Customization Action for Client */}
                  <button
                    type="button"
                    onClick={() => setCustomizingProduct(product)}
                    className="w-full mb-2 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-primary text-primary hover:bg-primary/5 transition-all shadow-2xs group"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-primary group-hover:rotate-12 transition-transform" />
                    <span>Customize & Convey to Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs ${
                      addedItem === product.id
                        ? 'bg-emerald-700 text-white'
                        : 'bg-primary text-white hover:bg-primary-hover'
                    }`}
                  >
                    {addedItem === product.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-white" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-600">
              <Gift className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">No Gifts Found</h3>
            <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
              We couldn't find any gifts matching your selected filters. Try resetting your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPriceRange('all');
                setOnlyPersonalized(false);
                handleCategorySelect('all');
              }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-hover transition-all shadow-sm"
            >
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Client Customization Modal */}
        <CustomizationModal
          isOpen={!!customizingProduct}
          onClose={() => setCustomizingProduct(null)}
          product={customizingProduct}
        />

      </div>
    </div>
  );
}
