import { NextResponse } from "next/server";
import { getSessionData } from "@/lib/sessionReplay";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    const sessionData = await getSessionData(sessionId);

    if (!sessionData) {
      return NextResponse.json({ error: "Session replay not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, session: sessionData });
  } catch (error) {
    console.error("Error fetching session replay:", error);
    return NextResponse.json({ error: "Failed to load session" }, { status: 500 });
  }
}
