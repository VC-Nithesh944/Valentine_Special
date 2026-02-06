
import React from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_HER_NAME } from '../constants';

export const Hero: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const herName = params.get('to') || DEFAULT_HER_NAME;

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden antialiased">
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-white/30 text-[10px] md:text-xs font-light tracking-[1em] uppercase mb-10">
            A Cinematic Dedication
          </h2>
          <h1 className="text-7xl md:text-[10rem]
          lg:text-[8rem]  font-serif font-light text-white mb-10 tracking-tight leading-none">
            Hey <span className="italic font-light text-rose-200 glow-text">{herName}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 2 }}
          className="relative"
        >
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent mx-auto mb-10" />
          <p className="text-neutral-400 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed italic">
            "In a world of billions, somehow, it's always been you. This isn't just a website. It's a heart, translated into code."
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-6"
      >
        <span className="text-white/20 text-[9px] tracking-[0.6em] uppercase font-medium">Scroll to feel</span>
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-20 bg-gradient-to-b from-white/20 via-rose-500/40 to-transparent" 
        />
      </motion.div>
    </section>
  );
};
