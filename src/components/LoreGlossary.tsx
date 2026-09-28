import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen } from 'lucide-react';

const GLOSSARY: Record<string, string> = {
  "sub-bass": "Frequencies below 60Hz, utilized by Ran$om to manipulate gravity and anchor reality.",
  "master console": "The mythical mixing desk where Ran$om controls the fabric of the universe.",
  "f.l.y.": "'Forever Loving You' - A cultural initiative by Rarri2Trill to restore human connection through high-voltage storytelling.",
  "split frequency": "The supernatural event that shattered the original creator's mind into two distinct entities.",
  "beathack": "The process of manipulating reality and time through engineered audio production.",
  "reality engineering": "The act of altering physical space and events using precise sound frequencies.",
  "odessa": "The geographic origin point where the unified vision was first rooted before the divergence.",
  "sub bass": "Frequencies below 60Hz, utilized by Ran$om to manipulate gravity and anchor reality.",
  "fly": "'Forever Loving You' - A cultural initiative by Rarri2Trill to restore human connection through high-voltage storytelling.",
  "frequency": "A measurable rate of audio vibration, used as a weapon by Rarri2Trill and a building block by Ran$om.",
  "rhythmatik": "The unified corporate and creative entity containing both personas."
};

export function LoreGlossary() {
  const [tooltip, setTooltip] = useState<{ text: string, definition: string, x: number, y: number } | null>(null);

  useEffect(() => {
    const handleSelection = () => {
      // Small timeout to allow the browser to complete the selection update
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
          setTooltip(null);
          return;
        }

        const text = selection.toString().trim().toLowerCase();
        if (!text || text.length > 40) { 
          setTooltip(null);
          return;
        }

        // Find exact or partial match
        let matchKey = Object.keys(GLOSSARY).find(key => text === key);
        if (!matchKey) {
          matchKey = Object.keys(GLOSSARY).find(key => text.includes(key));
        }

        if (matchKey) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          
          setTooltip({
            text: matchKey.toUpperCase(),
            definition: GLOSSARY[matchKey],
            x: rect.left + rect.width / 2,
            y: rect.top
          });
        } else {
          setTooltip(null);
        }
      }, 10);
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);
    document.addEventListener('touchend', handleSelection);
    
    // Also dismiss when starting a new selection
    const handleDismiss = () => setTooltip(null);
    document.addEventListener('mousedown', handleDismiss);
    document.addEventListener('touchstart', handleDismiss);
    
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
      document.removeEventListener('mousedown', handleDismiss);
      document.removeEventListener('touchstart', handleDismiss);
    };
  }, []);

  return (
    <AnimatePresence>
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed z-[100] pointer-events-none -translate-x-1/2 -translate-y-full pb-3"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          <div className="bg-black/90 backdrop-blur-xl border border-white/20 p-5 rounded-xl shadow-[0_0_30px_rgba(57,255,20,0.15)] w-72">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={14} className="text-[#39FF14]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#39FF14] font-bold">
                Lore Database Match
              </span>
            </div>
            <h4 className="font-display font-black text-white text-lg uppercase tracking-tight mb-2">
              {tooltip.text}
            </h4>
            <p className="text-white/80 text-xs font-light leading-relaxed">
              {tooltip.definition}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
