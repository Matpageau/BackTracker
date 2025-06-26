import { connectToDatabase } from '@/lib/mongoose'
import { Post } from '@/models/Post'
import { NextResponse } from 'next/server'

type Params = {
  params: Promise<{ postId: string }>
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectToDatabase()

    const { postId } = (await params)

    const post = await Post.findById(postId)
      .lean()
    
    return NextResponse.json(post, { status: 200 })

  } catch (err) {
    console.error("Erreur API /post/[userId]:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
