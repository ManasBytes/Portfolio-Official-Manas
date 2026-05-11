"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function ClickEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setRipples((prev) => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("click", handle);
    return () => window.removeEventListener("click", handle);
  }, []);

  useEffect(() => {
    if (ripples.length === 0) return;
    const t = setTimeout(() => setRipples((p) => p.slice(1)), 700);
    return () => clearTimeout(t);
  }, [ripples]);

  return (
    <AnimatePresence>
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0.4, scale: 0 }}
          animate={{ opacity: 0, scale: 2.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pointer-events-none fixed rounded-full bg-white"
          style={{
            left: r.x - 16,
            top: r.y - 16,
            width: 32,
            height: 32,
          }}
        />
      ))}
    </AnimatePresence>
  );
}
