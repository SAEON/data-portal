import { Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { ESRI_API_KEY } from '../../../config'
import MapAttribution from '../../../components/map-attribution'
import { useTheme } from '@mui/material/styles'
import Domains from './_domains'

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

  return (
    <>
      {/* <Domains map={map} /> */}
      <MapAttribution sx={{ opacity: 0.9 }} />
    </>
  )
}
