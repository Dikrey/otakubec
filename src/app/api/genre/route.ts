// import { NextResponse, NextRequest } from "next/server"
// import genreLists from "@/utils/genreLists"

// export async function GET() {
//   const data = await genreLists()
//   return NextResponse.json({ data: data }, { status: 200 })
// }
import { NextResponse } from "next/server"
import genreLists from "@/utils/genreLists"

export async function GET() {
  try {
    // Memanggil fungsi scraper/fetcher
    const data = await genreLists()
    
    return NextResponse.json(
      { success: true, data: data }, 
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error at /api/genre:", error.message);
    const status = error.response?.status || 500;
    const message = status === 403 
      ? "Target server (Otakudesu) blocked the request. Try adding headers or proxy." 
      : "Internal Server Error";

    return NextResponse.json(
      { success: false, message: message }, 
      { status: status }
    )
  }
}