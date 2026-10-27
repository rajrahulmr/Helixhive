// Raj Work Lab Data Service
// Manages reactive storage for Packages, Special Offers, Orders, and Audit Trail

const DEFAULT_OFFERS = [
  {
    id: 'starter-fast-launch',
    title: '1-Page Fast Launch',
    category: 'Creators & Solo Pros',
    badge: 'Replace Linktree & Carrd',
    delivery: '48h Delivery',
    desc: 'Perfect for creators, consultants, and solo founders who need a high-converting, instant-loading digital front door.',
    prices: {
      AED: 'AED 349',
      USD: '$99',
      INR: '₹4,999',
    },
    feeSubtext: 'Zero monthly fees forever',
    isPopular: false,
    isActive: true,
    features: [
      'Replaces slow Linktree with custom branded domain setup',
      'Instant tap-to-chat WhatsApp & social media triggers',
      'Showcase services, photos, bio & portfolio links',
      '0.1s instant mobile launch speed guaranteed',
      'Delivered ready to launch in 48 Hours',
    ],
    waMessage: "Hi Raj, I want the 1-Page Fast Launch website for my business/profile.",
    buttonText: 'Claim 1-Page Site',
  },
  {
    id: 'small-biz-growth',
    title: 'Small Business Growth Website',
    category: 'Local & Service Businesses',
    badge: 'Complete Showcase',
    delivery: '3-4 Days Delivery',
    desc: 'Engineered for clinics, restaurants, retail, consultants, and agencies who want more paying customer leads.',
    prices: {
      AED: 'AED 899',
      USD: '$249',
      INR: '₹12,999',
    },
    feeSubtext: 'Zero monthly retainers • Free SSL included',
    isPopular: true,
    isActive: true,
    features: [
      'Custom multi-section React + Tailwind architecture',
      'Google Maps, direct WhatsApp & Email lead booking',
      'Showcase products, client reviews & business credentials',
      'Custom domain configuration (yourbusiness.com) + free SSL',
      'Delivered ready to launch in 3 to 4 Days',
    ],
    waMessage: "Hi Raj, I'm ready to get the Small Business Growth Website for my company.",
    buttonText: 'Claim Business Site',
  },
  {
    id: 'site-upgrade-engine',
    title: 'Website Upgrade & Redesign',
    category: 'Modernization / Migration',
    badge: 'Speed & Conversion Boost',
    delivery: '5 Days Delivery',
    desc: 'Upgrade your slow, outdated WordPress, Wix, or old website into a blazing-fast 100/100 PageSpeed React experience.',
    prices: {
      AED: 'AED 1,499',
      USD: '$399',
      INR: '₹19,999',
    },
    feeSubtext: 'Zero plugins to update • Guaranteed 99+ speed',
    isPopular: false,
    isActive: true,
    features: [
      'Complete modern UI redesign preserving your existing content & SEO',
      'Replaces clunky WordPress/Wix plugins with native static code',
      '100/100 Google Lighthouse mobile score guaranteed',
      'Domain migration & DNS transfer handled with 0 downtime',
      'Delivered in 5 Days with 30 days post-launch support',
    ],
    waMessage: "Hi Raj, I want to upgrade my existing slow website with a high-speed redesign.",
    buttonText: 'Upgrade My Website',
  },
  {
    id: 'bespoke-web-app',
    title: 'Bespoke Web App & Portal',
    category: 'Startups & Portals',
    badge: 'Custom Systems',
    delivery: '7-10 Days Delivery',
    desc: 'For businesses that need online payment checkouts, booking calendars, customer portals, or interactive tools.',
    prices: {
      AED: 'AED 2,799',
      USD: '$749',
      INR: '₹34,999',
    },
    feeSubtext: 'Includes full database & 30 days engineering support',
    isPopular: false,
    isActive: true,
    features: [
      'Online payment checkout (Stripe / Apple Pay / Cards)',
      'Automated booking schedule or client portal',
      'Custom admin dashboard to manage leads & data',
      'Zero maintenance vulnerabilities or plugin crashes',
      'Delivered in 7-10 Days with full priority support',
    ],
    waMessage: "Hi Raj, I am interested in building a Bespoke Web App with payments/portal.",
    buttonText: 'Discuss Custom App',
  },
];

const DEFAULT_PROMO = {
  isActive: true,
  headline: '🔥 UAE & India Launch Offer: Free Custom Domain (.com) + Free SSL with All Business Tiers!',
  code: 'RAJWORKLAB',
  discountText: '100% Free Domain Setup',
};

