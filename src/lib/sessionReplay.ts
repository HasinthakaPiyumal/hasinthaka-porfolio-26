import { writeFile, readFile, mkdir, readdir, unlink } from "fs/promises";
import path from "path";

const SESSIONS_DIR = path.join(process.cwd(), "src", "data", "sessions");

export interface SessionData {
  sessionId: string;
  ip: string;
  timestamp: string;
  durationSeconds: number;
  events: any[];
}

export async function saveSessionData(sessionId: string, data: Partial<SessionData>): Promise<void> {
  try {
    await mkdir(SESSIONS_DIR, { recursive: true });
    const filePath = path.join(SESSIONS_DIR, `${sessionId}.json`);

    let existingData: SessionData = {
      sessionId,
      ip: data.ip || "Unknown",
      timestamp: data.timestamp || new Date().toISOString(),
      durationSeconds: data.durationSeconds || 0,
      events: [],
    };

    try {
      const raw = await readFile(filePath, "utf-8");
      existingData = JSON.parse(raw);
    } catch {
      // New file
    }

    if (data.events && Array.isArray(data.events)) {
      existingData.events = [...existingData.events, ...data.events];
    }
    if (data.durationSeconds) {
      existingData.durationSeconds = Math.max(existingData.durationSeconds, data.durationSeconds);
    }

    await writeFile(filePath, JSON.stringify(existingData), "utf-8");
  } catch (err) {
    console.error("Error saving session replay data:", err);
  }
}

export async function getSessionData(sessionId: string): Promise<SessionData | null> {
  try {
    const filePath = path.join(SESSIONS_DIR, `${sessionId}.json`);
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}
