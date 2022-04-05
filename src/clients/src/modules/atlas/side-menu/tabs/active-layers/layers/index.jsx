import { useContext } from 'react'
import { MapContext } from '../../../../../../contexts/ol-react'
import { AtlasContext } from '../../../../state'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import SaeonGeoserverLayer from './layer-types/saeon-geoserver'
import BaseLayer from './layer-types/base-layer'

export default ({ setActiveTabIndex, LegendMenu, DataMenu }) => {
  const { proxy } = useContext(MapContext)
  const { layers } = useContext(AtlasContext)

  return (
    <>
      <Box m={1}>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          {proxy
            .getLayers()
            .getArray()
            .map(layer => {
              const id = layer.get('id')

              const {
                id: record_id,
                geoExtent,
                immutableResource,
              } = layers.find(({ layerId }) => layerId === id) || {}

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
        <Tooltip placement="right" title="Add layer">
          <IconButton onClick={() => setActiveTabIndex(1)} style={{ float: 'right' }} size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  )
}
