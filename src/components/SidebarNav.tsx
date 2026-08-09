"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarNavProps {
  activeSection: string;
}

const navItems = [
  { id: "home", label: "Home", num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "work", label: "Work", num: "03" },
  { id: "journal", label: "Journal", num: "04" },
  { id: "awards", label: "Awards", num: "05" },
  { id: "about", label: "About", num: "06" },
  { id: "contact", label: "Contact", num: "07" },
];

export default function SidebarNav({ activeSection }: SidebarNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Top Sticky Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#222222] px-5 py-3.5 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          className="text-2xl font-bold font-bebas tracking-widest text-white flex items-center gap-0.5"
        >
          H<span className="text-[#568f5e]">._</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-300 hover:text-white p-1 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#0d0d0d]/98 pt-24 px-8 flex flex-col justify-between pb-12">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center gap-5 text-xl font-mono text-left transition-colors duration-200 ${
                    isActive ? "text-[#568f5e] font-semibold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="text-xs font-mono text-gray-500">{item.num}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="mobileNavActiveDot"
                      className="w-2 h-2 rounded-full bg-[#568f5e] ml-auto shadow-[0_0_8px_#568f5e]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-[#222222] pt-6 flex flex-col gap-4 text-xs font-mono text-gray-400">
            <div className="bg-[#141414] border border-[#222222] p-4 rounded text-xs font-mono leading-relaxed">
              <div className="text-gray-500">hasinthaka@dev:~</div>
              <div>$ whoami</div>
              <div className="text-[#568f5e] font-semibold">&gt; builder</div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-60 lg:w-64 bg-[#0a0a0a] border-r border-[#1a1a1a] flex-col justify-between p-7 lg:p-8 z-40">
        <div>
          {/* Logo */}
          <div className="mb-14">
            <button
              onClick={() => scrollToSection("home")}
              className="text-4xl font-bold font-bebas tracking-widest text-white hover:opacity-90 transition-opacity flex items-center gap-0.5"
            >
              H<span className="text-[#568f5e]">._</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-5 relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative flex items-center gap-4 text-sm font-mono text-left transition-all duration-200 py-0.5 ${
                    isActive ? "text-[#568f5e] font-semibold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className={`text-xs ${isActive ? "text-gray-400 font-normal" : "text-gray-600 group-hover:text-gray-400"}`}>
                    {item.num}
                  </span>
                  <span className="tracking-wide">{item.label}</span>
                  
                  {isActive && (
                    <>
                      <motion.span
                        layoutId="desktopNavDot"
                        className="w-1.5 h-1.5 rounded-full bg-[#568f5e] ml-auto shadow-[0_0_6px_#568f5e]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                      {/* Razor-thin right edge active bar */}
                      <motion.span
                        layoutId="desktopNavActiveIndicator"
                        className="absolute -right-7 lg:-right-8 top-0 bottom-0 w-[2px] bg-[#568f5e] shadow-[0_0_10px_#568f5e]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer / Terminal Widget */}
        <div className="flex flex-col gap-5">
          {/* Mini Terminal Card */}
          <div className="bg-[#121212] border border-[#202020] p-4 rounded-md text-xs font-mono leading-relaxed text-gray-300">
            <div className="text-gray-500 mb-1">hasinthakapiyumal@dev:~</div>
            <div>$ whoami</div>
            <div className="flex items-center gap-1">
              <span className="text-gray-300">&gt; software_engineer</span>
              <span className="inline-block w-2 h-4 bg-white animate-pulse" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
