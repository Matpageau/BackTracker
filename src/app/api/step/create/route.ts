import { connectToDatabase } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { Step } from "@/models/Step";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase()
  const body = await req.json()
  
  const { lng, lat, medias, description, postId } = body

  if(!postId) {
    return NextResponse.json({ message: "postId is required"}, { status: 400 })
  }

  const newStep = await Step.create({
    post_id: postId,
    lng,
    lat,
    medias,
    description
  })

  await Post.findByIdAndUpdate(postId, {
    $push: { steps: newStep._id}
  })

  return NextResponse.json(newStep)
}