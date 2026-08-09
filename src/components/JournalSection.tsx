"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Award } from "lucide-react";
import AISparkleIcon from "./icons/AISparkleIcon";
import SpotlightCard from "./SpotlightCard";
import { motion } from "framer-motion";
import type { ResearchItem } from "@/lib/data";

const defaultResearchItems: ResearchItem[] = [
  {
    citation: "arXiv:2607.00558",
    title: "A Methodology for Investigating AI Pattern Prevalence in Software Repositories",
    badge: "Best Paper Award (PATTERNS 2026)",
    badgeType: "award",
    summary: "Proposed an empirical methodology to measure AI design patterns using call-graph community chunking and active learning strategies.",
    href: "https://arxiv.org/abs/2607.00558",
  },
  {
    citation: "Ongoing Research",
    title: "HippoCortex: Continual Learning & Data-Efficient Memory Architecture",
    badge: "Ongoing Research",
    badgeType: "ongoing",
    summary: "Developing a novel neural architecture for continual edge-based facial recognition and liveness detection with fast, data-efficient memory management.",
    href: "#",
  },
];

export default function JournalSection() {
  const [researchItems, setResearchItems] = useState<ResearchItem[]>(defaultResearchItems);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.research && data.research.length > 0) {
          setResearchItems(data.research);
        }
      })
      .catch((err) => console.error("Error fetching research:", err));
  }, []);
  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
          <span className="text-[#568f5e] font-bold">05 /</span>
          <span className="text-white font-semibold">RESEARCH & PUBLICATIONS</span>
        </h2>

        <a
          href={researchItems[0]?.href || "https://arxiv.org/abs/2607.00558"}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#568f5e] transition-colors py-1.5"
        >
          <span>READ PAPER</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Unified Container for Research Items */}
      <SpotlightCard className="bg-[#111111] border border-[#202020] rounded-xl overflow-hidden divide-y divide-[#202020] shadow-2xl">
        {researchItems.map((item) => (
          <a
            key={item.title}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : "_self"}
            rel="noreferrer"
            className="group p-3.5 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-5 hover:bg-[#151515] transition-colors duration-300"
          >
            {/* Left Citation Label */}
            <div className="text-[11px] sm:text-xs font-mono font-bold text-[#568f5e] tracking-wider shrink-0 w-36 sm:pt-0.5">
              {item.citation}
            </div>

            {/* Middle Content & Tags */}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-sm sm:text-base md:text-lg font-mono font-semibold text-white group-hover:text-[#568f5e] transition-colors leading-snug">
                  {item.title}
                </h3>
                
                {/* Badge Tag */}
                {item.badgeType === "award" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#568f5e]/15 border border-[#568f5e]/40 text-[#568f5e] text-[10px] sm:text-[11px] font-mono font-bold">
                    <Award size={12} />
                    <span>{item.badge}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#1d271f] border border-[#2e4431] text-[#69ab73] text-[10px] sm:text-[11px] font-mono font-semibold">
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-flex"
                    >
                      <AISparkleIcon size={12} />
                    </motion.span>
                    <span>{item.badge}</span>
                  </span>
                )}
              </div>

              <p className="text-[11px] sm:text-xs font-mono text-gray-400 leading-relaxed max-w-3xl">
                {item.summary}
              </p>
            </div>

            {/* Right External Arrow */}
            <div className="text-gray-500 group-hover:text-[#568f5e] transition-colors shrink-0 sm:pt-0.5">
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>
          </a>
        ))}
      </SpotlightCard>

    </div>
  );
}
