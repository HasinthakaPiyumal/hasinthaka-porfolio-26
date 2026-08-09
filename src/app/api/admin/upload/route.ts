import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const inputBytes = await file.arrayBuffer();
    const inputBuffer = Buffer.from(inputBytes);

    // Convert any image (PNG, JPG, JPEG, GIF, WEBP) to WebP format using sharp
    let webpBuffer: Buffer;
    try {
      webpBuffer = await sharp(inputBuffer)
        .webp({ quality: 85, effort: 4 })
        .toBuffer();
    } catch (conversionError) {
      console.warn("Sharp WebP conversion fallback:", conversionError);
      webpBuffer = inputBuffer;
    }

    // Replace extension with .webp
    const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9.-]/g, "_");
    const webpFileName = `${Date.now()}-${baseName}.webp`;
    const blobPathName = `portfolio/${webpFileName}`;

    // Upload to Vercel Blob Storage if configured or running on Vercel
    if (process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL) {
      try {
        const blob = await put(blobPathName, webpBuffer, {
          access: "public",
          contentType: "image/webp",
        });
        return NextResponse.json({ url: blob.url, success: true, storage: "vercel-blob", format: "webp" });
      } catch (blobErr) {
        console.warn("Vercel Blob storage upload failed, falling back to local file storage:", blobErr);
      }
    }

    // Local development fallback
    const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, webpFileName);
    await writeFile(filePath, webpBuffer);

    const publicUrl = `/images/uploads/${webpFileName}`;
    return NextResponse.json({ url: publicUrl, success: true, storage: "local", format: "webp" });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
