"use client"
import dynamic from 'next/dynamic'
import type { MapDot, MapHeat } from '@/lib/types'

const CityMapInner = dynamic(() => import('./CityMapInner'), { ssr: false })

export type MapMode = 'Street' | 'Satellite' | 'Infrastructure'
export type MapRegime = 'History' | 'Now' | 'Forecast'

interface CityMapProps {
  dots?: MapDot[]
  heat?: MapHeat[]
  onPick?: (dot: MapDot) => void
  zoom?: number
  /** Basemap to render. Defaults to the original Infrastructure (light) tiles. */
  mode?: MapMode
  /** Time regime — affects how markers are styled (muted past / current / escalated forecast). */
  regime?: MapRegime
  /** Group nearby markers into count bubbles when zoomed out. */
  cluster?: boolean
}

export default function CityMap({
  dots = [],
  heat = [],
  onPick,
  zoom,
  mode = 'Infrastructure',
  regime = 'Now',
  cluster = false,
}: CityMapProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <CityMapInner
        dots={dots}
        heat={heat}
        onPick={onPick}
        zoom={zoom}
        mode={mode}
        regime={regime}
        cluster={cluster}
      />
    </div>
  )
}
