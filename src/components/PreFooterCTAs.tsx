import { Phone, Gauge, Tractor } from 'lucide-react';
import Link from 'next/link';

export function PreFooterCTAs() {
  const phoneNumber = '(03) 5721 3486';
  const cleanPhone = '0357213486';

  return (
    <section className="py-16 bg-surface-900 border-t border-surface-800 text-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-cyan-950 via-surface-950 to-surface-900 rounded-3xl p-8 sm:p-12 border border-cyan-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-900/60 px-3 py-1 rounded-full border border-cyan-700 mb-3 inline-block">
              Wangaratta Cooling Specialist
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tractor Overheating or Need a Radiator Quote?
            </h2>
            <p className="mt-3 text-sm text-surface-300">
              Bring your unit into our Vincent Road workshop or call our technicians for expert diagnostic advice and replacement options.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="#quote-estimator"
              className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-surface-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
            >
              Get a Quote
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="px-6 py-3.5 bg-surface-900 hover:bg-surface-800 border border-surface-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call (03) 5721 3486</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
