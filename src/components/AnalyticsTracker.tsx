"use client";

import { useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import SessionRecorder from "./SessionRecorder";

export function AnalyticsTracker() {
  const activeSecondsRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    let sid = sessionStorage.getItem("portfolio_session_id");
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem("portfolio_session_id", sid);
    }

    const trackView = (isPing = false) => {
      try {
        const fullPath = window.location.pathname + (window.location.hash || "");
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: fullPath || "/",
            referrer: document.referrer || "Direct",
            sessionId: sid,
            activeDurationSeconds: activeSecondsRef.current,
            isPing,
          }),
        }).catch(() => {});
      } catch {
        // Ignore tracker errors
      }
    };

    // Initial page view ping
    trackView(false);

    // Active Engagement Timer: Increment every second if document is visible
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") {
        activeSecondsRef.current += 1;
      }
    }, 1000);

    // Periodic ping every 10s to sync activeDurationSeconds with backend
    const pingInterval = setInterval(() => {
      if (document.visibilityState === "visible" && activeSecondsRef.current > 0) {
        trackView(true);
      }
    }, 10000);

    // Visibility & Unload listeners
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        trackView(true);
      }
    };

    window.addEventListener("hashchange", () => trackView(false));
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timer);
      clearInterval(pingInterval);
      window.removeEventListener("hashchange", () => trackView(false));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      trackView(true);
    };
  }, []);

  return (
    <>
      <Analytics />
      <SessionRecorder />
    </>
  );
}

export default AnalyticsTracker;
