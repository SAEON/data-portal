import React from 'react'
import { SpeedDial } from '../../components'
import { Settings as SettingsIcon, BeachAccess as BeachAccessIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import { Form } from '../../components'

export default ({ proxy }) => (
  <Form dialOpen={false} configMenuOpen={false}>
    {({ updateForm, ...fields }) => (
      <SpeedDial
        style={{ position: 'absolute', left: 20, top: 197 }}
        onOpen={() => updateForm({ dialOpen: true })}
        onClose={() => updateForm({ dialOpen: false })}
        open={fields.dialOpen}
        icon={<SettingsIcon />}
      >
        {[
          {
            icon: <BeachAccessIcon />,
            tooltip: 'TODO',
            toggle: () => updateForm({ configMenuOpen: !fields.configMenuOpen }),
            Component: (
              <DragMenu
                title="Config item example"
                active={fields.configMenuOpen}
                close={() => updateForm({ configMenuOpen: false })}
                proxy={proxy}
              >
                Content area
              </DragMenu>
            )
          }
        ]}
      </SpeedDial>
    )}
  </Form>
)
