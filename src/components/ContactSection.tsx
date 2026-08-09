"use client";

import { Mail, Phone, MapPin, ArrowRight, Send } from "lucide-react";

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

export default function ContactSection() {
  return (
    <section id="contact" className="pt-20 pb-12 border-t border-[#1e1e1e]">
      
      {/* Header */}
      <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5 mb-8">
        <span className="text-[#568f5e] font-bold">08 /</span>
        <span className="text-white font-semibold">LET&apos;S CONNECT</span>
      </h2>

      {/* Main Unified Box Container */}
      <div className="bg-[#111111] border border-[#202020] rounded-xl p-6 sm:p-10 shadow-2xl space-y-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Comfortable Headline & Call to Action (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-white tracking-tight leading-tight">
              Have an interesting project or just want to connect?{" "}
              <span className="text-[#568f5e] block sm:inline">I&apos;d love to hear from you.</span>
            </h3>

            <p className="text-xs sm:text-sm font-mono text-gray-400 leading-relaxed max-w-xl">
              Whether you need backend microservices, applied AI solutions, or full-stack web and mobile development, my inbox is always open.
            </p>

            <div className="pt-2">
              <a
                href="mailto:hasinthakapiyumal@gmail.com"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#568f5e] hover:bg-[#487a4f] text-white font-mono text-xs font-semibold transition-all shadow-lg hover:shadow-[#568f5e]/20 group"
              >
                <Send size={15} />
                <span>Send a Message</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Details Cards & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-4 bg-[#161616] border border-[#242424] p-5 sm:p-6 rounded-xl shadow-inner">
            <div className="space-y-3 text-xs font-mono text-gray-300">
              <a
                href="mailto:hasinthakapiyumal@gmail.com"
                className="flex items-center gap-3.5 p-3 rounded-lg bg-[#111111] border border-[#222222] hover:border-[#568f5e]/50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-md bg-[#1d1d1d] flex items-center justify-center text-[#568f5e] group-hover:bg-[#568f5e] group-hover:text-white transition-colors shrink-0">
                  <Mail size={16} />
                </div>
                <div className="flex-1 truncate">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Email</div>
                  <div className="text-gray-200 group-hover:text-white truncate">hasinthakapiyumal@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+94763215389"
                className="flex items-center gap-3.5 p-3 rounded-lg bg-[#111111] border border-[#222222] hover:border-[#568f5e]/50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-md bg-[#1d1d1d] flex items-center justify-center text-[#568f5e] group-hover:bg-[#568f5e] group-hover:text-white transition-colors shrink-0">
                  <Phone size={16} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Phone</div>
                  <div className="text-gray-200 group-hover:text-white">+94 76 321 5389</div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3 rounded-lg bg-[#111111] border border-[#222222]">
                <div className="w-8 h-8 rounded-md bg-[#1d1d1d] flex items-center justify-center text-[#568f5e] shrink-0">
                  <MapPin size={16} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Location</div>
                  <div className="text-gray-200">Colombo, Sri Lanka</div>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="pt-3 border-t border-[#222222] space-y-2.5">
              <div className="text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
                FIND ME ONLINE
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/HasinthakaPiyumal"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#111111] border border-[#222222] hover:border-[#568f5e]/50 text-gray-300 hover:text-white rounded-md text-xs font-mono transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/hasinthaka-piyumal"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#111111] border border-[#222222] hover:border-[#568f5e]/50 text-gray-300 hover:text-white rounded-md text-xs font-mono transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Line */}
      <div className="border-t border-[#1e1e1e] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
        <div>
          &copy; 2026 Hasinthaka Piyumal
        </div>
        <div className="flex items-center gap-1.5">
          <span>Crafted with code and curiosity.</span>
          <span className="text-[#568f5e] font-bold">&lt;/&gt;</span>
        </div>
      </div>

    </section>
  );
}
