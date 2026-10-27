// Raj Work Lab Data Service
// Manages reactive storage for Packages, Special Offers, Orders, and Audit Trail

const DEFAULT_OFFERS = [
  {
    id: 'creator-link-site',
    title: '1-Page Creator Link Site',
    category: 'Creators & Solo Pros',
    badge: 'Replace Links & Launch Fast',
    delivery: '48h Delivery',
    desc: 'Upgrade your Linktree with a fast-loading, branded social hub.',
    prices: {
      AED: 'AED 299',
      USD: '$79',
      INR: '₹3,999',
    },
    feeSubtext: 'Limited Time Launch Price! No Monthly Fees.',
    isPopular: false,
    isActive: true,
    features: [
      'Your own branded .com (or yourname.ae) setup',
      'Direct link-to-chat WhatsApp & Social Media',
      'Showcase bio, portfolio, services, photos',
      'Blazing fast 0.3s load time guaranteed',
      'Ready to Launch in Just 48 Hours',
    ],
    waMessage: "Hi Raj, I want the 1-Page Creator Link Site (AED 299). Let's launch it in 48 hours!",
    buttonText: 'Get My 1-Page Site',
  },
  {
    id: 'starter-business-growth',
    title: 'Starter Business Growth Site',
    category: 'Local & Service Businesses',
    badge: 'Showcase Your Brand',
    delivery: '3 to 4 Days',
    desc: 'Get more local leads with a complete multi-section static website.',
    prices: {
      AED: 'AED 799',
      USD: '$219',
      INR: '₹10,999',
    },
    feeSubtext: 'Launch Offer: FREE Custom Domain for 1 Year',
    isPopular: true,
    isActive: true,
    features: [
      'Multi-page-feel React + Tailwind design',
      'Integrated Maps, WhatsApp, Email lead booking',
      'Service pages, client reviews, about section',
      'Full technical domain config + Free SSL',
      'Done & Dusted in 3 to 4 Days',
    ],
    waMessage: "Hi Raj, I want the Starter Business Growth Site (AED 799) with free domain for 1 year.",
    buttonText: 'Get Starter Business Site',
  },
  {
    id: 'wordpress-static-shift',
    title: 'WordPress to Blazing-Fast Static Shift',
    category: 'Modernization / Migration',
    badge: 'Ditch Old Slow Sites',
    delivery: '5 Days Delivery',
    desc: 'Convert your slow, unsecure website to a secure, instant-loading experience.',
    prices: {
      AED: 'AED 1,199',
      USD: '$329',
      INR: '₹16,999',
    },
    feeSubtext: 'Includes 30 Days of Free Content Updates',
    isPopular: false,
    isActive: true,
    features: [
      'Move existing content to secure, un-hackable static code',
      'Guaranteed 100/100 Google Lighthouse Score',
      'Fixes slow load times & plugin headaches',
      'Hassle-free domain & DNS migration',
      'Done in 5 Days + 1st Month Support',
    ],
    waMessage: "Hi Raj, I want to convert my slow website to a Blazing-Fast Static Shift (AED 1,199).",
    buttonText: 'Speed Up My Website',
  },
  {
    id: 'premium-custom-app',
    title: 'Premium Custom App & Portal',
    category: 'Startups & Portals',
    badge: 'Full Stack Solutions',
    delivery: '7-10 Days Delivery',
    desc: 'For complex business workflows, online stores, & booking engines.',
    prices: {
      AED: 'AED 2,499',
      USD: '$679',
      INR: '₹32,999',
    },
    feeSubtext: 'Includes Custom Admin Dashboard & database setup',
    isPopular: false,
    isActive: true,
    features: [
      'Secure, custom-built secure payment gateway (Stripe/Apple/etc.)',
      'Custom automated booking or user portal (e.g., client portal)',
      'Backend dashboard to manage leads, orders, & users',
      'Scalable React/Angular architecture, not a template',
      'Full support & delivery in 7-10 days',
    ],
    waMessage: "Hi Raj, I am interested in building a Premium Custom App & Portal (AED 2,499).",
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
    id: 'ORD-1043',
    name: 'Tariq Al-Mansoor',
    businessType: 'Starter Business Growth Site',
    companyName: 'Al-Mansoor Logistics Dubai',
    ig: '@almansoor_dxb',
    email: 'tariq@almansoor.ae',
    phone: '+971 58 238 9502',
    region: 'UAE (+971 58 238 9502)',
    tier: 'Starter Business Growth Site',
    quotedPrice: 'AED 799',
    domainPreference: 'Need New Domain (almansoor.ae)',
    notes: 'Inquiry via WhatsApp. Needs direct WhatsApp quote request and fleet services showcase.',
    status: 'In Build',
    createdAt: '2026-10-27T19:20:00Z',
    source: 'WhatsApp',
  },
  {
    id: 'ORD-1042',
    name: 'Siddharth Rao',
    businessType: 'Starter Business Growth Site',
    companyName: 'Rao Dental Aesthetics',
    ig: '@sid.visuals',
    email: 'siddharth@raoaesthetics.com',
    phone: '+91 98450 11223',
    region: 'India (+91)',
    tier: 'Starter Business Growth Site',
    quotedPrice: '₹10,999',
    domainPreference: 'Need New Domain (raodental.com)',
    notes: 'Need online appointment booking and WhatsApp patient inquiries for Bangalore clinic.',
    status: 'In Build',
    createdAt: '2026-10-27T17:45:00Z',
    source: 'Online Form',
  },
  {
    id: 'ORD-1041',
    name: 'Elena Rostova',
    businessType: '1-Page Creator Link Site',
    companyName: 'Elena Fit Club Dubai',
    ig: '@elena_fitclub',
    email: 'elena@fitnessdubai.ae',
    phone: '+971 58 238 9502',
    region: 'UAE (+971)',
    tier: '1-Page Creator Link Site',
    quotedPrice: 'AED 299',
    domainPreference: 'Need New Domain (elenafit.ae)',
    notes: 'Replaces Linktree in Instagram bio with high-speed video reels and WhatsApp coaching bookings.',
    status: 'Delivered',
    createdAt: '2026-10-26T14:20:00Z',
    source: 'WhatsApp',
  },
  {
    id: 'ORD-1040',
    name: 'Marcus Sterling',
    businessType: 'WordPress to Blazing-Fast Static Shift',
    companyName: 'Sterling Property Advisors',
    ig: '@sterling_ventures',
    email: 'marcus@sterlingprop.co.uk',
    phone: '+44 7911 123456',
    region: 'Global / Other',
    tier: 'WordPress to Blazing-Fast Static Shift',
    quotedPrice: 'AED 1,199 / $329',
    domainPreference: 'Already Own Domain (sterlingprop.co.uk)',
    notes: 'Old WordPress site is very slow. Converting to secure, un-hackable static code with 100/100 speed.',
    status: 'In Review',
    createdAt: '2026-10-25T11:10:00Z',
    source: 'WhatsApp',
  },
];

