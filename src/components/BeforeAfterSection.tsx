'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SlidersHorizontal, MoveHorizontal, CheckCircle2, ShieldCheck, Layers, Sparkles } from 'lucide-react';

const COMPARISON_SETS = [
  {
    id: 'shed-slab-comp',
    title: 'Rural Machinery Shed: Formwork & SL82 Mesh to Burnished Pour',
    subtitle: 'From laser excavation, poly vapour barrier, and SL82 double mesh to a rock-solid 32 MPa power-troweled machine floor.',
    beforeImage: '/images/projects/project-11-shed-slab-before.jpg',
    beforeLabel: 'Phase 1: Boxing, Poly & SL82 Mesh',
    afterImage: '/images/projects/project-11-shed-slab-after.jpg',
    afterLabel: 'Phase 2: 32 MPa Finished Machine Floor',
    milestones: [
      { step: '01', title: 'Subgrade Compaction', desc: '100mm compacted crushed rock foundation.' },
      { step: '02', title: 'Heavy Vapour Barrier', desc: '0.2mm poly film with sealed laps.' },
      { step: '03', title: 'SL82 Rebar Mesh', desc: 'Tied accurately on 50/65mm bar chairs.' },
      { step: '04', title: 'Power-Trowel Burnish', desc: 'Hardened dust-free mechanical burnish.' },
    ]
  },
  {
    id: 'driveway-comp',
    title: 'Custom Driveway: Subgrade Earthworks to Washed Exposed Pebble',
    subtitle: 'Transforming rough excavating subgrades into a stunning, durable alpine river pebble exposed driveway.',
    beforeImage: '/images/projects/project-12-driveway-before.jpg',
    beforeLabel: 'Phase 1: Bobcat Earthworks & Boxing',
    afterImage: '/images/projects/project-12-driveway-after.jpg',
    afterLabel: 'Phase 2: Washed & Sealed Aggregate',
    milestones: [
      { step: '01', title: 'Laser Excavation', desc: 'Bobcat spoil cut with 1:80 water fall.' },
      { step: '02', title: 'Crushed Rock Base', desc: 'Roller compacted road base.' },
      { step: '03', title: 'Country Concrete Pour', desc: 'Alpine pebble mix with surface retarder.' },
      { step: '04', title: 'Acid Wash & Seal', desc: 'Pressure washed and 2-coat acrylic seal.' },
    ]
  },
  {
    id: 'boralma-comp',
    title: 'Boralma Architectural Residence: Substrate to Nil-Exposure Floor',
    subtitle: 'Crown Constructions custom country residence requiring flawless screeding tolerance for seamless polished concrete.',
    beforeImage: '/images/projects/project-13-boralma-before.jpg',
    beforeLabel: 'Phase 1: Engineered Formwork Setup',
    afterImage: '/images/projects/project-13-boralma-after.jpg',
    afterLabel: 'Phase 2: Seamless Nil-Exposure Floor',
    milestones: [
      { step: '01', title: 'Engineered Slabs', desc: 'AS 2870 compliant raft footings.' },
      { step: '02', title: 'Laser Screeding', desc: 'Precision flatness to ±2mm tolerance.' },
      { step: '03', title: 'Void Elimination', desc: 'High-frequency concrete vibration.' },
      { step: '04', title: 'Controlled Wet Cure', desc: 'Hydration curing for maximum floor density.' },
    ]
  }
];

export function BeforeAfterSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeSet = COMPARISON_SETS[activeIdx];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-20 bg-surface-100/80 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary-100 text-primary-800 text-xs font-bold tracking-widest uppercase border border-primary-300 mb-4">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Substrate vs. Finished Pour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">
            Substrate Preparation is What Makes Concrete Last
          </h2>
          <p className="mt-3 text-base text-surface-600 font-normal leading-relaxed">
            Slide horizontally to see the unseen engineering—compacted roadbase, vapour barriers, and tied steel rebar—before the finished concrete surface is cured.
          </p>
        </div>

        {/* Set Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {COMPARISON_SETS.map((set, idx) => (
            <button
              key={set.id}
              onClick={() => {
                setActiveIdx(idx);
                setSliderPos(50);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'bg-surface-950 text-primary-400 shadow-md ring-2 ring-primary-500/20'
                  : 'bg-white text-surface-700 border border-surface-200 hover:bg-surface-50'
              }`}
            >
              {set.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Active Comparison Set Card */}
        <div className="bg-white rounded-3xl border border-surface-200 shadow-2xl overflow-hidden p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-surface-900">
              {activeSet.title}
            </h3>
            <p className="text-sm text-surface-600 mt-1">
              {activeSet.subtitle}
            </p>
          </div>

          {/* Interactive Split Slider Container */}
          <div 
            ref={containerRef}
            className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-surface-300 shadow-inner"
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* AFTER IMAGE (Background - Full Size) */}
            <div className="absolute inset-0">
              <Image
                src={activeSet.afterImage}
                alt={activeSet.afterLabel}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <span className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-surface-950/85 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                {activeSet.afterLabel}
              </span>
            </div>

            {/* BEFORE IMAGE (Clipped Overlay) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 w-full h-full min-w-[320px]" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}>
                <Image
                  src={activeSet.beforeImage}
                  alt={activeSet.beforeLabel}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <span className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-xl bg-primary-600/90 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                {activeSet.beforeLabel}
              </span>
            </div>

            {/* SLIDER DIVIDER LINE & HANDLE */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-surface-900 shadow-2xl flex items-center justify-center border-2 border-primary-500">
                <MoveHorizontal className="w-5 h-5 text-primary-600" />
              </div>
            </div>

          </div>

          {/* 4 Milestones Steps Strip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeSet.milestones.map((ms) => (
              <div key={ms.step} className="p-4 rounded-2xl bg-surface-50 border border-surface-200">
                <span className="text-xs font-extrabold text-primary-600 block">{ms.step}</span>
                <h4 className="font-bold text-surface-900 text-sm mt-1">{ms.title}</h4>
                <p className="text-xs text-surface-600 mt-1">{ms.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
