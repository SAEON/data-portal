import { Tile as TileLayer } from 'ol/layer.js'
import { TileWMS } from 'ol/source'
import { PROXY_ADDRESS } from '../../../config'

const URL = `${PROXY_ADDRESS}/terrestris/osm-gray/service`

export const terrestrisBaseMap = () =>
  new TileLayer({
    title: 'Terrestris Base Map',
    id: 'terrestrisBaseMap',
    visible: true,
    source: new TileWMS({
      url: URL,
      params: {
        LAYERS: 'OSM-WMS',
        TILED: false
      },
      serverType: 'geoserver'
    })
  })
