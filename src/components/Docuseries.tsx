import React, { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Lock,
  Unlock,
  ShieldCheck,
  Volume2,
  VolumeX,
  Maximize2,
  Sliders,
  Tv,
  Radio,
  Clock,
  Sparkles,
  Headphones,
  CheckCircle2,
  Film,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';

interface DocEpisode {
  id: string;
  episodeNumber: string;
  phase: string;
  title: string;
  subtitle: string;
  runtime: string;
  durationSec: number;
  location: string;
  dateLogged: string;
  leadPersona: 'rarri' | 'ransom' | 'both';
  thumbnailUrl: string;
  previewStill: string;
  logline: string;
  productionNotes: string[];
  gearUsed: string[];
  quote: {
    text: string;
    author: string;
  };
  audioFrequency: number; // for Web Audio simulation
}

const EPISODES: DocEpisode[] = [
  {
    id: 'ep-1',
    episodeNumber: 'EPISODE 01',
    phase: 'PHASE 1: THEORIZING THE FREQUENCY',
    title: 'The Blueprint in the Dark',
    subtitle: 'From Late-Night Chalkboard Equations to Sonic Philosophy',
    runtime: '06:42',
    durationSec: 402,
    location: 'Studio Alpha // Odessa Concept Lab',
    dateLogged: 'October 2021',
    leadPersona: 'both',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
    previewStill: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
    logline: 'Uncut 3:00 AM session footage. Rarri2Trill and Ran$om map the acoustic divergence on the master dry-erase board, defining why one entity must embody lyrical kinetic velocity while the other sculpts reality-bending sub-bass architecture.',
    productionNotes: [
      'Documented the exact hour the "Split Frequency" paradox was conceived.',
      'Audio capture demonstrates the first side-by-side harmonic dissonance test between 432 Hz and 808 Hz sub-bass.',
      'Whiteboard draft preserved in Rhythmatik digital vault under clearance code #ODS-01.'
    ],
    gearUsed: ['Blackmagic Pocket 6K', 'Rode NTG3 Shotgun', 'Sony C800G Mockup', 'Acoustic Whiteboard'],
    quote: {
      text: "If we don't split the signal, the energy collapses under its own weight. Rarri takes the sky, Ran$om anchors the tectonic plates.",
      author: 'Ran$omonthabeaT'
    },
    audioFrequency: 110
  },
  {
    id: 'ep-2',
    episodeNumber: 'EPISODE 02',
    phase: 'PHASE 2: SONIC ARCHITECTURE & BEAT SURGERY',
    title: 'The Tectonic Console',
    subtitle: 'Ran$om in San Angelo: Dissecting 808 Transients & Tape Saturation',
    runtime: '08:15',
    durationSec: 495,
    location: 'BeatHack Productions HQ // San Angelo Stronghold',
    dateLogged: 'March 2023',
    leadPersona: 'ransom',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    previewStill: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    logline: 'An unfiltered deep dive into the birth of BeatHack Productions (Est. 2023). Ran$om routes analog modular synthesizers through customized voltage gates to carve sub-bass frequencies capable of triggering seismic physical reactions.',
    productionNotes: [
      'High-speed macro lens footage capturing analog VU needles slamming into the red during 28 Hz resonance calibration.',
      'Raw capture of Ran$om custom soldering the diode distortion circuit for the master stereo bus.',
      'Ran$om explains the proprietary BeatHack low-end philosophy: "Never compress the soul out of the impact."'
    ],
    gearUsed: ['SSL 4000 E-Series Console', 'Roland TR-808 (1983 vintage)', 'Studer A820 Tape Machine', 'Moog Sub 37'],
    quote: {
      text: "Bass isn't just rhythm. In this studio, low frequency is geometry. You dial the knob two millimeters and you change the gravitational pull.",
      author: 'Ran$omonthabeaT'
    },
    audioFrequency: 65
  },
  {
    id: 'ep-3',
    episodeNumber: 'EPISODE 03',
    phase: 'PHASE 3: THE VOCAL BOOTH CRUCIBLE',
    title: 'Shockwaves Through the Mesh',
    subtitle: 'Rarri2Trill in the Isolation Chamber: Pure Unfiltered Cadence',
    runtime: '07:38',
    durationSec: 458,
    location: 'The Blackout Chamber // Odessa Studio',
    dateLogged: 'August 2023',
    leadPersona: 'rarri',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
    previewStill: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
    logline: 'Step inside the soundproof isolation booth with the lights dimmed red. Watch Rarri2Trill punch through 14 consecutive vocal takes without headphones on take 9, commanding the microphone with raw kinetic force.',
    productionNotes: [
      'Captures the first live uncompressed vocal tracking of "F.L.Y. (Forever Loving You)" with zero auto-tune.',
      'Acoustic pressure was peaking +3.8 dB over the preamp ceiling without digital clipping.',
      'Includes Rarri explaining the mental discipline behind the high-voltage delivery: "Every bar must feel like lightning touching a wire."'
    ],
    gearUsed: ['Neumann U87 Ai', 'Neve 1073 Preamp', 'Tube-Tech CL 1B Optical Compressor', 'Sennheiser HD 650'],
    quote: {
      text: "When that red light ignites, there are no second chances. You breathe West Texas dirt, you speak raw truth, and you leave everything in the capsule.",
      author: 'Rarri2Trill'
    },
    audioFrequency: 220
  },
  {
    id: 'ep-4',
    episodeNumber: 'EPISODE 04',
    phase: 'PHASE 4: COLLISION COURSE & STEM ALCHEMY',
    title: 'Fusing the Dual Frequencies',
    subtitle: 'Where Electric Blue Sub-Bass Meets Neon Green Lyrical Fire',
    runtime: '09:50',
    durationSec: 590,
    location: 'Hybrid Matrix Suite // West Texas',
    dateLogged: 'November 2024',
    leadPersona: 'both',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    previewStill: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    logline: 'The tension in the control room reaches fever pitch as Ran$om and Rarri reconcile the conflicting frequencies. Watch the painstaking stem alignment where 64 audio tracks are surgically carved to prevent phase cancellation.',
    productionNotes: [
      'Detailed waveform breakdown showing how Rarri vocal transients are sidechained to the kick drum.',
      'Unscripted argument over the 16th-note hi-hat delay that ultimately led to the song signature rhythmic groove.',
      'First play-through of the rough mix that provoked a spontaneous 4:00 AM celebration in the parking lot.'
    ],
    gearUsed: ['Pro Tools HDX Rig', 'Burl Audio Mothership Converters', 'Genelec 8351B Studio Monitors', 'Pultec EQP-1A'],
    quote: {
      text: "This wasn't just mixing audio. It was like two freight trains colliding on purpose and discovering they form a supersonic jet on impact.",
      author: 'Rhythmatik Engineer'
    },
    audioFrequency: 160
  },
  {
    id: 'ep-5',
    episodeNumber: 'EPISODE 05',
    phase: 'PHASE 5: ZERO HOUR & THE 2 AM HIGHWAY TEST',
    title: 'The Master Tape & Final Delivery',
    subtitle: 'From Analog Tape Print to the Texas Highway Cadillac Soundcheck',
    runtime: '11:24',
    durationSec: 684,
    location: 'Mastering Lab & Interstate 20 // Odessa to San Angelo',
    dateLogged: 'Early 2025',
    leadPersona: 'both',
    thumbnailUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop',
    previewStill: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop',
    logline: 'The ultimate climax of the series. The final stem master is run through 1/2-inch ATR magnetic tape, packaged into high-res DSD, and taken onto Interstate 20 for the legendary West Texas car subwoofer test.',
    productionNotes: [
      'Features raw dashboard cam footage testing the master playback at 85 MPH through a 2,000-watt sound system.',
      'Side-by-side spectrum analyzer comparisons between digital render and analog tape print.',
      'Official sign-off document signed by both Rarri2Trill and Ran$omonthabeaT declaring the project master locked for worldwide distribution.'
    ],
    gearUsed: ['ATR-102 1/2" Master Tape Deck', 'Shadow Hills Mastering Compressor', 'Sonnox Oxford Limiter', '1998 Fleetwood Brougham Sound System'],
    quote: {
      text: "If it doesn't rattle the rearview mirror and make your chest tighten on the open highway at 2 AM, the master isn't finished. This one passed.",
      author: 'Ran$omonthabeaT'
    },
    audioFrequency: 85
  }
];

export function Docuseries() {
  // Members-only clearance state
  const [isMember, setIsMember] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rhythmatik_doc_member_pass') === 'active';
    } catch {
      return false;
    }
  });

  const [passEmail, setPassEmail] = useState('');
  const [passError, setPassError] = useState('');
  const [activeEpisode, setActiveEpisode] = useState<DocEpisode>(EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(18); // default starting scrub percent
  const [isMuted, setIsMuted] = useState(false);
  const [crtFilter, setCrtFilter] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [commentaryActive, setCommentaryActive] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5>(1);

  // Web Audio Synth for authentic studio hum & playback tone
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Persistence handler
  const grantMembership = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsMember(true);
    setPassError('');
    try {
      localStorage.setItem('rhythmatik_doc_member_pass', 'active');
    } catch {
      // ignore
    }
  };

  const revokeMembership = () => {
    setIsMember(false);
    setIsPlaying(false);
    stopAudioSimulation();
    try {
      localStorage.removeItem('rhythmatik_doc_member_pass');
    } catch {
      // ignore
    }
  };

  // Audio simulation on playback
  const startAudioSimulation = (freq: number) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      // Stop previous osc
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch {
          // ignore
        }
      }

      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, audioContextRef.current.currentTime);

      // Low pass filter for analog warmth
      const filter = audioContextRef.current.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, audioContextRef.current.currentTime);

      gain.gain.setValueAtTime(0.015, audioContextRef.current.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioContextRef.current.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch {
      // fallback smoothly
    }
  };

  const stopAudioSimulation = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      try {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.05);
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
          oscillatorRef.current = null;
        } catch {
          // ignore
        }
      }
    }, 60);
  };

  const togglePlay = () => {
    if (!isMember) return;
    if (isPlaying) {
      setIsPlaying(false);
      stopAudioSimulation();
    } else {
      setIsPlaying(true);
      startAudioSimulation(activeEpisode.audioFrequency);
    }
  };

  // Playback timer progression
  useEffect(() => {
    if (isPlaying && isMember) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            stopAudioSimulation();
            return 0;
          }
          return Math.min(100, prev + 0.3 * playbackSpeed);
        });
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isMember, playbackSpeed]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAudioSimulation();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Format current playback time
  const currentSeconds = Math.floor((progress / 100) * activeEpisode.durationSec);
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentFrame = Math.floor((currentSeconds * 24) % 24);

  return (
    <section id="studio-doc" className="py-32 relative bg-[#040404] overflow-hidden text-white border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-[#39FF14]/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-[#00FFFF]/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-[2px] bg-[#39FF14]" />
              <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#39FF14]/10 border border-[#39FF14]/30">
                <Film size={12} className="text-[#39FF14]" />
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#39FF14] font-bold">
                  Exclusive Mini-Doc Series
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10">
                <Lock size={10} className={isMember ? 'text-[#39FF14]' : 'text-amber-400'} />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/70">
                  {isMember ? 'Clearance: Active' : 'Members Only Access'}
                </span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.95]"
            >
              THE STUDIO <span className="text-[#39FF14]">CHRONICLES</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 font-light text-sm md:text-base leading-relaxed mt-4 max-w-2xl"
            >
              Uncut, declassified behind-the-scenes camera archives chronicling the full creative arc of Rhythmatik.
              From 3:00 AM whiteboard equations and modular beat surgery to the vocal booth crucible and final 2:00 AM Texas highway car test.
            </motion.p>
          </div>

          {/* Member Clearance Badge / Action */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            {isMember ? (
              <div className="flex items-center gap-4 bg-white/5 border border-[#39FF14]/40 px-5 py-3 rounded-xl backdrop-blur-xl shadow-[0_0_20px_rgba(57,255,20,0.1)]">
                <div className="w-10 h-10 rounded-full bg-[#39FF14]/20 border border-[#39FF14] flex items-center justify-center text-[#39FF14]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-xs uppercase tracking-wider text-white">
                      Empire VIP Member
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                  </div>
                  <span className="font-mono text-[10px] text-white/50 block">
                    ID #RHY-2026-VIP • Full Archive Unlocked
                  </span>
                </div>
                <button
                  onClick={revokeMembership}
                  title="Lock Archive for testing"
                  className="ml-3 text-[10px] font-mono text-white/40 hover:text-red-400 underline transition-colors"
                >
                  Lock
                </button>
              </div>
            ) : (
              <button
                onClick={() => grantMembership()}
                className="group relative px-6 py-3.5 bg-gradient-to-r from-[#39FF14] to-[#00FFFF] text-black font-display font-black text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(57,255,20,0.25)]"
              >
                <Unlock size={14} />
                <span>Claim VIP Member Clearance</span>
              </button>
            )}
          </motion.div>
        </div>

        {/* Main Cinema Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Video Viewport (Col 8) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl group">
              {/* Still Photo / Video Layer */}
              <div className="absolute inset-0 z-0">
                <img
                  src={activeEpisode.previewStill}
                  alt={activeEpisode.title}
                  className={`w-full h-full object-cover transition-transform duration-1000 ${
                    isPlaying ? 'scale-105 filter brightness-105' : 'scale-100 filter brightness-90'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

                {/* CRT Scanline Shader Overlay */}
                {crtFilter && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(0,0,0,0.85) 0px, rgba(0,0,0,0.85) 1px, transparent 2px, transparent 4px)'
                    }}
                  />
                )}
              </div>

              {/* Studio Cinema Camera HUD Overlay */}
              <div className="absolute inset-0 z-10 p-4 md:p-6 flex flex-col justify-between pointer-events-none">
                {/* Top Camera HUD Info */}
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-white/80">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-600/80 text-white font-bold text-[9px] uppercase shadow">
                      <span className={`w-2 h-2 rounded-full bg-white ${isPlaying ? 'animate-ping' : ''}`} />
                      {isPlaying ? 'REC' : 'PAUSED'}
                    </span>
                    <span className="hidden sm:inline-block bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/10 text-white/90">
                      CAM 02 • 4K RAW 24FPS
                    </span>
                    <span className="hidden md:inline-block bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/10 text-[#39FF14]">
                      ISO 800 • 35MM T1.5
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-white font-bold">
                      TC {formatTime(currentSeconds)}:{currentFrame.toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* Crosshairs & Center Frame Markers */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  <div className="w-16 h-16 border-t-2 border-l-2 border-white/60 absolute -top-8 -left-8" />
                  <div className="w-16 h-16 border-t-2 border-r-2 border-white/60 absolute -top-8 -right-8" />
                  <div className="w-16 h-16 border-b-2 border-l-2 border-white/60 absolute -bottom-8 -left-8" />
                  <div className="w-16 h-16 border-b-2 border-r-2 border-white/60 absolute -bottom-8 -right-8" />
                  <div className="w-2 h-2 bg-[#39FF14] rounded-full mx-auto" />
                </div>

                {/* Simulated Director Commentary Subtitles */}
                {commentaryActive && isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="self-center bg-black/85 backdrop-blur-md border border-[#00FFFF]/40 px-4 py-2 rounded-lg max-w-lg text-center"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#00FFFF] font-bold block mb-0.5">
                      Director Commentary // Ran$omonthabeaT
                    </span>
                    <p className="text-xs text-white/90 italic">
                      "{activeEpisode.quote.text}"
                    </p>
                  </motion.div>
                )}

                {/* Audio Waveform / VU Meter HUD Bottom Left */}
                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <div className="flex items-end gap-0.5 h-4">
                      {[40, 75, 90, 60, 100, 45, 80, 55, 95, 70, 85, 30].map((h, i) => (
                        <div
                          key={i}
                          className="w-1 bg-[#39FF14] rounded-t-sm transition-all duration-150"
                          style={{
                            height: isPlaying ? `${Math.max(15, (h * (progress % 10 + 2)) / 10)}%` : '20%',
                            opacity: isPlaying ? 0.9 : 0.4
                          }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[9px] text-white/60 uppercase">CH 1/2 AUDIO BUS</span>
                  </div>

                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase bg-black/60 px-2 py-1 rounded border border-white/5">
                    {activeEpisode.location}
                  </span>
                </div>
              </div>

              {/* Members-Only Lock Screen Overlay (when unauthorized) */}
              {!isMember && (
                <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[#39FF14]/30 flex items-center justify-center mb-4 text-[#39FF14] shadow-[0_0_30px_rgba(57,255,20,0.2)]">
                    <Lock size={28} />
                  </div>

                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#39FF14] font-bold mb-2">
                    Security Clearance Required
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-black italic uppercase text-white tracking-tight mb-2">
                    MEMBERS ONLY ARCHIVE
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm font-light max-w-md leading-relaxed mb-6">
                    Behind-the-scenes studio sessions, raw takes, and master console stems are exclusive to registered
                    Rhythmatik Empire members. Activate your pass below for instant access.
                  </p>

                  <form onSubmit={grantMembership} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <input
                      type="email"
                      value={passEmail}
                      onChange={(e) => setPassEmail(e.target.value)}
                      placeholder="Enter fan email or access code..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#39FF14] transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#39FF14] text-black font-display font-black text-xs uppercase tracking-widest rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] shrink-0"
                    >
                      Unlock Now
                    </button>
                  </form>
                  {passError && <span className="text-xs text-red-400 mt-2">{passError}</span>}

                  <button
                    onClick={() => grantMembership()}
                    className="mt-4 text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-[#39FF14] transition-colors"
                  >
                    Quick Guest VIP Demo Pass (1-Click Instant Unlock) →
                  </button>
                </div>
              )}

              {/* Central Play/Pause Overlay Click Target */}
              {isMember && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 z-20 flex items-center justify-center focus:outline-none group/btn"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-300 ${
                      isPlaying
                        ? 'opacity-0 group-hover/btn:opacity-100 bg-black/60 border-white/20 text-white'
                        : 'opacity-90 bg-[#39FF14] border-[#39FF14] text-black shadow-[0_0_40px_rgba(57,255,20,0.4)]'
                    }`}
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                  </motion.div>
                </button>
              )}
            </div>

            {/* Video Scrubber & Playback Controls Bar */}
            <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
              {/* Scrubber Bar */}
              <div className="relative w-full h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden mb-3 group/bar">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  disabled={!isMember}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className="h-full bg-gradient-to-r from-[#39FF14] to-[#00FFFF] rounded-full transition-all relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] scale-0 group-hover/bar:scale-100 transition-transform" />
                </div>
              </div>

              {/* Controls Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    disabled={!isMember}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#39FF14] hover:text-black flex items-center justify-center transition-all disabled:opacity-30"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                  </button>

                  <button
                    onClick={() => setProgress(0)}
                    disabled={!isMember}
                    title="Restart Clip"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all disabled:opacity-30"
                  >
                    <RotateCcw size={13} />
                  </button>

                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (!isMuted) stopAudioSimulation();
                      else if (isPlaying) startAudioSimulation(activeEpisode.audioFrequency);
                    }}
                    title={isMuted ? 'Unmute Studio Ambiance' : 'Mute Studio Ambiance'}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isMuted ? 'bg-red-500/20 text-red-400' : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>

                  <span className="text-white/70 text-[11px]">
                    {formatTime(currentSeconds)} / {activeEpisode.runtime}
                  </span>
                </div>

                {/* Secondary Toggles: CRT, Commentary, Speed, Notes */}
                <div className="flex items-center gap-2">
                  {/* CRT Filter toggle */}
                  <button
                    onClick={() => setCrtFilter(!crtFilter)}
                    title="Toggle CRT Tape Overlay"
                    className={`px-2.5 py-1 rounded text-[10px] tracking-wider uppercase transition-colors flex items-center gap-1 border ${
                      crtFilter
                        ? 'bg-[#39FF14]/15 border-[#39FF14]/40 text-[#39FF14]'
                        : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    <Tv size={11} /> CRT Filter
                  </button>

                  {/* Director Commentary toggle */}
                  <button
                    onClick={() => setCommentaryActive(!commentaryActive)}
                    title="Director Audio Commentary"
                    className={`px-2.5 py-1 rounded text-[10px] tracking-wider uppercase transition-colors flex items-center gap-1 border ${
                      commentaryActive
                        ? 'bg-[#00FFFF]/15 border-[#00FFFF]/40 text-[#00FFFF]'
                        : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    <Headphones size={11} /> Commentary
                  </button>

                  {/* Playback speed */}
                  <button
                    onClick={() => {
                      const next = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
                      setPlaybackSpeed(next);
                    }}
                    className="px-2 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] text-white/80"
                  >
                    {playbackSpeed}x
                  </button>

                  {/* Toggle Production Notes */}
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className={`px-2.5 py-1 rounded text-[10px] tracking-wider uppercase transition-colors flex items-center gap-1 border ${
                      showNotes
                        ? 'bg-white text-black border-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                    }`}
                  >
                    <Info size={11} /> Notes
                  </button>
                </div>
              </div>
            </div>

            {/* Currently Playing Episode Detail */}
            <div className="mt-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="font-mono text-xs font-bold text-[#39FF14] tracking-widest uppercase">
                  {activeEpisode.phase}
                </span>
                <span className="font-mono text-[10px] text-white/40 uppercase">
                  Logged: {activeEpisode.dateLogged} • {activeEpisode.location}
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-black italic uppercase text-white tracking-tight mb-2">
                {activeEpisode.title}
              </h3>
              <p className="font-mono text-xs text-white/60 tracking-wider uppercase mb-4">
                {activeEpisode.subtitle}
              </p>
              <p className="text-white/80 font-light text-sm leading-relaxed mb-6">
                {activeEpisode.logline}
              </p>

              {/* Quote Block */}
              <div className="border-l-2 border-[#39FF14] pl-4 py-1 bg-white/[0.02] rounded-r-lg mb-6">
                <p className="italic text-xs md:text-sm text-white/90 mb-1">
                  "{activeEpisode.quote.text}"
                </p>
                <span className="font-mono text-[10px] text-[#39FF14] tracking-widest uppercase block">
                  — {activeEpisode.quote.author}
                </span>
              </div>

              {/* Expandable Production Notes Drawer */}
              <AnimatePresence>
                {showNotes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-white/10 overflow-hidden"
                  >
                    <h4 className="font-mono text-[11px] uppercase tracking-widest text-[#00FFFF] font-bold mb-3 flex items-center gap-2">
                      <Sliders size={13} /> Declassified Engineering Notes & Signal Chain
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block mb-2">
                          Key Studio Milestones
                        </span>
                        <ul className="space-y-2 text-white/70">
                          {activeEpisode.productionNotes.map((note, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#39FF14] mt-0.5">•</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block mb-2">
                          Gear & Routing Stems
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeEpisode.gearUsed.map((gear, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded bg-black/50 border border-white/10 text-[10px] font-mono text-white/80"
                            >
                              {gear}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Episode Browser / Playlist (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <span className="font-mono text-xs uppercase tracking-widest text-white/50 font-bold flex items-center gap-2">
                <Radio size={14} className="text-[#39FF14]" />
                Docuseries Chapters (5)
              </span>
              <span className="font-mono text-[10px] text-[#39FF14] uppercase">
                {isMember ? 'Full Access' : 'Locked'}
              </span>
            </div>

            <div className="space-y-3">
              {EPISODES.map((ep, idx) => {
                const isActive = activeEpisode.id === ep.id;
                return (
                  <motion.div
                    key={ep.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => {
                      setActiveEpisode(ep);
                      setProgress(0);
                      if (isPlaying && isMember) {
                        startAudioSimulation(ep.audioFrequency);
                      }
                    }}
                    className={`relative p-3.5 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                      isActive
                        ? 'bg-white/10 border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.15)]'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail Container */}
                      <div className="relative w-24 h-18 rounded-lg overflow-hidden shrink-0 bg-black border border-white/10">
                        <img
                          src={ep.thumbnailUrl}
                          alt={ep.title}
                          className="w-full h-full object-cover filter brightness-85"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-mono text-white">
                          {ep.runtime}
                        </div>
                        {isActive && isPlaying && (
                          <div className="absolute inset-0 bg-[#39FF14]/20 flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-ping" />
                          </div>
                        )}
                        {!isMember && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white/80">
                            <Lock size={12} />
                          </div>
                        )}
                      </div>

                      {/* Episode Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#39FF14] font-bold">
                            {ep.episodeNumber}
                          </span>
                          <span className="font-mono text-[9px] text-white/40">
                            P{idx + 1}
                          </span>
                        </div>
                        <h4 className="font-display font-black text-sm uppercase italic tracking-tight text-white truncate mb-1">
                          {ep.title}
                        </h4>
                        <p className="text-[11px] text-white/50 line-clamp-2 leading-tight">
                          {ep.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Active Accent Bar */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#39FF14] to-[#00FFFF]" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Fan Member Gate Card */}
            <div className="mt-4 p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-[#39FF14]" />
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-white">
                  Mini-Doc Masterclass
                </span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-light mb-4">
                Watch raw multi-angle sessions, unmastered stem bounces, and live commentary tracks breaking down how the
                Rhythmatik dual frequency was created from scratch.
              </p>

              {isMember ? (
                <div className="flex items-center justify-between text-xs font-mono text-[#39FF14] pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> Clearance: VIP UNRESTRICTED
                  </span>
                  <span className="text-white/50">2026 ARCHIVE</span>
                </div>
              ) : (
                <button
                  onClick={() => grantMembership()}
                  className="w-full py-2.5 bg-white/10 hover:bg-[#39FF14] hover:text-black text-white font-display font-black text-[11px] uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  <Unlock size={12} /> Claim Instant Access
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
