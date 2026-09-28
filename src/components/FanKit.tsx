import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Gift, X, Image as ImageIcon, Smartphone, Users } from 'lucide-react';

const KIT_ITEMS = [
  {
    id: 'wallpapers',
    title: 'Digital Wallpapers',
    icon: <Smartphone size={20} className="text-[#39FF14]" />,
    description: 'High-resolution mobile & desktop backgrounds featuring key locations from the BeatHackd universe.',
    items: [
      { name: 'Desktop - The Console', size: '4.2 MB' },
      { name: 'Mobile - Neon Odessa', size: '1.8 MB' },
      { name: 'Desktop - Split Frequency', size: '5.1 MB' }
    ]
  },
  {
    id: 'social',
    title: 'Branded Social Icons',
    icon: <ImageIcon size={20} className="text-[#39FF14]" />,
    description: 'Custom Rhythmatik INC profile pictures and banner assets for your network feeds.',
    items: [
      { name: 'PFP Pack - Neon Green', size: '2.4 MB' },
      { name: 'Twitter Banner - HQ', size: '3.1 MB' },
      { name: 'IG Story Templates', size: '6.5 MB' }
    ]
  },
  {
    id: 'characters',
    title: 'Character Headshots',
    icon: <Users size={20} className="text-[#39FF14]" />,
    description: 'Exclusive high-res character art featuring Ran$om, Rarri2Trill, and The Architect.',
    items: [
      { name: 'Ran$om - Studio Mode', size: '3.8 MB' },
      { name: 'Rarri2Trill - Live', size: '4.1 MB' },
      { name: 'The Architect - Classified', size: '2.9 MB' }
    ]
  }
];

export function FanKit() {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (itemId: string) => {
    setDownloadingId(itemId);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#39FF14] text-black p-4 rounded-full shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] transition-shadow group flex items-center gap-3"
      >
        <Gift size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="font-mono text-[10px] uppercase tracking-widest font-bold hidden md:block pr-2">
          Fan Kit
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#39FF14] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex items-center gap-4 mb-2">
                  <Gift size={24} className="text-[#39FF14]" />
                  <h2 className="font-display text-2xl font-black italic tracking-tight text-white uppercase">
                    Digital Fan Kit
                  </h2>
                </div>
                <p className="text-white/60 text-sm font-light">
                  Download exclusive assets, wallpapers, and character art to support the movement.
                </p>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
                <div className="grid gap-8">
                  {KIT_ITEMS.map((category) => (
                    <div key={category.id} className="relative">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight mb-1">
                            {category.title}
                          </h3>
                          <p className="text-white/50 text-xs font-light">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-2 pl-[3.25rem]">
                        {category.items.map((item, idx) => {
                          const itemId = `${category.id}-${idx}`;
                          const isDownloading = downloadingId === itemId;

                          return (
                            <div 
                              key={idx}
                              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-colors group"
                            >
                              <div>
                                <h4 className="text-sm font-medium text-white mb-0.5">{item.name}</h4>
                                <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                                  ZIP Archive • {item.size}
                                </span>
                              </div>
                              <button
                                onClick={() => handleDownload(itemId)}
                                disabled={isDownloading}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                  isDownloading 
                                    ? 'bg-[#39FF14] text-black' 
                                    : 'bg-black border border-white/20 text-white hover:bg-white hover:text-black hover:border-white'
                                }`}
                              >
                                {isDownloading ? (
                                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                    <Download size={16} />
                                  </motion.div>
                                ) : (
                                  <Download size={16} />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-[#0a0a0a] border-t border-white/5 text-center">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
                  By downloading these assets, you agree to spread the frequency.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
