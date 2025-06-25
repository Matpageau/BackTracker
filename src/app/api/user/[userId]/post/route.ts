import { connectToDatabase } from '@/lib/mongoose'
import { Post } from '@/models/Post'
import { NextResponse } from 'next/server'

type Params = {
  params: Promise<{ userId: string }>
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectToDatabase()

    const { userId } = (await params)

    const posts = await Post.find({ owner_id: userId })
      .lean()
    
    return NextResponse.json(posts, { status: 200 })

  } catch (err) {
    console.error("Erreur API /user/[userId]/post:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
