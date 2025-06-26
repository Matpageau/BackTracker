"use client"
import MapClient from '@/components/Map/MapGeneral'
import NewStepModal from '@/components/Posts/NewPost/Modals/NewStepModal'
import AddStepBtn from '@/components/Publish/AddStepBtn'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { PostType } from '@/types/post'
import mongoose from 'mongoose'
import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type PageProps = {
  params: Promise<{ postId: string }>
}

export default function Publish({ params }: PageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [post, setPost] = useState<PostType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { postId } = await params
      
        if(!mongoose.Types.ObjectId.isValid(postId)) {
          notFound()
        }
      
        const resPost = await fetch(`/api/post/${postId}`, {
          method: "GET"
        })
        setPost(await resPost.json())

        const user = await getCurrentUser()
      
        if(!post || (post.owner_id.toString() != user?._id)) notFound()
      } catch {
        notFound()
      }
    }

    fetchData()
  }, [])

  if(!post) return notFound()

  return (
    <>
      {isModalOpen && 
        <NewStepModal 
          postId={post._id.toString()}
          onSave={() => setIsModalOpen(false)}
        />
      }
      <div className='flex w-full p-10'>
        <div className='w-1/3'>
          <div className='bg-neutral-800 rounded-md p-3'>
            <input 
              type="text"
              placeholder='Description'
              className='w-full'
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
    </>
  )
}
