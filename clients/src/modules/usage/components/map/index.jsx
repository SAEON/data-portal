import { Map } from 'maplibre-gl'
import { Div } from '../../../../components/html-tags'
import { ESRI_API_KEY } from '../../../../config'
import MapAttribution from '../../../../components/map-attribution'
import { useTheme } from '@mui/material/styles'
import tinygradient from 'tinygradient'

const BASEMAP_ENUM = 'ArcGIS:Topographic'

export default ({ geojson, containerRef: container }) => {
  const theme = useTheme()

  const palette = tinygradient(
    { color: theme.palette.primary.light, pos: 0 },
    { color: theme.palette.primary.dark, pos: 1 }
  )
    .hsv(9, 'short')
    .map(c => c.toHexString())

  if (!ESRI_API_KEY) {
    return <Div>Missing Configuration value for ESRI_API_KEY</Div>
  }
  var map = new Map({
    container,
    style: `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${BASEMAP_ENUM}?type=style&token=${ESRI_API_KEY}`,
    zoom: 1,
    center: [0, 0],
    attributionControl: false,
  })

  map.on('load', function () {
    map.addSource('events', {
      type: 'geojson',
      data: geojson,
      cluster: true,
      clusterMaxZoom: 24, // Max zoom to cluster points on
      clusterRadius: 25, // Radius of each cluster when clustering points (defaults to 50)
    })

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'events',
      filter: ['has', 'point_count'],
      paint: {
        'circle-blur': [
          'step',
          ['get', 'point_count'],
          // count < 4
          0.5,
          // count 4
          4,
          0.75,
          // count 10
          10,
          0.75,
          // count 20
          20,
          0.75,
          // count 50
          50,
          0.75,
          // count 100
          100,
          0.75,
          // count 250
          250,
          1,
          // count 500
          500,
          1,
        ],
        'circle-color': [
          'step',
          ['get', 'point_count'],
          // count < 15, color = palette[0]
          palette[1],
          // count 8
          8,
          palette[2],
          // count 10
          10,
          palette[3],
          // count 20
          20,
          palette[4],
          // count 50
          50,
          palette[5],
          // count 100
          100,
          palette[6],
          // count 250
          250,
          palette[7],
          // count 500
          500,
          palette[8],
        ],
        'circle-radius': [
          'step',
          // input
          ['get', 'point_count'],
          // count 8
          8,
          // count 10
          10,
          10,
          // count 20
          20,
          15,
          // count 50
          50,
          20,
          // count 100
          100,
          25,
          // count 250
          250,
          30,
          // count 500
          500,
          35,
        ],
      },
    })

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'events',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['Arial Unicode MS Bold'],
        'text-size': 12,
        'text-allow-overlap': false,
      },
      paint: {
        'text-color': theme.palette.primary.contrastText,
      },
    })

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'events',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': palette[0],
        'circle-radius': 4,
        'circle-stroke-width': 0,
      },
    })

    map.on('mouseenter', 'clusters', function () {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'clusters', function () {
      map.getCanvas().style.cursor = ''
    })
  })

  return <MapAttribution />
}
