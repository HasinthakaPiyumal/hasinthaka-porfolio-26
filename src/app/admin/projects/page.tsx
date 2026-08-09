"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Reorder } from "framer-motion";
import { Save, Plus, Trash2, Edit3, CheckCircle2, FolderGit2, ArrowUp, ArrowDown, GripVertical, Upload } from "lucide-react";
import type { PortfolioData, Project } from "@/lib/data";
import { TechSearchSelect } from "@/components/TechSearchSelect";

export default function AdminProjectsPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<{ index: number | null; project: Project } | null>(null);

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
        setToast("Projects updated & revalidated!");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = (newProjects: Project[]) => {
    if (!data) return;
    const renumbered = newProjects.map((p, i) => ({
      ...p,
      num: i < 9 ? `0${i + 1}` : `${i + 1}`,
    }));
    handleSaveData({ ...data, projects: renumbered });
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (!data) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= data.projects.length) return;

    const newProjects = [...data.projects];
    const [moved] = newProjects.splice(index, 1);
    newProjects.splice(targetIdx, 0, moved);

    handleReorder(newProjects);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imgIdx?: number) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

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
        const newImages = [...editingProject.project.images];
        if (imgIdx !== undefined) {
          newImages[imgIdx] = result.url;
        } else {
          newImages.push(result.url);
        }

        setEditingProject({
          ...editingProject,
          project: { ...editingProject.project, images: newImages },
        });
        setToast("Project image uploaded!");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (!data) return <div className="text-xs text-gray-400 p-4">Loading Projects...</div>;

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
            <FolderGit2 className="text-[#568f5e]" size={20} />
            <span>Projects & Selected Work</span>
          </h1>
          <p className="text-xs text-gray-400 pt-0.5">
            Drag items up or down to reorder, upload images, and edit project details.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingProject({
              index: null,
              project: {
                num: data.projects.length < 9 ? `0${data.projects.length + 1}` : `${data.projects.length + 1}`,
                title: "",
                category: "Full-Stack",
                year: new Date().getFullYear().toString(),
                date: "Aug 2025",
                status: "Published",
                description: "",
                fullDescription: "",
                tags: ["Next.js", "React"],
                images: ["/images/projects/zenlise.jpg"],
                featured: true,
              },
            })
          }
          className="px-4 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
        >
          <Plus size={15} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Framer Motion Smooth Reorderable List */}
      <Reorder.Group
        axis="y"
        values={data.projects}
        onReorder={handleReorder}
        className="space-y-3"
      >
        {data.projects.map((proj, idx) => (
          <Reorder.Item
            key={proj.num + proj.title + idx}
            value={proj}
            className="p-4 sm:p-5 bg-[#101010] border border-[#1e1e1e] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#333] transition-colors cursor-grab active:cursor-grabbing shadow-xl select-none"
          >
            {/* Left Drag Handle & Reorder Controls */}
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
                  disabled={idx === data.projects.length - 1}
                  className="p-0.5 text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={12} />
                </button>
              </div>

              <span className="text-xs font-mono font-bold text-[#568f5e] bg-[#162719] px-2.5 py-1 rounded-lg border border-[#2e4732]">
                {proj.num}
              </span>
            </div>

            {/* Project Summary Info */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-sm font-bold text-white truncate">{proj.title}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c1c] border border-[#282828] text-gray-300">
                  {proj.category}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  {proj.date || proj.year}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    proj.status === "Draft"
                      ? "bg-yellow-950/60 border border-yellow-800 text-yellow-400"
                      : "bg-[#18281b] border border-[#2a452d] text-[#69ab73]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${proj.status === "Draft" ? "bg-yellow-400" : "bg-[#568f5e]"}`} />
                  <span>{proj.status || "Published"}</span>
                </span>
                {proj.featured && (
                  <span className="text-[10px] text-[#568f5e] bg-[#18281b] border border-[#2e4732] px-2 py-0.5 rounded font-semibold">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 line-clamp-1 leading-relaxed">{proj.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {proj.tags?.map((t) => (
                  <span key={t} className="text-[10px] text-gray-400 bg-[#161616] border border-[#242424] px-2 py-0.5 rounded font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => setEditingProject({ index: idx, project: { ...proj } })}
                className="px-3 py-1.5 bg-[#1e1e1e] hover:bg-[#282828] text-xs text-gray-300 hover:text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Edit3 size={13} />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!confirm("Delete this project?")) return;
                  const newP = data.projects.filter((_, i) => i !== idx);
                  handleReorder(newP);
                }}
                className="p-1.5 bg-[#1e1e1e] hover:bg-red-950 text-gray-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* FULL SCREEN EDIT / CREATE PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col w-screen h-screen overflow-hidden animate-in fade-in duration-200">
          {/* Top Sticky Header */}
          <div className="bg-[#121212] border-b border-[#222222] px-6 py-4 flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1b2b1d] border border-[#345237] text-[#69ab73] flex items-center justify-center">
                <FolderGit2 size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingProject.index !== null ? `Edit Project: ${editingProject.project.title || "Untitled"}` : "Add New Project"}
                </h3>
                <p className="text-[11px] text-gray-400">Configure project details, full overview markdown, gallery images, and tech tags.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#282828] text-xs text-gray-300 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newP = [...data.projects];
                  if (editingProject.index !== null) {
                    newP[editingProject.index] = editingProject.project;
                  } else {
                    newP.unshift(editingProject.project);
                  }
                  handleReorder(newP);
                  setEditingProject(null);
                }}
                className="px-6 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-xs text-white font-semibold rounded-xl cursor-pointer shadow-lg flex items-center gap-1.5 transition-all"
              >
                <Save size={15} />
                <span>Save Project</span>
              </button>
            </div>
          </div>

          {/* Full Screen Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-12 custom-scrollbar bg-[#0a0a0a]">
            <div className="max-w-5xl mx-auto space-y-8 pb-16">
              {/* Basic Meta Grid */}
              <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 space-y-6 shadow-xl">
                <h4 className="text-xs font-bold text-[#568f5e] uppercase tracking-wider">1. Project Overview & Meta</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Project Title</label>
                    <input
                      type="text"
                      value={editingProject.project.title}
                      onChange={(e) => setEditingProject({ ...editingProject, project: { ...editingProject.project, title: e.target.value } })}
                      placeholder="e.g. Zenlise SaaS Platform"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Category</label>
                    <select
                      value={
                        ["Full-Stack", "Backend & AI", "Mobile Apps", "SaaS", "Research", "Web Development", "Open Source", "AI/ML", "Cloud & DevOps"].includes(editingProject.project.category)
                          ? editingProject.project.category
                          : "Custom"
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val !== "Custom") {
                          setEditingProject({
                            ...editingProject,
                            project: { ...editingProject.project, category: val },
                          });
                        }
                      }}
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e] cursor-pointer"
                    >
                      <option value="Full-Stack">Full-Stack</option>
                      <option value="Backend & AI">Backend & AI</option>
                      <option value="Mobile Apps">Mobile Apps</option>
                      <option value="SaaS">SaaS</option>
                      <option value="Research">Research</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Open Source">Open Source</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Cloud & DevOps">Cloud & DevOps</option>
                      <option value="Custom">+ Custom Category...</option>
                    </select>

                    {(!["Full-Stack", "Backend & AI", "Mobile Apps", "SaaS", "Research", "Web Development", "Open Source", "AI/ML", "Cloud & DevOps"].includes(editingProject.project.category)) && (
                      <input
                        type="text"
                        value={editingProject.project.category === "Custom" ? "" : editingProject.project.category}
                        onChange={(e) => setEditingProject({ ...editingProject, project: { ...editingProject.project, category: e.target.value } })}
                        placeholder="Type custom category name..."
                        className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#568f5e] mt-2 font-mono"
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Order Number</label>
                    <input
                      type="text"
                      value={editingProject.project.num}
                      onChange={(e) => setEditingProject({ ...editingProject, project: { ...editingProject.project, num: e.target.value } })}
                      placeholder="e.g. 01"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Status</label>
                    <select
                      value={editingProject.project.status || "Published"}
                      onChange={(e) => setEditingProject({ ...editingProject, project: { ...editingProject.project, status: e.target.value as any } })}
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    >
                      <option value="Published">Published (Public)</option>
                      <option value="Draft">Draft (Hidden)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Year / Date</label>
                    <input
                      type="text"
                      value={editingProject.project.date || editingProject.project.year}
                      onChange={(e) => setEditingProject({ ...editingProject, project: { ...editingProject.project, date: e.target.value, year: e.target.value } })}
                      placeholder="e.g. Aug 2025"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="text-xs font-semibold text-gray-300 flex items-center gap-2.5 cursor-pointer bg-[#181818] border border-[#282828] p-2.5 rounded-xl w-full">
                      <input
                        type="checkbox"
                        checked={editingProject.project.featured || false}
                        onChange={(e) => setEditingProject({ ...editingProject, project: { ...editingProject.project, featured: e.target.checked } })}
                        className="w-4 h-4 accent-[#568f5e] rounded"
                      />
                      <span>Featured on Homepage</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Short Card Summary Description</label>
                  <textarea
                    rows={2}
                    value={editingProject.project.description}
                    onChange={(e) => setEditingProject({ ...editingProject, project: { ...editingProject.project, description: e.target.value } })}
                    placeholder="Brief 1-2 sentence overview for cards..."
                    className="w-full bg-[#181818] border border-[#282828] rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#568f5e] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Full Detailed Modal & Case Study Description</label>
                  <textarea
                    rows={6}
                    value={editingProject.project.fullDescription}
                    onChange={(e) => setEditingProject({ ...editingProject, project: { ...editingProject.project, fullDescription: e.target.value } })}
                    placeholder="Deep technical overview, architecture choices, database schema, results..."
                    className="w-full bg-[#181818] border border-[#282828] rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#568f5e] leading-relaxed font-mono"
                  />
                </div>
              </div>

              {/* Technologies Section */}
              <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 space-y-4 shadow-xl">
                <h4 className="text-xs font-bold text-[#568f5e] uppercase tracking-wider">2. Project Tech Stack & Search Select</h4>
                <TechSearchSelect
                  selected={editingProject.project.tags}
                  onChange={(newTags) =>
                    setEditingProject({
                      ...editingProject,
                      project: { ...editingProject.project, tags: newTags },
                    })
                  }
                  placeholder="Search and select technologies for this project..."
                />
              </div>

              {/* Media Gallery Section */}
              <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#568f5e] uppercase tracking-wider">3. Project Screenshots & Media Gallery ({editingProject.project.images.length})</h4>
                    <p className="text-[11px] text-gray-400">Upload or replace screenshot files to display in the project gallery modal.</p>
                  </div>
                  <label className="px-4 py-2 bg-[#18281b] hover:bg-[#223927] border border-[#2e4732] text-[#69ab73] text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
                    <Upload size={14} />
                    <span>Upload Image File</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} className="hidden" />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {editingProject.project.images.map((imgUrl, imgIdx) => (
                    <div key={imgIdx} className="flex items-center gap-3 bg-[#181818] border border-[#282828] p-3 rounded-xl">
                      <div className="w-16 h-12 relative rounded-lg border border-[#333] overflow-hidden shrink-0 bg-[#0a0a0a]">
                        <Image src={imgUrl || "/images/projects/zenlise.jpg"} alt={`Image ${imgIdx + 1}`} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          value={imgUrl}
                          onChange={(e) => {
                            const newImages = [...editingProject.project.images];
                            newImages[imgIdx] = e.target.value;
                            setEditingProject({ ...editingProject, project: { ...editingProject.project, images: newImages } });
                          }}
                          placeholder="/images/projects/your-image.jpg"
                          className="w-full bg-[#121212] border border-[#242424] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                        />
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-[#69ab73] hover:underline cursor-pointer flex items-center gap-1">
                            <Upload size={11} /> Replace File
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, imgIdx)} className="hidden" />
                          </label>
                        </div>
                      </div>

                      {editingProject.project.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = editingProject.project.images.filter((_, i) => i !== imgIdx);
                            setEditingProject({ ...editingProject, project: { ...editingProject.project, images: newImages } });
                          }}
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                          title="Remove Image"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* External Links Section */}
              <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 space-y-4 shadow-xl">
                <h4 className="text-xs font-bold text-[#568f5e] uppercase tracking-wider">4. External Repository & Demo Links</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={editingProject.project.githubUrl || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, project: { ...editingProject.project, githubUrl: e.target.value } })}
                      placeholder="https://github.com/username/project"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Live Demo / Paper URL</label>
                    <input
                      type="text"
                      value={editingProject.project.demoUrl || editingProject.project.moreUrl || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, project: { ...editingProject.project, demoUrl: e.target.value } })}
                      placeholder="https://demo.app or arXiv link"
                      className="w-full bg-[#181818] border border-[#282828] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions Bar */}
          <div className="bg-[#121212] border-t border-[#222222] px-6 py-4 flex items-center justify-between shrink-0">
            <span className="text-xs text-gray-400">Full screen editing mode</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#282828] text-xs text-gray-300 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newP = [...data.projects];
                  if (editingProject.index !== null) {
                    newP[editingProject.index] = editingProject.project;
                  } else {
                    newP.unshift(editingProject.project);
                  }
                  handleSaveData({ ...data, projects: newP });
                  setEditingProject(null);
                }}
                className="px-6 py-2 bg-[#568f5e] hover:bg-[#487a4f] text-xs text-white font-semibold rounded-xl cursor-pointer shadow-lg flex items-center gap-1.5 transition-all"
              >
                <Save size={15} />
                <span>Save Project</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
