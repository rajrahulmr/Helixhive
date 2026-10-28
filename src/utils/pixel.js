// Meta Pixel Tracking Utility

export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
};

export const trackCustomEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params);
  }
};

export const trackLead = (details = {}) => {
  trackEvent('Lead', {
    content_name: details.tier || details.plan || 'Website Project Inquiry',
    content_category: details.businessType || 'Web Development',
    value: details.value || undefined,
    currency: details.currency || 'AED',
    status: 'submitted',
    ...details,
  });
};
