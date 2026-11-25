import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Trash2, ArrowLeft, ArrowRight, ShieldCheck, 
  Truck, Gift, Check, Sparkles, Tag, MessageCircle 
} from 'lucide-react';
import { ALL_PRODUCTS } from '../utils/sampleData';

export default function CartPage() {
  // Initial sample cart items matching the navbar badge (2 items)
  const [cartItems, setCartItems] = useState([
    {
      ...ALL_PRODUCTS.find(p => p.id === 'prod-10') || ALL_PRODUCTS[1],
      quantity: 1,
      selectedWrap: true
    },
    {
      ...ALL_PRODUCTS.find(p => p.id === 'prod-4') || ALL_PRODUCTS[2],
      quantity: 1,
      selectedWrap: true
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Update item quantity
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Apply Coupon
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'GIFTJOY') {
      setAppliedDiscount(10);
      setCouponMessage('Coupon GIFTJOY applied! 10% discount added.');
    } else {
      setCouponMessage('Invalid coupon code. Try GIFTJOY for 10% off.');
    }
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const shippingFee = subtotal > 999 ? 0 : 99;
  const total = subtotal - discountAmount + (cartItems.length > 0 ? shippingFee : 0);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => setCheckoutSuccess(false), 5000);
  };

  const orderSummaryText = encodeURIComponent(
    `Hello AuraGifts! I want to place an order for:\n` +
    cartItems.map(i => `• ${i.name} (Qty: ${i.quantity}) - ₹${i.price * i.quantity}`).join('\n') +
    `\nTotal Payable: ₹${total}\nPlease confirm delivery!`
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs text-slate-500">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-primary font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <span className="font-medium">My Shopping Bag ({cartItems.length} items)</span>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
            <span>Ready for Gifting</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Shopping Cart
          </h1>
        </div>

        {checkoutSuccess && (
          <div className="mb-8 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>Order initiated successfully! Our gift curation team will contact you for dispatch confirmation.</span>
            </div>
            <a
              href={`https://wa.me/919876543210?text=${orderSummaryText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Confirm on WhatsApp</span>
            </a>
          </div>
        )}

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Alert Bar */}
              <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-4 rounded-2xl border border-amber-200/80 flex items-center gap-3 text-xs text-slate-700">
                <Truck className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="flex-1">
                  {subtotal >= 999 ? (
                    <span className="font-bold text-emerald-800">
                      🎉 Congratulations! You have unlocked Free Express Doorstep Delivery!
                    </span>
                  ) : (
                    <span>
                      Add <strong>₹{(999 - subtotal).toLocaleString('en-IN')}</strong> more to unlock <strong>Free Express Delivery</strong>!
                    </span>
                  )}
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    {/* Image & Title */}
                    <div className="flex items-center gap-4 flex-1">
                      <Link to={`/products/${item.id}`} className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={item.primaryImage}
                          alt={item.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80';
                          }}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-amber-700">{item.category}</span>
                        <Link to={`/products/${item.id}`}>
                          <h3 className="font-serif text-sm sm:text-base font-bold text-slate-900 hover:text-primary transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-[11px] text-slate-500">Material: {item.material}</p>
                        
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-700 font-medium">
                          <Gift className="w-3.5 h-3.5" />
                          <span>Includes Free Gift Wrap & Message Card</span>
                        </div>
                      </div>
                    </div>

                    {/* Price, Quantity, Delete */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0">
                      <div className="text-right">
                        <span className="font-serif text-lg font-bold text-slate-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[10px] text-slate-400">
                            (₹{item.price.toLocaleString('en-IN')} each)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 text-slate-700 hover:bg-white rounded flex items-center justify-center font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 text-slate-700 hover:bg-white rounded flex items-center justify-center font-bold text-xs"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center text-xs text-slate-600">
                <div className="p-3 bg-white rounded-2xl border border-slate-200 flex flex-col items-center">
                  <Gift className="w-5 h-5 text-primary mb-1" />
                  <span className="font-bold text-slate-800 text-[11px]">Free Gift Packaging</span>
                  <span className="text-[10px] text-slate-500">Satin bow & greeting note</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-slate-200 flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="font-bold text-slate-800 text-[11px]">Zero Damage Guarantee</span>
                  <span className="text-[10px] text-slate-500">Multi-layer safe transit wrap</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-slate-200 flex flex-col items-center">
                  <Truck className="w-5 h-5 text-indigo-600 mb-1" />
                  <span className="font-bold text-slate-800 text-[11px]">Express Delivery</span>
                  <span className="text-[10px] text-slate-500">Live SMS & tracking link</span>
                </div>
              </div>

            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
              <h2 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Coupon: GIFTJOY"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 uppercase tracking-wider focus:outline-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-primary transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-[11px] font-medium ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {couponMessage}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Cart Items Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount (10% OFF)</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Gift Packaging & Greeting Card</span>
                  <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
                </div>

                <div className="flex justify-between">
                  <span>Doorstep Courier Delivery</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between pt-3 border-t border-slate-200 text-sm font-bold text-slate-900">
                  <span>Grand Total</span>
                  <span className="font-serif text-xl text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-slate-400 text-right">Inclusive of all taxes & duties</p>
              </div>

              {/* Checkout CTA Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-primary-hover transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/919876543210?text=${orderSummaryText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        ) : (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-primary flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Your Cart is Currently Empty</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Explore our best-selling gifts, cuddly plush toys, photo frames, and personalized items to surprise someone special!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-hover transition-all shadow-md mt-2"
            >
              <span>Explore All Gifts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
