import { connectToDatabase } from '@/lib/mongoose'
import { Follow } from '@/models/Follow'
import { Post } from '@/models/Post'
import { User } from '@/models/User'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{ username: string }>
}

export default async function Profil({ params }: PageProps) {
  const { username } = await params

  await connectToDatabase()
  const user = await User.findOne({ userName: username.toLowerCase() })

  if (!user) {
    notFound()
  }

  const posts = await Post.find({ owner: user._id })
  const followerCount = await Follow.countDocuments({ followed_user_id: user._id })
  const followingCount = await Follow.countDocuments({ following_user_id: user._id })

  return (
    <div className='flex p-10'>
      <div className='flex w-1/2 p-10'>
        <div className='w-full'>
          <div className='flex'>
            <div className='w-1/3'>
              <Image 
                src={user.profileImg ?? "/defautProfile.jpg"}
                alt='profile picture'
                width={100}
                height={100}
                className='rounded-full'
              />
            </div>
            <div className='w-2/3'>
              <div>
                <p className='text-2xl'>{user.userName}</p>
              </div>
              <div className='flex gap-10'>
                <p><strong>{posts.length}</strong> Travel{posts.length > 1 ? "s" : ""}</p>
                <p><strong>{followerCount}</strong> follower{followerCount > 1 ? "s" : ""}</p>
                <p><strong>{followingCount}</strong> following</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-1/2'>
        <p>a</p>
      </div>
    </div>
  )
}
