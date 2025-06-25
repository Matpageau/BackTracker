"use client"
import React, { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

type MapPinSelectorProps = {
  onSelect: (coords: { lng: number, lat: number }) => void
}

const MapPinSelector: React.FC<MapPinSelectorProps> = ({ onSelect }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<mapboxgl.Marker | null>(null)
  const onSelectRef = useRef(onSelect)

  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  useEffect(() => {
    if (!mapContainerRef.current) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite",
      center: [0, 0],
      zoom: 2,
    })

    map.addControl(new mapboxgl.NavigationControl({ showZoom: false, visualizePitch: true }))

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat

      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat])
      } else {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map)
      }

      onSelectRef.current?.({ lng, lat })
    })

    return () => map.remove()
  }, [])

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full rounded-md"
    />
  )
}

export default MapPinSelector
