"use client";

import { Award, Trophy, Medal, CheckCircle } from "lucide-react";

const awards = [
  {
    num: "01",
    title: "Best Paper Award",
    issuer: "PATTERNS 2026 International Conference",
    year: "2026",
    description: "Awarded for empirical research on AI pattern prevalence using call-graph community chunking & active learning strategies (arXiv:2607.00558).",
    tag: "Publication Award",
    icon: Trophy,
  },
  {
    num: "02",
    title: "1st Runner-Up",
    issuer: "Junior Hack 2025 (SESA)",
    year: "2025",
    description: "Secured 2nd place in the nationwide software hackathon organized by Software Engineering Students Association.",
    tag: "Hackathon",
    icon: Medal,
  },
  {
    num: "03",
    title: "4th Place Finalist",
    issuer: "Sansatech Challenge",
    year: "2025",
    description: "Ranked 4th place in competitive software engineering innovation and rapid prototyping challenge.",
    tag: "Competition",
    icon: Award,
  },
  {
    num: "04",
    title: "IBM Machine Learning Certified",
    issuer: "IBM Credential",
    year: "2024",
    description: "Certified in supervised learning, neural networks, feature engineering, and predictive AI modeling.",
    tag: "Certification",
    icon: CheckCircle,
  },
  {
    num: "05",
    title: "Explainable AI (XAI) Specialization",
    issuer: "Duke University",
    year: "2024",
    description: "Specialized in model interpretability, feature importance attribution, SHAP/LIME tools, and transparent ML systems.",
    tag: "Specialization",
    icon: CheckCircle,
  },
];

export default function AwardsSection() {
  return (
    <section id="awards" className="py-20 md:py-28 border-t border-[#1e1e1e] relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
          <span className="text-[#568f5e] font-bold">06 /</span>
          <span className="text-white font-semibold">HONORS & AWARDS</span>
        </h2>
      </div>

      {/* Awards List Container */}
      <div className="bg-[#111111] border border-[#202020] rounded-xl overflow-hidden divide-y divide-[#202020] shadow-2xl">
        {awards.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group p-6 sm:p-7 hover:bg-[#151515] transition-colors duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            >
              {/* Left Column: Number + Info */}
              <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                {/* Number badge */}
                <div className="flex flex-col items-center shrink-0 pt-0.5">
                  <span className="text-xs font-mono font-bold text-[#568f5e]">
                    {item.num}
                  </span>
                </div>

                {/* Main details */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-mono font-semibold text-white group-hover:text-[#568f5e] transition-colors tracking-tight">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono text-gray-400">
                      — {item.issuer}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181818] border border-[#262626] text-[#568f5e] font-medium">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-gray-400 leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Year & Icon Badge */}
              <div className="shrink-0 self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181818] border border-[#262626] text-xs font-mono text-gray-300">
                <Icon size={14} className="text-[#568f5e]" />
                <span>{item.year}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
