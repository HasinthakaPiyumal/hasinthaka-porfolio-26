"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Save, Sparkles, CheckCircle2, Plus, Trash2 } from "lucide-react";
import type { PortfolioData } from "@/lib/data";

export default function AdminFeaturedPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error(err));
  }, []);

  const handleSaveData = async (newData: PortfolioData) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (res.ok) {
        setData(newData);
        setToast("Featured projects selection updated & revalidated!");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleFeatured = (index: number) => {
    if (!data) return;
    const newP = [...data.projects];
    newP[index].featured = !newP[index].featured;
    handleSaveData({ ...data, projects: newP });
  };

  if (!data) return <div className="text-xs text-gray-400">Loading Featured Projects...</div>;

  const featuredProjects = data.projects.filter((p) => p.featured);

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
            <Sparkles className="text-[#568f5e]" size={20} />
            <span>Featured Homepage Projects</span>
          </h1>
          <p className="text-xs text-gray-400 pt-0.5">Select which top projects display in the main Selected Work section on the homepage.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Currently Featured ({featuredProjects.length})</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProjects.map((proj, idx) => (
            <div key={idx} className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-3.5 space-y-2 relative group hover:border-[#568f5e]/50 transition-colors">
              <div className="w-full aspect-video relative rounded-xl overflow-hidden border border-[#222]">
                <Image src={proj.images[0] || "/images/projects/zenlise.jpg"} alt={proj.title} fill className="object-cover" unoptimized />
              </div>
              <div>
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-xs font-bold text-white truncate">{proj.title}</h3>
                  <span className="text-[10px] text-[#568f5e] font-mono font-bold">{proj.num}</span>
                </div>
                <p className="text-[10px] text-gray-500 truncate">{proj.category}</p>
              </div>

              <button
                onClick={() => {
                  const originalIdx = data.projects.findIndex(p => p.num === proj.num);
                  if (originalIdx !== -1) toggleFeatured(originalIdx);
                }}
                className="w-full py-1.5 bg-[#181818] hover:bg-red-950 text-gray-300 hover:text-red-300 border border-[#282828] text-[11px] rounded-lg transition-colors cursor-pointer"
              >
                Remove from Featured
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* All Projects Selection Table */}
      <div className="space-y-4 pt-4 border-t border-[#1c1c1c]">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">All Projects (Click to Toggle Featured)</h2>

        <div className="space-y-2">
          {data.projects.map((proj, idx) => (
            <div key={idx} className="p-3.5 bg-[#101010] border border-[#1e1e1e] rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-mono font-bold text-[#568f5e]">{proj.num}</span>
                <span className="text-xs font-bold text-white truncate">{proj.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#1a1a1a] text-gray-400 border border-[#242424]">{proj.category}</span>
              </div>

              <button
                onClick={() => toggleFeatured(idx)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  proj.featured 
                    ? "bg-[#18281b] border border-[#2e4732] text-[#69ab73]" 
                    : "bg-[#181818] border border-[#262626] text-gray-400 hover:text-white"
                }`}
              >
                {proj.featured ? "Featured ✓" : "+ Feature This"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
