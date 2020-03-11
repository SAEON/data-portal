import React, { useState } from 'react'
import { SpeedDial } from '../../components'
import { Settings as SettingsIcon, BeachAccess as BeachAccessIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'

export default ({ proxy }) => {
  const [dialOpen, setDialOpen] = useState(false)
  const [configMenuOpen, setConfigMenuOpen] = useState(false)

  return (
    <SpeedDial
      style={{ position: 'absolute', left: 20, top: 197 }}
      onOpen={() => setDialOpen(true)}
      onClose={() => setDialOpen(false)}
      open={dialOpen}
      icon={<SettingsIcon />}
    >
      {[
        {
          icon: <BeachAccessIcon />,
          tooltip: 'TODO',
          toggle: () => setConfigMenuOpen(!configMenuOpen),
          Component: (
            <DragMenu
              title="Config item example"
              active={configMenuOpen}
              close={() => setConfigMenuOpen(false)}
              proxy={proxy}
            >
              Content area
            </DragMenu>
          )
        }
      ]}
    </SpeedDial>
  )
}
