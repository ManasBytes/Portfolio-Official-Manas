"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function Experience() {
  const { experience } = usePortfolio();

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 text-sm rounded-full font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md inline-flex items-center gap-2"
          >
            <Briefcase size={14} /> Career
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mt-6"
          >
            Where I&apos;ve{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Worked
            </span>
          </motion.h2>
        </motion.div>

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -2 }}
              className="group p-6 md:p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800 hover:border-purple-500/30 transition-all duration-300 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-purple-600/10 border border-purple-500/20 rounded-xl">
                  <Briefcase size={20} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <p className="text-purple-400 text-sm font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {exp.duration}
                      </span>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {exp.points.map((p, j) => (
                      <li key={j} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                        <span className="mt-0.5 flex-shrink-0 text-purple-400">▸</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
