"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-07-08T18:00:00+05:30").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="section-padding text-center relative w-full" style={{ backgroundColor: "var(--color-secondary-light)" }}>
      {/* Soft background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Section ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--color-primary)]/30" />
          <span className="text-[var(--color-primary)] text-sm">✿</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--color-primary)]/30" />
        </div>

        <h2
          className="text-3xl md:text-5xl font-semibold mb-2"
          style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}
        >
          Counting Down
        </h2>
        <p
          className="text-sm sm:text-base md:text-lg mb-12 max-w-md mx-auto text-center"
          style={{ color: "var(--color-text-light)", fontFamily: "var(--font-body)", fontWeight: 300 }}
        >
          to the beginning of our forever
        </p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative group"
            >
              <div
                className="glass-card px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 min-w-[72px] sm:min-w-[90px] md:min-w-[120px] transition-all duration-300"
              >
                <motion.span
                  key={block.value}
                  initial={{ scale: 1.1, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light block"
                  style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}
                >
                  {String(block.value).padStart(2, "0")}
                </motion.span>
                <span
                  className="text-xs md:text-sm uppercase tracking-[0.2em] mt-3 block"
                  style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)", fontWeight: 400 }}
                >
                  {block.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
