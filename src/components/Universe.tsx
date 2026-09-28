import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Zap, X, ChevronRight, ChevronLeft, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';

const COMICS = [
  {
    id: 1,
    title: "Issue #01: The Split Frequency",
    description: "The supernatural event that shattered reality, dividing one soul into two distinct frequencies.",
    cover: "https://images.unsplash.com/photo-1618519764620-7403abdbdf9c?q=80&w=500&auto=format&fit=crop",
    accent: "group-hover:border-brand-green/50",
    buttonColor: "bg-brand-green text-black hover:bg-white hover:text-black",
    panels: [
      "https://images.unsplash.com/photo-1618519764620-7403abdbdf9c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1200&auto=format&fit=crop"
    ],
    price: "$4.99"
  },
  {
    id: 2,
    title: "Issue #02: Console Gods",
    description: "Ran$om discovers the master console of the universe, where turning a knob alters gravity itself.",
    cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500&auto=format&fit=crop",
    accent: "group-hover:border-brand-purple/50",
    buttonColor: "bg-brand-purple text-white hover:bg-white hover:text-black",
    panels: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200&auto=format&fit=crop"
    ],
    price: "$4.99"
  },
  {
    id: 3,
    title: "Issue #03: Neon Prophets",
    description: "Rarri2Trill weaponizes his voice, sending shockwaves that disrupt the established order of the city.",
    cover: "https://images.unsplash.com/photo-1558865869-c93f6f8482af?q=80&w=500&auto=format&fit=crop",
    accent: "group-hover:border-white/50",
    buttonColor: "bg-white text-black hover:bg-white/80 hover:text-black",
    panels: [
      "https://images.unsplash.com/photo-1558865869-c93f6f8482af?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1200&auto=format&fit=crop"
    ],
    price: "$4.99"
  }
];

