// import { NextResponse, NextRequest } from "next/server"
// import episode from "@/utils/episode";

// export async function GET(request: NextRequest, props: { params: Promise<{ slug: string; episode: number }> }) {
//   const params = await props.params;
//   const urlParts = request.url.split("/")
//   const animeSlug = urlParts[5]
//   const data = await episode({ animeSlug: animeSlug, episodeNumber: params.episode })
//   return NextResponse.json({ data: data }, { status: 200 })
// }


import { NextResponse, NextRequest } from "next/server";
import episode from "@/utils/episode";

export async function GET(
  request: NextRequest, 
  context: { params: Promise<{ slug: string; episode: string }> }
) {
  try {
    const params = await context.params;
    const animeSlug = params.slug;
 
    const episodeNumber = parseInt(params.episode, 10);

    if (isNaN(episodeNumber)) {
      return NextResponse.json(
        { success: false, message: "Invalid episode number" },
        { status: 400 }
      );
    }

    const data = await episode({ 
      animeSlug: animeSlug, 
      episodeNumber: episodeNumber 
    });


    if (!data) {
      return NextResponse.json(
        { success: false, message: "Episode data not found or blocked by target" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: data }, { status: 200 });

  } catch (error: any) {
    console.error("Route Error [/api/anime/slug/episodes/num]:", error.message);
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal Server Error",
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}