"use client";

import { usePortfolio } from "@/lib/PortfolioContext";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Heart } from "lucide-react";

const platformIcons: Record<string, React.ReactNode> = {
  GitHub: <FaGithub size={16} />,
  LinkedIn: <FaLinkedin size={16} />,
  Twitter: <FaTwitter size={16} />,
};

export default function Footer() {
  const { profile, socials } = usePortfolio();

  return (
    <footer className="py-12 px-6 border-t border-zinc-800/50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          Built with <Heart size={12} className="text-purple-500" /> by {profile.name}
        </p>
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-purple-400 transition-colors"
            >
              {platformIcons[s.platform] || s.platform[0]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