const CHARACTERS = [
  {
    id: "rarri",
    name: "Rarri2Trill",
    alias: "The Frequency Frontman",
    role: "Sonic Weaponized",
    description: "Armed with vocal frequencies that shatter physical barriers. His words shape the immediate reality around him, manifesting pure kinetic energy from soundwaves.",
    image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop",
    accent: "text-brand-green",
    border: "border-brand-green",
    shadow: "shadow-[0_0_30px_rgba(57,255,20,0.15)]",
    bg: "bg-brand-green/10"
  },
  {
    id: "ransom",
    name: "Ran$omonthabeaT",
    alias: "Architect of Sound",
    role: "Reality Engineer",
    description: "A mastermind operating from the shadows. By manipulating sub-bass and high-hat frequencies on the universal console, he controls time, space, and gravity.",
    image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=600&auto=format&fit=crop",
    accent: "text-brand-purple",
    border: "border-brand-purple",
    shadow: "shadow-[0_0_30px_rgba(112,0,255,0.15)]",
    bg: "bg-brand-purple/10"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export function Universe() {
  const [activeComic, setActiveComic] = useState<typeof COMICS[0] | null>(null);
  const [currentPanel, setCurrentPanel] = useState(0);

  const openComic = (comic: typeof COMICS[0]) => {
    setActiveComic(comic);
    setCurrentPanel(0);
    document.body.style.overflow = 'hidden';
  };

  const closeComic = () => {
    setActiveComic(null);
    document.body.style.overflow = 'unset';
  };

  const nextPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeComic && currentPanel < activeComic.panels.length - 1) {
      setCurrentPanel(prev => prev + 1);
    }
  };

  const prevPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPanel > 0) {
      setCurrentPanel(prev => prev - 1);
    }
  };

  return (
    <section id="comics-section" className="py-32 relative bg-[#020202]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)", backgroundSize: "100px 100px" }}></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green rounded-full blur-[200px] opacity-[0.03]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple rounded-full blur-[200px] opacity-[0.03]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-24 flex flex-col md:flex-row gap-12 items-end justify-between">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-4 mb-6"
            >
              <BookOpen size={16} className="text-[#39FF14]" />
              <h2 className="font-display font-medium text-[10px] tracking-[0.3em] uppercase text-white/50">
                BeatHackd Universe
              </h2>
              <div className="h-[1px] w-12 bg-[#39FF14]/50"></div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-black italic tracking-tighter mb-6"
            >
              REALITY <span className="text-white/20">ENGINEERING</span>
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/60 font-light leading-relaxed text-sm md:text-base max-w-xl"
            >
              In the BeatHackd Universe, audio engineering is literally reality engineering. Frequencies dictate the laws of physics. The console is the master control. Discover the supernatural saga where two divided entities manipulate the fabric of existence through sound.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <button className="px-6 py-3 border border-white/20 text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all">
              Read Archive
            </button>
          </motion.div>
        </div>

        {/* Comic Covers */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
        >
          {COMICS.map((comic, index) => (
            <motion.div
              key={comic.id}
              variants={itemVariants}
              className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:bg-white/10 ${comic.accent}`}
            >
              <div 
                className="relative overflow-hidden rounded-xl aspect-[2/3] mb-6 bg-black cursor-pointer"
                onClick={() => openComic(comic)}
              >
                <img 
                  src={comic.cover} 
                  alt={comic.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                  <div className="absolute top-4 right-4 bg-brand-green text-black text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-sm">
                    Vol {comic.id}
                  </div>
                  <h4 className="font-display text-xl font-black italic tracking-tight text-white mb-2 leading-tight">
                    {comic.title}
                  </h4>
                  <p className="text-[11px] text-white/60 font-light leading-relaxed line-clamp-3 mb-4">
                    {comic.description}
                  </p>
                </div>
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className={`w-full py-2 text-[10px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 transition-all ${comic.buttonColor}`}>
                    <BookOpen size={14} /> Read Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Characters */}
        <div className="mb-12 text-center">
          <h3 className="text-sm font-mono tracking-[0.4em] uppercase text-white/40 mb-16">
            <span className="text-brand-green">///</span> Entity Profiles
          </h3>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24"
          >
            {CHARACTERS.map((char, index) => (
              <motion.div
                key={char.id}
                variants={itemVariants}
                className="flex flex-col text-left"
              >
                <div className={`relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden mb-8 border ${char.border} ${char.shadow}`}>
                  <img 
                    src={char.image} 
                    alt={char.name} 
                    className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent"></div>
                  <div className={`absolute top-0 left-0 w-full h-full ${char.bg} mix-blend-overlay pointer-events-none`}></div>
                  
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <Zap size={16} className={char.accent} />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/80">
                      {char.alias}
                    </span>
                  </div>
                </div>

                <div className="pl-4 border-l-2 border-white/10">
                  <h4 className={`font-display text-4xl lg:text-5xl font-black italic mb-2 tracking-tighter ${char.accent}`}>
                    {char.name}
                  </h4>
                  <div className="text-[10px] tracking-[0.3em] font-mono text-white/40 uppercase mb-4">
                    Class: <span className="text-white/80">{char.role}</span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed font-light max-w-md">
                    {char.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Comic Reader Modal */}
      <AnimatePresence>
        {activeComic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
            onClick={closeComic}
          >
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
              <button 
                className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-sm flex items-center gap-2 transition-all ${activeComic.buttonColor}`}
                onClick={(e) => e.stopPropagation()}
              >
                <ShoppingCart size={14} /> Purchase Print {activeComic.price}
              </button>
              <button 
                onClick={closeComic}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Reader Interface */}
            <div 
              className="relative w-full max-w-5xl h-[80vh] md:h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex flex-col items-center mb-6">
                <span className="text-white/40 font-mono text-[10px] tracking-widest uppercase mb-2">
                  Reading Issue #{activeComic.id.toString().padStart(2, '0')}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-black italic text-white uppercase text-center">
                  {activeComic.title.split(': ')[1]}
                </h3>
              </div>

              {/* Panel Container */}
              <div className="relative flex-1 rounded-lg overflow-hidden bg-[#111] border border-white/10 shadow-2xl flex items-center justify-center group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPanel}
                    src={activeComic.panels[currentPanel]}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-contain pointer-events-none"
                    alt={`Panel ${currentPanel + 1}`}
                  />
                </AnimatePresence>
                
                {/* Navigation Controls */}
                <button
                  onClick={prevPanel}
                  disabled={currentPanel === 0}
                  className={`absolute left-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all
                    ${currentPanel === 0 ? 'opacity-0 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white/20'}
                  `}
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={nextPanel}
                  disabled={currentPanel === activeComic.panels.length - 1}
                  className={`absolute right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all
                    ${currentPanel === activeComic.panels.length - 1 ? 'opacity-0 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white/20'}
                  `}
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center items-center gap-2 mt-6">
                {activeComic.panels.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentPanel ? 'w-8 bg-white' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
