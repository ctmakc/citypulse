"use client"
import { useEffect, useRef } from 'react'
import type { MapDot, MapHeat } from '@/lib/types'

interface Props {
  dots: MapDot[]
  heat: MapHeat[]
  onPick?: (d: MapDot) => void
  zoom?: number
}

export default function CityMapInner({ dots, heat, onPick, zoom = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!ref.current || mapRef.current) return

    import('leaflet').then(L => {
      // @ts-ignore
      import('leaflet/dist/leaflet.css')

      const CENTER: [number, number] = [47.60, -122.33]
      const BBOX = { n: 47.642, s: 47.558, w: -122.405, e: -122.255 }

      const map = L.map(ref.current!, {
        center: CENTER,
        zoom,
        scrollWheelZoom: false,
        dragging: true,
        doubleClickZoom: true,
        zoomControl: false,
        attributionControl: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map)

      mapRef.current = map

      function pctToLatLng(x: number, y: number): [number, number] {
        const lat = BBOX.n - (y / 100) * (BBOX.n - BBOX.s)
        const lng = BBOX.w + (x / 100) * (BBOX.e - BBOX.w)
        return [lat, lng]
      }

      heat.forEach(h => {
        const [lat, lng] = pctToLatLng(h.x, h.y)
        L.circle([lat, lng], {
          radius: h.r * 10,
          color: 'transparent',
          fillColor: h.color.replace(/^rgba?\(([^)]+)\).*/, 'rgb($1)'),
          fillOpacity: h.o || 0.5,
          interactive: false,
        }).addTo(map)
      })

      dots.forEach(d => {
        const [lat, lng] = pctToLatLng(d.x, d.y)
        const size = d.size || 12
        const pulse = d.pulse
          ? `<div style="position:absolute;border-radius:50%;border:2px solid ${d.color};animation:pulse-ring 1.8s ease-out infinite;left:50%;top:50%;transform:translate(-50%,-50%);pointer-events:none;"></div>`
          : ''
        const html = `
          <div style="position:relative;width:${size}px;height:${size}px;">
            ${pulse}
            <div style="width:${size}px;height:${size}px;border-radius:50%;background:${d.color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);"></div>
          </div>`
        const icon = L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
        const marker = L.marker([lat, lng], { icon })
        if (d.label || d.tag) marker.bindTooltip(d.label || d.tag || '', { permanent: false, direction: 'top' })
        if (onPick) marker.on('click', () => onPick(d))
        marker.addTo(map)
      })

      setTimeout(() => map.invalidateSize(), 100)
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />
}
