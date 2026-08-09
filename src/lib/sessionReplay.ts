import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";
import { Redis } from "@upstash/redis";

const SESSIONS_DIR = path.join(process.cwd(), "src", "data", "sessions");

export interface SessionData {
  sessionId: string;
  ip: string;
  timestamp: string;
  durationSeconds: number;
  events: any[];
}

function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (url && token) {
    try {
      return new Redis({ url, token });
    } catch (err) {
      console.warn("Failed to initialize Redis for session replay:", err);
    }
  }
  return null;
}

export async function saveSessionData(sessionId: string, data: Partial<SessionData>): Promise<void> {
  try {
    const redis = getRedisClient();
    const redisKey = `session:${sessionId}`;

    let existingData: SessionData = {
      sessionId,
      ip: data.ip || "Unknown",
      timestamp: data.timestamp || new Date().toISOString(),
      durationSeconds: data.durationSeconds || 0,
      events: [],
    };

    // Attempt to fetch existing session from Redis or local file
    if (redis) {
      try {
        const cloudSession = await redis.get<SessionData>(redisKey);
        if (cloudSession && cloudSession.events) {
          existingData = cloudSession;
        }
      } catch {}
    } else {
      try {
        const filePath = path.join(SESSIONS_DIR, `${sessionId}.json`);
        const raw = await readFile(filePath, "utf-8");
        existingData = JSON.parse(raw);
      } catch {}
    }

    if (data.events && Array.isArray(data.events)) {
      existingData.events = [...existingData.events, ...data.events];
    }
    if (data.durationSeconds) {
      existingData.durationSeconds = Math.max(existingData.durationSeconds, data.durationSeconds);
    }

    // Cap events to max 800 per session (~200KB max per session payload)
    if (existingData.events.length > 800) {
      const firstSnapshot = existingData.events.slice(0, 2);
      const recentEvents = existingData.events.slice(-798);
      existingData.events = [...firstSnapshot, ...recentEvents];
    }

    // Save to Cloud Redis (persists across Vercel deployments with 24h TTL)
    if (redis) {
      try {
        // Set ex = 86400 (expire after 24h to keep Redis lightweight and fast)
        await redis.set(redisKey, existingData, { ex: 86400 });
      } catch (err) {
        console.warn("Upstash Redis session save error:", err);
      }
    }

    // Backup to local file
    try {
      await mkdir(SESSIONS_DIR, { recursive: true });
      const filePath = path.join(SESSIONS_DIR, `${sessionId}.json`);
      await writeFile(filePath, JSON.stringify(existingData), "utf-8");
    } catch {}
  } catch (err) {
    console.error("Error saving session replay data:", err);
  }
}

export async function getSessionData(sessionId: string): Promise<SessionData | null> {
  const redis = getRedisClient();

  if (redis) {
    try {
      const cloudSession = await redis.get<SessionData>(`session:${sessionId}`);
      if (cloudSession && cloudSession.events) {
        return cloudSession;
      }
    } catch (err) {
      console.warn("Upstash Redis session fetch error, checking local file:", err);
    }
  }

  try {
    const filePath = path.join(SESSIONS_DIR, `${sessionId}.json`);
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}
