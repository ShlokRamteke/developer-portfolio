"use client";

import { motion } from "framer-motion";

export function GeometricShapes() {
  const shapes = [
    { type: "circle", size: 100, x: "10%", y: "20%", color: "var(--primary)" },
    { type: "square", size: 80, x: "80%", y: "15%", color: "var(--secondary)" },
    { type: "triangle", size: 120, x: "70%", y: "60%", color: "var(--accent)" },
    { type: "circle", size: 150, x: "20%", y: "70%", color: "var(--primary)" },
    { type: "square", size: 60, x: "40%", y: "30%", color: "var(--secondary)" },
    { type: "circle", size: 90, x: "85%", y: "85%", color: "var(--accent)" },
    {
      type: "triangle",
      size: 70,
      x: "15%",
      y: "40%",
      color: "var(--secondary)",
    },
    { type: "square", size: 110, x: "60%", y: "80%", color: "var(--primary)" },
    { type: "circle", size: 130, x: "30%", y: "10%", color: "var(--accent)" },
    { type: "triangle", size: 95, x: "50%", y: "50%", color: "var(--primary)" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`geometric-shape ${shape.type}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            backgroundColor: `hsl(${shape.color})`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
