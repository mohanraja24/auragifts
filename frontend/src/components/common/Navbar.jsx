import React, { useState } from 'react';
import { useLocation, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Gift, 
  Sparkles, 
  Truck 
} from 'lucide-react';

export default function Navbar({ cartCount = 2, wishlistCount = 1 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentCategory = searchParams.get('category') || '';
  const isProductsPage = location.pathname === '/products';

  const navItems = [
    { label: 'Home', slug: 'home', path: '/' },
    { label: 'About Us', slug: 'about', path: '/about' },
    { label: 'Personalized Gifts', slug: 'personalized-gifts', path: '/products?category=personalized-gifts' },
    { label: 'Gift Hampers', slug: 'gift-hampers', path: '/products?category=gift-hampers' },
    { label: 'Birthday Gifts', slug: 'birthday-gifts', path: '/products?category=birthday-gifts' },
    { label: 'Anniversary Gifts', slug: 'anniversary-gifts', path: '/products?category=anniversary-gifts' },
    { label: 'Photo Frames', slug: 'photo-frames', path: '/products?category=photo-frames' },
    { label: 'Corporate Gifts', slug: 'corporate-gifts', path: '/products?category=corporate-gifts' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      
      {/* Top Announcement Bar */}
      <div className="bg-primary-dark text-white py-1.5 px-4 text-xs tracking-wide font-medium border-b border-primary/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-rose-200">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Special Offer: Free Gift Wrapping & Message Card on all orders</span>
          </div>

          <div className="mx-auto md:mx-0 flex items-center gap-2 text-center text-white">
            <span>Extra 10% OFF on Orders Above ₹999</span>
            <span className="text-secondary font-bold underline decoration-secondary">Use Code: GIFTJOY</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-rose-200 text-xs">
            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-secondary" /> Delivery in 2-4 Days</span>
            <span className="text-white/40">|</span>
            <Link to="/admin" className="text-secondary hover:text-white transition-colors font-semibold">
              Admin Panel ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          
          {/* 1. LEFT: Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-primary hover:text-primary-hover focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform shadow-xs">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-primary leading-tight">
                  Aura<span className="text-slate-900">Gifts</span>
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-slate-500 font-semibold -mt-0.5">
                  Handcrafted & Personalized
                </span>
              </div>
            </Link>
          </div>

          {/* 2. CENTER: Wide Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search personalized gifts, photo frames, flowers, hampers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-24 py-2.5 text-xs font-medium rounded-full border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary shadow-xs transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-4 py-1.5 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider hover:bg-primary-hover transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* 3. RIGHT: Wishlist, Cart & Profile on the Right of Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Search icon for mobile only */}
            <button 
              onClick={() => navigate('/products')}
              className="md:hidden p-2 text-slate-600 hover:text-primary"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link 
              to="/wishlist" 
              className="relative p-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-full transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link (Icon + Badge only, no text) */}
            <Link 
              to="/cart" 
              className="relative p-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-full transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile on the Right of the Cart (Icon only, no text) */}
            <Link 
              to="/login" 
              className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white transition-all border border-slate-200"
              title="My Profile / Account"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Navigation Ribbon: Clean Text with Subtle Soft Highlight */}
        <nav className="hidden lg:flex items-center justify-center gap-3 py-2 border-t border-slate-200">
          {navItems.map((item) => {
            const isItemActive = item.slug === 'home'
              ? location.pathname === '/'
              : item.slug === 'about'
              ? location.pathname === '/about'
              : isProductsPage && currentCategory === item.slug;

            return (
              <Link 
                key={item.label}
                to={item.path}
                className={`px-3.5 py-1.5 rounded-lg text-xs uppercase font-bold tracking-wider transition-all duration-200 ${
                  isItemActive 
                    ? 'bg-primary text-white shadow-xs' 
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-6 shadow-modal">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </form>

          <div className="flex flex-col gap-1 text-sm font-medium">
            {navItems.map((item) => {
              const isItemActive = item.slug === 'home'
                ? location.pathname === '/'
                : item.slug === 'about'
                ? location.pathname === '/about'
                : isProductsPage && currentCategory === item.slug;

              return (
                <Link 
                  key={item.label} 
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg flex items-center justify-between text-xs uppercase font-bold tracking-wider transition-all ${
                    isItemActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs">→</span>
                </Link>
              );
            })}
            <div className="pt-4 flex flex-col gap-2 border-t border-slate-200 mt-2">
              <Link 
                to="/login" 
                className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider bg-primary text-white rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In / Profile
              </Link>
              <Link 
                to="/admin" 
                className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider border border-slate-300 text-slate-700 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop Owner Admin Panel ↗
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
