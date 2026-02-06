
import React from 'react';
import { motion } from 'framer-motion';

const messages = [
  {
    title: "The Unspoken",
    text: "I don’t always know how to say it, but my heart feels settled whenever I think of you."
  },
  {
    title: "The Quiet Truth",
    text: "You aren't just a part of my story; you are the ink. Every page I've turned since we met has been brighter because you exist."
  },
  {
    title: "The Connection",
    text: "You’re not just important to me — you’re someone I want beside me as life unfolds."
  }
];

export const ConfessionSection: React.FC = () => {
  return (
    <section className="py-40 px-6 max-w-5xl mx-auto flex flex-col gap-32">
      {messages.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: i * 0.2 }}
          className="relative"
        >
          
          <h3 className="text-rose-300/60 font-serif text-xl tracking-widest uppercase mb-6 pl-2">
            {item.title}
          </h3>
          <p className="text-3xl md:text-5xl font-serif text-white/90 leading-tight md:leading-snug">
            {item.text}
          </p>
        </motion.div>
      ))}
    </section>
  );
};
