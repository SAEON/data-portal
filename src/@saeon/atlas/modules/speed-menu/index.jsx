import React, { PureComponent } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import SettingsIcon from '@material-ui/icons/Settings'
import ShareIcon from '@material-ui/icons/Share'
import SearchIcon from '@material-ui/icons/Search'
import LayersIcon from '@material-ui/icons/Layers'

// Menu
import DraggableSearchMenu from '../draggable-search-menu'
import DraggableLayersMenu from '../draggable-layers-menu'

export default class extends PureComponent {
  state = {
    open: false,
    searchActive: false,
    layersActive: false,
    settingsActive: false
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { searchActive, layersActive, settingsActive } = this.state
    const { proxy } = this.props
    return (
      <>
        <SpeedDial
          style={{ position: 'absolute', margin: '20px' }}
          ariaLabel="SpeedDial example"
          hidden={this.state.hidden}
          icon={<SpeedDialIcon />}
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          direction={'right'}
        >
          <SpeedDialAction
            icon={<SearchIcon color={this.state.searchActive ? 'primary' : 'secondary'} />}
            tooltipTitle={'Search'}
            onClick={() => this.setState({ open: false, searchActive: !searchActive })}
          />
          <SpeedDialAction
            icon={<LayersIcon color={this.state.layersActive ? 'primary' : 'secondary'} />}
            tooltipTitle={'Layers'}
            onClick={() => this.setState({ open: false, layersActive: !layersActive })}
          />
          <SpeedDialAction
            icon={<SettingsIcon color={this.state.settingsActive ? 'primary' : 'secondary'} />}
            tooltipTitle={'Settings'}
            onClick={() => this.setState({ open: false, settingsActive: !settingsActive })}
          />
          <SpeedDialAction
            icon={<ShareIcon color={'primary'} />}
            tooltipTitle={'Print'}
            onClick={() => this.setState({ open: false }, () => alert('todo'))}
          />
        </SpeedDial>
        <DraggableSearchMenu
          active={searchActive}
          close={() => this.setState({ searchActive: false })}
          proxy={proxy}
        />
        <DraggableLayersMenu
          active={layersActive}
          close={() => this.setState({ layersActive: false })}
          proxy={proxy}
        />
      </>
    )
  }
}
