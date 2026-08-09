"use client";

import { useEffect, useState } from "react";
import { Target, Code2, Rocket, TrendingUp, ArrowRight, Wrench, Layers } from "lucide-react";
import { motion } from "framer-motion";
import type { ApproachPillar, TechCategory } from "@/lib/data";
import { getTechItem } from "@/components/TechIcons";

const defaultPillars: ApproachPillar[] = [
  { title: "Modular Microservices", description: "Designing decoupled, event-driven architectures with Go, Python & Redis queues." },
  { title: "High-Performance Backends", description: "Optimizing REST APIs, Spring Boot services, and database queries for low latency." },
  { title: "Cross-Platform Mobile", description: "Engineering native-like Flutter mobile apps for iOS and Android." },
  { title: "Clean Code & Testing", description: "Enforcing test coverage, CI/CD pipelines, and rigorous software architecture." }
];

const defaultTechCategories: TechCategory[] = [
  { title: "Languages", tools: ["Python", "Go", "Java", "TypeScript", "Dart", "Ballerina", "SQL"] },
  { title: "Frameworks & Web", tools: ["Next.js", "React", "Spring Boot", "FastAPI", "Flutter", "Tailwind CSS"] },
  { title: "Cloud & Databases", tools: ["PostgreSQL", "Redis", "Docker", "Azure", "Firebase", "Prometheus"] },
  { title: "AI & Data Tools", tools: ["TensorFlow Lite", "NetworkX", "Scikit-Learn", "Vector DB (RAG)"] }
];

export function renderToolIcon(name: string) {
  const item = getTechItem(name);
  const IconComp = item.icon;
  return <IconComp className="w-6 h-6" />;
}

