import React, { useState, useEffect, useRef } from 'react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Plan, 2: Business Type, 3: Features, 4: Timeline, 5: Contact Info, 6: Summary
  const [formData, setFormData] = useState({
    plan: 'The ₹2999 Plan (Multi-Page React)',
    businessName: '',
    businessType: 'B2B Services & SaaS',
    features: ['Mobile Responsive', 'Lead Capture & WhatsApp', 'SEO & Speed'],
    timeline: 'Within 1-2 Weeks',
    clientName: '',
    clientPhone: '',
  });

  const [hasInteracted, setHasInteracted] = useState(false);
  const chatBottomRef = useRef(null);

  // Listen for custom trigger to open chatbot from anywhere (e.g. pricing cards, header)
  useEffect(() => {
    const handleOpenBot = (e) => {
      setIsOpen(true);
      if (e.detail && e.detail.plan) {
        setFormData((prev) => ({ ...prev, plan: e.detail.plan }));
        setStep(2); // Jump straight to business details
      }
    };

    window.addEventListener('open-whatsapp-bot', handleOpenBot);
    return () => window.removeEventListener('open-whatsapp-bot', handleOpenBot);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step, isOpen]);

  const toggleFeature = (feature) => {
    setFormData((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  const handleSelectPlan = (planName) => {
    setFormData((prev) => ({ ...prev, plan: planName }));
    setStep(2);
  };

  const handleSelectBusinessType = (type) => {
    setFormData((prev) => ({ ...prev, businessType: type }));
    setStep(3);
  };

  const handleSelectTimeline = (time) => {
    setFormData((prev) => ({ ...prev, timeline: time }));
    setStep(5);
  };

  // Compile final structured message
  const generateWhatsAppMessage = () => {
    return encodeURIComponent(
      `*New Website Project Inquiry — Helixhive*\n\n` +
      `👤 *Name:* ${formData.clientName || 'Not specified'}\n` +
      `📞 *Phone:* ${formData.clientPhone || 'Not specified'}\n` +
      `📦 *Selected Plan:* ${formData.plan}\n` +
      `🏢 *Business/Industry:* ${formData.businessName ? `${formData.businessName} (${formData.businessType})` : formData.businessType}\n` +
      `✨ *Key Features:* ${formData.features.length > 0 ? formData.features.join(', ') : 'Standard core build'}\n` +
      `⏱️ *Target Timeline:* ${formData.timeline}\n\n` +
      `*Message:* Hi Helixhive! I would like to discuss and kick off this project with your team.`
    );
  };

  const handleSendToWhatsApp = () => {
    const url = `https://wa.me/917907142807?text=${generateWhatsAppMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirectWhatsApp = () => {
    const defaultMsg = encodeURIComponent(
      `Hi Helixhive! I am interested in building a website for my business. Can we discuss?`
    );
    window.open(`https://wa.me/917907142807?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
  };

  const restartChat = () => {
    setStep(1);
    setFormData({
      plan: 'The ₹2999 Plan (Multi-Page React)',
      businessName: '',
      businessType: 'B2B Services & SaaS',
      features: ['Mobile Responsive', 'Lead Capture & WhatsApp', 'SEO & Speed'],
      timeline: 'Within 1-2 Weeks',
      clientName: '',
      clientPhone: '',
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 select-none">
      {/* Floating Action Trigger Button */}
      {!isOpen && (
        <div className="flex items-center gap-3">
          {/* Tooltip / Popover Badge */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high/95 border border-outline-variant/40 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-primary font-medium">
              Start Project on WhatsApp <span className="text-on-surface-variant font-normal">(Instant)</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setHasInteracted(true);
            }}
            className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_35px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
            aria-label="Open WhatsApp Project Assistant"
          >
            {/* Pulsing Outer Wave Ring */}
            <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-container text-on-primary-fixed text-[11px] font-bold flex items-center justify-center shadow-md">
              1
            </span>

            {/* WhatsApp Icon */}
            <svg
              className="w-8 h-8 fill-current drop-shadow-sm"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </button>
        </div>
      )}

      {/* WhatsApp Interactive Chatbot Window */}
      {isOpen && (
        <div className="fixed inset-x-2 bottom-2 sm:inset-auto sm:bottom-6 sm:right-6 w-auto sm:w-[400px] h-[85vh] sm:h-[580px] max-h-[620px] rounded-2xl bg-[#0b141b] border border-outline-variant/50 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* WhatsApp Header */}
          <div className="bg-[#1f2c34] px-4 py-3 border-b border-[#2a3942] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#00a884] to-[#25D366] p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#111b21] flex items-center justify-center">
                  <span className="font-display font-bold text-xs text-[#25D366]">H</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#1f2c34]" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-sm font-semibold text-white">
                    Helixhive Assistant
                  </span>
                  <span className="material-symbols-outlined text-[#25D366] text-[16px]">
                    verified
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#8696a0]">
                  Online • Replies in WhatsApp
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={restartChat}
                className="p-1.5 rounded-lg text-[#8696a0] hover:text-white hover:bg-[#2a3942] transition-colors"
                title="Restart Chat"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#8696a0] hover:text-white hover:bg-[#2a3942] transition-colors"
                title="Close Window"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0b141b] text-sm">
            {/* Timestamp */}
            <div className="flex justify-center">
              <span className="px-2.5 py-0.5 rounded-md bg-[#182229] text-[10px] font-mono text-[#8696a0] uppercase tracking-wider">
                TODAY • PROJECT ONBOARDING
              </span>
            </div>

            {/* Bot Message 1 */}
            <div className="flex flex-col items-start max-w-[90%]">
              <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#202c33] text-[#e9edef] leading-relaxed shadow-sm">
                👋 Hello! Welcome to **Helixhive**. I can help configure your website requirements and send a complete project brief directly to our team on WhatsApp.
              </div>
              <span className="text-[10px] text-[#8696a0] mt-1 pl-1">Just now</span>
            </div>

            {/* STEP 1: Package Selection */}
            <div className="flex flex-col items-start max-w-[95%]">
              <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#202c33] text-[#e9edef] leading-relaxed w-full">
                <p className="font-semibold text-primary mb-2.5">
                  1️⃣ Which website package fits your budget and scope?
                </p>
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => handleSelectPlan('The ₹1499 Plan (Static One Page)')}
                    className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      formData.plan.includes('1499')
                        ? 'bg-[#005c4b] border-[#00a884] text-white font-bold'
                        : 'bg-[#111b21] border-[#2a3942] text-[#d1d7db] hover:border-[#00a884]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">⚡ The ₹1499 Plan</span>
                      <span className="text-[10px] font-mono text-primary-container">Ready in 2 Days</span>
                    </div>
                    <span className="text-[11px] text-[#8696a0] block mt-0.5">Static 1-page site • 10 items • WhatsApp CTA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectPlan('The ₹2999 Plan (Multi-Page React)')}
                    className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      formData.plan.includes('2999')
                        ? 'bg-[#005c4b] border-[#00a884] text-white font-bold'
                        : 'bg-[#111b21] border-[#2a3942] text-[#d1d7db] hover:border-[#00a884]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">🚀 The ₹2999 Plan (Popular)</span>
                      <span className="text-[10px] font-mono text-emerald-400">Zero WordPress</span>
                    </div>
                    <span className="text-[11px] text-[#8696a0] block mt-0.5">Up to 5 React pages • 20 items • Gallery • Fast</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectPlan('The ₹6999 Plan (Growth Web App)')}
                    className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      formData.plan.includes('6999')
                        ? 'bg-[#005c4b] border-[#00a884] text-white font-bold'
                        : 'bg-[#111b21] border-[#2a3942] text-[#d1d7db] hover:border-[#00a884]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">💎 The ₹6999 Plan</span>
                      <span className="text-[10px] font-mono text-secondary">Dynamic App</span>
                    </div>
                    <span className="text-[11px] text-[#8696a0] block mt-0.5">Up to 10 pages • Filterable catalog • Lead CRM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectPlan('The Enterprise Platform (₹19,999+ / Bespoke)')}
                    className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      formData.plan.includes('19,999') || formData.plan.includes('Enterprise')
                        ? 'bg-[#005c4b] border-[#00a884] text-white font-bold'
                        : 'bg-[#111b21] border-[#2a3942] text-[#d1d7db] hover:border-[#00a884]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">🏢 Enterprise / Bespoke</span>
                      <span className="text-[10px] font-mono text-primary-fixed">Custom Quote</span>
                    </div>
                    <span className="text-[11px] text-[#8696a0] block mt-0.5">Full-Stack React + Node backend, APIs & portals</span>
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 2: Business Category */}
            {step >= 2 && (
              <div className="flex flex-col items-start max-w-[95%] animate-in fade-in duration-300">
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#202c33] text-[#e9edef] w-full">
                  <p className="font-semibold text-primary mb-2">
                    2️⃣ What is your business name or industry?
                  </p>
                  
                  {/* Quick Category Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {[
                      'B2B Services',
                      'E-Commerce & Store',
                      'Real Estate',
                      'Tech & SaaS',
                      'Local Business',
                      'Agency / Freelancer',
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleSelectBusinessType(type)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                          formData.businessType === type
                            ? 'bg-[#00a884] text-white font-semibold'
                            : 'bg-[#111b21] text-[#aebac1] hover:bg-[#2a3942]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Optional Custom Business Name Input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Company Name (e.g. Apex Studio)"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg bg-[#111b21] text-xs text-white placeholder-[#8696a0] border border-[#2a3942] focus:outline-none focus:border-[#00a884]"
                    />
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-3.5 py-2 rounded-lg bg-[#00a884] text-white text-xs font-semibold hover:bg-[#029071] transition-colors"
                    >
                      Next ➔
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Key Features Needed */}
            {step >= 3 && (
              <div className="flex flex-col items-start max-w-[95%] animate-in fade-in duration-300">
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#202c33] text-[#e9edef] w-full">
                  <p className="font-semibold text-primary mb-2">
                    3️⃣ Select key features you need:
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 mb-3 text-xs">
                    {[
                      'Mobile Responsive',
                      'Lead Capture & WhatsApp',
                      'Product/Image Gallery',
                      'SEO & Speed',
                      'Domain & Hosting Setup',
                      'Payment Gateway',
                      'Google Maps & Socials',
                      'Custom Animations',
                    ].map((feature) => {
                      const isChecked = formData.features.includes(feature);
                      return (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => toggleFeature(feature)}
                          className={`p-2 rounded-lg border text-left flex items-center gap-1.5 transition-all ${
                            isChecked
                              ? 'bg-[#005c4b] border-[#00a884] text-white'
                              : 'bg-[#111b21] border-[#2a3942] text-[#8696a0] hover:text-white'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {isChecked ? 'check_box' : 'check_box_outline_blank'}
                          </span>
                          <span className="truncate">{feature}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="w-full py-2 rounded-lg bg-[#00a884] text-white text-xs font-semibold hover:bg-[#029071] transition-colors text-center"
                  >
                    Confirm Features & Continue ➔
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Timeline */}
            {step >= 4 && (
              <div className="flex flex-col items-start max-w-[95%] animate-in fade-in duration-300">
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#202c33] text-[#e9edef] w-full">
                  <p className="font-semibold text-primary mb-2">
                    4️⃣ Target launch timeline?
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {[
                      '⚡ Urgent (Ready in 2-3 Days)',
                      '📅 Within 1-2 Weeks',
                      '🚀 Flexible / Planning Phase',
                    ].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleSelectTimeline(time)}
                        className={`p-2 rounded-lg border text-left text-xs transition-all ${
                          formData.timeline === time
                            ? 'bg-[#005c4b] border-[#00a884] text-white font-semibold'
                            : 'bg-[#111b21] border-[#2a3942] text-[#d1d7db] hover:border-[#00a884]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Contact Info */}
            {step >= 5 && (
              <div className="flex flex-col items-start max-w-[95%] animate-in fade-in duration-300">
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#202c33] text-[#e9edef] w-full">
                  <p className="font-semibold text-primary mb-2">
                    5️⃣ Who should we contact on WhatsApp?
                  </p>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#111b21] text-xs text-white placeholder-[#8696a0] border border-[#2a3942] focus:outline-none focus:border-[#00a884]"
                    />
                    <input
                      type="tel"
                      placeholder="Your WhatsApp Number (e.g. +91 98765 43210)"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#111b21] text-xs text-white placeholder-[#8696a0] border border-[#2a3942] focus:outline-none focus:border-[#00a884]"
                    />
                    <button
                      type="button"
                      onClick={() => setStep(6)}
                      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#00a884] to-[#25D366] text-[#0b141b] text-xs font-bold hover:opacity-95 transition-all text-center mt-1"
                    >
                      Generate Project Brief 📋
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Summary & Transmit via WhatsApp */}
            {step >= 6 && (
              <div className="flex flex-col items-start max-w-full animate-in fade-in duration-300">
                <div className="p-4 rounded-2xl rounded-tl-sm bg-[#182229] border border-[#00a884]/40 text-[#e9edef] w-full">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#25D366] uppercase tracking-wider mb-2">
                    <span className="material-symbols-outlined text-[16px]">task_alt</span>
                    Project Scope Ready
                  </div>

                  <div className="p-3 rounded-xl bg-[#111b21] font-mono text-[11px] space-y-1.5 text-[#d1d7db] mb-4 border border-[#2a3942]">
                    <div><span className="text-[#8696a0]">Client:</span> {formData.clientName || 'Website Owner'}</div>
                    {formData.clientPhone && <div><span className="text-[#8696a0]">Contact:</span> {formData.clientPhone}</div>}
                    <div><span className="text-[#8696a0]">Package:</span> {formData.plan}</div>
                    <div><span className="text-[#8696a0]">Business:</span> {formData.businessName ? `${formData.businessName} (${formData.businessType})` : formData.businessType}</div>
                    <div><span className="text-[#8696a0]">Features:</span> {formData.features.join(', ')}</div>
                    <div><span className="text-[#8696a0]">Timeline:</span> {formData.timeline}</div>
                  </div>

                  {/* Main WhatsApp Transmit Button */}
                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="w-full py-3.5 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Send Complete Brief to WhatsApp 🚀</span>
                  </button>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick Fallback Bottom Bar */}
          <div className="bg-[#1f2c34] px-4 py-2.5 border-t border-[#2a3942] flex items-center justify-between text-[11px] font-mono text-[#8696a0]">
            <span>Need immediate answer?</span>
            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Direct WhatsApp Chat</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
