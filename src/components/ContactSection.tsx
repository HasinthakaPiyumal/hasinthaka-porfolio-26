import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

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
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hasinthakapiyumal@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="contact" className="pt-10 pb-8 md:pt-20 md:pb-12 border-t border-[#1e1e1e]">
      
      {/* Header */}
      <h2 className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2.5 mb-5 sm:mb-8">
        <span className="text-[#568f5e] font-bold">08 /</span>
        <span className="text-white font-semibold">LET&apos;S CONNECT</span>
      </h2>

      {/* Main Unified Box Container */}
      <SpotlightCard className="bg-[#111111] border border-[#202020] rounded-xl p-3.5 sm:p-10 shadow-2xl space-y-5 sm:space-y-8 mb-6 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-center">
          
          {/* Left Column: Comfortable Headline & Call to Action (7 cols) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-3xl lg:text-4xl font-mono font-bold text-white tracking-tight leading-snug sm:leading-tight">
              Have an interesting project or just want to connect?{" "}
              <span className="text-[#568f5e] block sm:inline">I&apos;d love to hear from you.</span>
            </h3>

            <p className="text-[11px] sm:text-xs md:text-sm font-mono text-gray-400 leading-relaxed max-w-xl">
              Whether you need backend microservices, applied AI solutions, or full-stack web and mobile development, my inbox is always open.
            </p>

            <div className="pt-1 sm:pt-2">
              <motion.a
                whileTap={{ scale: 0.97 }}
                href="whatsapp://send?phone=94763215389&text=Hello%20Hasinthaka,%20I'd%20like%20to%20connect%20with%20you!"
                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-[#568f5e] hover:bg-[#487a4f] text-white font-mono text-xs font-semibold transition-all shadow-lg hover:shadow-[#568f5e]/20 group cursor-pointer"
              >
                <Send size={14} />
                <span>Send a Message</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </div>

          {/* Right Column: Contact Details Cards & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-3 bg-[#161616] border border-[#242424] p-3.5 sm:p-6 rounded-xl shadow-inner">
            <div className="space-y-2 text-xs font-mono text-gray-300">
              <div
                onClick={handleCopyEmail}
                className="relative flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-[#111111] border border-[#222222] hover:border-[#568f5e]/50 transition-colors group cursor-pointer"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#1d1d1d] flex items-center justify-center text-[#568f5e] group-hover:bg-[#568f5e] group-hover:text-white transition-colors shrink-0">
                  <Mail size={15} />
                </div>
                <div className="flex-1 truncate">
                  <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Email (Click to copy)</span>
                    <AnimatePresence>
                      {copied && (
                        <motion.span
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -3 }}
                          className="text-[#568f5e] font-bold flex items-center gap-1 text-[9px]"
                        >
                          <Check size={10} /> Copied!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="text-gray-200 group-hover:text-white text-xs truncate">hasinthakapiyumal@gmail.com</div>
                </div>
              </div>

              <a
                href="tel:+94763215389"
                className="flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-[#111111] border border-[#222222] hover:border-[#568f5e]/50 transition-colors group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#1d1d1d] flex items-center justify-center text-[#568f5e] group-hover:bg-[#568f5e] group-hover:text-white transition-colors shrink-0">
                  <Phone size={15} />
                </div>
                <div className="flex-1">
                  <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Phone</div>
                  <div className="text-gray-200 group-hover:text-white text-xs">+94 76 321 5389</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-[#111111] border border-[#222222]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#1d1d1d] flex items-center justify-center text-[#568f5e] shrink-0">
                  <MapPin size={15} />
                </div>
                <div className="flex-1">
                  <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Location</div>
                  <div className="text-gray-200 text-xs">Colombo, Sri Lanka</div>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="pt-2.5 border-t border-[#222222] space-y-2">
              <div className="text-[9px] sm:text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
                FIND ME ONLINE
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/HasinthakaPiyumal"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 bg-[#111111] border border-[#222222] hover:border-[#568f5e]/50 text-gray-300 hover:text-white rounded-md text-xs font-mono transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/hasinthaka-piyumal"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 bg-[#111111] border border-[#222222] hover:border-[#568f5e]/50 text-gray-300 hover:text-white rounded-md text-xs font-mono transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </SpotlightCard>

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
