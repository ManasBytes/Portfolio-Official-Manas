"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Download } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { usePortfolio } from "@/lib/PortfolioContext";

const roles = [
  "Full-Stack Developer",
  "React Developer",
  "Python Developer",
  "Data Science Student",
  "Problem Solver",
];

const platformIcons: Record<string, React.ReactNode> = {
  GitHub: <FaGithub size={18} />,
  LinkedIn: <FaLinkedin size={18} />,
  Twitter: <FaTwitter size={18} />,
};

export default function Hero() {
  const { profile, socials, experience, projects, skills } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 80 : 160;
    const interval = setInterval(() => {
      setText((prev) => {
        const full = roles[roleIndex];
        if (!isDeleting) {
          if (prev.length < full.length) return full.slice(0, prev.length + 1);
          return prev;
        } else {
          if (prev.length > 0) return full.slice(0, prev.length - 1);
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
          return "";
        }
      });
    }, speed);
    return () => clearInterval(interval);
  }, [isDeleting, roleIndex]);

  useEffect(() => {
    if (!isDeleting && text === roles[roleIndex]) {
      const t = setTimeout(() => setIsDeleting(true), 4000);
      return () => clearTimeout(t);
    }
  }, [text, isDeleting, roleIndex]);

  const totalSkills = skills.reduce((sum, cat) => sum + cat.items.length, 0);
  const stats = [
    { label: "Projects", value: `${projects.length}+` },
    { label: "Experience", value: `${experience.length}+` },
    { label: "Skills", value: `${totalSkills}+` },
  ];

  const activeSocials = socials.filter((s) => s.url && s.platform in platformIcons);

  return (
    <section id="home" className="mt-20 md:mt-32 max-w-4xl mx-auto px-6 text-white">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 justify-between">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2"
          >
            <span className="inline-flex items-center gap-2 text-sm md:text-base text-gray-400 tracking-wider uppercase">
              Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Hi, I&apos;m{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                {profile.name.split(" ")[0]}
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>{" "}
            <motion.span
              className="inline-block cursor-pointer"
              whileHover={{ rotate: [0, 20, -15, 20, 0] }}
              transition={{ duration: 0.6 }}
              style={{ transformOrigin: "70% 70%" }}
            >
              👋
            </motion.span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mt-4 h-10"
          >
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              {text}
            </span>
            <span className="animate-pulse text-purple-400 ml-0.5">|</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-300 mt-4 text-base md:text-lg leading-relaxed max-w-xl"
          >
            {profile.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center gap-3 text-gray-400 mt-5 justify-center md:justify-start flex-wrap"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={18} className="text-purple-400" />
              <span className="text-sm">{profile.location}</span>
            </span>
            <span className="hidden sm:block text-zinc-700">|</span>
            {activeSocials.map((s) => (
              <motion.a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {platformIcons[s.platform]}
              </motion.a>
            ))}
            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 30px rgba(168,85,247,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white text-sm font-semibold shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10">Resume</span>
              <Download className="w-4 h-4 relative z-10 group-hover:translate-y-[2px] transition-transform duration-300" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.a>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className="flex-shrink-0 relative"
        >
          <div className="relative w-[160px] h-[160px] md:w-[220px] md:h-[220px]">
            <motion.div
              className="absolute -inset-2 rounded-full opacity-75"
              style={{
                background: "conic-gradient(from 0deg, #7c3aed, #3b82f6, #ec4899, #7c3aed)",
                filter: "blur(4px)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {profile.image ? (
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                className="object-cover rounded-full border-4 border-black shadow-2xl relative z-10"
              />
            ) : (
              <div className="w-full h-full rounded-full border-4 border-black bg-gradient-to-br from-purple-900 via-zinc-900 to-blue-900 flex items-center justify-center relative z-10 shadow-2xl">
                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
              </div>
            )}
            <motion.div
              className="absolute -bottom-2 -right-2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-green-500/50 backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-xs text-green-400 font-medium">Available</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats Row — unique to Manas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex items-center justify-center md:justify-start gap-10 mt-14"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="text-center md:text-left"
          >
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {s.value}
            </p>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
