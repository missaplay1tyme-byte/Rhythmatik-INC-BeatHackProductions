import { motion } from 'motion/react';
import { Instagram, Twitter, Youtube, ExternalLink } from 'lucide-react';

const FEED_ITEMS = [
  {
    id: 1,
    platform: 'instagram',
    author: '@rhythmatik_inc',
    content: "Behind the scenes at the San Angelo engineering stronghold. Dialing in the sub-bass frequencies for the next release. 🎛️🔊 #RealityEngineering #BeatHack",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
    date: "2 hours ago",
    link: "#"
  },
  {
    id: 2,
    platform: 'twitter',
    author: '@rarri2trill',
    content: "The culture needs a reset. F.L.Y. movement is in full effect. We teaching the world to love again through raw energy. 💚🦅 #FLYMovement",
    date: "5 hours ago",
    link: "#"
  },
  {
    id: 3,
    platform: 'youtube',
    author: 'BeatHackd Universe',
    content: "The Split Frequency: Episode 01 [OFFICIAL ANIMATION]",
    image: "https://images.unsplash.com/photo-1618519764620-7403abdbdf9c?q=80&w=600&auto=format&fit=crop",
    date: "1 day ago",
    link: "#"
  },
  {
    id: 4,
    platform: 'instagram',
    author: '@ransom_beats',
    content: "Just received the first printed proofs of Issue #02: Console Gods. The colors are popping off the page. Reality is shifting.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    date: "2 days ago",
    link: "#"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
};

export function SocialFeed() {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram size={14} className="text-[#39FF14]" />;
      case 'twitter': return <Twitter size={14} className="text-[#39FF14]" />;
      case 'youtube': return <Youtube size={14} className="text-[#39FF14]" />;
      default: return <ExternalLink size={14} className="text-[#39FF14]" />;
    }
  };

  return (
    <section id="social-feed" className="py-32 relative bg-[#020202]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green rounded-full blur-[250px] opacity-[0.02]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
              <h2 className="font-display font-medium text-[10px] tracking-[0.3em] uppercase text-brand-green">
                Live Broadcast
              </h2>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-black italic tracking-tight text-white uppercase"
            >
              The Network <span className="text-white/20">Feed</span>
            </motion.h3>
          </div>
          
          <motion.a
            href="#"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white hover:text-brand-green transition-colors"
          >
            Follow The Empire <ExternalLink size={14} />
          </motion.a>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEED_ITEMS.map((item) => (
            <motion.a
              key={item.id}
              href={item.link}
              variants={itemVariants}
              className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#39FF14]/50 transition-all duration-300"
            >
              {item.image && (
                <div className="relative aspect-video overflow-hidden bg-black border-b border-white/10">
                  <img 
                    src={item.image} 
                    alt="Social feed content" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
                  />
                  {item.platform === 'youtube' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:border-[#39FF14] transition-colors">
                        <Youtube size={24} className="text-white group-hover:text-[#39FF14] transition-colors" />
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(item.platform)}
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/70">
                      {item.author}
                    </span>
                  </div>
                  <ExternalLink size={12} className="text-white/20 group-hover:text-[#39FF14] transition-colors" />
                </div>
                
                <p className="text-sm font-light leading-relaxed text-white/80 mb-6 flex-1">
                  {item.content}
                </p>
                
                <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold">
                  {item.date}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
