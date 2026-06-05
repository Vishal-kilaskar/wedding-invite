"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Placeholder images - replace with actual pre-wedding photos
const photos = [
  {
    id: 1,
    src: "/photos/photo1.jpg",
    alt: "Vishal & Sneha - 1",
    placeholder: "https://placehold.co/800x600/FDF2F0/B76E79?text=Photo+1",
  },
  {
    id: 2,
    src: "/photos/photo2.jpg",
    alt: "Vishal & Sneha - 2",
    placeholder: "https://placehold.co/800x600/FDF2F0/B76E79?text=Photo+2",
  },
  {
    id: 3,
    src: "/photos/photo3.jpg",
    alt: "Vishal & Sneha - 3",
    placeholder: "https://placehold.co/800x600/FDF2F0/B76E79?text=Photo+3",
  },
  {
    id: 4,
    src: "/photos/photo4.jpg",
    alt: "Vishal & Sneha - 4",
    placeholder: "https://placehold.co/800x600/FDF2F0/B76E79?text=Photo+4",
  },
  {
    id: 5,
    src: "/photos/photo5.jpg",
    alt: "Vishal & Sneha - 5",
    placeholder: "https://placehold.co/800x600/FDF2F0/B76E79?text=Photo+5",
  },
];

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section
      className="section-padding relative overflow-hidden w-full"
      style={{ background: "linear-gradient(180deg, var(--color-secondary-light) 0%, #FDF8F6 30%, #FFF9F5 100%)" }}
    >
      {/* Subtle decorative background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #B76E79 1px, transparent 1px),
                           radial-gradient(circle at 80% 70%, #CFA98B 1px, transparent 1px)`,
          backgroundSize: "60px 60px, 80px 80px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        {/* Ornamental flourish */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#B76E79]/40" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#B76E79" opacity="0.6"/>
          </svg>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#B76E79]/40" />
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{ color: "#2c1810", fontFamily: "var(--font-heading)" }}
        >
          Our Moments Together
        </h2>
        <p className="text-[#6B5E5A]/70 text-sm md:text-base max-w-md mx-auto">
          Captured memories that we hold dear to our hearts
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[16/10] shadow-xl mx-auto"
          style={{
            border: "1px solid rgba(183, 110, 121, 0.15)",
            boxShadow: "0 20px 60px rgba(183, 110, 121, 0.1), 0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={photos[currentIndex].placeholder}
              alt={photos[currentIndex].alt}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* Soft overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Navigation arrows */}
          <motion.button
            onClick={prevPhoto}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              color: "#B76E79",
              border: "1px solid rgba(183, 110, 121, 0.2)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
          <motion.button
            onClick={nextPhoto}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              color: "#B76E79",
              border: "1px solid rgba(183, 110, 121, 0.2)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>

          {/* Photo counter */}
          <div
            className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              color: "#6B5E5A",
              border: "1px solid rgba(183, 110, 121, 0.15)",
            }}
          >
            {currentIndex + 1} / {photos.length}
          </div>
        </motion.div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {photos.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              className="rounded-full transition-all duration-300"
              style={{
                width: index === currentIndex ? "24px" : "10px",
                height: "10px",
                backgroundColor: index === currentIndex ? "#B76E79" : "rgba(183, 110, 121, 0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
