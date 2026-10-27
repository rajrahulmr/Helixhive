import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { dataService } from '../services/dataService';

export default function OrderModal({
  isOpen,
  onClose,
  initialTier = 'Small Business Growth Website',
  offers = [],
  onOrderCreated,
}) {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    businessType: 'Small Business Website (Clinic, Retail, Services)',
    domainPreference: 'Need New Domain Purchased (.com / .ae / .in)',
    tier: 'Small Business Growth Website',
    region: 'India (+91)',
    phone: '',
    email: '',
    existingUrlOrSocial: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');
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

  // Build clean formatted WhatsApp message
  const buildWhatsAppText = (orderId) => {
    return `Hi Raj! I want to start a custom website build with Raj Work Lab.
🔖 *Order Ref:* ${orderId}
👤 *Contact Name:* ${formData.name.trim()}
🏢 *Business / Brand:* ${formData.companyName.trim() || 'Not specified'}
💼 *Objective:* ${formData.businessType}
🌐 *Domain Plan:* ${formData.domainPreference}
📦 *Package Tier:* ${formData.tier}
🌍 *Region:* ${formData.region}
📱 *WhatsApp:* ${formData.phone.trim()}
✉️ *Email:* ${formData.email.trim() || 'Not specified'}
🔗 *Existing Website / Social:* ${formData.existingUrlOrSocial.trim() || 'None'}
📝 *Scope & Requirements:* ${formData.notes.trim() || 'Ready to upgrade to a high-speed Jamstack site.'}`;
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

    // Save to local dataService
    const newOrder = dataService.addOrder({
      name: formData.name,
      companyName: formData.companyName,
      businessType: formData.businessType,
      domainPreference: formData.domainPreference,
      tier: formData.tier,
      phone: formData.phone,
      email: formData.email,
      ig: formData.existingUrlOrSocial,
      region: formData.region,
      notes: formData.notes,
      quotedPrice: 'Direct Inquiry',
    });

    setCreatedOrderId(newOrder.id);
    if (onOrderCreated) {
      onOrderCreated(newOrder);
    }

    const waText = buildWhatsAppText(newOrder.id);
    const phoneNum = formData.region.includes('UAE') ? '971582389502' : '917907142807';
    window.open(`https://wa.me/${phoneNum}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  const handleSubmitDirect = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide your name and WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Save order immediately to dataService
    const newOrder = dataService.addOrder({
      name: formData.name,
      companyName: formData.companyName,
      businessType: formData.businessType,
      domainPreference: formData.domainPreference,
      tier: formData.tier,
      phone: formData.phone,
      email: formData.email,
      ig: formData.existingUrlOrSocial,
      region: formData.region,
      notes: formData.notes,
      quotedPrice: 'Direct Web Inquiry',
    });

    setCreatedOrderId(newOrder.id);
    if (onOrderCreated) {
      onOrderCreated(newOrder);
    }

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
          subject: `⚡ New Raj Work Lab Order [${newOrder.id}]: ${formData.tier} - ${formData.companyName || formData.name}`,
          from_name: 'Raj Work Lab Client Orders',
          order_id: newOrder.id,
          name: formData.name,
          company: formData.companyName,
          business_type: formData.businessType,
          domain_preference: formData.domainPreference,
          phone: formData.phone,
          email: formData.email,
          existing_site_social: formData.existingUrlOrSocial,
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
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0284c7', '#10b981', '#4f46e5', '#ffffff'],
          });
        } catch (err) {
          // ignore
        }
      } else {
        // Even if Web3Forms fails, order was saved to admin portal
        setIsSubmitted(true);
      }
    } catch (err) {
      // Still show confirmed since order is stored in admin panel
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-5 sm:p-7 shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Start Your High-Speed Website Project
              </h3>
              <p className="text-xs text-slate-500">
                Small business launches, website upgrades &amp; custom domain setup in 48h
              </p>
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
          <div className="mb-3.5 p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium shrink-0">
            {error}
          </div>
        )}

        {isSubmitted ? (
          <div className="text-center py-6 sm:py-8 space-y-3 my-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">check</span>
            </div>
            <h4 className="font-display font-bold text-lg text-slate-900">Order Confirmed!</h4>
            <div className="inline-block font-mono text-xs font-bold px-3 py-1 bg-slate-100 text-slate-800 rounded-md border border-slate-200">
              Ref ID: {createdOrderId}
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              We received your business inquiry. Our engineering team has logged this into our active build queue and will connect via WhatsApp in under 30 minutes.
            </p>
            <div className="pt-3 flex justify-center gap-2.5">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Done &amp; Return
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-3.5 overflow-y-auto pr-1" onSubmit={handleSubmitDirect}>
            {/* Contact Name & Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma / Liam"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:border-brand-600 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business / Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Apex Clinic, Nomad Studios"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:border-brand-600 outline-none text-slate-900"
                />
              </div>
            </div>

            {/* Business Objective & Domain Preference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business Objective / Need
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-xs focus:border-brand-600 outline-none text-slate-900 bg-white"
                >
                  <option value="Small Business Website (Clinic, Retail, Services)">
                    🏥 Small Business (Clinic, Restaurant, Services)
                  </option>
                  <option value="Upgrade & Redesign Existing Website">
                    ⚡ Upgrade &amp; Redesign Existing Website (Wix/WP)
                  </option>
                  <option value="Static Website with Custom Domain Purchase">
                    🌐 Static Website with Domain Purchase (.com/.ae)
                  </option>
                  <option value="Creator / Solo Founder Fast Launch">
                    🚀 Creator / Solo Founder Fast Launch
                  </option>
                  <option value="Bespoke Web App / Client Portal">
                    💻 Bespoke Web App &amp; Client Portal
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Domain Setup Preference
                </label>
                <select
                  name="domainPreference"
                  value={formData.domainPreference}
                  onChange={handleChange}
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-xs focus:border-brand-600 outline-none text-slate-900 bg-white"
                >
                  <option value="Need New Domain Purchased (.com / .ae / .in)">
                    ✅ Need New Domain Purchased (.com / .ae / .in)
                  </option>
                  <option value="Already Own Domain (Need DNS Setup)">
                    🔗 Already Own Domain (Setup with 0 downtime)
                  </option>
                  <option value="Need Consultation on Domain Selection">
                    💬 Need Advice on Best Domain Name
                  </option>
                </select>
              </div>
            </div>

            {/* Package Tier Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Package Tier
              </label>
              <select
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-xs focus:border-brand-600 outline-none text-slate-900 bg-white font-medium"
              >
                {offers && offers.length > 0 ? (
                  offers.map((pkg) => (
                    <option key={pkg.id} value={pkg.title}>
                      {pkg.title} ({pkg.prices?.AED || ''} / {pkg.prices?.INR || ''}) - {pkg.delivery}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="1-Page Fast Launch">1-Page Fast Launch (AED 349 / ₹4,999)</option>
                    <option value="Small Business Growth Website">
                      Small Business Growth Website (AED 899 / ₹12,999) - Most Popular
                    </option>
                    <option value="Website Upgrade & Redesign">
                      Website Upgrade &amp; Redesign (AED 1,499 / ₹19,999)
                    </option>
                    <option value="Bespoke Web App & Portal">
                      Bespoke Web App &amp; Portal (AED 2,799 / ₹34,999)
                    </option>
                  </>
                )}
              </select>
            </div>

            {/* Region & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Location / Market
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-xs focus:border-brand-600 outline-none text-slate-900 bg-white"
                >
                  <option value="UAE (+971)">🇦🇪 UAE (+971)</option>
                  <option value="India (+91)">🇮🇳 India (+91)</option>
                  <option value="UK / Europe">🇬🇧 UK / Europe</option>
                  <option value="Global / USA">🇺🇸 USA / Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 58 238 9502 or 98450 11223"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:border-brand-600 outline-none text-slate-900"
                />
              </div>
            </div>

            {/* Email & Existing Website / Instagram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@business.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:border-brand-600 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Website or Social Link
                </label>
                <input
                  type="text"
                  name="existingUrlOrSocial"
                  value={formData.existingUrlOrSocial}
                  onChange={handleChange}
                  placeholder="oldwebsite.com or @handle"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:border-brand-600 outline-none text-slate-900"
                />
              </div>
            </div>

            {/* Notes / Requirements */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Scope / Desired Features
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tell us what you want to achieve (e.g. replace slow WordPress site, appointment booking for clinic, domain choice, branding colors)..."
                rows="2"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:border-brand-600 outline-none text-slate-900 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="flex-1 py-2.5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px]">chat</span>
                <span>Send via WhatsApp</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2.5 sm:py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-75"
              >
                <span>{isSubmitting ? 'Registering...' : 'Submit to Build Queue'}</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
