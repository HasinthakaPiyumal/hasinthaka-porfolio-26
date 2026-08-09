import { NextResponse } from "next/server";
import { getAnalyticsStore } from "@/lib/analytics";

export async function GET() {
  try {
    const store = await getAnalyticsStore();

    const totalViews = store.totalViews;
    const logs = store.logs;

    // Unique IPs
    const uniqueIPsSet = new Set(logs.map((l) => l.ip));
    const uniqueVisitors = uniqueIPsSet.size;

    // Today's Views
    const todayStr = new Date().toISOString().split("T")[0];
    const todayViews = logs.filter((l) => l.timestamp.startsWith(todayStr)).length;

    // Active Time Aggregation
    let totalActiveDurationSum = 0;

    // Group logs by IP address into Collapsed Visitor Profiles
    const visitorMap = new Map<string, any>();

    logs.forEach((l) => {
      const duration = l.activeDurationSeconds || 0;
      totalActiveDurationSum += duration;

      if (!visitorMap.has(l.ip)) {
        visitorMap.set(l.ip, {
          ip: l.ip,
          country: l.country || "Unknown Country",
          countryCode: l.countryCode || "LK",
          city: l.city || "Unknown City",
          region: l.region || "",
          browser: l.browser || "Chrome",
          os: l.os || "Windows",
          device: l.device || "Desktop",
          latestTimestamp: l.timestamp,
          firstTimestamp: l.timestamp,
          totalVisits: 1,
          totalActiveDuration: duration,
          visits: [{ id: l.id, timestamp: l.timestamp, path: l.path, referrer: l.referrer, sessionId: l.sessionId, activeDurationSeconds: duration }],
        });
      } else {
        const existing = visitorMap.get(l.ip);
        existing.totalVisits += 1;
        existing.totalActiveDuration += duration;
        existing.visits.push({ id: l.id, timestamp: l.timestamp, path: l.path, referrer: l.referrer, sessionId: l.sessionId, activeDurationSeconds: duration });
        if (new Date(l.timestamp) > new Date(existing.latestTimestamp)) {
          existing.latestTimestamp = l.timestamp;
        }
        if (new Date(l.timestamp) < new Date(existing.firstTimestamp)) {
          existing.firstTimestamp = l.timestamp;
        }
      }
    });

    const avgActiveDuration = uniqueVisitors > 0 ? Math.round(totalActiveDurationSum / uniqueVisitors) : 0;

    const groupedVisitors = Array.from(visitorMap.values()).sort(
      (a, b) => new Date(b.latestTimestamp).getTime() - new Date(a.latestTimestamp).getTime()
    );

    // Top Countries
    const countryCounts: Record<string, { count: number; code: string }> = {};
    logs.forEach((l) => {
      const cName = l.country || "Unknown Country";
      if (!countryCounts[cName]) {
        countryCounts[cName] = { count: 0, code: l.countryCode || "LK" };
      }
      countryCounts[cName].count += 1;
    });

    const topCountries = Object.entries(countryCounts)
      .map(([name, data]) => ({
        country: name,
        code: data.code,
        count: data.count,
        percentage: Math.round((data.count / (logs.length || 1)) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top Cities
    const cityCounts: Record<string, { count: number; country: string }> = {};
    logs.forEach((l) => {
      const cityKey = `${l.city || "Unknown City"}, ${l.country || ""}`;
      if (!cityCounts[cityKey]) {
        cityCounts[cityKey] = { count: 0, country: l.country };
      }
      cityCounts[cityKey].count += 1;
    });

    const topCities = Object.entries(cityCounts)
      .map(([location, data]) => ({
        location,
        count: data.count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Device breakdown
    const deviceCounts: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
    logs.forEach((l) => {
      const dev = l.device || "Desktop";
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;
    });

    // Browser breakdown
    const browserCounts: Record<string, number> = {};
    logs.forEach((l) => {
      const b = l.browser || "Chrome";
      browserCounts[b] = (browserCounts[b] || 0) + 1;
    });

    const topBrowsers = Object.entries(browserCounts)
      .map(([browser, count]) => ({ browser, count }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      success: true,
      totalViews,
      uniqueVisitors,
      todayViews,
      avgActiveDuration,
      topCountries,
      topCities,
      deviceCounts,
      topBrowsers,
      groupedVisitors,
      recentLogs: logs.slice(0, 50),
    });
  } catch (error) {
    console.error("Error in admin analytics route:", error);
    return NextResponse.json({ success: false, error: "Failed to load analytics" }, { status: 500 });
  }
}
