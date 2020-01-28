import React, { PureComponent } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import PrintIcon from '@material-ui/icons/Print'
import SettingsIcon from '@material-ui/icons/Settings'
import ShareIcon from '@material-ui/icons/Share'
import SearchIcon from '@material-ui/icons/Search'
import LayersIcon from '@material-ui/icons/Layers'

// Menu
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

// Draggable
import Draggable from 'react-draggable'

const actions = [
  { icon: <SearchIcon />, name: 'Search' },
  { icon: <LayersIcon />, name: 'Layers' },
  { icon: <SettingsIcon />, name: 'Settings' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' }
]

export default class extends PureComponent {
  state = {
    open: false,
    searchActive: false
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { searchActive } = this.state
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
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => this.setState({ open: false, searchActive: !searchActive })}
            />
          ))}
        </SpeedDial>
        <Draggable
          axis="both"
          handle=".draggable-handle"
          defaultPosition={{ x: 400, y: 200 }}
          position={null}
          grid={[1, 1]}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
        >
          <div
            style={{
              zIndex: 50,
              // width: 800,
              position: 'absolute',
              display: searchActive ? 'block' : 'none'
            }}
          >
            <Card variant="elevation">
              <CardContent style={{ padding: 0 }}>
                <div className="draggable-handle">
                  <AppBar position="relative" variant="outlined">
                    <Toolbar disableGutters variant="dense">
                      <DragIndicatorIcon />
                      <Typography
                        style={{ padding: '0 50px 0 10px' }}
                        display="block"
                        variant="overline"
                      >
                        CKAN catalogue search
                      </Typography>
                      <IconButton
                        onClick={() => this.setState({ searchActive: false })}
                        edge="start"
                        color="inherit"
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                </div>
              </CardContent>
              <CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </CardContent>
            </Card>
          </div>
        </Draggable>
      </>
    )
  }
}
