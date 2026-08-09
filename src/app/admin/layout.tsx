"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Layout, Layers, User, Sparkles, FolderGit2, Briefcase, FileCode2, Award, Mail, 
  Wrench, ExternalLink, LogOut, Lock, Key, ShieldAlert, CheckCircle2, Menu, X, BarChart3 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [profileImage, setProfileImage] = useState<string>("/images/about-portrait.jpg");

  const loadProfileImage = () => {
    fetch("/api/admin/data", { cache: "no-store" })
      .then((res) => res.json())
      .then((d) => {
        if (d && d.about && d.about.profileImage) {
          setProfileImage(d.about.profileImage);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    // Check if session cookie is valid
    fetch("/api/admin/auth")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));

    loadProfileImage();

    window.addEventListener("portfolio-data-updated", loadProfileImage);
    return () => {
      window.removeEventListener("portfolio-data-updated", loadProfileImage);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(json.message || "Invalid password");
      }
    } catch (err) {
      setLoginError("Login error. Check server.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setPassword("");
  };

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center font-mono text-xs text-gray-400">
        Authenticating Admin Console...
      </div>
    );
  }

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070707] text-white font-mono flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#101010] border border-[#202020] rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#568f5e]/15 border border-[#568f5e]/40 text-[#568f5e] flex items-center justify-center mx-auto shadow-inner">
              <Lock size={26} />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Portfolio Admin Panel</h1>
            <p className="text-xs text-gray-400">Authenticating Hasinthaka Control Center</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-[11px] text-gray-400 uppercase tracking-widest block font-semibold">
                Admin Password
              </label>
              <div className="relative">
                <Key size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full bg-[#161616] border border-[#262626] focus:border-[#568f5e] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/40 border border-red-800/50 rounded-xl text-red-400 text-xs flex items-center gap-2">
                <ShieldAlert size={15} />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-[#568f5e] hover:bg-[#487a4f] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-lg disabled:opacity-50"
            >
              {loginLoading ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Layout },
    { href: "/admin/analytics", label: "Analytics & Visitors", icon: BarChart3 },
    { href: "/admin/hero", label: "Hero Banner", icon: Layers },
    { href: "/admin/experience", label: "Experience", icon: Briefcase },
    { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
    { href: "/admin/featured", label: "Featured Work", icon: Sparkles },
    { href: "/admin/tools", label: "Approach & Tech", icon: Wrench },
    { href: "/admin/research", label: "Research & Papers", icon: FileCode2 },
    { href: "/admin/awards", label: "Honors & Awards", icon: Award },
    { href: "/admin/about", label: "About Me", icon: User },
    { href: "/admin/contact", label: "Contact & Links", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#070707] text-white font-mono flex flex-col md:flex-row">
      {/* Mobile Top Header Bar (< md) */}
      <div className="md:hidden bg-[#0c0c0c] border-b border-[#1a1a1a] p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#568f5e] text-white font-bold flex items-center justify-center text-sm shadow-md">
            H
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wider uppercase">HASINTHAKA</div>
            <div className="text-[9px] text-[#568f5e] font-semibold">Portfolio Admin</div>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-[#161616] border border-[#242424] text-gray-300 rounded-lg hover:text-white"
          aria-label="Toggle Mobile Menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer Menu (< md) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] z-50 bg-[#0c0c0c] border-b border-[#1a1a1a] p-4 space-y-4 shadow-2xl max-h-[calc(100vh-65px)] overflow-y-auto">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all text-left ${
                    isActive
                      ? "bg-[#182a1c] border border-[#2e4732] text-[#69ab73] font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-[#141414]"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-[#568f5e]" : "text-gray-400"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-between gap-3">
            <a
              href="/"
              target="_blank"
              className="py-2 px-3 bg-[#141414] border border-[#222] text-xs text-gray-300 rounded-lg flex items-center gap-2"
            >
              <span>Live Site</span>
              <ExternalLink size={13} />
            </a>

            <button
              onClick={handleLogout}
              className="py-2 px-3 bg-red-950/40 border border-red-800/50 text-red-400 text-xs rounded-lg flex items-center gap-1.5"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Persistent Left Sidebar (Desktop >= md) */}
      <aside className="w-64 bg-[#0c0c0c] border-r border-[#1a1a1a] flex flex-col justify-between p-5 h-screen sticky top-0 shrink-0 hidden md:flex">
        <div className="space-y-6 overflow-y-auto custom-scrollbar pr-1">
          {/* Logo */}
          <div className="flex items-center gap-3 pt-1">
            <div className="w-9 h-9 rounded-xl bg-[#568f5e] text-white font-bold flex items-center justify-center text-lg shadow-md shrink-0">
              H
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wider uppercase leading-none">
                HASINTHAKA
              </h1>
              <span className="text-[10px] text-[#568f5e] font-semibold">Portfolio Admin</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all text-left ${
                    isActive
                      ? "bg-[#182a1c] border border-[#2e4732] text-[#69ab73] font-semibold shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-[#141414]"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-[#568f5e]" : "text-gray-400"} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-[#1a1a1a] space-y-3">
          <a
            href="/"
            target="_blank"
            className="w-full py-2 bg-[#141414] hover:bg-[#1a1a1a] border border-[#222] text-xs text-gray-300 hover:text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink size={13} />
          </a>

          <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#111111] border border-[#1f1f1f]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-[#333] flex items-center justify-center overflow-hidden shrink-0">
                <Image src={profileImage} alt="Admin" width={32} height={32} className="object-cover w-full h-full" unoptimized />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Hasinthaka</div>
                <div className="text-[10px] text-[#568f5e] font-semibold">Admin</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-400 p-1.5 rounded hover:bg-[#1f1f1f] transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 space-y-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
