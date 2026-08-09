import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, CheckCircle, ExternalLink, FileText } from "lucide-react";
import AISparkleIcon from "./icons/AISparkleIcon";
import SpotlightCard from "./SpotlightCard";
import ProjectArchiveModal from "./ProjectArchiveModal";
import { motion, AnimatePresence } from "framer-motion";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

export interface Project {
  num: string;
  title: string;
  category: string;
  year: string;
  date?: string;
  status?: "Published" | "Draft";
  description: string;
  fullDescription: string;
  highlights?: string[];
  tags: string[];
  images: string[];
  githubUrl?: string;
  demoUrl?: string;
  moreUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    num: "01",
    title: "Zenlise: Automated App Publishing",
    category: "Full-Stack",
    year: "2026",
    description: "Microservices platform in Go & Python automating app deployment and store compliance checks with Redis task queues & Azure cloud.",
    fullDescription:
      "Zenlise is an enterprise microservice platform engineered to streamline and automate multi-platform app publishing workflows. Built with Go microservices and Python automation workers, the architecture features asynchronous task queues powered by Redis and automated cloud deployment pipelines on Azure cloud infrastructure.",
    highlights: [],
    tags: ["Go", "Python", "Next.js", "Redis", "Docker", "Azure"],
    images: [
      "/images/projects/zenlise.jpg",
      "/images/projects/documind.jpg",
      "/images/projects/shopease.jpg",
    ],
    githubUrl: "https://github.com/HasinthakaPiyumal",
    demoUrl: "https://zenlise.dev",
  },
  {
    num: "02",
    title: "Northstar Face Recognition System",
    category: "Backend & AI",
    year: "2026",
    description: "Edge-based facial recognition entry system using Flutter & MobileFaceNet with real-time anti-spoofing and liveness detection algorithms.",
    fullDescription:
      "Northstar is an edge-native biometric entry control platform. Utilizing TensorFlow Lite MobileFaceNet embeddings on client hardware, it performs real-time liveness verification, anti-spoofing texture detection, and instant vector matching for secure access management.",
    highlights: [],
    tags: ["Flutter", "TensorFlow Lite", "Python", "Edge AI"],
    images: [
      "/images/projects/hippocortex.jpg",
      "/images/projects/zenlise.jpg",
      "/images/projects/documind.jpg",
    ],
    githubUrl: "https://github.com/HasinthakaPiyumal",
    moreUrl: "https://arxiv.org/abs/2607.00558",
  },
  {
    num: "03",
    title: "Fuel-Master Quota Management",
    category: "Full-Stack",
    year: "2025",
    description: "3-tier monorepo system with Spring Boot backend, JWT RBAC, React admin dashboard, and Flutter mobile app with real-time field operations.",
    fullDescription:
      "Fuel-Master is a production-grade 3-tier enterprise quota management system. Built as a monorepo, it features a Spring Boot backend API with granular JWT role-based access control, a high-density React analytics dashboard, and a Flutter mobile app deployed to field operators for real-time validation.",
    highlights: [],
    tags: ["Java", "Spring Boot", "React", "Flutter", "PostgreSQL"],
    images: [
      "/images/projects/shopease.jpg",
      "/images/projects/hippocortex.jpg",
      "/images/projects/zenlise.jpg",
    ],
    githubUrl: "https://github.com/HasinthakaPiyumal",
    demoUrl: "https://fuelmaster.dev",
    moreUrl: "https://github.com/HasinthakaPiyumal",
  },
  {
    num: "04",
    title: "Northstar Production Fitness Suite",
    category: "Mobile Apps",
    year: "2026",
    description: "Full-featured iOS & Android fitness management suite deployed to production stores with HealthKit/Google Fit telemetry sync.",
    fullDescription:
      "Northstar Production Fitness Suite is a commercial mobile application ecosystem published on iOS App Store and Google Play Store. It syncs real-time biometric telemetry via Apple HealthKit and Google Fit APIs, supported by a scalable Firebase backend and customized REST API integrations.",
    highlights: [],
    tags: ["Flutter", "Firebase", "REST APIs", "iOS/Android"],
    images: [
      "/images/projects/documind.jpg",
      "/images/projects/shopease.jpg",
      "/images/projects/hippocortex.jpg",
    ],
    demoUrl: "https://apps.apple.com",
  },
  {
    num: "05",
    title: "DocuMind AI - Intelligent PDF Assistant",
    category: "Backend & AI",
    year: "2026",
    description: "Enterprise PDF document intelligence system with vector embeddings, semantic RAG search, and interactive AI chat assistant.",
    fullDescription:
      "DocuMind AI is an enterprise document intelligence platform capable of parsing large PDF document libraries, extracting vector embeddings, running high-accuracy semantic RAG retrieval, and generating grounded responses with exact page citations.",
    highlights: [],
    tags: ["Python", "FastAPI", "React", "TailwindCSS", "Vector DB"],
    images: [
      "/images/projects/documind.jpg",
      "/images/projects/zenlise.jpg",
    ],
    githubUrl: "https://github.com/HasinthakaPiyumal",
    demoUrl: "https://documind-ai.dev",
  },
  {
    num: "06",
    title: "Distributed Task Queue Engine",
    category: "Backend & AI",
    year: "2025",
    description: "High-throughput asynchronous job processing engine written in Go with Redis queue backend, failure retries, and metrics dashboard.",
    fullDescription:
      "A distributed, high-performance background job processing framework built in Go. Features concurrent worker pools, Redis-backed persistent state, customizable retry backoffs, dead-letter queue routing, and Prometheus metrics telemetry.",
    highlights: [],
    tags: ["Go", "Redis", "Docker", "Prometheus"],
    images: [
      "/images/projects/zenlise.jpg",
      "/images/projects/shopease.jpg",
    ],
    githubUrl: "https://github.com/HasinthakaPiyumal",
  },
  {
    num: "07",
    title: "WSO2 Enterprise Gateway Extension Suite",
    category: "Open Source",
    year: "2025",
    description: "API management extensions, OAuth2 custom authenticators, and Identity Server integration plugins built for enterprise middleware.",
    fullDescription:
      "Contributed enterprise middleware extensions to WSO2 API Manager and Identity Server. Developed custom Java/Ballerina OAuth2 authenticators, request transformation handlers, and rate-limiting enforcement interceptors.",
    highlights: [],
    tags: ["Java", "Spring Boot", "Ballerina", "OAuth2"],
    images: [
      "/images/projects/hippocortex.jpg",
      "/images/projects/documind.jpg",
    ],
    githubUrl: "https://github.com/HasinthakaPiyumal",
    moreUrl: "https://wso2.com",
  },
  {
    num: "08",
    title: "Call-Graph AI Pattern Extractor",
    category: "Backend & AI",
    year: "2024",
    description: "Empirical methodology tool for detecting AI architectural patterns in software repositories using call-graph community chunking.",
    fullDescription:
      "Research software tool powering the arXiv:2607.00558 publication. Extracts abstract syntax trees and call-graphs from multi-language code bases to detect and classify AI design pattern prevalence.",
    highlights: [],
    tags: ["Python", "NetworkX", "ArXiv", "Scikit-Learn"],
    images: [
      "/images/projects/shopease.jpg",
      "/images/projects/zenlise.jpg",
    ],
    githubUrl: "https://github.com/HasinthakaPiyumal",
    moreUrl: "https://arxiv.org/abs/2607.00558",
  },
];

