"use client";

import { motion } from "framer-motion";

const events = [
  {
    id: 1,
    name: "Engagement",
    date: "July 8, 2026",
    time: "6:00 PM",
    icon: "💍",
    description: "The ring ceremony marking the beginning of our forever.",
  },
  {
    id: 2,
    name: "Sangeet",
    date: "July 8, 2026",
    time: "7:00 PM",
    icon: "🎶",
    description: "An evening of music, dance, and celebration with loved ones.",
  },
  {
    id: 3,
    name: "Haldi",
    date: "July 8, 2026",
    time: "8:30 PM",
    icon: "🌼",
    description: "The traditional turmeric ceremony blessing the couple.",
  },
  {
    id: 4,
    name: "Murtham",
    date: "July 9, 2026",
    time: "9:00 AM",
    icon: "🙏",
    description: "The sacred morning rituals and auspicious wedding ceremony.",
  },
  {
    id: 5,
    name: "Wedding",
    date: "July 9, 2026",
    time: "12:00 PM",
    icon: "💒",
    description: "The grand wedding celebration uniting two souls in love.",
  },
];

export default function EventDetails() {
  return (
    <section className="section-padding relative overflow-hidden w-full" style={{ backgroundColor: "var(--color-background)" }}>
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, var(--color-primary), transparent)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, var(--color-sage), transparent)", filter: "blur(60px)" }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center mb-14 relative z-10"
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
          Wedding Celebrations
        </h2>
        <p className="text-sm sm:text-base md:text-lg max-w-md mx-auto text-center" style={{ color: "var(--color-text-light)", fontWeight: 300 }}>
          Join us for these beautiful moments
        </p>
      </motion.div>

      {/* Events Timeline */}
      <div className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6 md:px-8">
        {/* Vertical timeline line */}
        <div
          className="absolute left-8 sm:left-10 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-primary), var(--color-primary), transparent)", opacity: 0.25 }}
        />

        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
            className={`relative flex items-start mb-10 last:mb-0 ${
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
                boxShadow: "0 0 0 5px var(--color-background), 0 0 15px rgba(183, 110, 121, 0.15)",
              }}
              whileInView={{ scale: [0.5, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
            >
              {event.icon}
            </motion.div>

            {/* Content card */}
            <div
              className={`ml-16 sm:ml-20 md:ml-0 w-full md:w-[calc(50%-2.5rem)] glass-card p-6 sm:p-7 md:p-8 ${
                index % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"
              }`}
            >
              <h3
                className="text-lg sm:text-xl md:text-2xl font-semibold mb-2"
                style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}
              >
                {event.name}
              </h3>

              {/* Date & Time */}
              <div className={`flex items-center gap-2 mb-3 flex-wrap ${
                index % 2 === 0 ? "md:justify-end" : "md:justify-start"
              }`}>
                <span
                  className="text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "var(--color-secondary-light)",
                    color: "var(--color-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {event.date}
                </span>
                <span
                  className="text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "var(--color-secondary-light)",
                    color: "var(--color-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {event.time}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-light)", fontWeight: 300 }}>
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Venue section with map */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mt-16 md:mt-20 max-w-3xl mx-auto relative z-10 px-4 sm:px-6"
      >
        <div className="glass-card p-6 sm:p-8 md:p-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--color-primary)", opacity: 0.3 }} />
            <span style={{ color: "var(--color-primary)" }}> </span>
            <span style={{ color: "var(--color-primary)" }}>Venue📍</span>
            <div className="w-8 h-px" style={{ backgroundColor: "var(--color-primary)", opacity: 0.3 }} />
          </div>

          <h3
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2"
            style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-heading)" }}
          >
            Nigudgi Function Hall, Kalaburagi.
          </h3>
          <p className="text-xs sm:text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
            All events will be held at this venue
          </p>

          {/* Embedded Google Map */}
          <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden mb-6 shadow-sm" style={{ border: "1px solid var(--color-border)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.9186702168713!2d76.80085007462655!3d17.36764610337462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc8b9006bcdf31d%3A0x7086c3b20f0f3c37!2sNIGUDGI%20FUNCTION%20HALL!5e0!3m2!1sen!2sin!4v1780505146432!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[200px] sm:h-[250px] md:h-[300px]"
            />
          </div>

          <a
            href="https://maps.app.goo.gl/C2wAT3kzZvE1jVXc7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              margin: "10px",
              padding: "10px"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Get Directions
          </a>
        </div>
      </motion.div>
    </section>
  );
}
