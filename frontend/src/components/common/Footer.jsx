import React from 'react';
import { Gift, ShieldCheck, RefreshCw, Truck, MapPin, Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-[#E7E5E4] pt-20 pb-10 border-t border-primary/20">
      
      {/* 4 Guarantees Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mb-16 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 shrink-0">
              <Gift className="w-6 h-6 text-primary-light" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-base">Free Gift Wrapping</h4>
              <p className="text-xs text-[#A8A29E] mt-0.5">Complimentary ribbon & custom greeting card.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center border border-secondary/30 shrink-0">
              <Truck className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-base">Pan-India Delivery</h4>
              <p className="text-xs text-[#A8A29E] mt-0.5">Reliable on-time delivery across 18,000+ pin codes.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary-light" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-base">100% Safe Payments</h4>
              <p className="text-xs text-[#A8A29E] mt-0.5">UPI, Cards, NetBanking & Cash on Delivery.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center border border-secondary/30 shrink-0">
              <RefreshCw className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-base">Handcrafted Quality</h4>
              <p className="text-xs text-[#A8A29E] mt-0.5">Checked and packed with maximum care.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Presentation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                <Gift className="w-4 h-4 text-primary-light" />
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
                Aura<span className="text-primary-light">Gifts</span>
              </h3>
            </div>
            <p className="text-xs text-[#A8A29E] leading-relaxed max-w-sm font-normal">
              Your trusted online gift shop for meaningful celebrations. We help you send customized keepsakes, sweet treats, and lovely hampers to the people you cherish.
            </p>
            <div className="space-y-2 text-xs text-[#D6D3D1] pt-2">
              <p className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-secondary shrink-0" />
                <span>Connaught Place, New Delhi 110001, India</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <span>+91 98765 43210 (Mon - Sat, 9:00 AM - 7:00 PM)</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <span>support@auragifts.com</span>
              </p>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-secondary font-bold mb-4">
              Popular Gifts
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li><a href="/products?category=personalized-gifts" className="hover:text-primary-light transition-colors">Personalized Gifts</a></li>
              <li><a href="/products?category=gift-hampers" className="hover:text-primary-light transition-colors">Gift Hampers</a></li>
              <li><a href="/products?category=birthday-gifts" className="hover:text-primary-light transition-colors">Birthday Gifts</a></li>
              <li><a href="/products?category=anniversary-gifts" className="hover:text-primary-light transition-colors">Anniversary Gifts</a></li>
              <li><a href="/products?category=photo-frames" className="hover:text-primary-light transition-colors">Photo Frames</a></li>
              <li><a href="/products?category=corporate-gifts" className="hover:text-primary-light transition-colors">Corporate Gifts</a></li>
            </ul>
          </div>

          {/* Customer Help */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-secondary font-bold mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li><a href="/track-order" className="hover:text-primary-light transition-colors">Track Your Order</a></li>
              <li><a href="/shipping-policy" className="hover:text-primary-light transition-colors">Shipping & Delivery</a></li>
              <li><a href="/return-policy" className="hover:text-primary-light transition-colors">Returns & Refunds</a></li>
              <li><a href="/faq" className="hover:text-primary-light transition-colors">Frequently Asked Questions</a></li>
              <li><a href="/contact" className="hover:text-primary-light transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-primary-light transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Shop Owner Portal */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-secondary font-bold mb-4">
              Shop Management
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li><a href="/admin/login" className="text-secondary font-bold hover:underline">Shop Owner Admin Panel ↗</a></li>
              <li><a href="/admin/products" className="hover:text-primary-light transition-colors">Manage Products & Prices</a></li>
              <li><a href="/admin/orders" className="hover:text-primary-light transition-colors">Process Customer Orders</a></li>
              <li><a href="/admin/reports" className="hover:text-primary-light transition-colors">View Sales & Revenue</a></li>
              <li><a href="/terms" className="hover:text-primary-light transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} AuraGifts Online E-Commerce Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-primary-light fill-primary-light" />
            <span>for heartfelt celebrations.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
