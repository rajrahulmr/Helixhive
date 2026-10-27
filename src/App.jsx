import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import GuaranteeCTA from './components/GuaranteeCTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import OrderModal from './components/OrderModal';
import WhatsAppModal from './components/WhatsAppModal';
import InspectModal from './components/InspectModal';
import AdminModal from './components/AdminModal';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Creator Business Website');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isInspectModalOpen, setIsInspectModalOpen] = useState(false);
  const [inspectedProject, setInspectedProject] = useState(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [leads, setLeads] = useState([]);

  const handleOpenOrderModal = (plan = 'Creator Business Website') => {
    setSelectedPlan(plan);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const handleInspectProject = (project) => {
    setInspectedProject(project);
    setIsInspectModalOpen(true);
  };

  const handleLeadCreated = (newLead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col relative selection:bg-brand-100 selection:text-brand-700">
      {/* 1. Header with Announcement Bar & Direct Hotlines */}
      <Header
        onOpenOrderModal={handleOpenOrderModal}
        onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 2. Hero Banner */}
        <Hero
          onOpenOrderModal={handleOpenOrderModal}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />

        {/* 3. Pricing & Build Packages (AED / USD / INR) */}
        <Pricing
          onSelectPlan={handleOpenOrderModal}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />

        {/* 4. Tested Live Architectures Portfolio */}
        <Portfolio
          onInspectProject={handleInspectProject}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />

        {/* 5. 100% Satisfaction Guarantee Conversion Banner */}
        <GuaranteeCTA
          onOpenOrderModal={handleOpenOrderModal}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />
      </main>

      {/* 6. Clean Ultra-Minimal Footer */}
      <Footer onOpenAdminModal={() => setIsAdminModalOpen(true)} />

      {/* 7. Floating WhatsApp Fast-Connect Widget */}
      <FloatingWhatsApp onOpenModal={() => setIsWhatsAppModalOpen(true)} />

      {/* Modals */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        initialTier={selectedPlan}
        onLeadCreated={handleLeadCreated}
      />

      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      <InspectModal
        isOpen={isInspectModalOpen}
        onClose={() => setIsInspectModalOpen(false)}
        project={inspectedProject}
        onOrderSimilar={handleOpenOrderModal}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        leads={leads}
      />
    </div>
  );
}
