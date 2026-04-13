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
    { name: 'Planes', href: '#planes' },
  ];

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-white hover:text-orange transition-colors"
        aria-label="Abrir menú"
      >
        <Menu size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-black border-l border-border flex flex-col pt-6 pb-8 px-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-bold text-xl tracking-tight text-white">
                ONE OUT
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted hover:text-orange transition-colors"
                aria-label="Cerrar menú"
              >
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="font-display tracking-tight text-4xl text-muted hover:text-white transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto">
              <a 
                href="#contacto"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-orange text-white font-display font-bold text-sm tracking-widest uppercase py-4 outline-none active:bg-orange/80 transition-colors"
              >
                Iniciar Cotización
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
