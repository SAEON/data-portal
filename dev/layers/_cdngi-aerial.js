import { Tile as TileLayer } from 'ol/layer.js'
import { TileWMS } from 'ol/source'

export const cdngiAerial = () =>
  new TileLayer({
    id: 'cdngiAerial',
    title: 'CDNGI-Aerial',
    visible: true,
    source: new TileWMS({
      url: 'http://aerial.openstreetmap.org.za/maps?map=/store/cd-ngi/cdngi-aerial.map&amp;',
      params: {
        LAYERS: 'CDNGI-Aerial',
        TILED: true,
        FORMAT: 'image/png'
      },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0
    }),
    opacity: 1
  })
