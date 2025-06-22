// src/lib/getCurrentUser.ts
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { User } from "@/models/User"
import { connectToDatabase } from "@/lib/mongoose"
import { UserType } from "@/types/user"

export async function getCurrentUser(): Promise<UserType | null> {
  const cookieStore = cookies()
  const token = (await cookieStore).get("token")?.value

  if (!token) return null

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    await connectToDatabase()

    const user = await User.findById(userId)
      .select("-password")
      .lean()

    if (!user) return null

    return user
  } catch (err) {
    console.error("Invalid token", err)
    return null
  }
}
