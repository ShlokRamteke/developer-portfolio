"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import React from "react";

interface AnimateWhenVisibleProps {
  children: React.ReactNode;
  variants: any;
  className?: string; // className is optional
}

export function AnimateWhenVisible({
  children,
  variants,
  className,
}: AnimateWhenVisibleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