const DEFAULT_ORDERS = [
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
    createdAt: '2026-10-27T17:45:00Z',
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
    notes: 'Replaces Linktree in my Instagram bio with high-speed video reels and WhatsApp coaching bookings.',
    status: 'Delivered',
    createdAt: '2026-10-26T14:20:00Z',
  },
  {
    id: 'ORD-1040',
    name: 'Marcus Sterling',
    businessType: 'Upgrade Existing Website',
    companyName: 'Sterling Property Advisors',
    ig: '@sterling_ventures',
    email: 'marcus@sterlingprop.co.uk',
    phone: '+44 7911 123456',
    region: 'Global / Other',
    tier: 'Website Upgrade & Redesign',
    quotedPrice: '£399 / $499',
    domainPreference: 'Already Own Domain (sterlingprop.co.uk)',
    notes: 'Old WordPress site is very slow (takes 7 seconds to load). Want 100/100 speed and luxury clean aesthetics.',
    status: 'In Review',
    createdAt: '2026-10-25T11:10:00Z',
  },
];

const DEFAULT_AUDIT = [
  {
    id: 'LOG-001',
    timestamp: '2026-10-27T18:00:00Z',
    type: 'SYSTEM',
    description: 'Raj Work Lab operations platform deployed with security gate',
    actor: 'System Engine',
  },
  {
    id: 'LOG-002',
    timestamp: '2026-10-27T17:45:10Z',
    type: 'ORDER_NEW',
    description: 'New lead received: Siddharth Rao (Rao Dental Aesthetics) - ₹12,999',
    actor: 'Client Portal',
  },
];

// LocalStorage helpers
export const dataService = {
  // Offers
  getOffers: () => {
    try {
      const data = localStorage.getItem('raj_offers');
      return data ? JSON.parse(data) : DEFAULT_OFFERS;
    } catch (e) {
      return DEFAULT_OFFERS;
    }
  },

  saveOffers: (offers) => {
    localStorage.setItem('raj_offers', JSON.stringify(offers));
    dataService.logAudit('OFFERS_UPDATE', `Updated package catalog (${offers.length} active tiers)`, 'Admin');
  },

  // Promo Banner
  getPromo: () => {
    try {
      const data = localStorage.getItem('raj_promo');
      return data ? JSON.parse(data) : DEFAULT_PROMO;
    } catch (e) {
      return DEFAULT_PROMO;
    }
  },

  savePromo: (promo) => {
    localStorage.setItem('raj_promo', JSON.stringify(promo));
    dataService.logAudit('PROMO_UPDATE', `Special offer banner updated: ${promo.isActive ? 'Active' : 'Disabled'}`, 'Admin');
  },

  // Orders
  getOrders: () => {
    try {
      const data = localStorage.getItem('raj_orders');
      return data ? JSON.parse(data) : DEFAULT_ORDERS;
    } catch (e) {
      return DEFAULT_ORDERS;
    }
  },

  addOrder: (order) => {
    const orders = dataService.getOrders();
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      ...order,
    };
    const updated = [newOrder, ...orders];
    localStorage.setItem('raj_orders', JSON.stringify(updated));
    dataService.logAudit('ORDER_NEW', `New order received from ${newOrder.name} (${newOrder.tier})`, 'Client');
    return newOrder;
  },

  updateOrderStatus: (orderId, newStatus) => {
    const orders = dataService.getOrders();
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    localStorage.setItem('raj_orders', JSON.stringify(updated));
    dataService.logAudit('ORDER_STATUS', `Order ${orderId} status changed to ${newStatus}`, 'Admin');
  },

  // Audit Trail
  getAuditTrail: () => {
    try {
      const data = localStorage.getItem('raj_audit');
      return data ? JSON.parse(data) : DEFAULT_AUDIT;
    } catch (e) {
      return DEFAULT_AUDIT;
    }
  },

  logAudit: (type, description, actor = 'System') => {
    const logs = dataService.getAuditTrail();
    const newLog = {
      id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString(),
      type,
      description,
      actor,
    };
    const updated = [newLog, ...logs.slice(0, 50)]; // keep latest 50
    localStorage.setItem('raj_audit', JSON.stringify(updated));
  },

  // CSV Export
  exportOrdersCSV: () => {
    const orders = dataService.getOrders();
    const headers = ['Order ID', 'Date', 'Client Name', 'Business / Company', 'Type', 'Package', 'Quoted Price', 'Phone', 'Email', 'Region', 'Status', 'Notes'];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.name}"`,
      `"${o.companyName || ''}"`,
      `"${o.businessType || ''}"`,
      `"${o.tier}"`,
      `"${o.quotedPrice || ''}"`,
      `"${o.phone || ''}"`,
      `"${o.email || ''}"`,
      `"${o.region || ''}"`,
      o.status,
      `"${(o.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Raj_Work_Lab_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    dataService.logAudit('DATA_EXPORT', 'Exported orders and client database to CSV', 'Admin');
  },
};
