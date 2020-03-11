import React from 'react'
import { SpeedDial } from '../../components'
import { Layers as LayersIcon, Search as SearchIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import { SaeonSearch } from '../../modules'
import { Form } from '../../components'

export default ({ proxy }) => (
  <Form dialOpen={false} saeonSearchActive={false}>
    {({ updateForm, ...fields }) => (
      <SpeedDial
        style={{ position: 'absolute', left: 20, top: 57 }}
        onOpen={() => updateForm({ dialOpen: true })}
        onClose={() => updateForm({ dialOpen: false })}
        open={fields.dialOpen}
        icon={<SearchIcon />}
      >
        {[
          {
            icon: <LayersIcon />,
            tooltip: 'Search SAEON',
            toggle: () => updateForm({ saeonSearchActive: !fields.saeonSearchActive }),
            Component: (
              <DragMenu
                title="Search SAEON"
                active={fields.saeonSearchActive}
                close={() => updateForm({ saeonSearchActive: false })}
                proxy={proxy}
              >
                <SaeonSearch proxy={proxy} />
              </DragMenu>
            )
          }
        ]}
      </SpeedDial>
    )}
  </Form>
)
