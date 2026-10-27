import React from 'react';

export default function InspectModal({ project, isOpen, onClose, onOrderSimilar }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-display font-bold text-base text-slate-900">
            {project.title} — Metrics
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500">Instagram Handle</span>
            <span className="font-mono font-bold text-slate-900">{project.cleanHandle}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500">Google PageSpeed Score</span>
            <span className="font-mono font-bold text-emerald-600">{project.pagespeed}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500">LCP Speed Metric</span>
            <span className="font-mono font-bold text-brand-600">{project.lcp}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500">Architecture Archetype</span>
            <span className="font-medium text-slate-800">{project.category}</span>
          </div>
        </div>

        <button
          onClick={() => {
            onClose();
            onOrderSimilar('Creator Business Website');
          }}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
        >
          Order Similar Build
        </button>
      </div>
    </div>
  );
}
