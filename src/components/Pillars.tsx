import { motion } from 'motion/react';
import { Mic2, BookOpen, Heart } from 'lucide-react';

const pillars = [
  {
    id: 'music',
    title: 'BeatHack Productions',
    subtitle: 'Sonic Architecture • Established 2023',
    description: 'Music production, sound design, and engineering pushed to the absolute edge. Established in 2023 in San Angelo where frequencies are sculpted into narrative landscapes and pure auditory power.',
    icon: Mic2,
    color: 'group-hover:text-brand-purple',
    border: 'hover:border-brand-purple',
    bgHover: 'hover:bg-brand-purple/5',
  },
  {
    id: 'comics',
    title: 'BeatHackd Universe',
    subtitle: 'Reality Engineering • 2026 Launch',
    description: 'A supernatural comic book universe launching in 2026 where audio engineering is literally reality engineering. Duality, power, and frequencies that rewrite the laws of physics.',
    icon: BookOpen,
    color: 'group-hover:text-brand-green',
    border: 'hover:border-brand-green',
    bgHover: 'hover:bg-brand-green/5',
  },
  {
    id: 'culture',
    title: 'F.L.Y. Movement',
    subtitle: 'Forever Loving You • 2026 Launch',
    description: 'A community-driven mission and lifestyle brand launching in 2026, dedicated to "teaching the world to love again" through art, connection, and unapologetic authenticity.',
    icon: Heart,
    color: 'group-hover:text-red-500',
    border: 'hover:border-red-500',
    bgHover: 'hover:bg-red-500/5',
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
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export function Pillars() {
  return (
    <section className="py-32 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-white/20"></div>
            <h2 className="font-display font-medium text-sm tracking-[0.3em] uppercase text-gray-400">
              The Three Pillars
            </h2>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tighter"
          >
            THE <span className="text-brand-green">RHYTHMATIK</span> EMPIRE
          </motion.h3>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                id={pillar.id === 'culture' ? pillar.id : undefined}
                variants={itemVariants}
                className={`group relative p-8 md:p-12 border ${pillar.id === 'comics' ? 'border-[#39FF14]/30' : 'border-white/10'} bg-white/5 backdrop-blur-xl rounded-2xl transition-all duration-500 hover:bg-white/10 cursor-default`}
              >
                {/* Number Indicator */}
                <div className="absolute top-8 right-8 font-display text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                  0{index + 1}
                </div>

                <div className="w-8 h-[2px] bg-[#39FF14] mb-4"></div>
                <div className="mb-6">
                  <Icon size={40} className={`text-white/50 transition-colors duration-500 ${pillar.color}`} strokeWidth={1.5} />
                </div>
                
                <h4 className={`font-display text-2xl md:text-3xl font-bold mb-1 tracking-tight ${pillar.id === 'comics' ? 'text-[#39FF14]' : ''}`}>
                  {pillar.title}
                </h4>
                <div className="text-[10px] tracking-widest font-medium uppercase text-white/40 mb-6 leading-tight">
                  {pillar.subtitle}
                </div>
                <p className="text-[11px] md:text-sm text-white/60 leading-relaxed font-light">
                  {pillar.description}
                </p>

                <div className="mt-12 flex items-center gap-4">
                  <span className={`text-xs font-bold tracking-widest uppercase transition-colors text-white/30 ${pillar.color}`}>
                    Explore
                  </span>
                  <div className={`h-[1px] w-8 bg-white/20 transition-all duration-300 group-hover:w-16 ${pillar.bgHover.replace('bg-', 'bg-').replace('/5', '')}`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
