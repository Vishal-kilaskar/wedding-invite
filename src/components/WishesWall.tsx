"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch (error) {
      console.error("Failed to fetch wishes:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.error("Failed to submit wish:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding relative w-full" style={{ backgroundColor: "var(--color-background)" }}>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle, var(--color-sage) 1px, transparent 1px)",
        backgroundSize: "35px 35px",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center mb-12 relative z-10"
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
          Wishes & Blessings
        </h2>
        <p className="text-base md:text-lg" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
          Leave your heartfelt wishes for the couple
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 px-4 sm:px-6">
        {/* Wish form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {submitted ? (
            <div className="glass-card p-10 text-center">
              <motion.span
                className="text-4xl block mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💝
              </motion.span>
              <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}>
                Thank You!
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
                Your wish has been submitted and will appear after approval.
              </p>
              {/* <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--color-primary)", color: "#ffffff" }}
              >
                Send Another Wish
              </button> */}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-7">
              <div className="mb-5">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your Name"
                  className="w-full px-5 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30 transition-all duration-300"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-text)",
                    fontSize: "0.95rem",
                  }}
                />
              </div>
              <div className="mb-5">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="Write your wishes for Vishal & Sneha..."
                  className="w-full px-5 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30 transition-all duration-300 resize-none"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-text)",
                    fontSize: "0.95rem",
                  }}
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-full font-medium text-sm transition-all duration-300 disabled:opacity-60"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "#ffffff",
                  boxShadow: "0 4px 15px rgba(183, 110, 121, 0.2)",
                }}
              >
                {isSubmitting ? "Sending..." : "Send Wishes 🌸"}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Wishes display */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-h-[420px] overflow-y-auto pr-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {wishes.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-4xl block mb-3 opacity-40">🌸</span>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Be the first to leave your blessings!
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="glass-card p-5"
                >
                  <p className="text-sm italic leading-relaxed mb-2" style={{ color: "var(--color-text-light)" }}>
                    &ldquo;{wish.message}&rdquo;
                  </p>
                  <p className="text-xs font-medium" style={{ color: "var(--color-primary)" }}>
                    — {wish.name}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}
