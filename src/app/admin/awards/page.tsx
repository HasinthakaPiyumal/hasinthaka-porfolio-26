"use client";

import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { Save, Plus, Trash2, Edit3, CheckCircle2, Award, ArrowUp, ArrowDown, GripVertical } from "lucide-react";
import type { PortfolioData, AwardItem } from "@/lib/data";

export default function AdminAwardsPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [editingAward, setEditingAward] = useState<{ index: number | null; award: AwardItem } | null>(null);

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
        setToast("Awards updated & revalidated!");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = (newAwards: AwardItem[]) => {
    if (!data) return;
    handleSaveData({ ...data, awards: newAwards });
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (!data) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= data.awards.length) return;

    const newAwards = [...data.awards];
    const [moved] = newAwards.splice(index, 1);
    newAwards.splice(targetIdx, 0, moved);

    handleReorder(newAwards);
  };

  if (!data) return <div className="text-xs text-gray-400 p-4">Loading Awards...</div>;

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
            <Award className="text-[#568f5e]" size={20} />
            <span>Honors & Awards</span>
          </h1>
          <p className="text-xs text-gray-400 pt-0.5">
            Manage research grants, academic honours, drag and drop to reorder, and competition awards.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingAward({
              index: null,
              award: { id: `award-${Date.now()}`, title: "", year: "2025", category: "Excellence" },
            })
          }
          className="px-4 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
        >
          <Plus size={15} />
          <span>Add New Award</span>
        </button>
      </div>

      {/* Framer Motion Reorderable Grid */}
      <Reorder.Group
        axis="y"
        values={data.awards}
        onReorder={handleReorder}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        {data.awards.map((award, idx) => (
          <Reorder.Item
            key={award.id || award.title + idx}
            value={award}
            className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 text-center space-y-2 relative group hover:border-[#568f5e]/50 transition-colors cursor-grab active:cursor-grabbing shadow-xl select-none flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-gray-500 pb-1">
              <div className="p-1.5 rounded-lg bg-[#161616] border border-[#262626] text-gray-400 hover:text-white cursor-grab active:cursor-grabbing">
                <GripVertical size={14} />
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-1 text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === data.awards.length - 1}
                  className="p-1 text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>
              </div>
            </div>

            <div className="space-y-1 my-auto">
              <span className="text-[10px] text-[#568f5e] font-mono font-semibold uppercase bg-[#18281b] px-2.5 py-0.5 rounded-md border border-[#2e4732]">
                {award.category || award.year}
              </span>
              <h3 className="text-sm font-bold text-white leading-snug pt-1">{award.title}</h3>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#1a1a1a]">
              <button
                type="button"
                onClick={() => setEditingAward({ index: idx, award: { ...award } })}
                className="px-3 py-1 bg-[#1a1a1a] hover:bg-[#242424] text-xs text-gray-300 hover:text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Edit3 size={13} />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!confirm("Delete award entry?")) return;
                  const newA = data.awards.filter((_, i) => i !== idx);
                  handleReorder(newA);
                }}
                className="p-1.5 bg-[#1a1a1a] hover:bg-red-950 text-gray-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </Reorder.Item>
        ))}

        <button
          onClick={() =>
            setEditingAward({
              index: null,
              award: { id: `award-${Date.now()}`, title: "", year: "2025", category: "Excellence" },
            })
          }
          className="border-2 border-dashed border-[#262626] hover:border-[#568f5e]/60 bg-[#121212] hover:bg-[#161616] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer text-gray-400 hover:text-white"
        >
          <Plus size={20} className="text-[#568f5e]" />
          <span className="text-xs font-semibold">Add Award</span>
        </button>
      </Reorder.Group>

      {/* FULL SCREEN EDIT / CREATE AWARD MODAL */}
      {editingAward && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col w-screen h-screen overflow-hidden animate-in fade-in duration-200">
          {/* Top Sticky Header */}
          <div className="bg-[#121212] border-b border-[#222222] px-6 py-4 flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1b2b1d] border border-[#345237] text-[#69ab73] flex items-center justify-center">
                <Award size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingAward.index !== null ? `Edit Award: ${editingAward.award.title || "Untitled"}` : "Add New Award"}
                </h3>
                <p className="text-[11px] text-gray-400">Configure honor & award title, awarding institution/category, and year.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditingAward(null)}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#282828] text-xs text-gray-300 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newA = [...data.awards];
                  if (editingAward.index !== null) {
                    newA[editingAward.index] = editingAward.award;
                  } else {
                    newA.unshift(editingAward.award);
                  }
                  handleSaveData({ ...data, awards: newA });
                  setEditingAward(null);
                }}
                className="px-6 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-xs text-white font-semibold rounded-xl cursor-pointer shadow-lg flex items-center gap-1.5 transition-all"
              >
                <Save size={15} />
                <span>Save Award</span>
              </button>
            </div>
          </div>

          {/* Full Screen Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-12 custom-scrollbar bg-[#0a0a0a]">
            <div className="max-w-3xl mx-auto space-y-8 pb-16">
              <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 space-y-6 shadow-xl">
                <h4 className="text-xs font-bold text-[#568f5e] uppercase tracking-wider">Award Meta Details</h4>

                <div>
                  <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Award Title</label>
                  <input
                    type="text"
                    value={editingAward.award.title}
                    onChange={(e) => setEditingAward({ ...editingAward, award: { ...editingAward.award, title: e.target.value } })}
                    placeholder="e.g. WSO2 Research Grant / Dean's List"
                    className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Year Awarded</label>
                    <input
                      type="text"
                      value={editingAward.award.year}
                      onChange={(e) => setEditingAward({ ...editingAward, award: { ...editingAward.award, year: e.target.value } })}
                      placeholder="e.g. 2025"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Category / Organization</label>
                    <input
                      type="text"
                      value={editingAward.award.category}
                      onChange={(e) => setEditingAward({ ...editingAward, award: { ...editingAward.award, category: e.target.value } })}
                      placeholder="e.g. Research Excellence / Academic Honors"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions Bar */}
          <div className="bg-[#121212] border-t border-[#222222] px-6 py-4 flex items-center justify-between shrink-0">
            <span className="text-xs text-gray-400">Full screen award editing mode</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditingAward(null)}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#282828] text-xs text-gray-300 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newA = [...data.awards];
                  if (editingAward.index !== null) {
                    newA[editingAward.index] = editingAward.award;
                  } else {
                    newA.unshift(editingAward.award);
                  }
                  handleSaveData({ ...data, awards: newA });
                  setEditingAward(null);
                }}
                className="px-6 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-xs text-white font-semibold rounded-xl cursor-pointer shadow-lg flex items-center gap-1.5 transition-all"
              >
                <Save size={15} />
                <span>Save Award</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
