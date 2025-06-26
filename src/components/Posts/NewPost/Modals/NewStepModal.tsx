"use client"
import MapPinSelector from '@/components/Map/MapPinSelector'
import React, { useCallback, useState } from 'react'
import MediaGallery from '../MediaGallery/MediaGallery'

type NewStepModalProps = {
  postId: string
  onSave: () => void
}

const NewStepModal: React.FC<NewStepModalProps> = ({ postId, onSave }) => {
  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)
  const [medias, setMedias] = useState<string[]>([])
  const [description, setDescription] = useState("")

  const setLngLat = useCallback((lng: number, lat: number) => {
    setLng(lng)
    setLat(lat)
  }, [])

  const saveStep = async () => {    
    const stepData = {
      lng,
      lat,
      medias,
      description,
      postId
    }

    try {
      const res = await fetch("/api/step/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stepData)
      })

      if (!res.ok) {
        const err = await res.json()
        console.error('Erreur:', err.message)
        return
      }

      onSave()

    } catch (error) {
      console.error('Save step error:', error)
    }
  }

  return (
    <div className='fixed inset-0 z-20 flex items-center justify-center p-5'>
      <div className='bg-black/60 fixed w-full h-full'/>
      <div className='flex flex-col w-2/3 h-full p-5 z-100 bg-neutral-700 rounded'>
        <div className='flex w-full h-3/5 shrink-0'>
          <div className='w-1/2 h-full overflow-auto px-2 scrollbar-thin'>
            <MediaGallery 
              onUpdate={(updatedMedias: string[]) => setMedias(updatedMedias)}
            />
          </div>
          <div className='ml-5 w-1/2 h-full'>
            <MapPinSelector
              onSelect={({lng, lat}) => setLngLat(lng, lat)}
            />
            
          </div>
        </div>
        <div className='h-2/5 mt-5'>
          <textarea
            placeholder='Description'
            className='w-full rounded h-full resize-none'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button 
          className='self-end bg-[var(--main)] p-1 mt-2 rounded cursor-pointer'
          onClick={saveStep}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default NewStepModal