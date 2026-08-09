"use client";

import Image from "next/image";
import { Code2, Cpu, Globe2, Award, Terminal, FileText } from "lucide-react";

const expertise = [
  {
    icon: Code2,
    title: "Backend & Distributed Systems",
    desc: "Architecting high-throughput microservices in Go & Python, Redis queues, REST APIs, and PostgreSQL database schemas.",
  },
  {
    icon: Cpu,
    title: "Applied AI & Vector Embeddings",
    desc: "Hands-on experience at WSO2 building active learning pipelines, graph clustering, LLM vector ingestion, and edge AI.",
  },
  {
    icon: Globe2,
    title: "Full-Stack & Mobile Delivery",
    desc: "Designing responsive Next.js web applications and production Flutter mobile suites deployed to iOS and Android stores.",
  },
];

export default function AboutSection() {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
        <span className="text-[#568f5e] font-bold">07 /</span>
        <span className="text-white font-semibold">ABOUT ME</span>
      </h2>

      {/* Main 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Portrait, Bio & Credentials (7 cols) */}
        <div className="lg:col-span-7 bg-[#111111] border border-[#202020] rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Top Row: Portrait + Identity */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 relative rounded-xl overflow-hidden border border-[#262626] bg-[#161616] shadow-md">
              <Image
                src="/images/about-portrait.jpg"
                alt="Hasinthaka Piyumal"
                fill
                unoptimized
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div className="space-y-2 flex-1">
              <h3 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                Hasinthaka Piyumal
              </h3>
              <p className="text-xs font-mono text-[#568f5e] font-semibold flex items-center gap-2">
                <Terminal size={14} />
                <span>Software Engineer & Final-Year Undergraduate</span>
              </p>
              <p className="text-xs font-mono text-gray-400 leading-relaxed pt-1">
                Final-year Software Engineering student at University of Kelaniya. Specializing in distributed backend microservices, applied machine learning pipelines, and full-stack web/mobile application development.
              </p>
            </div>
          </div>

          {/* Narrative Body */}
          <div className="space-y-3 text-xs font-mono text-gray-300 leading-relaxed border-t border-[#202020] pt-5">
            <p>
              With 3+ years of freelance experience delivering web and mobile apps alongside enterprise engineering experience at WSO2 and Zenlise, I build software that balances technical rigor with real-world product reliability.
            </p>
            <p className="text-gray-400">
              My academic research in AI design pattern prevalence won the Best Paper Award at PATTERNS 2026 and is published on arXiv.
            </p>
          </div>

          {/* Certifications & Credentials */}
          <div className="border-t border-[#202020] pt-5 space-y-3">
            <div className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
              CERTIFICATIONS & CREDENTIALS
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-gray-300">
              <span className="bg-[#181818] border border-[#262626] px-3 py-1 rounded-md flex items-center gap-1.5">
                <Award size={13} className="text-[#568f5e]" />
                IBM Machine Learning Certified
              </span>
              <span className="bg-[#181818] border border-[#262626] px-3 py-1 rounded-md flex items-center gap-1.5">
                <FileText size={13} className="text-[#568f5e]" />
                Duke University Explainable AI (XAI)
              </span>
            </div>
          </div>

          {/* Signature Quote */}
          <div className="border-t border-[#202020] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="font-handwritten text-lg sm:text-xl text-[#568f5e] font-bold">
              Let&apos;s build something impactful.
            </div>
            <div className="font-handwritten text-sm text-gray-400">
              – Hasinthaka Piyumal
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Technical Focus (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Unified 2x2 Stats Box */}
          <div className="bg-[#111111] border border-[#202020] rounded-xl overflow-hidden divide-y divide-[#202020] shadow-2xl">
            <div className="grid grid-cols-2 divide-x divide-[#202020]">
              <div className="p-5 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white">3+</div>
                <div className="text-[11px] font-mono text-gray-400">Years Experience</div>
              </div>
              <div className="p-5 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white">4+</div>
                <div className="text-[11px] font-mono text-gray-400">Production Apps</div>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-[#202020]">
              <div className="p-5 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white">1</div>
                <div className="text-[11px] font-mono text-gray-400">arXiv Publication</div>
              </div>
              <div className="p-5 text-center space-y-1">
                <div className="text-lg sm:text-xl font-mono font-bold text-[#568f5e] pt-1">Best Paper</div>
                <div className="text-[11px] font-mono text-gray-400">PATTERNS 2026</div>
              </div>
            </div>
          </div>

          {/* Technical Focus Box */}
          <div className="bg-[#111111] border border-[#202020] rounded-xl p-6 space-y-5 shadow-2xl">
            <h4 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest">
              TECHNICAL FOCUS
            </h4>

            <div className="space-y-4">
              {expertise.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-[#161616] border border-[#242424] flex items-center justify-center text-[#568f5e] shrink-0 pt-0.5">
                      <Icon size={16} />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h5 className="text-xs font-mono font-semibold text-white">
                        {item.title}
                      </h5>
                      <p className="text-[11px] font-mono text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
