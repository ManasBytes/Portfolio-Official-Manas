"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = links.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/90 backdrop-blur-xl border-gray-700/50 shadow-lg shadow-black/20"
            : "bg-gray-900/50 backdrop-blur-md border-gray-800/50"
        }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setActive(link.href.slice(1))}
            className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              active === link.href.slice(1)
                ? "text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {active === link.href.slice(1) && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 bg-purple-600/20 border border-purple-500/30 rounded-full"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{link.label}</span>
          </a>
        ))}
      </motion.nav>

      {/* Mobile */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 bg-gray-900/90 backdrop-blur-xl border border-gray-700 rounded-xl text-white"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-16 right-4 z-50 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-2xl p-4 min-w-[180px]"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActive(link.href.slice(1));
                  setMobileOpen(false);
                }}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active === link.href.slice(1)
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
