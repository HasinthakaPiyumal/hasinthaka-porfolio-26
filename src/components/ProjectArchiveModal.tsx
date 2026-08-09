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
  const activeProjects = allProjects.filter((p) => p.status !== "Draft");
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
        className="fixed inset-0 z-[9999] bg-[#0d0d0d] flex flex-col w-full h-full p-0 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full h-full bg-[#0d0d0d] cursor-default flex flex-col overflow-hidden"
        >
          {/* Header Bar */}
          <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-[#202020] bg-[#141414] flex items-center justify-between gap-4 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#568f5e] uppercase tracking-wider">
                  COMPLETE ARCHIVE
                </span>
                <span className="text-xs font-mono text-gray-400">({filteredProjects.length} Projects)</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-mono font-bold text-white tracking-tight pt-0.5">
                All Engineering Projects & Repositories
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
          <div className="px-4 sm:px-8 py-4 border-b border-[#1f1f1f] bg-[#111111] space-y-4 shrink-0">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
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
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
            <div className="max-w-6xl mx-auto w-full">
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
                      onClick={() => {
                        onSelectProject(project);
                      }}
                      className="group p-4 sm:p-5 hover:bg-[#151515] transition-colors duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 cursor-pointer"
                    >
                      {/* Text Information Column */}
                      <div className="flex items-start gap-3 flex-1 min-w-0 w-full">
                        {/* Number Anchor (Desktop only) */}
                        <div className="hidden sm:flex flex-col items-center shrink-0 pt-0.5 self-stretch">
                          <span className="text-xs font-mono font-bold text-[#568f5e]">
                            {project.num}
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
                                <span className="text-[#568f5e] font-bold mr-2 sm:hidden">{project.num}</span>
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
                  ))}
                </SpotlightCard>
              )}
            </div>
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

