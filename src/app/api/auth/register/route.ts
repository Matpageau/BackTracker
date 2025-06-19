// src/app/api/auth/login/route.ts
import { connectToDatabase } from '@/lib/mongoose'
import { User } from '@/models/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const { email, password, userName, fullName } = await request.json()

  if (!email || !password || !userName || !fullName ) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
  }

  await connectToDatabase()

  const existingUser = await User.findOne({ 
    $or: [{ email }, { userName }]
  })

  if (existingUser) {
    return NextResponse.json({ message: 'E-mail or username already used' }, { status: 409 })
  }

  const cryptedPassword = await bcrypt.hash(password, 10)

  await User.create({
    email,
    password: cryptedPassword,
    userName,
    fullName
  })

  return NextResponse.json({ message: 'User registered successfully'}, { status: 201 })
}
