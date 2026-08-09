"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const { scrollY } = useScroll();

  // Desktop Scroll-driven animations
  const filter = useTransform(scrollY, [0, 300], ["grayscale(0%)", "grayscale(50%)"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.9]);
  const scale = useTransform(scrollY, [0, 400], [1, 1]);

  const scrollToWork = () => {
    const workElem = document.getElementById("work");
    if (workElem) {
      workElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-[680px] overflow-hidden bg-[#e6e2d9]">
      {/* Background Photograph */}
      <motion.div
        style={{ filter, opacity, scale, transformOrigin: "top left" }}
        className="fixed top-0 right-0 w-full md:w-[calc(100%-15rem)] lg:w-[calc(100%-16rem)] h-screen z-0 pointer-events-none origin-top-left"
      >
        {/* Desktop Background Image */}
        <Image
          src="/images/84c0cdca-1d5e-4613-b846-504afd8f5221.webp"
          alt="Hasinthaka Workspace"
          fill
          priority
          className="hidden md:block object-cover object-right lg:object-[right_center]"
        />
        {/* Mobile Background Image */}
        <Image
          src="/images/hero-mobile.webp"
          alt="Hasinthaka Workspace Mobile"
          fill
          priority
          className="block md:hidden object-cover object-bottom sm:object-center"
        />
        {/* Soft subtle gradient overlay on left for text readability */}
        <div className="absolute flex xl:hidden inset-0 bg-linear-to-b sm:bg-linear-to-r from-[#e6e2d9]/80 via-[#e6e2d9]/50 sm:via-[#e6e2d9]/50 to-transparent pointer-events-none" />
      </motion.div>

      {/* Hero Content Overlay - Single Unified Tree */}
      <div className="relative z-10 h-full max-w-[1440px] mt-20 md:mt-0 mx-auto px-5 sm:px-12 md:px-16 lg:px-20 pb-16 md:pb-20 flex flex-col justify-between md:justify-center">
        <div className="max-w-[560px] pt-20 md:pt-0">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xs sm:text-sm text-center sm:text-left font-mono tracking-[0.2em] text-[#444444] font-semibold uppercase mb-4 md:mb-5"
          >
            SOFTWARE ENGINEER & RESEARCHER
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-bebas text-center sm:text-left text-4xl sm:text-5xl md:text-6xl lg:text-[78px] leading-[0.88] text-[#171717] tracking-tight uppercase mb-4 md:mb-5"
          >
            I TURN COMPLEX<br />
            PROBLEMS INTO<br />
            SIMPLE <span className="text-[#568f5e]">SOLUTIONS.</span>
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="font-mono text-center sm:text-left text-md sm:text-sm text-[#333333] leading-relaxed max-w-[450px] mb-6 md:mb-8 space-y-1 font-medium"
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
              className="group inline-flex items-center justify-center w-full sm:w-auto gap-2.5 text-xs sm:text-sm font-mono font-semibold text-[#171717] hover:text-[#568f5e] uppercase tracking-widest transition-colors py-1"
            >
              <span className="border-b border-[#171717] group-hover:border-[#568f5e] pb-0.5 transition-colors">
                VIEW MY WORK
              </span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200 text-[#171717] group-hover:text-[#568f5e]" />
            </button>
          </motion.div>

        </div>

        {/* Status Pill Badge */}
        <div className="absolute bottom-24 right-8 md:absolute md:bottom-8 md:right-8 z-20 flex items-center gap-2.5 bg-[#121212]/90 backdrop-blur-md border border-[#2a2a2a] px-4 py-2 rounded-md shadow-2xl w-fit mb-4 md:mb-0">
          <span className="text-[11px] font-mono tracking-widest text-gray-300 font-semibold uppercase">
            STATUS: Building
          </span>
          <span className="w-2 h-2 rounded-full bg-[#568f5e] animate-pulse" />
        </div>
      </div>
    </section>
  );
}
