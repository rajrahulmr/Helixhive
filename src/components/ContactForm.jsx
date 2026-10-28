import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { trackLead } from '../utils/pixel';

export default function ContactForm({ selectedPlan = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    plan: 'The ₹2999 Plan (₹2999)',
    message: '',
  });

  const [activeFaq, setActiveFaq] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const planOptions = [
    { id: 'static-1499', label: '₹1,499 Starter', full: 'The ₹1499 Plan (₹1499)', tag: '1 Page' },
    { id: 'react-2999', label: '₹2,999 React', full: 'The ₹2999 Plan (₹2999)', tag: 'Most Popular' },
    { id: 'growth-6999', label: '₹6,999 Web App', full: 'The ₹6999 Plan (₹6999)', tag: 'Dynamic' },
    { id: 'enterprise-custom', label: '₹19,999+ Bespoke', full: 'Enterprise Platform (₹19,999+)', tag: 'Full-Stack' },
  ];

  const faqs = [
    {
      question: 'How fast will my website be ready & launched?',
      answer:
        'The ₹1,499 single-page site is typically delivered in 24–48 hours. The ₹2,999 multi-page React website is ready in 3–5 days. Custom web apps take 5–7 days. We share live preview links throughout the build.',
    },
    {
      question: 'Do you use WordPress, Wix, or templates?',
      answer:
        'No, never. We hand-code 100% custom React + Tailwind CSS. This ensures your website loads under 0.5s, achieves 99+ mobile speed scores, has zero security vulnerabilities, and no annoying plugin maintenance.',
    },
    {
      question: 'Can I add more pages or modify content later?',
      answer:
        'Yes! Everything is built with clean, modular React components. You can add extra pages anytime starting from just ₹400/page, or have us update images and text whenever you need.',
    },
    {
      question: 'What about domain name, SSL, and hosting?',
      answer:
        'Free ultra-fast edge hosting and a free live subdomain are included. If you have your own domain (.com, .in, etc.), we configure DNS, connect it, and install free automated SSL certificates at zero extra hassle.',
    },
  ];

  // Sync when user selects plan from Pricing table
  useEffect(() => {
    if (selectedPlan) {
      // Check if selectedPlan matches any option, otherwise set directly
      const matched = planOptions.find(
        (p) => p.full === selectedPlan || selectedPlan.includes(p.label)
      );
      if (matched) {
        setFormData((prev) => ({ ...prev, plan: matched.full }));
      } else {
        setFormData((prev) => ({ ...prev, plan: selectedPlan }));
      }
    }
  }, [selectedPlan]);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your name or business name.';
    }

    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 8) {
      newErrors.phone = 'Please provide a valid WhatsApp / phone number.';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address.';
      }
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = 'Please briefly describe what website you need.';
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

  const handleSelectPlanChip = (planFull) => {
    setFormData((prev) => ({ ...prev, plan: planFull }));
  };

  // Compile formatted WhatsApp URL from form data
  const buildWhatsAppUrl = () => {
    const text = `Hi Rahul! I want to start a website project with Helixhive.
👤 *Name / Business:* ${formData.fullName.trim() || 'Not specified'}
📦 *Selected Plan:* ${formData.plan}
📱 *Phone / WhatsApp:* ${formData.phone.trim() || 'Not specified'}
✉️ *Email:* ${formData.email.trim() || 'Not specified'}
📝 *Requirements:*
${formData.message.trim() || 'Looking for a clean, high-speed modern website.'}`;

    return `https://wa.me/917907142807?text=${encodeURIComponent(text)}`;
  };

  // Send via WhatsApp directly
  const handleSendViaWhatsApp = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#25D366', '#00f2fe', '#6ff6ff', '#ffffff'],
      });
    } catch (err) {
      // ignore
    }

    const waUrl = buildWhatsAppUrl();
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const [submissionError, setSubmissionError] = useState('');

  // Submit via Web3Forms Email API
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '62a9df12-21f7-4670-81ce-d98e5f89a799';

    try {
      if (!accessKey) {
        throw new Error('Web3Forms Access Key is missing. Please send via WhatsApp.');
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `⚡ New Helixhive Inquiry: ${formData.plan} - ${formData.fullName}`,
          from_name: 'Helixhive Inquiries',
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email || 'not-provided@client.com',
          plan: formData.plan,
          message: formData.message,
          botcheck: '', // Honeypot field for spam prevention
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setSubmitted(true);
        trackLead({
          plan: formData.plan,
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
        });

        try {
          confetti({
            particleCount: 110,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#00f2fe', '#92dbff', '#25D366', '#ffffff'],
          });
        } catch (err) {
          // ignore
        }

        window._lastLeadWaUrl = buildWhatsAppUrl();
      } else {
        throw new Error(data.message || 'Email delivery failed. Please try again or send via WhatsApp.');
      }
    } catch (err) {
      console.error('Web3Forms Error:', err);
      setIsSubmitting(false);
      setSubmissionError(err.message || 'Something went wrong. Please use WhatsApp or email directly.');

      // Fallback mailto link
      const subject = encodeURIComponent(`Website Inquiry: ${formData.plan} - ${formData.fullName}`);
      const body = encodeURIComponent(
        `Name / Business: ${formData.fullName}\nPhone / WhatsApp: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nPlan: ${formData.plan}\n\nProject Requirements:\n${formData.message}`
      );
      window._lastLeadMailUrl = `mailto:rajrahulmr96@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+917907142807');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest relative overflow-hidden" id="contact">
      {/* Background ambient neon auras */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-container/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-mono text-xs uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span>Fast Turnaround • Direct Developer Contact</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">
            Ready to launch your website?{' '}
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-secondary to-primary">
              Let's build it today.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant mt-4 leading-relaxed">
            Skip the agency middlemen. Talk directly with the developer, get straightforward pricing, and launch your high-performance React site in 24–72 hours.
          </p>
        </div>

        {/* Main Grid: Left Hub (Direct Contact & FAQ) + Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Action Cards & FAQs */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* 1. Primary WhatsApp Quick-Connect Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c2229] via-[#091824] to-surface-container border border-primary-container/30 shadow-[0_10px_35px_rgba(0,242,254,0.12)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#25D366]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-mono text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Rahul is Online</span>
                </div>
                <span className="font-mono text-xs text-on-surface-variant">
                  Avg. reply: &lt;15 mins
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                Chat Directly on WhatsApp
              </h3>
              <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">
                Prefer instant messaging? Share your business details or rough idea, and get instant recommendations, timeline, and exact quote.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://wa.me/917907142807?text=Hi%20Rahul!%20I%20am%20interested%20in%20building%20a%20website%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-display text-sm font-bold text-black bg-[#25D366] hover:bg-[#20ba59] shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all transform active:scale-95"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.587 1.838.883 2.791.883 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.769-5.768-5.769zm10.222 5.766c0 5.65-4.593 10.243-10.253 10.243-1.803 0-3.565-.472-5.115-1.365l-6.885 1.805 1.838-6.705c-.983-1.611-1.503-3.468-1.503-5.378 0-5.65 4.594-10.242 10.254-10.242 5.66 0 10.253 4.592 10.253 10.242z" />
                  </svg>
                  <span>Open WhatsApp Chat</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="px-4 py-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 text-on-surface font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  title="Copy Phone Number"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedPhone ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedPhone ? 'Copied!' : '+91 7907142807'}</span>
                </button>
              </div>
            </div>

            {/* 2. Email & Call Quick Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="mailto:rajrahulmr96@gmail.com?subject=Helixhive%20Website%20Inquiry"
                className="p-4 rounded-2xl bg-surface-container/70 hover:bg-surface-container-high border border-outline-variant/30 hover:border-secondary/50 transition-all flex items-center gap-3 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                    Direct Email
                  </span>
                  <span className="font-body text-xs text-primary font-semibold truncate">
                    rajrahulmr96@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="tel:+917907142807"
                className="p-4 rounded-2xl bg-surface-container/70 hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary-container/50 transition-all flex items-center gap-3 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-container/15 text-primary-container flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                    Direct Call
                  </span>
                  <span className="font-body text-xs text-primary font-semibold truncate">
                    +91 7907142807
                  </span>
                </div>
              </a>
            </div>

            {/* 3. Helpful FAQs Accordion (Relevant & Real Client Questions) */}
            <div className="p-6 rounded-3xl bg-surface-container/50 border border-outline-variant/30 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary-container text-[20px]">
                  help_outline
                </span>
                <h4 className="font-display text-base font-bold text-on-surface">
                  Frequently Asked Questions
                </h4>
              </div>

              <div className="flex flex-col divide-y divide-outline-variant/20">
                {faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div key={index} className="py-3.5 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left gap-3 text-sm font-medium text-on-surface hover:text-primary transition-colors"
                      >
                        <span className="font-display text-sm">{faq.question}</span>
                        <span className={`material-symbols-outlined text-[18px] text-primary-container shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      {isOpen && (
                        <p className="mt-2.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed pl-1 animate-fadeIn">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Upgraded Lead Capture & Project Form */}
          <div className="lg:col-span-7 rounded-3xl bg-surface-container-high/60 border border-outline-variant/40 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            {/* Subtle glow edge */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />

            {submitted ? (
              /* Success confirmation state */
              <div className="py-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-container/20 border-2 border-primary-container flex items-center justify-center mb-5 animate-bounce shadow-[0_0_30px_rgba(0,242,254,0.4)]">
                  <span className="material-symbols-outlined text-primary-container text-[36px]">
                    check_circle
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  Project Inquiry Received!
                </h3>
                <p className="text-sm sm:text-base text-on-surface-variant max-w-md mb-6 leading-relaxed">
                  Thank you, <span className="text-primary font-semibold">{formData.fullName}</span>. Your brief has been sent to{' '}
                  <span className="text-primary-container font-mono text-xs">rajrahulmr96@gmail.com</span>. We will review it and reply within 4 hours.
                </p>

                <div className="p-4 rounded-2xl bg-surface-container/70 border border-outline-variant/30 text-xs text-on-surface-variant max-w-md mb-6 text-left">
                  <div className="font-mono text-primary font-semibold mb-1">Inquiry Summary:</div>
                  <div>• Plan: <span className="text-on-surface">{formData.plan}</span></div>
                  <div>• Contact: <span className="text-on-surface">{formData.phone}</span></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <a
                    href={window._lastLeadWaUrl || 'https://wa.me/917907142807'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-black bg-[#25D366] hover:bg-[#20ba59] shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.587 1.838.883 2.791.883 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.769-5.768-5.769zm10.222 5.766c0 5.65-4.593 10.243-10.253 10.243-1.803 0-3.565-.472-5.115-1.365l-6.885 1.805 1.838-6.705c-.983-1.611-1.503-3.468-1.503-5.378 0-5.65 4.594-10.242 10.254-10.242 5.66 0 10.253 4.592 10.253 10.242z" />
                    </svg>
                    <span>Also Send to WhatsApp Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        plan: 'The ₹2999 Plan (₹2999)',
                        message: '',
                      });
                    }}
                    className="px-6 py-3.5 rounded-xl text-sm font-semibold text-primary bg-surface-container hover:bg-surface-container-highest transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Main Form */
              <div className="flex flex-col gap-6">
                
                {/* Form Heading */}
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    Quick Project Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                    Select your desired tier and send details directly via WhatsApp or Email.
                  </p>
                </div>

                {/* Interactive Plan Selector Chips */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-medium">
                    Choose Your Plan / Tier:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {planOptions.map((opt) => {
                      const isSelected = formData.plan === opt.full;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectPlanChip(opt.full)}
                          className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-primary-container/20 border-primary-container text-white shadow-[0_0_15px_rgba(0,242,254,0.3)] ring-1 ring-primary-container'
                              : 'bg-surface-container/70 border-outline-variant/40 text-on-surface hover:border-primary-container/40'
                          }`}
                        >
                          <span className="font-display text-xs font-bold truncate">
                            {opt.label}
                          </span>
                          <span className={`font-mono text-[10px] mt-1 ${isSelected ? 'text-primary-container font-semibold' : 'text-on-surface-variant'}`}>
                            {opt.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-medium" htmlFor="fullName">
                      Your Name / Business *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/40 border transition-all text-sm font-body ${
                        errors.fullName
                          ? 'border-error focus:ring-1 focus:ring-error'
                          : 'border-outline-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-xs text-error font-mono">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-medium" htmlFor="phone">
                      WhatsApp / Phone *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 7907142807"
                      className={`w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/40 border transition-all text-sm font-body ${
                        errors.phone
                          ? 'border-error focus:ring-1 focus:ring-error'
                          : 'border-outline-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-xs text-error font-mono">{errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Email Address (Optional) */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-medium" htmlFor="email">
                      Email Address
                    </label>
                    <span className="font-mono text-[11px] text-on-surface-variant/70">
                      Optional
                    </span>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/40 border transition-all text-sm font-body ${
                      errors.email
                        ? 'border-error focus:ring-1 focus:ring-error'
                        : 'border-outline-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-error font-mono">{errors.email}</span>
                  )}
                </div>

                {/* Requirements / Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-medium" htmlFor="message">
                    What does your website need? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. I need a modern 3-page website for my dental clinic / bakery / consulting business with WhatsApp booking button and gallery..."
                    className={`w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/40 border transition-all text-sm font-body resize-none ${
                      errors.message
                        ? 'border-error focus:ring-1 focus:ring-error'
                        : 'border-outline-variant/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs text-error font-mono">{errors.message}</span>
                  )}
                </div>

                {/* Error Banner if API submission fails */}
                {submissionError && (
                  <div className="p-3.5 rounded-xl bg-error-container/20 border border-error/50 text-error text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                      <span>{submissionError}</span>
                    </div>
                    <a
                      href={window._lastLeadMailUrl || 'mailto:rajrahulmr96@gmail.com'}
                      className="underline font-bold font-mono text-[11px] shrink-0 text-primary hover:text-white"
                    >
                      Open Email App
                    </a>
                  </div>
                )}

                {/* Dual Action Buttons: Send to WhatsApp OR Send Email */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {/* Primary WhatsApp Action */}
                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="flex-1 py-3.5 px-6 rounded-xl font-display text-sm font-bold text-black bg-[#25D366] hover:bg-[#20ba59] shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.55)] transition-all flex items-center justify-center gap-2 transform active:scale-95"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.587 1.838.883 2.791.883 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.769-5.768-5.769zm10.222 5.766c0 5.65-4.593 10.243-10.253 10.243-1.803 0-3.565-.472-5.115-1.365l-6.885 1.805 1.838-6.705c-.983-1.611-1.503-3.468-1.503-5.378 0-5.65 4.594-10.242 10.254-10.242 5.66 0 10.253 4.592 10.253 10.242z" />
                    </svg>
                    <span>Send via WhatsApp ⚡</span>
                  </button>

                  {/* Secondary Email Dispatch */}
                  <button
                    type="button"
                    onClick={handleSubmitEmail}
                    disabled={isSubmitting}
                    className="sm:w-auto px-5 py-3.5 rounded-xl font-display text-xs font-semibold text-primary bg-surface-container hover:bg-surface-container-highest border border-outline-variant/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                        <span>Send via Email</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Trust Badges Strip */}
                <div className="pt-2 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3 text-on-surface-variant font-mono text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary-container text-[14px]">bolt</span>
                    24–72h Turnaround
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary-container text-[14px]">verified</span>
                    100% Handcrafted React
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary-container text-[14px]">lock</span>
                    Zero Hidden Fees
                  </span>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
