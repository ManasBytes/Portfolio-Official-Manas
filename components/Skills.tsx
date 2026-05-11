"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/lib/PortfolioContext";
import {
  SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs,
  SiFlask, SiTailwindcss, SiPostgresql, SiMysql, SiSqlite, SiGit,
  SiHtml5, SiCss3,
} from "react-icons/si";
import { TbBrandCpp, TbSql } from "react-icons/tb";

const iconMap: Record<string, React.ReactNode> = {
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  Python: <SiPython />,
  "C++": <TbBrandCpp />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  SQL: <TbSql />,
  React: <SiReact />,
  "Next.js": <SiNextdotjs />,
  Flask: <SiFlask />,
  TailwindCSS: <SiTailwindcss />,
  PostgreSQL: <SiPostgresql />,
  MySQL: <SiMysql />,
  SQLite: <SiSqlite />,
  Git: <SiGit />,
};

export default function Skills() {
  const { skills, softSkills } = usePortfolio();

  return (
    <section id="skills" className="py-24 px-6">
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
            className="px-4 py-1.5 text-sm rounded-full font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md inline-flex items-center gap-2"
          >
            ⚡ Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mt-6"
          >
            Tech{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Stack
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800 shadow-lg"
            >
              <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-4">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.items.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.03 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-3 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 hover:border-purple-500/50 rounded-xl text-sm text-gray-300 transition-all cursor-default"
                  >
                    <span className="text-base">{iconMap[skill] || null}</span>
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        {softSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800 shadow-lg"
          >
            <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-4">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-2 bg-zinc-900/80 border border-zinc-700/50 hover:border-purple-500/40 rounded-xl text-sm text-gray-300 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
