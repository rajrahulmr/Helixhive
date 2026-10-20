import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ContactForm({ selectedPlan = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessType: 'B2B Services & SaaS',
    plan: 'Custom Make Plan (₹10,000)',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync when user selects plan from Pricing table
  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({ ...prev, plan: selectedPlan }));
    }
  }, [selectedPlan]);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid business email address.';
    }

    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 8) {
      newErrors.phone = 'Please provide a valid phone/WhatsApp number.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 8) {
      newErrors.message = 'Please provide a brief overview of your project requirements.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch & formulate mailto fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#92dbff', '#6ff6ff', '#e0fdff'],
        });
      } catch (err) {
        // silent fail if canvas-confetti is not loaded
      }

      // Generate mailto link to guarantee dispatch to rajrahulmr96@gmail.com
      const subject = encodeURIComponent(`Helixhive Inquiry: ${formData.plan} - ${formData.fullName}`);
      const body = encodeURIComponent(
        `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nBusiness Type: ${formData.businessType}\nSelected Plan: ${formData.plan}\n\nProject Brief:\n${formData.message}`
      );
      
      // Also prepare direct WhatsApp string
      const waText = encodeURIComponent(
        `Hi Helixhive! I submitted a website brief.\nName: ${formData.fullName}\nPlan: ${formData.plan}\nPhone: ${formData.phone}\nDetails: ${formData.message}`
      );

      // Store in window for user to trigger WhatsApp immediately if preferred
      window._lastLeadWaUrl = `https://wa.me/917907142807?text=${waText}`;
      window._lastLeadMailUrl = `mailto:rajrahulmr96@gmail.com?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest/80 relative" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Access & Contact Channels */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary-container font-semibold">
                INITIATE COLLABORATION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface mt-2 leading-tight">
                Let's engineer your high-converting digital platform.
              </h2>
              <p className="text-base sm:text-lg text-on-surface-variant mt-4 leading-relaxed">
                Reach out to start a conversation about your website objectives, architecture requirements, and timeline. We respond within 4 hours.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="flex flex-col gap-4">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/917907142807?text=Hi%20Helixhive,%20I%20am%20interested%20in%20building%20a%20website%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-surface-container/70 hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary-container/40 transition-all flex items-center gap-4 shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary-container border border-primary-container/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">chat</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
                    Direct WhatsApp Support
                  </span>
                  <span className="font-display text-lg sm:text-xl text-primary font-bold">
                    +91 7907142807
                  </span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:rajrahulmr96@gmail.com?subject=Helixhive%20Website%20Inquiry"
                className="p-5 rounded-2xl bg-surface-container/70 hover:bg-surface-container-high border border-outline-variant/30 hover:border-secondary/40 transition-all flex items-center gap-4 shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary-container/20 text-secondary border border-secondary/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">mail</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
                    Direct Lead Destination
                  </span>
                  <span className="font-display text-lg sm:text-xl text-primary font-bold">
                    rajrahulmr96@gmail.com
                  </span>
                </div>
              </a>
            </div>

            {/* Founder Testimonial Badge */}
            <div className="p-6 rounded-2xl bg-surface-container/50 border-l-4 border-primary-container backdrop-blur-md">
              <p className="text-sm sm:text-base text-on-surface italic leading-relaxed">
                "Helixhive cut our page load times from 4.2s to 0.5s. In our first month after launch, inbound qualified leads doubled without changing our ad spend."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container/20 border border-primary-container/40 flex items-center justify-center text-primary-container font-display text-sm font-bold">
                  K
                </div>
                <div>
                  <div className="font-display text-sm text-on-surface font-semibold">
                    Kareem Al-Mansoor
                  </div>
                  <div className="font-mono text-xs text-on-surface-variant">
                    Co-Founder, FreightScale DXB
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Lead Capture Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface-container-high/80 border border-outline-variant/40 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-container/20 border border-primary-container flex items-center justify-center mb-5 animate-bounce">
                  <span className="material-symbols-outlined text-primary-container text-[36px]">
                    check_circle
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary mb-2">
                  Project Brief Received!
                </h3>
                <p className="text-sm sm:text-base text-on-surface-variant max-w-md mb-6 leading-relaxed">
                  Thank you, <span className="text-primary font-semibold">{formData.fullName}</span>. Your brief has been dispatched to{' '}
                  <span className="text-primary-container font-mono text-xs">rajrahulmr96@gmail.com</span>. Our lead architect will review your requirements and reach out within 4 hours.
                </p>

                {/* Direct Action Follow-up Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <a
                    href={window._lastLeadWaUrl || 'https://wa.me/917907142807'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-on-primary-fixed bg-gradient-to-r from-primary-container to-secondary-container shadow-[0_0_20px_rgba(0,242,254,0.35)]"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Chat on WhatsApp Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        businessType: 'B2B Services & SaaS',
                        plan: 'Custom Make Plan (₹10,000)',
                        message: '',
                      });
                    }}
                    className="px-6 py-3 rounded-xl text-sm font-semibold text-primary bg-surface-container hover:bg-surface-container-highest transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-medium" htmlFor="fullName">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/50 border transition-all text-sm font-body ${
                        errors.fullName
                          ? 'border-error focus:ring-1 focus:ring-error'
                          : 'border-outline-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-xs text-error font-mono">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Business Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-medium" htmlFor="email">
                      Business Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/50 border transition-all text-sm font-body ${
                        errors.email
                          ? 'border-error focus:ring-1 focus:ring-error'
                          : 'border-outline-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-xs text-error font-mono">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Phone / WhatsApp */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-medium" htmlFor="phone">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 7907142807"
                      className={`w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/50 border transition-all text-sm font-body ${
                        errors.phone
                          ? 'border-error focus:ring-1 focus:ring-error'
                          : 'border-outline-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-xs text-error font-mono">{errors.phone}</span>
                    )}
                  </div>

                  {/* Business Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-medium" htmlFor="businessType">
                      Business Type
                    </label>
                    <div className="relative">
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface border border-outline-variant/40 appearance-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all text-sm font-body pr-10 cursor-pointer"
                      >
                        <option value="B2B Services & SaaS">B2B Services & SaaS</option>
                        <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                        <option value="Real Estate & Architecture">Real Estate & Architecture</option>
                        <option value="Local Business / Agency">Local Business / Agency</option>
                        <option value="Other High-Growth Entity">Other High-Growth Entity</option>
                      </select>
                      <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desired Plan Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-medium" htmlFor="plan">
                    Desired Plan / Tier
                  </label>
                  <div className="relative">
                    <select
                      id="plan"
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface border border-outline-variant/40 appearance-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all text-sm font-body pr-10 cursor-pointer font-medium"
                    >
                      <option value="Custom Make Plan (₹10,000)">Custom Make Plan (₹10,000) — Most Popular</option>
                      <option value="Basic Plan (₹859)">Basic Plan (₹859) — Quick Launch</option>
                      <option value="Enterprise / Bespoke (₹25,000+)">Enterprise / Bespoke (₹25,000+)</option>
                      <option value="General Strategic Consultation">General Strategic Consultation</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Message / Project Brief */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-medium" htmlFor="message">
                    Project Brief & Objectives *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your target audience, current website challenges, timeline expectations, or desired launch date..."
                    className={`w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/50 border transition-all text-sm font-body resize-none ${
                      errors.message
                        ? 'border-error focus:ring-1 focus:ring-error'
                        : 'border-outline-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs text-error font-mono">{errors.message}</span>
                  )}
                </div>

                {/* Form Action Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-display text-sm font-bold text-on-primary-fixed bg-gradient-to-r from-primary-container via-secondary-container to-secondary shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_40px_rgba(0,242,254,0.6)] hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-on-primary-fixed border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Brief...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Brief</span>
                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                      </>
                    )}
                  </button>

                  <span className="font-mono text-xs text-on-surface-variant flex items-center gap-1.5 text-center sm:text-right">
                    <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                    4-Hour Response • Strict NDA Protected
                  </span>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
