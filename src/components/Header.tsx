'use client';

import { Menu, X, Phone, Gauge, Tractor, MapPin } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const phoneNumber = '(03) 5721 3486';
  const cleanPhone = '0357213486';

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-surface-950/95 backdrop-blur-xl border-b border-surface-800 shadow-xl py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group focus:outline-none">
              <div className="h-11 sm:h-12 px-3 py-1 bg-cyan-600 text-surface-950 rounded-xl shadow-md flex items-center justify-center font-black text-lg">
                <Gauge className="w-5 h-5 mr-1" />
                <span>WANG RADIATORS</span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-white font-extrabold text-sm tracking-tight leading-none">Wangaratta Radiators</div>
                <div className="text-cyan-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">Ag &bull; Tractor &bull; Auto Cooling</div>
              </div>
            </Link>
            
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-800/80 border border-surface-700/60 text-[11px] text-surface-300">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>135 Vincent Rd, Wangaratta</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/#quote-estimator" className="text-surface-300 hover:text-cyan-400 transition-colors text-sm font-semibold tracking-wide">
              Radiator Quote
            </Link>
            <Link href="/#ag-cooling" className="text-surface-300 hover:text-cyan-400 transition-colors text-sm font-semibold tracking-wide">
              Tractor &amp; Ag Systems
            </Link>
            <Link href="/#services" className="text-surface-300 hover:text-cyan-400 transition-colors text-sm font-semibold tracking-wide">
              Re-Coring &amp; Cleanouts
            </Link>
            <Link href="/#contact" className="text-surface-300 hover:text-cyan-400 transition-colors text-sm font-semibold tracking-wide">
              Workshop &amp; Hours
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#quote-estimator"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-surface-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-950/60"
            >
              <span>Get a Radiator Quote</span>
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-850 hover:bg-surface-800 border border-surface-700 text-cyan-400 font-bold text-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{phoneNumber}</span>
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-surface-400 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-surface-900 border-t border-surface-800 px-4 py-6 space-y-4">
          <Link href="/#quote-estimator" onClick={() => setIsMenuOpen(false)} className="block text-surface-200 hover:text-cyan-400 font-medium">
            Radiator Quote Form
          </Link>
          <Link href="/#ag-cooling" onClick={() => setIsMenuOpen(false)} className="block text-surface-200 hover:text-cyan-400 font-medium">
            Tractor &amp; Ag Cooling
          </Link>
          <Link href="/#services" onClick={() => setIsMenuOpen(false)} className="block text-surface-200 hover:text-cyan-400 font-medium">
            Services &amp; Re-Coring
          </Link>
          <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="block text-surface-200 hover:text-cyan-400 font-medium">
            Workshop &amp; Hours
          </Link>
          <div className="pt-2">
            <a
              href={`tel:${cleanPhone}`}
              className="w-full py-3 bg-cyan-500 text-surface-950 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Workshop: {phoneNumber}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
