import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutCredibility from './components/AboutCredibility';
import ProductSection from './components/ProductSection';
import StoreLocator from './components/StoreLocator';
import ContactForm from './components/ContactForm';
import HelpSupportRail from './components/HelpSupportRail';
import Footer from './components/Footer';
import { Phone } from 'lucide-react';

export default function App() {
  const [prefilledProduct, setPrefilledProduct] = useState<string | undefined>(undefined);
  const [prefilledBrand, setPrefilledBrand] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('hero');

  // Trigger smooth scrolling to specific sections 
  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  // Callback to capture product selections and autofill the inquiry subject
  const handleInquireProduct = (productName: string, brandName: string) => {
    setPrefilledProduct(productName);
    setPrefilledBrand(brandName);
    handleScrollTo('inquiry');
  };

  const handleClearPrefill = () => {
    setPrefilledProduct(undefined);
    setPrefilledBrand(undefined);
  };

  // Simple intersection observer to highlight navbar links on scroll
  useEffect(() => {
    const sections = ['hero', 'categories', 'brands', 'about', 'support', 'inquiry'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-sans antialiased min-h-screen relative selection:bg-[#00f2ff] selection:text-[#00164e]">
      
      {/* Sticky Top-level navigation bar */}
      <Navbar onScrollTo={handleScrollTo} activeSection={activeSection} />

      {/* Floating Right Support Helpers */}
      <HelpSupportRail onContactClick={() => handleScrollTo('inquiry')} />

      {/* Hero section */}
      <Hero 
        onExploreClick={() => handleScrollTo('categories')} 
        onShowroomClick={() => handleScrollTo('support')} 
      />

      {/* About/Excellence credibility indicators */}
      <AboutCredibility />

      {/* Interactive Catalog and filterable list */}
      <ProductSection onInquireClick={handleInquireProduct} />

      {/* Interactive Store Locator */}
      <StoreLocator />

      {/* Direct Inquiry Contact Form */}
      <ContactForm 
        prefilledProduct={prefilledProduct}
        prefilledBrand={prefilledBrand}
        onClearPrefill={handleClearPrefill}
      />

      {/* Structured Footer */}
      <Footer onScrollTo={handleScrollTo} />

      {/* Persistent Floating Mobile Call Button */}
      <a
        href="tel:+917234991010"
        className="fixed bottom-6 right-6 z-45 sm:hidden w-14 h-14 rounded-full bg-gradient-to-tr from-[#013fb9] to-[#00dbe7] flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.45)] border border-[#00f2ff]/40 hover:scale-105 active:scale-95 transition-all text-white animate-bounce"
        style={{ animationDuration: '3s' }}
        aria-label="Call Showroom"
      >
        <Phone className="w-6 h-6" />
      </a>

    </div>
  );
}
