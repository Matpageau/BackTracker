import { Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

type MediaGalleryProps = {
  onUpdate: (medias: string[]) => void
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ onUpdate }) => {
  const [medias, setMedias] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newUrls = Array.from(files).map(file => URL.createObjectURL(file))
    setMedias(prev => {
      const updated = [...prev, ...newUrls]
      onUpdate(updated)
      return updated
    })
  }

  return (
    <div className='grid grid-cols-3 gap-4 overflow-y-auto'>
      <div className="relative aspect-square border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center hover:bg-gray-100 transition">
        <label className='flex flex-col items-center justify-center text-gray-500 cursor-pointer h-full w-full'>
          <Plus />
          <span>Add medias</span>
          <input 
            type='file'
            onChange={handleFileChange}
            multiple
            accept='image/*'
            className='hidden'
          />
        </label>
      </div>

      {medias.map((media, index) => (
        <div key={index} className="flex relative rounded-xl aspect-square overflow-hidden shadow-md hover:shadow-lg transition items-center justify-center bg-white">
          <Image 
            src={media}
            alt={`Step photo ${index + 1}`}
            unoptimized
            width={300}
            height={300}
          />
        </div>
      ))}
    </div>
  )
}

export default MediaGallery
