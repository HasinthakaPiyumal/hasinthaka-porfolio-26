"use client";

import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TwitterIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="pt-24 pb-16 border-t border-[#1e1e1e]">
      
      {/* Header */}
      <h2 className="text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5 mb-12">
        <span className="text-[#4d7a54] font-bold">06 /</span>
        <span className="text-white font-semibold">LET&apos;S CONNECT</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 mb-24">
        
        {/* Left Column - Large Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          <h3 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-wider text-white uppercase">
            INTERESTING PROJECT OR JUST WANT TO SAY HELLO?{" "}
            <span className="text-[#4d7a54]">I&apos;D LOVE TO HEAR FROM YOU.</span>
          </h3>
        </motion.div>

        {/* Right Column - Contact Info & CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 space-y-10 flex flex-col justify-center"
        >
          {/* Contact Details List */}
          <div className="space-y-4 text-sm sm:text-base font-mono text-gray-300">
            <div className="flex items-center gap-3.5">
              <Mail size={18} className="text-[#4d7a54]" />
              <a href="mailto:hasinthaka@example.com" className="hover:text-white transition-colors">
                hasinthaka@example.com
              </a>
            </div>

            <div className="flex items-center gap-3.5">
              <Phone size={18} className="text-[#4d7a54]" />
              <a href="tel:+94712345678" className="hover:text-white transition-colors">
                +94 71 234 5678
              </a>
            </div>

            <div className="flex items-center gap-3.5">
              <MapPin size={18} className="text-[#4d7a54]" />
              <span>Sri Lanka</span>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div>
            <a
              href="mailto:hasinthaka@example.com"
              className="group inline-flex items-center gap-3.5 bg-[#161616] hover:bg-[#4d7a54] text-white hover:text-white border border-[#2a2a2a] hover:border-[#4d7a54] px-8 py-4 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-xl"
            >
              <span>Send me a message</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-200" />
            </a>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-[#222222] space-y-4">
            <div className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-widest">
              FIND ME ONLINE
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <a
                href="https://github.com/HasinthakaPiyumal"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#4d7a54] transition-colors p-3 bg-[#161616] border border-[#262626] hover:border-[#383838] rounded-lg shadow-sm"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#4d7a54] transition-colors p-3 bg-[#161616] border border-[#262626] hover:border-[#383838] rounded-lg shadow-sm"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#4d7a54] transition-colors p-3 bg-[#161616] border border-[#262626] hover:border-[#383838] rounded-lg shadow-sm"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:hasinthaka@example.com"
                className="hover:text-[#4d7a54] transition-colors p-3 bg-[#161616] border border-[#262626] hover:border-[#383838] rounded-lg shadow-sm"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

        </motion.div>

      </div>

      {/* Footer Line */}
      <div className="border-t border-[#1e1e1e] pt-10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
        <div>
          &copy; 2026 Hasinthaka.dev
        </div>
        <div className="flex items-center gap-1.5">
          <span>Crafted with code and curiosity.</span>
          <span className="text-[#4d7a54] font-bold">&lt;/&gt;</span>
        </div>
      </div>

    </section>
  );
}
