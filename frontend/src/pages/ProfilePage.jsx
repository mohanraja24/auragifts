import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Gift, 
  CheckCircle, 
  Clock, 
  Truck, 
  ChevronRight, 
  Edit3, 
  Plus, 
  Heart, 
  ShoppingBag, 
  Phone, 
  Mail, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  X,
  Save,
  Check
} from 'lucide-react';
import { ALL_PRODUCTS } from '../utils/sampleData';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses' | 'reminders' | 'wallet'
  
  // Customer Profile State (persisted in localStorage)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('aura_customer_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      fullName: 'Ananya Sharma',
      email: 'ananya.sharma@example.com',
      phone: '+91 98765 43210',
      birthday: '1998-07-15',
      anniversary: '2023-11-20',
      membershipTier: 'Aura VIP Gold',
      memberSince: 'October 2024',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    };
  });

  const [editForm, setEditForm] = useState({ ...profile });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Saved Addresses
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('aura_customer_addresses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: 'addr-1',
        title: 'Home (Self)',
        recipientName: 'Ananya Sharma',
        phone: '+91 98765 43210',
        line1: 'Flat 402, Lotus Residency, 12th Main Road',
        line2: 'Koramangala 4th Block',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560034',
        isDefault: true
      },
      {
        id: 'addr-2',
        title: 'Gift Delivery (Sneha - Best Friend)',
        recipientName: 'Sneha Patel',
        phone: '+91 98111 22334',
        line1: 'B-702, Skyline Towers, Baner Road',
        line2: 'Opposite Westend Mall',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411045',
        isDefault: false
      }
    ];
  });

  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: 'Work / Friend',
    recipientName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  // Gift Occasion Reminders
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('aura_customer_reminders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: 'rem-1',
        name: "Sneha's Birthday",
        relationship: 'Best Friend',
        date: 'Dec 02, 2026',
        daysLeft: 7,
        suggestedCategory: 'Teddy & Panda Plush',
        suggestedGift: 'Giant Cuddly Teddy Bear (3 Feet) with Satin Bow'
      },
      {
        id: 'rem-2',
        name: "Parents' 25th Silver Anniversary",
        relationship: 'Parents',
        date: 'Dec 22, 2026',
        daysLeft: 27,
        suggestedCategory: 'Photo Frames',
        suggestedGift: 'Custom Laser Engraved Wooden Keepsake Frame'
      },
      {
        id: 'rem-3',
        name: "Sister's Graduation Day",
        relationship: 'Sister',
        date: 'Jan 15, 2027',
        daysLeft: 51,
        suggestedCategory: 'Chains & Rings',
        suggestedGift: 'Personalized 18K Gold Plated Name Pendant Chain'
      }
    ];
  });

  // Customer Orders
  const [orders] = useState([
    {
      id: 'AG-89421',
      date: 'Nov 24, 2026',
      status: 'Out for Delivery',
      expectedDelivery: 'Today by 5:00 PM',
      trackingStep: 3, // 0: placed, 1: packed, 2: shipped, 3: out for delivery, 4: delivered
      courier: 'Bluedart Express Air (AWB: BD-84920194)',
      giftFor: 'Sneha Patel (Birthday Surprise 🎂)',
      giftNote: '"Happy Birthday Sneha! Wishing you the best year ahead. Love, Ananya"',
      giftWrap: 'Luxury Coral Matte Paper with Gold Satin Ribbon',
      totalAmount: 2498,
      items: [
        {
          product: ALL_PRODUCTS.find(p => p.id === 'prod-10') || ALL_PRODUCTS[1],
          quantity: 1,
          price: 2499
        }
      ]
    },
    {
      id: 'AG-86310',
      date: 'Nov 12, 2026',
      status: 'Delivered',
      expectedDelivery: 'Delivered on Nov 15, 2026',
      trackingStep: 4,
      courier: 'Delhivery Surface (AWB: DEL-7729103)',
      giftFor: 'Self (Home Decor)',
      giftNote: 'No gift note attached',
      giftWrap: 'Standard Eco Protection Box',
      totalAmount: 1999,
      items: [
        {
          product: ALL_PRODUCTS.find(p => p.id === 'prod-3') || ALL_PRODUCTS[2],
          quantity: 1,
          price: 1999
        }
      ]
    },
    {
      id: 'AG-81204',
      date: 'Oct 28, 2026',
      status: 'Delivered',
      expectedDelivery: 'Delivered on Oct 30, 2026',
      trackingStep: 4,
      courier: 'Bluedart Express (AWB: BD-109284)',
      giftFor: 'Mom & Dad (Diwali Celebration)',
      giftNote: '"Happy Diwali Mom & Dad! Wishing peace and happiness."',
      giftWrap: 'Festive Gold Foil Wrap with Greeting Card',
      totalAmount: 1499,
      items: [
        {
          product: ALL_PRODUCTS.find(p => p.id === 'prod-4') || ALL_PRODUCTS[0],
          quantity: 1,
          price: 1499
        }
      ]
    }
  ]);

  // Selected Order for Tracking Modal
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Save profile updates
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(editForm);
    localStorage.setItem('aura_customer_profile', JSON.stringify(editForm));
    setIsEditingProfile(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Add new address
  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.recipientName || !newAddress.line1 || !newAddress.pincode) return;

    const created = {
      ...newAddress,
      id: `addr-${Date.now()}`
    };

    let updated = [...addresses];
    if (created.isDefault) {
      updated = updated.map(a => ({ ...a, isDefault: false }));
    }
    updated.push(created);

    setAddresses(updated);
    localStorage.setItem('aura_customer_addresses', JSON.stringify(updated));
    setShowAddAddressModal(false);
    setNewAddress({
      title: 'Work / Friend',
      recipientName: '',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
  };

  const setDefaultAddress = (id) => {
    const updated = addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    setAddresses(updated);
    localStorage.setItem('aura_customer_addresses', JSON.stringify(updated));
  };

  const deleteAddress = (id) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('aura_customer_addresses', JSON.stringify(updated));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Customer Profile & Account</span>
        </nav>

        {/* PROFILE HEADER HERO BANNER */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-slate-200/80 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            {/* Avatar & Details */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative">
                <img 
                  src={profile.avatar} 
                  alt={profile.fullName} 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-primary/20 shadow-md"
                />
                <span className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white" title="Verified Customer">
                  <Check className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {profile.fullName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-full text-xs font-semibold">
                    <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {profile.membershipTier}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {profile.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {profile.phone}
                  </span>
                  <span className="text-slate-400">
                    Member since {profile.memberSince}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  setActiveTab('profile');
                  setIsEditingProfile(true);
                }}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
              </button>
              <Link
                to="/products"
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Shop Gifts
              </Link>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block mb-0.5">Total Orders</span>
              <span className="text-xl font-bold text-slate-900">{orders.length} Placed</span>
            </div>
            <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60">
              <span className="text-[11px] font-medium text-amber-700 uppercase tracking-wider block mb-0.5">Active Delivery</span>
              <span className="text-xl font-bold text-amber-800">1 Out for Delivery 🚚</span>
            </div>
            <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200/60">
              <span className="text-[11px] font-medium text-emerald-700 uppercase tracking-wider block mb-0.5">Aura Wallet Balance</span>
              <span className="text-xl font-bold text-emerald-800">₹500.00</span>
            </div>
            <div className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-200/60">
              <span className="text-[11px] font-medium text-rose-700 uppercase tracking-wider block mb-0.5">Upcoming Occasions</span>
              <span className="text-xl font-bold text-rose-800">{reminders.length} Saved</span>
            </div>
          </div>
        </div>

        {/* TAB CONTROLS (HORIZONTAL SCROLL ON MOBILE) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-slate-200">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            My Orders & Tracking ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            Personal Details
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'addresses'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Saved Addresses ({addresses.length})
          </button>

          <button
            onClick={() => setActiveTab('reminders')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'reminders'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Gift Reminders ({reminders.length})
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'wallet'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Wallet & Coupons
          </button>
        </div>

        {/* TAB 1: MY ORDERS & GIFT TRACKING */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.map((order) => {
              const isOutForDelivery = order.status === 'Out for Delivery';

              return (
                <div 
                  key={order.id} 
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOutForDelivery 
                      ? 'border-amber-300 shadow-sm ring-1 ring-amber-100' 
                      : 'border-slate-200/90'
                  }`}
                >
                  {/* Order Top Bar */}
                  <div className="p-5 sm:p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                          Order #{order.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isOutForDelivery 
                            ? 'bg-amber-100 text-amber-800 animate-pulse' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Placed on {order.date} • Expected: <strong className="text-slate-700">{order.expectedDelivery}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        Live Gift Tracking
                      </button>
                      <a
                        href={`https://wa.me/919876543210?text=Hello%20Aura%20Gifts!%20Need%20update%20on%20my%20Order%20${order.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                      >
                        WhatsApp Help
                      </a>
                    </div>
                  </div>

                  {/* Order Item Details */}
                  <div className="p-5 sm:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Products list */}
                      <div className="lg:col-span-2 space-y-4">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <img 
                              src={it.product.primaryImage} 
                              alt={it.product.name} 
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                {it.product.category}
                              </span>
                              <h4 className="text-sm font-semibold text-slate-900 line-clamp-1 hover:text-primary transition-colors">
                                <Link to={`/products/${it.product.id}`}>{it.product.name}</Link>
                              </h4>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                {it.product.subtitle}
                              </p>
                              <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-700 font-medium">
                                <span>Qty: {it.quantity}</span>
                                <span>•</span>
                                <span className="text-slate-900 font-bold">₹{it.price.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Gift Wrap & Note pill */}
                        <div className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-200/60 text-xs text-slate-700 space-y-1">
                          <div className="flex items-center gap-1.5 font-semibold text-rose-800">
                            <Gift className="w-3.5 h-3.5 text-rose-600" />
                            <span>Gift Recipient: {order.giftFor}</span>
                          </div>
                          <div className="text-slate-600 italic pl-5">
                            {order.giftNote}
                          </div>
                          <div className="text-[11px] text-slate-500 pl-5">
                            Wrap: {order.giftWrap}
                          </div>
                        </div>
                      </div>

                      {/* Live Tracking Timeline */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col justify-between">
                        <div>
                          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-primary" />
                            Delivery Status
                          </h5>
                          
                          <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                            <div className="flex items-start gap-3 relative">
                              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] mt-0.5 ring-4 ring-white">
                                ✓
                              </span>
                              <div className="text-xs">
                                <span className="font-semibold text-slate-900 block">Order Confirmed</span>
                                <span className="text-[10px] text-slate-500">Customization verified</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 relative">
                              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] mt-0.5 ring-4 ring-white">
                                ✓
                              </span>
                              <div className="text-xs">
                                <span className="font-semibold text-slate-900 block">Gift Wrapped & Packaged</span>
                                <span className="text-[10px] text-slate-500">Premium ribbon applied</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 relative">
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] mt-0.5 ring-4 ring-white ${
                                order.trackingStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-300'
                              }`}>
                                ✓
                              </span>
                              <div className="text-xs">
                                <span className="font-semibold text-slate-900 block">In Transit via Air</span>
                                <span className="text-[10px] text-slate-500">Bluedart Express</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 relative">
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] mt-0.5 ring-4 ring-white ${
                                order.trackingStep >= 3 ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-300'
                              }`}>
                                •
                              </span>
                              <div className="text-xs">
                                <span className={`font-semibold block ${order.trackingStep >= 3 ? 'text-amber-800 font-bold' : 'text-slate-500'}`}>
                                  Out for Delivery
                                </span>
                                <span className="text-[10px] text-slate-500">Delivery agent on the way</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200 text-xs flex items-center justify-between">
                          <span className="text-slate-500">Total Paid:</span>
                          <span className="font-serif font-bold text-slate-900 text-base">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: PERSONAL DETAILS & EDIT PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 max-w-3xl shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Personal Information</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manage your personal gift profile and occasion details</p>
              </div>

              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-4 py-1.5 text-xs font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Details
                </button>
              )}
            </div>

            {saveSuccess && (
              <div className="mb-6 p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Profile details updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all ${
                      isEditingProfile 
                        ? 'border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled={!isEditingProfile}
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all ${
                      isEditingProfile 
                        ? 'border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditingProfile}
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all ${
                      isEditingProfile 
                        ? 'border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    disabled={!isEditingProfile}
                    value={editForm.birthday}
                    onChange={(e) => setEditForm({ ...editForm, birthday: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all ${
                      isEditingProfile 
                        ? 'border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Wedding / Relationship Anniversary
                  </label>
                  <input
                    type="date"
                    disabled={!isEditingProfile}
                    value={editForm.anniversary}
                    onChange={(e) => setEditForm({ ...editForm, anniversary: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all ${
                      isEditingProfile 
                        ? 'border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white' 
                        : 'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Membership Tier
                  </label>
                  <div className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-semibold flex items-center justify-between">
                    <span>{profile.membershipTier}</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">VIP</span>
                  </div>
                </div>
              </div>

              {isEditingProfile && (
                <div className="pt-4 flex items-center gap-3 border-t border-slate-100">
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm transition-colors flex items-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditForm({ ...profile });
                      setIsEditingProfile(false);
                    }}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {/* TAB 3: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Saved Delivery Addresses</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manage delivery addresses for yourself, friends and gift recipients</p>
              </div>

              <button
                onClick={() => setShowAddAddressModal(true)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {addresses.map((addr) => (
                <div 
                  key={addr.id}
                  className={`bg-white rounded-2xl p-6 border transition-all ${
                    addr.isDefault 
                      ? 'border-primary shadow-xs ring-1 ring-primary/20' 
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm">{addr.title}</span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">
                          Default Address
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors text-xs"
                      title="Delete Address"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="font-bold text-slate-800 text-sm">{addr.recipientName}</p>
                    <p>{addr.line1}</p>
                    {addr.line2 && <p>{addr.line2}</p>}
                    <p>{addr.city}, {addr.state} - <strong>{addr.pincode}</strong></p>
                    <p className="text-slate-500 pt-1">Phone: {addr.phone}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    {!addr.isDefault ? (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-primary hover:underline font-semibold"
                      >
                        Set as Default
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Selected for Default Checkout
                      </span>
                    )}

                    <span className="text-[11px] text-slate-400">Gift Delivery Eligible</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GIFT OCCASION REMINDERS */}
        {activeTab === 'reminders' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-transparent p-6 rounded-2xl border border-rose-200/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-rose-700 text-xs font-bold rounded-full mb-2 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    Special Aura Gift Feature
                  </span>
                  <h3 className="font-serif text-xl font-bold text-slate-900">Never Forget a Loved One's Special Day</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl">
                    We'll remind you via WhatsApp or Email 7 days before each birthday or anniversary so your personalized gifts always arrive right on time!
                  </p>
                </div>

                <Link
                  to="/products"
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm transition-colors text-center whitespace-nowrap"
                >
                  Explore Gift Catalogue
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {reminders.map((rem) => (
                <div key={rem.id} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200/60 text-[10px] font-bold uppercase rounded-full">
                        {rem.relationship}
                      </span>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        In {rem.daysLeft} Days
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-slate-900 mb-1">{rem.name}</h4>
                    <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {rem.date}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                        Recommended Gift:
                      </span>
                      <p className="font-semibold text-slate-800 line-clamp-1">{rem.suggestedGift}</p>
                      <span className="text-[11px] text-primary">{rem.suggestedCategory}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to="/products"
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Find Matching Gifts</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={`https://wa.me/919876543210?text=Hi%20Aura!%20Recommend%20a%20gift%20for%20${encodeURIComponent(rem.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-slate-500 hover:text-slate-800"
                    >
                      Ask Concierge
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: WALLET & COUPONS */}
        {activeTab === 'wallet' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                    Aura Gift Wallet
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                
                <span className="text-xs text-slate-400 block mb-1">Available Credits</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">₹500.00</h3>
                <p className="text-xs text-slate-300">
                  Can be redeemed directly at cart checkout on any customized gift order.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span>Account: {profile.fullName}</span>
                <span className="text-amber-400 font-semibold">Auto-applied</span>
              </div>
            </div>

            {/* Available Coupon Codes */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">Active Customer Coupons</h3>
              <p className="text-xs text-slate-500 mb-4">Click any coupon to copy or use in your shopping cart</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-dashed border-primary/50 bg-primary/5 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-primary text-sm px-2.5 py-0.5 bg-white rounded border border-primary/20">
                        GIFTJOY
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        10% OFF
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium mt-2">
                      Get flat 10% discount on all gift items & custom hampers.
                    </p>
                    <span className="text-[11px] text-slate-500 block mt-1">Valid till Dec 31, 2026</span>
                  </div>

                  <Link 
                    to="/cart"
                    className="mt-3 text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Apply in Cart →
                  </Link>
                </div>

                <div className="border border-dashed border-amber-300 bg-amber-50/50 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-amber-800 text-sm px-2.5 py-0.5 bg-white rounded border border-amber-200">
                        AURAWELCOME
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        ₹150 OFF
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium mt-2">
                      Flat ₹150 off on orders above ₹999 for registered members.
                    </p>
                    <span className="text-[11px] text-slate-500 block mt-1">No expiry</span>
                  </div>

                  <Link 
                    to="/cart"
                    className="mt-3 text-xs font-semibold text-amber-800 hover:underline inline-flex items-center gap-1"
                  >
                    Apply in Cart →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW ADDRESS */}
        {showAddAddressModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
              <button 
                onClick={() => setShowAddAddressModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">Add New Delivery Address</h3>
              <p className="text-xs text-slate-500 mb-5">Deliver gifts directly to friends, loved ones or yourself</p>

              <form onSubmit={handleAddAddress} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Address Label (e.g., Mom's Home, Sneha's Office)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gift for Sneha"
                    value={newAddress.title}
                    onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Recipient Full Name"
                      value={newAddress.recipientName}
                      onChange={(e) => setNewAddress({ ...newAddress, recipientName: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765..."
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Flat / House No., Building Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House / Flat No., Street, Area"
                    value={newAddress.line1}
                    onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Pincode"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isDefaultCheck"
                    checked={newAddress.isDefault}
                    onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor="isDefaultCheck" className="text-xs text-slate-700">
                    Set this as my primary delivery address
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddAddressModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm transition-colors"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: DETAILED ORDER TRACKING */}
        {selectedOrderDetails && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative">
              <button 
                onClick={() => setSelectedOrderDetails(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-5 h-5 text-primary" />
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Tracking Order #{selectedOrderDetails.id}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-5">
                {selectedOrderDetails.courier}
              </p>

              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900 mb-6">
                <strong>Status:</strong> {selectedOrderDetails.status} • {selectedOrderDetails.expectedDelivery}
              </div>

              <div className="space-y-4 text-xs border-t border-b border-slate-100 py-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Gift For:</span>
                  <span className="font-semibold text-slate-800">{selectedOrderDetails.giftFor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Gift Packaging:</span>
                  <span className="font-semibold text-slate-800">{selectedOrderDetails.giftWrap}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Gift Message:</span>
                  <span className="italic text-slate-700 max-w-xs text-right">{selectedOrderDetails.giftNote}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Price:</span>
                  <span className="font-bold text-slate-900">₹{selectedOrderDetails.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <a
                  href={`https://wa.me/919876543210?text=Tracking%20Order%20${selectedOrderDetails.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm transition-colors"
                >
                  Contact Courier via WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
