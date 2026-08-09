"use client";

import { useEffect, useRef } from "react";

export function SessionRecorder() {
  const sessionIdRef = useRef<string | null>(null);
  const eventsRef = useRef<any[]>([]);
  const startTimeRef = useRef<number>(Date.now());

  const sendCurrentEvents = () => {
    if (eventsRef.current.length > 0 && sessionIdRef.current) {
      const eventsToSend = [...eventsRef.current];
      eventsRef.current = [];
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

      fetch("/api/analytics/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          events: eventsToSend,
          durationSeconds: duration,
        }),
      }).catch(() => {});
    }
  };

  useEffect(() => {
    let sid = sessionStorage.getItem("portfolio_session_id");
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem("portfolio_session_id", sid);
    }
    sessionIdRef.current = sid;

    let stopRecording: (() => void) | undefined;

    const initRrweb = async () => {
      try {
        const rrweb = await import("rrweb");
        stopRecording = rrweb.record({
          emit(event) {
            eventsRef.current.push(event);
          },
          maskInputOptions: { password: true },
          checkoutEveryNms: 30000,
          sampling: {
            mousemove: 100, // Sample cursor moves every 100ms (Reduces size by 70%)
            scroll: 150, // Sample scroll events every 150ms
            input: "last",
          },
        });

        // Flush initial snapshot quickly after 1.5 seconds so player gets DOM tree
        setTimeout(() => {
          sendCurrentEvents();
        }, 1500);
      } catch (err) {
        console.warn("Failed to initialize rrweb session recorder:", err);
      }
    };

    // Start recording
    initRrweb();

    // Periodically send recorded event chunks every 5 seconds
    const interval = setInterval(() => {
      sendCurrentEvents();
    }, 5000);

    // Send remaining events on page unload
    const handleUnload = () => {
      if (eventsRef.current.length > 0 && sessionIdRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const blob = new Blob(
          [
            JSON.stringify({
              sessionId: sessionIdRef.current,
              events: eventsRef.current,
              durationSeconds: duration,
            }),
          ],
          { type: "application/json" }
        );
        navigator.sendBeacon("/api/analytics/session", blob);
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
      sendCurrentEvents();
      if (stopRecording) stopRecording();
    };
  }, []);

  return null;
}

export default SessionRecorder;
