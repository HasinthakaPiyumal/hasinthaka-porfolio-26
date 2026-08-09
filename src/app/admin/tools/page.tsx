"use client";

import { useState, useEffect } from "react";
import { Save, Wrench, CheckCircle2, Layers, Check } from "lucide-react";
import type { PortfolioData, TechCategory } from "@/lib/data";
import { PREDEFINED_TECH_LIST, getTechItem } from "@/components/TechIcons";
import { TechSearchSelect } from "@/components/TechSearchSelect";

export default function AdminToolsPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Selected tool names list
  const [activeTools, setActiveTools] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((d: PortfolioData) => {
        setData(d);
        if (d && d.approachAndTools && d.approachAndTools.techCategories) {
          const flat = d.approachAndTools.techCategories.flatMap((c) => c.tools).filter(Boolean);
          setActiveTools(Array.from(new Set(flat)));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleToggleTool = (toolName: string) => {
    if (activeTools.includes(toolName)) {
      setActiveTools(activeTools.filter((t) => t !== toolName));
    } else {
      setActiveTools([...activeTools, toolName]);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);

    // Group activeTools by category for schema compatibility
    const categoriesMap: Record<string, string[]> = {
      "Languages": [],
      "Frameworks & Web": [],
      "Cloud & Databases": [],
      "AI & Data Tools": [],
      "DevOps & Tools": [],
    };

    activeTools.forEach((toolName) => {
      const item = getTechItem(toolName);
      const cat = item.category || "DevOps & Tools";
      if (!categoriesMap[cat]) categoriesMap[cat] = [];
      if (!categoriesMap[cat].includes(toolName)) {
        categoriesMap[cat].push(toolName);
      }
    });

    const updatedTechCategories: TechCategory[] = Object.entries(categoriesMap)
      .filter(([_, tools]) => tools.length > 0)
      .map(([title, tools]) => ({ title, tools }));

    const updatedData: PortfolioData = {
      ...data,
      approachAndTools: {
        ...data.approachAndTools,
        techCategories: updatedTechCategories,
      },
    };

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setData(updatedData);
        setToast("Tech Stack updated & revalidated with authentic icons!");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <div className="text-xs text-gray-400 p-4">Loading Tech Stack Registry...</div>;

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-[#142317] border border-[#568f5e] text-[#69ab73] text-xs rounded-xl shadow-2xl flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#1c1c1c] pb-5">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Wrench className="text-[#568f5e]" size={20} />
            <span>Technologies & Tools Manager</span>
          </h1>
          <p className="text-xs text-gray-400 pt-0.5">
            Search, select, and manage technologies with authentic brand colored icons.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 bg-[#568f5e] hover:bg-[#487a4f] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg disabled:opacity-50"
        >
          <Save size={15} />
          <span>{saving ? "Saving Stack..." : "Save Active Stack"}</span>
        </button>
      </div>

      {/* Search & Select Technologies Section (React-Select Style) */}
      <div className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-[#568f5e]" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Search & Select Portfolio Technologies ({activeTools.length} Selected)
            </h2>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">React Search Select</span>
        </div>

        <p className="text-xs text-gray-400">
          Type or click below to search, filter, and add technologies to your portfolio stack.
        </p>

        {/* React Search Select Box Component */}
        <TechSearchSelect
          selected={activeTools}
          onChange={(newTools) => setActiveTools(newTools)}
          placeholder="Search tech (e.g. React, Python, Go, Docker, TensorFlow)..."
        />
      </div>

      {/* Predefined Quick Choice Interactive Grid */}
      <div className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 space-y-4 shadow-xl">
        <div>
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">Quick Select Catalog</h2>
          <p className="text-[11px] text-gray-400">Click any technology chip below to toggle inclusion in your portfolio stack.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-1">
          {PREDEFINED_TECH_LIST.map((tech) => {
            const isSelected = activeTools.includes(tech.name) || activeTools.includes(tech.id);
            const IconComp = tech.icon;

            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => handleToggleTool(tech.name)}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-2.5 transition-all cursor-pointer relative group ${
                  isSelected
                    ? "bg-[#142317] border-[#568f5e] text-white shadow-md"
                    : "bg-[#141414] border-[#222222] hover:border-[#383838] text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="p-1.5 rounded-xl bg-[#1a1a1a] border border-[#282828] shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold font-mono truncate">{tech.name}</div>
                    <div className="text-[9px] text-gray-500 font-mono truncate">{tech.category}</div>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                    isSelected ? "bg-[#568f5e] border-[#568f5e] text-white" : "border-[#333333] text-transparent group-hover:border-gray-500"
                  }`}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Architecture Pillars Section */}
      <div className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 space-y-4 shadow-xl">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">
          System Architecture Pillars (4 Cards)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.approachAndTools.pillars.map((pillar, idx) => (
            <div key={idx} className="bg-[#141414] border border-[#202020] rounded-xl p-4 space-y-2">
              <input
                type="text"
                value={pillar.title}
                onChange={(e) => {
                  const newPillars = [...data.approachAndTools.pillars];
                  newPillars[idx].title = e.target.value;
                  setData({ ...data, approachAndTools: { ...data.approachAndTools, pillars: newPillars } });
                }}
                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3 py-1.5 text-xs text-white font-bold"
              />
              <textarea
                rows={2}
                value={pillar.description}
                onChange={(e) => {
                  const newPillars = [...data.approachAndTools.pillars];
                  newPillars[idx].description = e.target.value;
                  setData({ ...data, approachAndTools: { ...data.approachAndTools, pillars: newPillars } });
                }}
                className="w-full bg-[#181818] border border-[#262626] rounded-xl p-2.5 text-xs text-gray-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
