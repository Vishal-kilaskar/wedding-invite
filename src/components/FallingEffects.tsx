"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  rotation: number;
}

export default function FallingEffects() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 12,
      size: 12 + Math.random() * 18,
      opacity: 0.15 + Math.random() * 0.35,
      rotation: Math.random() * 360,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: "-30px",
            width: petal.size,
            height: petal.size,
            opacity: petal.opacity,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, Math.sin(petal.id * 0.7) * 60, -Math.sin(petal.id * 0.5) * 40, Math.sin(petal.id * 0.3) * 20],
            rotate: [petal.rotation, petal.rotation + 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Cherry blossom petal */}
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="16" cy="12" rx="6" ry="10" fill="#B76E79" opacity="0.7" transform="rotate(-15 16 16)" />
            <ellipse cx="16" cy="12" rx="5" ry="9" fill="#d4949c" opacity="0.5" transform="rotate(15 16 16)" />
            <ellipse cx="14" cy="14" rx="4" ry="8" fill="#e8b4bb" opacity="0.4" transform="rotate(-30 16 16)" />
            <circle cx="16" cy="16" r="2" fill="#c9a96e" opacity="0.6" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
