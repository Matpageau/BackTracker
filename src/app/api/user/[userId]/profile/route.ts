// /api/user/[userId]/profile/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { getUserProfile } from '@/services/userService'

type Params = {
  params: Promise<{ userId: string }>
}
export async function GET(_: NextRequest, { params }: Params) {
  const data = await getUserProfile((await params).userId)

  if (!data) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}
