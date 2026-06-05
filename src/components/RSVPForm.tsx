"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const eventOptions = [
  { id: "engagement", label: "Engagement — July 8, 6 PM" },
  { id: "sangeet", label: "Sangeet — July 8, 7 PM" },
  { id: "haldi", label: "Haldi — July 8, 8:30 PM" },
  { id: "murtham", label: "Murtham — July 9, 9 AM" },
  { id: "wedding", label: "Wedding — July 9, 12 PM" },
];

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attendees: "1",
    events: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter((e) => e !== eventId)
        : [...prev.events, eventId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("RSVP submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="section-padding text-center" style={{ backgroundColor: "var(--color-secondary-light)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md mx-auto glass-card p-12"
        >
          <motion.span
            className="text-5xl block mb-5"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌸
          </motion.span>
          <h3
            className="text-2xl font-semibold mb-3"
            style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}
          >
            Thank You!
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-light)", fontWeight: 300 }}>
            Your RSVP has been received. We can&apos;t wait to celebrate with you!
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="section-padding relative w-full" style={{ backgroundColor: "var(--color-secondary-light)" }}>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
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
          RSVP
        </h2>
        <p className="text-base md:text-lg" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
          Kindly let us know if you&apos;ll be joining our celebration
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto glass-card p-8 md:p-10 relative z-10"
      >
        {/* Name */}
        <div className="mb-6">
          <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>
            Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-5 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30 transition-all duration-300"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-card)",
              color: "var(--color-text)",
              fontSize: "0.95rem",
            }}
            placeholder="Enter your full name"
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>
            Phone Number <span className="normal-case font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-5 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30 transition-all duration-300"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-card)",
              color: "var(--color-text)",
              fontSize: "0.95rem",
            }}
            placeholder="Your phone number"
          />
        </div>

        {/* Number of attendees */}
        <div className="mb-6">
          <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>
            Number of Guests *
          </label>
          <select
            required
            value={formData.attendees}
            onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
            className="w-full px-5 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30 transition-all duration-300 appearance-none"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-card)",
              color: "var(--color-text)",
              fontSize: "0.95rem",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Events attending */}
        <div className="mb-6">
          <label className="block text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>
            Events Attending
          </label>
          <div className="grid grid-cols-1 gap-2.5">
            {eventOptions.map((event) => (
              <label
                key={event.id}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-sm"
                style={{
                  borderColor: formData.events.includes(event.id) ? "var(--color-primary)" : "var(--color-border)",
                  backgroundColor: formData.events.includes(event.id) ? "rgba(183, 110, 121, 0.04)" : "var(--color-card)",
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.events.includes(event.id)}
                  onChange={() => handleEventToggle(event.id)}
                  className="w-4 h-4 rounded accent-[#B76E79]"
                />
                <span className="text-sm" style={{ color: "var(--color-text)" }}>{event.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>
            Message <span className="normal-case font-normal">(optional)</span>
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
            className="w-full px-5 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30 transition-all duration-300 resize-none"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-card)",
              color: "var(--color-text)",
              fontSize: "0.95rem",
            }}
            placeholder="Write a message for the couple..."
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-full font-medium text-base transition-all duration-300 disabled:opacity-60"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#ffffff",
            boxShadow: "0 4px 20px rgba(183, 110, 121, 0.25)",
          }}
        >
          {isSubmitting ? "Sending..." : "Confirm Attendance"}
        </motion.button>
      </motion.form>
    </section>
  );
}
