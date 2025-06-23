// /lib/userService.ts
import { User } from "@/models/User"
import { Post } from "@/models/Post"
import { Follow } from "@/models/Follow"
import { connectToDatabase } from "@/lib/mongoose"

export async function getUserProfile(userId: string) {
  await connectToDatabase()

  const user = await User.findById(userId).lean()
  if (!user) return null

  const [postsCount, followerCount, followingCount] = await Promise.all([
    Post.countDocuments({ owner_id: user._id }),
    Follow.countDocuments({ followed_user_id: user._id }),
    Follow.countDocuments({ following_user_id: user._id }),
  ])

  return {
    user,
    stats: { postsCount, followerCount, followingCount }
  }
}

export async function getUserPosts(userId: string) {
  await connectToDatabase()

  return await Post.find({ owner_id: userId }).sort({ createdAt: -1}).lean()
}
