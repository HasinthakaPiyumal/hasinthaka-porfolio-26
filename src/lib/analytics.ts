import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";
import { Redis } from "@upstash/redis";

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
const REDIS_ANALYTICS_KEY = "portfolio_analytics";

const defaultStore: AnalyticsStore = {
  totalViews: 0,
  logs: [],
};

function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (url && token) {
    try {
      return new Redis({ url, token });
    } catch (err) {
      console.warn("Failed to initialize Redis for analytics:", err);
    }
  }
  return null;
}

export async function getAnalyticsStore(): Promise<AnalyticsStore> {
  const redis = getRedisClient();

  if (redis) {
    try {
      const data = await redis.get<AnalyticsStore>(REDIS_ANALYTICS_KEY);
      if (data && typeof data.totalViews === "number") {
        return {
          totalViews: data.totalViews || 0,
          logs: Array.isArray(data.logs) ? data.logs : [],
        };
      }
    } catch (err) {
      console.warn("Upstash Redis analytics fetch error, falling back to local file:", err);
    }
  }

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
  const trimmedStore: AnalyticsStore = {
    totalViews: store.totalViews,
    logs: store.logs.slice(0, 1000),
  };

  const redis = getRedisClient();

  if (redis) {
    try {
      await redis.set(REDIS_ANALYTICS_KEY, trimmedStore);
    } catch (err) {
      console.warn("Upstash Redis analytics save error:", err);
    }
  }

  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(ANALYTICS_FILE, JSON.stringify(trimmedStore, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving local analytics file:", err);
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
