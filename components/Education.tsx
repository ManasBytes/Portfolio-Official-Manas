"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function Education() {
  const { education } = usePortfolio();

  return (
    <section id="education" className="py-24 px-6">
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
            className="px-4 py-1.5 text-sm rounded-full font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-md inline-flex items-center gap-2"
          >
            <GraduationCap size={14} /> Background
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mt-6"
          >
            My{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education
            </span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-transparent opacity-40" />

          <div className="space-y-10">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-4 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 w-[9px] h-[9px] rounded-full bg-purple-500 border-2 border-black z-10 mt-6 md:mt-4 shadow-lg shadow-purple-500/50" />

                {/* Spacer for alignment */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className="ml-10 md:ml-0 md:w-1/2 md:px-6">
                  <div className="p-5 rounded-xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800 hover:border-purple-500/30 transition-colors shadow-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-600/10 border border-purple-500/20 rounded-lg flex-shrink-0">
                        <GraduationCap size={16} className="text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{edu.degree}</h3>
                        <p className="text-purple-400 text-xs font-medium mt-0.5">{edu.institution}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={10} /> {edu.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={10} /> {edu.duration}
                          </span>
                        </div>
                        {edu.grade && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-blue-400">
                            <Award size={10} /> {edu.grade}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
