"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-[#1e1e1e]">
      
      {/* Header */}
      <h2 className="text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5 mb-14">
        <span className="text-[#4d7a54] font-bold">05 /</span>
        <span className="text-white font-semibold">ABOUT ME</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column - Large Developer Portrait (45% width) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-5 relative"
        >
          <div className="aspect-square relative rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#141414] shadow-2xl">
            <Image
              src="/images/about-portrait.jpg"
              alt="Hasinthaka Portrait"
              fill
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>

        {/* Right Column - Bio Text & Handwritten Green Quote (55% width) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-7 space-y-8"
        >
          <div className="space-y-5 text-base sm:text-lg font-mono text-gray-300 leading-relaxed">
            <p>
              Final year Software Engineering undergraduate who loves building products that make a difference. I enjoy working with modern technologies and solving complex problems.
            </p>
            <p className="text-gray-400">
              When I&apos;m not coding, you&apos;ll find me reading, playing volleyball or exploring new ideas.
            </p>
          </div>

          {/* Handwritten Green Accent Quote & Signature */}
          <div className="pt-8 border-t border-[#222222] space-y-2">
            <div className="font-handwritten text-3xl sm:text-4xl md:text-5xl text-[#4d7a54] font-bold tracking-wide">
              Let&apos;s build something impactful.
            </div>
            <div className="font-handwritten text-xl sm:text-2xl text-gray-400 font-semibold">
              – Hasinthaka
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
