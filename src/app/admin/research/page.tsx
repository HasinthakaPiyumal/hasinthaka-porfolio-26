"use client";

import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { Save, Plus, Trash2, Edit3, CheckCircle2, FileCode2, ExternalLink, Award, ArrowUp, ArrowDown, GripVertical } from "lucide-react";
import type { PortfolioData, ResearchItem } from "@/lib/data";

export default function AdminResearchPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [editingResearch, setEditingResearch] = useState<{ index: number | null; item: ResearchItem } | null>(null);

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
        setToast("Research papers updated & revalidated!");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = (newResearch: ResearchItem[]) => {
    if (!data) return;
    handleSaveData({ ...data, research: newResearch });
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (!data) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= data.research.length) return;

    const newResearch = [...data.research];
    const [moved] = newResearch.splice(index, 1);
    newResearch.splice(targetIdx, 0, moved);

    handleReorder(newResearch);
  };

  if (!data) return <div className="text-xs text-gray-400 p-4">Loading Research...</div>;

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
            <FileCode2 className="text-[#568f5e]" size={20} />
            <span>Research & Publications</span>
          </h1>
          <p className="text-xs text-gray-400 pt-0.5">Drag items up or down to reorder, edit papers, arXiv citations, and links.</p>
        </div>

        <button
          onClick={() =>
            setEditingResearch({
              index: null,
              item: {
                citation: "arXiv:2026.00000",
                title: "",
                badge: "Best Paper Award",
                badgeType: "award",
                summary: "",
                href: "https://arxiv.org/abs/2607.00558",
              },
            })
          }
          className="px-4 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
        >
          <Plus size={15} />
          <span>Add Publication</span>
        </button>
      </div>

      {/* Framer Motion Smooth Reorderable List */}
      <Reorder.Group
        axis="y"
        values={data.research}
        onReorder={handleReorder}
        className="space-y-3.5"
      >
        {data.research.map((res, idx) => (
          <Reorder.Item
            key={res.citation + res.title + idx}
            value={res}
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
                  disabled={idx === data.research.length - 1}
                  className="p-0.5 text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={12} />
                </button>
              </div>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-mono font-bold text-[#568f5e]">{res.citation}</span>
                <h3 className="text-sm font-bold text-white">{res.title}</h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#18281b] border border-[#2e4732] text-[#69ab73] font-semibold flex items-center gap-1">
                  <Award size={11} />
                  <span>{res.badge}</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{res.summary}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => setEditingResearch({ index: idx, item: { ...res } })}
                className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#242424] text-xs text-gray-300 hover:text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Edit3 size={13} />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!confirm("Delete publication entry?")) return;
                  const newRes = data.research.filter((_, i) => i !== idx);
                  handleReorder(newRes);
                }}
                className="p-1.5 bg-[#1a1a1a] hover:bg-red-950 text-gray-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* FULL SCREEN EDIT / CREATE RESEARCH MODAL */}
      {editingResearch && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col w-screen h-screen overflow-hidden animate-in fade-in duration-200">
          {/* Top Sticky Header */}
          <div className="bg-[#121212] border-b border-[#222222] px-6 py-4 flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1b2b1d] border border-[#345237] text-[#69ab73] flex items-center justify-center">
                <FileCode2 size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingResearch.index !== null ? `Edit Publication: ${editingResearch.item.title || "Untitled"}` : "Add Publication"}
                </h3>
                <p className="text-[11px] text-gray-400">Configure academic paper titles, arXiv citations, badges, and abstract summary.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditingResearch(null)}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#282828] text-xs text-gray-300 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newR = [...data.research];
                  if (editingResearch.index !== null) {
                    newR[editingResearch.index] = editingResearch.item;
                  } else {
                    newR.unshift(editingResearch.item);
                  }
                  handleSaveData({ ...data, research: newR });
                  setEditingResearch(null);
                }}
                className="px-6 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-xs text-white font-semibold rounded-xl cursor-pointer shadow-lg flex items-center gap-1.5 transition-all"
              >
                <Save size={15} />
                <span>Save Publication</span>
              </button>
            </div>
          </div>

          {/* Full Screen Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-12 custom-scrollbar bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto space-y-8 pb-16">
              <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 space-y-6 shadow-xl">
                <h4 className="text-xs font-bold text-[#568f5e] uppercase tracking-wider">Publication Meta & Citation</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Citation Code / ID</label>
                    <input
                      type="text"
                      value={editingResearch.item.citation}
                      onChange={(e) => setEditingResearch({ ...editingResearch, item: { ...editingResearch.item, citation: e.target.value } })}
                      placeholder="e.g. arXiv:2607.00558"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">arXiv / Paper URL</label>
                    <input
                      type="text"
                      value={editingResearch.item.href}
                      onChange={(e) => setEditingResearch({ ...editingResearch, item: { ...editingResearch.item, href: e.target.value } })}
                      placeholder="https://arxiv.org/abs/2607.00558"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Paper Title</label>
                  <input
                    type="text"
                    value={editingResearch.item.title}
                    onChange={(e) => setEditingResearch({ ...editingResearch, item: { ...editingResearch.item, title: e.target.value } })}
                    placeholder="e.g. A Methodology for Investigating AI Pattern Prevalence..."
                    className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Badge Notice Text</label>
                    <input
                      type="text"
                      value={editingResearch.item.badge}
                      onChange={(e) => setEditingResearch({ ...editingResearch, item: { ...editingResearch.item, badge: e.target.value } })}
                      placeholder="e.g. Best Paper Award (PATTERNS 2026)"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Badge Type Style</label>
                    <select
                      value={editingResearch.item.badgeType}
                      onChange={(e) => setEditingResearch({ ...editingResearch, item: { ...editingResearch.item, badgeType: e.target.value as any } })}
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    >
                      <option value="award">Award (Green Highlighted)</option>
                      <option value="ongoing">Ongoing (Research Status)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Abstract Summary</label>
                  <textarea
                    rows={4}
                    value={editingResearch.item.summary}
                    onChange={(e) => setEditingResearch({ ...editingResearch, item: { ...editingResearch.item, summary: e.target.value } })}
                    placeholder="Summarize methodology, findings, and research significance..."
                    className="w-full bg-[#181818] border border-[#282828] rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#568f5e] leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions Bar */}
          <div className="bg-[#121212] border-t border-[#222222] px-6 py-4 flex items-center justify-between shrink-0">
            <span className="text-xs text-gray-400">Full screen research editing mode</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditingResearch(null)}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#282828] text-xs text-gray-300 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newR = [...data.research];
                  if (editingResearch.index !== null) {
                    newR[editingResearch.index] = editingResearch.item;
                  } else {
                    newR.unshift(editingResearch.item);
                  }
                  handleSaveData({ ...data, research: newR });
                  setEditingResearch(null);
                }}
                className="px-6 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-xs text-white font-semibold rounded-xl cursor-pointer shadow-lg flex items-center gap-1.5 transition-all"
              >
                <Save size={15} />
                <span>Save Publication</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
