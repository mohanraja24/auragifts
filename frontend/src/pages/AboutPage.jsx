import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Gift, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Award, 
  Users, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  MessageCircle,
  Package,
  Cpu,
  Layers
} from 'lucide-react';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Choose & Personalize',
      desc: 'Browse hundreds of keepsakes, hampers, and photo frames. Add your custom names, dates, or upload cherished photos with live preview.',
      icon: <Sparkles className="w-5 h-5 text-primary" />
    },
    {
      step: '02',
      title: 'Artisanal Crafting & Laser Engraving',
      desc: 'Our master craftsmen laser-engrave your names onto natural teak wood, leather, or crystal with micrometer precision.',
      icon: <Cpu className="w-5 h-5 text-primary" />
    },
    {
      step: '03',
      title: 'Complimentary Luxury Gift Wrapping',
      desc: 'Every gift is cushioned in shock-proof boxes, hand-wrapped in textured paper, and tied with an elegant satin ribbon and message card.',
      icon: <Gift className="w-5 h-5 text-primary" />
    },
    {
      step: '04',
      title: 'Swift & Safe Metro Dispatch',
      desc: 'Dispatched via express air delivery partners with live SMS and WhatsApp tracking straight to your loved one’s doorstep.',
      icon: <Truck className="w-5 h-5 text-primary" />
    }
  ];

  const milestones = [
    { value: '15,000+', label: 'Gifts Delivered with Love' },
    { value: '4.9 / 5.0', label: 'Average Verified Rating' },
    { value: '99.4%', label: 'On-Time Delivery Success' },
    { value: '100%', label: 'Handcrafted Personalization' }
  ];

  const faqs = [
    {
      q: 'How long does custom engraving and dispatch take?',
      a: 'We understand gifts are time-sensitive! Most personalized wooden boxes, leather wallets, and photo frames are engraved within 24-48 hours. Express metro delivery typically takes 2-4 business days.'
    },
    {
      q: 'Can I see a preview of my customization before engraving?',
      a: 'Yes! Our website provides a live 3D preview on the screen. Additionally, you can click "Customize & Convey to Admin" to share special notes, and our team will share a WhatsApp digital proof for your final approval before engraving.'
    },
    {
      q: 'Is gift wrapping and greeting card really free?',
      a: 'Yes! Every single order automatically includes complimentary luxury gift wrapping, hand-tied satin ribbon, and a customized message greeting card. There are no hidden fees at checkout.'
    },
    {
      q: 'What if the gift arrives damaged or with incorrect engraving?',
      a: 'We have a 100% Satisfaction Guarantee. If an item arrives damaged or there is an engraving error, simply message our admin on WhatsApp with a photo, and we will send a free replacement within 24 hours.'
    },
    {
      q: 'Can I order corporate or bulk hampers for my company?',
      a: 'Yes! We specialize in corporate gifts with custom company logo engraving, welcome kits, and bulk festive hampers with special volume discounts.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* 1. Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Story & Passion</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            Crafting Unforgettable Memories <br />
            <span className="italic font-normal text-primary">One Gift at a Time.</span>
          </h1>

          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Welcome to <strong className="text-primary font-semibold">AuraGifts</strong> — where thoughtful gifting meets artisanal craftsmanship. We believe every gift should tell a unique story and bring genuine smiles to the people you cherish most.
          </p>
        </div>

        {/* 2. Key Trust Milestones Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {milestones.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-primary block">
                {item.value}
              </span>
              <span className="text-xs text-slate-600 font-medium block">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* 3. The Brand Story Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-secondary-dark uppercase tracking-widest">
              <Heart className="w-3.5 h-3.5 text-primary" />
              <span>How We Started</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              Born from a Passion for Meaningful, Lasting Gestures
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We started AuraGifts with a simple realization: finding a truly personal gift is often stressful, impersonal, and rushed. Generic presents get forgotten, but a handcrafted gift engraved with shared memories becomes a lifelong keepsake.
            </p>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether it’s a custom-carved teak wood keepsake box celebrating your 1st anniversary, a double-sided brass memory photo frame, or a luxury gourmet hamper loaded with fresh chocolates and scented candles, every piece leaves our atelier wrapped to perfection.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Teak & Oak Wood</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Eco-Friendly Packaging</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl aspect-4/3 relative border border-slate-200 group">
            <img 
              src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80" 
              alt="Handcrafted Gift Presentation with pine and satin ribbon" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-bold text-secondary">
                  Our Atelier Standard
                </span>
                <p className="text-xs font-medium">
                  Every box hand-inspected, engraved, and tied with satin ribbon.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. The 4-Step Gifting Journey */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Simple & Seamless
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              How Your Gift is Made & Delivered
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              From your initial custom request to pristine delivery at your loved one’s door.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-primary/40 hover:-translate-y-1 transition-all space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    {st.icon}
                  </div>
                  <span className="font-mono text-2xl font-bold text-slate-200">
                    {st.step}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Frequently Asked Questions (Accordion) */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Got Questions?
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500">
              Everything you need to know about our customization, delivery, and guarantees.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 text-left font-serif text-sm sm:text-base font-bold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/60 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Direct Contact & Support Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Instant WhatsApp Help
              </span>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs sm:text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors"
              >
                +91 98765 43210
              </a>
              <p className="text-[11px] text-slate-500 mt-0.5">Mon - Sat (9 AM - 8 PM)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-primary flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Email Customer Care
              </span>
              <a 
                href="mailto:support@auragifts.com" 
                className="text-xs sm:text-sm font-bold text-slate-900 hover:text-primary transition-colors"
              >
                support@auragifts.com
              </a>
              <p className="text-[11px] text-slate-500 mt-0.5">Response within 2 hours</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Atelier Workshop
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                Indiranagar, Bangalore
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">Handcrafted with pride in India</p>
            </div>
          </div>
        </div>

        {/* 7. Call To Action Footer Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-secondary text-xs font-bold uppercase tracking-wider border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Begin Your Custom Gift Today</span>
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Ready to Craft a Truly Thoughtful Gift?
            </h2>
            
            <p className="text-xs sm:text-sm text-rose-100 font-normal leading-relaxed">
              Explore our best-selling personalized keepsakes, customized photo frames, and celebration hampers with complimentary gift wrapping.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-secondary text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-secondary-light transition-all shadow-md"
              >
                <span>Browse All Gifts Collection</span>
                <Gift className="w-4 h-4" />
              </Link>
              
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Talk with an Artisan</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
