import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function OrderModal({ isOpen, onClose, initialTier = 'Creator Business Website', onLeadCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    ig: '',
    tier: 'Creator Business Website',
    region: 'India (+91)',
    phone: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialTier) {
      setFormData((prev) => ({ ...prev, tier: initialTier }));
    }
    if (isOpen) {
      setIsSubmitted(false);
      setError('');
    }
  }, [initialTier, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Build formatted WhatsApp message
  const buildWhatsAppText = () => {
    const rawIg = formData.ig.trim();
    const formattedIg = rawIg ? (rawIg.startsWith('@') ? rawIg : `@${rawIg}`) : 'Not specified';
    return `Hi Raj! I want to start a custom website project with Raj Work Lab.
👤 *Name / Brand:* ${formData.name.trim() || 'Not specified'}
📸 *Instagram Handle:* ${formattedIg}
📦 *Package Tier:* ${formData.tier}
🌍 *Region:* ${formData.region}
📱 *WhatsApp:* ${formData.phone.trim() || 'Not specified'}
📝 *Scope / Existing Bio:* ${formData.notes.trim() || 'Looking for a fast, modern website.'}`;
  };

  const handleSendViaWhatsApp = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide your name and WhatsApp number.');
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#0ea5e9', '#0284c7', '#ffffff'],
      });
    } catch (e) {
      // ignore
    }

    // Add to leads
    if (onLeadCreated) {
      onLeadCreated({
        name: formData.name,
        ig: formData.ig.startsWith('@') ? formData.ig : `@${formData.ig}`,
        tier: formData.tier,
        phone: formData.phone,
        region: formData.region,
      });
    }

    const waText = buildWhatsAppText();
    // Default to India desk or UAE depending on region selection
    const phoneNum = formData.region.includes('UAE') ? '971501234567' : '917907142807';
    window.open(`https://wa.me/${phoneNum}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide your name and WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '62a9df12-21f7-4670-81ce-d98e5f89a799';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `⚡ New Raj Work Lab Order: ${formData.tier} - ${formData.name}`,
          from_name: 'Raj Work Lab Inquiries',
          name: formData.name,
          phone: formData.phone,
          instagram: formData.ig,
          region: formData.region,
          tier: formData.tier,
          message: formData.notes,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        try {
          confetti({
            particleCount: 110,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0284c7', '#10b981', '#4f46e5', '#ffffff'],
          });
        } catch (err) {
          // ignore
        }

        if (onLeadCreated) {
          onLeadCreated({
            name: formData.name,
            ig: formData.ig.startsWith('@') ? formData.ig : `@${formData.ig}`,
            tier: formData.tier,
            phone: formData.phone,
            region: formData.region,
          });
        }
      } else {
        throw new Error(data.message || 'Submission failed. Please use WhatsApp.');
      }
    } catch (err) {
      setError(err.message || 'Unable to submit directly. Please send via WhatsApp!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Claim Your Custom Website
              </h3>
              <p className="text-xs text-slate-500">Shipped in 48 hours with 100/100 performance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">check</span>
            </div>
            <h4 className="font-display font-bold text-lg text-slate-900">Order Slot Confirmed!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              We received your details. Raj Work Lab engineering will ping your WhatsApp in under 30 minutes to initiate build prep.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                Return to Page
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmitEmail}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name or Brand
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Liam Vance / Nomad Media"
                required
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Instagram / Social Handle
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 text-sm">@</span>
                  <input
                    type="text"
                    name="ig"
                    value={formData.ig}
                    onChange={handleChange}
                    placeholder="your.brand"
                    required
                    className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Package Tier
                </label>
                <select
                  name="tier"
                  value={formData.tier}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none text-slate-900 bg-white"
                >
                  <option value="Bio Link Website">Bio Link Website (AED 349 / ₹4,999)</option>
                  <option value="Creator Business Website">Creator Business (AED 899 / ₹12,999)</option>
                  <option value="Custom Web App">Custom Web App (AED 2,199 / ₹29,999)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Region
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none text-slate-900 bg-white"
                >
                  <option value="UAE (+971)">🇦🇪 UAE (+971)</option>
                  <option value="India (+91)">🇮🇳 India (+91)</option>
                  <option value="Global / Other">🌐 Global / Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="50 123 4567 or 98450 11223"
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Existing Bio Link or Project Scope
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Current Linktree link, color preference, Dubai or India launch timeline..."
                rows="2"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none text-slate-900 placeholder:text-slate-400 resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Send Enquiry on WhatsApp</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-75"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Submit to Lab'}</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
