"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";

const experiences = [
  {
    role: "Software Engineer",
    company: "Zenlise",
    period: "2026 - Present",
    description: "Architecting automated app publishing microservices, deployment pipelines in Go & Python, task queues with Redis, and Azure cloud infrastructure.",
    tags: ["Go", "Python", "Redis", "Docker", "Azure"],
    logo: "/images/experience/zenlise.png",
  },
  {
    role: "Engineering Intern",
    company: "WSO2",
    period: "2025 - 2026",
    description: "Contributed to enterprise middleware & identity management solutions, REST API integrations, and cloud-native backend service optimization.",
    tags: ["Java", "Spring Boot", "Ballerina", "Identity Server", "APIM"],
    logo: "/images/experience/wso2.png",
  },
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2023 - Present",
    description: "Building scalable web & mobile apps for international clients using React, Next.js, Flutter, and cloud database architectures.",
    tags: ["React", "Next.js", "Flutter", "Node.js", "PostgreSQL"],
    logo: "/images/experience/freelancer.png",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-28 border-t border-[#1e1e1e] relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
          <span className="text-[#568f5e] font-bold">02 /</span>
          <span className="text-white font-semibold">EXPERIENCE</span>
        </h2>
      </div>

      {/* Experience List Container */}
      <div className="bg-[#111111] border border-[#202020] rounded-xl overflow-hidden divide-y divide-[#202020] shadow-2xl">
        {experiences.map((exp) => (
          <div
            key={`${exp.company}-${exp.role}`}
            className="group p-6 sm:p-8 hover:bg-[#151515] transition-colors duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            {/* Left Column: Logo + Role Info */}
            <div className="flex items-start gap-4 sm:gap-6 flex-1">
              {/* Logo Box */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 relative rounded-xl border border-[#262626] bg-[#161616] flex items-center justify-center shrink-0 shadow-inner group-hover:border-[#568f5e]/50 transition-colors overflow-hidden">
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full rounded-lg"
                />
              </div>

              {/* Text Info */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg sm:text-xl font-mono font-semibold text-white group-hover:text-[#568f5e] transition-colors tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#1c1c1c] border border-[#282828] text-gray-300">
                    @ {exp.company}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-mono text-gray-400 leading-relaxed max-w-2xl">
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

            {/* Right Column: Date Period Badge */}
            <div className="shrink-0 self-start md:self-center flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181818] border border-[#262626] text-xs font-mono text-[#568f5e] font-semibold">
              <Calendar size={13} className="text-[#568f5e]" />
              <span>{exp.period}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
