import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Store, Award, HeartHandshake } from 'lucide-react';

export default function AboutCredibility() {
  const points = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#00dbe7]" />,
      title: '100% Genuine Hardware',
      desc: 'Sourced directly from global brand factories with verified seals and batch certifications.'
    },
    {
      icon: <Store className="w-8 h-8 text-[#00dbe7]" />,
      title: 'Live Showroom Demos',
      desc: 'Experience high-refresh screens, mechanical keystrokes, and thermals in real-time before choosing.'
    },
    {
      icon: <Award className="w-8 h-8 text-[#00dbe7]" />,
      title: 'Manufacturer Warranty',
      desc: 'Each notebook, computer tower, and laserjet printer carries the full official brand warranty.'
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-[#00dbe7]" />,
      title: 'Platinum Tech Care',
      desc: 'Post-purchase setups, OS deployments, and memory hardware additions by certified engineers.'
    }
  ];

  return (
    <section className="py-20 relative bg-[#0b1326] overflow-hidden scroll-mt-24" id="about">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-[#013fb9] opacity-10 blur-[130px] pointer-events-none select-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display-lg text-[32px] sm:text-[40px] text-white font-extrabold mb-4 tracking-tight"
          >
            Authorized Excellence
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00dbe7] to-[#013fb9] mx-auto rounded-full mb-6"></div>
          <p className="text-[#b9cacb] max-w-xl mx-auto font-light text-sm sm:text-base">
            Aarihant Enterprises stands for authenticity. We avoid parallel imports and gray-market items to keep your investments secure.
          </p>
        </div>

        {/* 4-Column Credibility Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-[#131b2e]/60 backdrop-blur-lg border border-[#849495]/15 hover:border-[#00dbe7]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,242,255,0.06)] group cursor-default"
            >
              {/* Icon Container with Inner Glow */}
              <div className="w-16 h-16 rounded-xl bg-[#222a3d]/50 border border-[#849495]/10 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-[#00dbe7]/10 group-hover:border-[#00dbe7]/30 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                {point.icon}
              </div>

              {/* Title & Description */}
              <h3 className="font-display-lg text-[18px] font-bold text-white mb-3 group-hover:text-[#00dbe7] transition-colors">
                {point.title}
              </h3>
              <p className="text-[#b9cacb]/80 text-sm leading-relaxed font-light">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
