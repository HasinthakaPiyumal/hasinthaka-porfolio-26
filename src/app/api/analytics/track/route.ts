import { NextResponse } from "next/server";
import { getAnalyticsStore, saveAnalyticsStore, parseUserAgent, VisitorLog } from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    let body: any = {};
    const rawText = await request.text();
    if (rawText) {
      try {
        body = JSON.parse(rawText);
      } catch {}
    }

    const headers = request.headers;

    // Extract IP Address from headers
    const forwardedFor = headers.get("x-forwarded-for");
    const realIp = headers.get("x-real-ip");
    const cfConnectingIp = headers.get("cf-connecting-ip");

    let ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || cfConnectingIp || "127.0.0.1";
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "127.0.0.1 (Localhost)";
    }

    // Extract Vercel Edge Geo Location Headers
    const country = headers.get("x-vercel-ip-country") || body.country || "Unknown Country";
    const countryCode = headers.get("x-vercel-ip-country-region") || body.countryCode || "LK";
    const city = headers.get("x-vercel-ip-city") || body.city || "Unknown City";
    const region = headers.get("x-vercel-ip-country-region") || body.region || "";

    const userAgentStr = headers.get("user-agent") || "";
    const { browser, os, device } = parseUserAgent(userAgentStr);

    const path = body.path || "/";
    const referrer = body.referrer || headers.get("referer") || "Direct";
    const sessionId = body.sessionId || null;
    const activeDurationSeconds = body.activeDurationSeconds || 0;

    const store = await getAnalyticsStore();

    // If an update payload is sent for an existing active session log
    if (body.isPing && sessionId) {
      const existingIndex = store.logs.findIndex((l) => l.sessionId === sessionId);
      if (existingIndex !== -1) {
        store.logs[existingIndex].activeDurationSeconds = Math.max(
          store.logs[existingIndex].activeDurationSeconds || 0,
          activeDurationSeconds
        );
        await saveAnalyticsStore(store);
        return NextResponse.json({ success: true, updated: true });
      }
    }

    const newLog: VisitorLog = {
      id: `vis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      ip,
      country: decodeURIComponent(country),
      countryCode: countryCode.toUpperCase(),
      city: decodeURIComponent(city),
      region: decodeURIComponent(region),
      path,
      browser,
      os,
      device,
      referrer,
      sessionId,
      activeDurationSeconds,
    };

    store.totalViews += 1;
    store.logs.unshift(newLog);

    await saveAnalyticsStore(store);

    return NextResponse.json({ success: true, trackingId: newLog.id });
  } catch (error) {
    console.error("Error in analytics tracking route:", error);
    return NextResponse.json({ success: false, error: "Tracking failed" }, { status: 500 });
  }
}
