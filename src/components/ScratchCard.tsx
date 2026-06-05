"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

// Helper
function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Premium confetti particle with gravity physics
interface ParticleConfig {
  id: number;
  x: number;
  y: number;
  angle: number;
  velocity: number;
  color: string;
  size: number;
  shape: "circle" | "rect" | "star";
  rotateEnd: number;
  drift: number;
}

function generateParticles(count: number, originY: number): ParticleConfig[] {
  const colors = ["#B76E79", "#E6D5B8", "#c9a96e", "#FFFDF9", "#ff6b8a", "#ffd700", "#ff9a9e", "#fecfef"];
  const shapes: ("circle" | "rect" | "star")[] = ["circle", "rect", "star"];

  return Array.from({ length: count }, (_, i) => {
    const angle = randomInRange(55, 125) * (Math.PI / 180);
    const velocity = randomInRange(300, 600);
    return {
      id: i,
      x: randomInRange(-20, 20),
      y: originY,
      angle,
      velocity,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: randomInRange(4, 10),
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotateEnd: randomInRange(360, 1080) * (Math.random() > 0.5 ? 1 : -1),
      drift: randomInRange(-40, 40),
    };
  });
}

function ConfettiCanvas({ show }: { show: boolean }) {
  const particles = useMemo(() => (show ? generateParticles(60, 0.5) : []), [show]);

  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[100] overflow-visible">
      {particles.map((p) => {
        // Random start position spread across the entire card
        const startX = randomInRange(5, 95);
        const startY = randomInRange(5, 95);
        // Random spread direction — some go up, some sideways, some diagonal
        const spreadX = randomInRange(-180, 180);
        const spreadY = randomInRange(-200, 150);
        const duration = randomInRange(1.5, 3);

        return (
          <motion.div
            key={p.id}
            initial={{
              left: `${startX}%`,
              top: `${startY}%`,
              opacity: 1,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              left: [`${startX}%`, `calc(${startX}% + ${spreadX * 0.4}px)`, `calc(${startX}% + ${spreadX}px)`],
              top: [`${startY}%`, `calc(${startY}% + ${spreadY * 0.3}px)`, `calc(${startY}% + ${spreadY + randomInRange(50, 150)}px)`],
              opacity: [0, 1, 1, 0],
              scale: [0, 1.4, 1, 0.3],
              rotate: [0, p.rotateEnd * 0.4, p.rotateEnd],
            }}
            transition={{
              duration,
              delay: randomInRange(0, 0.4),
              ease: [0.15, 0.7, 0.3, 1],
            }}
            className="absolute pointer-events-none"
            style={{
              width: `${p.size}px`,
              height: p.shape === "rect" ? `${p.size * 0.6}px` : `${p.size}px`,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : p.shape === "star" ? "2px" : "1px",
              boxShadow: `0 0 ${p.size * 0.5}px ${p.color}40`,
            }}
          />
        );
      })}

      {/* Burst glow effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5, 2] }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(183,110,121,0.4) 0%, transparent 70%)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.4, 0], scale: [0.5, 2, 3] }}
        transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(201,169,110,0.3) 0%, transparent 70%)" }}
      />
    </div>
  );
}

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  const width = 240;
  const height = 165;

  // Draw the heart-shaped scratch overlay
  const drawHeart = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);

    // Background fill
    ctx.fillStyle = "rgba(183, 110, 121, 1)";
    ctx.fillRect(0, 0, width, height);

    // Heart path
    const cx = width / 2;
    const cy = height / 2 - 5;
    const heartSize = 50;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy + heartSize * 0.7);
    ctx.bezierCurveTo(
      cx - heartSize * 1.2, cy,
      cx - heartSize * 1.2, cy - heartSize * 0.8,
      cx, cy - heartSize * 0.4
    );
    ctx.bezierCurveTo(
      cx + heartSize * 1.2, cy - heartSize * 0.8,
      cx + heartSize * 1.2, cy,
      cx, cy + heartSize * 0.7
    );
    ctx.closePath();

    // Draw golden heart outline
    ctx.strokeStyle = "#E6D5B8";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fill heart with a shimmery gradient
    const grad = ctx.createLinearGradient(cx - heartSize, cy - heartSize, cx + heartSize, cy + heartSize);
    grad.addColorStop(0, "#c9a96e");
    grad.addColorStop(0.5, "#E6D5B8");
    grad.addColorStop(1, "#c9a96e");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // Add "Scratch Here" text
    ctx.fillStyle = "#2c1810";
    ctx.font = "500 11px Montserrat, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ Scratch the heart ✨", cx, height - 20);

    // Add small heart sparkles
    ctx.fillStyle = "#E6D5B8";
    ctx.font = "10px serif";
    ctx.fillText("♡", 40, 30);
    ctx.fillText("♡", width - 40, 30);
    ctx.fillText("♡", 30, height - 30);
    ctx.fillText("♡", width - 30, height - 30);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawHeart(ctx);
  }, [drawHeart]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const percent = (transparent / (pixels.length / 4)) * 100;
    setScratchPercent(percent);

    if (percent > 40) {
      setIsRevealed(true);
    }
  };

  const getCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsScratching(true);
    const { x, y } = getCoords(e);
    scratch(x, y);
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isScratching) return;
    const { x, y } = getCoords(e);
    scratch(x, y);
  };

  const handleEnd = () => {
    setIsScratching(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.2 }}
      className="w-full flex justify-center relative"
    >
      <div className="relative">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          boxShadow: "0 8px 32px rgba(183, 110, 121, 0.2), inset 0 0 30px rgba(183, 110, 121, 0.05)",
          border: "1px solid rgba(230, 213, 184, 0.3)",
        }}
      >
        {/* Revealed content underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#2c1810] to-[#1a0f0a]">
          <motion.div
            animate={isRevealed ? { scale: [0.8, 1.1, 1], opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p
              className="text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: "#B76E79" }}
            >
              Circle the Date
            </p>
            <p
              className="text-2xl sm:text-3xl font-medium"
              style={{ color: "#FFFDF9", fontFamily: "var(--font-heading)" }}
            >
              9th July
            </p>
            <p
              className="text-lg sm:text-xl mt-1"
              style={{ color: "#E6D5B8", fontFamily: "var(--font-heading)" }}
            >
              2026
            </p>
            {isRevealed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[10px] mt-3 tracking-wider"
                style={{ color: "#E6D5B8", opacity: 0.6 }}
              >
                ✨ See you there! ✨
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Scratch canvas overlay */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="absolute inset-0 cursor-pointer z-10 touch-none"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
        )}

        {/* Reveal animation overlay */}
        {isRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none z-10"
          />
        )}
      </div>

      {/* Party popper confetti - positioned relative to scratch card */}
      <ConfettiCanvas show={isRevealed} />
      </div>
    </motion.div>
  );
}
