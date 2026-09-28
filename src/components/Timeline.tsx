import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Disc, BookOpen, Heart, Zap, Crosshair } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    id: 1,
    year: "2018",
    title: "Origins: Odessa Rooted",
    description: "The foundation of Rhythmatik, INC. A raw, unified creative vision forged in West Texas before the divergence.",
    persona: "unified",
    icon: Crosshair,
    color: "text-white",
    dotColor: "bg-white",
    borderColor: "border-white/20",
    bgColor: "bg-white/5",
    glow: "shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    alignment: "left"
  },
  {
    id: 2,
    year: "2021",
    title: "The Split Frequency",
    description: "A supernatural auditory anomaly. The singular creative mind fractures into two distinct frequencies: The Rap Entity and The Architect.",
    persona: "split",
    icon: Zap,
    color: "text-white",
    dotColor: "bg-white",
    borderColor: "border-[#39FF14] md:border-t-[#39FF14] md:border-b-[#7000FF]", // Hybrid border
    bgColor: "bg-gradient-to-br from-[#39FF14]/10 to-[#7000FF]/10",
    glow: "shadow-[0_0_30px_rgba(255,255,255,0.2)]",
    alignment: "center"
  },
  {
    id: 3,
    year: "2023",
    title: "BeatHack Productions Established",
    description: "Ran$omonthabeaT assumes control of the master console in San Angelo. BeatHack Productions is officially established as the engineering stronghold, manipulating reality through sub-bass.",
    persona: "ransom",
    icon: Disc,
    color: "text-brand-purple",
    dotColor: "bg-brand-purple",
    borderColor: "border-brand-purple/30",
    bgColor: "bg-brand-purple/5",
    glow: "shadow-[0_0_20px_rgba(112,0,255,0.2)]",
    alignment: "right"
  },
  {
    id: 4,
    year: "2026",
    title: "F.L.Y. Movement Launch",
    description: "Rarri2Trill initiates 'Forever Loving You' (F.L.Y.), a cultural mission to teach the world to love again through raw, high-voltage storytelling and youth frequency empowerment.",
    persona: "rarri",
    icon: Heart,
    color: "text-brand-green",
    dotColor: "bg-brand-green",
    borderColor: "border-brand-green/30",
    bgColor: "bg-brand-green/5",
    glow: "shadow-[0_0_20px_rgba(57,255,20,0.2)]",
    alignment: "left"
  },
  {
    id: 5,
    year: "2026",
    title: "BeatHackd Universe Launch",
    description: "The lore is codified. The supernatural comic universe officially launches, chronicling the reality-bending exploits of the dual personas and their sonic warfare across dimensions.",
    persona: "universe",
    icon: BookOpen,
    color: "text-white",
    dotColor: "bg-white",
    borderColor: "border-white/20",
    bgColor: "bg-white/5",
    glow: "shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    alignment: "right"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-32 relative bg-[#050505] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-green rounded-full blur-[200px] opacity-[0.02]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-purple rounded-full blur-[200px] opacity-[0.02]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-white/20"></div>
            <h2 className="font-display font-medium text-[10px] tracking-[0.3em] uppercase text-white/50">
              The Empire's Genesis
            </h2>
            <div className="h-[1px] w-12 bg-white/20"></div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black italic tracking-tighter"
          >
            CHRONICLES OF <span className="text-brand-green">RHYTHMATIK</span>
          </motion.h3>
        </div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Central Line Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-white to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Left Line Mobile */}
          <div className="block md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-white/5">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-white to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-24 md:space-y-32"
          >
            {TIMELINE_EVENTS.map((event, index) => {
              const Icon = event.icon;
              const isLeft = event.alignment === 'left';
              const isCenter = event.alignment === 'center';
              
              return (
                <motion.div 
                  key={event.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isCenter ? 'md:justify-center' : isLeft ? 'md:justify-start' : 'md:justify-end'
                  } pl-16 md:pl-0`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-[24px] md:left-1/2 w-4 h-4 rounded-full border-2 bg-black -translate-x-1/2 mt-6 md:mt-0 z-20 ${event.borderColor} ${event.glow}`}>
                    <div className={`absolute inset-[2px] rounded-full ${event.dotColor}`}></div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] ${isCenter ? 'md:w-3/4 text-center' : ''}`}>
                    <div className={`p-6 md:p-8 backdrop-blur-xl border rounded-2xl transition-all duration-500 hover:-translate-y-2 group ${event.borderColor} ${event.bgColor}`}>
                      <div className={`flex items-center gap-4 mb-4 ${isCenter ? 'justify-center' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-black/50 ${event.color}`}>
                          <Icon size={18} />
                        </div>
                        <span className="font-mono text-xl font-bold tracking-widest text-white/80">
                          {event.year}
                        </span>
                      </div>
                      
                      <h4 className={`font-display text-2xl font-black italic tracking-tight mb-3 ${event.color}`}>
                        {event.title}
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed font-light">
                        {event.description}
                      </p>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
