import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, Heart, ShoppingBag, Sparkles, Check, ArrowLeft, ShieldCheck, 
  Truck, Gift, Clock, RefreshCw, Send, MessageCircle, Share2, ThumbsUp 
} from 'lucide-react';
import { ALL_PRODUCTS } from '../utils/sampleData';
import CustomizationModal from '../components/common/CustomizationModal';

// Dedicated buyer reviews database mapped by product ID, with comprehensive fallback
const DEFAULT_BUYER_REVIEWS = {
  'prod-4': [
    {
      id: 1,
      author: 'Pooja Verma',
      location: 'Delhi NCR',
      rating: 5,
      date: '2 days ago',
      milestone: 'Ordered for Parents’ 25th Silver Jubilee',
      verified: true,
      comment: 'The brass border gives it an antique luxury look. The complimentary photo printing was incredibly sharp and vibrant. My parents were truly moved when they opened it!',
      helpfulCount: 24,
      reaction: 'Highly Recommended'
    },
    {
      id: 2,
      author: 'Arjun Nambiar',
      location: 'Kochi, Kerala',
      rating: 5,
      date: '1 week ago',
      milestone: 'Anniversary Gift for Wife',
      verified: true,
      comment: 'Sturdy glass and heavy metal construction. You can feel the premium weight right away. Arrived safely padded with bubble wrap and a red satin bow. 10/10!',
      helpfulCount: 18,
      reaction: 'Worth Every Rupee'
    },
    {
      id: 3,
      author: 'Shalini Gupta',
      location: 'Pune',
      rating: 5,
      date: '2 weeks ago',
      milestone: 'Birthday Gift for Best Friend',
      verified: true,
      comment: 'I contacted the admin via WhatsApp before ordering to request special cropping for our childhood photo. They were so supportive and sent a live preview! Great customer service.',
      helpfulCount: 11,
      reaction: 'Superb Support'
    }
  ],
  'prod-10': [
    {
      id: 1,
      author: 'Neha Roy',
      location: 'Kolkata',
      rating: 5,
      date: '3 days ago',
      milestone: 'Ordered for Daughter’s 6th Birthday',
      verified: true,
      comment: 'This teddy bear is so extraordinarily soft and huggable! Safe non-toxic plush, and the satin bow is stitched beautifully. My daughter takes it to bed every single night.',
      helpfulCount: 31,
      reaction: 'Cutest Gift Ever'
    },
    {
      id: 2,
      author: 'Karan Mehra',
      location: 'Mumbai',
      rating: 5,
      date: '5 days ago',
      milestone: 'Romantic Surprise Delivery',
      verified: true,
      comment: 'Sent this along with a red rose bouquet to my partner. The handwritten note card looked so authentic and heartfelt. Arrived on the exact promised date.',
      helpfulCount: 19,
      reaction: 'Perfect Surprise'
    },
    {
      id: 3,
      author: 'Ananya Deshmukh',
      location: 'Nagpur',
      rating: 5,
      date: '3 weeks ago',
      milestone: 'Friendship Day Gift',
      verified: true,
      comment: 'Much bigger than I expected for this price point! Fur doesn’t shed at all. Clean and nicely scented packaging.',
      helpfulCount: 14,
      reaction: 'Great Value'
    }
  ],
  'prod-1': [
    {
      id: 1,
      author: 'Sneha Patel',
      location: 'Bangalore',
      rating: 5,
      date: 'Yesterday',
      milestone: 'Ordered for 1st Wedding Anniversary',
      verified: true,
      comment: 'The natural teak wood grain with our names and wedding date laser-engraved is breathtaking. It feels like an heirloom keepsake we will cherish forever.',
      helpfulCount: 42,
      reaction: 'Heirloom Quality'
    },
    {
      id: 2,
      author: 'Rohan Singhania',
      location: 'Jaipur',
      rating: 5,
      date: '4 days ago',
      milestone: 'Engagement Keepsake for Fiancee',
      verified: true,
      comment: 'The brass hinges open smoothly and the velvet lining on the inside protects rings and jewelry perfectly. The admin customized the font exactly as requested.',
      helpfulCount: 27,
      reaction: 'Flawless Engraving'
    }
  ],
  'prod-2': [
    {
      id: 1,
      author: 'Rohit Sharma',
      location: 'Mumbai',
      rating: 5,
      date: '3 days ago',
      milestone: 'Festive Gift for Family',
      verified: true,
      comment: 'The Belgian chocolates were fresh and decadent, and the brass jar is reusable. The packaging was royal with a thick satin ribbon.',
      helpfulCount: 35,
      reaction: 'Luxury Hamper'
    }
  ],
  'prod-15': [
    {
      id: 1,
      author: 'Divya Nambiar',
      location: 'Chennai',
      rating: 5,
      date: '2 days ago',
      milestone: 'Birthday Surprise for Younger Sister',
      verified: true,
      comment: 'This panda plush is ridiculously cute! Incredibly soft, huggable, and exactly as pictured. Arrived in a lovely gift box with a handwritten note.',
      helpfulCount: 22,
      reaction: 'Adorable Plush'
    },
    {
      id: 2,
      author: 'Amitabh Sengupta',
      location: 'Kolkata',
      rating: 5,
      date: '1 week ago',
      milestone: 'Gift for Best Friend',
      verified: true,
      comment: 'Super soft material and premium stitching. My friend was so delighted. 10/10 gift quality.',
      helpfulCount: 16,
      reaction: 'Worth Buying'
    }
  ],
  'prod-16': [
    {
      id: 1,
      author: 'Kavita Chawla',
      location: 'Delhi',
      rating: 5,
      date: 'Yesterday',
      milestone: 'Anniversary Gift for Girlfriend',
      verified: true,
      comment: 'The 18K gold plating is brilliant and the laser-cut name calligraphy is flawless. The velvet box made the unboxing experience feel so luxurious.',
      helpfulCount: 29,
      reaction: 'Flawless Jewelry'
    }
  ],
  'prod-17': [
    {
      id: 1,
      author: 'Siddharth Rao',
      location: 'Hyderabad',
      rating: 5,
      date: '4 days ago',
      milestone: 'Proposal & Promise Rings',
      verified: true,
      comment: 'Both rings fit comfortably since they are adjustable. The red velvet gift case is stunning. She said YES immediately!',
      helpfulCount: 45,
      reaction: 'Magical Moment'
    }
  ],
  'prod-18': [
    {
      id: 1,
      author: 'Sunita Agarwal',
      location: 'Jaipur',
      rating: 5,
      date: '3 days ago',
      milestone: 'Festive Diwali & Wedding Season Gift',
      verified: true,
      comment: 'The gold micro-plating and traditional Meenakari work are exquisite. Received so many compliments at the wedding.',
      helpfulCount: 19,
      reaction: 'Stunning Bangles'
    }
  ]
};

