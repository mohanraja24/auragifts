import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Gift, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Trash2, 
  ExternalLink, 
  RefreshCw,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

export default function AdminPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Fetch customizations from Backend API and sync with localStorage
  const fetchCustomizations = async () => {
    setLoading(true);
    let remoteData = [];
    try {
      const res = await fetch('http://localhost:5000/api/customizations');
      if (res.ok) {
        const json = await res.json();
        remoteData = json.data || [];
      }
    } catch (err) {
      console.warn('Backend unavailable, reading local storage:', err);
    }

    // Merge with client localStorage entries
    const localEntries = JSON.parse(localStorage.getItem('aura_customizations') || '[]');
    
    // Combine and deduplicate by id
    const combinedMap = new Map();
    remoteData.forEach(item => combinedMap.set(item.id, item));
    localEntries.forEach(item => {
      if (!combinedMap.has(item.id)) {
        combinedMap.set(item.id, item);
      }
    });

    const combinedList = Array.from(combinedMap.values()).sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    setRequests(combinedList);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomizations();
  }, []);

  // Update Status
  const handleStatusChange = async (id, newStatus) => {
    // 1. Update local state
    const updated = requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);

    // 2. Update localStorage
    localStorage.setItem('aura_customizations', JSON.stringify(updated));

    // 3. Update Backend API
    try {
      await fetch(`http://localhost:5000/api/customizations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.warn('Could not sync status with backend:', err);
    }
  };

  // Delete Request
  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete customization request ${id}?`)) return;
    
    const remaining = requests.filter(r => r.id !== id);
    setRequests(remaining);
    localStorage.setItem('aura_customizations', JSON.stringify(remaining));

    try {
      await fetch(`http://localhost:5000/api/customizations/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Backend delete failed:', err);
    }

    if (selectedRequest?.id === id) setSelectedRequest(null);
  };

  // Open WhatsApp direct reply to client
  const handleReplyWhatsApp = (req) => {
    const cleanNumber = req.clientPhone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello ${req.clientName}! This is AuraGifts Admin regarding your customization request (${req.id}) for "${req.productName}". We have reviewed your details ("${req.engravingText}") and are preparing your preview!`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  // Filtered requests
  const filteredRequests = requests.filter(r => {
    if (selectedFilter !== 'all' && r.status !== selectedFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.clientName?.toLowerCase().includes(q) ||
        r.productName?.toLowerCase().includes(q) ||
        r.engravingText?.toLowerCase().includes(q) ||
        r.id?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'New Request': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Approved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Production': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Ready for Dispatch': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Completed': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Shop Owner Management</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Admin & Customization Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Review custom engraving text, photos, and client instructions submitted by storefront shoppers.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={fetchCustomizations}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <a
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-hover transition-all shadow-xs"
            >
              <span>View Storefront ↗</span>
            </a>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Total Inquiries
            </span>
            <span className="font-serif text-3xl font-bold text-slate-900 mt-1 block">
              {requests.length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
              New Requests
            </span>
            <span className="font-serif text-3xl font-bold text-amber-900 mt-1 block">
              {requests.filter(r => r.status === 'New Request').length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-purple-200 bg-purple-50/40 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 block">
              In Production
            </span>
            <span className="font-serif text-3xl font-bold text-purple-900 mt-1 block">
              {requests.filter(r => r.status === 'In Production').length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
              Ready / Shipped
            </span>
            <span className="font-serif text-3xl font-bold text-emerald-900 mt-1 block">
              {requests.filter(r => ['Ready for Dispatch', 'Completed'].includes(r.status)).length}
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none text-xs">
            {[
              { id: 'all', label: 'All Requests' },
              { id: 'New Request', label: 'New' },
              { id: 'Approved', label: 'Approved' },
              { id: 'In Production', label: 'In Production' },
              { id: 'Ready for Dispatch', label: 'Ready' },
              { id: 'Completed', label: 'Completed' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedFilter === tab.id
                    ? 'bg-primary text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by client or text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-primary"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>

        </div>

        {/* Customization Requests Table / Grid */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
              <p className="text-sm font-medium">Loading customization requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200 space-y-3">
              <Gift className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-slate-800">No Customization Requests Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When customers click "Customize" on any product and submit their custom text/photo, their request will appear right here!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredRequests.map((req) => (
                <div 
                  key={req.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-primary/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  
                  {/* Left: Product & Client Details */}
                  <div className="flex items-start gap-4">
                    <img
                      src={req.productImage}
                      alt={req.productName}
                      className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                    />

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {req.id}
                        </span>
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(req.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
                        {req.productName}
                      </h3>

                      {/* Client Contact Info */}
                      <div className="flex items-center gap-4 flex-wrap text-xs text-slate-600">
                        <span className="font-semibold text-slate-900 flex items-center gap-1">
                          👤 {req.clientName}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-700 font-medium">
                          <Phone className="w-3.5 h-3.5" /> {req.clientPhone}
                        </span>
                        {req.clientEmail && (
                          <span className="flex items-center gap-1 text-slate-500">
                            <Mail className="w-3.5 h-3.5" /> {req.clientEmail}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Center: Custom Specifications Pill Box */}
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-1.5 lg:max-w-md w-full">
                    <div className="font-bold text-slate-800 uppercase tracking-wider text-[10px] text-primary border-b border-slate-200/80 pb-1 flex justify-between">
                      <span>Customization Specifications</span>
                      <span>Font: {req.fontStyle || 'Classic'}</span>
                    </div>

                    {req.engravingText && (
                      <div className="flex items-baseline gap-2">
                        <span className="text-slate-500 font-medium">Engraving:</span>
                        <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                          "{req.engravingText}"
                        </span>
                      </div>
                    )}

                    {req.milestoneDate && (
                      <div className="flex items-baseline gap-2">
                        <span className="text-slate-500 font-medium">Date:</span>
                        <span className="font-semibold text-slate-800">{req.milestoneDate}</span>
                      </div>
                    )}

                    {req.specialInstructions && (
                      <div className="text-slate-600 italic bg-amber-50/70 p-1.5 rounded border border-amber-200/60 text-[11px]">
                        <strong>Client Note:</strong> "{req.specialInstructions}"
                      </div>
                    )}

                    {req.giftMessage && (
                      <div className="text-slate-500 text-[11px]">
                        <strong>Card Message:</strong> "{req.giftMessage}"
                      </div>
                    )}

                    {/* Uploaded Photo Link */}
                    {req.uploadedPhoto && (
                      <div className="pt-1 flex items-center gap-2">
                        <span className="text-slate-500 font-medium">Attached Photo:</span>
                        <a 
                          href={req.uploadedPhoto} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline font-bold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Uploaded Image ↗</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0">
                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 hidden sm:inline">Status:</span>
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className="text-xs font-bold bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-primary shadow-2xs"
                      >
                        <option>New Request</option>
                        <option>Approved</option>
                        <option>In Production</option>
                        <option>Ready for Dispatch</option>
                        <option>Completed</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Direct WhatsApp Response */}
                      <button
                        onClick={() => handleReplyWhatsApp(req)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-2xs"
                        title="Chat with client on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(req.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