const DEFAULT_AUDIT = [
  {
    id: 'LOG-001',
    timestamp: new Date().toISOString(),
    type: 'SYSTEM',
    description: 'Raj Work Lab operations platform deployed with updated package catalog',
    actor: 'System Engine',
  },
  {
    id: 'LOG-002',
    timestamp: '2026-10-27T19:20:10Z',
    type: 'ORDER_NEW',
    description: 'WhatsApp lead received: Tariq Al-Mansoor (Al-Mansoor Logistics Dubai) - AED 799',
    actor: 'WhatsApp Lead Tracker',
  },
];

// LocalStorage helpers
export const dataService = {
  // Offers
  getOffers: () => {
    try {
      const data = localStorage.getItem('raj_offers_v3');
      return data ? JSON.parse(data) : DEFAULT_OFFERS;
    } catch (e) {
      return DEFAULT_OFFERS;
    }
  },

  saveOffers: (offers) => {
    localStorage.setItem('raj_offers_v3', JSON.stringify(offers));
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
      let orders = DEFAULT_ORDERS;
      const data = localStorage.getItem('raj_orders_v4');
      if (data) {
        orders = JSON.parse(data);
      } else {
        const legacy = localStorage.getItem('raj_orders');
        if (legacy) {
          orders = JSON.parse(legacy);
        }
      }

      // Proactively sanitize and migrate any stale dummy phone numbers in stored browser data
      let mutated = false;
      orders = orders.map((o) => {
        if (
          !o.phone ||
          o.phone.includes('123 4567') ||
          o.phone.includes('1234567') ||
          o.phone.includes('97150') ||
          (o.name && o.name.includes('Elena') && !o.phone.includes('582389502'))
        ) {
          mutated = true;
          return {
            ...o,
            phone: '+971 58 238 9502',
            region: 'UAE (+971 58 238 9502)',
          };
        }
        return o;
      });

      if (mutated || !data) {
        localStorage.setItem('raj_orders_v4', JSON.stringify(orders));
        localStorage.setItem('raj_orders', JSON.stringify(orders));
      }

      return orders;
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
    localStorage.setItem('raj_orders_v4', JSON.stringify(updated));
    localStorage.setItem('raj_orders', JSON.stringify(updated));
    const actorName = order.source ? `Client (${order.source})` : 'Client Portal';
    dataService.logAudit('ORDER_NEW', `New order/lead received: ${newOrder.name} (${newOrder.tier || 'Custom'}) - ${newOrder.quotedPrice || 'Direct Quote'}`, actorName);
    return newOrder;
  },

  updateOrderStatus: (orderId, newStatus) => {
    const orders = dataService.getOrders();
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    localStorage.setItem('raj_orders_v4', JSON.stringify(updated));
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
    const headers = ['Order ID', 'Date', 'Source', 'Client Name', 'Business / Company', 'Type', 'Package', 'Quoted Price', 'Phone', 'Email', 'Region', 'Status', 'Notes'];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.source || 'Direct'}"`,
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
