// import { NextResponse, NextRequest } from "next/server"
// import episode from "@/utils/episode";

// export async function GET(request: NextRequest, props: { params: Promise<{ slug: string; episode: number }> }) {
//   const params = await props.params;
//   const urlParts = request.url.split("/")
//   const animeSlug = urlParts[5]
//   const data = await episode({ animeSlug: animeSlug, episodeNumber: params.episode })
//   return NextResponse.json({ data: data }, { status: 200 })
// }


import { NextResponse, NextRequest } from "next/server"
import episode from "@/utils/episode";

export async function GET(
  request: NextRequest, 
  context: { params: Promise<{ slug: string; episode: string }> }
) {
  const params = await context.params;
  const animeSlug = params.slug;
  const episodeNumber = parseInt(params.episode, 10);
  const data = await episode({ 
    animeSlug: animeSlug, 
    episodeNumber: episodeNumber 
  });

  return NextResponse.json({ data: data }, { status: 200 });
}
