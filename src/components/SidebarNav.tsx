"use client";

import { useState } from "react";
import { MapPin, Sun, Moon, Menu, X } from "lucide-react";

interface SidebarNavProps {
  activeSection: string;
}

const navItems = [
  { id: "home", label: "Home", num: "01" },
  { id: "work", label: "Work", num: "02" },
  { id: "journal", label: "Journal", num: "03" },
  { id: "about", label: "About", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
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
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#222222] px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          className="text-2xl font-bold font-bebas tracking-widest text-white flex items-center gap-1"
        >
          H<span className="text-[#4d7a54]">._</span>
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
                  className={`flex items-center gap-5 text-xl font-mono text-left transition-colors duration-200 ${
                    isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className={`text-xs font-mono ${isActive ? "text-[#4d7a54]" : "text-gray-500"}`}>{item.num}</span>
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#4d7a54] ml-auto shadow-[0_0_8px_#4d7a54]" />}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-[#222222] pt-6 flex flex-col gap-4 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#4d7a54]" />
              <span>Sri Lanka</span>
            </div>
            <div className="bg-[#141414] border border-[#222222] p-4 rounded text-xs font-mono leading-relaxed">
              <div className="text-gray-500">hasinthaka@dev:~</div>
              <div>$ whoami</div>
              <div className="text-[#4d7a54] font-semibold">&gt; builder</div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 lg:w-72 bg-[#0d0d0d] border-r border-[#1e1e1e] flex-col justify-between p-8 lg:p-10 z-40">
        <div>
          {/* Logo */}
          <div className="mb-16">
            <button
              onClick={() => scrollToSection("home")}
              className="text-4xl font-bold font-bebas tracking-widest text-white hover:opacity-90 transition-opacity flex items-center"
            >
              H<span className="text-[#4d7a54]">._</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group flex items-center gap-4 text-sm font-mono text-left transition-all duration-200 ${
                    isActive ? "text-[#4d7a54] font-semibold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className={`text-xs ${isActive ? "text-[#4d7a54] font-bold" : "text-gray-600 group-hover:text-gray-400"}`}>
                    {item.num}
                  </span>
                  <span className="tracking-wide">{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4d7a54] ml-auto shadow-[0_0_6px_#4d7a54]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer / Terminal Widget */}
        <div className="flex flex-col gap-6">
          {/* Mini Terminal Card */}
          <div className="bg-[#141414] border border-[#222222] p-4 rounded text-xs font-mono leading-relaxed text-gray-300 shadow-inner">
            <div className="text-gray-500 mb-1">hasinthaka@dev:~</div>
            <div>$ whoami</div>
            <div className="text-[#4d7a54] font-semibold">&gt; builder</div>
            <span className="inline-block w-1.5 h-3.5 bg-[#4d7a54] animate-pulse ml-1" />
          </div>

          {/* Location & Theme Controls */}
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 border-t border-[#1e1e1e] pt-4">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#4d7a54]" />
              <span>Sri Lanka</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Sun size={14} className="hover:text-white cursor-pointer transition-colors" />
              <Moon size={14} className="text-[#4d7a54] cursor-pointer" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
