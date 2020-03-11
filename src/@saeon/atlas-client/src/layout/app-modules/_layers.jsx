import React from 'react'
import { SpeedDial } from '../../components'
import { Map as MapIcon, Layers as LayersIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import { LayerManager } from '../../modules'
import { Form } from '../../components'

export default ({ proxy }) => (
  <Form dialOpen={false} layersActive={false}>
    {({ updateForm, ...fields }) => (
      <SpeedDial
        style={{ position: 'absolute', left: 20, top: 127 }}
        onOpen={() => updateForm({ dialOpen: true })}
        onClose={() => updateForm({ dialOpen: false })}
        open={fields.dialOpen}
        icon={<MapIcon />}
      >
        {[
          {
            icon: <LayersIcon />,
            tooltip: 'Active layers',
            toggle: () => updateForm({ layersActive: !fields.layersActive }),
            Component: (
              <DragMenu
                title="Layer manager"
                active={fields.layersActive}
                close={() => updateForm({ layersActive: false })}
                proxy={proxy}
              >
                <LayerManager layersActive={fields.layersActive} proxy={proxy} />
              </DragMenu>
            )
          }
        ]}
      </SpeedDial>
    )}
  </Form>
)
