import React from 'react';

export default function AdminModal({ isOpen, onClose, leads = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Admin Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Raj Work Lab — Control Hub
              </h3>
              <p className="text-xs text-slate-500">
                Internal pipeline telemetry, real-time client leads &amp; catalog status
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Admin Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* KPI Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-xs text-slate-500">Total IG Inquiries</span>
              <p className="font-display text-2xl font-bold text-slate-900 mt-1">
                {142 + leads.length}
              </p>
              <span className="text-[11px] text-emerald-600 font-medium">+18.4% this week</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-xs text-slate-500">Active Builds</span>
              <p className="font-display text-2xl font-bold text-brand-600 mt-1">12</p>
              <span className="text-[11px] text-slate-500">4 delivery within 24h</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-xs text-slate-500">Monthly Revenue</span>
              <p className="font-display text-2xl font-bold text-slate-900 mt-1">$14,850</p>
              <span className="text-[11px] text-emerald-600 font-medium">+32% MoM growth</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-xs text-slate-500">Best Seller</span>
              <p className="font-display text-lg font-bold text-slate-900 mt-1">Growth Biz</p>
              <span className="text-[11px] text-slate-500">64% total checkouts</span>
            </div>
          </div>

          {/* Inquiries Pipeline Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-display font-semibold text-sm text-slate-900">
                  Lead Pipeline &amp; Recent Orders
                </h4>
                <p className="text-xs text-slate-500">Direct fast-connect routing via WhatsApp</p>
              </div>
              <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Live Synced
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3 pl-4">Client</th>
                    <th className="p-3">IG Handle</th>
                    <th className="p-3">Tier</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 pr-4 text-right">Quick Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {leads.map((lead, idx) => (
                    <tr key={`live-${idx}`} className="bg-emerald-50/40 hover:bg-emerald-50/70 transition-colors">
                      <td className="p-3 pl-4 font-semibold text-slate-900">{lead.name}</td>
                      <td className="p-3 font-mono text-brand-600">{lead.ig}</td>
                      <td className="p-3 text-slate-800 font-medium">{lead.tier}</td>
                      <td className="p-3 text-emerald-700 font-semibold text-[11px]">Just Now</td>
                      <td className="p-3">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 animate-pulse">
                          New Order
                        </span>
                      </td>
                      <td className="p-3 pr-4 text-right">
                        <a
                          href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, Raj Work Lab team here regarding your order!`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                          <span className="material-symbols-outlined text-[13px]">chat</span> Chat
                        </a>
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 pl-4 font-medium text-slate-900">Siddharth Rao</td>
                    <td className="p-3 font-mono text-brand-600">@sid.visuals</td>
                    <td className="p-3 text-slate-600">Creator Business</td>
                    <td className="p-3 text-slate-400 text-[11px]">10m ago</td>
                    <td className="p-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        In Build
                      </span>
                    </td>
                    <td className="p-3 pr-4 text-right">
                      <a
                        href="https://wa.me/919845011223"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        <span className="material-symbols-outlined text-[13px]">chat</span> Chat
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 pl-4 font-medium text-slate-900">Elena Rostova (Dubai)</td>
                    <td className="p-3 font-mono text-brand-600">@elena_fitclub</td>
                    <td className="p-3 text-slate-600">Bio Link Website</td>
                    <td className="p-3 text-slate-400 text-[11px]">Yesterday</td>
                    <td className="p-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700">
                        Delivered
                      </span>
                    </td>
                    <td className="p-3 pr-4 text-right">
                      <a
                        href="https://wa.me/971501234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        <span className="material-symbols-outlined text-[13px]">chat</span> Chat
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 pl-4 font-medium text-slate-900">Marcus Sterling</td>
                    <td className="p-3 font-mono text-brand-600">@sterling_ventures</td>
                    <td className="p-3 text-slate-600">Custom Web App</td>
                    <td className="p-3 text-slate-400 text-[11px]">2 days ago</td>
                    <td className="p-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        Live 100/100
                      </span>
                    </td>
                    <td className="p-3 pr-4 text-right">
                      <a
                        href="https://wa.me/971501234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        <span className="material-symbols-outlined text-[13px]">chat</span> Chat
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Package Catalog Quick View */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-semibold text-sm text-slate-900">
                Active Package Catalog
              </h4>
              <span className="text-xs text-slate-400">Live on rajworklab.com</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-semibold text-xs text-slate-900">Bio Link Website</p>
                <p className="text-[11px] text-slate-500">AED 349 • $99 • ₹4,999</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-semibold text-xs text-slate-900">Creator Business</p>
                <p className="text-[11px] text-slate-500">AED 899 • $249 • ₹12,999</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-semibold text-xs text-slate-900">Custom Web App</p>
                <p className="text-[11px] text-slate-500">AED 2,199 • $599 • ₹29,999</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
