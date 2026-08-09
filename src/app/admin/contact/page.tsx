"use client";

import { useState, useEffect } from "react";
import { Save, Mail, CheckCircle2 } from "lucide-react";
import type { PortfolioData } from "@/lib/data";

export default function AdminContactPage() {
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
        setToast("Contact information updated & revalidated!");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <div className="text-xs text-gray-400">Loading Contact Settings...</div>;

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
            <Mail className="text-[#568f5e]" size={20} />
            <span>Contact & Social Links</span>
          </h1>
          <p className="text-xs text-gray-400 pt-0.5">Manage contact details, availability status, social links, and footer text.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-6 bg-[#101010] border border-[#1e1e1e] rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Direct Contact</h2>

          <div>
            <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Email Address</label>
            <input
              type="email"
              value={data.contact.email}
              onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Phone / WhatsApp</label>
            <input
              type="text"
              value={data.contact.phone}
              onChange={(e) => setData({ ...data, contact: { ...data.contact, phone: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#568f5e]"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Availability Status</label>
            <input
              type="text"
              value={data.contact.availabilityStatus}
              onChange={(e) => setData({ ...data, contact: { ...data.contact, availabilityStatus: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-[#568f5e] font-semibold focus:outline-none focus:border-[#568f5e]"
            />
          </div>
        </div>

        <div className="md:col-span-6 bg-[#101010] border border-[#1e1e1e] rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Social Profiles & Footer</h2>

          <div>
            <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">GitHub URL</label>
            <input
              type="text"
              value={data.contact.github}
              onChange={(e) => setData({ ...data, contact: { ...data.contact, github: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#568f5e]"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={data.contact.linkedin}
              onChange={(e) => setData({ ...data, contact: { ...data.contact, linkedin: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#568f5e]"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400 uppercase font-semibold block mb-1">Footer Copyright Text</label>
            <textarea
              rows={2}
              value={data.contact.footerText}
              onChange={(e) => setData({ ...data, contact: { ...data.contact, footerText: e.target.value } })}
              className="w-full bg-[#161616] border border-[#262626] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#568f5e]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
