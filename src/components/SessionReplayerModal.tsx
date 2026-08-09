"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Play, RefreshCw, Film, AlertTriangle } from "lucide-react";
import "rrweb-player/dist/style.css";

interface SessionReplayerModalProps {
  sessionId: string;
  onClose: () => void;
}

export default function SessionReplayerModal({ sessionId, onClose }: SessionReplayerModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAndPlaySession = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/admin/sessions/${sessionId}`);
        const data = await res.json();

        if (!isMounted) return;

        if (!res.ok || !data.success || !data.session || !data.session.events || data.session.events.length === 0) {
          setError("No session recording available for this visit session yet.");
          setLoading(false);
          return;
        }

        // Sort events chronologically by timestamp
        const rawEvents = data.session.events;
        const sortedEvents = [...rawEvents].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

        // Dynamically import rrweb-player
        const rrwebPlayerModule = await import("rrweb-player");
        const rrwebPlayer = rrwebPlayerModule.default || rrwebPlayerModule;

        if (containerRef.current && isMounted) {
          containerRef.current.innerHTML = "";

          playerRef.current = new rrwebPlayer({
            target: containerRef.current,
            props: {
              events: sortedEvents,
              width: containerRef.current.clientWidth || 800,
              height: 480,
              autoPlay: true,
              showController: true,
              UNSAFE_replayCanvas: true,
            },
          });
        }
      } catch (err) {
        console.error("Error launching session replayer:", err);
        if (isMounted) setError("Failed to render session replay player.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadAndPlaySession();

    return () => {
      isMounted = false;
      if (playerRef.current) {
        try {
          playerRef.current.$destroy?.();
        } catch {}
      }
    };
  }, [sessionId]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-mono">
      <div className="relative max-w-4xl w-full bg-[#111111] border border-[#242424] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-[#202020] bg-[#141414]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#568f5e]/15 border border-[#568f5e]/40 text-[#568f5e] flex items-center justify-center">
              <Film size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Session Replay Player</span>
                <span className="text-[10px] bg-[#1c291d] border border-[#2e4732] text-[#69ab73] px-2 py-0.5 rounded font-mono">
                  {sessionId}
                </span>
              </h3>
              <p className="text-[11px] text-gray-400">Replaying visitor DOM mutations, scrolling, and cursor movements.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#262626] border border-[#2a2a2a] text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Player Container */}
        <div className="p-4 sm:p-6 bg-[#0a0a0a] min-h-[480px] flex flex-col items-center justify-center">
          {loading && (
            <div className="text-xs text-gray-400 font-mono flex items-center gap-2 py-16">
              <RefreshCw size={16} className="animate-spin text-[#568f5e]" />
              <span>Loading Recorded Session Events...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-16 space-y-3 max-w-md">
              <div className="w-12 h-12 rounded-2xl bg-red-950/40 border border-red-800/50 text-red-400 flex items-center justify-center mx-auto">
                <AlertTriangle size={22} />
              </div>
              <h4 className="text-sm font-bold text-white">No Replay Recorded</h4>
              <p className="text-xs text-gray-400">{error}</p>
            </div>
          )}

          <div
            ref={containerRef}
            className={`w-full overflow-hidden rounded-xl border border-[#202020] bg-black ${
              loading || error ? "hidden" : "block"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
