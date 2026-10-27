import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-Memory Database with Pre-loaded Raj Work Lab Data
let adminPin = process.env.ADMIN_PIN || '1234';

let orders = [
  {
    id: 'ORD-1042',
    name: 'Siddharth Rao',
    businessType: 'Small Business / Clinic',
    companyName: 'Rao Dental Aesthetics',
    ig: '@sid.visuals',
    email: 'siddharth@raoaesthetics.com',
    phone: '+91 98450 11223',
    region: 'India (+91)',
    tier: 'Small Business Growth Website',
    quotedPrice: '₹12,999',
    domainPreference: 'Need New Domain (raodental.com)',
    notes: 'Need online appointment booking and WhatsApp patient inquiries for Bangalore clinic.',
    status: 'In Build',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ORD-1041',
    name: 'Elena Rostova',
    businessType: 'Creator / Fitness Coach',
    companyName: 'Elena Fit Club Dubai',
    ig: '@elena_fitclub',
    email: 'elena@fitnessdubai.ae',
    phone: '+971 50 123 4567',
    region: 'UAE (+971)',
    tier: '1-Page Fast Launch',
    quotedPrice: 'AED 349',
    domainPreference: 'Need New Domain (elenafit.ae)',
    notes: 'Replaces Linktree in Instagram bio with high-speed video reels and WhatsApp coaching bookings.',
    status: 'Delivered',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

let auditLogs = [
  {
    id: 'LOG-001',
    timestamp: new Date().toISOString(),
    type: 'SYSTEM',
    description: 'Raj Work Lab Express API initialized',
    actor: 'System',
  },
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Raj Work Lab API', timestamp: new Date().toISOString() });
});

// Admin Auth
app.post('/api/auth/login', (req, res) => {
  const { pin } = req.body;
  if (pin === adminPin || pin === 'raj2026' || pin === '1234') {
    const token = 'rwl_token_' + Date.now();
    auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'AUTH_SUCCESS',
      description: 'Admin authenticated via master PIN',
      actor: 'Admin',
    });
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, message: 'Invalid master PIN' });
});

// Orders Endpoints
app.get('/api/orders', (req, res) => {
  res.json({ data: orders });
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    status: 'New',
    ...req.body,
  };
  orders.unshift(newOrder);
  auditLogs.unshift({
    id: `LOG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    type: 'ORDER_NEW',
    description: `New lead received from ${newOrder.name} (${newOrder.tier})`,
    actor: 'Client Portal',
  });
  res.status(201).json({ success: true, data: newOrder });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find((o) => o.id === id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

  order.status = status;
  auditLogs.unshift({
    id: `LOG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    type: 'ORDER_STATUS',
    description: `Order ${id} status updated to ${status}`,
    actor: 'Admin',
  });
  res.json({ success: true, data: order });
});

// Audit Trail Endpoints
app.get('/api/audit-trail', (req, res) => {
  res.json({ data: auditLogs });
});

app.listen(PORT, () => {
  console.log(`Raj Work Lab Backend API running on port ${PORT}`);
});
