import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import OrderDetailModal from './OrderDetailModal';

export default function AdminModal({
  isOpen,
  onClose,
  offers,
  onUpdateOffers,
  orders,
  onUpdateOrders,
  promo,
  onUpdatePromo,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'offers' | 'promo' | 'audit' | 'security'
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Edit / Add Package State
  const [editingOffer, setEditingOffer] = useState(null);
  const [isOfferFormOpen, setIsOfferFormOpen] = useState(false);

  // Promo Banner State
  const [promoForm, setPromoForm] = useState(promo || dataService.getPromo());

  // Security Master PIN state
  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState('');

  if (!isOpen) return null;

  const auditLogs = dataService.getAuditTrail();

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      o.name?.toLowerCase().includes(q) ||
      o.companyName?.toLowerCase().includes(q) ||
      o.phone?.includes(q) ||
      o.tier?.toLowerCase().includes(q) ||
      o.id?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  // Calculate KPIs
  const totalInquiries = orders.length;
  const inBuildCount = orders.filter((o) => o.status === 'In Build').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    dataService.updateOrderStatus(orderId, newStatus);
    onUpdateOrders(dataService.getOrders());
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Offers CRUD Handlers
  const handleOpenAddOffer = () => {
    setEditingOffer({
      id: `offer-${Date.now()}`,
      title: '',
      category: 'Small Business',
      badge: 'Fast Delivery',
      delivery: '3-4 Days Delivery',
      desc: '',
      prices: { AED: 'AED 899', USD: '$249', INR: '₹12,999' },
      feeSubtext: 'Zero monthly fees',
      isPopular: false,
      isActive: true,
      features: ['Custom high-speed React architecture', 'Mobile responsive 100/100 speed'],
      waMessage: 'Hi Raj, I am interested in this package.',
      buttonText: 'Claim Package',
    });
    setIsOfferFormOpen(true);
  };

  const handleOpenEditOffer = (pkg) => {
    setEditingOffer({ ...pkg, features: [...pkg.features] });
    setIsOfferFormOpen(true);
  };

  const handleSaveOffer = (e) => {
    e.preventDefault();
    if (!editingOffer.title) return;

    let updatedList;
    const exists = offers.find((o) => o.id === editingOffer.id);
    if (exists) {
      updatedList = offers.map((o) => (o.id === editingOffer.id ? editingOffer : o));
    } else {
      updatedList = [...offers, editingOffer];
    }

    onUpdateOffers(updatedList);
    dataService.saveOffers(updatedList);
    setIsOfferFormOpen(false);
    setEditingOffer(null);
  };

  const handleDeleteOffer = (id) => {
    if (window.confirm('Are you sure you want to delete this offer tier?')) {
      const updatedList = offers.filter((o) => o.id !== id);
      onUpdateOffers(updatedList);
      dataService.saveOffers(updatedList);
    }
  };

  const handleSavePromo = (e) => {
    e.preventDefault();
    onUpdatePromo(promoForm);
    dataService.savePromo(promoForm);
    alert('Promotional banner settings updated!');
  };

  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      localStorage.setItem('raj_admin_master_pin', newPin.trim());
      dataService.logAudit('SECURITY', 'Master Admin PIN changed', 'Admin');
      setPinSuccess('Master Admin PIN successfully updated!');
      setNewPin('');
    } else {
      alert('PIN must be at least 4 digits/characters.');
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                RW
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                  Raj Work Lab Control Center
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                    Active Session
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Full management for orders, offer catalogs, promo setup &amp; audit trails
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={dataService.exportOrdersCSV}
                className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="Export all orders to CSV"
              >
                <span className="material-symbols-outlined text-[15px]">download</span>
                <span>Export CSV</span>
              </button>
              <button
                onClick={onLogout}
                className="py-1.5 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">logout</span>
                <span>Sign Out</span>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-5 pt-2 border-b border-slate-200 bg-white flex overflow-x-auto gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">inbox</span>
              <span>Orders &amp; Leads ({orders.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`pb-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'offers'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">sell</span>
              <span>Offers &amp; Packages ({offers.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('promo')}
              className={`pb-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'promo'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">campaign</span>
              <span>Promo Banners</span>
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`pb-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">history</span>
              <span>Audit Trail</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`pb-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'security'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">lock_reset</span>
              <span>Security PIN</span>
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/30">
            {/* TAB 1: ORDERS & LEADS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {/* KPI Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                    <span className="text-xs text-slate-500">Total Leads &amp; Orders</span>
                    <p className="font-display text-2xl font-bold text-slate-900 mt-1">
                      {totalInquiries}
                    </p>
                    <span className="text-[11px] text-emerald-600 font-medium">+24% this month</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                    <span className="text-xs text-slate-500">In Active Build</span>
                    <p className="font-display text-2xl font-bold text-brand-600 mt-1">
                      {inBuildCount}
                    </p>
                    <span className="text-[11px] text-slate-500">48h target execution</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                    <span className="text-xs text-slate-500">Successfully Delivered</span>
                    <p className="font-display text-2xl font-bold text-emerald-600 mt-1">
                      {deliveredCount}
                    </p>
                    <span className="text-[11px] text-emerald-600 font-medium">100/100 verified</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                    <span className="text-xs text-slate-500">Key Focus Markets</span>
                    <p className="font-display text-lg font-bold text-slate-900 mt-1">DXB &amp; India</p>
                    <span className="text-[11px] text-slate-500">Creators &amp; Businesses</span>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {['ALL', 'New', 'In Review', 'In Build', 'Delivered', 'Cancelled'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          statusFilter === st
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="relative min-w-[220px]">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[16px] text-slate-400">
                      search
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search client, phone, tier..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:border-brand-600 outline-none text-slate-900 bg-slate-50"
                    />
                  </div>
                </div>

                {/* Orders Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="p-3 pl-4">Order ID &amp; Date</th>
                          <th className="p-3">Client / Business</th>
                          <th className="p-3">Package Tier</th>
                          <th className="p-3">Domain / Goal</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 pr-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="p-6 text-center text-slate-400">
                              No orders match the selected filter.
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map((o) => (
                            <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-3 pl-4">
                                <span className="font-mono font-bold text-slate-900 block">{o.id}</span>
                                <span className="text-[10px] text-slate-400">
                                  {new Date(o.createdAt).toLocaleDateString()}
                                </span>
                              </td>
                              <td className="p-3">
                                <p className="font-semibold text-slate-900">{o.name}</p>
                                {o.companyName && (
                                  <p className="text-[11px] text-slate-500">{o.companyName}</p>
                                )}
                                <p className="text-[10px] font-mono text-slate-400">{o.phone}</p>
                              </td>
                              <td className="p-3">
                                <span className="font-medium text-slate-800 block">{o.tier}</span>
                                <span className="text-[11px] font-bold text-brand-600">
                                  {o.quotedPrice}
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="text-[11px] font-semibold text-slate-700 block">
                                  {o.businessType || 'General Site'}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {o.domainPreference || 'Standard'}
                                </span>
                              </td>
                              <td className="p-3">
                                <span
                                  className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    o.status === 'New'
                                      ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                                      : o.status === 'In Build'
                                      ? 'bg-sky-100 text-sky-800'
                                      : o.status === 'Delivered'
                                      ? 'bg-purple-100 text-purple-800'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {o.status}
                                </span>
                              </td>
                              <td className="p-3 pr-4 text-right space-x-2">
                                <button
                                  onClick={() => setSelectedOrder(o)}
                                  className="inline-flex items-center gap-0.5 text-xs font-semibold text-brand-600 hover:text-brand-800 cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                                  Summary
                                </button>
                                <a
                                  href={`https://wa.me/${(!((o.phone || '').replace(/[^0-9]/g, '')) || ((o.phone || '').replace(/[^0-9]/g, '')).includes('1234567') || ((o.phone || '').replace(/[^0-9]/g, '')).startsWith('97150')) ? '971582389502' : (o.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${o.name}, Raj Work Lab team here regarding your project order ${o.id}.`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 hover:text-emerald-800"
                                >
                                  <span className="material-symbols-outlined text-[14px]">chat</span>
                                  Chat
                                </a>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: OFFERS & PACKAGES MANAGER */}
            {activeTab === 'offers' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900">
                      Live Offer &amp; Pricing Catalog
                    </h4>
                    <p className="text-xs text-slate-500">
                      Edit pricing, turnarounds, descriptions, and feature bullets across AED, USD, and INR.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddOffer}
                    className="py-2 px-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    <span>Create New Offer Tier</span>
                  </button>
                </div>

                {/* Offer Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {offers.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                            {pkg.badge}
                          </span>
                          <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                            {pkg.delivery}
                          </span>
                        </div>

                        <h4 className="font-display font-bold text-base text-slate-900 mt-2">
                          {pkg.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">{pkg.desc}</p>

                        <div className="mt-3 flex items-center gap-3 font-mono text-xs font-bold text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <span>🇦🇪 {pkg.prices.AED}</span>
                          <span className="text-slate-300">•</span>
                          <span>🇺🇸 {pkg.prices.USD}</span>
                          <span className="text-slate-300">•</span>
                          <span>🇮🇳 {pkg.prices.INR}</span>
                        </div>

                        <ul className="mt-3 space-y-1 text-xs text-slate-600">
                          {pkg.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[14px] text-emerald-600">
                                check
                              </span>
                              <span className="truncate">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-mono">
                          {pkg.isPopular ? '⭐ Most Popular' : 'Standard Tier'}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenEditOffer(pkg)}
                            className="py-1 px-3 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Edit Offer
                          </button>
                          <button
                            onClick={() => handleDeleteOffer(pkg.id)}
                            className="py-1 px-2 text-red-500 hover:text-red-700 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PROMO BANNER MANAGER */}
            {activeTab === 'promo' && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs max-w-2xl space-y-5">
                <div>
                  <h4 className="font-display font-bold text-base text-slate-900">
                    Special Offer &amp; Promotional Banner
                  </h4>
                  <p className="text-xs text-slate-500">
                    Display an active promotional announcement at the top of rajworklab.com
                  </p>
                </div>

                <form onSubmit={handleSavePromo} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="promo-active"
                      checked={promoForm.isActive}
                      onChange={(e) => setPromoForm({ ...promoForm, isActive: e.target.checked })}
                      className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <label htmlFor="promo-active" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Activate Announcement Promo Banner on Website
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Banner Headline Text
                    </label>
                    <input
                      type="text"
                      value={promoForm.headline}
                      onChange={(e) => setPromoForm({ ...promoForm, headline: e.target.value })}
                      placeholder="e.g. 🔥 UAE Launch Promo: Free .com Domain + Free SSL!"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 outline-none focus:border-brand-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Promo Code
                      </label>
                      <input
                        type="text"
                        value={promoForm.code}
                        onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value })}
                        placeholder="e.g. RAJWORKLAB"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-mono text-slate-900 outline-none focus:border-brand-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Discount Highlight
                      </label>
                      <input
                        type="text"
                        value={promoForm.discountText}
                        onChange={(e) => setPromoForm({ ...promoForm, discountText: e.target.value })}
                        placeholder="e.g. 100% Free Domain Setup"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 outline-none focus:border-brand-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    Save Promo Settings
                  </button>
                </form>
              </div>
            )}

            {/* TAB 4: AUDIT TRAIL */}
            {activeTab === 'audit' && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900">
                      System Audit Trail
                    </h4>
                    <p className="text-xs text-slate-500">
                      Immutable record of all admin updates, logins, order status shifts &amp; catalog edits
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Latest {auditLogs.length} events
                  </span>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-3.5 flex items-start justify-between gap-3 hover:bg-slate-50">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {log.type}
                          </span>
                          <span className="text-slate-900 font-medium">{log.description}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Actor: <span className="font-mono">{log.actor}</span>
                        </p>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400 shrink-0">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: SECURITY */}
            {activeTab === 'security' && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs max-w-md space-y-4">
                <div>
                  <h4 className="font-display font-bold text-base text-slate-900">
                    Change Master Admin PIN
                  </h4>
                  <p className="text-xs text-slate-500">
                    Update the passcode required to unlock this control center.
                  </p>
                </div>

                {pinSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-semibold">
                    {pinSuccess}
                  </div>
                )}

                <form onSubmit={handleChangePin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      New Security Code (min 4 characters)
                    </label>
                    <input
                      type="password"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="Enter new PIN"
                      required
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm font-mono outline-none focus:border-brand-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Update Master PIN
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit / Create Offer Drawer Modal */}
      {isOfferFormOpen && editingOffer && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-display font-bold text-base text-slate-900">
                {editingOffer.id.startsWith('offer-') ? 'Create New Offer Tier' : 'Edit Offer Tier'}
              </h3>
              <button
                onClick={() => setIsOfferFormOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveOffer} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Package Title</label>
                <input
                  type="text"
                  value={editingOffer.title}
                  onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                  placeholder="e.g. Small Business Growth Website"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-brand-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Badge / Tag</label>
                  <input
                    type="text"
                    value={editingOffer.badge}
                    onChange={(e) => setEditingOffer({ ...editingOffer, badge: e.target.value })}
                    placeholder="e.g. Complete Showcase"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-brand-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Turnaround Time</label>
                  <input
                    type="text"
                    value={editingOffer.delivery}
                    onChange={(e) => setEditingOffer({ ...editingOffer, delivery: e.target.value })}
                    placeholder="e.g. 48h Delivery"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea
                  value={editingOffer.desc}
                  onChange={(e) => setEditingOffer({ ...editingOffer, desc: e.target.value })}
                  rows="2"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-brand-600 resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price AED</label>
                  <input
                    type="text"
                    value={editingOffer.prices.AED}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        prices: { ...editingOffer.prices, AED: e.target.value },
                      })
                    }
                    placeholder="AED 899"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono outline-none focus:border-brand-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price USD</label>
                  <input
                    type="text"
                    value={editingOffer.prices.USD}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        prices: { ...editingOffer.prices, USD: e.target.value },
                      })
                    }
                    placeholder="$249"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono outline-none focus:border-brand-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price INR</label>
                  <input
                    type="text"
                    value={editingOffer.prices.INR}
                    onChange={(e) =>
                      setEditingOffer({
                        ...editingOffer,
                        prices: { ...editingOffer.prices, INR: e.target.value },
                      })
                    }
                    placeholder="₹12,999"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingOffer.isPopular}
                    onChange={(e) => setEditingOffer({ ...editingOffer, isPopular: e.target.checked })}
                    className="rounded text-brand-600"
                  />
                  <span>Mark as "Most Popular"</span>
                </label>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Features List (One per line)
                </label>
                <textarea
                  value={editingOffer.features.join('\n')}
                  onChange={(e) =>
                    setEditingOffer({
                      ...editingOffer,
                      features: e.target.value.split('\n').filter((f) => f.trim() !== ''),
                    })
                  }
                  rows="4"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-brand-600 font-mono"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOfferFormOpen(false)}
                  className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 cursor-pointer shadow-xs"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}
    </>
  );
}
