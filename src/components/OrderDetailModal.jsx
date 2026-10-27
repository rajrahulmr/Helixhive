import React, { useState } from 'react';

export default function OrderDetailModal({ order, isOpen, onClose, onUpdateStatus }) {
  if (!isOpen || !order) return null;

  const [currentStatus, setCurrentStatus] = useState(order.status || 'New');

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    onUpdateStatus(order.id, newStatus);
  };

  const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
  const waReplyUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi ${order.name}! Raj here from Raj Work Lab regarding your order (${order.id} - ${order.tier}). We are ready to proceed with your build.`
  )}`;

  const statusColors = {
    New: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'In Review': 'bg-amber-100 text-amber-800 border-amber-200',
    'In Build': 'bg-sky-100 text-sky-800 border-sky-200',
    Delivered: 'bg-purple-100 text-purple-800 border-purple-200',
    Cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              #
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-slate-900">
                  Order Summary: {order.id}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    statusColors[currentStatus] || 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {currentStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Received on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Client & Business Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Customer Details
              </span>
              <p className="font-display font-bold text-sm text-slate-900">{order.name}</p>
              {order.companyName && (
                <p className="text-xs font-medium text-slate-700">{order.companyName}</p>
              )}
              <div className="pt-1 flex flex-col gap-1 text-xs text-slate-600 font-mono">
                <span>📱 {order.phone || 'No phone'}</span>
                <span>✉️ {order.email || 'No email provided'}</span>
                {order.ig && <span>📸 {order.ig}</span>}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Package &amp; Value
              </span>
              <p className="font-display font-bold text-sm text-brand-600">{order.tier}</p>
              <p className="text-base font-extrabold text-slate-900">
                Quote: {order.quotedPrice || 'Tier Standard'}
              </p>
              <div className="pt-1 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Business Objective:</span>
                <p className="text-slate-500">{order.businessType || 'General Web Architecture'}</p>
              </div>
            </div>
          </div>

          {/* Domain & Scope */}
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Domain &amp; Infrastructure
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {order.domainPreference || 'Standard Setup'}
              </span>
            </div>
            <div className="pt-1">
              <span className="text-xs font-semibold text-slate-700">Client Scope &amp; Notes:</span>
              <p className="text-xs text-slate-600 mt-1 bg-white p-3 rounded-lg border border-slate-200/80 leading-relaxed">
                {order.notes || 'No custom notes provided by client.'}
              </p>
            </div>
          </div>

          {/* Status Pipeline Controller */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <span className="text-xs font-bold text-slate-800">Update Order Status</span>
              <p className="text-[11px] text-slate-500">
                Changes are permanently timestamped in the system audit trail.
              </p>
            </div>
            <select
              value={currentStatus}
              onChange={handleStatusChange}
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-bold bg-slate-50 text-slate-800 outline-none focus:border-brand-600"
            >
              <option value="New">🟡 New</option>
              <option value="In Review">🟠 In Review</option>
              <option value="In Build">🔵 In Build</option>
              <option value="Delivered">🟢 Delivered</option>
              <option value="Cancelled">⚪ Cancelled</option>
            </select>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row gap-2.5 justify-end">
          <a
            href={waReplyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Direct Reply on WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
}
