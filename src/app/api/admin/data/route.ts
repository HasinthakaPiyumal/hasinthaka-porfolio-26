import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPortfolioDataAsync, savePortfolioDataAsync } from "@/lib/data";
import { revalidatePath } from "next/cache";

export async function GET() {
  const data = await getPortfolioDataAsync();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const success = await savePortfolioDataAsync(body);

    if (success) {
      revalidatePath("/");
      return NextResponse.json({ success: true, message: "Data saved successfully" });
    } else {
      return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
  }
}
