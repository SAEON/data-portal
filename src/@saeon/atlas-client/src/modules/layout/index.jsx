import React, { PureComponent } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab'
import { Settings, Share, Search, Layers } from '@material-ui/icons'
import OlReact, { MapProxy } from '../../../../ol-react'
import { ahocevarBaseMap } from '../../layers'

// Menus
import DraggableSearchMenu from '../draggable-search-menu'
import DraggableLayersMenu from '../draggable-layers-menu'
import DraggableMenuExample from '../draggable-menu-example'

export default class extends PureComponent {
  state = {
    open: false,
    searchActive: false,
    layersActive: false,
    settingsActive: false
  }

  render() {
    const { searchActive, layersActive, settingsActive } = this.state
    return (
      <>
        <AppBar variant="outlined" position="static">
          <Toolbar disableGutters={false} variant="dense">
            <Typography style={{ padding: '10px' }} display="block" variant="h6">
              SAEON Atlas
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ height: 'calc(100% - 48px)', width: '100%' }}>
          <OlReact layers={[ahocevarBaseMap()]} style={{ width: '100%', height: '100%' }}>
            {({ map }) => (
              <MapProxy map={map}>
                {({ proxy }) => (
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
                        icon={<Search color={this.state.searchActive ? 'primary' : 'secondary'} />}
                        tooltipTitle={'Search'}
                        onClick={() => this.setState({ open: false, searchActive: !searchActive })}
                      />
                      <SpeedDialAction
                        icon={<Layers color={this.state.layersActive ? 'primary' : 'secondary'} />}
                        tooltipTitle={'Layers'}
                        onClick={() => this.setState({ open: false, layersActive: !layersActive })}
                      />
                      <SpeedDialAction
                        icon={
                          <Settings color={this.state.settingsActive ? 'primary' : 'secondary'} />
                        }
                        tooltipTitle={'Settings'}
                        onClick={() =>
                          this.setState({ open: false, settingsActive: !settingsActive })
                        }
                      />
                      <SpeedDialAction
                        icon={<Share color={'primary'} />}
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
                    <DraggableMenuExample
                      active={settingsActive}
                      close={() => this.setState({ settingsActive: false })}
                      proxy={proxy}
                    />
                  </>
                )}
              </MapProxy>
            )}
          </OlReact>
        </div>
      </>
    )
  }
}
