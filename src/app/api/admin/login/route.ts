import { NextResponse } from "next/server";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "hex");
    const bufB = Buffer.from(b, "hex");
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ success: false, message: "Password is required" }, { status: 400 });
    }

    // Read SHA-256 hash from process.env.ADMIN_PASSWORD_HASH
    // Default fallback SHA-256 hash for 'admin123'
    const targetHash =
      process.env.ADMIN_PASSWORD_HASH ||
      "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

    const inputHash = hashPassword(password.trim());

    if (safeCompare(inputHash, targetHash.trim())) {
      const response = NextResponse.json({ success: true, message: "Authenticated successfully" });

      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
