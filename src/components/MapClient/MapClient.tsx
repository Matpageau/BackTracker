"use client"
import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

export default function MapClient() {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite",
      center: [0,0],
      zoom: 2,
    })

    map.addControl(new mapboxgl.NavigationControl({ showZoom: false, visualizePitch: true}))

    map.on("load", () => {
      
      new mapboxgl.Marker().setLngLat([-73.5673, 45.5017]).addTo(map)
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