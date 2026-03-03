// import { NextResponse, NextRequest } from "next/server"
// import ongoingAnime from "@/utils/ongoingAnime";

// export async function GET(request: NextRequest, props: { params: Promise<{ id: number }> }) {
//   const params = await props.params;
//   const data = await ongoingAnime(params.id)
//   return NextResponse.json({ data: data }, { status: 200 })
// }
import { NextResponse, NextRequest } from "next/server"
import ongoingAnime from "@/utils/ongoingAnime";

export async function GET(
  request: NextRequest, 
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const idNumber = parseInt(params.id, 10);
  const data = await ongoingAnime(idNumber);

  return NextResponse.json({ data: data }, { status: 200 });
}
