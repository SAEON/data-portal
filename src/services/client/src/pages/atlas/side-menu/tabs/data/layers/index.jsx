import { useContext } from 'react';
import { MapContext } from '../../../../../../contexts/ol-react'
import { AtlasContext } from '../../../../state'
import { Typography, Box, Tooltip, IconButton } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import SaeonGeoserverLayer from './layer-types/saeon-geoserver'
import BaseLayer from './layer-types/base-layer'

export default ({ LegendMenu, DataMenu }) => {
  const { proxy } = useContext(MapContext)
  const { layers } = useContext(AtlasContext)

  return (
    <>
      <Box m={1}>
        <Typography variant="overline">Active Layers</Typography>
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
                  LegendMenu={LegendMenu}
                  DataMenu={DataMenu}
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
        <Tooltip placement="right" title="Add layer via server address">
          <IconButton
            onClick={() =>
              alert('Users will be able to add external layers (GeoServer or Esri) to the map')
            }
            style={{ float: 'right' }}
            size="small"
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <div style={{ clear: 'both' }} />
      </Box>
    </>
  )
}
