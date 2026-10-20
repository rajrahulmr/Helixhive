import React, { useState } from 'react';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'nexus',
      name: 'Nexus Logistics',
      title: 'Tech Startup Landing Page',
      category: 'SaaS & Enterprise',
      categoryColor: 'text-primary-container',
      image: '/assets/project-startup.jpg',
      alt: 'High-tech enterprise logistics platform interface with dark obsidian theme, neon cyan route telemetry',
      description: 'Modern corporate landing page and demo portal for global freight automation and predictive routing.',
      metric1: '+180% Demo Requests',
      metric2: '0.6s Load Time',
      badge: 'B2B Enterprise',
      techStack: ['React', 'Tailwind CSS', 'Vite', 'Edge CDN', 'Framer Motion'],
      challenge: 'The client had a slow 4.2s WordPress website losing enterprise RFP inquiries to competitors.',
      solution: 'Re-architected from scratch with ultra-light React code splitting, interactive route map preview, and instant demo booking.',
      result: 'Lighthouse score jumped from 32 to 100, resulting in an immediate 180% surge in enterprise demo bookings within 30 days.',
    },
    {
      id: 'aura',
      name: 'Aura Coffee Co.',
      title: 'E-commerce Storefront',
      category: 'E-Commerce & Retail',
      categoryColor: 'text-secondary',
      image: '/assets/project-ecommerce.jpg',
      alt: 'Minimalist luxury specialty coffee e-commerce website interface with dark roast palette and rich amber tones',
      description: 'Clean direct-to-consumer storefront optimized for subscriptions, repeat orders, and mobile tap checkout.',
      metric1: '+64% Cart Completion',
      metric2: 'Mobile-First Flow',
      badge: 'DTC Retail',
      techStack: ['React', 'Tailwind CSS', 'Headless Cart', 'Stripe', 'Core Web Vitals'],
      challenge: 'High drop-off rate on mobile checkout due to cumbersome multi-step cart flows.',
      solution: 'Engineered a thumb-friendly one-tap sliding cart with instant Apple Pay and Google Pay integration.',
      result: 'Checkout abandonment dropped by 45%, driving a 64% increase in completed subscription orders.',
    },
    {
      id: 'vertex',
      name: 'Vertex Real Estate',
      title: 'Real Estate Portal',
      category: 'High-Net-Worth Real Estate',
      categoryColor: 'text-primary-fixed',
      image: '/assets/project-realestate.jpg',
      alt: 'High-end modern luxury real estate architectural showcase layout with panoramic penthouse views',
      description: 'Luxury property showcase with virtual walkthroughs, instant floorplan downloads, and VIP concierge leads.',
      metric1: 'AED 42M Pipeline',
      metric2: '99 Lighthouse',
      badge: 'Luxury Real Estate',
      techStack: ['React', 'Tailwind CSS', 'Interactive Floorplans', 'WhatsApp Direct CRM'],
      challenge: 'Ultra-high-net-worth investors were dropping off before requesting private property walkthroughs.',
      solution: 'Implemented immersive full-bleed architectural galleries and direct VIP WhatsApp concierge dispatch.',
      result: 'Generated over AED 42M in qualified buyer pipeline in the first quarter post-launch.',
    },
  ];

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 relative" id="work">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary-container font-semibold">
              PROVEN CASE STUDIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface mt-2 leading-tight">
              Recent client websites engineered for scale and speed
            </h2>
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-sm">
            Real telemetry from real clients. Explore how engineering precision directly compounds revenue and conversion rates.
          </p>
        </div>

        {/* 3 Case Study Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl bg-surface-container/60 hover:bg-surface-container-high/80 border border-outline-variant/30 hover:border-primary-container/40 overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-surface-container-lowest">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-80" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-surface-container-lowest/85 backdrop-blur-md border border-outline-variant/30 font-mono text-xs font-semibold text-primary-container">
                  {project.category}
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-2xl font-bold text-on-surface group-hover:text-primary-container transition-colors">
                      {project.name}
                    </h3>
                    <span className="material-symbols-outlined text-primary-container text-[22px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      arrow_outward
                    </span>
                  </div>
                  <div className="text-xs font-mono text-secondary mb-2">
                    {project.title}
                  </div>
                  <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Telemetry pill footer */}
                <div className="p-3 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20 font-mono text-xs text-primary flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                    {project.metric1}
                  </span>
                  <span className="text-secondary font-semibold">
                    {project.metric2}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl rounded-2xl bg-surface-container-high border border-outline-variant/50 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 text-xs font-mono text-primary-container mb-2">
              <span>{selectedProject.category}</span>
              <span>•</span>
              <span>{selectedProject.badge}</span>
            </div>
            <h3 className="font-display text-3xl font-bold text-primary mb-1">
              {selectedProject.name}
            </h3>
            <p className="text-sm text-on-surface-variant mb-6">
              {selectedProject.title}
            </p>

            {/* Image Preview */}
            <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden mb-6 border border-outline-variant/30">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-surface-container/70 border border-outline-variant/30">
                <div className="font-mono text-xs uppercase text-error font-semibold mb-1">The Challenge</div>
                <p className="text-sm text-on-surface-variant">{selectedProject.challenge}</p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container/70 border border-outline-variant/30">
                <div className="font-mono text-xs uppercase text-primary-container font-semibold mb-1">Our Solution</div>
                <p className="text-sm text-on-surface-variant">{selectedProject.solution}</p>
              </div>

              <div className="p-4 rounded-xl bg-primary-container/10 border border-primary-container/30">
                <div className="font-mono text-xs uppercase text-primary font-semibold mb-1">Measurable Impact</div>
                <p className="text-sm text-on-surface font-medium">{selectedProject.result}</p>
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="mb-6">
              <span className="font-mono text-xs text-on-surface-variant block mb-2 uppercase">Tech Architecture Stack:</span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1 rounded-md bg-surface-container text-xs font-mono text-primary border border-outline-variant/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer Action */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="flex-1 py-3 px-4 rounded-xl text-center text-sm font-bold text-on-primary-fixed bg-gradient-to-r from-primary-container to-secondary-container shadow-[0_0_20px_rgba(0,242,254,0.35)]"
              >
                Engineer a Similar Site
              </a>
              <a
                href={`https://wa.me/917907142807?text=${encodeURIComponent(`Hi Helixhive! I just saw your case study on ${selectedProject.name}. I would like to discuss building a website like this for my business.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl text-center text-sm font-semibold text-primary bg-surface-container border border-outline-variant/40 flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-primary-container">chat</span>
                Discuss on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
