"use client";

import React, { useState, useEffect, Fragment } from "react";
import { 
  BarChart3, Users, Eye, Globe2, MapPin, Monitor, Smartphone, RefreshCw, Check, Copy, 
  Search, ShieldCheck, ChevronDown, ChevronRight, Compass, Clock, ArrowRight, Layers, Play, Film, Timer 
} from "lucide-react";
import SessionReplayerModal from "@/components/SessionReplayerModal";

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0s";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

interface VisitDetail {
  id: string;
  timestamp: string;
  path: string;
  referrer: string;
  sessionId?: string;
  activeDurationSeconds?: number;
}

interface GroupedVisitor {
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  browser: string;
  os: string;
  device: "Desktop" | "Mobile" | "Tablet";
  latestTimestamp: string;
  firstTimestamp: string;
  totalVisits: number;
  totalActiveDuration?: number;
  visits: VisitDetail[];
}

interface AnalyticsStats {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  avgActiveDuration: number;
  topCountries: { country: string; code: string; count: number; percentage: number }[];
  topCities: { location: string; count: number }[];
  deviceCounts: { Desktop: number; Mobile: number; Tablet: number };
  topBrowsers: { browser: string; count: number }[];
  groupedVisitors: GroupedVisitor[];
}

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIps, setExpandedIps] = useState<Record<string, boolean>>({});
  const [selectedReplaySessionId, setSelectedReplaySessionId] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchAnalytics = () => {
    setLoading(true);
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          setStats(data);
        }
      })
      .catch((err) => console.error("Error fetching analytics:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const toggleExpand = (ip: string) => {
    setExpandedIps((prev) => ({
      ...prev,
      [ip]: !prev[ip],
    }));
  };

  const handleCopyIp = (ip: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  if (loading && !stats) {
    return (
      <div className="p-8 text-xs text-gray-400 font-mono flex items-center gap-2">
        <RefreshCw size={14} className="animate-spin text-[#568f5e]" />
        <span>Loading Visitor Analytics & Active Telemetry...</span>
      </div>
    );
  }

  // Filter visitors by search
  const filteredVisitors = (stats?.groupedVisitors || []).filter((visitor) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const pathsStr = visitor.visits.map((v) => v.path).join(" ").toLowerCase();
    return (
      visitor.ip.toLowerCase().includes(q) ||
      visitor.country.toLowerCase().includes(q) ||
      visitor.city.toLowerCase().includes(q) ||
      visitor.browser.toLowerCase().includes(q) ||
      visitor.os.toLowerCase().includes(q) ||
      pathsStr.includes(q)
    );
  });

  // Calculate pagination
  const totalItems = filteredVisitors.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedVisitors = filteredVisitors.slice(startIndex, startIndex + pageSize);

  return (
    <div className="space-y-6 font-mono w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#1c1c1c] pb-5">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="text-[#568f5e]" size={22} />
            <span>Visitor Analytics & IP Telemetry</span>
          </h1>
          <p className="text-xs text-gray-400 pt-0.5">
            Monitor unique user IP addresses, active engagement duration, visited paths, and session replays.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          disabled={loading}
          className="px-4 py-2 bg-[#161616] hover:bg-[#202020] border border-[#262626] text-xs text-gray-300 hover:text-white rounded-xl flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
        >
          <RefreshCw size={13} className={loading ? "animate-spin text-[#568f5e]" : ""} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pageviews */}
        <div className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs uppercase font-semibold tracking-wider">Total Pageviews</span>
            <Eye size={16} className="text-[#568f5e]" />
          </div>
          <div className="text-3xl font-mono font-bold text-white">{stats?.totalViews.toLocaleString()}</div>
          <p className="text-[11px] text-gray-500 font-mono">Accumulated page hits</p>
        </div>

        {/* Unique Visitors */}
        <div className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs uppercase font-semibold tracking-wider">Unique Users (IPs)</span>
            <Users size={16} className="text-[#568f5e]" />
          </div>
          <div className="text-3xl font-mono font-bold text-white">{stats?.uniqueVisitors.toLocaleString()}</div>
          <p className="text-[11px] text-gray-500 font-mono">Collapsed individual IP profiles</p>
        </div>

        {/* Avg Active Time */}
        <div className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs uppercase font-semibold tracking-wider">Avg. Active Time</span>
            <Timer size={16} className="text-[#568f5e]" />
          </div>
          <div className="text-3xl font-mono font-bold text-[#568f5e]">
            {formatDuration(stats?.avgActiveDuration || 0)}
          </div>
          <p className="text-[11px] text-gray-500 font-mono">Average active engagement duration</p>
        </div>

        {/* Top Country */}
        <div className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs uppercase font-semibold tracking-wider">Top Location</span>
            <Globe2 size={16} className="text-[#568f5e]" />
          </div>
          <div className="text-xl font-bold text-white truncate">
            {stats?.topCountries[0]?.country || "Sri Lanka"}
          </div>
          <p className="text-[11px] text-gray-500 font-mono">
            {stats?.topCountries[0]?.count || 0} visits ({stats?.topCountries[0]?.percentage || 0}%)
          </p>
        </div>
      </div>

      {/* TOP INSIGHTS ROW: 2 Cards Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Top Countries Card */}
        <div className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-xs uppercase font-semibold text-gray-400 tracking-wider flex items-center gap-2">
            <Globe2 size={15} className="text-[#568f5e]" />
            <span>Top Geographic Locations</span>
          </h3>

          <div className="space-y-3">
            {stats?.topCountries && stats.topCountries.length > 0 ? (
              stats.topCountries.map((c) => (
                <div key={c.country} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-medium truncate">{c.country}</span>
                    <span className="text-gray-400 font-mono">{c.count} visits ({c.percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#568f5e] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(c.percentage, 5)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500 py-4 text-center">No location data available.</div>
            )}
          </div>
        </div>

        {/* Device & Browser Breakdown Card */}
        <div className="bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <h3 className="text-xs uppercase font-semibold text-gray-400 tracking-wider flex items-center gap-2">
            <Monitor size={15} className="text-[#568f5e]" />
            <span>Device & Browser Share</span>
          </h3>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-[#161616] border border-[#242424] rounded-xl space-y-1">
              <Monitor size={16} className="mx-auto text-gray-400" />
              <div className="text-xs font-bold text-white">{stats?.deviceCounts.Desktop || 0}</div>
              <div className="text-[9px] text-gray-500 uppercase">Desktop</div>
            </div>
            <div className="p-3 bg-[#161616] border border-[#242424] rounded-xl space-y-1">
              <Smartphone size={16} className="mx-auto text-gray-400" />
              <div className="text-xs font-bold text-white">{stats?.deviceCounts.Mobile || 0}</div>
              <div className="text-[9px] text-gray-500 uppercase">Mobile</div>
            </div>
            <div className="p-3 bg-[#161616] border border-[#242424] rounded-xl space-y-1">
              <Globe2 size={16} className="mx-auto text-gray-400" />
              <div className="text-xs font-bold text-white">{stats?.deviceCounts.Tablet || 0}</div>
              <div className="text-[9px] text-gray-500 uppercase">Tablet</div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1c1c1c] space-y-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">
              Top Browsers
            </span>
            <div className="flex flex-wrap gap-1.5">
              {stats?.topBrowsers.map((b) => (
                <span
                  key={b.browser}
                  className="text-[10px] px-2.5 py-1 bg-[#161616] border border-[#242424] rounded-md text-gray-300 font-mono"
                >
                  {b.browser} ({b.count})
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FULL WIDTH VISITOR PROFILES TABLE SECTION */}
      <div className="w-full bg-[#101010] border border-[#1e1e1e] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        
        {/* Table Header & Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#568f5e]" />
              <span>Unique Visitor Profiles ({totalItems})</span>
            </h2>
            <p className="text-[11px] text-gray-400">Multiple visits from the same IP address are collapsed into a single profile row.</p>
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs sm:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search IP, location, path..."
              className="w-full bg-[#161616] border border-[#262626] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#568f5e]"
            />
          </div>
        </div>

        {/* Table Container - Full Width */}
        <div className="overflow-x-auto rounded-xl border border-[#1c1c1c] w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1c1c1c] bg-[#141414] text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-3.5 w-8"></th>
                <th className="py-3.5 px-4">IP Address & Visits</th>
                <th className="py-3.5 px-4">Active Time</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Visited Paths</th>
                <th className="py-3.5 px-4">Last Seen</th>
                <th className="py-3.5 px-4">Device & OS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181818] text-[11px]">
              {paginatedVisitors.length > 0 ? (
                paginatedVisitors.map((visitor) => {
                  const isExpanded = !!expandedIps[visitor.ip];
                  const uniquePaths = Array.from(new Set(visitor.visits.map((v: VisitDetail) => v.path)));

                  return (
                    <React.Fragment key={visitor.ip}>
                      {/* Parent Collapsed Row */}
                      <tr
                        onClick={() => toggleExpand(visitor.ip)}
                        className={`hover:bg-[#151515] transition-colors cursor-pointer ${
                          isExpanded ? "bg-[#141414]" : ""
                        }`}
                      >
                        {/* Expand Icon */}
                        <td className="py-3.5 px-2 text-center text-gray-500">
                          {isExpanded ? (
                            <ChevronDown size={16} className="text-[#568f5e]" />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </td>

                        {/* IP Address & Visit Count Badge */}
                        <td className="py-3.5 px-4 font-bold text-[#568f5e]">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs">{visitor.ip}</span>
                            <button
                              onClick={(e) => handleCopyIp(visitor.ip, e)}
                              className="p-1 hover:text-white text-gray-500 transition-colors cursor-pointer"
                              title="Copy IP Address"
                            >
                              {copiedIp === visitor.ip ? <Check size={12} className="text-[#568f5e]" /> : <Copy size={11} />}
                            </button>
                            
                            <span className="px-2 py-0.5 rounded-md bg-[#568f5e]/15 border border-[#568f5e]/40 text-[#568f5e] text-[10px] font-bold">
                              {visitor.totalVisits} {visitor.totalVisits === 1 ? "visit" : "visits"}
                            </span>
                          </div>
                        </td>

                        {/* Active Engagement Time */}
                        <td className="py-3.5 px-4 text-white">
                          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#18261a] border border-[#2b442e] text-[#69ab73] text-[10px] font-bold font-mono">
                            <Timer size={11} />
                            <span>{formatDuration(visitor.totalActiveDuration || 0)}</span>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-4 text-white">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-[#568f5e] shrink-0" />
                            <span className="font-semibold text-xs">{visitor.country}</span>
                            {visitor.city && visitor.city !== "Unknown City" && (
                              <span className="text-gray-400 text-[10px]">({visitor.city})</span>
                            )}
                          </div>
                        </td>

                        {/* Visited Paths Summary */}
                        <td className="py-3.5 px-4 text-gray-300">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {uniquePaths.map((pathStr) => (
                              <span
                                key={pathStr}
                                className="px-2 py-0.5 rounded bg-[#1c1c1c] border border-[#282828] text-gray-300 text-[10px] font-mono flex items-center gap-1"
                              >
                                <Compass size={11} className="text-[#568f5e]" />
                                <span>{pathStr}</span>
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Last Seen Timestamp */}
                        <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap">
                          {new Date(visitor.latestTimestamp).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>

                        {/* Device & OS */}
                        <td className="py-3.5 px-4 text-gray-300">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="bg-[#181818] border border-[#242424] px-2 py-0.5 rounded text-[10px] text-gray-300 font-semibold">
                              {visitor.browser}
                            </span>
                            <span className="text-[10px] text-gray-500">{visitor.os}</span>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Sub-Row Details */}
                      {isExpanded && (
                        <tr className="bg-[#0e0e0e] border-b border-[#1f1f1f]">
                          <td colSpan={7} className="p-4 sm:p-6 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-[#568f5e] uppercase tracking-wider flex items-center gap-2">
                                <Clock size={14} />
                                <span>Complete Visit History ({visitor.visits.length} logs for {visitor.ip})</span>
                              </h4>
                              <span className="text-[10px] text-gray-500">First seen: {new Date(visitor.firstTimestamp).toLocaleString()}</span>
                            </div>

                            {/* Nested Sub-Table */}
                            <div className="bg-[#141414] rounded-xl border border-[#222222] overflow-hidden">
                              <table className="w-full text-left text-[11px]">
                                <thead>
                                  <tr className="border-b border-[#222222] bg-[#181818] text-gray-400 text-[10px] uppercase font-semibold">
                                    <th className="py-2.5 px-3.5">#</th>
                                    <th className="py-2.5 px-3.5">Timestamp</th>
                                    <th className="py-2.5 px-3.5">Visited Path / Section</th>
                                    <th className="py-2.5 px-3.5">Active Time</th>
                                    <th className="py-2.5 px-3.5">Referrer</th>
                                    <th className="py-2.5 px-3.5 text-right">Session Replay</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1e1e1e]">
                                  {visitor.visits.map((visit: VisitDetail, idx: number) => (
                                    <tr key={visit.id || idx} className="hover:bg-[#1a1a1a]">
                                      <td className="py-2.5 px-3.5 text-gray-500 font-mono">{visitor.visits.length - idx}</td>
                                      <td className="py-2.5 px-3.5 text-gray-300 whitespace-nowrap">
                                        {new Date(visit.timestamp).toLocaleString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          second: "2-digit",
                                        })}
                                      </td>
                                      <td className="py-2.5 px-3.5 font-semibold text-white">
                                        <span className="inline-flex items-center gap-1.5 text-[#568f5e] bg-[#1c291d] border border-[#2e4732] px-2 py-0.5 rounded text-[10px]">
                                          <Compass size={11} />
                                          <span>{visit.path || "/"}</span>
                                        </span>
                                      </td>
                                      <td className="py-2.5 px-3.5 text-gray-300 font-mono">
                                        {formatDuration(visit.activeDurationSeconds || 0)}
                                      </td>
                                      <td className="py-2.5 px-3.5 text-gray-400">{visit.referrer || "Direct"}</td>
                                      <td className="py-2.5 px-3.5 text-right">
                                        {visit.sessionId ? (
                                          <button
                                            onClick={() => setSelectedReplaySessionId(visit.sessionId!)}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#568f5e] hover:bg-[#487a4f] text-white text-[10px] font-bold rounded transition-colors cursor-pointer shadow-sm"
                                          >
                                            <Play size={10} fill="currentColor" />
                                            <span>Replay Session</span>
                                          </button>
                                        ) : (
                                          <span className="text-[10px] text-gray-600 font-mono">No Recording</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 font-mono text-xs">
                    No matching visitor profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Page info */}
          <div className="text-xs text-gray-400">
            Showing <span className="text-white font-bold">{totalItems === 0 ? 0 : startIndex + 1}</span> to{" "}
            <span className="text-white font-bold">{Math.min(startIndex + pageSize, totalItems)}</span> of{" "}
            <span className="text-[#568f5e] font-bold">{totalItems}</span> unique visitors
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-[#161616] border border-[#262626] text-xs text-gray-300 rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>

            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1 bg-[#161616] border border-[#262626] hover:border-[#568f5e] text-xs text-gray-300 hover:text-white rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>

            <span className="text-xs text-gray-400 font-bold px-1">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="px-3.5 py-1 bg-[#161616] border border-[#262626] hover:border-[#568f5e] text-xs text-gray-300 hover:text-white rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Session Replayer Modal */}
      {selectedReplaySessionId && (
        <SessionReplayerModal
          sessionId={selectedReplaySessionId}
          onClose={() => setSelectedReplaySessionId(null)}
        />
      )}
    </div>
  );
}
