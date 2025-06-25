import { connectToDatabase } from '@/lib/mongoose'
import { User } from '@/models/User'
import { NextResponse } from 'next/server'

type Params = {
  params: Promise<{ username: string }>
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectToDatabase()

    const { username } = (await params)

    const user = await User.findOne({ username })
      .select("_id")
      .lean()
    
    if(!user) {
      return NextResponse.json({ message: "User not founddd" }, { status: 404 })
    }
    
    return NextResponse.json(user, { status: 200 })

  } catch (err) {
    console.error("Erreur API /user/[username]:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
