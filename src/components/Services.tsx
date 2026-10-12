'use client';

import { Gauge, Tractor, Wrench, ShieldCheck, Check, Flame } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    name: 'Tractor & Harvester Cooling Repairs',
    category: 'Heavy Agricultural Machinery',
    description: 'Specialised high-flow copper/brass re-coring and tank repairs for John Deere, Case IH, New Holland, Massey Ferguson, and Kubota equipment.',
    icon: Tractor,
    tag: 'Agricultural Specialists',
    specs: [
      'Heavy-Duty Debris Resistant Fin Cores',
      'Ultrasonic Chemical Core Degreasing',
      'High-Vibration Reinforced Solder Joints',
      'Fast Emergency Turnaround During Harvest'
    ]
  },
  {
    name: 'Custom Re-Coring & Fabrication',
    category: 'Workshop Engineering',
    description: 'Replacing blocked or corroded cores while keeping original brass tanks. Custom aluminium TIG welding, oil cooler fabrication, and intercooler repairs.',
    icon: Wrench,
    tag: 'Custom Metalwork',
    specs: [
      'Heavy Gauge Copper & Brass Cores',
      'All-Aluminium Performance Welds',
      'Intercoolers & Hydraulic Oil Coolers',
      'Vintage & Classic Car Radiator Restorations'
    ]
  },
  {
    name: '4WD Heavy-Duty Cooling Upgrades',
    category: 'Towing & Off-Road',
    description: 'Upgraded high-capacity aluminium radiators for LandCruiser, Hilux, Ranger, and Patrol towing heavy caravans or work trailers through Australian summer heat.',
    icon: Gauge,
    tag: 'Towing Protection',
    specs: [
      'Increased Core Thickness & Water Volume',
      'Integrated High-Flow Transmission Oil Coolers',
      'Electrolysis & Stray Current Testing',
      'Thermostat & Fan Hub Viscous Upgrades'
    ]
  },
  {
    name: 'Cleanouts, Rodding & Pressure Testing',
    category: 'Diagnostic Maintenance',
    description: 'Removing bottom tanks to physically rod mineral scale and lime deposits out of tubes. Submerged hydrostatic pressure testing to detect hairline leaks.',
    icon: ShieldCheck,
    tag: 'Guaranteed Repairs',
    specs: [
      '100% Submerged Hydrostatic Pressure Test',
      'Mechanical Tube Rodding Cleanouts',
      'Coolant System Flushes & Inhibitor Check',
      'Replacement Radiator Caps & Hoses'
    ]
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-surface-950 text-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800 mb-3 inline-block">
            Workshop Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Radiator &amp; Heat Exchange Services
          </h2>
          <p className="mt-4 text-surface-300 text-base">
            Operating from 135 Vincent Road in Wangaratta with over 35 years of specialised cooling system experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="bg-surface-900 border border-surface-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-surface-800 px-2.5 py-1 rounded-md">
                      {svc.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{svc.name}</h3>
                  <div className="text-xs text-cyan-400 font-semibold mb-3">{svc.category}</div>
                  <p className="text-sm text-surface-300 leading-relaxed mb-6">{svc.description}</p>

                  <div className="space-y-2 mb-6">
                    {svc.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-surface-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-800 flex justify-between items-center">
                  <a
                    href="#quote-estimator"
                    className="text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300"
                  >
                    Request Quote &rarr;
                  </a>
                  <a
                    href="tel:0357213486"
                    className="text-xs font-bold text-surface-400 hover:text-white"
                  >
                    Call (03) 5721 3486
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