// Generic buyer reviews generator for any product
const generateProductReviews = (product) => {
  if (DEFAULT_BUYER_REVIEWS[product.id]) {
    return DEFAULT_BUYER_REVIEWS[product.id];
  }
  return [
    {
      id: 101,
      author: 'Aarti Kulkarni',
      location: 'Hyderabad',
      rating: 5,
      date: '4 days ago',
      milestone: `Ordered for ${product.category}`,
      verified: true,
      comment: `Absolutely loved this ${product.name}! Packaging was exquisite and arrived right on time in pristine condition. Highly recommend AuraGifts!`,
      helpfulCount: 16,
      reaction: 'Verified Purchase'
    },
    {
      id: 102,
      author: 'Vikram Joshi',
      location: 'Bengaluru',
      rating: 5,
      date: '1 week ago',
      milestone: 'Celebration Gift',
      verified: true,
      comment: 'The quality surpassed our expectations. You can instantly tell it is made with premium materials. Will definitely order from here again.',
      helpfulCount: 12,
      reaction: 'Exceptional Quality'
    },
    {
      id: 103,
      author: 'Priya Sundaram',
      location: 'Chennai',
      rating: 4,
      date: '2 weeks ago',
      milestone: 'Milestone Gift',
      verified: true,
      comment: 'Really neat presentation and prompt delivery. The gift card was handwritten with lovely calligraphy.',
      helpfulCount: 8,
      reaction: 'Prompt Delivery'
    }
  ];
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product by id
  const product = ALL_PRODUCTS.find((p) => p.id === id) || ALL_PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Reviews state
  const [reviews, setReviews] = useState(() => generateProductReviews(product));
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    location: '',
    rating: 5,
    milestone: '',
    comment: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Scroll to top on page mount or id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setReviews(generateProductReviews(product));
    setQuantity(1);
    setAddedToCart(false);
  }, [id, product]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) return;

    const createdReview = {
      id: Date.now(),
      author: newReview.author,
      location: newReview.location || 'India',
      rating: Number(newReview.rating),
      date: 'Just now',
      milestone: newReview.milestone || `Purchased ${product.name}`,
      verified: true,
      comment: newReview.comment,
      helpfulCount: 1,
      reaction: 'Recent Buyer'
    };

    setReviews([createdReview, ...reviews]);
    setNewReview({ author: '', location: '', rating: 5, milestone: '', comment: '' });
    setShowReviewForm(false);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3500);
  };

  // Recommended related gifts
  const relatedGifts = ALL_PRODUCTS
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Back navigation */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs text-slate-500">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-primary font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Catalog</span>
          </button>

          <nav className="hidden sm:flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary transition-colors">All Gifts</Link>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-xs">{product.name}</span>
          </nav>
        </div>

        {/* Product Main Display Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 p-4 sm:p-8 lg:p-10">
            
            {/* Left Column: Visual Presentation */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-primary text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    {product.tag || 'Best Seller'}
                  </span>
                  {product.discount > 0 && (
                    <span className="bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                    isWishlisted 
                      ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                      : 'bg-white/95 text-slate-700 hover:text-rose-600'
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>

                {/* Material Pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 flex items-center justify-between text-xs text-slate-800 border border-slate-200">
                  <span className="font-semibold text-slate-900">Craftsmanship: {product.material}</span>
                  {product.isPersonalizable && (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Customizable
                    </span>
                  )}
                </div>
              </div>

              {/* Guarantees Ribbon */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                  <Gift className="w-5 h-5 text-primary mb-1" />
                  <span className="font-bold text-slate-800 text-[11px]">Free Gift Wrap</span>
                  <span className="text-[10px] text-slate-500">Includes satin ribbon</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="font-bold text-slate-800 text-[11px]">Quality Check</span>
                  <span className="text-[10px] text-slate-500">100% genuine verified</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                  <Truck className="w-5 h-5 text-indigo-600 mb-1" />
                  <span className="font-bold text-slate-800 text-[11px]">Fast Dispatch</span>
                  <span className="text-[10px] text-slate-500">In 24 to 48 hrs</span>
                </div>
              </div>
            </div>

            {/* Right Column: Gift Info, Customization & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              <div>
                {/* Category & Ratings Bar */}
                <div className="flex items-center justify-between gap-2 text-xs mb-2">
                  <span className="uppercase tracking-widest font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {product.category}
                  </span>
                  
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({reviews.length} Verified Reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  {product.name}
                </h1>

                {/* Subtitle / Catchphrase */}
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Pricing Block */}
                <div className="mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discount}%)
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">Inclusive of all taxes</span>
                </div>

                {/* Key Specifications Bullet Points */}
                <div className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Crafted with:</strong> {product.material} with premium hand-polishing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Free Gift Inclusions:</strong> Artisanal gift packaging, gold foil sticker & personalized greeting card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Suitability:</strong> Anniversaries, Birthdays, Weddings, Housewarmings & Festive surprises</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                
                {/* 1. Client-to-Admin Customization Trigger */}
                {product.isPersonalizable && (
                  <button
                    type="button"
                    onClick={() => setIsCustomizing(true)}
                    className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                    <span>✨ Customize & Convey to Admin (Free Preview)</span>
                  </button>
                )}

                {/* 2. Quantity & Add to Cart */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 px-2 py-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg text-slate-700 hover:bg-white flex items-center justify-center font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-slate-900">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg text-slate-700 hover:bg-white flex items-center justify-center font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all ${
                      addedToCart
                        ? 'bg-emerald-700 text-white'
                        : 'bg-primary text-white hover:bg-primary-hover'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Added to Your Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add {quantity} to Cart</span>
                      </>
                    )}
                  </button>
                </div>

                {/* WhatsApp Direct Inquiry Assist */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-4 h-4 text-amber-600" /> Ready in Stock & Dispatched Today
                  </span>

                  <a
                    href={`https://wa.me/919876543210?text=Hello%20AuraGifts!%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(SKU:%20${product.sku})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* In-Depth Product Tabs (Description & Specifications) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-4 sm:p-8 lg:p-10 mb-12">
          <div className="flex items-center gap-4 sm:gap-6 border-b border-slate-200 pb-3 sm:pb-4 text-xs sm:text-sm font-bold overflow-x-auto no-scrollbar whitespace-nowrap">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-2 transition-all relative ${
                activeTab === 'description'
                  ? 'text-primary'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Full Gift Description</span>
              {activeTab === 'description' && (
                <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-2 transition-all relative ${
                activeTab === 'specifications'
                  ? 'text-primary'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>What’s Inside the Box</span>
              {activeTab === 'specifications' && (
                <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-2 transition-all relative ${
                activeTab === 'shipping'
                  ? 'text-primary'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Delivery & Quality Guarantee</span>
              {activeTab === 'shipping' && (
                <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'description' && (
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed max-w-4xl">
                <p>
                  Elevate your memorable milestones with our meticulously designed <strong>{product.name}</strong>. 
                  Every unit is individually inspected and curated by our skilled artisans to guarantee uncompromised elegance, 
                  aesthetic beauty, and longevity.
                </p>
                <p>
                  Whether celebrating an anniversary, a heartfelt birthday, a housewarming, or a corporate milestone, 
                  this piece combines timeless aesthetics with personal sentiment. We treat every single gift not just as an order, 
                  but as an emotional messenger connecting you with the people you cherish most.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-1 text-xs uppercase tracking-wider">🌟 Premium Materials</h4>
                    <p className="text-xs text-slate-600">Built using genuine {product.material}, protected against aging and tarnishing for lifelong display.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-1 text-xs uppercase tracking-wider">✍️ Personalized Message Card</h4>
                    <p className="text-xs text-slate-600">Complimentary handwritten wish card with your heartfelt message included in every parcel.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-3 text-sm text-slate-700 max-w-3xl">
                <h4 className="font-serif font-bold text-slate-900 text-base mb-2">Each Package Contains:</h4>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                    <span>1 × {product.name} (Material: {product.material})</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                    <span>1 × Luxury Sturdy Presentation Gift Box with Satin Ribbon</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                    <span>1 × Custom Printed / Handwritten Greeting Note with Wax Seal Sticker</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                    <span>1 × Safe Transit Bubble-Lock Cushioning for Zero Damage Assurance</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3 text-sm text-slate-700 max-w-3xl">
                <p className="text-xs leading-relaxed">
                  We partner with top-tier express courier services (BlueDart, Delhivery, DTDC) with end-to-end tracking:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Metro Cities</p>
                    <p className="text-slate-500 mt-1">2 to 3 Business Days</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Tier 2 & 3 Cities</p>
                    <p className="text-slate-500 mt-1">3 to 5 Business Days</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Damage Protection</p>
                    <p className="text-slate-500 mt-1">100% Free Replacement</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Client Reviews Section (Who Already Bought) */}
        <div id="reviews-section" className="bg-white rounded-3xl border border-slate-200 shadow-xs p-4 sm:p-8 lg:p-10 mb-12">
          
          {/* Reviews Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Verified Buyer Feedback</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Customer Reviews from Buyers ({reviews.length})
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Real feedback from verified clients who ordered this gift
              </p>
            </div>

            {/* Write a Review Button */}
            <button
              type="button"
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary text-primary hover:bg-primary/5 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{showReviewForm ? 'Close Review Form' : 'Write a Review'}</span>
            </button>
          </div>

          {/* Rating Summary Metric Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-8">
            <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
              <span className="font-serif text-5xl font-bold text-slate-900">{product.rating}</span>
              <div className="flex items-center text-amber-400 my-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">Based on {reviews.length} verified buyer experiences</span>
            </div>

            <div className="md:col-span-8 flex flex-col justify-center space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-12 font-medium text-slate-600">5 Star</span>
                <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[92%]"></div>
                </div>
                <span className="w-10 text-right font-bold text-slate-700">92%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 font-medium text-slate-600">4 Star</span>
                <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[8%]"></div>
                </div>
                <span className="w-10 text-right font-bold text-slate-700">8%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 font-medium text-slate-600">3 Star</span>
                <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[0%]"></div>
                </div>
                <span className="w-10 text-right font-bold text-slate-700">0%</span>
              </div>
            </div>
          </div>

          {/* New Review Success Alert */}
          {reviewSubmitted && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your verified client review has been published.</span>
            </div>
          )}

          {/* Interactive Review Form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mb-8 p-6 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">Share Your Experience with This Gift</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your City / Location</label>
                  <input
                    type="text"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Star Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-primary"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 / 5 - Exceptional)</option>
                    <option value="4">⭐⭐⭐⭐ (4 / 5 - Very Good)</option>
                    <option value="3">⭐⭐⭐ (3 / 5 - Average)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">What Occasion Did You Buy It For?</label>
                  <input
                    type="text"
                    value={newReview.milestone}
                    onChange={(e) => setNewReview({ ...newReview, milestone: e.target.value })}
                    placeholder="e.g. Ordered for Sister's Birthday"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Review & Packaging Quality *</label>
                <textarea
                  required
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Tell future buyers about the gift quality, packaging, delivery speed, and reaction of the recipient..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-primary"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-hover shadow-sm"
              >
                Submit Verified Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center border border-primary/20">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{rev.author}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.location} • {rev.date}</span>
                    </div>
                  </div>

                  {/* Rating Stars & Badge */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {rev.reaction && (
                      <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {rev.reaction}
                      </span>
                    )}
                  </div>
                </div>

                {/* Milestone Badge */}
                {rev.milestone && (
                  <div className="inline-block text-xs font-medium text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-200/60">
                    🎯 <strong>Milestone:</strong> {rev.milestone}
                  </div>
                )}

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                  "{rev.comment}"
                </p>

                {/* Helpful count */}
                <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1 hover:text-primary cursor-pointer transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.helpfulCount})
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* You May Also Like / Related Gifts */}
        <div className="mt-14">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Complementary Gifts</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              You May Also Love
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedGifts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/products/${item.id}`)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-luxury transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square overflow-hidden bg-slate-100 relative">
                    <img
                      src={item.primaryImage}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] uppercase font-bold text-amber-700">{item.category}</span>
                    <h4 className="font-serif text-sm font-bold text-slate-900 line-clamp-1 mt-1 group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100">
                  <span className="font-serif font-bold text-slate-900 text-base">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-primary font-bold group-hover:translate-x-1 transition-transform">
                    View Gift →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Customization Modal */}
      {isCustomizing && (
        <CustomizationModal
          isOpen={isCustomizing}
          onClose={() => setIsCustomizing(false)}
          product={product}
        />
      )}
    </div>
  );
}
