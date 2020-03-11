import React, { useState } from 'react'
import { SpeedDial } from '../../components'
import { Map as MapIcon, Layers as LayersIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import { LayerManager } from '../../modules'

export default ({ proxy }) => {
  const [dialOpen, setDialOpen] = useState(false)
  const [layersActive, setLayersActive] = useState(false)

  return (
    <SpeedDial
      style={{ position: 'absolute', left: 20, top: 127 }}
      onOpen={() => setDialOpen(true)}
      onClose={() => setDialOpen(false)}
      open={dialOpen}
      icon={<MapIcon />}
    >
      {[
        {
          icon: <LayersIcon />,
          tooltip: 'Active layers',
          toggle: () => setLayersActive(!layersActive),
          Component: (
            <DragMenu
              title="Layer manager"
              active={layersActive}
              close={() => setLayersActive(false)}
              proxy={proxy}
            >
              <LayerManager layersActive={layersActive} proxy={proxy} />
            </DragMenu>
          )
        }
      ]}
    </SpeedDial>
  )
}
