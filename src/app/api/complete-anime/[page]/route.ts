// import { NextResponse, NextRequest } from "next/server"
// import completeAnime from "@/utils/completeAnime";

// export async function GET(request: NextRequest, props: { params: Promise<{ page: number }> }) {
//   const params = await props.params;
//   const data = await completeAnime(params.page)
//   return NextResponse.json({ data: data }, { status: 200 })
// }

import { NextResponse, NextRequest } from "next/server"
import completeAnime from "@/utils/completeAnime";

export async function GET(
  request: NextRequest, 
  context: { params: Promise<{ page: string }> }
) {
  const params = await context.params;
  const pageNumber = Number(params.page);
  const data = await completeAnime(isNaN(pageNumber) ? 1 : pageNumber);

  return NextResponse.json({ data: data }, { status: 200 });
}
