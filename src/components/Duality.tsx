import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Duality() {
  const [activePersona, setActivePersona] = useState<'rarri' | 'ransom' | null>(null);

  return (
    <section id="duality" className="relative min-h-screen bg-brand-black overflow-hidden flex flex-col justify-center py-24">
      {/* Dynamic Background */}
      <AnimatePresence>
        {activePersona === 'rarri' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-green mix-blend-screen"
          />
        )}
        {activePersona === 'ransom' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#00FFFF] mix-blend-screen"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="text-center mb-16">
          <h2 className="font-display font-medium text-sm tracking-[0.3em] uppercase text-gray-400 mb-6">
            The Split Frequency
          </h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-6">
            TWO MINDS. <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">ONE EMPIRE.</span>
          </h3>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg font-light">
            A supernatural event triggered the divide. Now, two distinct personas operate at the helm of Rhythmatik, each mastering their own domain.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 h-auto md:h-[500px]">
          {/* Center Divider Mask */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[2px] h-[180px] bg-brand-green">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-brand-green rotate-45"></div>
          </div>

          {/* Rarri2Trill */}
          <motion.div
            onHoverStart={() => setActivePersona('rarri')}
            onHoverEnd={() => setActivePersona(null)}
            className="relative flex flex-col justify-end p-8 md:p-12 overflow-hidden border border-white/10 group cursor-crosshair transition-all duration-700"
            style={{ 
              backgroundColor: activePersona === 'rarri' ? 'rgba(57, 255, 20, 0.05)' : 'rgba(255,255,255,0.02)',
              borderColor: activePersona === 'rarri' ? '#39FF14' : 'rgba(255,255,255,0.1)'
            }}
          >
            {/* Abstract Visual representation */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green rounded-full mix-blend-plus-lighter filter blur-[100px]"></div>
            </div>

            <div className="relative z-10">
              <h4 className="font-display text-5xl md:text-6xl lg:text-7xl font-black italic mb-2 text-[#39FF14] drop-shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-all duration-500">
                RARRI2TRILL
              </h4>
              <div className="text-[10px] tracking-[0.5em] uppercase text-white/60 mt-2 mb-6">
                The Frequency Frontman / Rap Entity
              </div>
              
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ opacity: 0.6, height: 'auto' }}
                  animate={{ 
                    opacity: activePersona === 'rarri' ? 1 : 0.6,
                  }}
                  className="text-gray-300 font-light leading-relaxed md:max-w-sm"
                >
                  Raw bars, high-voltage performance, and street-level authenticity. Rarri is the voice, the face, and the unstoppable energy driving the movement forward.
                </motion.p>
              </div>
            </div>
            
            <div className={`absolute top-8 right-8 w-3 h-3 rounded-full transition-all duration-500 ${activePersona === 'rarri' ? 'bg-brand-green shadow-[0_0_20px_#39FF14]' : 'bg-white/10'}`} />
          </motion.div>

          {/* Ran$omonthabeaT */}
          <motion.div
            onHoverStart={() => setActivePersona('ransom')}
            onHoverEnd={() => setActivePersona(null)}
            className="relative flex flex-col justify-end p-8 md:p-12 overflow-hidden border border-white/10 group cursor-crosshair transition-all duration-700"
            style={{ 
              backgroundColor: activePersona === 'ransom' ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255,255,255,0.02)',
              borderColor: activePersona === 'ransom' ? '#00FFFF' : 'rgba(255,255,255,0.1)'
            }}
          >
            {/* Abstract Visual representation */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00FFFF] rounded-full mix-blend-plus-lighter filter blur-[100px]"></div>
            </div>

            <div className="relative z-10">
              <h4 className="font-display text-4xl md:text-5xl lg:text-6xl font-black italic mb-2 text-[#00FFFF] drop-shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-500 whitespace-nowrap">
                RAN$OMONTHABEAT
              </h4>
              <div className="text-[10px] tracking-[0.5em] uppercase text-white/60 mt-2 mb-6">
                Architect of Sound / Engineering God
              </div>
              
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ opacity: 0.6, height: 'auto' }}
                  animate={{ 
                    opacity: activePersona === 'ransom' ? 1 : 0.6,
                  }}
                  className="text-gray-300 font-light leading-relaxed md:max-w-sm"
                >
                  Behind the console. The meticulous sonic architect shaping the frequencies. Ran$om controls the matrix of sound, bending reality through profound engineering.
                </motion.p>
              </div>
            </div>

            <div className={`absolute top-8 left-8 w-3 h-3 rounded-full transition-all duration-500 ${activePersona === 'ransom' ? 'bg-[#00FFFF] shadow-[0_0_20px_#00FFFF]' : 'bg-white/10'}`} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
