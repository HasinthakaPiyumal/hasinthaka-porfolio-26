"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import type { ExperienceItem } from "@/lib/data";

const defaultExperiences: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Zenlise",
    period: "2026 - Present",
    description: "Architecting automated app publishing microservices, deployment pipelines in Go & Python, task queues with Redis, and Azure cloud infrastructure.",
    tags: ["Go", "Python", "Redis", "Docker", "Azure"],
    logo: "/images/experience/zenlise.webp",
  },
  {
    role: "Engineering Intern",
    company: "WSO2",
    period: "2025 - 2026",
    description: "Contributed to enterprise middleware & identity management solutions, REST API integrations, and cloud-native backend service optimization.",
    tags: ["Java", "Spring Boot", "Ballerina", "Identity Server", "APIM"],
    logo: "/images/experience/wso2.webp",
  },
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2023 - Present",
    description: "Building scalable web & mobile apps for international clients using React, Next.js, Flutter, and cloud database architectures.",
    tags: ["React", "Next.js", "Flutter", "Node.js", "PostgreSQL"],
    logo: "/images/experience/freelancer.webp",
  },
];

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultExperiences);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.experiences && data.experiences.length > 0) {
          setExperiences(data.experiences);
        }
      })
      .catch((err) => console.error("Error fetching experiences:", err));
  }, []);
  return (
    <section id="experience" className="py-10 md:py-24 border-t border-[#1e1e1e] relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 sm:mb-8">
        <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
          <span className="text-[#568f5e] font-bold">02 /</span>
          <span className="text-white font-semibold">EXPERIENCE</span>
        </h2>
      </div>

      {/* Experience List Container */}
      <SpotlightCard className="bg-[#111111] border border-[#202020] rounded-xl overflow-hidden divide-y divide-[#202020] shadow-2xl">
        {experiences.map((exp) => (
          <div
            key={`${exp.company}-${exp.role}`}
            className="group p-4 sm:p-7 hover:bg-[#151515] transition-colors duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-6"
          >
            {/* Main Content Container */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 flex-1 w-full">
              
              {/* Logo Box - Desktop View (Hidden on mobile) */}
              <div className="hidden sm:flex w-12 h-12 sm:w-14 sm:h-14 relative rounded-xl border border-[#262626] bg-[#161616] items-center justify-center shrink-0 shadow-inner group-hover:border-[#568f5e]/50 transition-colors overflow-hidden">
                <Image
                  src={exp.logo || "/images/experience/freelancer.webp"}
                  alt={exp.company}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full rounded-lg"
                />
              </div>

              {/* Text Info Container - Full width on mobile */}
              <div className="space-y-2.5 w-full flex-1">
                
                {/* Mobile Header: Logo + Role Title + Company Badge & Period */}
                <div className="flex items-center gap-3 sm:hidden mb-1">
                  <div className="w-9 h-9 relative rounded-lg border border-[#262626] bg-[#161616] flex items-center justify-center shrink-0 overflow-hidden">
                    <Image
                      src={exp.logo || "/images/experience/freelancer.webp"}
                      alt={exp.company}
                      width={36}
                      height={36}
                      className="object-contain w-full h-full rounded-md"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <h3 className="text-sm font-mono font-semibold text-white group-hover:text-[#568f5e] transition-colors tracking-tight truncate">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c1c] border border-[#282828] text-gray-300">
                        @ {exp.company}
                      </span>
                      <span className="text-[10px] font-mono text-[#568f5e] font-medium">
                        ({exp.period})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Header (Hidden on mobile) */}
                <div className="hidden sm:flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg sm:text-xl font-mono font-semibold text-white group-hover:text-[#568f5e] transition-colors tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#1c1c1c] border border-[#282828] text-gray-300">
                    @ {exp.company}
                  </span>
                </div>

                {/* Description (Full Width on Mobile) */}
                <p className="text-[11px] sm:text-xs md:text-sm font-mono text-gray-400 leading-relaxed max-w-2xl w-full">
                  {exp.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-gray-400 bg-[#181818] border border-[#242424] px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Date Period Badge (Desktop only) */}
            <div className="hidden sm:flex shrink-0 self-start md:self-center items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181818] border border-[#262626] text-xs font-mono text-[#568f5e] font-semibold">
              <Calendar size={13} className="text-[#568f5e]" />
              <span>{exp.period}</span>
            </div>
          </div>
        ))}
      </SpotlightCard>
    </section>
  );
}
