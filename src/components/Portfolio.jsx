import React from 'react';

export default function Portfolio({ onInspectProject, onOpenWhatsAppModal }) {
  const projects = [
    {
      id: 'karan',
      title: 'Karan Cinematics Bio-Engine',
      handle: '@karan.visuals (120k)',
      cleanHandle: '@karan.visuals',
      desc: 'Direct video reel playback with 0% frame drops and instant brand inquiry routing.',
      tech: 'React 19 • 24 KB',
      pagespeed: '100/100',
      lcp: '0.19s',
      category: 'Creator Bio',
      image: '/assets/project-startup.jpg',
    },
    {
      id: 'brewcraft',
      title: 'BrewCraft Artisanal Hub',
      handle: '@brewcraft.studio',
      cleanHandle: '@brewcraft.studio',
      desc: 'Multi-page static menu & instant seat reservation with 1-click WhatsApp table ping.',
      tech: 'React 19 • Static Jamstack',
      pagespeed: '99/100',
      lcp: '0.24s',
      category: 'Local Business',
      image: '/assets/project-ecommerce.jpg',
    },
    {
      id: 'vikram',
      title: 'Fintech Engineer Dossier',
      handle: '@vikram.codes',
      cleanHandle: '@vikram.codes',
      desc: 'High-density engineering resume and live API sandbox. Hired by US venture firm in 14 days.',
      tech: 'React 19 • Edge API',
      pagespeed: '100/100',
      lcp: '0.14s',
      category: 'Tech Portfolio',
      image: '/assets/project-realestate.jpg',
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-t border-slate-200/80 bg-slate-50/50" id="showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Recent Deployments
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Tested Live Architectures
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              100/100 Lighthouse Verified
            </span>
            <button
              onClick={onOpenWhatsAppModal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Chat with Raj</span>
            </button>
          </div>
        </div>

        {/* 3 Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-emerald-700 font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{proj.pagespeed} PageSpeed</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-sm text-white text-[11px] px-2.5 py-0.5 rounded-md font-mono">
                  {proj.handle}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-display font-bold text-base text-slate-900">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {proj.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500">{proj.tech}</span>
                  <button
                    onClick={() => onInspectProject(proj)}
                    className="font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Inspect</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
