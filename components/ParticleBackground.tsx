"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

export function ParticleBackground() {
  const { theme } = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const count = Math.min(window.innerWidth / 10, 100);

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 2, // Size between 2-5px
          speed: Math.random() * 5 + 0.3, // Increased speed range from 0.3-1.8
        });
      }

      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener("resize", generateParticles);

    return () => window.removeEventListener("resize", generateParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: "50%",
            backgroundColor:
              theme === "dark"
                ? `rgba(255, 255, 255, 0.15)`
                : `rgba(67, 97, 238, 0.4)`,
          }}
          animate={{
            y: ["-10%", "110%"],
            opacity: [0, 0.8, 0],
            x: [`${particle.x}%`, `${particle.x + (Math.random() * 20 - 10)}%`],
          }}
          transition={{
            duration: 10 / particle.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
