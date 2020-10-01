import React, { useContext } from 'react'
import { MapContext } from '../../../../../../../modules/provider-map'
import { Box } from '@material-ui/core'
import { AtlasContext } from '../../../../../state'
import SaeonGeoserverLayer from './_saeon-geoserver'
import BaseLayer from './_base-layer'

export default () => {
  const { proxy } = useContext(MapContext)
  const { layers } = useContext(AtlasContext)

  return (
    // data layers
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      {proxy
        .getLayers()
        .getArray()
        .map(layer => {
          const id = layer.get('id')

          const { id: record_id, geoExtent, immutableResource } =
            layers.find(({ layerId }) => layerId === id) || {}

          return record_id ? (
            <SaeonGeoserverLayer
              key={id}
              layer={layer}
              record_id={record_id}
              geoExtent={geoExtent}
              immutableResource={immutableResource}
              proxy={proxy}
            />
          ) : (
            <BaseLayer key={id} layer={layer} proxy={proxy} />
          )
        })
        .filter(_ => _)}
    </Box>
  )
}
