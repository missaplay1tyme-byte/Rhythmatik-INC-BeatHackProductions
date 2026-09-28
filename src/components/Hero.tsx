import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { Zap, Disc, Play } from 'lucide-react';

export function Hero() {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects for scroll
  const contentYLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentYRight = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col md:flex-row overflow-hidden bg-black pt-16 md:pt-0">
      
      {/* Central Fracture Line */}
      <motion.div 
        className="absolute left-0 right-0 top-1/2 md:top-0 md:bottom-0 md:left-1/2 md:right-auto w-full h-[1px] md:w-[1px] md:h-full z-20 pointer-events-none bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white/20 to-transparent"
        style={{ x: "-50%", opacity }}
      />

      {/* Rarri2Trill Side (Top / Left) */}
      <motion.div 
        className={`relative flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-crosshair
          ${hoveredSide === 'left' ? 'flex-[1.4]' : hoveredSide === 'right' ? 'flex-[0.6]' : 'flex-1'}
        `}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 bg-[#020202] z-0"></div>
        {/* Neon Green Ambient */}
        <div className="absolute inset-0 opacity-[0.15] transition-opacity duration-700" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #39FF14 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        
        <div 
          className={`absolute inset-0 bg-[#39FF14] mix-blend-overlay pointer-events-none transition-opacity duration-700 ${hoveredSide === 'left' ? 'opacity-10' : 'opacity-0'}`}
        />

        <div 
          className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#39FF14] rounded-full blur-[150px] pointer-events-none transition-all duration-700
            ${hoveredSide === 'left' ? 'opacity-20 scale-125' : 'opacity-10 scale-100'}
          `}
        />
        
        <motion.div 
          className="relative z-10 px-8 text-center flex flex-col items-center w-full max-w-lg pb-12 md:pb-0"
          style={{ y: contentYLeft }}
        >
            <div className={`transition-transform duration-700 ${hoveredSide === 'left' ? 'scale-110' : 'scale-100'}`}>
              <Zap size={40} md:size={48} className="text-[#39FF14] mb-6 md:mb-8 drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white mb-2 uppercase drop-shadow-md">
              Rarri2<span className="text-[#39FF14]">Trill</span>
            </h2>
            <p className="text-[#39FF14] font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">
              The Frequency Frontman
            </p>
            <div className={`transition-all duration-700 overflow-hidden ${hoveredSide === 'left' ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'} hidden md:block`}>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                Energetic. Raw performance. Weaponized vocal frequencies that shatter physical barriers and energize the culture.
              </p>
            </div>
        </motion.div>
      </motion.div>

      {/* Ran$omonthabeaT Side (Bottom / Right) */}
      <motion.div 
        className={`relative flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-crosshair
          ${hoveredSide === 'right' ? 'flex-[1.4]' : hoveredSide === 'left' ? 'flex-[0.6]' : 'flex-1'}
        `}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 bg-[#050505] z-0"></div>
        {/* Purple Ambient */}
        <div className="absolute inset-0 opacity-[0.15] transition-opacity duration-700" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #7000FF 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        
        <div 
          className={`absolute inset-0 bg-[#7000FF] mix-blend-overlay pointer-events-none transition-opacity duration-700 ${hoveredSide === 'right' ? 'opacity-10' : 'opacity-0'}`}
        />

        <div 
          className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#7000FF] rounded-full blur-[150px] pointer-events-none transition-all duration-700
            ${hoveredSide === 'right' ? 'opacity-30 scale-125' : 'opacity-10 scale-100'}
          `}
        />

        <motion.div 
          className="relative z-10 px-8 text-center flex flex-col items-center w-full max-w-lg pt-12 md:pt-0"
          style={{ y: contentYRight }}
        >
            <div className={`transition-transform duration-700 ${hoveredSide === 'right' ? 'scale-110' : 'scale-100'}`}>
              <Disc size={40} md:size={48} className="text-[#7000FF] mb-6 md:mb-8 drop-shadow-[0_0_15px_rgba(112,0,255,0.5)]" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white mb-2 uppercase drop-shadow-md">
              Ran$om<span className="text-[#7000FF]">.</span>
            </h2>
            <p className="text-[#7000FF] font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">
              The Reality Engineer
            </p>
            <div className={`transition-all duration-700 overflow-hidden ${hoveredSide === 'right' ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'} hidden md:block`}>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                Calm. Calculated. Operating the master console to manipulate time and gravity through pure sub-bass.
              </p>
            </div>
        </motion.div>
      </motion.div>

      {/* Central Title Card (Absolute Center) */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none w-[85%] sm:w-[70%] md:w-auto"
        style={{ opacity, scale }}
      >
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
           className={`text-center transition-all duration-700 rounded-2xl p-6 md:p-10 backdrop-blur-xl border 
             ${hoveredSide === 'left' ? 'bg-[#39FF14]/5 border-[#39FF14]/30 shadow-[0_0_50px_rgba(57,255,20,0.2)]' : 
               hoveredSide === 'right' ? 'bg-[#7000FF]/5 border-[#7000FF]/30 shadow-[0_0_50px_rgba(112,0,255,0.2)]' : 
               'bg-black/50 border-white/10 shadow-2xl'}
           `}
        >
          <p className="text-white/50 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.5em] mb-4 font-bold">
            Rhythmatik, INC. Presents
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter text-white uppercase mb-3 drop-shadow-lg">
            The Split <br/> <span className={`transition-colors duration-700 ${hoveredSide === 'left' ? 'text-[#39FF14]' : hoveredSide === 'right' ? 'text-[#7000FF]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#7000FF]'}`}>Frequency</span>
          </h1>
          <p className="text-white/60 text-xs md:text-sm font-light mb-8 max-w-[280px] mx-auto hidden sm:block">
            One supernatural event. Two distinct realities. Choose your frequency.
          </p>
          <button className={`pointer-events-auto group px-6 py-4 md:px-8 font-bold tracking-widest text-[9px] md:text-[10px] uppercase transition-all duration-300 inline-flex items-center gap-3
            ${hoveredSide === 'left' ? 'bg-[#39FF14] text-black hover:bg-white' : 
              hoveredSide === 'right' ? 'bg-[#7000FF] text-white hover:bg-white hover:text-black' : 
              'bg-white text-black hover:bg-transparent hover:text-white border border-white'}
          `}>
            <Play size={14} className={hoveredSide === null ? 'group-hover:text-[#39FF14] transition-colors' : ''} /> 
            Enter The Universe
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity }}
      >
        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-[1px] h-8 transition-colors duration-700 ${
            hoveredSide === 'left' ? 'bg-gradient-to-b from-[#39FF14] to-transparent' : 
            hoveredSide === 'right' ? 'bg-gradient-to-b from-[#7000FF] to-transparent' : 
            'bg-gradient-to-b from-white/50 to-transparent'
          }`}
        />
      </motion.div>

    </section>
  );
}
