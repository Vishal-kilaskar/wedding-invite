"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DoorOpeningProps {
  onOpen: () => void;
}

// Deterministic pseudo-random values for particles to avoid hydration mismatch
const PARTICLES = Array.from({ length: 12 }).map((_, i) => ({
  width: 4 + ((i * 7 + 3) % 10) * 0.6,
  height: 4 + ((i * 5 + 7) % 10) * 0.6,
  left: 10 + ((i * 13 + 5) % 80),
  top: 10 + ((i * 11 + 3) % 80),
  duration: 3 + ((i * 3 + 2) % 4),
  delay: ((i * 7 + 1) % 30) / 10,
}));

// Pre-computed scalloped arch dot positions to avoid hydration mismatch
const ARCH_DOTS = Array.from({ length: 13 }).map((_, i) => {
  const angle = Math.PI + (Math.PI * i) / 12;
  return {
    cx: Math.round((150 + Math.cos(angle) * 82) * 100) / 100,
    cy: Math.round((65 + Math.sin(angle) * 55) * 100) / 100,
  };
});

export default function DoorOpening({ onOpen }: DoorOpeningProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 2200);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #2c1810 0%, #1a0f0a 40%, #2c1810 100%)",
        }}
        animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1, delay: isOpening ? 1.5 : 0 }}
      >
        {/* Ambient light particles */}
        {PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particle.width,
              height: particle.height,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: "radial-gradient(circle, rgba(183,110,121,0.4), transparent)",
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        {/* Outer decorative frame */}
        <div className="absolute inset-6 md:inset-12 border border-[#B76E79]/20 rounded-2xl" />
        <div className="absolute inset-8 md:inset-14 border border-[#E6D5B8]/10 rounded-xl" />

        {/* Door container */}
        <div className="door-container w-full h-full flex flex-col items-center justify-center">
          {/* Ganapati Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative mb-4"
          >
            {/* Glow behind Ganapati */}
            <motion.div
              className="absolute inset-[-20px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(230,213,184,0.25) 0%, rgba(201,169,110,0.1) 40%, transparent 70%)",
                filter: "blur(12px)",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.svg
              width="100"
              height="120"
              viewBox="0 0 300 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 md:w-[120px] md:h-[145px]"
            >
              <defs>
                <linearGradient id="ganesha-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5e6a3" />
                  <stop offset="40%" stopColor="#e8a828" />
                  <stop offset="70%" stopColor="#d4881a" />
                  <stop offset="100%" stopColor="#c96a10" />
                </linearGradient>
                <linearGradient id="ganesha-grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f5d062" />
                  <stop offset="100%" stopColor="#d4781a" />
                </linearGradient>
              </defs>

              {/* ===== DECORATIVE ARCH / HALO (scalloped mandala-like top) ===== */}
              {/* Semi-circular beaded arch */}
              <path
                d="M150 12 
                   Q170 12 185 18 Q200 24 210 35 Q220 46 225 60 Q230 74 228 88
                   M150 12
                   Q130 12 115 18 Q100 24 90 35 Q80 46 75 60 Q70 74 72 88"
                stroke="url(#ganesha-grad)"
                strokeWidth="3"
                fill="none"
              />
              {/* Scalloped dots along the arch */}
              {ARCH_DOTS.map((dot, i) => (
                <circle key={`dot-${i}`} cx={dot.cx} cy={dot.cy} r="2.5" fill="url(#ganesha-grad)" />
              ))}

              {/* ===== DECORATIVE CROWN (pointed ornamental top) ===== */}
              <path
                d="M130 55 Q135 42 140 48 Q145 38 150 45 Q155 38 160 48 Q165 42 170 55"
                fill="url(#ganesha-grad)"
              />
              {/* Crown tip/jewel */}
              <path
                d="M145 42 Q150 28 155 42"
                fill="url(#ganesha-grad)"
              />
              <circle cx="150" cy="30" r="4" fill="url(#ganesha-grad)" />
              
              {/* ===== HEAD (elephant shape) ===== */}
              <path
                d="M115 90 Q115 60 150 58 Q185 60 185 90 Q185 110 175 115 Q165 120 150 118 Q135 120 125 115 Q115 110 115 90 Z"
                fill="url(#ganesha-grad)"
              />

              {/* ===== FOREHEAD DETAILS ===== */}
              {/* Third eye / tilak area */}
              <path
                d="M143 68 Q150 62 157 68 Q150 74 143 68 Z"
                fill="url(#ganesha-grad2)"
                opacity={0.6}
              />
              <circle cx="150" cy="68" r="2" fill="#c96a10" />

              {/* ===== EYES ===== */}
              <path
                d="M130 82 Q135 78 140 82 Q135 86 130 82 Z"
                fill="#2c1810"
              />
              <path
                d="M160 82 Q165 78 170 82 Q165 86 160 82 Z"
                fill="#2c1810"
              />

              {/* ===== LARGE EARS (decorative fan-shaped, spread outward) ===== */}
              {/* Left ear */}
              <path
                d="M115 85 Q95 65 80 72 Q65 80 68 95 Q70 108 82 115 Q95 122 110 110 Q115 105 115 95"
                fill="url(#ganesha-grad)"
              />
              {/* Left ear inner decoration */}
              <path
                d="M108 88 Q95 75 85 80 Q76 86 78 96 Q80 105 88 110 Q98 115 106 106"
                stroke="url(#ganesha-grad2)"
                strokeWidth="2"
                fill="none"
                opacity={0.5}
              />
              {/* Right ear */}
              <path
                d="M185 85 Q205 65 220 72 Q235 80 232 95 Q230 108 218 115 Q205 122 190 110 Q185 105 185 95"
                fill="url(#ganesha-grad)"
              />
              {/* Right ear inner decoration */}
              <path
                d="M192 88 Q205 75 215 80 Q224 86 222 96 Q220 105 212 110 Q202 115 194 106"
                stroke="url(#ganesha-grad2)"
                strokeWidth="2"
                fill="none"
                opacity={0.5}
              />

              {/* ===== TRUNK (curving left, stylized S-curve) ===== */}
              <motion.path
                d="M150 105 Q148 115 144 125 Q138 138 130 148 Q122 158 118 165 Q114 172 120 175 Q126 178 130 172 Q134 165 132 158 Q128 150 125 145"
                fill="url(#ganesha-grad)"
                stroke="url(#ganesha-grad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  d: [
                    "M150 105 Q148 115 144 125 Q138 138 130 148 Q122 158 118 165 Q114 172 120 175 Q126 178 130 172 Q134 165 132 158 Q128 150 125 145",
                    "M150 105 Q149 115 146 125 Q140 138 133 148 Q126 158 122 165 Q118 172 124 176 Q130 179 133 172 Q136 165 134 158 Q130 150 127 145",
                    "M150 105 Q148 115 144 125 Q138 138 130 148 Q122 158 118 165 Q114 172 120 175 Q126 178 130 172 Q134 165 132 158 Q128 150 125 145",
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* ===== HANDS (stylized, left=open palm blessing, right=holding diya/lamp) ===== */}
              {/* Left hand - open palm (Abhaya) */}
              <g>
                <path
                  d="M82 130 Q70 140 62 148 Q56 155 58 160 Q60 165 66 162"
                  stroke="url(#ganesha-grad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Open palm */}
                <path
                  d="M58 160 Q54 154 50 156 Q47 158 48 162 Q49 168 54 172 Q58 175 62 173 Q66 170 64 165 Q62 162 58 160 Z"
                  fill="url(#ganesha-grad)"
                />
                {/* Palm lines */}
                <path d="M52 162 Q56 164 56 168" stroke="#c96a10" strokeWidth="0.8" fill="none" opacity={0.5} />
                <path d="M54 160 Q57 161 58 164" stroke="#c96a10" strokeWidth="0.8" fill="none" opacity={0.5} />
              </g>

              {/* Right hand - holding diya/lamp */}
              <g>
                <path
                  d="M218 130 Q230 140 238 148 Q244 155 242 160 Q240 165 234 162"
                  stroke="url(#ganesha-grad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Diya (lamp) */}
                <path
                  d="M234 155 Q230 150 226 152 Q224 155 226 158 Q228 161 232 162 Q236 163 240 160 Q242 157 240 154 Q238 152 234 155 Z"
                  fill="url(#ganesha-grad)"
                />
                {/* Flame */}
                <motion.path
                  d="M233 148 Q234 143 233 140 Q232 137 231 140 Q230 143 231 148"
                  fill="url(#ganesha-grad2)"
                  animate={{ scaleY: [1, 1.2, 0.9, 1], opacity: [0.8, 1, 0.7, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </g>

              {/* ===== BODY / TORSO (rounded, symbolic) ===== */}
              <path
                d="M120 120 Q110 140 108 160 Q106 180 115 195 Q125 210 150 212 Q175 210 185 195 Q194 180 192 160 Q190 140 180 120"
                fill="url(#ganesha-grad)"
                opacity={0.9}
              />
              {/* Belly detail - rounded inner */}
              <path
                d="M128 145 Q125 165 130 180 Q138 195 150 197 Q162 195 170 180 Q175 165 172 145"
                fill="none"
                stroke="url(#ganesha-grad2)"
                strokeWidth="1.5"
                opacity={0.4}
              />

              {/* ===== BOTTOM DECORATIVE LOTUS / FLOWING BASE ===== */}
              {/* Main flowing curves at bottom - signature decorative element */}
              <path
                d="M150 215 Q130 220 110 230 Q90 240 75 248 Q60 255 50 258 Q40 260 38 255 Q36 248 45 242 Q55 235 70 232 Q85 228 100 228 Q115 228 130 232 Q140 235 150 240"
                fill="url(#ganesha-grad)"
                opacity={0.85}
              />
              <path
                d="M150 215 Q170 220 190 230 Q210 240 225 248 Q240 255 250 258 Q260 260 262 255 Q264 248 255 242 Q245 235 230 232 Q215 228 200 228 Q185 228 170 232 Q160 235 150 240"
                fill="url(#ganesha-grad)"
                opacity={0.85}
              />
              {/* Inner flowing tails curving inward */}
              <path
                d="M150 240 Q135 248 120 255 Q105 262 95 268 Q85 272 82 268 Q80 264 86 260 Q95 254 108 250 Q120 246 135 244 Q145 242 150 245"
                fill="url(#ganesha-grad)"
                opacity={0.7}
              />
              <path
                d="M150 240 Q165 248 180 255 Q195 262 205 268 Q215 272 218 268 Q220 264 214 260 Q205 254 192 250 Q180 246 165 244 Q155 242 150 245"
                fill="url(#ganesha-grad)"
                opacity={0.7}
              />

              {/* Central decorative element at bottom */}
              <path
                d="M140 248 Q145 255 150 258 Q155 255 160 248 Q155 252 150 254 Q145 252 140 248 Z"
                fill="url(#ganesha-grad)"
              />

              {/* ===== FEATHER/LEAF DECORATIVE FLOURISHES spreading from center ===== */}
              <path
                d="M150 210 Q140 215 130 218 Q120 220 115 218"
                stroke="url(#ganesha-grad)"
                strokeWidth="2"
                fill="none"
                opacity={0.6}
              />
              <path
                d="M150 210 Q160 215 170 218 Q180 220 185 218"
                stroke="url(#ganesha-grad)"
                strokeWidth="2"
                fill="none"
                opacity={0.6}
              />

              {/* ===== DECORATIVE DOTS / BEADING ===== */}
              <circle cx="150" cy="56" r="2" fill="url(#ganesha-grad2)" opacity={0.8} />
              <circle cx="142" cy="52" r="1.5" fill="url(#ganesha-grad2)" opacity={0.6} />
              <circle cx="158" cy="52" r="1.5" fill="url(#ganesha-grad2)" opacity={0.6} />
            </motion.svg>
          </motion.div>

          {/* Shree Ganeshaya Namaha text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xs md:text-sm tracking-[0.2em] mb-2 text-center"
            style={{ color: "#E6D5B8", fontFamily: "var(--font-heading)", opacity: 0.7 }}
          >
            ॥ श्री गणेशाय नमः ॥
          </motion.p>

          {/* Top text */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm md:text-base tracking-[0.4em] uppercase mb-8 text-center"
            style={{ color: "#E6D5B8", fontFamily: "var(--font-body)" }}
          >
            Wedding Invitation
          </motion.p>

          {/* Doors */}
          <div className={`relative w-[90%] max-w-[550px] h-[50vh] sm:h-[55vh] max-h-[450px] flex ${isOpening ? "door-open" : ""}`}>
            {/* Left Door */}
            <motion.div
              className="door-left w-1/2 h-full rounded-l-2xl flex items-center justify-center cursor-pointer relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #3d2020 0%, #2a1515 50%, #1f0f0f 100%)",
                border: "2px solid rgba(183, 110, 121, 0.3)",
                boxShadow: "inset 0 0 60px rgba(183, 110, 121, 0.05), 0 0 30px rgba(0,0,0,0.5)",
              }}
              whileHover={{ boxShadow: "inset 0 0 80px rgba(183, 110, 121, 0.1), 0 0 40px rgba(0,0,0,0.6)" }}
              onClick={handleOpen}
            >
              {/* Ornamental border inside */}
              <div className="absolute inset-3 border border-[#B76E79]/20 rounded-l-xl" />
              <div className="absolute inset-5 border border-[#E6D5B8]/10 rounded-l-lg" />
              
              {/* Door handle */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-16 rounded-full bg-gradient-to-b from-[#E6D5B8] via-[#c9a96e] to-[#E6D5B8]" />

              <motion.p
                className="text-3xl sm:text-4xl md:text-6xl font-bold pr-6"
                style={{ color: "#B76E79", fontFamily: "var(--font-display)" }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                शुभ
              </motion.p>
            </motion.div>

            {/* Right Door */}
            <motion.div
              className="door-right w-1/2 h-full rounded-r-2xl flex items-center justify-center cursor-pointer relative overflow-hidden"
              style={{
                background: "linear-gradient(200deg, #3d2020 0%, #2a1515 50%, #1f0f0f 100%)",
                border: "2px solid rgba(183, 110, 121, 0.3)",
                boxShadow: "inset 0 0 60px rgba(183, 110, 121, 0.05), 0 0 30px rgba(0,0,0,0.5)",
              }}
              whileHover={{ boxShadow: "inset 0 0 80px rgba(183, 110, 121, 0.1), 0 0 40px rgba(0,0,0,0.6)" }}
              onClick={handleOpen}
            >
              {/* Ornamental border inside */}
              <div className="absolute inset-3 border border-[#B76E79]/20 rounded-r-xl" />
              <div className="absolute inset-5 border border-[#E6D5B8]/10 rounded-r-lg" />

              {/* Door handle */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-16 rounded-full bg-gradient-to-b from-[#E6D5B8] via-[#c9a96e] to-[#E6D5B8]" />

              <motion.p
                className="text-3xl sm:text-4xl md:text-6xl font-bold pl-6"
                style={{ color: "#B76E79", fontFamily: "var(--font-display)" }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                विवाह
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom - Tap to open */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.p
              className="text-base md:text-lg tracking-[0.2em]"
              style={{ color: "#E6D5B8", fontFamily: "var(--font-body)", fontWeight: 300 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Tap to Open
            </motion.p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E6D5B8" strokeWidth="1.5" opacity={0.6}>
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
