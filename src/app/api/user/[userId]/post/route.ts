import { getUserPosts } from "@/services/userService"
import { NextRequest, NextResponse } from "next/server"

type Params = { 
  params: Promise<{ userId: string }> 
}

export async function GET(_: NextRequest, { params }: Params) {
 const data = await getUserPosts((await params).userId)

  if(!data) {
    return NextResponse.json({ message: "No posts found" }, { status: 404 })
  }

  return NextResponse.json(data)
}