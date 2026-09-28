import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Music', href: '#discography' },
    { name: 'Comics', href: '#comics-section' },
    { name: 'Mini-Doc', href: '#studio-doc' },
    { name: 'The Split', href: '#duality' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Culture', href: '#culture' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex flex-col">
          <a href="#" className="font-display font-black text-2xl tracking-tighter italic leading-none text-white">
            RHYTHMATIK<span className="text-brand-green">, INC</span>
          </a>
          <span className="text-[10px] tracking-[0.3em] font-mono text-white/50 uppercase block mt-1">San Angelo // Odessa TX</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center text-[11px] uppercase tracking-[0.2em] font-semibold text-white/70">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-brand-green transition-colors relative group"
            >
              {link.name}
            </a>
          ))}
          <button className="px-4 py-1 border border-brand-green text-brand-green hover:bg-brand-green hover:text-black transition-all">
            CONTACT EMPIRE
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-2xl font-medium text-white hover:text-brand-green transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full mt-4 px-6 py-4 bg-brand-green text-brand-black font-bold tracking-widest text-sm uppercase">
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
