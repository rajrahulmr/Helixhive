import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import ContactForm from './components/ContactForm';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('Custom Make Plan (₹10,000)');

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col relative selection:bg-primary-container selection:text-on-primary-fixed">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Banner with Telemetry Dashboard */}
        <Hero />

        {/* 2. Services / Value Proposition */}
        <Services />

        {/* 3. Pricing & Packages */}
        <Pricing onSelectPlan={handleSelectPlan} />

        {/* 4. Portfolio Showcase Grid */}
        <Portfolio />

        {/* 5. Lead Capture & Direct Communication */}
        <ContactForm selectedPlan={selectedPlan} />
      </main>

      {/* 6. Floating Action WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
