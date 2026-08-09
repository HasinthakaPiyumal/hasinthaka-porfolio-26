"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import AISparkleIcon from "./icons/AISparkleIcon";
import SpotlightCard from "./SpotlightCard";
import ProjectArchiveModal from "./ProjectArchiveModal";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  num: string;
  title: string;
  description: string;
  fullDescription: string;
  highlights: string[];
  tags: string[];
  images: string[];
}

const projects: Project[] = [
  {
    num: "01",
    title: "Zenlise: Automated App Publishing",
    description: "Microservices platform in Go & Python automating app deployment and store compliance checks with Redis task queues & Azure cloud.",
    fullDescription:
      "Zenlise is an enterprise microservice platform engineered to streamline and automate multi-platform app publishing workflows. Built with Go microservices and Python automation workers, the architecture features asynchronous task queues powered by Redis and automated cloud deployment pipelines on Azure cloud infrastructure.",
    highlights: [
      "Distributed microservices architecture built in Go & Python",
      "Asynchronous background task processing with Redis Queues",
      "Automated app store compliance validation engine",
      "CI/CD deployment pipelines on Azure Cloud Infrastructure",
    ],
    tags: ["Go", "Python", "Next.js", "Redis", "Docker", "Azure"],
    images: [
      "/images/projects/zenlise.jpg",
      "/images/projects/documind.jpg",
      "/images/projects/shopease.jpg",
    ],
  },
  {
    num: "02",
    title: "Northstar Face Recognition System",
    description: "Edge-based facial recognition entry system using Flutter & MobileFaceNet with real-time anti-spoofing and liveness detection algorithms.",
    fullDescription:
      "Northstar is an edge-native biometric entry control platform. Utilizing TensorFlow Lite MobileFaceNet embeddings on client hardware, it performs real-time liveness verification, anti-spoofing texture detection, and instant vector matching for secure access management.",
    highlights: [
      "Real-time on-device vector embedding extraction via MobileFaceNet",
      "Liveness detection & anti-spoofing security algorithms",
      "Cross-platform Flutter kiosk UI with low-latency camera stream",
      "Scalable sync API with PostgreSQL backend database",
    ],
    tags: ["Flutter", "TensorFlow Lite", "Python", "Edge AI"],
    images: [
      "/images/projects/hippocortex.jpg",
      "/images/projects/zenlise.jpg",
      "/images/projects/documind.jpg",
    ],
  },
  {
    num: "03",
    title: "Fuel-Master Quota Management",
    description: "3-tier monorepo system with Spring Boot backend, JWT RBAC, React admin dashboard, and Flutter mobile app with real-time field operations.",
    fullDescription:
      "Fuel-Master is a production-grade 3-tier enterprise quota management system. Built as a monorepo, it features a Spring Boot backend API with granular JWT role-based access control, a high-density React analytics dashboard, and a Flutter mobile app deployed to field operators for real-time validation.",
    highlights: [
      "3-Tier Monorepo architecture (Spring Boot + React + Flutter)",
      "Granular RBAC security with JWT token authentication",
      "Real-time QR quota verification & transaction logging",
      "High-concurrency PostgreSQL database query optimization",
    ],
    tags: ["Java", "Spring Boot", "React", "Flutter", "PostgreSQL"],
    images: [
      "/images/projects/shopease.jpg",
      "/images/projects/hippocortex.jpg",
      "/images/projects/zenlise.jpg",
    ],
  },
  {
    num: "04",
    title: "Northstar Production Fitness Suite",
    description: "Full-featured iOS & Android fitness management suite deployed to production stores with HealthKit/Google Fit telemetry sync.",
    fullDescription:
      "Northstar Production Fitness Suite is a commercial mobile application ecosystem published on iOS App Store and Google Play Store. It syncs real-time biometric telemetry via Apple HealthKit and Google Fit APIs, supported by a scalable Firebase backend and customized REST API integrations.",
    highlights: [
      "Production deployment on Apple App Store & Google Play Store",
      "HealthKit & Google Fit API background telemetry sync",
      "Real-time workout session tracking & analytics dashboards",
      "Offline-first sync queue architecture with Firebase Cloud Store",
    ],
    tags: ["Flutter", "Firebase", "REST APIs", "iOS/Android"],
    images: [
      "/images/projects/documind.jpg",
      "/images/projects/shopease.jpg",
      "/images/projects/hippocortex.jpg",
    ],
  },
];

