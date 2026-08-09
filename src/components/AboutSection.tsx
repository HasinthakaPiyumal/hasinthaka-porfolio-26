"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Code2, Cpu, Globe2, Award, Terminal, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AboutConfig } from "@/lib/data";

const defaultAbout: AboutConfig = {
  fullName: "Hasinthaka Piyumal",
  titleBadge: "Software Engineer & Final-Year Undergraduate",
  profileImage: "/images/about-portrait.jpg",
  subtitleBio: "Final-year Software Engineering student at University of Kelaniya. Specializing in distributed backend microservices, applied machine learning pipelines, and full-stack web/mobile application development.",
  narrativeParagraph1: "With 3+ years of freelance experience delivering web and mobile apps alongside enterprise engineering experience at WSO2 and Zenlise, I build software that balances technical rigor with real-world product reliability.",
  narrativeParagraph2: "My academic research in AI design pattern prevalence won the Best Paper Award at PATTERNS 2026 and is published on arXiv.",
  certifications: ["IBM Machine Learning Certified", "Duke University Explainable AI (XAI)"],
  signatureQuote: "Let's build something impactful.",
  yearsExperience: "3+",
  productionApps: "4+",
  arxivPapers: "1",
  awardNotice: "PATTERNS 2026",
};

const expertise = [
  {
    icon: Code2,
    title: "Backend & Distributed Systems",
    desc: "Architecting high-throughput microservices in Go & Python, Redis queues, REST APIs, and PostgreSQL database schemas.",
  },
  {
    icon: Cpu,
    title: "Applied AI & Vector Embeddings",
    desc: "Hands-on experience at WSO2 building active learning pipelines, graph clustering, LLM vector ingestion, and edge AI.",
  },
  {
    icon: Globe2,
    title: "Full-Stack & Mobile Delivery",
    desc: "Designing responsive Next.js web applications and production Flutter mobile suites deployed to iOS and Android stores.",
  },
];

