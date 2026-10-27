import React, { useState, useEffect } from 'react';
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
import AdminAuthModal from './components/AdminAuthModal';
import { dataService } from './services/dataService';

export default function App() {
  // Reactive Data State
  const [offers, setOffers] = useState(dataService.getOffers());
  const [promo, setPromo] = useState(dataService.getPromo());
  const [orders, setOrders] = useState(dataService.getOrders());

  // Modal Visibility State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Small Business Growth Website');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isInspectModalOpen, setIsInspectModalOpen] = useState(false);
  const [inspectedProject, setInspectedProject] = useState(null);

  // Admin Portal & Security Gate State
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync state whenever window regains focus or mounts
  useEffect(() => {
    setOffers(dataService.getOffers());
    setPromo(dataService.getPromo());
    setOrders(dataService.getOrders());
  }, []);

  const handleOpenOrderModal = (plan = 'Small Business Growth Website') => {
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

  // Secure Admin Access Check
  const handleOpenAdminTrigger = () => {
    const isAuthed = sessionStorage.getItem('raj_admin_auth') === 'true';
    if (isAuthed) {
      setIsAdminModalOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminAuthOpen(false);
    setIsAdminModalOpen(true);
    dataService.logAudit('AUTH', 'Master Admin unlocked control session', 'Admin');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('raj_admin_auth');
    setIsAdminModalOpen(false);
    dataService.logAudit('AUTH', 'Admin locked control center', 'Admin');
  };

  const handleOrderCreated = (newOrder) => {
    setOrders(dataService.getOrders());
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col relative selection:bg-brand-100 selection:text-brand-700">
      {/* 1. Header with integrated announcement bar & clean responsive hotlines */}
      <Header
        promo={promo}
        onOpenOrderModal={handleOpenOrderModal}
        onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        onOpenAdminModal={handleOpenAdminTrigger}
      />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 2. Hero Section tailored for Small Businesses, Website Upgrades & Fast Launches */}
        <Hero
          onOpenOrderModal={handleOpenOrderModal}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />

        {/* 3. Dynamic Build Packages & Fixed Pricing (AED / USD / INR) */}
        <Pricing
          offers={offers}
          onSelectPlan={handleOpenOrderModal}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />

        {/* 4. Tested Live Architectures Showcase */}
        <Portfolio
          onInspectProject={handleInspectProject}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />

        {/* 5. 100% Satisfaction & 48h Turnaround Guarantee Banner */}
        <GuaranteeCTA
          onOpenOrderModal={handleOpenOrderModal}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />
      </main>

      {/* 6. Clean Ultra-Minimal Footer */}
      <Footer onOpenAdminModal={handleOpenAdminTrigger} />

      {/* 7. Floating WhatsApp Fast-Connect Widget */}
      <FloatingWhatsApp onOpenModal={() => setIsWhatsAppModalOpen(true)} />

      {/* Customer Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        initialTier={selectedPlan}
        offers={offers}
        onOrderCreated={handleOrderCreated}
      />

      {/* Direct WhatsApp Consultation Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      {/* Project Architecture Inspector */}
      <InspectModal
        isOpen={isInspectModalOpen}
        onClose={() => setIsInspectModalOpen(false)}
        project={inspectedProject}
        onOrderSimilar={handleOpenOrderModal}
      />

      {/* Security Gate for Admin Access (Passcode / PIN) */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={handleAdminAuthSuccess}
      />

      {/* Master Admin Control Center */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        offers={offers}
        onUpdateOffers={(updated) => setOffers(updated)}
        orders={orders}
        onUpdateOrders={(updated) => setOrders(updated)}
        promo={promo}
        onUpdatePromo={(updated) => setPromo(updated)}
        onLogout={handleAdminLogout}
      />
    </div>
  );
}
