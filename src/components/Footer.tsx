import { Phone, Mail, MapPin, Gauge } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer id="contact" className="bg-black text-surface-400 text-xs py-14 border-t border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-black text-base">
              <Gauge className="w-5 h-5 text-cyan-400" />
              <span>Wangaratta Radiators</span>
            </div>
            <p className="text-surface-400 max-w-sm leading-relaxed">
              Automotive, agricultural, and heavy commercial cooling system repairs, re-coring, pressure testing, and replacement radiator parts at 135 Vincent Road, Wangaratta.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Workshop &amp; Contact</h4>
            <div className="flex items-center gap-2 text-surface-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>135 Vincent Road, Wangaratta VIC 3677</span>
            </div>
            <div className="flex items-center gap-2 text-surface-300">
              <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <a href="tel:0357213486" className="hover:text-white transition-colors">(03) 5721 3486</a>
            </div>
            <div className="flex items-center gap-2 text-surface-300">
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <a href="mailto:wangradiators@bigpond.com" className="hover:text-white transition-colors">wangradiators@bigpond.com</a>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Quick Links</h4>
            <div><a href="#quote-estimator" className="hover:text-white transition-colors">Radiator Quote Form</a></div>
            <div><a href="#services" className="hover:text-white transition-colors">Tractor &amp; Ag Systems</a></div>
            <div><a href="#services" className="hover:text-white transition-colors">Cleanouts &amp; Testing</a></div>
            <div><span className="text-surface-500">Workshop Hours: Mon-Fri 8am - 5pm</span></div>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-surface-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Wangaratta Radiators. All rights reserved.
          </div>
          <div>
            135 Vincent Rd, Wangaratta VIC 3677 &bull; Adrad Radiator Expert
          </div>
        </div>
      </div>
    </footer>
  );
}
