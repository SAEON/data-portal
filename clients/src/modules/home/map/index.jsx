import { Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { ESRI_API_KEY } from '../../../config'
import MapAttribution from '../../../components/map-attribution'
import { useTheme } from '@mui/material/styles'

const BASEMAP_ENUM = 'ArcGIS:Oceans:Base'

export default ({ mapContainer: container }) => {
  if (!ESRI_API_KEY) {
    return
  }

  const theme = useTheme()

  const map = new Map({
    container,
    style: `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${BASEMAP_ENUM}?type=style&token=${ESRI_API_KEY}`,
    zoom: 2,
    center: [0, 0],
    attributionControl: false,
    interactive: false,
    pitch: 0,
    bearing: 0,
  })

  map.on('load', () => {
    map.addSource('metadata', {
      type: 'vector',
      tiles: [`https://maps.somisana.ac.za/public.metadata/{z}/{x}/{y}.pbf`],
      url: `https://maps.somisana.ac.za/public.metadata.json`,
      promoteId: 'id',
    })

    map.addLayer({
      id: 'metadata',
      type: 'line',
      source: 'metadata',
      'source-layer': 'public.metadata',
      paint: {
        'line-color': theme.palette.primary.light,
        'line-width': 1,
        'line-dasharray': [1, 1],
      },
    })
  })

  return <MapAttribution />
}
