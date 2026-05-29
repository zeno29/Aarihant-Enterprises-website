import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Mail, User, BookOpen, AlertCircle } from 'lucide-react';
import { Brand } from '../types';

interface ContactFormProps {
  prefilledProduct?: string;
  prefilledBrand?: string;
  onClearPrefill: () => void;
}

export default function ContactForm({ prefilledProduct, prefilledBrand, onClearPrefill }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<Brand | 'General Inquiry'>('General Inquiry');
  const [message, setMessage] = useState('');
  
  // Validation, Loading & Success state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Autofill effect
  useEffect(() => {
    if (prefilledProduct) {
      setMessage(`Hi Aarihant Enterprises, I would like to inquire about the availability, bulk corporate pricing, and custom RAM upgrades options for the "${prefilledProduct}". Let me know when is the earliest time I can drop by your showroom for a live demo!`);
    }
    if (prefilledBrand) {
      // Safely map prefilledBrand to options
      if (['HP', 'Lenovo', 'ASUS', 'Acer'].includes(prefilledBrand)) {
        setSelectedBrand(prefilledBrand as Brand);
      }
    }
  }, [prefilledProduct, prefilledBrand]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (name.trim() === '') {
      newErrors.name = 'Full name is required';
    }
    if (email.trim() === '') {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email';
    }
    if (message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate safe, elegant API latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Cleanup inputs
      setName('');
      setEmail('');
      setSelectedBrand('General Inquiry');
      setMessage('');
      onClearPrefill();

      // Clear success banner after 5.5s
      setTimeout(() => {
        setIsSuccess(false);
      }, 5500);
    }, 1500);
  };

  return (
    <section className="py-20 bg-[#131b2e]/10 border-t border-[#3a494b]/10 scroll-mt-24" id="inquiry">
      <div className="max-w-[700px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#00dbe7] uppercase tracking-[0.2em] mb-3 block">
            Direct Communications Link
          </span>
          <h2 className="font-display-lg text-[32px] sm:text-[40px] text-white font-extrabold mb-4 tracking-tight">
            Consult Our Experts
          </h2>
          <p className="text-[#b9cacb]/80 font-light text-sm sm:text-base mb-2">
            Ask for custom configurations, stock reservations, or business deals.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-[#849495]/15 shadow-2xl relative">
          
          {/* Animated Success Banner */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-[#131b2e] rounded-2xl flex flex-col items-center justify-center p-8 text-center z-20 border border-[#00dbe7]"
              >
                <div className="w-16 h-16 rounded-full bg-[#00f2ff]/10 flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-[#00f2ff] drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Inquiry Dispatched Successfully!</h4>
                <p className="text-[#b9cacb] text-sm max-w-sm font-light leading-relaxed">
                  Thank you for contacting Aarihant Enterprises. Our procurement & team specialist will verify live brand inventory levels and reply to your address within 2-4 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-xs text-[#00dbe7] hover:text-white uppercase font-bold tracking-widest font-mono cursor-pointer"
                >
                  Submit Another Ticket
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Prefilled Banner Indicator */}
            {prefilledProduct && (
              <div className="px-4 py-3 bg-[#00f2ff]/10 border border-[#00dbe7]/30 rounded-xl flex items-center justify-between text-xs text-[#00f2ff] font-semibold">
                <span>⚡ Auto-filled inquiry details for: "{prefilledProduct}"</span>
                <button
                  type="button"
                  onClick={() => {
                    onClearPrefill();
                    setMessage('');
                  }}
                  className="text-red-400 hover:text-red-500 font-bold ml-2 text-sm cursor-pointer"
                  title="Clear Preset"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-[#b9cacb] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#00dbe7]" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className={`w-full bg-[#060e20] border rounded-lg p-3 text-sm text-white placeholder-[#b9cacb]/30 focus:outline-none focus:ring-1 ${
                    errors.name ? 'border-red-400 focus:ring-red-400' : 'border-[#3a494b]/60 focus:border-[#00dbe7] focus:ring-[#00dbe7]'
                  }`}
                />
                {errors.name && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[#b9cacb] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#00dbe7]" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john@example.com"
                  className={`w-full bg-[#060e20] border rounded-lg p-3 text-sm text-white placeholder-[#b9cacb]/30 focus:outline-none focus:ring-1 ${
                    errors.email ? 'border-red-400 focus:ring-red-400' : 'border-[#3a494b]/60 focus:border-[#00dbe7] focus:ring-[#00dbe7]'
                  }`}
                />
                {errors.email && (
                  <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Select Brand Option */}
            <div>
              <label className="block text-xs font-semibold text-[#b9cacb] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#00dbe7]" />
                Primary Brand / Sector
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value as any)}
                className="w-full bg-[#060e20] border border-[#3a494b]/60 text-white text-sm rounded-lg p-3.5 focus:outline-none focus:border-[#00dbe7]"
              >
                <option value="General Inquiry">General Procurement Inquiry</option>
                <option value="HP">HP Ecosystem Products</option>
                <option value="Lenovo">Lenovo Business/Gaming</option>
                <option value="ASUS">ASUS ROG & Zenbook lines</option>
                <option value="Acer">Acer Predator & Swift series</option>
              </select>
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-semibold text-[#b9cacb] uppercase tracking-wider mb-2">
                Detailed Message / Specs Needed
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What details can our specialists prepare for you? For custom configurations, specify RAM/storage requirements."
                rows={5}
                className={`w-full bg-[#060e20] border rounded-lg p-3 text-sm text-white placeholder-[#b9cacb]/30 focus:outline-none focus:ring-1 ${
                  errors.message ? 'border-red-400 focus:ring-red-400' : 'border-[#3a494b]/60 focus:border-[#00dbe7] focus:ring-[#00dbe7]'
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00f2ff] text-[#00164e] py-4 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_10px_20px_rgba(0,242,255,0.22)] hover:bg-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Dispatching Ticket...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Dispatch Inquiry
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
