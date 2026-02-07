
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Fix: Use React.FC to properly handle component props including 'key'
const Sparkle: React.FC<{ i: number }> = ({ i }) => {
  const size = Math.random() * 2 + 1;
  const delay = Math.random() * 5;
  return (
    <motion.div
      initial={{ 
        x: Math.random() * 100 + "vw", 
        y: Math.random() * 100 + "vh", 
        opacity: 0,
        scale: 0 
      }}
      animate={{ 
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
        y: [null, "-5vh"]
      }}
      transition={{ 
        duration: 5 + Math.random() * 10, 
        repeat: Infinity, 
        delay: delay,
        ease: "easeInOut"
      }}
      className="fixed pointer-events-none rounded-full bg-white shadow-[0_0_8px_white]"
      style={{ width: size, height: size }}
    />
  );
};

export const BackgroundEffects: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Transition background colors to blend sections as you scroll
  // Indigo -> Purple -> Deep Rose -> Dark
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#020205", "#0b0b19", "#17131d", "#0a0a0c"]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Mesh Gradient Layer */}
      <motion.div 
        style={{ backgroundColor: bgColor }}
        className="absolute inset-0 transition-colors duration-1000"
      />
      
      {/* Aurora Layer with dynamic opacity */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.4, 0.6]) }}
        className="aurora-bg" 
      />
      
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />

      {/* High Fidelity Bokeh Sparkles */}
      {Array.from({ length: 60 }).map((_, i) => (
        <Sparkle key={i} i={i} />
      ))}

      {/* Floating Gradient Orbs that move with scroll */}
      <motion.div 
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]) 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-rose-500/10 rounded-full blur-[150px]"
      />
    </div>
  );
};
