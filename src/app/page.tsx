"use client";

import { useEffect, useState } from "react";
import SidebarNav from "@/components/SidebarNav";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import ApproachAndToolsSection from "@/components/ApproachAndToolsSection";
import JournalSection from "@/components/JournalSection";
import AwardsSection from "@/components/AwardsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "experience", "work", "journal", "awards", "about", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of page check -> highlight contact section
      if (window.scrollY + windowHeight >= documentHeight - 50) {
        setActiveSection("contact");
        return;
      }

      // Top of page / Hero section check -> highlight home section
      if (window.scrollY < 150) {
        setActiveSection("home");
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          if (scrollPosition >= absoluteTop) {
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
      <main className="md:ml-60 lg:ml-64">
        {/* Light Warm Beige Hero Section */}
        <HeroSection />

        {/* Dark Charcoal Lower Sections - Solid Background */}
        <div className="relative z-10 bg-[#0f0f0f] px-5 sm:px-10 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
          <ExperienceSection />
          <SelectedWorkSection />
          <ApproachAndToolsSection />
          
          {/* Section 05: RESEARCH & PUBLICATIONS */}
          <div className="py-10 md:py-24 border-t border-[#1e1e1e]" id="journal">
            <JournalSection />
          </div>

          {/* Section 06: HONORS & AWARDS */}
          <AwardsSection />

          {/* Section 07: ABOUT ME */}
          <div className="py-10 md:py-24 border-t border-[#1e1e1e]" id="about">
            <AboutSection />
          </div>

          <ContactSection />
        </div>
      </main>
    </div>
  );
}
