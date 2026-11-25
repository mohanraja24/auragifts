import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Gift } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-primary-dark text-white relative overflow-hidden border-b border-primary/20">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-secondary-light text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
          <Gift className="w-3.5 h-3.5 text-secondary" />
          <span>New Customer Special</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
          Get ₹200 OFF on Your First Gift Order
        </h2>

        <p className="text-sm sm:text-base text-rose-100 max-w-xl mx-auto mt-3 font-normal leading-relaxed">
          Subscribe for birthday & anniversary gift reminders, secret festive sales, and new product discounts.
        </p>

        {submitted ? (
          <div className="mt-8 p-4 max-w-md mx-auto rounded-2xl bg-white/10 backdrop-blur-md border border-secondary flex items-center justify-center gap-2 text-secondary-light text-sm">
            <CheckCircle2 className="w-5 h-5 text-secondary" />
            <span>Thank you! Your coupon code is <strong>GIFTJOY200</strong></span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full text-xs font-medium bg-white text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-secondary text-primary-dark font-bold text-xs uppercase tracking-wider hover:bg-secondary-light transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md"
            >
              <span>Get Coupon</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-rose-200 mt-4">
          No spam ever. Unsubscribe anytime with 1 click.
        </p>

      </div>
    </section>
  );
}
