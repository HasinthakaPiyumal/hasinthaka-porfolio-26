"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Save, CheckCircle2, Layers, ExternalLink } from "lucide-react";
import type { PortfolioData, HeroConfig } from "@/lib/data";

export default function AdminHeroPage() {
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
        setToast("Hero Section updated & revalidated!");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <div className="text-xs text-gray-400">Loading Hero Section...</div>;

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
            <Layers className="text-[#568f5e]" size={20} />
            <span>Hero Banner Section</span>
          </h1>
          <p className="text-xs text-gray-400 pt-0.5">Manage your homepage main hero banner & headline content.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/#home"
            target="_blank"
            className="px-3.5 py-2 bg-[#161616] hover:bg-[#202020] border border-[#262626] text-xs text-gray-300 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <span>View Live Hero</span>
            <ExternalLink size={13} />
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-md disabled:opacity-50"
          >
            <Save size={14} />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Live Card Preview */}
        <div className="lg:col-span-5 space-y-2">
          <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Homepage Preview</label>
          <div className="bg-[#e6e2d9] text-[#171717] rounded-2xl p-6 space-y-4 border border-[#333] shadow-2xl relative overflow-hidden">
            <div className="text-xs font-mono tracking-widest text-[#444] font-semibold uppercase">
              {data.hero.eyebrow}
            </div>

            <h2 className="font-bebas text-3xl sm:text-4xl leading-tight uppercase">
              {data.hero.headlineLine1}<br />
              {data.hero.headlineLine2}<br />
              <span className="text-[#568f5e]">{data.hero.headlineAccent}</span>
            </h2>

            <p className="text-xs font-mono text-[#333] leading-relaxed">
              {data.hero.description1}
            </p>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold border-b border-[#171717]">{data.hero.ctaText} →</span>
              <span className="bg-[#121212] text-gray-200 px-2.5 py-1 rounded text-[10px]">
                {data.hero.statusBadgeText}
              </span>
            </div>
          </div>
        </div>

        {/* Editable Form Inputs */}
        <div className="lg:col-span-7 bg-[#101010] border border-[#1e1e1e] rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">Eyebrow Tagline</label>
            <input
              type="text"
              value={data.hero.eyebrow}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, eyebrow: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">Headline Line 1</label>
              <input
                type="text"
                value={data.hero.headlineLine1}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, headlineLine1: e.target.value } })}
                className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#568f5e]"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">Headline Line 2</label>
              <input
                type="text"
                value={data.hero.headlineLine2}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, headlineLine2: e.target.value } })}
                className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#568f5e]"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">Accent Word</label>
              <input
                type="text"
                value={data.hero.headlineAccent}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, headlineAccent: e.target.value } })}
                className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#568f5e]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">Primary Description</label>
            <textarea
              rows={2}
              value={data.hero.description1}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, description1: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#568f5e]"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">Secondary Sub-Description (Optional)</label>
            <input
              type="text"
              value={data.hero.description2 || ""}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, description2: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
              placeholder="e.g. Currently open to meaningful opportunities."
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center justify-between mb-1.5">
              <span>Desktop Background Image Path</span>
              <span className="text-[10px] text-red-400 font-mono bg-red-950/60 border border-red-800/80 px-2 py-0.5 rounded font-semibold">
                🔒 Image Change Disabled
              </span>
            </label>
            <input
              type="text"
              disabled
              readOnly
              value={data.hero.backgroundImage || ""}
              className="w-full bg-[#141414] border border-[#222222] rounded-xl px-3.5 py-2.5 text-xs text-gray-500 font-mono cursor-not-allowed opacity-60"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">CTA Button Text</label>
              <input
                type="text"
                value={data.hero.ctaText}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, ctaText: e.target.value } })}
                className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1.5">Status Pill Badge</label>
              <input
                type="text"
                value={data.hero.statusBadgeText}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, statusBadgeText: e.target.value } })}
                className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
