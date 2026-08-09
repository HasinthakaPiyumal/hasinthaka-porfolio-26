import { NextResponse } from "next/server";
import { saveSessionData } from "@/lib/sessionReplay";

export async function POST(request: Request) {
  try {
    let body: any = {};
    const rawText = await request.text();

    if (rawText) {
      try {
        body = JSON.parse(rawText);
      } catch {
        console.warn("Failed to parse session body JSON");
      }
    }

    const { sessionId, events, durationSeconds } = body;

    if (!sessionId || !events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid session payload" }, { status: 400 });
    }

    const headers = request.headers;
    const forwardedFor = headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : headers.get("x-real-ip") || "127.0.0.1";

    await saveSessionData(sessionId, {
      sessionId,
      ip,
      durationSeconds: durationSeconds || 0,
      events,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in session recording API:", error);
    return NextResponse.json({ success: false, error: "Failed to record session" }, { status: 500 });
  }
}