// Thumbnail Auto-Slide Component for Card Preview
function ProjectThumbnailSlideshow({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full sm:w-36 md:w-44 lg:w-48 aspect-[16/10] relative rounded-lg overflow-hidden border border-[#242424] bg-[#0a0a0a] shrink-0 shadow-md mt-2 sm:mt-0 group/thumb">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} screenshot ${currentIndex + 1}`}
            fill
            unoptimized
            className="object-cover object-top group-hover/thumb:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots Indicator overlay on thumbnail */}
      {images.length > 1 && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded-full border border-white/10">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-2.5 bg-[#568f5e]" : "w-1 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Modal Interactive Image Slideshow Component
function ModalSlideshow({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isAutoPlaying, images.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="relative w-full h-full min-h-[300px] bg-[#080808] overflow-hidden group/modal-slide flex items-center justify-center"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 p-4 sm:p-8 flex items-center justify-center"
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} slide ${currentIndex + 1}`}
            fill
            unoptimized
            className="object-contain object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-white/15 hover:border-[#568f5e] text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 z-10 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-white/15 hover:border-[#568f5e] text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 z-10 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Bottom Control Bar on Modal Slideshow */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 shadow-xl">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-6 bg-[#568f5e]" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
        <span className="text-[11px] font-mono text-gray-300 ml-1.5">
          {currentIndex + 1}/{images.length}
        </span>
      </div>
    </div>
  );
}

export default function SelectedWorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalContent = (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center cursor-zoom-out p-0"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full h-full bg-[#0d0d0d] flex flex-col lg:flex-row cursor-default overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Large Full-Height Image Slideshow */}
            <div className="w-full lg:w-[65%] xl:w-[70%] h-[45vh] lg:h-full relative bg-[#080808] border-b lg:border-b-0 lg:border-r border-[#1f1f1f] flex items-center justify-center overflow-hidden">
              <ModalSlideshow images={selectedProject.images} title={selectedProject.title} />
            </div>

            {/* Right Side: Project Information & Details Panel */}
            <div className="w-full lg:w-[35%] xl:w-[30%] h-[55vh] lg:h-full flex flex-col justify-between bg-[#111111] overflow-hidden">
              
              {/* Panel Top Header Bar */}
              <div className="p-4 sm:p-6 border-b border-[#202020] bg-[#141414] flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-xs font-mono font-bold text-[#568f5e] px-2.5 py-1 rounded bg-[#1c1c1c] border border-[#262626] shrink-0">
                    {selectedProject.num}
                  </span>
                  <h3 className="text-sm sm:text-base md:text-lg font-mono font-bold text-white leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white p-2 rounded-full bg-[#1c1c1c] border border-[#282828] hover:border-[#568f5e]/60 transition-all shrink-0 cursor-pointer"
                  aria-label="Close details"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Panel Content (Scrollable) */}
              <div className="p-5 sm:p-8 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
                {/* Overview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#568f5e]" />
                    Project Overview
                  </h4>
                  <p className="text-xs sm:text-sm font-mono text-gray-300 leading-relaxed font-normal">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-3 pt-4 border-t border-[#202020]">
                  <h4 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#568f5e]" />
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-gray-200 bg-[#181818] border border-[#262626] px-3 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Panel Bottom Footer Bar */}
              <div className="p-4 sm:p-5 border-t border-[#202020] bg-[#141414] flex items-center justify-between shrink-0">
                <span className="text-[11px] font-mono text-gray-400 flex items-center gap-2">
                  <AISparkleIcon size={14} className="text-[#568f5e]" />
                  <span>Click images to toggle slideshow</span>
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 sm:px-5 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-white font-mono text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Close Details
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section id="work" className="py-10 md:py-24 border-t border-[#1e1e1e] relative">

      {/* Render Modals into Portal */}
      {mounted && createPortal(modalContent, document.body)}
      {mounted && createPortal(<ProjectArchiveModal isOpen={isArchiveOpen} onClose={() => setIsArchiveOpen(false)} />, document.body)}

      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-8">
        <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
          <span className="text-[#568f5e] font-bold">03 /</span>
          <span className="text-white font-semibold">SELECTED WORK</span>
        </h2>

        <button
          onClick={() => setIsArchiveOpen(true)}
          className="group inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#568f5e] transition-colors py-1.5 cursor-pointer"
        >
          <span>SEE ALL PROJECTS</span>
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Main Grid: Projects Container + Notebook */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-start relative">
        
        {/* Left Column: Projects Container */}
        <SpotlightCard className="xl:col-span-7 bg-[#111111] border border-[#202020] rounded-xl overflow-hidden divide-y divide-[#202020] shadow-2xl">
          {projects.map((project) => (
            <div
              key={project.title}
              onClick={() => setSelectedProject(project)}
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
                  <h3 className="text-sm sm:text-base font-mono font-semibold text-white group-hover:text-[#568f5e] transition-colors tracking-tight flex items-center justify-between gap-2">
                    <div className="flex items-center min-w-0">
                      <span className="text-[#568f5e] font-bold mr-2 sm:hidden">{project.num}</span>
                      <span className="truncate">{project.title}</span>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-500 group-hover:text-[#568f5e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </h3>

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

        {/* Right Column: Sticky "HOW I THINK" Paper Notebook Pad */}
        <div className="xl:col-span-5 xl:sticky xl:top-20 h-fit w-full flex items-center justify-center mt-6 xl:mt-0">
          <div className="relative w-full max-w-sm sm:max-w-md xl:max-w-md flex items-center justify-center">
            <Image
              src="/images/how-i-think-transparent.png"
              alt="How I Think Diagram Transparent Paper Notepad"
              width={1400}
              height={1750}
              priority
              unoptimized
              className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
