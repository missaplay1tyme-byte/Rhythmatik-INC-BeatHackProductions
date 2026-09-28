import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, ExternalLink, Activity, Settings } from 'lucide-react';

const RELEASES = [
  {
    id: '1',
    title: 'The Split Frequency',
    type: 'Album',
    artist: 'Rarri2Trill',
    date: '2025',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop',
    platforms: ['Spotify', 'Apple Music'],
    tracks: [
      { id: 't1', title: 'Intro (The Split)', duration: '2:14' },
      { id: 't2', title: 'Neon Gods', duration: '3:45' },
      { id: 't3', title: 'Odessa to San Angelo', duration: '4:12' },
      { id: 't4', title: 'Frequency Frontman', duration: '2:58' },
    ]
  },
  {
    id: '2',
    title: 'BeatHack Instrumentals Vol. 1',
    type: 'EP',
    artist: 'Ran$omonthabeaT',
    date: '2024',
    cover: 'https://images.unsplash.com/photo-1598504780517-57355152ebdf?q=80&w=500&auto=format&fit=crop',
    platforms: ['Spotify', 'Tidal'],
    tracks: [
      { id: 't5', title: 'Matrix Architect', duration: '3:20' },
      { id: 't6', title: 'Sub-bass Ritual', duration: '2:55' },
      { id: 't7', title: 'Console Gods', duration: '4:01' },
    ]
  },
  {
    id: '3',
    title: 'F.L.Y. (Forever Loving You)',
    type: 'Single',
    artist: 'Rarri2Trill',
    date: '2024',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop',
    platforms: ['All Platforms'],
    tracks: [
      { id: 't8', title: 'F.L.Y.', duration: '3:10' },
      { id: 't9', title: 'F.L.Y. (Instrumental)', duration: '3:10' },
    ]
  }
];

