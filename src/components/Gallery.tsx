import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Maximize2, 
  Sliders, 
  Play, 
  Pause, 
  Download, 
  Activity, 
  Eye, 
  Zap, 
  Disc, 
  Radio, 
  X,
  Volume2
} from 'lucide-react';

export interface ArtPiece {
  id: string;
  catalogNumber: string;
  title: string;
  subtitle: string;
  persona: 'Rarri2Trill' | 'Ran$omonthabeaT' | 'BeatHackd Universe';
  themeColor: string;
  secondaryColor: string;
  frequency: string;
  bpm: string;
  description: string;
  visualType: 'split' | 'shockwave' | 'console' | 'monolith' | 'relic' | 'nexus';
}

const ART_PIECES: ArtPiece[] = [
  {
    id: 'split-frequency',
    catalogNumber: 'RHY-ART-001',
    title: 'The Split Frequency',
    subtitle: 'Dimensional Singularity & Dual Harmonic Tear',
    persona: 'BeatHackd Universe',
    themeColor: '#39FF14',
    secondaryColor: '#00FFFF',
    frequency: '432 Hz',
    bpm: '140 BPM',
    description: 'The exact microsecond of the supernatural event that cleaved reality in two. High-voltage neon green kinetic energy clashes against calculated electric cyan architectural sub-frequencies, forming a sonic fracture across space-time.',
    visualType: 'split',
  },
  {
    id: 'rarri-sonic-shockwave',
    catalogNumber: 'RHY-ART-002',
    title: 'Rarri2Trill: Sonic Shockwave',
    subtitle: 'Acoustic Weaponry & Kinetic Rap Ignition',
    persona: 'Rarri2Trill',
    themeColor: '#39FF14',
    secondaryColor: '#FFFFFF',
    frequency: '808 Hz',
    bpm: '165 BPM',
    description: 'Vocal cords weaponized into sheer kinetic force. Concentric shockwaves radiate from the central microphone core, tearing through stage boundaries with hyper-saturated neon green acoustic laser filaments.',
    visualType: 'shockwave',
  },
  {
    id: 'ransom-master-console',
    catalogNumber: 'RHY-ART-003',
    title: 'Ran$om: Master Console Matrix',
    subtitle: 'Quantum Audio Engineering & Reality Modulator',
    persona: 'Ran$omonthabeaT',
    themeColor: '#00FFFF',
    secondaryColor: '#7000FF',
    frequency: '528 Hz',
    bpm: '124 BPM',
    description: 'Behind the mixing desk of the cosmos. Glowing electric cyan and deep indigo patch matrices warp gravitational constants as precision knobs dial into the fundamental architecture of the universe.',
    visualType: 'console',
  },
  {
    id: 'beathackd-monolith',
    catalogNumber: 'RHY-ART-004',
    title: 'BeatHackd: Monolith Sanctum',
    subtitle: 'Towering Sub-Bass Obelisks in the Cyber Void',
    persona: 'BeatHackd Universe',
    themeColor: '#39FF14',
    secondaryColor: '#00FFFF',
    frequency: '33 Hz',
    bpm: '130 BPM',
    description: 'Monumental speaker towers erected on the digital badlands of West Texas. Low-frequency standing waves vibrate through the metallic sands, illuminating isometric gridlines beneath a starry nebula.',
    visualType: 'monolith',
  },
  {
    id: 'zero-g-turntable',
    catalogNumber: 'RHY-ART-005',
    title: 'Relic of the Ancients: Zero-G Turntable',
    subtitle: 'Levitating Vinyl Core & Plasma Slipmat',
    persona: 'Ran$omonthabeaT',
    themeColor: '#00FFFF',
    secondaryColor: '#39FF14',
    frequency: '33⅓ RPM',
    bpm: '98 BPM',
    description: 'An ancient analog turntable floating in an anti-gravity chamber. As the holographic tonearm tracks glowing optical microgrooves, plasma arcs pulse in synchrony with subterranean synth rhythms.',
    visualType: 'relic',
  },
  {
    id: 'odessa-sub-nexus',
    catalogNumber: 'RHY-ART-006',
    title: 'Odessa Sub-Bass Nexus',
    subtitle: 'Tectonic Low-End Harmonic Resonator',
    persona: 'Rarri2Trill',
    themeColor: '#39FF14',
    secondaryColor: '#FF0055',
    frequency: '24 Hz',
    bpm: '150 BPM',
    description: 'Born in the industrial heartland between San Angelo and Odessa. Heavy industrial bass rumbles up through structural steel, generating kaleidoscopic soundwave halos across the night sky.',
    visualType: 'nexus',
  }
];

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resonanceLevel, setResonanceLevel] = useState(65);
  const [paletteMode, setPaletteMode] = useState<'default' | 'rarri' | 'ransom'>('default');
  const [waveSpeed, setWaveSpeed] = useState(1);
  const [pulseTick, setPulseTick] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const activeArt = ART_PIECES[currentIndex];

  // Procedural animation loop for dynamic canvas effects
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((t) => (t + 1) % 360);
    }, 40 / waveSpeed);
    return () => clearInterval(timer);
  }, [waveSpeed]);

  // Autoplay carousel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ART_PIECES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ART_PIECES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ART_PIECES.length) % ART_PIECES.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape' && isModalOpen) setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Determine active colors based on palette override or artwork defaults
  const activeColor1 = 
    paletteMode === 'rarri' ? '#39FF14' : 
    paletteMode === 'ransom' ? '#00FFFF' : 
    activeArt.themeColor;

  const activeColor2 = 
    paletteMode === 'rarri' ? '#1aff00' : 
    paletteMode === 'ransom' ? '#0077ff' : 
    activeArt.secondaryColor;

  return (
    <section id="gallery" className="relative py-28 bg-[#040404] text-white overflow-hidden border-t border-white/5">
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${activeColor1} 0%, ${activeColor2} 60%, transparent 100%)`
        }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${activeColor1} 1px, transparent 1px), linear-gradient(90deg, ${activeColor1} 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="p-1.5 rounded bg-white/5 border border-white/10 text-brand-green">
                <Sparkles size={16} />
              </span>
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/50">
                Visual Artifacts // Generative Vault
              </span>
              <div className="h-[1px] w-12 bg-brand-green/40" />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
              THE FREQUENCY <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-[#00FFFF]">GALLERY</span>
            </h2>
            <p className="mt-4 text-white/60 text-sm md:text-base font-light max-w-xl">
              Immerse yourself in dynamic visual artifacts generated from the split frequency lore of Rhythmatik, bridging high-voltage performance with architectural precision.
            </p>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Palette Switcher */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-1 flex items-center gap-1 text-[11px] font-mono">
              <button 
                onClick={() => setPaletteMode('default')}
                className={`px-3 py-1.5 rounded transition-all ${paletteMode === 'default' ? 'bg-white/20 text-white font-bold' : 'text-white/50 hover:text-white'}`}
              >
                ORIGINAL
              </button>
              <button 
                onClick={() => setPaletteMode('rarri')}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all ${paletteMode === 'rarri' ? 'bg-brand-green/20 text-brand-green font-bold border border-brand-green/40' : 'text-white/50 hover:text-brand-green'}`}
              >
                <span className="w-2 h-2 rounded-full bg-brand-green"></span>
                RARRI
              </button>
              <button 
                onClick={() => setPaletteMode('ransom')}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all ${paletteMode === 'ransom' ? 'bg-[#00FFFF]/20 text-[#00FFFF] font-bold border border-[#00FFFF]/40' : 'text-white/50 hover:text-[#00FFFF]'}`}
              >
                <span className="w-2 h-2 rounded-full bg-[#00FFFF]"></span>
                RAN$OM
              </button>
            </div>

            {/* Quick Tuner Button */}
            <button
              onClick={() => setShowControls(!showControls)}
              className={`p-2.5 rounded-lg border transition-all flex items-center gap-2 text-xs font-mono tracking-wider ${
                showControls ? 'bg-white/20 border-white text-white' : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/20'
              }`}
              title="Sonic Controls"
            >
              <Sliders size={15} />
              <span className="hidden sm:inline">MODULATE</span>
            </button>
          </div>
        </div>

        {/* Collapsible Tuning Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
                    <span>RESONANCE GAIN</span>
                    <span className="text-brand-green font-bold">{resonanceLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={resonanceLevel}
                    onChange={(e) => setResonanceLevel(Number(e.target.value))}
                    className="w-full accent-brand-green cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
                    <span>OSCILLATOR SPEED</span>
                    <span className="text-[#00FFFF] font-bold">{waveSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.5"
                    value={waveSpeed}
                    onChange={(e) => setWaveSpeed(Number(e.target.value))}
                    className="w-full accent-[#00FFFF] cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10">
                  <span className="text-xs font-mono text-white/50">SYNCHRONIZE TICK</span>
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-xs text-white/80">
                    PHASE {pulseTick}°
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Carousel Stage */}
        <div className="relative group">
          {/* Main Display Card */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/8] rounded-2xl overflow-hidden border border-white/10 bg-[#080808] shadow-2xl">
            {/* Visual Canvas Artwork Component */}
            <DynamicArtworkCanvas 
              art={activeArt}
              primaryColor={activeColor1}
              secondaryColor={activeColor2}
              resonance={resonanceLevel}
              tick={pulseTick}
            />

            {/* Vignette & Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/80 pointer-events-none" />

            {/* Catalog & Persona Badge Top Left */}
            <div className="absolute top-6 left-6 z-20 flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/20 font-mono text-[10px] tracking-widest text-white/90 uppercase">
                {activeArt.catalogNumber}
              </span>
              <span 
                className="px-3 py-1 rounded font-mono text-[10px] tracking-widest uppercase font-bold backdrop-blur-md border"
                style={{
                  backgroundColor: `${activeColor1}15`,
                  borderColor: `${activeColor1}50`,
                  color: activeColor1
                }}
              >
                {activeArt.persona}
              </span>
            </div>

            {/* Stage Action Controls Top Right */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/90 transition-all"
                title={isPlaying ? 'Pause Auto-Advance' : 'Resume Auto-Advance'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="text-brand-green" />}
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-10 h-10 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/90 transition-all"
                title="Expand Fullscreen Lightbox"
              >
                <Maximize2 size={16} />
              </button>
            </div>

            {/* Info Overlay Bottom Area */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-xs font-mono text-white/60 mb-2">
                  <span className="flex items-center gap-1.5" style={{ color: activeColor1 }}>
                    <Activity size={13} /> {activeArt.frequency}
                  </span>
                  <span>//</span>
                  <span className="text-white/80">{activeArt.bpm}</span>
                  <span>//</span>
                  <span className="text-white/40 uppercase">{activeArt.subtitle}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2 leading-none uppercase drop-shadow-lg">
                  {activeArt.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-xl line-clamp-2 md:line-clamp-3">
                  {activeArt.description}
                </p>
              </div>

              {/* View Full Artifact Button */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-lg"
                  style={{
                    backgroundColor: activeColor1,
                    color: '#000000',
                  }}
                >
                  <Eye size={15} /> Inspect Master Piece
                </button>
              </div>
            </div>

            {/* Left / Right Carousel Arrow Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-80"
              aria-label="Previous artwork"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-80"
              aria-label="Next artwork"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Autoplay Progress Line */}
          <div className="w-full bg-white/10 h-1 mt-4 rounded-full overflow-hidden">
            <motion.div 
              key={`${currentIndex}-${isPlaying}`}
              initial={{ width: '0%' }}
              animate={{ width: isPlaying ? '100%' : '0%' }}
              transition={{ duration: 6, ease: 'linear' }}
              className="h-full"
              style={{ backgroundColor: activeColor1 }}
            />
          </div>
        </div>

        {/* Carousel Thumbnail Strip */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
              Artifact Reel ({currentIndex + 1} / {ART_PIECES.length})
            </span>
            <span className="font-mono text-[11px] text-white/40">
              Use arrow keys or select slide
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ART_PIECES.map((piece, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={piece.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`group relative text-left rounded-xl overflow-hidden p-3 transition-all duration-300 border flex flex-col justify-between h-28 ${
                    isSelected 
                      ? 'bg-white/10 border-white shadow-[0_0_20px_rgba(255,255,255,0.15)] ring-1 ring-white' 
                      : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.08]'
                  }`}
                >
                  {/* Subtle Mini Preview Background */}
                  <div 
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, ${piece.themeColor}30 0%, ${piece.secondaryColor}10 100%)`
                    }}
                  />

                  <div className="relative z-10 flex justify-between items-start">
                    <span className="font-mono text-[9px] tracking-wider text-white/50">
                      {piece.catalogNumber}
                    </span>
                    <span 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: piece.themeColor }}
                    />
                  </div>

                  <div className="relative z-10">
                    <h4 className="font-display text-xs font-bold text-white truncate">
                      {piece.title}
                    </h4>
                    <span className="font-mono text-[9px] text-white/40 block truncate mt-0.5">
                      {piece.frequency}
                    </span>
                  </div>

                  {isSelected && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: piece.themeColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10"
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-[#0a0a0a] border border-white/20 rounded-2xl p-6 md:p-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/20"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>

              {/* Modal Top Metadata */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded bg-white/10 font-mono text-xs text-white/80">
                  {activeArt.catalogNumber}
                </span>
                <span 
                  className="px-3 py-1 rounded font-mono text-xs font-bold"
                  style={{
                    backgroundColor: `${activeColor1}20`,
                    color: activeColor1
                  }}
                >
                  {activeArt.persona}
                </span>
                <span className="font-mono text-xs text-white/40">
                  ARCHIVED MASTER FILE
                </span>
              </div>

              {/* Big Visual Canvas */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/20 shadow-2xl mb-8 bg-black">
                <DynamicArtworkCanvas 
                  art={activeArt}
                  primaryColor={activeColor1}
                  secondaryColor={activeColor2}
                  resonance={resonanceLevel}
                  tick={pulseTick}
                  detailed
                />
              </div>

              {/* Artwork Deep Dive Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="font-display text-3xl md:text-4xl font-black italic tracking-tight uppercase text-white mb-2">
                    {activeArt.title}
                  </h3>
                  <div className="font-mono text-xs uppercase tracking-widest text-brand-green mb-4">
                    {activeArt.subtitle}
                  </div>
                  <p className="text-white/70 font-light leading-relaxed text-sm md:text-base mb-6">
                    {activeArt.description}
                  </p>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-white/60 space-y-2">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>Curated Universe</span>
                      <span className="text-white">BeatHackd Multiverse Architecture</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>Sonic Signature</span>
                      <span style={{ color: activeColor1 }}>{activeArt.frequency} @ {activeArt.bpm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resolution Fidelity</span>
                      <span className="text-white">Vector Real-Time Oscilloscope [4K Pro]</span>
                    </div>
                  </div>
                </div>

                {/* Right Rail Details */}
                <div className="flex flex-col justify-between p-6 rounded-xl bg-white/[0.03] border border-white/10">
                  <div>
                    <h4 className="font-mono text-xs tracking-widest uppercase text-white/40 mb-4">
                      FREQUENCY MODES
                    </h4>
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-white/70">
                        <span>Acoustic Output</span>
                        <span className="text-brand-green font-bold">128.4 dB</span>
                      </div>
                      <div className="flex items-center justify-between text-white/70">
                        <span>Sub-Harmonics</span>
                        <span className="text-[#00FFFF] font-bold">Sub-bass active</span>
                      </div>
                      <div className="flex items-center justify-between text-white/70">
                        <span>Duality Sync</span>
                        <span className="text-white font-bold">LOCKED</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <button
                      onClick={() => {
                        handleNext();
                      }}
                      className="w-full py-3 rounded-lg border border-white/20 text-white font-mono text-xs tracking-widest uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      Next Piece in Vault <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * Dynamic Procedural SVG Canvas
 * Renders cinematic, responsive vector art pieces matching Rhythmatik's cybernetic music aesthetic
 */
interface CanvasProps {
  art: ArtPiece;
  primaryColor: string;
  secondaryColor: string;
  resonance: number;
  tick: number;
  detailed?: boolean;
}

function DynamicArtworkCanvas({ art, primaryColor, secondaryColor, resonance, tick, detailed = false }: CanvasProps) {
  const amp = resonance / 50;
  const sinVal = Math.sin((tick * Math.PI) / 180);
  const cosVal = Math.cos((tick * Math.PI) / 180);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] flex items-center justify-center select-none">
      <svg 
        viewBox="0 0 1600 900" 
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`glow-${art.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={detailed ? "12" : "8"} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id={`grad-split-${art.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.8" />
          </linearGradient>

          <radialGradient id={`core-glow-${art.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.4" />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Dark Background with Grid */}
        <rect width="1600" height="900" fill="#030303" />

        {/* Perspective Grid Background */}
        <g stroke={secondaryColor} strokeOpacity="0.08" strokeWidth="1">
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={`vert-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="900" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`horiz-${i}`} x1="0" y1={i * 100} x2="1600" y2={i * 100} />
          ))}
        </g>

        {/* Glowing Center Core */}
        <circle cx="800" cy="450" r={280 + sinVal * 20 * amp} fill={`url(#core-glow-${art.id})`} />

        {/* RENDER DYNAMIC VISUAL BY TYPE */}
        {art.visualType === 'split' && (
          <g>
            {/* Left Rarri Energy Field */}
            <circle cx="500" cy="450" r={200 + sinVal * 30} fill={primaryColor} opacity="0.06" filter={`url(#glow-${art.id})`} />
            {/* Right Ran$om Energy Field */}
            <circle cx="1100" cy="450" r={200 - sinVal * 30} fill={secondaryColor} opacity="0.06" filter={`url(#glow-${art.id})`} />

            {/* Dimensional Split Lightning Tear */}
            <path
              d={`M 800,0 
                  Q ${780 + sinVal * 40 * amp},250 810,400 
                  T ${790 - cosVal * 40 * amp},600 
                  T 800,900`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              filter={`url(#glow-${art.id})`}
            />
            <path
              d={`M 800,0 
                  Q ${820 + sinVal * 60 * amp},200 780,450 
                  T ${830 - sinVal * 60 * amp},700 
                  T 800,900`}
              fill="none"
              stroke={primaryColor}
              strokeWidth="2"
              opacity="0.8"
            />
            <path
              d={`M 800,0 
                  Q ${760 - cosVal * 60 * amp},220 820,470 
                  T ${770 + cosVal * 60 * amp},680 
                  T 800,900`}
              fill="none"
              stroke={secondaryColor}
              strokeWidth="2"
              opacity="0.8"
            />

            {/* Oscilloscope Frequency Wave crossing the rift */}
            {Array.from({ length: 5 }).map((_, wIdx) => {
              const offset = (wIdx - 2) * 50;
              const points = Array.from({ length: 32 }).map((__, pIdx) => {
                const x = (pIdx / 31) * 1600;
                const waveAmp = (Math.sin((pIdx + tick * 0.1) * 0.5) * 60 + Math.cos(pIdx * 0.8) * 30) * amp;
                const y = 450 + offset + waveAmp;
                return `${x},${y}`;
              }).join(' ');

              return (
                <polyline
                  key={`wave-${wIdx}`}
                  points={points}
                  fill="none"
                  stroke={wIdx % 2 === 0 ? primaryColor : secondaryColor}
                  strokeWidth={wIdx === 2 ? "3" : "1.5"}
                  strokeOpacity={0.4 + wIdx * 0.1}
                />
              );
            })}

            {/* Orbiting Frequency Particles */}
            {Array.from({ length: 18 }).map((_, pIdx) => {
              const angle = (pIdx * 20 + tick * 1.5) * (Math.PI / 180);
              const radius = 220 + (pIdx % 3) * 60;
              const px = 800 + Math.cos(angle) * radius;
              const py = 450 + Math.sin(angle) * (radius * 0.6);
              const color = pIdx % 2 === 0 ? primaryColor : secondaryColor;
              return (
                <circle
                  key={`particle-${pIdx}`}
                  cx={px}
                  cy={py}
                  r={3 + (pIdx % 3)}
                  fill={color}
                  filter={`url(#glow-${art.id})`}
                />
              );
            })}
          </g>
        )}

        {art.visualType === 'shockwave' && (
          <g>
            {/* Concentric Acoustic Shockwave Rings */}
            {Array.from({ length: 8 }).map((_, rIdx) => {
              const r = ((rIdx * 70 + tick * 2) % 560) * amp;
              const opacity = Math.max(0, 1 - r / 560);
              return (
                <circle
                  key={`ring-${rIdx}`}
                  cx="800"
                  cy="450"
                  r={r}
                  fill="none"
                  stroke={primaryColor}
                  strokeWidth="2.5"
                  strokeOpacity={opacity * 0.7}
                  filter={`url(#glow-${art.id})`}
                />
              );
            })}

            {/* Angled Stage Laser Filaments */}
            {Array.from({ length: 14 }).map((_, lIdx) => {
              const angle = (lIdx * (360 / 14) + tick * 0.5) * (Math.PI / 180);
              const x2 = 800 + Math.cos(angle) * 900;
              const y2 = 450 + Math.sin(angle) * 900;
              return (
                <line
                  key={`laser-${lIdx}`}
                  x1="800"
                  y1="450"
                  x2={x2}
                  y2={y2}
                  stroke={primaryColor}
                  strokeWidth="1.5"
                  strokeOpacity="0.25"
                />
              );
            })}

            {/* Center Acoustic Core / Microphone Singularity */}
            <circle cx="800" cy="450" r="45" fill="#000000" stroke={primaryColor} strokeWidth="4" />
            <polygon 
              points="800,420 825,465 775,465"
              fill={primaryColor}
              filter={`url(#glow-${art.id})`}
            />
          </g>
        )}

        {art.visualType === 'console' && (
          <g>
            {/* Modular Synthesizer Grid & Patch Cord Matrix */}
            <rect x="250" y="200" width="1100" height="500" rx="20" fill="#080808" stroke={primaryColor} strokeWidth="2" strokeOpacity="0.5" />

            {/* Equalizer Spectrum Columns */}
            {Array.from({ length: 28 }).map((_, bIdx) => {
              const colHeight = (Math.sin(bIdx * 0.6 + tick * 0.2) * 90 + 110) * amp;
              const bx = 320 + bIdx * 35;
              const by = 550 - colHeight;
              return (
                <g key={`eq-${bIdx}`}>
                  <rect
                    x={bx}
                    y={by}
                    width="20"
                    height={colHeight}
                    rx="3"
                    fill={bIdx % 2 === 0 ? primaryColor : secondaryColor}
                    opacity="0.8"
                    filter={`url(#glow-${art.id})`}
                  />
                  <circle cx={bx + 10} cy={by - 10} r="3" fill="#ffffff" />
                </g>
              );
            })}

            {/* Glowing Dials & Knobs */}
            {Array.from({ length: 8 }).map((_, kIdx) => {
              const kx = 350 + kIdx * 125;
              const ky = 300;
              const rot = (tick * 1.5 + kIdx * 45) % 360;
              return (
                <g key={`knob-${kIdx}`} transform={`translate(${kx}, ${ky})`}>
                  <circle cx="0" cy="0" r="32" fill="#121212" stroke={secondaryColor} strokeWidth="2" />
                  <line
                    x1="0"
                    y1="0"
                    x2={Math.cos((rot * Math.PI) / 180) * 26}
                    y2={Math.sin((rot * Math.PI) / 180) * 26}
                    stroke={primaryColor}
                    strokeWidth="3"
                  />
                </g>
              );
            })}

            {/* Patch Cables flowing */}
            <path
              d={`M 350,300 C 500,480 700,500 850,300`}
              fill="none"
              stroke={primaryColor}
              strokeWidth="3"
              strokeDasharray="6 4"
            />
            <path
              d={`M 600,300 C 750,490 950,510 1100,300`}
              fill="none"
              stroke={secondaryColor}
              strokeWidth="3"
              strokeDasharray="8 6"
            />
          </g>
        )}

        {art.visualType === 'monolith' && (
          <g>
            {/* Isometric Cybernetic Floor */}
            <g opacity="0.4">
              {Array.from({ length: 12 }).map((_, mIdx) => (
                <line
                  key={`iso-${mIdx}`}
                  x1={800 - mIdx * 80}
                  y1={500 + mIdx * 35}
                  x2={800 + mIdx * 80}
                  y2={500 + mIdx * 35}
                  stroke={secondaryColor}
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* Left Monolith */}
            <rect x="420" y="240" width="130" height="420" rx="8" fill="#0d0d0d" stroke={primaryColor} strokeWidth="3" />
            <circle cx="485" cy="340" r="40" fill="#000000" stroke={primaryColor} strokeWidth="2" />
            <circle cx="485" cy="480" r="55" fill="#000000" stroke={primaryColor} strokeWidth="2" />
            <circle cx="485" cy="600" r="25" fill="#000000" stroke={primaryColor} strokeWidth="2" />

            {/* Center Colossal Monolith */}
            <rect x="720" y="160" width="160" height="520" rx="10" fill="#111111" stroke="#ffffff" strokeWidth="3" filter={`url(#glow-${art.id})`} />
            <circle cx="800" cy="280" r="50" fill="#000000" stroke={primaryColor} strokeWidth="3" />
            <circle cx="800" cy="450" r="75" fill="#000000" stroke={secondaryColor} strokeWidth="3" />
            <circle cx="800" cy="590" r="35" fill="#000000" stroke={primaryColor} strokeWidth="2" />

            {/* Right Monolith */}
            <rect x="1050" y="240" width="130" height="420" rx="8" fill="#0d0d0d" stroke={secondaryColor} strokeWidth="3" />
            <circle cx="1115" cy="340" r="40" fill="#000000" stroke={secondaryColor} strokeWidth="2" />
            <circle cx="1115" cy="480" r="55" fill="#000000" stroke={secondaryColor} strokeWidth="2" />
            <circle cx="1115" cy="600" r="25" fill="#000000" stroke={secondaryColor} strokeWidth="2" />

            {/* Sound Beam Linking Monoliths */}
            <line
              x1="485"
              y1="480"
              x2="800"
              y2="450"
              stroke={primaryColor}
              strokeWidth="3"
              strokeDasharray="8 6"
              filter={`url(#glow-${art.id})`}
            />
            <line
              x1="800"
              y1="450"
              x2="1115"
              y2="480"
              stroke={secondaryColor}
              strokeWidth="3"
              strokeDasharray="8 6"
              filter={`url(#glow-${art.id})`}
            />
          </g>
        )}

        {art.visualType === 'relic' && (
          <g>
            {/* Spinning Holographic Turntable Disc */}
            <g transform={`translate(800, 450) rotate(${tick * 1.2})`}>
              <circle cx="0" cy="0" r="240" fill="#0a0a0a" stroke={primaryColor} strokeWidth="4" />
              {Array.from({ length: 12 }).map((_, gIdx) => (
                <circle
                  key={`groove-${gIdx}`}
                  cx="0"
                  cy="0"
                  r={50 + gIdx * 15}
                  fill="none"
                  stroke={gIdx % 3 === 0 ? primaryColor : '#222222'}
                  strokeWidth="1.2"
                  opacity={gIdx % 3 === 0 ? "0.8" : "0.5"}
                />
              ))}
              {/* Vinyl Center Label */}
              <circle cx="0" cy="0" r="45" fill={primaryColor} />
              <circle cx="0" cy="0" r="8" fill="#000000" />
            </g>

            {/* Levitating Optical Tonearm */}
            <g transform="translate(1080, 240)">
              <circle cx="0" cy="0" r="24" fill="#222" stroke="#fff" strokeWidth="2" />
              <line x1="0" y1="0" x2="-220" y2="160" stroke="#fff" strokeWidth="4" />
              <circle cx="-220" cy="160" r="10" fill={secondaryColor} filter={`url(#glow-${art.id})`} />
            </g>

            {/* Electric Arcs pulsing */}
            {Array.from({ length: 6 }).map((_, aIdx) => {
              const angle = (aIdx * 60 + tick * 2) * (Math.PI / 180);
              const x1 = 800 + Math.cos(angle) * 240;
              const y1 = 450 + Math.sin(angle) * 240;
              const x2 = 800 + Math.cos(angle) * 310;
              const y2 = 450 + Math.sin(angle) * 310;
              return (
                <line
                  key={`arc-${aIdx}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={secondaryColor}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  filter={`url(#glow-${art.id})`}
                />
              );
            })}
          </g>
        )}

        {art.visualType === 'nexus' && (
          <g>
            {/* Tectonic Bass Ripples */}
            {Array.from({ length: 7 }).map((_, nIdx) => {
              const radius = 120 + nIdx * 65 + sinVal * 20;
              return (
                <polygon
                  key={`poly-${nIdx}`}
                  points={Array.from({ length: 6 }).map((__, ptIdx) => {
                    const angle = (ptIdx * 60 + tick * 0.8 + nIdx * 15) * (Math.PI / 180);
                    const px = 800 + Math.cos(angle) * radius;
                    const py = 450 + Math.sin(angle) * (radius * 0.85);
                    return `${px},${py}`;
                  }).join(' ')}
                  fill="none"
                  stroke={nIdx % 2 === 0 ? primaryColor : secondaryColor}
                  strokeWidth={nIdx === 0 ? "4" : "1.8"}
                  strokeOpacity={0.8 - nIdx * 0.1}
                  filter={nIdx === 0 ? `url(#glow-${art.id})` : undefined}
                />
              );
            })}

            {/* Central Pulse Generator */}
            <circle cx="800" cy="450" r="50" fill={primaryColor} opacity="0.2" />
            <circle cx="800" cy="450" r="25" fill="#ffffff" filter={`url(#glow-${art.id})`} />
          </g>
        )}

        {/* Foreground Digital Watermark & Audio Meta */}
        <text 
          x="60" 
          y="850" 
          fill="#ffffff" 
          fillOpacity="0.4" 
          fontFamily="monospace" 
          fontSize="18" 
          letterSpacing="4"
        >
          RHYTHMATIK AUDIO VAULT // {art.catalogNumber} // {art.frequency}
        </text>

        <text 
          x="1540" 
          y="850" 
          textAnchor="end"
          fill={primaryColor} 
          fillOpacity="0.7" 
          fontFamily="monospace" 
          fontSize="18" 
          letterSpacing="3"
        >
          [DYNAMIC FREQUENCY RENDER]
        </text>
      </svg>
    </div>
  );
}
