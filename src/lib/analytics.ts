import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

export interface VisitorLog {
  id: string;
  timestamp: string;
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  path: string;
  browser: string;
  os: string;
  device: "Desktop" | "Mobile" | "Tablet";
  referrer: string;
  sessionId?: string;
  activeDurationSeconds?: number;
}

export interface AnalyticsStore {
  totalViews: number;
  logs: VisitorLog[];
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");

const defaultStore: AnalyticsStore = {
  totalViews: 0,
  logs: [],
};

export async function getAnalyticsStore(): Promise<AnalyticsStore> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    const fileData = await readFile(ANALYTICS_FILE, "utf-8");
    const parsed = JSON.parse(fileData);
    return {
      totalViews: parsed.totalViews || 0,
      logs: Array.isArray(parsed.logs) ? parsed.logs : [],
    };
  } catch {
    return defaultStore;
  }
}

export async function saveAnalyticsStore(store: AnalyticsStore): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    // Keep last 1000 logs to keep store lightweight and fast
    const trimmedStore: AnalyticsStore = {
      totalViews: store.totalViews,
      logs: store.logs.slice(0, 1000),
    };
    await writeFile(ANALYTICS_FILE, JSON.stringify(trimmedStore, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving analytics store:", err);
  }
}

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0s";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

export function parseUserAgent(ua: string) {
  let browser = "Unknown Browser";
  let os = "Unknown OS";
  let device: "Desktop" | "Mobile" | "Tablet" = "Desktop";

  if (!ua) return { browser, os, device };

  // Detect Device
  if (/mobile/i.test(ua)) device = "Mobile";
  else if (/ipad|tablet/i.test(ua)) device = "Tablet";

  // Detect OS
  if (/windows/i.test(ua)) os = "Windows";
  else if (/macintosh|mac os/i.test(ua)) os = "macOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/linux/i.test(ua)) os = "Linux";

  // Detect Browser
  if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
  else if (/opera|opr/i.test(ua)) browser = "Opera";

  return { browser, os, device };
}
