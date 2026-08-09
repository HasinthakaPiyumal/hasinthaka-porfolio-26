"use client";

import React, { useState } from "react";
import { Search, X, ArrowUpRight, Filter, ExternalLink, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

export interface ArchiveProject {
  year: string;
  title: string;
  category: "Backend & AI" | "Full-Stack" | "Mobile Apps" | "Open Source";
  role: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const archiveProjects: ArchiveProject[] = [
  {
    year: "2026",
    title: "Northstar Production Fitness Suite",
    category: "Mobile Apps",
    role: "Lead Mobile Developer",
    description: "Commercial cross-platform mobile ecosystem published on iOS App Store & Google Play Store with HealthKit & Google Fit background telemetry sync.",
    tags: ["Flutter", "Firebase", "REST APIs", "iOS/Android"],
    liveUrl: "https://apps.apple.com",
    featured: true,
  },
  {
    year: "2026",
    title: "DocuMind AI - Intelligent PDF Assistant",
    category: "Backend & AI",
    role: "Full Stack Engineer",
    description: "Enterprise PDF document intelligence system with vector embeddings, semantic RAG search, and interactive AI chat assistant.",
    tags: ["Python", "FastAPI", "React", "TailwindCSS", "Vector DB"],
    githubUrl: "https://github.com/HasinthakaPiyumal",
    featured: true,
  },
  {
    year: "2026",
    title: "HippoCortex Neural Liveness Detector",
    category: "Backend & AI",
    role: "AI Researcher",
    description: "Continual edge-based facial recognition and liveness detection neural architecture with data-efficient memory management.",
    tags: ["Python", "PyTorch", "OpenCV", "Edge AI"],
    featured: true,
  },
  {
    year: "2025",
    title: "Distributed Task Queue Engine",
    category: "Backend & AI",
    role: "Backend Engineer",
    description: "High-throughput asynchronous job processing engine written in Go with Redis queue backend, failure retries, and metrics dashboard.",
    tags: ["Go", "Redis", "Docker", "Prometheus"],
    githubUrl: "https://github.com/HasinthakaPiyumal",
    featured: true,
  },
  {
    year: "2025",
    title: "WSO2 Enterprise Gateway Extension Suite",
    category: "Open Source",
    role: "Engineering Intern @ WSO2",
    description: "API management extensions, OAuth2 custom authenticators, and Identity Server integration plugins built for enterprise middleware.",
    tags: ["Java", "Spring Boot", "Ballerina", "OAuth2"],
    githubUrl: "https://github.com/HasinthakaPiyumal",
  },
  {
    year: "2024",
    title: "Call-Graph AI Pattern Extractor",
    category: "Backend & AI",
    role: "Research Author",
    description: "Empirical methodology tool for detecting AI architectural patterns in software repositories using call-graph community chunking.",
    tags: ["Python", "NetworkX", "ArXiv", "Scikit-Learn"],
    liveUrl: "https://arxiv.org/abs/2607.00558",
  },
  {
    year: "2024",
    title: "Zenlise Automated App Publisher",
    category: "Full-Stack",
    role: "Software Engineer",
    description: "Automated mobile app compilation and store submission pipeline with Azure cloud task queues and status webhooks.",
    tags: ["Go", "Python", "Azure", "Docker"],
  },
  {
    year: "2023",
    title: "Resilient Maxwell Portfolio System",
    category: "Full-Stack",
    role: "Author",
    description: "High-craft dark-mode developer portfolio designed with Next.js App Router, Framer Motion, and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    githubUrl: "https://github.com/HasinthakaPiyumal",
  },
];

const categories = ["All", "Backend & AI", "Full-Stack", "Mobile Apps", "Open Source"];

interface ProjectArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectArchiveModal({ isOpen, onClose }: ProjectArchiveModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (!isOpen) return null;

  const filteredProjects = archiveProjects.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 overflow-hidden cursor-zoom-out"
      >
        <motion.div
          initial={{ scale: 0.97, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.97, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative max-w-5xl w-full h-full bg-[#0d0d0d] border border-[#222222] rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] my-auto mx-auto cursor-default flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-7 border-b border-[#202020] bg-[#141414] flex items-center justify-between gap-4 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#568f5e] uppercase tracking-wider">
                  COMPLETE ARCHIVE
                </span>
                <span className="text-xs font-mono text-gray-400">({filteredProjects.length} Projects)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight pt-0.5">
                All Projects & Repositories
              </h2>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2.5 rounded-full bg-[#1c1c1c] border border-[#282828] hover:border-[#568f5e]/60 transition-all shrink-0 cursor-pointer"
              aria-label="Close archive"
            >
              <X size={20} />
            </button>
          </div>

          {/* Controls Bar: Search & Category Filters */}
          <div className="p-4 sm:p-6 border-b border-[#1f1f1f] bg-[#111111] space-y-4 shrink-0">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, keyword, or tech stack (e.g. Go, Python, Flutter)..."
                  className="w-full bg-[#161616] border border-[#262626] rounded-xl pl-10 pr-9 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#568f5e] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#568f5e] text-white font-semibold shadow-md"
                        : "bg-[#161616] border border-[#242424] text-gray-400 hover:text-white hover:border-[#333333]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project List Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-7 custom-scrollbar">
            {filteredProjects.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Code2 size={36} className="mx-auto text-gray-600" />
                <p className="text-sm font-mono text-gray-400">No projects found matching your search query.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="text-xs font-mono text-[#568f5e] hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              <SpotlightCard className="bg-[#111111] border border-[#202020] rounded-xl overflow-hidden divide-y divide-[#202020] shadow-2xl">
                {filteredProjects.map((project) => (
                  <div
                    key={project.title}
                    className="group p-4 sm:p-6 hover:bg-[#151515] transition-colors duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-xs font-mono font-bold text-[#568f5e] shrink-0">
                          {project.year}
                        </span>
                        <h3 className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-[#568f5e] transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c1c] border border-[#262626] text-gray-300">
                          {project.category}
                        </span>
                      </div>

                      <p className="text-xs font-mono text-gray-400 leading-relaxed max-w-3xl">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] sm:text-[11px] font-mono text-gray-300 bg-[#181818] border border-[#262626] px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#181818] border border-[#262626] hover:border-[#568f5e]/60 text-xs font-mono text-gray-300 hover:text-white transition-all"
                        >
                          <span>GitHub</span>
                          <ExternalLink size={12} />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#568f5e]/15 border border-[#568f5e]/40 hover:bg-[#568f5e] text-xs font-mono text-[#568f5e] hover:text-white transition-all font-semibold"
                        >
                          <span>View Live</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </SpotlightCard>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 sm:p-5 border-t border-[#202020] bg-[#141414] flex items-center justify-between shrink-0">
            <span className="text-xs font-mono text-gray-400">
              Showing {filteredProjects.length} of {archiveProjects.length} projects
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-white font-mono text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Close Archive
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProjectArchiveModal;
