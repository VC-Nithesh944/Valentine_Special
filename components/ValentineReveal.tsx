
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { DEFAULT_HER_NAME, DEFAULT_YOUR_NAME } from '../constants';

export const ValentineReveal: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const herName = params.get('to') || DEFAULT_HER_NAME;
  const yourName = params.get('from') || DEFAULT_YOUR_NAME;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[100vw] h-[100vw] rounded-full bg-rose-500/10 blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-12"
        >
          <Heart className="w-16 h-16 text-rose-500 fill-rose-500/20 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]" />
        </motion.div>

        <h2 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-none">
          Happy Valentine’s Day, <br />
          <span className="italic font-light text-rose-200 glow-text">{herName}</span>
        </h2>
        
        <div className="max-w-xl mx-auto mt-12 space-y-8">
          <p className="text-white/50 text-xl font-serif italic">
            Everything here... it was to show you that you are worth the time, the effort, and all the love I have to give.
          </p>
          
          <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
          
          <p className="text-rose-100/80 text-2xl md:text-3xl font-serif font-light">
            I've shared my soul today. <br />
            Now, I have one simple wish...
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="mt-20 flex flex-col items-center gap-4"
        >
          <p className="text-white/30 tracking-[0.4em] font-light uppercase text-[10px]">
            Infinite Love, {yourName}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
