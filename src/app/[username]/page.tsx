import ItemGrid from '@/components/Profile/ItemGrid'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import MapClient from '@/components/MapClient/MapClient'
import { BookImage, SquarePen } from 'lucide-react'
import Link from 'next/link'
import { getUserIdFromUsername } from '@/lib/getUserIdByUsername'
import { getUserPosts, getUserProfile } from '@/services/userService'

type PageProps = {
  params: Promise<{ username: string }>
}

export default async function Profil({ params }: PageProps) {
  const { username } = await params

  const userId = await getUserIdFromUsername(username)
  if (!userId) return notFound()

  const [profile, posts] = await Promise.all([
    getUserProfile(userId),
    getUserPosts(userId)
  ])

  if (!profile) return notFound()
  
  return (
    <div className='flex w-full p-10'>
      <div className='flex w-1/2'>
        <div className='w-full '>
          <div className='p-10 border-b-1 border-neutral-700'>
            <div className='flex'>
              <div className='w-1/3'>
                <Image 
                  src={profile.user.profileImg ?? "/defautProfile.jpg"}
                  alt='profile picture'
                  width={120}
                  height={120}
                  className='rounded-full'
                />
              </div>
              <div className='flex flex-col w-2/3 justify-between'>
                <p className='text-2xl'>{profile.user.userName}</p>
                <div className='flex gap-10'>
                  <p><strong>{profile.stats.postsCount}</strong> Travel{profile.stats.postsCount > 1 ? "s" : ""}</p>
                  <p><strong>{profile.stats.postsCount}</strong> km travelled{profile.stats.postsCount > 1 ? "s" : ""}</p>
                  <p><strong>{profile.stats.followerCount}</strong> follower{profile.stats.followerCount > 1 ? "s" : ""}</p>
                  <p><strong>{profile.stats.followingCount}</strong> following</p>
                </div>
                <p>{profile.user.bio}</p>
              </div>
            </div>
          </div>
          <div>
            <div className='flex justify-center gap-50 mt-3'>
              <Link href={`/${profile.user.userName}`}>
                <BookImage className='bg-[var(--main)] p-2 rounded' height={40} width={40}/>
              </Link>
              <SquarePen className='p-2 rounded' height={40} width={40}/>
            </div>
            <ItemGrid items={posts}/>
          </div>
        </div>
      </div>
      <div className='w-1/2 ml-5 h-full'>
        <MapClient />
      </div>
    </div>
  )
}