export function Discography() {
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(32));
  const [visualizerMode, setVisualizerMode] = useState<'bars' | 'circular' | 'particles'>('bars');
  const [showSettings, setShowSettings] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        // Initialize Web Audio API
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtxRef.current = ctx;
        
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64; // Gives 32 frequency bins
        analyser.smoothingTimeConstant = 0.85;
        analyserRef.current = analyser;

        // Create an "engineering" signal (white noise + LFO + Filter)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        // Rhythm LFO
        const lfo = ctx.createOscillator();
        lfo.type = 'square';
        lfo.frequency.value = 1.5; // ~90 BPM rhythm

        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 1;
        lfo.connect(lfoGain.gain);

        noiseSource.connect(lfoGain);

        // Sweeping Bandpass Filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        
        const filterLfo = ctx.createOscillator();
        filterLfo.type = 'sine';
        filterLfo.frequency.value = 0.1; // Slow sweep
        const filterGain = ctx.createGain();
        filterGain.gain.value = 1500;
        filterLfo.connect(filterGain);
        filterGain.connect(filter.frequency);

        lfoGain.connect(filter);
        filter.connect(analyser);

        // Mute actual output, we only want the visual data
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0;
        analyser.connect(masterGain);
        masterGain.connect(ctx.destination);

        noiseSource.start();
        lfo.start();
        filterLfo.start();
      }

      audioCtxRef.current.resume();

      const updateVisualizer = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          setAudioData(new Uint8Array(dataArray));
        }
        requestRef.current = requestAnimationFrame(updateVisualizer);
      };
      
      updateVisualizer();

    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      // Decay visualizer smoothly
      setAudioData(new Uint8Array(32));
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  const handlePlayTrack = (track: any, release: any) => {
    setCurrentTrack({ ...track, release });
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <section id="discography" className="py-32 relative bg-[#0A0A0A]">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #39FF14 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
          <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] bg-[#39FF14] rounded-full blur-[150px] opacity-5"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-brand-green"></div>
              <h2 className="font-display font-medium text-sm tracking-[0.3em] uppercase text-brand-green">
                Sonic Archives
              </h2>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-black italic tracking-tighter"
            >
              DISCOGRAPHY <span className="text-white/20">&</span> STREAMING
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {RELEASES.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-brand-green/30 rounded-2xl p-6 transition-all duration-500 group flex flex-col"
              >
                <div className="relative overflow-hidden rounded-xl mb-6 aspect-square bg-black">
                  <img 
                    src={release.cover} 
                    alt={release.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <button 
                      onClick={() => handlePlayTrack(release.tracks[0], release)}
                      className="w-12 h-12 rounded-full bg-brand-green text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                    >
                      <Play size={24} className="fill-black ml-1" />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 border border-brand-green/50 text-brand-green text-[9px] uppercase tracking-widest rounded-full">
                      {release.type}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">{release.date}</span>
                  </div>
                  <h4 className="font-display text-2xl font-bold tracking-tight mb-1">{release.title}</h4>
                  <p className="text-sm font-mono tracking-widest text-brand-green uppercase">{release.artist}</p>
                </div>

                <div className="space-y-1 mb-6 flex-grow">
                  {release.tracks.map((track, i) => {
                    const isTrackPlaying = currentTrack?.id === track.id;
                    return (
                      <div 
                        key={track.id}
                        onClick={() => handlePlayTrack(track, release)}
                        className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-colors ${
                          isTrackPlaying ? 'bg-brand-green/10 border border-brand-green/30' : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-mono w-4 text-center ${isTrackPlaying ? 'text-brand-green' : 'text-white/30'}`}>
                            {isTrackPlaying && isPlaying ? (
                              <motion.div
                                animate={{ scaleY: [1, 2, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-1 h-3 bg-brand-green origin-bottom inline-block"
                              />
                            ) : (
                              i + 1
                            )}
                          </span>
                          <span className={`text-xs font-medium ${isTrackPlaying ? 'text-brand-green' : 'text-white/70'}`}>
                            {track.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-white/40">{track.duration}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Available On</span>
                  <div className="flex gap-4">
                    {release.platforms.map((platform) => (
                      <a key={platform} href="#" className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/50 hover:text-brand-green transition-colors">
                        <ExternalLink size={12} /> {platform}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Music Player */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-0 left-0 w-full h-24 bg-[#050505]/95 backdrop-blur-2xl border-t border-brand-green/30 z-[100] flex items-center px-4 md:px-12 shadow-[0_-10px_40px_rgba(57,255,20,0.1)]"
          >
            <div className="flex-1 flex items-center gap-4 min-w-0">
              <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 border border-white/10">
                <img src={currentTrack.release.cover} alt="Cover" className="w-full h-full object-cover" />
                {isPlaying && (
                  <div className="absolute inset-0 bg-brand-green/20 mix-blend-overlay"></div>
                )}
              </div>
              <div className="truncate">
                <h4 className="text-white text-xs md:text-sm font-bold truncate">{currentTrack.title}</h4>
                <p className="text-brand-green text-[10px] md:text-xs font-mono uppercase tracking-wider truncate">{currentTrack.release.artist}</p>
              </div>
            </div>

            <div className="flex-[2] flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-6">
                <button className="text-white/50 hover:text-white transition-colors"><SkipBack size={18} /></button>
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 hover:bg-brand-green transition-all"
                >
                  {isPlaying ? <Pause size={18} className="fill-black" /> : <Play size={18} className="fill-black ml-1" />}
                </button>
                <button className="text-white/50 hover:text-white transition-colors"><SkipForward size={18} /></button>
              </div>
              
              <div className="w-full max-w-md hidden md:flex items-center gap-3">
                <span className="text-[9px] font-mono text-white/40">0:42</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group">
                  <div className="absolute top-0 left-0 h-full bg-brand-green w-1/3 group-hover:bg-[#4aff25] transition-colors"></div>
                </div>
                <span className="text-[9px] font-mono text-white/40">{currentTrack.duration}</span>
              </div>
            </div>

            <div className="flex-[1.5] hidden md:flex justify-end items-center gap-6">
              {/* Frequency Visualizer */}
              <div className="flex items-end justify-center gap-[2px] h-8 flex-1 max-w-[140px] relative">
                {visualizerMode === 'bars' && Array.from(audioData).map((value: number, idx: number) => {
                  const percent = Math.max(4, (value / 255) * 100);
                  const isActive = value > 0;
                  return (
                    <div 
                      key={idx}
                      className={`flex-1 rounded-t-[1px] transition-all duration-75 ${isActive ? 'bg-brand-green' : 'bg-white/10'}`}
                      style={{ 
                        height: `${percent}%`, 
                        opacity: isActive ? Math.max(0.4, value / 255) : 0.5 
                      }}
                    />
                  );
                })}

                {visualizerMode === 'circular' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {Array.from(audioData).slice(0, 16).map((value: number, idx: number) => {
                      const percent = Math.max(10, (value / 255) * 100);
                      const angle = (idx / 16) * 360;
                      const isActive = value > 0;
                      return (
                        <div
                          key={idx}
                          className="absolute origin-bottom transition-all duration-75"
                          style={{
                            height: `${percent}%`,
                            width: '2px',
                            backgroundColor: isActive ? '#39FF14' : 'rgba(255,255,255,0.1)',
                            transform: `rotate(${angle}deg) translateY(-50%)`,
                            opacity: isActive ? Math.max(0.4, value / 255) : 0.5 
                          }}
                        />
                      );
                    })}
                  </div>
                )}

                {visualizerMode === 'particles' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {Array.from(audioData).slice(0, 24).map((value: number, idx: number) => {
                      const isActive = value > 0;
                      const size = Math.max(2, (value / 255) * 8);
                      const spread = (value / 255) * 20;
                      const x = Math.sin(idx) * spread;
                      const y = Math.cos(idx) * spread;
                      return (
                        <div
                          key={idx}
                          className="absolute rounded-full transition-all duration-75"
                          style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            backgroundColor: isActive ? '#39FF14' : 'rgba(255,255,255,0.1)',
                            transform: `translate(${x}px, ${y}px)`,
                            opacity: isActive ? Math.max(0.2, value / 255) : 0.2
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Volume & Settings */}
              <div className="flex items-center gap-4 relative">
                <div className="flex items-center gap-3">
                  <Volume2 size={16} className="text-white/50" />
                  <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group">
                    <div className="absolute top-0 left-0 h-full bg-white/50 w-2/3 group-hover:bg-brand-green transition-colors"></div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className={`text-white/50 hover:text-white transition-colors ${showSettings ? 'text-white' : ''}`}
                >
                  <Settings size={16} />
                </button>

                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full right-0 mb-4 bg-[#111] border border-white/10 rounded-lg p-3 w-40 shadow-2xl z-50"
                    >
                      <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase mb-3 block text-center">Visualizer</span>
                      <div className="flex flex-col gap-1">
                        {(['bars', 'circular', 'particles'] as const).map(mode => (
                          <button
                            key={mode}
                            onClick={() => {
                              setVisualizerMode(mode);
                              setShowSettings(false);
                            }}
                            className={`text-left px-3 py-2 text-xs uppercase tracking-widest rounded transition-colors ${
                              visualizerMode === mode ? 'bg-brand-green text-black font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
