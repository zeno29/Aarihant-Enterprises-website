import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ChevronRight, Store } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onShowroomClick: () => void;
}

export default function Hero({ onExploreClick, onShowroomClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex items-center justify-center overflow-hidden bg-[#060e20]"
    >
      {/* Immersive Cybernetic Grid & Glowing Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Futuristic Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
        
        {/* Dynamic Light Cones */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#013fb9] opacity-25 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[#00dbe7] opacity-15 blur-[120px] animate-pulse" style={{ animationDuration: '6s' }}></div>

        {/* Cinematic Main Laptop Graphic Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Cinematic Premium Laptop Backlight"
            className="w-full h-full object-cover opacity-35 object-center scale-105"
            src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
          />
          {/* Layered Gradient mask for seamless integration into deep slate background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1326] via-transparent to-[#0b1326]"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 text-center pt-24 pb-16">
        {/* Authorized Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#00f2ff]/10 border border-[#00dbe7]/30 text-[#00dbe7] font-semibold text-xs uppercase tracking-[0.2em] mb-8"
        >
          <ShieldCheck className="w-4 h-4 text-[#00dbe7] drop-shadow-[0_0_5px_rgba(0,242,255,0.5)]" />
          Authorized Platinum Retailer
        </motion.div>

        {/* Main Display Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display-lg text-[44px] sm:text-[60px] lg:text-[72px] text-white font-extrabold mb-6 max-w-4xl mx-auto leading-[1.1] tracking-tight"
        >
          Aarihant Enterprises: <span className="text-[#00dbe7] text-glow select-none bg-clip-text bg-gradient-to-r from-[#00dbe7] to-[#74f5ff]">Next-Gen</span> Computing
        </motion.h1>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body-lg text-lg sm:text-xl text-[#b9cacb] max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Your Premier Destination for Authorized Laptops & Computers in Prayagraj & Allahabad. Access authentic, global hardware configurations backed by official brand warranty protection and certified store support.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto bg-[#00f2ff] text-[#00164e] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_35px_rgba(0,242,255,0.4)] hover:bg-white transition-all transform hover:-translate-y-1 cursor-pointer group"
          >
            Explore Categories
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onShowroomClick}
            className="w-full sm:w-auto bg-surface-container-high/40 backdrop-blur-md border border-[#3a494b]/40 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface-container-highest/60 transition-all cursor-pointer"
          >
            <Store className="w-5 h-5 text-[#b9cacb]" />
            Our Showrooms
          </button>
        </motion.div>

        {/* Spec highlights ticker / trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-[#3a494b]/20 pt-8"
        >
          <div className="text-center font-mono">
            <span className="block text-2xl font-bold text-white tracking-tight">100%</span>
            <span className="text-xs text-[#b9cacb] uppercase tracking-wider">Manufacturer Sourced</span>
          </div>
          <div className="text-center font-mono">
            <span className="block text-2xl font-bold text-white tracking-tight">Official</span>
            <span className="text-xs text-[#b9cacb] uppercase tracking-wider">Brand Warranties</span>
          </div>
          <div className="text-center font-mono">
            <span className="block text-2xl font-bold text-white tracking-tight">Live</span>
            <span className="text-xs text-[#b9cacb] uppercase tracking-wider">In-Store Demos</span>
          </div>
          <div className="text-center font-mono">
            <span className="block text-2xl font-bold text-white tracking-tight">Express</span>
            <span className="text-xs text-[#b9cacb] uppercase tracking-wider">Corporate Delivery</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
