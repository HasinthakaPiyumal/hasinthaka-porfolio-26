"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Layout, Layers, User, Sparkles, FolderGit2, Briefcase, FileCode2, Award, Mail, 
  Wrench, ExternalLink, Clock, ChevronRight, CheckCircle2
} from "lucide-react";
import type { PortfolioData } from "@/lib/data";

export default function AdminDashboardPage() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Header Bar */}
      <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#1c1c1c] pb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-xs text-gray-400 pt-0.5">Manage your portfolio content, and keep everything up-to-date.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18281b] border border-[#2a452d] text-[#69ab73] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#568f5e] animate-pulse" />
            <span>All changes saved</span>
          </span>

          <a
            href="/"
            target="_blank"
            className="px-4 py-2 bg-[#161616] hover:bg-[#202020] border border-[#262626] text-xs text-white rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Preview Site</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      {/* Metric Cards & Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Metric Stat Cards */}
        <div className="xl:col-span-8 space-y-4">
          <div className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 sm:p-6 space-y-5">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">At a glance</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#141414] border border-[#222222] p-4 rounded-xl space-y-1">
                <div className="text-xs text-gray-400">Projects</div>
                <div className="text-xl font-bold text-white">{data?.projects.length || 0}</div>
                <div className="text-[10px] text-[#568f5e] font-semibold">Published</div>
              </div>

              <div className="bg-[#141414] border border-[#222222] p-4 rounded-xl space-y-1">
                <div className="text-xs text-gray-400">Experiences</div>
                <div className="text-xl font-bold text-white">{data?.experiences.length || 0}</div>
                <div className="text-[10px] text-[#568f5e] font-semibold">Active Timeline</div>
              </div>

              <div className="bg-[#141414] border border-[#222222] p-4 rounded-xl space-y-1">
                <div className="text-xs text-gray-400">Research Papers</div>
                <div className="text-xl font-bold text-white">{data?.research.length || 0}</div>
                <div className="text-[10px] text-[#568f5e] font-semibold">arXiv & Awards</div>
              </div>

              <div className="bg-[#141414] border border-[#222222] p-4 rounded-xl space-y-1">
                <div className="text-xs text-gray-400">Awards</div>
                <div className="text-xl font-bold text-white">{data?.awards.length || 0}</div>
                <div className="text-[10px] text-gray-400">Grants & Honors</div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1a1a1a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-500" />
                <span>Last Updated: <strong className="text-gray-200">{data?.lastUpdated || "8th Aug 2025, 11:45 PM by Hasinthaka"}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#568f5e]" />
                <span>Site Status: <strong className="text-[#568f5e]">Live - Your portfolio is live and public</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="xl:col-span-4 bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Manage Sections</h2>

          <div className="space-y-2">
            <Link href="/admin/hero" className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#222] text-xs text-gray-300 hover:text-white transition-colors text-left">
              <span className="flex items-center gap-2"><Layers size={14} className="text-[#568f5e]" /> Edit Hero Banner</span>
              <ChevronRight size={14} className="text-gray-500" />
            </Link>

            <Link href="/admin/projects" className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#222] text-xs text-gray-300 hover:text-white transition-colors text-left">
              <span className="flex items-center gap-2"><FolderGit2 size={14} className="text-[#568f5e]" /> Manage All Projects</span>
              <ChevronRight size={14} className="text-gray-500" />
            </Link>

            <Link href="/admin/experience" className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#222] text-xs text-gray-300 hover:text-white transition-colors text-left">
              <span className="flex items-center gap-2"><Briefcase size={14} className="text-[#568f5e]" /> Edit Experience</span>
              <ChevronRight size={14} className="text-gray-500" />
            </Link>

            <Link href="/admin/research" className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#222] text-xs text-gray-300 hover:text-white transition-colors text-left">
              <span className="flex items-center gap-2"><FileCode2 size={14} className="text-[#568f5e]" /> Edit Research & Papers</span>
              <ChevronRight size={14} className="text-gray-500" />
            </Link>

            <Link href="/admin/about" className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#222] text-xs text-gray-300 hover:text-white transition-colors text-left">
              <span className="flex items-center gap-2"><User size={14} className="text-[#568f5e]" /> Edit About Me Section</span>
              <ChevronRight size={14} className="text-gray-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
