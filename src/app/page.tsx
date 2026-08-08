"use client";

import { useEffect, useState } from "react";
import SidebarNav from "@/components/SidebarNav";
import HeroSection from "@/components/HeroSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import ApproachAndToolsSection from "@/components/ApproachAndToolsSection";
import JournalSection from "@/components/JournalSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "work", "journal", "about", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f0f0f0]">
      {/* Permanent Solid Black Desktop Navigation Sidebar & Mobile Header */}
      <SidebarNav activeSection={activeSection} />

      {/* Main Content Area (Offset by desktop sidebar width) */}
      <main className="md:ml-64 lg:ml-72">
        {/* Light Warm Beige Hero Section */}
        <HeroSection />

        {/* Dark Charcoal Lower Sections */}
        <div className="px-6 sm:px-10 md:px-14 lg:px-20 max-w-[1440px] mx-auto">
          <SelectedWorkSection />
          <ApproachAndToolsSection />
          <JournalSection />
          <AboutSection />
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
