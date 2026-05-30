"use client"
import dynamic from 'next/dynamic'
import type { MapDot, MapHeat } from '@/lib/types'

const CityMapInner = dynamic(() => import('./CityMapInner'), { ssr: false })

interface CityMapProps {
  dots?: MapDot[]
  heat?: MapHeat[]
  onPick?: (dot: MapDot) => void
  zoom?: number
}

export default function CityMap({ dots = [], heat = [], onPick, zoom }: CityMapProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <CityMapInner dots={dots} heat={heat} onPick={onPick} zoom={zoom} />
    </div>
  )
}
