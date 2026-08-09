import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const sanitizedFileName = `portfolio/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // Upload to Vercel Blob Storage if BLOB_READ_WRITE_TOKEN is configured or running on Vercel
    if (process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL) {
      try {
        const blob = await put(sanitizedFileName, file, {
          access: "public",
        });
        return NextResponse.json({ url: blob.url, success: true, storage: "vercel-blob" });
      } catch (blobErr) {
        console.warn("Vercel Blob storage upload failed, falling back to local file storage:", blobErr);
      }
    }

    // Local development fallback
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "images", "experience");
    await mkdir(uploadsDir, { recursive: true });

    const localFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadsDir, localFileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/images/experience/${localFileName}`;
    return NextResponse.json({ url: publicUrl, success: true, storage: "local" });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
