"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Reorder } from "framer-motion";
import { Save, Plus, Trash2, Edit3, CheckCircle2, Briefcase, Upload, Image as ImageIcon, ArrowUp, ArrowDown, GripVertical } from "lucide-react";
import type { PortfolioData, ExperienceItem } from "@/lib/data";
import { TechSearchSelect } from "@/components/TechSearchSelect";

const PRESET_LOGOS = [
  { name: "WSO2", path: "/images/experience/wso2.png" },
  { name: "Freelancer", path: "/images/experience/freelancer.png" },
  { name: "Zenlise", path: "/images/experience/zenlise.png" },
];

export default function AdminExperiencePage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [editingExp, setEditingExp] = useState<{ index: number | null; exp: ExperienceItem } | null>(null);

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
        setToast("Experience history updated & revalidated!");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = (newExperiences: ExperienceItem[]) => {
    if (!data) return;
    handleSaveData({ ...data, experiences: newExperiences });
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (!data) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= data.experiences.length) return;

    const newExperiences = [...data.experiences];
    const [moved] = newExperiences.splice(index, 1);
    newExperiences.splice(targetIdx, 0, moved);

    handleReorder(newExperiences);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingExp) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok && result.url) {
        setEditingExp({
          ...editingExp,
          exp: { ...editingExp.exp, logo: result.url },
        });
        setToast("Logo uploaded successfully!");
        setTimeout(() => setToast(null), 3000);
      } else {
        alert(result.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  if (!data) return <div className="text-xs text-gray-400 p-4">Loading Experience...</div>;

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
            <Briefcase className="text-[#568f5e]" size={20} />
            <span>Experience History</span>
          </h1>
          <p className="text-xs text-gray-400 pt-0.5">
            Drag items up or down to reorder, set company logos, periods & tech tags.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingExp({
              index: null,
              exp: {
                role: "",
                company: "",
                period: `${new Date().getFullYear()} - Present`,
                description: "",
                tags: ["React", "Node.js"],
                logo: "/images/experience/freelancer.png",
              },
            })
          }
          className="px-4 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
        >
          <Plus size={15} />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience List Cards with Framer Motion Reorder */}
      <Reorder.Group
        axis="y"
        values={data.experiences}
        onReorder={handleReorder}
        className="space-y-3.5"
      >
        {data.experiences.map((exp, idx) => (
          <Reorder.Item
            key={exp.company + exp.role + idx}
            value={exp}
            className="p-5 bg-[#101010] border border-[#1e1e1e] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#333] transition-colors cursor-grab active:cursor-grabbing shadow-xl select-none"
          >
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-2 rounded-xl bg-[#161616] border border-[#262626] text-gray-400 hover:text-white flex items-center justify-center cursor-grab active:cursor-grabbing">
                <GripVertical size={16} />
              </div>

              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-0.5 text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === data.experiences.length - 1}
                  className="p-0.5 text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={12} />
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 relative rounded-xl border border-[#262626] bg-[#161616] flex items-center justify-center shrink-0 overflow-hidden">
                <Image src={exp.logo || "/images/experience/freelancer.png"} alt={exp.company} width={40} height={40} className="object-contain p-1" unoptimized />
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1c1c1c] border border-[#282828] text-gray-300">
                    @ {exp.company}
                  </span>
                  <span className="text-[10px] text-[#568f5e] font-mono font-semibold bg-[#18281b] px-2.5 py-0.5 rounded-md border border-[#2a452d]">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.tags.map((t) => (
                    <span key={t} className="text-[10px] text-gray-400 bg-[#161616] border border-[#242424] px-2 py-0.5 rounded font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => setEditingExp({ index: idx, exp: { ...exp } })}
                className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#242424] text-xs text-gray-300 hover:text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Edit3 size={13} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (!confirm("Delete experience entry?")) return;
                  const newExp = data.experiences.filter((_, i) => i !== idx);
                  handleSaveData({ ...data, experiences: newExp });
                }}
                className="p-1.5 bg-[#1a1a1a] hover:bg-red-950 text-gray-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* FULL SCREEN EDIT / CREATE EXPERIENCE MODAL */}
      {editingExp && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col w-screen h-screen overflow-hidden animate-in fade-in duration-200">
          {/* Top Sticky Header */}
          <div className="bg-[#121212] border-b border-[#222222] px-6 py-4 flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1b2b1d] border border-[#345237] text-[#69ab73] flex items-center justify-center">
                <Briefcase size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingExp.index !== null ? `Edit Experience: ${editingExp.exp.role} @ ${editingExp.exp.company}` : "Add Experience Entry"}
                </h3>
                <p className="text-[11px] text-gray-400">Configure role title, company logo, tenure period, description, and technologies used.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditingExp(null)}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#282828] text-xs text-gray-300 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newExp = [...data.experiences];
                  if (editingExp.index !== null) {
                    newExp[editingExp.index] = editingExp.exp;
                  } else {
                    newExp.unshift(editingExp.exp);
                  }
                  handleSaveData({ ...data, experiences: newExp });
                  setEditingExp(null);
                }}
                className="px-6 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-xs text-white font-semibold rounded-xl cursor-pointer shadow-lg flex items-center gap-1.5 transition-all"
              >
                <Save size={15} />
                <span>Save Experience</span>
              </button>
            </div>
          </div>

          {/* Full Screen Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-12 custom-scrollbar bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto space-y-8 pb-16">
              {/* Role & Tenure Details */}
              <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 space-y-6 shadow-xl">
                <h4 className="text-xs font-bold text-[#568f5e] uppercase tracking-wider">1. Role & Employment Details</h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Role Title</label>
                    <input
                      type="text"
                      value={editingExp.exp.role}
                      onChange={(e) => setEditingExp({ ...editingExp, exp: { ...editingExp.exp, role: e.target.value } })}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={editingExp.exp.company}
                      onChange={(e) => setEditingExp({ ...editingExp, exp: { ...editingExp.exp, company: e.target.value } })}
                      placeholder="e.g. WSO2 / Zenlise / Freelance"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Tenure Period</label>
                    <input
                      type="text"
                      value={editingExp.exp.period}
                      onChange={(e) => setEditingExp({ ...editingExp, exp: { ...editingExp.exp, period: e.target.value } })}
                      placeholder="e.g. 2024 - Present"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Role Description & Accomplishments</label>
                  <textarea
                    rows={4}
                    value={editingExp.exp.description}
                    onChange={(e) => setEditingExp({ ...editingExp, exp: { ...editingExp.exp, description: e.target.value } })}
                    placeholder="Describe core responsibilities, team impact, and technical accomplishments..."
                    className="w-full bg-[#181818] border border-[#282828] rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#568f5e] leading-relaxed"
                  />
                </div>
              </div>

              {/* Company Logo Picker */}
              <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 space-y-4 shadow-xl">
                <h4 className="text-xs font-bold text-[#568f5e] uppercase tracking-wider">2. Company Brand Logo</h4>
                <div className="space-y-3 p-4 bg-[#181818] border border-[#282828] rounded-xl">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] text-gray-400 uppercase font-semibold flex items-center gap-1.5">
                      <ImageIcon size={14} className="text-[#568f5e]" />
                      <span>Company Logo Icon</span>
                    </label>
                    {uploading && <span className="text-[#568f5e] font-mono text-xs animate-pulse">Uploading file...</span>}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#121212] border border-[#2c2c2c] rounded-xl flex items-center justify-center p-2 shrink-0 overflow-hidden relative">
                      <Image
                        src={editingExp.exp.logo || "/images/experience/freelancer.png"}
                        alt="Logo preview"
                        width={44}
                        height={44}
                        className="object-contain"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={editingExp.exp.logo || ""}
                        onChange={(e) => setEditingExp({ ...editingExp, exp: { ...editingExp.exp, logo: e.target.value } })}
                        placeholder="/images/experience/logo.png"
                        className="w-full bg-[#121212] border border-[#262626] rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                      />

                      <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1e2f20] hover:bg-[#283e2b] border border-[#3b5d3f] text-[#69ab73] text-xs font-semibold rounded-xl cursor-pointer transition-colors">
                        <Upload size={13} />
                        <span>Upload Logo Image</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#242424]">
                    <span className="text-[10px] text-gray-500 font-mono block mb-2">Preset Quick Select Logos:</span>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_LOGOS.map((preset) => (
                        <button
                          key={preset.path}
                          type="button"
                          onClick={() =>
                            setEditingExp({
                              ...editingExp,
                              exp: { ...editingExp.exp, logo: preset.path },
                            })
                          }
                          className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer ${
                            editingExp.exp.logo === preset.path
                              ? "bg-[#568f5e] border-[#568f5e] text-white font-semibold"
                              : "bg-[#121212] border-[#262626] text-gray-400 hover:text-white"
                          }`}
                        >
                          <Image src={preset.path} alt={preset.name} width={16} height={16} className="object-contain" unoptimized />
                          <span>{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies Section */}
              <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 space-y-4 shadow-xl">
                <h4 className="text-xs font-bold text-[#568f5e] uppercase tracking-wider">3. Technologies Used & Tech Search Select</h4>
                <TechSearchSelect
                  selected={editingExp.exp.tags}
                  onChange={(newTags) =>
                    setEditingExp({
                      ...editingExp,
                      exp: { ...editingExp.exp, tags: newTags },
                    })
                  }
                  placeholder="Search and select technologies for this role..."
                />
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions Bar */}
          <div className="bg-[#121212] border-t border-[#222222] px-6 py-4 flex items-center justify-between shrink-0">
            <span className="text-xs text-gray-400">Full screen experience editing mode</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditingExp(null)}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#282828] text-xs text-gray-300 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newExp = [...data.experiences];
                  if (editingExp.index !== null) {
                    newExp[editingExp.index] = editingExp.exp;
                  } else {
                    newExp.unshift(editingExp.exp);
                  }
                  handleSaveData({ ...data, experiences: newExp });
                  setEditingExp(null);
                }}
                className="px-6 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-xs text-white font-semibold rounded-xl cursor-pointer shadow-lg flex items-center gap-1.5 transition-all"
              >
                <Save size={15} />
                <span>Save Experience</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
