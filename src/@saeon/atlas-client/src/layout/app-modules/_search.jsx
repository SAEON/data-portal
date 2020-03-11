import React, { useState } from 'react'
import { SpeedDial } from '../../components'
import { DragMenu } from '../../components'
import { Layers as LayersIcon, Search as SearchIcon } from '@material-ui/icons'
import { SaeonSearch } from '../../modules'

export default ({ proxy }) => {
  const [dialOpen, setDialOpen] = useState(false)
  const [saeonSearch, setSaeonSearch] = useState(false)

  return (
    <SpeedDial
      style={{ position: 'absolute', left: 20, top: 57 }}
      onOpen={() => setDialOpen(true)}
      onClose={() => setDialOpen(false)}
      open={dialOpen}
      icon={<SearchIcon />}
    >
      {[
        {
          icon: <LayersIcon />,
          tooltip: 'Search SAEON',
          toggle: () => setSaeonSearch(!saeonSearch),
          Component: (
            <DragMenu
              title="Search SAEON"
              active={saeonSearch}
              close={() => setSaeonSearch(false)}
              proxy={proxy}
            >
              <SaeonSearch proxy={proxy} />
            </DragMenu>
          )
        }
      ]}
    </SpeedDial>
  )
}
