import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const links = [
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Proyectos', href: '#proyectos' },
  ];

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[#f0f0f0] active:scale-95 transition-transform"
        aria-label="Alternar menú"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Effect */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[80px] bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Floating Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-[96px] left-4 right-4 z-50 bg-[#000000] border border-[rgba(214,235,253,0.19)] shadow-[0_0_0_1px_rgba(176,199,217,0.145)] rounded-[24px] flex flex-col pt-4 pb-6 px-4"
            >
              <nav className="flex flex-col gap-1">
                {links.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className="font-sans text-[16px] tracking-[0.35px] font-medium text-[#a1a4a5] active:text-[#f0f0f0] active:bg-[#f0f0f0]/10 px-4 py-4 rounded-[12px] transition-all duration-200 flex items-center justify-between"
                    style={{ fontFeatureSettings: "'ss01', 'ss03', 'ss04'" }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 px-4 w-full"
              >
                <a 
                  href="#contacto"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full bg-white text-black font-sans font-medium text-[16px] tracking-[0.35px] py-4 rounded-[9999px] active:scale-[0.98] active:bg-white/80 transition-all"
                  style={{ fontFeatureSettings: "'ss01', 'ss03', 'ss04'" }}
                >
                  Iniciar Crecimiento
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
