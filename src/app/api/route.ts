import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json([{
    message: "Otakudesu unofficial API, powered by Visualcodepo",
    GitHub: "https://github.com/Dikrey",
    Support: "https://linktr.ee/visualcodepo",
  },],
    { status: 200 }
  )
}
