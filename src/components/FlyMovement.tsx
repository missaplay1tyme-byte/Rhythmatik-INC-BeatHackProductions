import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Heart, Zap, Crosshair } from 'lucide-react';

const LOCATIONS = [
  {
    id: 1,
    city: "Odessa",
    coords: { x: 25, y: 35 },
    title: "Ground Zero: Rooted",
    description: "The origin point of the F.L.Y. movement. Community youth outreach and sonic healing workshops.",
    status: "ACTIVE",
    metrics: "2,400+ REACHED"
  },
  {
    id: 2,
    city: "San Angelo",
    coords: { x: 45, y: 45 },
    title: "Engineering Base",
    description: "The main stronghold. Frequency tuning and reality engineering labs open for local creatives.",
    status: "ACTIVE",
    metrics: "1,200+ REACHED"
  },
  {
    id: 3,
    city: "Austin",
    coords: { x: 65, y: 60 },
    title: "Cultural Nexus",
    description: "Pop-up frequency installations. Spreading the message of 'Forever Loving You' through immersive audio-visual street art.",
    status: "EXPANDING",
    metrics: "5,000+ REACHED"
  },
  {
    id: 4,
    city: "Houston",
    coords: { x: 80, y: 65 },
    title: "Sub-Bass Hub",
    description: "Large scale venue takeovers anchoring the city's energy. Collaborative spaces for reality manipulation.",
    status: "PLANNING",
    metrics: "TBD"
  },
  {
    id: 5,
    city: "Dallas",
    coords: { x: 70, y: 30 },
    title: "Broadcast Tower",
    description: "Digital outreach center. Broadcasting the supernatural frequencies across the northern sector.",
    status: "ACTIVE",
    metrics: "8,500+ REACHED"
  }
];

export function FlyMovement() {
  const [activeLocation, setActiveLocation] = useState<typeof LOCATIONS[0] | null>(null);

  return (
    <section id="fly-movement" className="py-32 relative bg-[#020202] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)", backgroundSize: "50px 50px" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green rounded-full blur-[200px] opacity-[0.03]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-8 md:w-16 bg-[#39FF14]"></div>
            <Heart size={16} className="text-[#39FF14]" />
            <div className="h-[1px] w-8 md:w-16 bg-[#39FF14]"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-black italic tracking-tight text-white uppercase mb-4"
          >
            F.L.Y. <span className="text-[#39FF14]">Movement</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-sm md:text-base font-light leading-relaxed"
          >
            "Forever Loving You." A cultural initiative restoring human connection through high-voltage storytelling and reality-shifting frequencies across the Texas sector.
          </motion.p>
        </div>

        {/* Tactical Map Container */}
        <div className="w-full max-w-4xl bg-black/50 border border-white/10 rounded-2xl p-6 md:p-12 relative backdrop-blur-xl">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Crosshair size={14} className="text-[#39FF14] opacity-50" />
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40">Texas Sector Map</span>
          </div>

          <div className="relative aspect-[4/3] md:aspect-[21/9] w-full mt-8 border border-white/5 bg-[#050505] rounded-lg overflow-hidden">
            {/* Map Grid Lines */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#39FF14]"></div>
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#39FF14]"></div>
              {/* Radar Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square rounded-full border border-[#39FF14]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full border border-[#39FF14]"></div>
            </div>

            {/* Scanning Line */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 left-0 w-[20%] bg-gradient-to-r from-transparent via-[#39FF14]/10 to-transparent z-10 pointer-events-none"
            />

            {/* Location Pins */}
            {LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="absolute z-20"
                style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
              >
                <motion.button
                  onClick={() => setActiveLocation(loc)}
                  className="relative group -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className={`absolute inset-0 rounded-full animate-ping opacity-30 ${activeLocation?.id === loc.id ? 'bg-white' : 'bg-[#39FF14]'}`}></div>
                  <div className={`relative w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    activeLocation?.id === loc.id ? 'border-white bg-white' : 'border-[#39FF14] bg-black group-hover:bg-[#39FF14]'
                  }`}>
                    {activeLocation?.id === loc.id && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                  </div>
                  
                  {/* City Label on map */}
                  <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 font-mono text-[8px] md:text-[10px] tracking-widest uppercase whitespace-nowrap transition-colors ${
                    activeLocation?.id === loc.id ? 'text-white font-bold' : 'text-white/40'
                  }`}>
                    {loc.city}
                  </span>
                </motion.button>
              </div>
            ))}
          </div>

          {/* Location Details Panel */}
          <div className="mt-8 min-h-[160px]">
            <AnimatePresence mode="wait">
              {activeLocation ? (
                <motion.div
                  key={activeLocation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#39FF14] rounded-full blur-[80px] opacity-[0.05] pointer-events-none"></div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin size={16} className="text-[#39FF14]" />
                      <h3 className="font-display font-black text-xl md:text-2xl text-white uppercase tracking-tight">
                        {activeLocation.title}
                      </h3>
                    </div>
                    <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
                      {activeLocation.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto">
                    <div className="bg-black/50 border border-white/5 p-4 rounded-lg flex-1 md:flex-none md:min-w-[140px]">
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40 mb-1">Status</span>
                      <span className={`font-bold text-xs tracking-wider uppercase ${
                        activeLocation.status === 'ACTIVE' ? 'text-[#39FF14]' : 
                        activeLocation.status === 'EXPANDING' ? 'text-[#7000FF]' : 'text-white/60'
                      }`}>
                        {activeLocation.status}
                      </span>
                    </div>
                    <div className="bg-black/50 border border-white/5 p-4 rounded-lg flex-1 md:flex-none md:min-w-[140px]">
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40 mb-1">Impact</span>
                      <span className="font-bold text-xs tracking-wider uppercase text-white">
                        {activeLocation.metrics}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 border border-white/5 border-dashed rounded-xl"
                >
                  <Zap size={24} className="text-white/20 mb-4" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Select a sector point to view deployment details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
