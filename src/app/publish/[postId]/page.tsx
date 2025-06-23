import MapClient from '@/components/MapClient/MapClient'
import AddStepBtn from '@/components/Publish/AddStepBtn'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { Post } from '@/models/Post'
import mongoose from 'mongoose'
import { notFound } from 'next/navigation'
import React from 'react'

type PageProps = {
  params: Promise<{ postId: string }>
}

export default async function Publish({ params }: PageProps) {
  const { postId } = await params

  if(!mongoose.Types.ObjectId.isValid(postId)) {
    notFound()
  }

  const post = await Post.findById(postId)
  const user = await getCurrentUser()

  if(!post || (post.owner_id.toString() != user?._id)) notFound()

  return (
    <div className='flex w-full p-10'>
      <div className='w-1/3'>
        <div className='bg-neutral-800 rounded-md p-3'>
          <input 
            type="text"
            placeholder='Name'
          />
        </div>
        <div className='flex justify-center mt-3'>
          <AddStepBtn />
          
        </div>
      </div>
      <div className='w-2/3 ml-10 h-full'>
        <MapClient />
      </div>
    </div>
  )
}
