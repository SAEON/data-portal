import React from 'react'
import { LayersModule, SearchModule } from './app-modules'
import { Settings as SettingsIcon, BeachAccess as BeachAccessIcon } from '@material-ui/icons'
import { Dial, dialItem } from './todo'

export default ({ proxy }) => (
  <>
    <LayersModule proxy={proxy} />
    <SearchModule proxy={proxy} />

    {/* App Configuration */}
    <Dial
      icon={<SettingsIcon />}
      configMenuOpen={false}
      style={{ position: 'absolute', left: 20, top: 197 }}
    >
      {(toggleConfigMenu, { configMenuOpen }) =>
        dialItem({
          icon: <BeachAccessIcon />,
          tooltip: 'TODO',
          toggle: () => toggleConfigMenu({ configMenuOpen: !configMenuOpen }),
          title: 'Config TODO menu',
          active: configMenuOpen,
          proxy: proxy,
          content: 'hello world'
        })
      }
    </Dial>
  </>
)
