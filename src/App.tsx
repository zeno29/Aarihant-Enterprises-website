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
  const [currentPage, setCurrentPage] = useState<'home' | 'products'>('home');
  const [prefilledProduct, setPrefilledProduct] = useState<string | undefined>(undefined);
  const [prefilledBrand, setPrefilledBrand] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('hero');

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#products') {
        setCurrentPage('products');
        setActiveSection('categories');
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      } else {
        setCurrentPage('home');
        const sectionId = hash.replace('#', '');
        if (sectionId && ['about', 'support', 'inquiry'].includes(sectionId)) {
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setActiveSection(sectionId);
            }
          }, 100);
        } else if (!sectionId) {
          setActiveSection('hero');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange, { passive: true });
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Trigger smooth scrolling or navigate pages
  const handleScrollTo = (sectionId: string) => {
    if (sectionId === 'categories') {
      window.location.hash = '#products';
      return;
    }

    if (sectionId === 'hero') {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
      return;
    }

    if (currentPage !== 'home') {
      // Navigate to homepage first, then scroll to section
      window.location.hash = `#${sectionId}`;
      return;
    }

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
    
    // inquiry is rendered below the product catalog on products page, so we can scroll to it smoothly
    setTimeout(() => {
      const el = document.getElementById('inquiry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleClearPrefill = () => {
    setPrefilledProduct(undefined);
    setPrefilledBrand(undefined);
  };

  // Simple intersection observer to highlight navbar links on scroll (homepage only)
  useEffect(() => {
    if (currentPage !== 'home') return;

    const sections = ['hero', 'about', 'support', 'inquiry'];
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
  }, [currentPage]);

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-sans antialiased min-h-screen relative selection:bg-[#00f2ff] selection:text-[#00164e]">
      
      {/* Sticky Top-level navigation bar */}
      <Navbar onScrollTo={handleScrollTo} activeSection={currentPage === 'products' ? 'categories' : activeSection} />

      {/* Floating Right Support Helpers */}
      <HelpSupportRail onContactClick={() => handleScrollTo('inquiry')} />

      {/* Main Page Layout Switcher */}
      {currentPage === 'home' ? (
        <>
          {/* Hero section */}
          <Hero 
            onExploreClick={() => handleScrollTo('categories')} 
            onShowroomClick={() => handleScrollTo('support')} 
          />

          {/* About/Excellence credibility indicators */}
          <AboutCredibility />

          {/* Interactive Store Locator (Showrooms) */}
          <StoreLocator />
        </>
      ) : (
        <div className="pt-20">
          {/* Interactive Catalog and filterable list (Products) */}
          <ProductSection onInquireClick={handleInquireProduct} />
        </div>
      )}

      {/* Direct Inquiry Contact Form (Common across pages) */}
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
