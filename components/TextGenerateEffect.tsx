
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const wordsArray = words.split(" ");

  useEffect(() => {
    if (isInView) {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 1, ease: "easeOut" },
      }));
    }
  }, [isInView, controls]);

  return (
    <div className={cn("font-serif", className)} ref={ref}>
      <div className="mt-4">
        <div className="text-white text-2xl md:text-4xl leading-snug tracking-wide">
          {wordsArray.map((word, idx) => {
            return (
              <motion.span
                key={word + idx}
                custom={idx}
                animate={controls}
                initial={{ opacity: 0, y: 10 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
