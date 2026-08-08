"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToWork = () => {
    const workElem = document.getElementById("work");
    if (workElem) {
      workElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-[680px] overflow-hidden bg-[#e6e2d9]">
      {/* Background Photograph - Spans full hero height, aligned to right */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/hero-desk.png"
          alt="Hasinthaka Workspace"
          fill
          priority
          className="object-cover object-right lg:object-[right_center]"
        />
        {/* Soft subtle gradient overlay on far left for small screens to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#e6e2d9] via-[#e6e2d9]/90 sm:via-[#e6e2d9]/60 to-transparent lg:hidden pointer-events-none" />
      </div>

      {/* Hero Content - Overlaid on the Left Wall */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 flex flex-col justify-center">
        <div className="max-w-[560px] pt-8 md:pt-0">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#444444] font-semibold uppercase mb-5"
          >
            SOFTWARE ENGINEER
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.88] text-[#171717] tracking-tight uppercase mb-5"
          >
            I TURN COMPLEX<br />
            PROBLEMS INTO<br />
            SIMPLE <span className="text-[#4b7a52]">SOLUTIONS.</span>
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="font-mono text-xs sm:text-sm text-[#333333] leading-relaxed max-w-[420px] mb-8 space-y-1 font-medium"
          >
            <p>I build systems, tools and intelligent applications that create real impact.</p>
            <p className="text-[#555555]">Currently open to meaningful opportunities.</p>
          </motion.div>

          {/* CTA Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <button
              onClick={scrollToWork}
              className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono font-semibold text-[#171717] hover:text-[#4b7a52] uppercase tracking-widest transition-colors py-1"
            >
              <span className="border-b border-[#171717] group-hover:border-[#4b7a52] pb-0.5 transition-colors">
                VIEW MY WORK
              </span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200 text-[#171717] group-hover:text-[#4b7a52]" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
