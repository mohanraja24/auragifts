import React, { useState } from 'react';
import { Gift, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function HamperBuilderTeaser() {
  const [selectedBox, setSelectedBox] = useState('box1');
  const [selectedItems, setSelectedItems] = useState(['1', '3']);

  const hamperBoxes = [
    { id: 'box1', name: 'Premium Rose Velvet Gift Box', price: 'Free with Hamper', color: 'bg-primary text-white' },
    { id: 'box2', name: 'Solid Wooden Keepsake Box', price: '+ ₹499', color: 'bg-[#5C3A21] text-white' },
    { id: 'box3', name: 'Handwoven Gift Basket', price: '+ ₹299', color: 'bg-[#C2A378] text-primary' }
  ];

  const hamperTreats = [
    { id: '1', name: 'Belgian Dark Chocolates (16 pcs)', tag: 'Chocolates' },
    { id: '2', name: 'Aromatherapy Scented Candle in Ceramic Jar', tag: 'Home' },
    { id: '3', name: 'Organic Honey with Wooden Dipper', tag: 'Sweet' },
    { id: '4', name: 'Custom Engraved Name Keychain', tag: 'Personalized' }
  ];

  const toggleItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <section className="py-20 bg-primary-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-secondary-light text-xs font-semibold uppercase tracking-wider border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>DIY Custom Hamper</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Build Your Own <br />
              <span className="italic font-normal text-secondary-light">Custom Gift Hamper</span>
            </h2>

            <p className="text-sm sm:text-base text-background/80 font-normal leading-relaxed max-w-xl">
              Choose your favorite box, hand-pick 4 to 8 goodies, and add a personalized handwritten greeting card with a ribbon.
            </p>

            {/* Step 1 */}
            <div>
              <span className="text-xs uppercase tracking-wider text-secondary font-bold block mb-2">
                Step 1: Choose Your Box or Basket
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {hamperBoxes.map((box) => (
                  <button
                    key={box.id}
                    onClick={() => setSelectedBox(box.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                      selectedBox === box.id
                        ? 'border-secondary bg-white/20 shadow-gold'
                        : 'border-white/15 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span className="font-serif font-bold text-sm text-[#FBF9F5]">{box.name}</span>
                    <span className="text-[11px] text-secondary-light mt-2">{box.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <span className="text-xs uppercase tracking-wider text-secondary font-bold block mb-2">
                Step 2: Add Goodies ({selectedItems.length} selected)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {hamperTreats.map((treat) => {
                  const isChecked = selectedItems.includes(treat.id);
                  return (
                    <button
                      key={treat.id}
                      onClick={() => toggleItem(treat.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-secondary/80 bg-white/20 text-white'
                          : 'border-white/10 bg-white/5 text-background/70 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${isChecked ? 'bg-secondary text-primary-dark font-bold' : 'border border-white/30'}`}>
                          {isChecked && '✓'}
                        </div>
                        <span className="font-medium text-[11px]">{treat.name}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-secondary-light px-1.5 py-0.5 rounded bg-black/30">
                        {treat.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="/products?category=gift-hampers"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-secondary text-primary-dark font-bold text-xs uppercase tracking-wider hover:bg-secondary-light transition-all shadow-md"
              >
                <span>Explore Ready Hampers & Build Custom Box</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Visual Box */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80"
                alt="Luxury gift hamper box"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-wider text-secondary font-bold">
                  Ready to Gift Packaging
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  Includes Ribbon, Gift Tag & Message Card
                </h3>
                <p className="text-xs text-background/70 mt-1">
                  Guaranteed safe delivery so your gifts arrive fresh and intact.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
