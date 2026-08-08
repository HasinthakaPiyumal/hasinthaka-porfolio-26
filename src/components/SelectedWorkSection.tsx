"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    num: "01",
    title: "Zenlise",
    description: "Android publishing infrastructure for developers and teams.",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
    image: "/images/projects/zenlise.jpg",
  },
  {
    num: "02",
    title: "HippoCortex",
    description: "Continual learning research using Mamba-based architectures.",
    tags: ["Python", "PyTorch", "Mamba", "CUDA"],
    image: "/images/projects/hippocortex.jpg",
  },
  {
    num: "03",
    title: "DocuMind AI",
    description: "AI-powered document assistant with semantic search & Q&A.",
    tags: ["LangChain", "FastAPI", "ChromaDB"],
    image: "/images/projects/documind.jpg",
  },
  {
    num: "04",
    title: "ShopEase",
    description: "Full-stack e-commerce platform with secure payments.",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    image: "/images/projects/shopease.jpg",
  },
];

export default function SelectedWorkSection() {
  return (
    <section id="work" className="py-20 md:py-28 border-t border-[#1e1e1e] relative">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
          <span className="text-[#568f5e] font-bold">02 /</span>
          <span className="text-white font-semibold">SELECTED WORK</span>
        </h2>

        <a
          href="#contact"
          className="group inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#568f5e] transition-colors"
        >
          <span>SEE ALL PROJECTS</span>
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Main Grid: Projects Container (7 cols) + Transparent How I Think Paper (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative">
        
        {/* Left Column: ONE SINGLE UNIFIED CONTAINER BOX FOR ALL 4 PROJECTS */}
        <div className="lg:col-span-7 bg-[#121212] border border-[#222222] rounded-xl overflow-hidden divide-y divide-[#222222] shadow-xl">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group p-6 sm:p-8 hover:bg-[#161616] transition-colors duration-300 flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              {/* Left Timeline Indicator Column */}
              <div className="flex flex-col items-center shrink-0 self-stretch pt-1">
                <span className="text-sm font-mono font-bold text-[#568f5e]">
                  {project.num}
                </span>
                <div className="w-[1px] flex-1 bg-[#262626] my-3 min-h-[40px] relative">
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#444444] group-hover:bg-[#568f5e] transition-colors" />
                </div>
              </div>

              {/* Text Information Column */}
              <div className="flex-1 space-y-3">
                <h3 className="text-xl sm:text-2xl font-mono font-semibold text-white group-hover:text-[#568f5e] transition-colors tracking-tight">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm font-mono text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-gray-300 bg-[#1a1a1a] group-hover:bg-[#222222] border border-[#282828] px-2.5 py-0.5 rounded transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Preview Thumbnail */}
              <div className="w-full md:w-56 lg:w-64 aspect-[16/10] relative rounded-lg overflow-hidden border border-[#262626] bg-[#0a0a0a] shrink-0 shadow-md">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Sticky Transparent "HOW I THINK" Paper Notebook Pad */}
        <div className="lg:col-span-5 lg:sticky lg:top-8 self-start flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[440px]"
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/images/how-i-think-transparent.png"
                alt="How I Think Diagram Transparent Paper Notepad"
                fill
                priority
                className="object-contain object-top drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
