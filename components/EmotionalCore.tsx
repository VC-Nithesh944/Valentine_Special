import React from "react";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Your Light",
    text: "Being with you makes life feel lighter, and I don’t take that for granted, because the calm you bring into my world feels rare and deeply comforting.",
  },
  {
    title: "Your Depth",
    text: "When you share your thoughts with me, I feel trusted in a way that stays with me, and it makes me value you and what we share even more.",
  },
  {
    title: "Your Soul",
    text: "Loving you has slowly become about care and patience rather than excitement, and that’s when I realized I want you in my life for the long run.",
  },
];

export const EmotionalCore: React.FC = () => {
  return (
    <section className="relative py-40 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.2,
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="glass group p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center min-h-[300px] hover:border-rose-500/20 transition-all duration-700"
          >
            <h4 className="text-rose-300/40 text-[10px] tracking-[0.6em] uppercase mb-6 font-medium group-hover:text-rose-300/80 transition-colors">
              {reason.title}
            </h4>
            <p className="text-white/80 font-serif text-2xl italic leading-relaxed">
              "{reason.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
