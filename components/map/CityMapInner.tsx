"use client"
import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import type { MapDot, MapHeat } from '@/lib/types'
import type { MapMode, MapRegime } from './CityMap'

interface Props {
  dots: MapDot[]
  heat: MapHeat[]
  onPick?: (d: MapDot) => void
  zoom?: number
  mode?: MapMode
  regime?: MapRegime
  cluster?: boolean
}

const CENTER: [number, number] = [47.60, -122.33]
const BBOX = { n: 47.642, s: 47.558, w: -122.405, e: -122.255 }

// Basemap tile sources per mode. Infrastructure keeps the original light tiles.
const TILES: Record<MapMode, { url: string; maxZoom: number }> = {
  Infrastructure: { url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', maxZoom: 19 },
  Street: { url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', maxZoom: 19 },
  Satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 19,
  },
}

function pctToLatLng(x: number, y: number): [number, number] {
  const lat = BBOX.n - (y / 100) * (BBOX.n - BBOX.s)
  const lng = BBOX.w + (x / 100) * (BBOX.e - BBOX.w)
  return [lat, lng]
}

export default function CityMapInner({
  dots,
  heat,
  onPick,
  zoom = 12,
  mode = 'Infrastructure',
  regime = 'Now',
  cluster = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const layerRef = useRef<any>(null)
  const tileRef = useRef<any>(null)
  const LRef = useRef<any>(null)
  // Keep latest onPick without re-running the overlay effect on every render.
  const onPickRef = useRef<typeof onPick>(onPick)
  // Latest draw inputs, so the zoomend handler can re-cluster with current data.
  const drawArgsRef = useRef({ dots, heat, regime, cluster })

  // Sync mutable refs in an effect (not during render) so React stays happy.
  useEffect(() => {
    onPickRef.current = onPick
    drawArgsRef.current = { dots, heat, regime, cluster }
  })

  // --- Effect 1: initialize the map exactly once (StrictMode-safe) ---
  useEffect(() => {
    let cancelled = false
    const container = ref.current

    import('leaflet').then(L => {
      // The effect was torn down (StrictMode double-mount / unmount) before
      // the dynamic import resolved — bail out without touching the DOM.
      if (cancelled || !container) return
      // A Leaflet map is already bound to this container (a previous, not-yet
      // cleaned-up init, or a racing import) — never call L.map() on it twice.
      if (mapRef.current || (container as any)._leaflet_id != null) return

      const map = L.map(container, {
        center: CENTER,
        zoom,
        scrollWheelZoom: false,
        dragging: true,
        doubleClickZoom: true,
        zoomControl: false,
        attributionControl: false,
      })

      const t = TILES[mode] ?? TILES.Infrastructure
      const tile = L.tileLayer(t.url, { maxZoom: t.maxZoom }).addTo(map)

      const overlay = L.layerGroup().addTo(map)

      LRef.current = L
      mapRef.current = map
      tileRef.current = tile
      layerRef.current = overlay

      // Re-cluster when the user zooms (clustering depends on current zoom).
      map.on('zoomend', () => {
        const o = layerRef.current
        if (!o) return
        o.clearLayers()
        const a = drawArgsRef.current
        drawOverlays(L, map, o, a.dots, a.heat, onPickRef, a.regime, a.cluster)
      })

      // Draw the initial overlays once on mount.
      drawOverlays(L, map, overlay, dots, heat, onPickRef, regime, cluster)

      setTimeout(() => {
        if (!cancelled && mapRef.current) map.invalidateSize()
      }, 100)
    })

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      layerRef.current = null
      tileRef.current = null
      // Clear the Leaflet binding so a fresh mount (StrictMode remount) can
      // re-initialize on the same DOM node without "already initialized".
      if (container) delete (container as any)._leaflet_id
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // --- Effect 2: re-render markers/heat when props change ---
  useEffect(() => {
    const L = LRef.current
    const overlay = layerRef.current
    const map = mapRef.current
    // Map not ready yet (first effect still importing) — effect 1 draws the
    // initial state, and this effect re-runs once refs are populated.
    if (!L || !overlay || !map) return
    overlay.clearLayers()
    drawOverlays(L, map, overlay, dots, heat, onPickRef, regime, cluster)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dots), JSON.stringify(heat), regime, cluster])

  // --- Effect 3: swap the basemap tile layer when the mode changes ---
  useEffect(() => {
    const L = LRef.current
    const map = mapRef.current
    if (!L || !map) return
    const t = TILES[mode] ?? TILES.Infrastructure
    if (tileRef.current) map.removeLayer(tileRef.current)
    tileRef.current = L.tileLayer(t.url, { maxZoom: t.maxZoom }).addTo(map)
    // Keep the tile layer beneath the marker overlay.
    tileRef.current.bringToBack?.()
  }, [mode])

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />
}

// Adjust a CSS color string toward a muted/desaturated look for "history".
function muteColor(color: string): string {
  // For our hex dot palette, blend toward grey.
  if (/^#([0-9a-f]{6})$/i.test(color)) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    const grey = Math.round((r + g + b) / 3)
    const mix = (c: number) => Math.round(c * 0.45 + grey * 0.55)
    const h = (n: number) => mix(n).toString(16).padStart(2, '0')
    return `#${h(r)}${h(g)}${h(b)}`
  }
  return color
}

function drawOverlays(
  L: any,
  map: any,
  overlay: any,
  dots: MapDot[],
  heat: MapHeat[],
  onPickRef: React.MutableRefObject<((d: MapDot) => void) | undefined>,
  regime: MapRegime,
  cluster: boolean,
) {
  const isHistory = regime === 'History'
  const isForecast = regime === 'Forecast'

  // ── Heat overlays ──────────────────────────────────────────────────────────
  heat.forEach(h => {
    const [lat, lng] = pctToLatLng(h.x, h.y)
    // Forecast escalates hazard footprints; history fades them.
    const radius = h.r * 10 * (isForecast ? 1.55 : isHistory ? 0.7 : 1)
    const opacity = (h.o || 0.5) * (isHistory ? 0.4 : 1)
    L.circle([lat, lng], {
      radius,
      color: 'transparent',
      fillColor: h.color.replace(/^rgba?\(([^)]+)\).*/, 'rgb($1)'),
      fillOpacity: opacity,
      interactive: false,
    }).addTo(overlay)
  })

  // ── Marker drawing helpers ───────────────────────────────────────────────────
  function dotIcon(d: MapDot, baseSize: number) {
    let size = baseSize
    let color = d.color
    let pulse = d.pulse

    if (isForecast && (d.crit || d.pulse || d.layer === 'hazards')) {
      // Predicted-risk markers escalate: grow + recolour toward red, add pulse.
      size = Math.round(baseSize * 1.5)
      color = '#B23A33'
      pulse = true
    } else if (isHistory) {
      // Past markers are muted and static.
      color = muteColor(d.color)
      pulse = false
      size = Math.max(8, Math.round(baseSize * 0.85))
    }

    const ring = pulse
      ? `<div style="position:absolute;border-radius:50%;border:2px solid ${color};animation:pulse-ring 1.8s ease-out infinite;left:50%;top:50%;transform:translate(-50%,-50%);pointer-events:none;"></div>`
      : ''
    const html = `
      <div style="position:relative;width:${size}px;height:${size}px;opacity:${isHistory ? 0.7 : 1};">
        ${ring}
        <div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);"></div>
      </div>`
    return L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
  }

  function placeMarker(d: MapDot) {
    const [lat, lng] = pctToLatLng(d.x, d.y)
    const size = d.size || 12
    const icon = dotIcon(d, size)
    // Accessible name for the keyboard-focusable marker (Leaflet renders it as
    // role="button"). `title`/`alt` give it a name so axe `aria-command-name` passes.
    const histNote = isHistory ? ' (past)' : isForecast ? ' (forecast)' : ''
    const markerName = (d.label || d.tag || 'Map location marker') + histNote
    const marker = L.marker([lat, lng], { icon, title: markerName, alt: markerName, keyboard: true })
    if (d.label || d.tag) marker.bindTooltip((d.label || d.tag || '') + histNote, { permanent: false, direction: 'top' })
    if (onPickRef.current) marker.on('click', () => onPickRef.current!(d))
    marker.addTo(overlay)
  }

  // ── Lightweight count-bubble clustering ──────────────────────────────────────
  // When enabled and zoomed out, group dots whose screen positions are within a
  // pixel threshold into a single count bubble; otherwise render them individually.
  const zoom = map.getZoom ? map.getZoom() : 12
  const shouldCluster = cluster && zoom <= 12 && dots.length > 1

  if (!shouldCluster) {
    dots.forEach(placeMarker)
    return
  }

  const THRESH = 46 // px
  const groups: { pts: MapDot[]; px: number; py: number }[] = []
  dots.forEach(d => {
    const ll = pctToLatLng(d.x, d.y)
    const p = map.latLngToLayerPoint(ll)
    const hit = groups.find(g => Math.hypot(g.px - p.x, g.py - p.y) < THRESH)
    if (hit) {
      hit.pts.push(d)
      // running average keeps the bubble near the cluster's centroid
      hit.px = (hit.px * (hit.pts.length - 1) + p.x) / hit.pts.length
      hit.py = (hit.py * (hit.pts.length - 1) + p.y) / hit.pts.length
    } else {
      groups.push({ pts: [d], px: p.x, py: p.y })
    }
  })

  groups.forEach(g => {
    if (g.pts.length === 1) {
      placeMarker(g.pts[0])
      return
    }
    // Cluster bubble — sized by count, coloured by the highest-severity member.
    const hasCrit = g.pts.some(d => d.crit || d.pulse || d.layer === 'hazards')
    const color = isHistory ? '#7A828B' : hasCrit ? '#B23A33' : '#2A6C92'
    const size = Math.min(40, 22 + g.pts.length * 3)
    const center = map.layerPointToLatLng(L.point(g.px, g.py))
    const html = `
      <div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid #fff;
        box-shadow:0 1px 6px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;
        color:#fff;font:700 ${size > 30 ? 13 : 11}px var(--mono,monospace);opacity:${isHistory ? 0.75 : 1};">
        ${g.pts.length}
      </div>`
    const icon = L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
    const names = g.pts.map(d => d.label || d.tag).filter(Boolean).join(', ')
    const name = `${g.pts.length} locations${names ? ': ' + names : ''}`
    const marker = L.marker(center, { icon, title: name, alt: name, keyboard: true })
    marker.bindTooltip(name, { permanent: false, direction: 'top' })
    // Clicking a cluster zooms in to break it apart.
    marker.on('click', () => {
      if (map.setView) map.setView(center, Math.min(16, (map.getZoom ? map.getZoom() : 12) + 2))
    })
    marker.addTo(overlay)
  })
}
