"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Save, User, CheckCircle2, ExternalLink, Plus, X } from "lucide-react";
import type { PortfolioData } from "@/lib/data";

export default function AdminAboutPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setToast("About Me section updated & revalidated!");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <div className="text-xs text-gray-400">Loading About Me...</div>;

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
            <User className="text-[#568f5e]" size={20} />
            <span>About Me Section</span>
          </h1>
          <p className="text-xs text-gray-400 pt-0.5">Manage your bio narrative, certifications, research stats, and profile image.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-md disabled:opacity-50"
        >
          <Save size={14} />
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Portrait & Narrative */}
        <div className="lg:col-span-7 bg-[#101010] border border-[#1e1e1e] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative rounded-xl border border-[#2a2a2a] bg-[#161616] overflow-hidden shrink-0">
              <Image src={data.about.profileImage || "/images/about-portrait.jpg"} alt="Portrait" fill className="object-cover" unoptimized />
            </div>

            <div className="space-y-1 flex-1">
              <label className="text-[11px] text-gray-400 uppercase font-semibold block">Full Name</label>
              <input
                type="text"
                value={data.about.fullName}
                onChange={(e) => setData({ ...data, about: { ...data.about, fullName: e.target.value } })}
                className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-1.5 text-xs text-white font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Title Badge Text</label>
            <input
              type="text"
              value={data.about.titleBadge}
              onChange={(e) => setData({ ...data, about: { ...data.about, titleBadge: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Subtitle Overview Bio</label>
            <textarea
              rows={3}
              value={data.about.subtitleBio}
              onChange={(e) => setData({ ...data, about: { ...data.about, subtitleBio: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl p-3 text-xs text-white leading-relaxed"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Narrative Paragraph 1</label>
            <textarea
              rows={3}
              value={data.about.narrativeParagraph1}
              onChange={(e) => setData({ ...data, about: { ...data.about, narrativeParagraph1: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl p-3 text-xs text-white leading-relaxed"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Certifications (comma separated)</label>
            <input
              type="text"
              value={data.about.certifications.join(", ")}
              onChange={(e) => setData({ ...data, about: { ...data.about, certifications: e.target.value.split(",").map(c => c.trim()) } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
        </div>

        {/* Right Column: Key Stats & Philosophy */}
        <div className="lg:col-span-5 bg-[#101010] border border-[#1e1e1e] rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Key Stat Counters</h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-semibold">Years Experience</label>
              <input
                type="text"
                value={data.about.yearsExperience}
                onChange={(e) => setData({ ...data, about: { ...data.about, yearsExperience: e.target.value } })}
                className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-white text-center font-bold"
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 uppercase font-semibold">Production Apps</label>
              <input
                type="text"
                value={data.about.productionApps}
                onChange={(e) => setData({ ...data, about: { ...data.about, productionApps: e.target.value } })}
                className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-white text-center font-bold"
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 uppercase font-semibold">arXiv Papers</label>
              <input
                type="text"
                value={data.about.arxivPapers}
                onChange={(e) => setData({ ...data, about: { ...data.about, arxivPapers: e.target.value } })}
                className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-white text-center font-bold"
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 uppercase font-semibold">Award Notice</label>
              <input
                type="text"
                value={data.about.awardNotice}
                onChange={(e) => setData({ ...data, about: { ...data.about, awardNotice: e.target.value } })}
                className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-white text-center font-bold text-[#568f5e]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Signature Quote</label>
            <input
              type="text"
              value={data.about.signatureQuote}
              onChange={(e) => setData({ ...data, about: { ...data.about, signatureQuote: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2 text-xs text-white font-serif italic"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
