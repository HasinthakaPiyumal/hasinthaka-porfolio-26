"use client";

import { useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";

export function AnalyticsTracker() {
  const activeSecondsRef = useRef<number>(0);
  const sentUnloadRef = useRef<boolean>(false);

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

    // Initial page view (Single call on page load)
    trackView(false);

    // Increment active duration locally every second without making any network requests
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") {
        activeSecondsRef.current += 1;
      }
    }, 1000);

    // Send final active duration only on page leave/unload using lightweight sendBeacon
    const handleUnload = () => {
      if (sentUnloadRef.current || activeSecondsRef.current <= 0) return;
      sentUnloadRef.current = true;

      const blob = new Blob(
        [
          JSON.stringify({
            path: window.location.pathname,
            sessionId: sid,
            activeDurationSeconds: activeSecondsRef.current,
            isPing: true,
          }),
        ],
        { type: "application/json" }
      );
      navigator.sendBeacon("/api/analytics/track", blob);
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);

    return () => {
      clearInterval(timer);
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
      handleUnload();
    };
  }, []);

  return (
    <>
      <Analytics />
    </>
  );
}

export default AnalyticsTracker;
