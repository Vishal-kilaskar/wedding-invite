"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full section-padding text-center relative overflow-hidden" style={{ backgroundColor: "#2c1810" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(183,110,121,0.06) 0%, transparent 70%)",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10"
      >
        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#E6D5B8]/30" />
          <span className="text-[#B76E79]/60 text-sm">❀</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#E6D5B8]/30" />
        </div>

        {/* Names */}
        <h3
          className="text-4xl md:text-5xl mb-4"
          style={{ color: "#FFFDF9", fontFamily: "var(--font-display)" }}
        >
          Vishal & Sneha
        </h3>

        <p className="text-base mb-2" style={{ color: "#E6D5B8", fontWeight: 300, fontFamily: "var(--font-body)" }}>
          July 8 & 9, 2026
        </p>

        <p className="text-sm mb-8" style={{ color: "#FFFDF9", opacity: 0.5, fontWeight: 300 }}>
          Nigudgi Function Hall
        </p>

        {/* Heart divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#B76E79]/30" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#B76E79" opacity="0.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#B76E79]/30" />
        </div>

        <p className="text-xs tracking-wider" style={{ color: "#FFFDF9", opacity: 0.3, fontWeight: 300 }}>
          Made with love by vishal & sneha ❤️
        </p>

        {/* Heart divider */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#B76E79]/30" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#B76E79" opacity="0.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#B76E79]/30" />
        </div>

        <p className="text-xs tracking-wider" style={{ color: "#FFFDF9", opacity: 0.2, fontWeight: 100, fontSize: "8px" }}>
          &copy; Designed &middot; Developed &middot; Deployed by Vishal Kilaskar
        </p>
      </motion.div>
    </footer>
  );
}
