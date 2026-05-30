import React, { useState, useEffect } from 'react';
import { Laptop, Menu, X } from 'lucide-react';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onScrollTo, activeSection }: NavbarProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'support', label: 'Showrooms' },
    { id: 'categories', label: 'Products' }
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrollPosition > 20
          ? 'bg-[#0b1326]/90 backdrop-blur-xl border-b border-[#3a494b]/30 shadow-[0_10px_30px_rgba(0,242,255,0.08)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <div
          onClick={() => onScrollTo('hero')}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#013fb9] to-[#00dbe7] flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.3)] group-hover:scale-105 transition-transform">
            <Laptop className="w-5.5 h-5.5 text-white" />
          </div>
          <span className="font-display-lg text-[20px] font-extrabold tracking-tighter text-[#00dbe7] uppercase select-none">
            Aarihant <span className="text-white font-medium text-[16px] lowercase tracking-normal">Enterprises</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center" id="desktop-links">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onScrollTo(link.id)}
              className={`font-label-md text-[14px] font-semibold tracking-wider uppercase transition-all duration-300 pb-1 cursor-pointer border-b-2 hover:text-white ${
                activeSection === link.id
                  ? 'text-[#00dbe7] border-[#00dbe7]'
                  : 'text-[#b9cacb] border-transparent hover:border-[#b9cacb]/30'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action Button & Mobile Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onScrollTo('inquiry')}
            className="hidden sm:inline-block bg-[#00f2ff] text-[#00164e] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:bg-white transition-all cursor-pointer"
          >
            Direct Inquiry
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-[#00dbe7] transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 animate-in fade-in" />
            ) : (
              <Menu className="w-6 h-6 animate-in fade-in" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Glassmorphism */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full min-h-screen bg-[#060e20]/95 backdrop-blur-2xl border-b border-[#3a494b]/40 py-8 px-6 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onScrollTo(link.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-bold tracking-wider uppercase py-2 border-b border-[#3a494b]/20 ${
                activeSection === link.id ? 'text-[#00dbe7]' : 'text-[#b9cacb]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onScrollTo('inquiry');
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-[#00f2ff] text-[#00164e] py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-center"
          >
            Direct Inquiry
          </button>
        </div>
      )}
    </nav>
  );
}
