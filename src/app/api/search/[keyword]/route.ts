// app/api/search/[keyword]/route.ts
import { NextResponse } from "next/server";
import search from "@/utils/search";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ keyword: string }> }
) {
  try {
    const { keyword } = await params;
    if (!keyword) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }

    const data = await search(keyword.trim());
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: unknown) {
    console.error("API Error:", error);

    // Hindari kebocoran error internal ke client
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
