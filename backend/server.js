const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple Health & Info Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'AuraGifts E-commerce API is operating smoothly',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/api', (req, res) => {
  res.json({
    brand: 'AuraGifts API',
    version: '1.0.0',
    documentation: {
      health: 'GET /api/health',
      customizations: 'GET /api/customizations | POST /api/customizations',
      products: 'GET /api/products',
      categories: 'GET /api/categories'
    }
  });
});

// In-Memory Customization Store (persists while server runs & syncs with client)
let customizationRequests = [
  {
    id: 'CUST-2026-001',
    productId: 'prod-1',
    productName: 'Personalized Wooden Keepsake Box with Custom Name',
    productImage: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=400&q=80',
    productPrice: 1499,
    clientName: 'Rahul Verma',
    clientPhone: '+91 98765 43210',
    clientEmail: 'rahul.verma@example.com',
    engravingText: 'Rahul & Ananya',
    milestoneDate: '14 February 2026',
    fontStyle: 'Classic Serif',
    motifIcon: '♥ Heart',
    uploadedPhoto: null,
    giftMessage: 'Happy 1st Anniversary my love! Here is to a lifetime of adventures.',
    specialInstructions: 'Please center-align the names and use dark gold filling for the engraving. Box finish: Royal Walnut.',
    status: 'In Production',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: 'CUST-2026-002',
    productId: 'prod-4',
    productName: 'Personalized Double Photo Frame with Brass Border',
    productImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80',
    productPrice: 1299,
    clientName: 'Priya Sundaram',
    clientPhone: '+91 91234 56789',
    clientEmail: 'priya.s@example.com',
    engravingText: 'Mom & Dad - 25 Years of Togetherness',
    milestoneDate: '28 December 2025',
    fontStyle: 'Cursive Script',
    motifIcon: '∞ Infinity',
    uploadedPhoto: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=400&q=80',
    giftMessage: 'To the best parents in the world. Silver Jubilee Congratulations!',
    specialInstructions: 'Please brighten the photo slightly before framing. Use ivory matte mounting sheet.',
    status: 'New Request',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  },
  {
    id: 'CUST-2026-003',
    productId: 'prod-6',
    productName: 'Custom Engraved Name Leather Wallet & Keyring Combo',
    productImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80',
    productPrice: 1399,
    clientName: 'Neha Kapoor',
    clientPhone: '+91 99887 76655',
    clientEmail: 'neha.k@example.com',
    engravingText: 'V. MALHOTRA',
    milestoneDate: '10 March 2026',
    fontStyle: 'Clean Bold Caps',
    motifIcon: '★ Star',
    uploadedPhoto: null,
    giftMessage: 'Happy Birthday Vikram! Keep achieving great heights.',
    specialInstructions: 'Gold foil embossing on the bottom right corner of wallet.',
    status: 'Approved',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  }
];

// GET all customization requests (for Admin)
app.get('/api/customizations', (req, res) => {
  res.json({
    status: 'success',
    count: customizationRequests.length,
    data: customizationRequests
  });
});

// POST new customization request from client
app.post('/api/customizations', (req, res) => {
  const {
    productId,
    productName,
    productImage,
    productPrice,
    clientName,
    clientPhone,
    clientEmail,
    engravingText,
    milestoneDate,
    fontStyle,
    motifIcon,
    uploadedPhoto,
    giftMessage,
    specialInstructions
  } = req.body;

  if (!clientName || !clientPhone) {
    return res.status(400).json({
      status: 'error',
      message: 'Client name and contact phone are required to convey customization to the admin.'
    });
  }

  const newRequest = {
    id: `CUST-${new Date().getFullYear()}-${String(customizationRequests.length + 1).padStart(3, '0')}`,
    productId: productId || 'custom-item',
    productName: productName || 'Bespoke Custom Gift',
    productImage: productImage || 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=400&q=80',
    productPrice: Number(productPrice) || 1499,
    clientName,
    clientPhone,
    clientEmail: clientEmail || '',
    engravingText: engravingText || '',
    milestoneDate: milestoneDate || '',
    fontStyle: fontStyle || 'Classic Serif',
    motifIcon: motifIcon || '♥ Heart',
    uploadedPhoto: uploadedPhoto || null,
    giftMessage: giftMessage || '',
    specialInstructions: specialInstructions || '',
    status: 'New Request',
    createdAt: new Date().toISOString()
  };

  customizationRequests.unshift(newRequest);

  console.log(`\n🔔 [NEW CUSTOMIZATION CONVEYED TO ADMIN]`);
  console.log(`   ID: ${newRequest.id}`);
  console.log(`   Client: ${newRequest.clientName} (${newRequest.clientPhone})`);
  console.log(`   Product: ${newRequest.productName}`);
  console.log(`   Engraving: "${newRequest.engravingText}" | Date: ${newRequest.milestoneDate}`);
  console.log(`   Instructions: ${newRequest.specialInstructions}\n`);

  res.status(201).json({
    status: 'success',
    message: 'Your customization details have been conveyed to the shop owner/admin successfully!',
    data: newRequest
  });
});

// PATCH update status of customization request (Admin action)
app.patch('/api/customizations/:id', (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  const itemIndex = customizationRequests.findIndex(c => c.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'Customization request not found'
    });
  }

  if (status) customizationRequests[itemIndex].status = status;
  if (adminNotes !== undefined) customizationRequests[itemIndex].adminNotes = adminNotes;

  res.json({
    status: 'success',
    message: `Customization request status updated to "${status}"`,
    data: customizationRequests[itemIndex]
  });
});

// DELETE customization request
app.delete('/api/customizations/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = customizationRequests.findIndex(c => c.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'Customization request not found'
    });
  }

  const removed = customizationRequests.splice(itemIndex, 1)[0];
  res.json({
    status: 'success',
    message: 'Customization request deleted successfully',
    data: removed
  });
});

// 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

// Database connection attempt with graceful fallback
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('your_mongodb_connection_string')) {
    console.log('\n⚠️  MongoDB URI not configured yet in backend/.env');
    console.log('   The server will start, and we will connect MongoDB Atlas in Phase 6.\n');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.warn('⚠️  Could not connect to MongoDB:', error.message);
    console.warn('   Ensure MongoDB service is running or your Atlas connection string is valid in backend/.env\n');
  }
};

// Start Server
app.listen(PORT, async () => {
  console.log(`=======================================================`);
  console.log(`🎁 AuraGifts Backend Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Allowed Client: ${CLIENT_URL}`);
  console.log(`=======================================================`);
  await connectDB();
});
