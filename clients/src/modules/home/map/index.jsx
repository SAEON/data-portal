import { Map } from 'maplibre-gl'
import { ESRI_API_KEY } from '../../../config'
import Domains from './_domains'

const BASEMAP_ENUM = 'ArcGIS:Oceans:Base'

export default ({ mapContainer: container }) => {
  if (!ESRI_API_KEY) {
    return
  }

  const map = new Map({
    container,
    style: `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${BASEMAP_ENUM}?type=style&token=${ESRI_API_KEY}`,
    zoom: 2,
    center: [0, 0],

    customAttribution:
      'Esri, Garmin, GEBCO, NOAA NGDC, and other contributors<span></span><span id="mobile-dot">. </span>Powered by Esri',
    interactive: false,
    attributionControl: true,
    pitch: 0,
    bearing: 0,
  })

  return <>{/* <Domains map={map} /> */}</>
}
