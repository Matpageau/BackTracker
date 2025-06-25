// src/app/api/auth/login/route.ts
import { connectToDatabase } from '@/lib/mongoose'
import { User } from '@/models/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
  }

  await connectToDatabase()

  const user = await User.findOne({ email })
  if (!user) {
    return NextResponse.json({ message: 'User not foundd' }, { status: 401 })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return NextResponse.json({ message: 'Wrong password' }, { status: 401 })
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: '7d'}
  );

  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  })

  return NextResponse.json({ message: 'Login successful' }, { status: 200 })
}
