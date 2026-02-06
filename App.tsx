import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Hero } from "./components/Hero";
import { CuriositySection } from "./components/CuriositySection";
import { EmotionalCore } from "./components/EmotionalCore";
import { MemorySection } from "./components/MemorySection";
import { ConfessionSection } from "./components/ConfessionSection";
import { ValentineReveal } from "./components/ValentineReveal";
import { FinalLanding } from "./components/FinalLanding";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { Generator } from "./components/Generator";
import { DEFAULT_HER_NAME, DEFAULT_YOUR_NAME } from "./constants";

const App: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isGeneratorMode, setIsGeneratorMode] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Dynamic naming based on URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const to = params.get("to");

    if (!from || !to) {
      setIsGeneratorMode(true);
    }
  }, []);

  const handleStart = () => {
    setHasInteracted(true);
  };

  // If we are in Generator Mode, render the landing page for users to create links
  if (isGeneratorMode) {
    return (
      <div className="relative min-h-screen selection:bg-rose-500/30 overflow-x-hidden bg-[#020205]">
        <BackgroundEffects />
        <Generator />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen selection:bg-rose-500/30 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-300 via-white to-blue-300 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Fixed Unified Background */}
      <BackgroundEffects />

      <AnimatePresence>
        {!hasInteracted ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020205]"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-transparent to-blue-500/20"
            />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/40 text-[10px] tracking-[0.8em] uppercase mb-12 relative z-10"
            >
              For your eyes only
            </motion.h2>

            <motion.button
              whileHover={{ scale: 1.05, letterSpacing: "0.4em" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-16 py-6 border border-white/10 rounded-full font-light tracking-[0.3em] text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-1000 backdrop-blur-md relative z-10 uppercase text-xs"
            >
              Enter My Heart
            </motion.button>
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="relative z-10 w-full"
          >
            <Hero />
            <CuriositySection />
            <EmotionalCore />
            <MemorySection />
            <ConfessionSection />
            <ValentineReveal />
            <FinalLanding />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
