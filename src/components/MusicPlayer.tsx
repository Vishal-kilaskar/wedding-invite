"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !hasStartedRef.current) {
        audioRef.current.play().then(() => {
          hasStartedRef.current = true;
          removeListeners();
        }).catch(() => {});
      }
    };

    const handleInteraction = () => {
      if (!hasStartedRef.current) {
        playAudio();
      }
    };

    const removeListeners = () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    // Try playing immediately
    playAudio();

    // Fallback: play on first user interaction (browsers block autoplay without interaction)
    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      removeListeners();
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play blocked", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <audio ref={audioRef} src="/audio/Jashn-E-Bahaaraa (Instrumental - Flute).mp3" loop />
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all"
        style={{
          background: isPlaying
            ? "linear-gradient(135deg, rgba(183, 110, 121, 0.9), rgba(207, 169, 139, 0.9))"
            : "rgba(255, 255, 255, 0.85)",
          color: isPlaying ? "#fff" : "#B76E79",
          border: "1.5px solid rgba(183, 110, 121, 0.3)",
          boxShadow: isPlaying
            ? "0 4px 20px rgba(183, 110, 121, 0.35)"
            : "0 4px 15px rgba(0, 0, 0, 0.08)",
        }}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </motion.svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" opacity={0.6}>
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        )}
      </motion.button>
    </motion.div>
  );
}
