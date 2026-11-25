import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Gift, 
  Send, 
  MessageCircle, 
  Upload, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  HelpCircle,
  FileText
} from 'lucide-react';

export default function CustomizationModal({ isOpen, onClose, product, initialData = {} }) {
  if (!isOpen || !product) return null;

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [engravingText, setEngravingText] = useState(initialData.names || '');
  const [milestoneDate, setMilestoneDate] = useState(initialData.date || '');
  const [fontStyle, setFontStyle] = useState(initialData.font || 'Classic Serif');
  const [motifIcon, setMotifIcon] = useState(initialData.motif || '♥ Heart');
  const [giftMessage, setGiftMessage] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Handle Photo File Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit to Backend API and sync with local storage
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Please provide your Name and WhatsApp/Phone Number so the admin can contact you.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      productId: product.id || 'custom-item',
      productName: product.name,
      productImage: product.primaryImage || product.image,
      productPrice: product.price,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      engravingText: engravingText.trim(),
      milestoneDate: milestoneDate.trim(),
      fontStyle,
      motifIcon,
      uploadedPhoto: photoPreview,
      giftMessage: giftMessage.trim(),
      specialInstructions: specialInstructions.trim()
    };

    try {
      // 1. Send to Backend API
      let requestId = `CUST-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      try {
        const res = await fetch('http://localhost:5000/api/customizations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.id) requestId = json.data.id;
        }
      } catch (err) {
        console.warn('Backend offline, saving to local storage fallback:', err);
      }

      // 2. Also save to localStorage for client reference & offline fallback
      const savedRequests = JSON.parse(localStorage.getItem('aura_customizations') || '[]');
      const newEntry = {
        ...payload,
        id: requestId,
        status: 'New Request',
        createdAt: new Date().toISOString()
      };
      savedRequests.unshift(newEntry);
      localStorage.setItem('aura_customizations', JSON.stringify(savedRequests));

      setSubmittedData(newEntry);
    } catch (error) {
      console.error('Failed to submit customization:', error);
      alert('Could not submit customization. Please try WhatsApp option.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate WhatsApp Direct Convey URL
  const handleWhatsAppConvey = () => {
    const adminWhatsAppNumber = '919876543210'; // Shop Owner / Admin WhatsApp
    const message = 
`*NEW CUSTOMIZATION REQUEST - AuraGifts* 🎁
-----------------------------------------
*Product:* ${product.name}
*Price:* ₹${product.price}

*CLIENT DETAILS:*
• Name: ${clientName || 'Not specified'}
• Phone: ${clientPhone || 'Not specified'}
• Email: ${clientEmail || 'N/A'}

*CUSTOMIZATION DETAILS:*
• Engraving / Text: "${engravingText || 'None'}"
• Special Date: ${milestoneDate || 'None'}
• Font Style: ${fontStyle}
• Selected Motif: ${motifIcon}
• Gift Card Message: "${giftMessage || 'Standard message'}"
• Special Instructions: "${specialInstructions || 'None'}"
• Photo Uploaded: ${photoPreview ? 'Yes (Photo attached)' : 'No photo'}
-----------------------------------------
_Please review and confirm my custom gift design!_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${adminWhatsAppNumber}?text=${encoded}`, '_blank');
  };

  const handleResetAndClose = () => {
    setSubmittedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold">Customize Your Gift</h3>
              <p className="text-xs text-rose-100">Send custom engraving, photos & instructions directly to the admin</p>
            </div>
          </div>
          <button 
            onClick={handleResetAndClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">

          {/* Success State */}
          {submittedData ? (
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Customization Conveyed Successfully!
                </span>
                <h4 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                  Thank You, {submittedData.clientName}!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your customization request has been delivered to the shop owner/admin. We will review your engraving & photo specifications and contact you shortly.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Tracking Reference ID:</span>
                  <span className="font-bold text-primary">{submittedData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Item:</span>
                  <span className="font-semibold text-slate-800 line-clamp-1">{submittedData.productName}</span>
                </div>
                {submittedData.engravingText && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Engraving Text:</span>
                    <span className="font-bold text-slate-900">"{submittedData.engravingText}"</span>
                  </div>
                )}
                {submittedData.milestoneDate && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-medium text-slate-800">{submittedData.milestoneDate}</span>
                  </div>
                )}
                {submittedData.specialInstructions && (
                  <div className="border-t border-slate-200 pt-2 text-slate-600 italic">
                    Note: "{submittedData.specialInstructions}"
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppConvey}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Also Send on WhatsApp ↗</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-all"
                >
                  Done & Back to Shopping
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Target Product Pill */}
              <div className="flex items-center gap-3 p-3 bg-rose-50/70 border border-rose-100 rounded-2xl">
                <img 
                  src={product.primaryImage || product.image} 
                  alt={product.name} 
                  className="w-14 h-14 rounded-xl object-cover border border-rose-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                    Product Being Customized
                  </span>
                  <h4 className="font-serif text-sm font-bold text-slate-900 truncate">
                    {product.name}
                  </h4>
                  <span className="text-xs font-bold text-primary">₹{product.price}</span>
                  <span className="text-[11px] text-slate-500 ml-2">Includes Free Customization & Gift Wrapping</span>
                </div>
              </div>

              {/* Section 1: Client Contact Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>1. Your Contact Details (For Admin Confirmation)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">
                      WhatsApp / Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">
                    Email Address (Optional)
                  </label>
                  <input 
                    type="email" 
                    placeholder="e.g. vikram@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Section 2: Customization Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>2. Custom Personalization Specifications</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">
                      Name(s) / Monogram / Text to Engrave
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rahul & Ananya / Vikram"
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">
                      Milestone Date / Occasion (Optional)
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. 14 Feb 2026 / 25th Anniversary"
                      value={milestoneDate}
                      onChange={(e) => setMilestoneDate(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">
                      Lettering Font Style
                    </label>
                    <select
                      value={fontStyle}
                      onChange={(e) => setFontStyle(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary"
                    >
                      <option>Classic Serif</option>
                      <option>Cursive / Script</option>
                      <option>Clean Bold Caps</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">
                      Engraved Icon / Motif
                    </label>
                    <select
                      value={motifIcon}
                      onChange={(e) => setMotifIcon(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary"
                    >
                      <option>♥ Heart</option>
                      <option>∞ Infinity</option>
                      <option>★ Star</option>
                      <option>✦ Sparkle</option>
                      <option>No Icon</option>
                    </select>
                  </div>
                </div>

                {/* Photo Upload with Instant Live Preview */}
                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">
                    Upload Custom Photo (For photo frames, mugs or custom prints)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-primary/40 hover:border-primary bg-primary/5 text-primary text-xs font-bold transition-all">
                      <Upload className="w-4 h-4" />
                      <span>{photoName ? 'Change Photo' : 'Choose Photo File'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handlePhotoUpload}
                      />
                    </label>
                    {photoPreview && (
                      <div className="flex items-center gap-2">
                        <img 
                          src={photoPreview} 
                          alt="Custom upload preview" 
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shadow-2xs"
                        />
                        <span className="text-[11px] text-emerald-700 font-semibold truncate max-w-[150px]">
                          ✓ {photoName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Notes & Instructions to Admin */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span>3. Special Instructions for the Admin / Artisan</span>
                </h4>

                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">
                    Special Instructions / Notes for the Admin
                  </label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Please send design preview before engraving. Delivery needed by Thursday evening."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 font-medium mb-1">
                    Complimentary Message Card Greeting
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Wishing you endless happiness & love on your milestone!"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Submit / Convey Buttons */}
              <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppConvey}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-xs"
                  title="Convey directly on WhatsApp with pre-filled details"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp to Admin</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-3 rounded-full border border-slate-300 text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-hover transition-all shadow-md disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Conveying...' : 'Convey to Admin'}</span>
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