// Thumbnail Auto-Slide Component for Card Preview
export function ProjectThumbnailSlideshow({ images, title }: { images: string[]; title: string }) {
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
  const [projectList, setProjectList] = useState<Project[]>(projects);

  useEffect(() => {
    setMounted(true);
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.projects && data.projects.length > 0) {
          setProjectList(data.projects);
        }
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const publishedProjects = projectList.filter((p) => p.status !== "Draft");
  const featuredProjects = publishedProjects.filter((p) => p.featured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : publishedProjects.slice(0, 6);

  useEffect(() => {
    if (selectedProject || isArchiveOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject, isArchiveOpen]);

  const modalContent = (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center cursor-zoom-out p-0"
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

                {/* 3 Action Buttons (GitHub, View Demo, More Details) - Only rendered if link exists */}
                {(selectedProject.githubUrl || selectedProject.demoUrl || selectedProject.moreUrl) && (
                  <div className="space-y-3 pt-4 border-t border-[#202020]">
                    <h4 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#568f5e]" />
                      Project Links & Actions
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 min-w-[110px] flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#161616] border border-[#262626] hover:border-[#568f5e] text-xs font-mono text-gray-200 hover:text-white transition-all group cursor-pointer shadow-md"
                        >
                          <GithubIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#568f5e]" />
                          <span>GitHub</span>
                          <ArrowUpRight size={13} className="text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      )}

                      {selectedProject.demoUrl && (
                        <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 min-w-[110px] flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#568f5e]/20 border border-[#568f5e]/50 hover:bg-[#568f5e] text-xs font-mono text-[#568f5e] hover:text-white transition-all font-semibold group cursor-pointer shadow-md"
                        >
                          <ExternalLink size={13} />
                          <span>View Demo</span>
                          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      )}

                      {selectedProject.moreUrl && (
                        <a
                          href={selectedProject.moreUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 min-w-[110px] flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#1d1d1d] border border-[#2a2a2a] hover:border-[#568f5e] text-xs font-mono text-gray-300 hover:text-white transition-all group cursor-pointer shadow-md"
                        >
                          <FileText size={13} className="text-gray-400 group-hover:text-[#568f5e]" />
                          <span>More Details</span>
                          <ArrowUpRight size={13} className="text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Panel Bottom Footer Bar */}
              <div className="p-3.5 sm:p-5 border-t border-[#202020] bg-[#141414] flex items-center justify-between gap-3 shrink-0">
                <span className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-gray-400">
                  <AISparkleIcon size={14} className="text-[#568f5e]" />
                  <span>Click images to toggle slideshow</span>
                </span>
                <span className="sm:hidden flex items-center gap-1.5 text-[10px] font-mono text-gray-400 min-w-0 truncate">
                  <AISparkleIcon size={12} className="text-[#568f5e] shrink-0" />
                  <span className="truncate">Tap image to toggle</span>
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 sm:px-5 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-white font-mono text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
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
      {mounted && createPortal(
        <ProjectArchiveModal
          isOpen={isArchiveOpen}
          onClose={() => setIsArchiveOpen(false)}
          allProjects={projectList}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />,
        document.body
      )}

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
          <span>SEE ALL PROJECTS ({publishedProjects.length})</span>
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Main Grid: Projects Container + Notebook */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-start relative">
        
        {/* Left Column: Featured Projects Container */}
        <SpotlightCard className="xl:col-span-7 bg-[#111111] border border-[#202020] rounded-xl overflow-hidden divide-y divide-[#202020] shadow-2xl">
          {displayProjects.map((project) => {
            const projectImages = project.images && project.images.length > 0 ? project.images : ["/images/projects/zenlise.jpg"];
            const projectTags = project.tags || [];

            return (
              <div
                key={project.title + project.num}
                onClick={() => setSelectedProject({ ...project, images: projectImages, tags: projectTags })}
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
                      {projectTags.map((tag) => (
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
                <ProjectThumbnailSlideshow images={projectImages} title={project.title} />
              </div>
            );
          })}
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
