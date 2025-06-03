"use client";

import { motion } from "framer-motion";

// Text reveal animation variants
export const textReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

export const letterVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

// Text reveal component
export function TextReveal({ text, className }: { text: string; className: string }) {
  return (
    <motion.div
      variants={textReveal}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariant}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
