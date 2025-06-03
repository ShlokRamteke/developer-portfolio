"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Scroll progress indicator
export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return <motion.div className="scroll-indicator" style={{ scaleX }} />;
}
