"use client";

import React, { useState, useEffect } from "react";
import { Search, X, ArrowUpRight, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import type { Project } from "./SelectedWorkSection";
import { ProjectThumbnailSlideshow } from "./SelectedWorkSection";

const categories = ["All", "Backend & AI", "Full-Stack", "Mobile Apps", "Open Source"];

interface ProjectArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  allProjects: Project[];
  onSelectProject: (project: Project) => void;
}

export function ProjectArchiveModal({
  isOpen,
  onClose,
  allProjects,
  onSelectProject,
}: ProjectArchiveModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter published projects and derive unique categories
  const activeProjects = allProjects.filter((p) => p.status !== "Draft" && p.title && p.title.trim() !== "");
  const categories = ["All", ...Array.from(new Set(activeProjects.map((p) => p.category).filter(Boolean)))];

  const filteredProjects = activeProjects.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tags && project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 cursor-zoom-out"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] bg-[#0d0d0d] border border-[#222222] rounded-2xl flex flex-col cursor-default overflow-hidden shadow-2xl"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-[#202020] bg-[#121212] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
            <div>
              <h2 className="text-lg sm:text-xl font-mono font-bold text-white flex items-center gap-2">
                <span className="text-[#568f5e]">/</span>
                <span>PROJECT ARCHIVE</span>
              </h2>
              <p className="text-xs font-mono text-gray-400 mt-1">
                Complete directory of engineering projects, microservices, research, and open-source contributions.
              </p>
            </div>

            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:static text-gray-400 hover:text-white p-2 rounded-full bg-[#1a1a1a] border border-[#282828] hover:border-[#568f5e]/60 transition-all cursor-pointer shrink-0"
              aria-label="Close archive"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Bar & Category Filter Pills */}
          <div className="p-4 sm:p-6 border-b border-[#1c1c1c] bg-[#101010] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, description, or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#161616] border border-[#262626] focus:border-[#568f5e] rounded-xl pl-10 pr-9 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#568f5e] border-[#568f5e] text-white font-semibold shadow-md"
                      : "bg-[#161616] border-[#262626] text-gray-400 hover:text-white hover:border-[#383838]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Project List */}
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto custom-scrollbar bg-[#0b0b0b]">
            {filteredProjects.length === 0 ? (
              <div className="py-16 text-center space-y-3">
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
                {filteredProjects.map((project, idx) => {
                  const displayNum = String(idx + 1).padStart(2, "0");

                  return (
                    <div
                      key={project.title + idx}
                      onClick={() => {
                        onSelectProject({ ...project, num: displayNum });
                      }}
                      className="group p-4 sm:p-5 hover:bg-[#151515] transition-colors duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 cursor-pointer"
                    >
                      {/* Text Information Column */}
                      <div className="flex items-start gap-3 flex-1 min-w-0 w-full">
                        {/* Number Anchor (Desktop only) */}
                        <div className="hidden sm:flex flex-col items-center shrink-0 pt-0.5 self-stretch">
                          <span className="text-xs font-mono font-bold text-[#568f5e]">
                            {displayNum}
                          </span>
                          <div className="w-[1px] flex-1 bg-[#242424] my-1.5 min-h-[32px] relative">
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#3a3a3a] group-hover:bg-[#568f5e] transition-colors" />
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm sm:text-base font-mono font-semibold text-white group-hover:text-[#568f5e] transition-colors tracking-tight flex items-center justify-between gap-2 flex-1 min-w-0">
                              <div className="flex items-center min-w-0">
                                <span className="text-[#568f5e] font-bold mr-2 sm:hidden">{displayNum}</span>
                                <span className="truncate">{project.title}</span>
                              </div>
                              <ArrowUpRight size={16} className="text-gray-500 group-hover:text-[#568f5e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                            </h3>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c1c] border border-[#262626] text-gray-300">
                                {project.category}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161616] border border-[#262626] text-[#568f5e]">
                                {project.year}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] sm:text-xs font-mono text-gray-400 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] sm:text-[11px] font-mono text-gray-300 bg-[#181818] border border-[#262626] px-2 py-0.5 rounded transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Automatic Thumbnail Slideshow */}
                      <ProjectThumbnailSlideshow images={project.images} title={project.title} />
                    </div>
                  );
                })}
                </SpotlightCard>
              )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 sm:px-8 py-3.5 sm:py-5 border-t border-[#202020] bg-[#141414] flex items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] sm:text-xs font-mono text-gray-400 truncate min-w-0">
              Showing {filteredProjects.length} of {allProjects.length} projects (Click any project to view details)
            </span>
            <button
              onClick={onClose}
              className="px-4 sm:px-5 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-white font-mono text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
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

