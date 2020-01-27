import React, { PureComponent } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import PrintIcon from '@material-ui/icons/Print'
import SettingsIcon from '@material-ui/icons/Settings'
import ShareIcon from '@material-ui/icons/Share'
import SearchIcon from '@material-ui/icons/Search'
import LayersIcon from '@material-ui/icons/Layers'

const actions = [
  { icon: <SearchIcon />, name: 'Search' },
  { icon: <LayersIcon />, name: 'Layers' },
  { icon: <SettingsIcon />, name: 'Settings' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' }
]

export default class extends PureComponent {
  state = {
    open: false
  }
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SpeedDial
        style={{ position: 'absolute', margin: '20px' }}
        ariaLabel="SpeedDial example"
        hidden={this.state.hidden}
        icon={<SpeedDialIcon />}
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        direction={'down'}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => this.setState({ open: false })}
          />
        ))}
      </SpeedDial>
    )
  }
}
