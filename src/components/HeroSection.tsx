"use client";

import { motion } from "framer-motion";
import ScratchCard from "./ScratchCard";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #2c1810 0%, #1a0f0a 30%, #2c1810 60%, var(--color-secondary-light) 100%)",
        }}
      />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(183,110,121,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-10 h-10 sm:top-8 sm:left-8 sm:w-16 sm:h-16 border-t-2 border-l-2 border-[#E6D5B8]/20 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-10 h-10 sm:top-8 sm:right-8 sm:w-16 sm:h-16 border-t-2 border-r-2 border-[#E6D5B8]/20 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-10 h-10 sm:bottom-8 sm:left-8 sm:w-16 sm:h-16 border-b-2 border-l-2 border-[#E6D5B8]/20 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-10 h-10 sm:bottom-8 sm:right-8 sm:w-16 sm:h-16 border-b-2 border-r-2 border-[#E6D5B8]/20 rounded-br-lg" />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 w-full max-w-3xl mx-auto" style={{ marginTop: '40px' }}>
        {/* Top flourish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-[#E6D5B8]/50" />
            <span className="text-[#E6D5B8]/60 text-xl">❀</span>
            <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-[#E6D5B8]/50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full flex justify-center mb-10 md:mb-14 px-8 sm:px-12"
        >
          <p
            className="text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] leading-relaxed text-center max-w-[280px] sm:max-w-lg break-words"
            style={{ color: "#E6D5B8", fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            The Kilaskar and Nagasiddu (Chincholikar) families cordially invite you to celebrate the auspicious wedding of
          </p>
        </motion.div>

        {/* Names - using display font */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-1 leading-tight"
          style={{ color: "#FFFDF9", fontFamily: "var(--font-display)" }}
        >
          Vishal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xs sm:text-sm mb-2"
          style={{ color: "#E6D5B8", fontFamily: "var(--font-body)", fontWeight: 300, opacity: 0.7 }}
        >
          S/o Shri Bagoji and Smt Rajeshwari Kilaskar
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="my-3 flex items-center justify-center gap-4"
        >
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#B76E79]/60" />
          <span className="text-2xl md:text-3xl" style={{ color: "#B76E79", fontFamily: "var(--font-display)" }}>
            &
          </span>
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#B76E79]/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-1 leading-tight"
          style={{ color: "#FFFDF9", fontFamily: "var(--font-display)" }}
        >
          Sneha
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-xs sm:text-sm mb-8 md:mb-10"
          style={{ color: "#E6D5B8", fontFamily: "var(--font-body)", fontWeight: 300, opacity: 0.7 }}
        >
          D/o Shri Vijaykumar and Smt Mukta Nagasiddu
        </motion.p>

      </div>

      {/* Spacer */}
      <div className="h-44 sm:h-48 w-full shrink-0" />

      {/* Scratch Card - Save the Date */}
      <div className="relative z-10 px-6 sm:px-8 w-full max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-xs tracking-[0.2em] uppercase mb-8 mt-4 py-2 px-4 text-center"
          style={{ color: '#E6D5B8' }}
        >
          Scratch to reveal
        </motion.p>
        <ScratchCard />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 3 }, y: { duration: 2, repeat: Infinity } }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "#E6D5B8", opacity: 0.5 }}>
            Scroll
          </p>
          <div className="w-px h-8 bg-gradient-to-b from-[#E6D5B8]/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
