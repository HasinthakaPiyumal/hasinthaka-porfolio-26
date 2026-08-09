import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPortfolioDataAsync, savePortfolioDataAsync } from "@/lib/data";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET() {
  const data = await getPortfolioDataAsync();
  return NextResponse.json(data, { headers: noCacheHeaders });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: noCacheHeaders });
  }

  try {
    const body = await request.json();
    const success = await savePortfolioDataAsync(body);

    if (success) {
      revalidatePath("/", "layout");
      revalidatePath("/admin/about");
      return NextResponse.json(
        { success: true, message: "Data saved successfully" },
        { headers: noCacheHeaders }
      );
    } else {
      return NextResponse.json({ error: "Failed to save data" }, { status: 500, headers: noCacheHeaders });
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid data format" }, { status: 400, headers: noCacheHeaders });
  }
}

