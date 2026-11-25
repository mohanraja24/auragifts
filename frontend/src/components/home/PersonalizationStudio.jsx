import React, { useState } from 'react';
import { Sparkles, Edit3, Check, ShoppingBag, Gift, Calendar, Send } from 'lucide-react';
import CustomizationModal from '../common/CustomizationModal';

export default function PersonalizationStudio() {
  const [recipientNames, setRecipientNames] = useState('Rahul & Ananya');
  const [milestoneDate, setMilestoneDate] = useState('14 February 2026');
  const [selectedFont, setSelectedFont] = useState('serif');
  const [selectedMotif, setSelectedMotif] = useState('heart');
  const [boxFinish, setBoxFinish] = useState('honey');
  const [added, setAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const finishes = [
    { id: 'honey', label: 'Honey Teak', bg: 'bg-[#C57C3E]', textColor: 'text-amber-800' },
    { id: 'rosewood', label: 'Celebration Rose', bg: 'bg-[#8B1E3F]', textColor: 'text-rose-800' },
    { id: 'birch', label: 'Ivory Birch', bg: 'bg-[#EFE1D1]', textColor: 'text-stone-800' }
  ];

  const finishStyles = {
    honey: {
      boxBg: 'from-[#DE9B61] via-[#C57C3E] to-[#9E5A23]',
      boxBorder: 'border-[#E5A872]',
      accentColor: '#881337',
      engraveColor: 'text-[#3B1E08]',
      dateColor: 'text-[#5A2E0F]',
      quoteColor: 'text-[#5A2E0F]/80',
      shadow: 'shadow-[0_20px_40px_rgba(158,90,35,0.28),inset_0_2px_4px_rgba(255,255,255,0.45)]',
      cornerColor: 'text-[#7A3F14]/60'
    },
    rosewood: {
      boxBg: 'from-[#9E2A2B] via-[#6B1D2F] to-[#47111D]',
      boxBorder: 'border-[#BD4057]',
      accentColor: '#FDE047',
      engraveColor: 'text-[#FEF08A]',
      dateColor: 'text-[#FDE68A]',
      quoteColor: 'text-[#FEF08A]/80',
      shadow: 'shadow-[0_20px_40px_rgba(107,29,47,0.35),inset_0_2px_4px_rgba(255,255,255,0.3)]',
      cornerColor: 'text-amber-300/70'
    },
    birch: {
      boxBg: 'from-[#FAF6F0] via-[#EFE6DC] to-[#DBCDC0]',
      boxBorder: 'border-[#E2D5C7]',
      accentColor: '#E11D48',
      engraveColor: 'text-[#2D1B11]',
      dateColor: 'text-[#4A3022]',
      quoteColor: 'text-[#664633]',
      shadow: 'shadow-[0_20px_40px_rgba(120,90,70,0.2),inset_0_2px_4px_rgba(255,255,255,0.8)]',
      cornerColor: 'text-[#664633]/50'
    }
  };

  const currentFinish = finishStyles[boxFinish] || finishStyles.honey;

  const fontOptions = [
    { id: 'serif', label: 'Classic Font', style: 'font-serif tracking-widest' },
    { id: 'script', label: 'Cursive / Script', style: 'italic font-serif font-normal' },
    { id: 'modern', label: 'Clean Bold Caps', style: 'font-sans uppercase tracking-[0.2em] font-bold' }
  ];

  const motifOptions = [
    { id: 'heart', icon: '♥', label: 'Heart' },
    { id: 'infinity', icon: '∞', label: 'Infinity' },
    { id: 'star', icon: '★', label: 'Star' },
    { id: 'crest', icon: '✦', label: 'Sparkle' }
  ];

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <section id="personalize-studio" className="py-20 bg-background-alt border-b border-border relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customize Online</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text font-bold">
            Personalize Your Gift in Seconds
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto mt-3"></div>
          <p className="text-sm text-text-muted mt-3 font-normal">
            Type your custom names, add an anniversary or birthday date, and see a live preview on the wooden gift box below.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-border shadow-luxury">
          
          {/* Left Column: Warm Boutique Studio Preview */}
          <div className="lg:col-span-6 bg-gradient-to-br from-rose-50/80 via-white to-amber-50/60 rounded-3xl p-6 sm:p-8 relative flex flex-col items-center justify-between min-h-[460px] shadow-sm border border-rose-100 overflow-hidden">
            
            {/* Ambient Warm Celebration Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Header: Live Indicator & Wood Finish Pills */}
            <div className="w-full flex items-center justify-between z-10 mb-4 gap-2 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-rose-200 text-[11px] uppercase tracking-wider text-primary font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>3D Live Engraving</span>
              </div>

              {/* Finish Switcher */}
              <div className="flex items-center gap-1.5 bg-white/90 p-1 rounded-full border border-rose-200 shadow-2xs">
                {finishes.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setBoxFinish(f.id)}
                    className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                      boxFinish === f.id
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-slate-600 hover:text-primary'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Handcrafted Wooden Keepsake Box */}
            <div className={`w-full max-w-sm aspect-[4/3] rounded-2xl bg-gradient-to-br ${currentFinish.boxBg} p-6 sm:p-7 relative flex flex-col items-center justify-between text-center overflow-hidden border-2 ${currentFinish.boxBorder} ${currentFinish.shadow} transition-all duration-500 z-10`}>
              
              {/* Subtle Natural Wood Grain Lines */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
              
              {/* Corner Filigree Accents */}
              <div className={`w-full flex justify-between ${currentFinish.cornerColor} text-sm font-serif select-none pointer-events-none`}>
                <span>✦</span>
                <span>✦</span>
              </div>

              {/* Laser Engraved Content */}
              <div className="relative z-10 my-auto py-2">
                <span className="text-3xl block mb-2 transition-transform duration-300 drop-shadow-sm" style={{ color: currentFinish.accentColor }}>
                  {motifOptions.find(m => m.id === selectedMotif)?.icon || '♥'}
                </span>

                <h3 className={`text-xl sm:text-2xl font-bold tracking-tight transition-all duration-300 ${currentFinish.engraveColor} ${
                  fontOptions.find(f => f.id === selectedFont)?.style
                }`}>
                  {recipientNames || 'Enter Names Here'}
                </h3>

                <p className={`text-xs font-mono tracking-widest mt-2 ${currentFinish.dateColor}`}>
                  {milestoneDate || 'Enter Date Here'}
                </p>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className={`w-6 h-px ${currentFinish.cornerColor}`}></span>
                  <p className={`text-[10px] uppercase tracking-[0.25em] font-serif italic ${currentFinish.quoteColor}`}>
                    Always & Forever
                  </p>
                  <span className={`w-6 h-px ${currentFinish.cornerColor}`}></span>
                </div>
              </div>

              {/* Bottom Corner Filigree Accents */}
              <div className={`w-full flex justify-between ${currentFinish.cornerColor} text-sm font-serif select-none pointer-events-none`}>
                <span>✦</span>
                <span>✦</span>
              </div>
            </div>

            {/* Packaging Badge */}
            <div className="mt-5 z-10 flex items-center justify-center text-center gap-2 text-[11px] sm:text-xs text-slate-700 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl sm:rounded-full border border-rose-200/80 shadow-xs max-w-full">
              <Gift className="w-4 h-4 text-primary shrink-0" />
              <span>Complimentary Satin Ribbon & Handwritten Card Included</span>
            </div>

          </div>

          {/* Right Column: Customization Form */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Input 1: Custom Text */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-text mb-1.5 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-primary" />
                <span>1. Names or Custom Message</span>
              </label>
              <input
                type="text"
                maxLength={35}
                value={recipientNames}
                onChange={(e) => setRecipientNames(e.target.value)}
                placeholder="e.g. Rahul & Ananya"
                className="w-full px-4 py-3 rounded-xl border border-border text-sm font-medium bg-background text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Input 2: Date */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-text mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>2. Special Date (Optional)</span>
              </label>
              <input
                type="text"
                maxLength={25}
                value={milestoneDate}
                onChange={(e) => setMilestoneDate(e.target.value)}
                placeholder="e.g. 14 February 2026"
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm font-medium bg-background text-text focus:outline-none focus:border-primary"
              />
            </div>

            {/* Input 3: Font Style */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-text mb-1.5">
                3. Choose Letter Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {fontOptions.map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => setSelectedFont(font.id)}
                    className={`py-2 px-3 rounded-lg text-xs border text-center transition-all ${
                      selectedFont === font.id
                        ? 'border-primary bg-primary text-white font-bold'
                        : 'border-border bg-background text-text hover:border-primary/40'
                    }`}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 4: Icon */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-text mb-1.5">
                4. Choose an Icon
              </label>
              <div className="grid grid-cols-4 gap-2">
                {motifOptions.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMotif(m.id)}
                    className={`py-2 px-3 rounded-lg text-xs border text-center transition-all flex flex-col items-center gap-0.5 ${
                      selectedMotif === m.id
                        ? 'border-primary bg-primary text-white font-bold'
                        : 'border-border bg-background text-text hover:border-primary/40'
                    }`}
                  >
                    <span className="text-base">{m.icon}</span>
                    <span className="text-[10px]">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-text-subtle uppercase tracking-wider block font-semibold">
                  Personalized Wooden Box
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-serif text-2xl font-bold text-primary">₹1,499</span>
                  <span className="text-xs text-text-subtle line-through">₹2,199</span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Free Custom Engraving
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-2xs"
                  title="Convey this exact design to the shop owner/admin"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Convey to Admin ↗</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm ${
                    added 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-primary text-white hover:bg-primary-hover'
                  }`}
                >
                  {added ? (
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
              </div>
            </div>

          </div>

        </div>

        {/* Customization Modal */}
        <CustomizationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={{
            id: 'prod-1',
            name: 'Personalized Wooden Keepsake Box with Custom Name',
            price: 1499,
            primaryImage: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80'
          }}
          initialData={{
            names: recipientNames,
            date: milestoneDate,
            font: fontOptions.find(f => f.id === selectedFont)?.label,
            motif: motifOptions.find(m => m.id === selectedMotif)?.label
          }}
        />

      </div>
    </section>
  );
}
