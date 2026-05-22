import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-emerald-deep pt-16 transition-colors duration-500">
      {/* Background Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute w-[800px] h-[800px] rounded-full bg-emerald-light blur-[120px] -z-10"
      />

      <div className="container mx-auto px-6 text-center z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs md:text-sm tracking-[0.5em] uppercase text-gold mb-6 block"
        >
          Established 2025 • Nepal
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-display font-bold text-pearl mb-12 leading-tight"
        >
          MODERN <br />
          <span className="italic font-normal text-gold">NARI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-pearl max-w-xl mx-auto mb-12 text-lg font-light leading-relaxed"
        >
          Experience the pinnacle of luxury with handcrafted pieces that capture the essence of timeless elegance and modern brilliance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <button
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold group relative overflow-hidden"
          >
            <span className="relative z-10">Discover Collection</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </button>
        </motion.div>
      </div>

      {/* Floating Image Component (Placeholder with CSS) */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 right-10 md:right-32 w-48 h-64 md:w-64 md:h-80 opacity-40 md:opacity-100 hidden sm:block"
      >
        <div className="w-full h-full border border-gold/30 p-2">
          <div className="w-full h-full bg-gradient-to-br from-gold/40 to-obsidian flex items-center justify-center overflow-hidden">
            <div className="w-24 h-24 rotate-45 border-4 border-gold/20 flex items-center justify-center">
              <div className="w-16 h-16 bg-gold blur-xl opacity-50" />
            </div>
          </div>
        </div>
      </motion.div>
      <br /><br />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-pearl/40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
