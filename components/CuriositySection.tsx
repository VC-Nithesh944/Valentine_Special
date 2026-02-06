
import React from 'react';
import { motion } from 'framer-motion';

const lines = [
  "So I built this.",
  "Line by line.",
  "Thought by thought.",
];

export const CuriositySection: React.FC = () => {
  return (
    <section className="relative min-h-[150vh] py-24 flex flex-col items-center justify-center gap-8">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, delay: i * 0.2 }}
          className="glass-card px-16 py-6 rounded-2xl md:rounded-[2rem] min-w-[300px] md:min-w-[450px] text-center"
        >
          <p className="text-xl md:text-3xl font-serif text-white/90 font-light">
            {line}
          </p>
        </motion.div>
      ))}
    </section>
  );
};