export default function AboutSection() {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [about, setAbout] = useState<AboutConfig>(defaultAbout);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.about) {
          setAbout(data.about);
        }
      })
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  return (
    <div className="space-y-8">
      {/* Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {isImageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            {/* Top Bar: Close Button */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
              <button
                onClick={() => setIsImageOpen(false)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616]/90 border border-[#2a2a2a] text-gray-300 hover:text-white hover:border-[#568f5e]/60 transition-all text-xs font-mono shadow-xl backdrop-blur-md"
                aria-label="Close full screen image"
              >
                <span>Close</span>
                <X size={15} />
              </button>
            </div>

            {/* Modal Card Content Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-[#282828] shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-[#111111] flex flex-col cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame */}
              <div className="relative w-full h-[50vh] sm:h-[62vh] bg-[#0a0a0a] overflow-hidden">
                <Image
                  src={about.profileImage || "/images/about-portrait.jpg"}
                  alt={about.fullName || "Hasinthaka Piyumal"}
                  fill
                  unoptimized
                  className="object-contain object-center"
                />
              </div>

              {/* Bottom Details Footer Bar */}
              <div className="p-4 sm:p-6 bg-[#141414] border-t border-[#222222] space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#568f5e] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#568f5e]"></span>
                    </span>
                    <h3 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
                      {about.fullName}
                    </h3>
                  </div>

                  <span className="text-[10px] sm:text-xs font-mono px-2.5 py-0.5 rounded bg-[#1c1c1c] border border-[#282828] text-[#568f5e] font-semibold">
                    Software Engineer
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-mono text-gray-300 flex items-center gap-2">
                  <Terminal size={14} className="text-[#568f5e] shrink-0" />
                  <span>{about.titleBadge}</span>
                </p>

                <p className="text-[11px] sm:text-xs font-mono text-gray-400 leading-relaxed pt-0.5">
                  {about.subtitleBio}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
        <span className="text-[#568f5e] font-bold">07 /</span>
        <span className="text-white font-semibold">ABOUT ME</span>
      </h2>

      {/* Main 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Portrait, Bio & Credentials (7 cols) */}
        <div className="lg:col-span-7 bg-[#111111] border border-[#202020] rounded-xl p-3.5 sm:p-8 space-y-4 sm:space-y-6 shadow-2xl">
          {/* Top Row: Portrait + Identity */}
          <div className="flex items-center sm:items-start gap-3.5 sm:gap-6">
            <div
              onClick={() => setIsImageOpen(true)}
              className="w-14 h-14 sm:w-32 sm:h-32 shrink-0 relative rounded-xl overflow-hidden border border-[#262626] bg-[#161616] shadow-md cursor-pointer group/img"
              title="Click to view full screen"
            >
              <Image
                src={about.profileImage || "/images/about-portrait.jpg"}
                alt={about.fullName}
                fill
                unoptimized
                className="object-cover object-center grayscale group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-500"
              />
            </div>

            <div className="space-y-1 flex-1 min-w-0">
              <h3 className="text-base sm:text-2xl font-mono font-bold text-white tracking-tight truncate">
                {about.fullName}
              </h3>
              <p className="text-[10px] sm:text-xs font-mono text-[#568f5e] font-semibold flex items-center gap-1.5">
                <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="truncate">{about.titleBadge}</span>
              </p>
            </div>
          </div>

          {/* Subtitle Bio */}
          <p className="text-[11px] sm:text-xs font-mono text-gray-400 leading-relaxed">
            {about.subtitleBio}
          </p>

          {/* Narrative Body */}
          <div className="space-y-2 sm:space-y-3 text-[11px] sm:text-xs font-mono text-gray-300 leading-relaxed border-t border-[#202020] pt-3.5 sm:pt-5">
            <p>
              {about.narrativeParagraph1}
            </p>
            {about.narrativeParagraph2 && (
              <p className="text-gray-400">
                {about.narrativeParagraph2}
              </p>
            )}
          </div>

          {/* Certifications & Credentials */}
          <div className="border-t border-[#202020] pt-3.5 sm:pt-5 space-y-2 sm:space-y-3">
            <div className="text-[10px] sm:text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
              CERTIFICATIONS & CREDENTIALS
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-gray-300">
              {about.certifications && about.certifications.map((cert, idx) => (
                <span key={idx} className="bg-[#181818] border border-[#262626] px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Award size={12} className="text-[#568f5e]" />
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Signature Quote */}
          <div className="border-t border-[#202020] pt-3 sm:pt-4 flex flex-row items-center justify-between gap-2">
            <div className="font-handwritten text-base sm:text-xl text-[#568f5e] font-bold">
              {about.signatureQuote}
            </div>
            <div className="font-handwritten text-xs sm:text-sm text-gray-400">
              – {about.fullName}
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Technical Focus (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          
          {/* Unified 2x2 Stats Box */}
          <div className="bg-[#111111] border border-[#202020] rounded-xl overflow-hidden divide-y divide-[#202020] shadow-2xl">
            <div className="grid grid-cols-2 divide-x divide-[#202020]">
              <div className="p-3 sm:p-5 text-center space-y-0.5 sm:space-y-1">
                <div className="text-xl sm:text-3xl font-mono font-bold text-white">{about.yearsExperience}</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-gray-400">Years Experience</div>
              </div>
              <div className="p-3 sm:p-5 text-center space-y-0.5 sm:space-y-1">
                <div className="text-xl sm:text-3xl font-mono font-bold text-white">{about.productionApps}</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-gray-400">Production Apps</div>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-[#202020]">
              <div className="p-3 sm:p-5 text-center space-y-0.5 sm:space-y-1">
                <div className="text-xl sm:text-3xl font-mono font-bold text-white">{about.arxivPapers}</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-gray-400">arXiv Publication</div>
              </div>
              <div className="p-3 sm:p-5 text-center space-y-0.5 sm:space-y-1">
                <div className="text-base sm:text-xl font-mono font-bold text-[#568f5e] pt-0.5">Best Paper</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-gray-400">{about.awardNotice}</div>
              </div>
            </div>
          </div>

          {/* Technical Focus Box */}
          <div className="bg-[#111111] border border-[#202020] rounded-xl p-3.5 sm:p-6 space-y-3 sm:space-y-5 shadow-2xl">
            <h4 className="text-[10px] sm:text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest">
              TECHNICAL FOCUS
            </h4>

            <div className="space-y-3 sm:space-y-4">
              {expertise.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#161616] border border-[#242424] flex items-center justify-center text-[#568f5e] shrink-0 pt-0.5">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="space-y-0.5 sm:space-y-1 flex-1">
                      <h5 className="text-[11px] sm:text-xs font-mono font-semibold text-white">
                        {item.title}
                      </h5>
                      <p className="text-[10px] sm:text-[11px] font-mono text-gray-400 leading-snug sm:leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
