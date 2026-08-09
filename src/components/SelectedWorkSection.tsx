"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    num: "01",
    title: "Zenlise: Automated App Publishing",
    description: "Microservices platform in Go & Python automating app deployment and store compliance checks with Redis task queues & Azure cloud.",
    tags: ["Go", "Python", "Next.js", "Redis", "Docker", "Azure"],
    image: "/images/projects/zenlise.jpg",
  },
  {
    num: "02",
    title: "Northstar Face Recognition System",
    description: "Edge-based facial recognition entry system using Flutter & MobileFaceNet with real-time anti-spoofing and liveness detection algorithms.",
    tags: ["Flutter", "TensorFlow Lite", "Python", "Edge AI"],
    image: "/images/projects/hippocortex.jpg",
  },
  {
    num: "03",
    title: "Fuel-Master Quota Management",
    description: "3-tier monorepo system with Spring Boot backend, JWT RBAC, React admin dashboard, and Flutter mobile app with real-time field operations.",
    tags: ["Java", "Spring Boot", "React", "Flutter", "PostgreSQL"],
    image: "/images/projects/shopease.jpg",
  },
  {
    num: "04",
    title: "Northstar Production Fitness Suite",
    description: "Full-featured iOS & Android fitness management suite deployed to production stores with HealthKit/Google Fit telemetry sync.",
    tags: ["Flutter", "Firebase", "REST APIs", "iOS/Android"],
    image: "/images/projects/documind.jpg",
  },
];

export default function SelectedWorkSection() {
  return (
    <section id="work" className="py-20 md:py-28 border-t border-[#1e1e1e] relative">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
          <span className="text-[#568f5e] font-bold">03 /</span>
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

      {/* Main Grid: Projects Container (7 cols) + Sticky How I Think Paper (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative">
        
        {/* Left Column: ONE SINGLE UNIFIED CONTAINER BOX FOR ALL 4 PROJECTS */}
        <div className="lg:col-span-7 bg-[#111111] border border-[#202020] rounded-xl overflow-hidden divide-y divide-[#202020] shadow-2xl">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group p-4 sm:p-5 hover:bg-[#151515] transition-colors duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
            >
              {/* Timeline Indicator + Text Information */}
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                {/* Left Timeline Indicator Column */}
                <div className="flex flex-col items-center shrink-0 pt-0.5 self-stretch">
                  <span className="text-xs font-mono font-bold text-[#568f5e]">
                    {project.num}
                  </span>
                  <div className="w-[1px] flex-1 bg-[#242424] my-1.5 min-h-[32px] relative">
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#3a3a3a] group-hover:bg-[#568f5e] transition-colors" />
                  </div>
                </div>

                {/* Text Information Column */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <h3 className="text-base sm:text-lg font-mono font-semibold text-white group-hover:text-[#568f5e] transition-colors tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs font-mono text-gray-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
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

              {/* Compact Row Image Thumbnail */}
              <div className="w-full sm:w-36 md:w-44 lg:w-48 aspect-[16/10] relative rounded-lg overflow-hidden border border-[#242424] bg-[#0a0a0a] shrink-0 shadow-md">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky "HOW I THINK" Paper Notebook Pad filling the column width */}
        <div className="lg:col-span-5 lg:sticky lg:top-16 h-fit flex items-center justify-center w-full">
          <div className="relative w-full aspect-[4/5] min-h-[480px] sm:min-h-[540px] flex items-center justify-center">
            <Image
              src="/images/how-i-think-transparent.png"
              alt="How I Think Diagram Transparent Paper Notepad"
              fill
              priority
              unoptimized
              className="object-contain w-full object-center drop-shadow-2xl hover:scale-105 transition-transform duration-500 scale-105 sm:scale-110 lg:scale-120"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
