import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectToDatabase } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST() {
  await connectToDatabase()

  const user = await getCurrentUser()

  if(!user) {
    return NextResponse.json({ message: "User not found"}, { status: 404 })
  }

  const newPost = await Post.create({
    owner_id: user?._id,
    photos: [],
    steps: [],
    tags: [],
    status: "draft"
  })

  return NextResponse.json(
    { 
      message: "Post created successfully",
      postId: newPost._id.toString()
    },
    { status: 201 }
  )
}