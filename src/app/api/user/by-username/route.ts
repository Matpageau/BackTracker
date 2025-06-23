import { connectToDatabase } from '@/lib/mongoose'
import { User } from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  await connectToDatabase()

  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ message: "Username is required" }, { status: 400 })
  }

  const user = await User.findOne({ userName: username.toLowerCase() })

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ userId: user._id })
}