export default function ApproachAndToolsSection() {
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [pillars, setPillars] = useState<ApproachPillar[]>(defaultPillars);
  const [categories, setCategories] = useState<TechCategory[]>(defaultTechCategories);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.approachAndTools) {
          if (data.approachAndTools.pillars && data.approachAndTools.pillars.length > 0) {
            setPillars(data.approachAndTools.pillars);
          }
          if (data.approachAndTools.techCategories && data.approachAndTools.techCategories.length > 0) {
            setCategories(data.approachAndTools.techCategories);
          }
        }
      })
      .catch((err) => console.error("Error fetching approach & tools data:", err));

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Map 4 pillars into items with icons
  const icons = [Target, Code2, Rocket, TrendingUp];
  const links = ["Research", "Engineering", "Deploy", "Iterate"];
  const pillarItems = pillars.map((p, idx) => ({
    num: `0${idx + 1}`,
    icon: icons[idx % icons.length],
    title: p.title,
    description: p.description,
    linkText: links[idx % links.length],
  }));

  // Flatten tools from categories for the marquee
  const rawToolsList = categories.flatMap((c) => c.tools).filter(Boolean);
  const uniqueTools = Array.from(new Set(rawToolsList));
  const toolList = uniqueTools.length > 0 ? uniqueTools : ["TypeScript", "React", "Python", "Go", "Java", "Next.js", "PostgreSQL", "Redis", "Docker"];

  // Duplicate for smooth marquee looping
  const marqueeTools = [...toolList, ...toolList, ...toolList];
  const halfLength = Math.ceil(toolList.length / 2);
  const row1Tools = toolList.slice(0, halfLength);
  const row2Tools = toolList.slice(halfLength);
  const mobileMarqueeRow1 = [...row1Tools, ...row1Tools, ...row1Tools];
  const mobileMarqueeRow2 = [...row2Tools, ...row2Tools, ...row2Tools];

  return (
    <section className="py-10 md:py-24 border-t border-[#1e1e1e] space-y-8 md:space-y-14">
      
      {/* ROW 1: MY APPROACH (Pillars) */}
      <div className="space-y-4">
        <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
          <span className="text-[#568f5e] font-bold">04 /</span>
          <span className="text-white font-semibold">MY APPROACH</span>
        </h2>

        {/* 2x2 Grid on Mobile, 4-Column Row on Desktop */}
        <div className="bg-[#111111] border border-[#202020] rounded-xl overflow-hidden grid grid-cols-2 lg:grid-cols-4 shadow-xl">
          {pillarItems.map((item, index) => {
            const IconComponent = item.icon;
            const borderClasses =
              index === 0
                ? "border-r border-b lg:border-b-0 border-[#202020]"
                : index === 1
                ? "border-b lg:border-r lg:border-b-0 border-[#202020]"
                : index === 2
                ? "border-r border-[#202020]"
                : "";

            return (
              <div
                key={item.title}
                className={`group p-3 sm:p-6 hover:bg-[#151515] transition-colors duration-300 flex flex-col justify-between space-y-2 sm:space-y-3 ${borderClasses}`}
              >
                <div className="space-y-1.5 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <IconComponent className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-gray-200 group-hover:text-[#568f5e] transition-colors stroke-[1.8]" />
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#568f5e]/80">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-base font-mono font-semibold text-white group-hover:text-[#568f5e] transition-colors tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs font-mono text-gray-400 leading-snug sm:leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-medium text-[#568f5e] group-hover:translate-x-1 transition-transform pt-1 sm:pt-2">
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROW 2: DYNAMIC TOOLS I USE (Infinite Logo Marquee) */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase font-semibold flex items-center gap-2">
            <Wrench size={14} className="text-[#568f5e]" />
            <span>TOOLS I USE</span>
          </h2>
          <span className="text-xs font-mono text-gray-500">
            {toolList.length} active technologies
          </span>
        </div>

        {/* Mobile Two-Row Infinite Sliding Marquee (< md) */}
        <div className="md:hidden bg-[#111111] border border-[#202020] p-3.5 rounded-xl shadow-xl overflow-hidden relative space-y-3">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

          {/* Row 1: Sliding Left */}
          <motion.div
            className="flex items-center gap-3 w-max"
            animate={isPageVisible ? { x: ["0%", "-50%"] } : undefined}
            transition={{ ease: "linear", duration: 18, repeat: Infinity }}
          >
            {mobileMarqueeRow1.map((toolName, idx) => (
              <div
                key={`mobile-r1-${toolName}-${idx}`}
                className="w-12 h-12 bg-[#161616] border border-[#242424] active:border-[#568f5e] rounded-xl flex items-center justify-center p-2 shrink-0 shadow-sm"
                title={toolName}
              >
                {renderToolIcon(toolName)}
              </div>
            ))}
          </motion.div>

          {/* Row 2: Sliding Right */}
          <motion.div
            className="flex items-center gap-3 w-max"
            animate={isPageVisible ? { x: ["-50%", "0%"] } : undefined}
            transition={{ ease: "linear", duration: 18, repeat: Infinity }}
          >
            {mobileMarqueeRow2.map((toolName, idx) => (
              <div
                key={`mobile-r2-${toolName}-${idx}`}
                className="w-12 h-12 bg-[#161616] border border-[#242424] active:border-[#568f5e] rounded-xl flex items-center justify-center p-2 shrink-0 shadow-sm"
                title={toolName}
              >
                {renderToolIcon(toolName)}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Desktop Infinite Smooth Sliding Marquee (>= md) */}
        <div className="hidden md:block bg-[#111111] border border-[#202020] p-5 rounded-xl shadow-xl overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-4 w-max"
            animate={isPageVisible ? { x: ["0%", "-50%"] } : undefined}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {marqueeTools.map((toolName, idx) => (
              <div
                key={`${toolName}-${idx}`}
                className="w-14 h-14 aspect-square bg-[#161616] border border-[#242424] hover:border-[#568f5e]/60 rounded-xl flex items-center justify-center p-2 shrink-0 hover:scale-110 transition-transform duration-200 shadow-sm cursor-pointer"
                title={toolName}
              >
                {renderToolIcon(toolName)}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
