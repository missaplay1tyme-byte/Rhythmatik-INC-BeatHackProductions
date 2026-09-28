import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Mock API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // Reset status after a few seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <footer className="bg-[#020202] py-16 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        {/* Brand */}
        <div className="md:col-span-4 lg:col-span-4">
          <h2 className="font-display font-black text-2xl tracking-tighter italic leading-none text-white mb-2">
            RHYTHMATIK<span className="text-brand-green">, INC</span>
          </h2>
          <p className="text-[10px] tracking-[0.3em] font-mono text-white/50 uppercase mt-2">
            Where Sound Meets Story. <br />
            San Angelo // Odessa TX
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-4 lg:col-span-4 flex gap-12 lg:justify-center">
          {/* Links 1 */}
          <div className="flex flex-col gap-3">
            <span className="font-display text-[10px] tracking-widest uppercase text-white/40 mb-2 font-bold">Empire</span>
            <a href="#discography" className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-brand-green transition-colors">BeatHack</a>
            <a href="#comics-section" className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-brand-green transition-colors">Universe Comics</a>
            <a href="#culture" className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-brand-green transition-colors">F.L.Y. Movement</a>
            <a href="#studio-doc" className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#39FF14] hover:text-white transition-colors">Mini-Doc Series</a>
            <a href="#gallery" className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-brand-green transition-colors">Vault Gallery</a>
          </div>

          {/* Links 2 */}
          <div className="flex flex-col gap-3">
            <span className="font-display text-[10px] tracking-widest uppercase text-white/40 mb-2 font-bold">Connect</span>
            <a href="#" className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-white transition-colors">YouTube</a>
            <a href="#" className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-brand-green transition-colors">Contact</a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-4 lg:col-span-4">
          <span className="font-display text-[10px] tracking-widest uppercase text-white/40 mb-4 block font-bold">Join the Empire</span>
          <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <motion.div
              animate={{
                boxShadow: isFocused ? '0 0 20px rgba(57,255,20,0.3)' : '0 0 0px rgba(57,255,20,0)',
                borderColor: isFocused ? '#39FF14' : 'rgba(255,255,255,0.1)'
              }}
              transition={{ duration: 0.3 }}
              className="relative flex items-stretch bg-white/5 border border-white/10 rounded-sm overflow-hidden group"
            >
              <input
                type="email"
                placeholder="ENTER EMAIL FREQUENCY"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-transparent text-xs tracking-widest text-white px-4 py-3 outline-none placeholder:text-white/30 font-mono disabled:opacity-50 min-w-0"
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="flex-shrink-0 px-6 bg-[#39FF14] text-black text-[10px] tracking-widest uppercase font-bold flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:hover:bg-[#39FF14] whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : status === 'success' ? (
                  <Check size={16} />
                ) : (
                  "Join the Empire"
                )}
              </button>
            </motion.div>
            
            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-6 left-0 text-[10px] tracking-widest text-brand-green font-mono uppercase mt-2"
                >
                  Frequency Tuned In. Welcome.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/30 font-medium">
          &copy; {new Date().getFullYear()} Rhythmatik, INC. All rights reserved.
        </p>
        <p className="text-xs text-white/30 font-medium tracking-widest uppercase">
          T.T.W.T.L.A
        </p>
      </div>
    </footer>
  );
}
