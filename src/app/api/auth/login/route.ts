// src/app/api/auth/login/route.ts
import { connectToDatabase } from '@/lib/mongoose'
import { User } from '@/models/User'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
  }

  await connectToDatabase()

  const user = await User.findOne({ email })
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 401 })
  }

  //Decrypter le password

  if (user.password !== password) {
    return NextResponse.json({ message: 'Wrong password' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Login successful' }, { status: 200 })
}
