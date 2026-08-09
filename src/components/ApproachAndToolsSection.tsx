"use client";

import { useEffect, useState } from "react";
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

// Clean monochrome SVG Icons matching screenshot
function TSIcon() {
  return (
    <div className="font-mono text-xs sm:text-sm font-bold tracking-tight text-white">TS</div>
  );
}

function ReactIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="12" rx="9" ry="3.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function JSIcon() {
  return (
    <div className="font-mono text-xs sm:text-sm font-bold tracking-tight text-white">JS</div>
  );
}

function PythonIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.927 2.01a5.05 5.05 0 0 0-4.992 4.994v1.854h5.055v.618H4.6a4.99 4.99 0 0 0-4.99 4.995c0 2.76 2.235 4.994 4.99 4.994h1.545v-2.164a2.83 2.83 0 0 1 2.834-2.833h4.943c1.56 0 2.834-1.273 2.834-2.834V6.999a4.99 4.99 0 0 0-4.835-4.989zm-2.06 1.545a.927.927 0 1 1 0 1.855.927.927 0 0 1 0-1.855z" />
      <path d="M12.073 21.99a5.05 5.05 0 0 0 4.992-4.994v-1.854h-5.055v-.618H19.4a4.99 4.99 0 0 0 4.99-4.995c0-2.76-2.235-4.994-4.99-4.994h-1.545v2.164a2.83 2.83 0 0 1-2.834 2.833h-4.943a2.83 2.83 0 0 0-2.834 2.834v4.654a4.99 4.99 0 0 0 4.835 4.989zm2.06-1.545a.927.927 0 1 1 0-1.855a.927.927 0 0 1 0 1.855z" />
    </svg>
  );
}

function PostgresIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3c-4.97 0-9 2.24-9 5v8c0 2.76 4.03 5 9 5s9-2.24 9-5V8c0-2.76-4.03-5-9-5z" />
      <path d="M3 8c0 2.76 4.03 5 9 5s9-2.24 9-5" />
      <path d="M3 12c0 2.76 4.03 5 9 5s9-2.24 9-5" />
    </svg>
  );
}

function AWSIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.7 15.6c-2.4 0-4.3-1.1-4.3-3.6 0-2.6 2-3.6 4.3-3.6h2.2v1.5H6.7c-1.4 0-2.6.4-2.6 2 0 1.5 1.1 2.1 2.6 2.1 1.2 0 2.3-.6 2.3-1.8v-1.1h1.7v1.2c0 2.1-1.6 3.3-4 3.3zM15.4 15.6c-2.4 0-4.3-1.1-4.3-3.6 0-2.6 2-3.6 4.3-3.6h2.2v1.5h-2.2c-1.4 0-2.6.4-2.6 2 0 1.5 1.1 2.1 2.6 2.1 1.2 0 2.3-.6 2.3-1.8v-1.1h1.7v1.2c0 2.1-1.6 3.3-4 3.3z" />
      <path d="M2.5 18c4.5 2.5 12.5 2.5 19 0-.3-.4-.7-.9-.9-1.2-5.5 2-12.5 2-16.5 0l-1.6 1.2z" />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.98 11.08h-2.12v-2.1h2.12v2.1zm-2.65 0H9.2v-2.1h2.13v2.1zm5.3 0h-2.12v-2.1h2.12v2.1zm-2.65-2.63h-2.12V6.36h2.12v2.1zm2.65 0h-2.12V6.36h2.12v2.1zm-7.95 2.63H6.55v-2.1h2.13v2.1zm-2.65 0H3.9v-2.1h2.13v2.1zm10.6-5.26h-2.12V3.73h2.12v2.1zm8.38 5.6c-.35-.24-1.2-.72-2.47-.72-.75 0-1.47.16-2.14.45V9.45h-.06c-.84-.52-2.1-.73-3.37-.73v.8c.97 0 1.95.14 2.58.55l.23.15v2.85c0 1.46-.77 2.76-1.95 3.5-2.12 1.34-5.32 1.34-7.44 0-1.18-.74-1.95-2.04-1.95-3.5v-.35l-.36-.05A5.62 5.62 0 0 0 2 13.57C2 17.1 5.8 20 10.5 20c5.3 0 9.77-3.4 10.4-7.96.6-.14 1.7-.5 2.45-1.52.3-.4.4-.76.45-.92h-.01z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function JavaIcon() {
  return (
    <div className="font-mono text-[11px] sm:text-xs font-bold tracking-tighter text-white">Java</div>
  );
}

