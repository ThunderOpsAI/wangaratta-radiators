'use client';

import { Gauge, Tractor, Phone, ArrowRight, ShieldCheck, Wrench } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const phoneNumber = '(03) 5721 3486';
  const cleanPhone = '0357213486';

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Tractor className="w-4 h-4 text-cyan-400" />
            Tractor &bull; Ag Machinery &bull; Automotive Cooling
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Heavy Ag Radiator Repairs, Re-Coring &amp; Cleanouts.
          </h1>

          <p className="text-lg sm:text-xl text-surface-300 leading-relaxed mb-8 max-w-2xl font-light">
            Don't let overheating halt harvest or farm operations. Wangaratta Radiators provides heavy-duty copper, brass, and aluminium cooling repairs, custom re-coring, pressure testing, and replacement units for tractors, earthmoving gear, 4WDs, and trucks.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#quote-estimator"
              className="px-6 py-4 bg-cyan-500 hover:bg-cyan-400 text-surface-950 font-black rounded-xl text-center text-xs uppercase tracking-wider transition-all shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2"
            >
              <span>Get a Radiator Quote / Parts Request</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="px-6 py-4 bg-surface-900 hover:bg-surface-850 text-white border border-surface-700 font-bold rounded-xl text-center text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call Workshop: (03) 5721 3486</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-12 mt-12 border-t border-surface-800 text-xs text-surface-400">
            <div>
              <div className="text-white font-black text-lg">Ag &amp; Tractor</div>
              <div>John Deere, Case, New Holland</div>
            </div>
            <div>
              <div className="text-white font-black text-lg">Heavy Re-Coring</div>
              <div>Copper, Brass &amp; Aluminium</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-white font-black text-lg">Same-Day Testing</div>
              <div>Hydrostatic Pressure Checks</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
