import React from 'react';
import { Laptop, Compass, FileText, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#060e20] border-t border-[#3a494b]/20 py-16">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand identity column */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div
            onClick={() => onScrollTo('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#013fb9] to-[#00dbe7] flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.2)]">
              <Laptop className="w-5 h-5 text-white" />
            </div>
            <span className="font-display-lg text-lg font-black tracking-tighter text-[#00dbe7] uppercase select-none">
              Aarihant <span className="text-white font-medium text-sm lowercase tracking-normal">Enterprises</span>
            </span>
          </div>
          
          <p className="text-sm text-[#b9cacb]/80 max-w-sm font-light leading-relaxed">
            Authorized multi-brand sales center representing the world's finest laptops and computers in Prayagraj & Allahabad. Offering official warranty safety, diagnostic showrooms, and premium IT services.
          </p>
        </div>

        {/* Categories / Quick Navigate */}
        <div className="space-y-4">
          <h5 className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#00dbe7]" />
            Ecosystem Navigate
          </h5>
          <ul className="space-y-2 text-xs font-semibold text-[#b9cacb]">
            <li>
              <button onClick={() => onScrollTo('categories')} className="hover:text-white transition-colors uppercase tracking-wider cursor-pointer">
                Product Showcase
              </button>
            </li>
            <li>
              <button onClick={() => onScrollTo('brands')} className="hover:text-white transition-colors uppercase tracking-wider cursor-pointer">
                Partners & Brands
              </button>
            </li>
            <li>
              <button onClick={() => onScrollTo('about')} className="hover:text-white transition-colors uppercase tracking-wider cursor-pointer">
                Quality Standards
              </button>
            </li>
            <li>
              <button onClick={() => onScrollTo('support')} className="hover:text-white transition-colors uppercase tracking-wider cursor-pointer">
                Tech Showrooms
              </button>
            </li>
          </ul>
        </div>

        {/* Corporate Legal/Disclaimers */}
        <div className="space-y-4">
          <h5 className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#00dbe7]" />
            Regulatory Protection
          </h5>
          <ul className="space-y-2 text-xs font-semibold text-[#b9cacb]">
            <li>
              <a href="#" className="hover:text-white transition-colors uppercase tracking-wider">
                Full Warranty Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors uppercase tracking-wider">
                Privacy Protection
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors uppercase tracking-wider">
                Standard Terms of Sale
              </a>
            </li>
            <li>
              <span className="text-[10px] text-[#b9cacb]/40 block pt-2">
                * All third-party logos (HP, Lenovo, ASUS, Acer) belong to their respective trademarks and copyrights registration owners.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Footer line */}
      <div className="max-w-[1440px] mx-auto px-6 mt-16 pt-8 border-t border-[#3a494b]/10 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#b9cacb]/60 font-light">
          © {currentYear} Aarihant Enterprises. Authorized Manufacturer Deals. All rights and protections reserved.
        </p>
        <p className="text-xs text-[#b9cacb]/40 font-mono text-[10px]">
          CRAFTED FOR HEAVY COMPUTING ON HIGH-PERFORMANCE CHASSIS
        </p>
      </div>
    </footer>
  );
}
