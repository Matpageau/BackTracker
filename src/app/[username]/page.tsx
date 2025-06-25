import ItemGrid from '@/components/Profile/ItemGrid'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import MapClient from '@/components/Map/MapGeneral'
import { BookImage, SquarePen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { UserType } from '@/types/user'
import { PostType } from '@/types/post'
import { getCurrentUser } from '@/lib/getCurrentUser'

interface PageProps {
  params: Promise<{ 
    username: string 
  }>
}

export default async function Profil({ params }: PageProps) {
  const username = (await params).username

  const [currentUser, resUser] = await Promise.all([
    getCurrentUser(),
    fetch(`http://localhost:3000/api/user/by-username/${username}`, {
      cache: "force-cache"
    })
  ])

  if (!resUser.ok) return notFound()
  const user = await resUser.json() as UserType
  
  const resUserProfile = await fetch(`http://localhost:3000/api/user/${user._id}/profile`, {
    cache: "force-cache"
  })
  if (!resUserProfile.ok) return notFound()
  const posts = await resUserProfile.json() as PostType[]
  
  
  return (
    <div className='flex w-full p-10'>
      <div className='flex w-1/2'>
        <div className='w-full '>
          <div className='p-10 border-b-1 border-neutral-700'>
            <div className='flex'>
              <div className='w-1/3'>
                <Image 
                  src={user.profileImg ?? "/defautProfile.jpg"}
                  alt='profile picture'
                  width={120}
                  height={120}
                  className='rounded-full'
                />
              </div>
              <div className='flex flex-col w-2/3 justify-between'>
                <p className='text-2xl'>{user.username}</p>
                <div className='flex gap-10'>
                  <p><strong>{posts.length}</strong> Travel{posts.length > 1 ? "s" : ""}</p>
                  <p><strong>{posts.length}</strong> km travelled{posts.length > 1 ? "s" : ""}</p>
                  <p><strong>{posts.length}</strong> follower{posts.length > 1 ? "s" : ""}</p>
                  <p><strong>{posts.length}</strong> following</p>
                </div>
                <p>{user.bio}</p>
              </div>
            </div>
          </div>
          <div>
            {user._id == currentUser?._id &&
              <div className='flex justify-center gap-50 mt-3'>
                <Link href={`/${user.username}`}>
                  <BookImage className='bg-[var(--main)] p-2 rounded' height={40} width={40}/>
                </Link>
                <SquarePen className='p-2 rounded' height={40} width={40}/>
              </div>
            }
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
