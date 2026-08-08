"use client";

import { Target, Code2, Rocket, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const approachItems = [
  {
    icon: Target,
    title: "Understand",
    description: "I start by understanding the problem, the users and the real constraints.",
    linkText: "Research",
  },
  {
    icon: Code2,
    title: "Build",
    description: "I write clean, maintainable code and design systems that scale and adapt.",
    linkText: "Engineering",
  },
  {
    icon: Rocket,
    title: "Deliver",
    description: "I ship reliable products with performance, security and great user experience.",
    linkText: "Deploy",
  },
  {
    icon: TrendingUp,
    title: "Improve",
    description: "I measure, learn and iterate to continuously make things better.",
    linkText: "Iterate",
  },
];

const tools = [
  { name: "TypeScript", label: "TS" },
  { name: "React", label: "React" },
  { name: "JavaScript", label: "JS" },
  { name: "Python", label: "Python" },
  { name: "PostgreSQL", label: "Postgres" },
  { name: "AWS", label: "AWS" },
  { name: "Docker", label: "Docker" },
  { name: "GitHub", label: "GitHub" },
];

export default function ApproachAndToolsSection() {
  return (
    <section className="py-24 md:py-32 border-t border-[#1e1e1e]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
        
        {/* Left Column - 03 / MY APPROACH */}
        <div className="lg:col-span-8 space-y-10">
          <h2 className="text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
            <span className="text-[#4d7a54] font-bold">03 /</span>
            <span className="text-white font-semibold">MY APPROACH</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {approachItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group bg-[#161616] hover:bg-[#1f1f1f] border border-[#262626] hover:border-[#383838] p-8 rounded-xl transition-all duration-300 flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-4 mb-8">
                    <div className="w-12 h-12 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center text-gray-300 group-hover:text-[#4d7a54] group-hover:border-[#4d7a54]/50 transition-colors shadow-sm">
                      <IconComponent size={24} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-mono font-semibold text-white group-hover:text-[#4d7a54] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm font-mono text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 group-hover:text-[#4d7a54] transition-colors pt-4 border-t border-[#222222]">
                    <span>{item.linkText}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column - TOOLS I USE */}
        <div className="lg:col-span-4 space-y-10">
          <h2 className="text-sm font-mono tracking-widest text-gray-400 uppercase font-semibold">
            TOOLS I USE
          </h2>

          <div className="bg-[#161616] border border-[#262626] p-8 rounded-xl space-y-6 shadow-lg">
            <div className="grid grid-cols-4 gap-3.5">
              {tools.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="aspect-square bg-[#1a1a1a] border border-[#282828] hover:border-[#4d7a54]/60 rounded-lg flex flex-col items-center justify-center p-2 text-center group hover:scale-105 transition-all duration-200 shadow-sm"
                >
                  <span className="text-xs sm:text-sm font-mono font-bold text-gray-200 group-hover:text-[#4d7a54]">
                    {tool.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="text-xs font-mono text-gray-500 text-center border-t border-[#222222] pt-4">
              and many more...
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
