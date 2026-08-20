import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography, CircularProgress, Paper } from '@mui/material'

export default ({ extentData, onChange }) => {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const drawnItemsRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Dynamically load Leaflet & Leaflet Draw CSS and JS from CDN
  useEffect(() => {
    const loadStyle = href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        document.head.appendChild(link)
      }
    }

    const loadScript = src => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    loadStyle('https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet.css')
    loadStyle('https://cdn.jsdelivr.net/npm/leaflet-draw@1.0.4/dist/leaflet.draw.css')

    loadScript('https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet.js')
      .then(() =>
        loadScript('https://cdn.jsdelivr.net/npm/leaflet-draw@1.0.4/dist/leaflet.draw.js')
      )
      .then(() => setMapLoaded(true))
      .catch(err => console.error('Error loading Leaflet / Leaflet.draw:', err))
  }, [])

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapLoaded || !mapContainerRef.current || mapInstanceRef.current) return

    const L = window.L
    if (!L) return

    const map = L.map(mapContainerRef.current).setView([-28.5, 24.5], 5)
    mapInstanceRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map)

    const drawnItems = new L.FeatureGroup()
    drawnItemsRef.current = drawnItems
    map.addLayer(drawnItems)

    const drawControl = new L.Control.Draw({
      draw: {
        polyline: false,
        polygon: false,
        marker: true,
        circle: false,
        circlemarker: false,
        rectangle: true,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    })
    map.addControl(drawControl)

    const syncMapToInputs = () => {
      let north = ''
      let east = ''
      let south = ''
      let west = ''
      let p_lat = ''
      let p_lon = ''

      drawnItems.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          const latlng = layer.getLatLng()
          p_lat = String(parseFloat(latlng.lat.toFixed(6)))
          p_lon = String(parseFloat(latlng.lng.toFixed(6)))
        } else if (layer instanceof L.Rectangle) {
          const bounds = layer.getBounds()
          north = String(parseFloat(bounds.getNorth().toFixed(6)))
          east = String(parseFloat(bounds.getEast().toFixed(6)))
          south = String(parseFloat(bounds.getSouth().toFixed(6)))
          west = String(parseFloat(bounds.getWest().toFixed(6)))
        }
      })

      onChange({
        north_bound_latitude: north,
        east_bound_longitude: east,
        south_bound_latitude: south,
        west_bound_longitude: west,
        point_latitude: p_lat,
        point_longitude: p_lon,
      })
    }

    map.on(L.Draw.Event.CREATED, e => {
      const layer = e.layer
      drawnItems.eachLayer(existingLayer => {
        if (layer instanceof L.Marker && existingLayer instanceof L.Marker) {
          drawnItems.removeLayer(existingLayer)
        } else if (layer instanceof L.Rectangle && existingLayer instanceof L.Rectangle) {
          drawnItems.removeLayer(existingLayer)
        }
      })
      drawnItems.addLayer(layer)
      syncMapToInputs()
    })

    map.on(L.Draw.Event.EDITED, () => {
      syncMapToInputs()
    })

    map.on(L.Draw.Event.DELETED, () => {
      syncMapToInputs()
    })

    // Initial sync from existing extentData
    const n = parseFloat(extentData.north_bound_latitude)
    const e = parseFloat(extentData.east_bound_longitude)
    const s = parseFloat(extentData.south_bound_latitude)
    const w = parseFloat(extentData.west_bound_longitude)
    const p_lat = parseFloat(extentData.point_latitude)
    const p_lon = parseFloat(extentData.point_longitude)

    if (!isNaN(n) && !isNaN(e) && !isNaN(s) && !isNaN(w)) {
      const bounds = [
        [s, w],
        [n, e],
      ]
      const box = L.rectangle(bounds, { color: '#3388ff' })
      drawnItems.addLayer(box)
      map.fitBounds(bounds, { maxZoom: 9 })
    }

    if (!isNaN(p_lat) && !isNaN(p_lon)) {
      const marker = L.marker([p_lat, p_lon])
      drawnItems.addLayer(marker)
      if (isNaN(n) || isNaN(e) || isNaN(s) || isNaN(w)) {
        map.setView([p_lat, p_lon], 8)
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [mapLoaded])

  // Sync inputs typed manually to the map
  useEffect(() => {
    if (!mapInstanceRef.current || !drawnItemsRef.current || !window.L) return

    const L = window.L
    const drawnItems = drawnItemsRef.current

    const n = parseFloat(extentData.north_bound_latitude)
    const e = parseFloat(extentData.east_bound_longitude)
    const s = parseFloat(extentData.south_bound_latitude)
    const w = parseFloat(extentData.west_bound_longitude)
    const p_lat = parseFloat(extentData.point_latitude)
    const p_lon = parseFloat(extentData.point_longitude)

    // Update Rectangle
    let existingRect = null
    drawnItems.eachLayer(l => {
      if (l instanceof L.Rectangle) existingRect = l
    })

    if (!isNaN(n) && !isNaN(e) && !isNaN(s) && !isNaN(w)) {
      const newBounds = [
        [s, w],
        [n, e],
      ]
      if (existingRect) {
        existingRect.setBounds(newBounds)
      } else {
        const box = L.rectangle(newBounds, { color: '#3388ff' })
        drawnItems.addLayer(box)
      }
    } else if (existingRect) {
      drawnItems.removeLayer(existingRect)
    }

    // Update Marker
    let existingMarker = null
    drawnItems.eachLayer(l => {
      if (l instanceof L.Marker) existingMarker = l
    })

    if (!isNaN(p_lat) && !isNaN(p_lon)) {
      if (existingMarker) {
        existingMarker.setLatLng([p_lat, p_lon])
      } else {
        const marker = L.marker([p_lat, p_lon])
        drawnItems.addLayer(marker)
      }
    } else if (existingMarker) {
      drawnItems.removeLayer(existingMarker)
    }
  }, [
    extentData.north_bound_latitude,
    extentData.east_bound_longitude,
    extentData.south_bound_latitude,
    extentData.west_bound_longitude,
    extentData.point_latitude,
    extentData.point_longitude,
  ])

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden', borderRadius: 2, mb: 3 }}>
      <Box sx={{ p: 1.5, bg: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="caption" color="textSecondary">
          Use the toolbar below on the left of the map to <strong>Draw a Bounding Box</strong> or{' '}
          <strong>Place a Point Marker</strong>.
        </Typography>
      </Box>
      <Box
        ref={mapContainerRef}
        sx={{
          height: 350,
          width: '100%',
          position: 'relative',
          bgcolor: '#e5e3df',
        }}
      >
        {!mapLoaded && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Paper>
  )
}