function GoIcon() {
  return (
    <div className="font-mono text-[11px] sm:text-xs font-bold tracking-tighter text-white">Go</div>
  );
}

function SpringIcon() {
  return (
    <div className="font-mono text-[10px] sm:text-[11px] font-bold tracking-tighter text-[#568f5e]">Spring</div>
  );
}

function FlutterIcon() {
  return (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.314 0L2.3 12 6 15.7 21.7 0h-7.386zM14.314 11.271L9.67 15.914 14.314 20.557h7.386l-4.643-4.643 4.643-4.643h-7.386z" />
    </svg>
  );
}

function RedisIcon() {
  return (
    <div className="font-mono text-[10px] sm:text-[11px] font-bold tracking-tighter text-white">Redis</div>
  );
}

function NextIcon() {
  return (
    <div className="font-mono text-[11px] sm:text-xs font-bold tracking-tighter text-white">Next</div>
  );
}

const toolIcons = [
  { name: "TypeScript", icon: TSIcon },
  { name: "React", icon: ReactIcon },
  { name: "Java", icon: JavaIcon },
  { name: "Go", icon: GoIcon },
  { name: "Python", icon: PythonIcon },
  { name: "Spring Boot", icon: SpringIcon },
  { name: "Flutter", icon: FlutterIcon },
  { name: "Next.js", icon: NextIcon },
  { name: "PostgreSQL", icon: PostgresIcon },
  { name: "Redis", icon: RedisIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "GitHub", icon: GitHubIcon },
];

// Duplicated list for seamless infinite loop sliding
const marqueeTools = [...toolIcons, ...toolIcons];

export default function ApproachAndToolsSection() {
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section className="py-16 md:py-24 border-t border-[#1e1e1e] space-y-12 md:space-y-16">
      
      {/* ROW 1: 03 / MY APPROACH */}
      <div className="space-y-6">
        <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5">
          <span className="text-[#568f5e] font-bold">03 /</span>
          <span className="text-white font-semibold">MY APPROACH</span>
        </h2>

        {/* Unified Container with Dividers */}
        <div className="bg-[#111111] border border-[#202020] rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[#202020] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-xl">
          {approachItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="group p-5 sm:p-6 hover:bg-[#151515] transition-colors duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <IconComponent size={22} className="text-gray-200 group-hover:text-[#568f5e] transition-colors stroke-[1.8]" />

                  <h3 className="text-sm sm:text-base font-mono font-semibold text-white group-hover:text-[#568f5e] transition-colors tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs font-mono text-gray-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#568f5e] group-hover:translate-x-1 transition-transform pt-2">
                  <span>{item.linkText}</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROW 2: TOOLS I USE */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase font-semibold">
            TOOLS I USE
          </h2>
          <span className="text-xs font-mono text-gray-500">
            and many more...
          </span>
        </div>

        {/* Infinite Smooth Sliding Marquee Container */}
        <div className="bg-[#111111] border border-[#202020] p-4 sm:p-5 rounded-xl shadow-xl overflow-hidden relative">
          {/* Subtle Side Fade Overlay Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <motion.div
            className="flex items-center gap-3 sm:gap-4 w-max"
            animate={isPageVisible ? { x: ["0%", "-50%"] } : undefined}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {marqueeTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={`${tool.name}-${idx}`}
                  className="w-12 h-12 sm:w-14 sm:h-14 aspect-square bg-[#161616] border border-[#242424] hover:border-[#568f5e]/60 rounded-xl flex items-center justify-center p-2.5 shrink-0 hover:scale-110 transition-transform duration-200 shadow-sm cursor-pointer"
                  title={tool.name}
                >
                  <Icon />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
