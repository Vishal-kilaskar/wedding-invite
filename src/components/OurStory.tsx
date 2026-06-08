"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    id: 1,
    title: "How We Met",
    description: "The universe had its own plans when our paths crossed for the first time. A chance meeting that would change everything.",
    icon: "✨",
  },
  {
    id: 2,
    title: "First Connection",
    description: "From casual conversations to late-night talks, we realized we had found something truly special in each other.",
    icon: "💬",
  },
  {
    id: 3,
    title: "Falling in Love",
    description: "Every moment together made our bond stronger. We knew this was more than just a chapter — it was the whole story.",
    icon: "💕",
  },
  {
    id: 4,
    title: "The Proposal",
    description: "With hearts full of love and eyes full of dreams, we decided to spend forever together.",
    icon: "💍",
  },
  {
    id: 5,
    title: "Forever Begins",
    description: "And now, we invite you to witness the beginning of our forever as we take this beautiful journey together.",
    icon: "♾️",
  },
];

export default function OurStory() {
  return (
    <section className="section-padding relative w-full" style={{ backgroundColor: "var(--color-secondary-light)" }}>
      {/* Soft ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, var(--color-primary), transparent)", filter: "blur(80px)" }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--color-primary)]/30" />
          <span className="text-sm" style={{ color: "var(--color-primary)" }}>✿</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--color-primary)]/30" />
        </div>
        <h2
          className="text-3xl md:text-5xl font-semibold mb-3"
          style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}
        >
          Our Love Story
        </h2>
        <p className="text-base md:text-lg italic max-w-md mx-auto" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
          Every love story is beautiful, but ours is our favorite
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6 md:px-8">
        {/* Vertical timeline line */}
        <div
          className="absolute left-8 sm:left-10 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-primary), var(--color-primary), transparent)", opacity: 0.25 }}
        />

        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`relative flex items-start mb-12 last:mb-0 ${
              index % 2 === 0
                ? "md:flex-row"
                : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-6 sm:left-8 md:left-1/2 md:-translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full z-10 flex items-center justify-center text-sm"
              style={{
                backgroundColor: "var(--color-card)",
                border: "2.5px solid var(--color-primary)",
                boxShadow: "0 0 0 5px var(--color-secondary-light), 0 0 15px rgba(183, 110, 121, 0.15)",
              }}
              whileInView={{ scale: [0.5, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <span className="text-xs">{milestone.icon}</span>
            </motion.div>

            {/* Content card */}
            <div
              className={`ml-16 sm:ml-20 md:ml-0 w-full md:w-[calc(50%-2.5rem)] glass-card p-6 sm:p-7 md:p-8 ${
                index % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"
              }`}
            >
              <h3
                className="text-lg sm:text-xl font-semibold mb-2"
                style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}
              >
                {milestone.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-light)", fontWeight: 300 }}>
                {milestone.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
