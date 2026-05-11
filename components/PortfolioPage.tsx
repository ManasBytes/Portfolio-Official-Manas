"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { PortfolioProvider } from "@/lib/PortfolioContext";
import type { PortfolioData } from "@/lib/types";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";
import ClickEffect from "./ClickEffect";

export default function PortfolioPage({ data }: { data: PortfolioData }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Deterministic star positions (no Math.random — avoids hydration mismatch)
  const stars = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        width: 1.5 + ((i * 7919) % 15) / 10,
        top: (i * 6271) % 100,
        left: (i * 9733) % 100,
        delay: (i * 3571) % 7,
      })),
    []
  );

  return (
    <PortfolioProvider data={data}>
      <main className="bg-grid min-h-screen relative text-white overflow-hidden">
        <ClickEffect />

        {/* Stars */}
        <div className="stars">
          {stars.map((s) => (
            <div
              key={s.id}
              className="star"
              style={{
                width: `${s.width}px`,
                height: `${s.width}px`,
                top: `${s.top}%`,
                left: `${s.left}%`,
                animationDelay: `${s.delay * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Grid highlights */}
        <div className="grid-highlight" />
        <div className="grid-highlight" />
        <div className="grid-highlight" />
        <div className="grid-highlight" />
        <div className="grid-highlight" />

        <div className="relative z-10 pt-10">
          <Navbar />
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
          <Footer />
        </div>

        {/* Scroll to top */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: showScrollTop ? 1 : 0,
            scale: showScrollTop ? 1 : 0,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg shadow-purple-500/25 text-white"
        >
          <ArrowUp size={20} />
        </motion.button>
      </main>
    </PortfolioProvider>
  );
}
