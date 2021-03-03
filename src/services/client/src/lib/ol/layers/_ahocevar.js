import { Tile as TileLayer } from 'ol/layer.js'
import { TileWMS } from 'ol/source'
import { CATALOGUE_PROXY_ADDRESS } from '../../../config'

const URL = `${CATALOGUE_PROXY_ADDRESS}/ahocevar/geoserver/wms`

export const ahocevarBaseMap = () =>
  new TileLayer({
    title: 'Ahocevar Base Map',
    id: 'ahocevarBaseMap',
    visible: true,
    source: new TileWMS({
      url: URL,
      params: {
        LAYERS: 'ne:NE1_HR_LC_SR_W_DR',
        TILED: true,
      },
    }),
  })
