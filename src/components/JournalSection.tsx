"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const articles = [
  {
    date: "MAY 12 2026",
    title: "Lessons from building at scale with Next.js",
    summary: "Key takeaways and patterns that helped me ship faster and with confidence.",
    href: "#",
  },
  {
    date: "MAY 03 2026",
    title: "Understanding Mamba SSM in depth",
    summary: "Notes from my research on state space models and continual learning.",
    href: "#",
  },
  {
    date: "APR 21 2026",
    title: "Active learning for code pattern mining",
    summary: "Exploring active learning to identify patterns in software repositories.",
    href: "#",
  },
];

export default function JournalSection() {
  return (
    <section id="journal" className="py-24 md:py-32 border-t border-[#1e1e1e]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
          <span className="text-[#4d7a54] font-bold">04 /</span>
          <span className="text-white font-semibold">JOURNAL</span>
        </h2>

        <a
          href="#journal"
          className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-gray-400 hover:text-[#4d7a54] transition-colors"
        >
          <span>SEE ALL ARTICLES</span>
          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Article Rows */}
      <div className="flex flex-col divide-y divide-[#222222] border-y border-[#222222]">
        {articles.map((article, idx) => (
          <motion.a
            key={article.title}
            href={article.href}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#141414] px-6 -mx-6 rounded-lg transition-colors duration-200"
          >
            {/* Date */}
            <div className="text-xs sm:text-sm font-mono font-semibold text-gray-500 group-hover:text-[#4d7a54] transition-colors w-36 shrink-0">
              {article.date}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              <h3 className="text-lg sm:text-xl md:text-2xl font-mono font-semibold text-gray-100 group-hover:text-white transition-colors">
                {article.title}
              </h3>
              <p className="text-sm sm:text-base font-mono text-gray-400 leading-relaxed">
                {article.summary}
              </p>
            </div>

            {/* Arrow Indicator */}
            <div className="text-gray-500 group-hover:text-[#4d7a54] transition-colors self-start md:self-center shrink-0">
              <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </div>
          </motion.a>
        ))}
      </div>

    </section>
  );
}
