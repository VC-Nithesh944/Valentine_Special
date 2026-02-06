import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypewriterEffect } from "./UI/typewrite-effect";

export const MemorySection: React.FC = () => {
  const ref = useRef(null);

  const words = [
    {
      text: "Some",
    },
    {
      text: "Moments",
    },
    {
      text: "don't",
    },
    {
      text: "need",
    },
    {
      text: "Words.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative h-[80vh] w-full overflow-hidden my-12 md:my-24"
    >
      <div className="relative z-10 h-full w-full flex items-center justify-start px-8 md:px-24">
        <motion.div style={{ y }} className="max-w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-lg italic w-full"
          >
            <TypewriterEffect words={words} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
