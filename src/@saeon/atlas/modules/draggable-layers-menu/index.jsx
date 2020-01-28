import React from 'react'
import Draggable from 'react-draggable'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

export default ({ active, close }) => (
  <Draggable
    axis="both"
    handle=".draggable-handle"
    defaultPosition={{ x: 400, y: 200 }}
    position={null}
    grid={[1, 1]}
    scale={1}
  >
    <div
      style={{
        opacity: 0.8,
        zIndex: 50,
        position: 'absolute',
        display: active ? 'block' : 'none'
      }}
    >
      <Card variant="elevation">
        <CardContent style={{ padding: 0 }}>
          <div className="draggable-handle">
            <AppBar position="relative" variant="outlined">
              <Toolbar disableGutters variant="dense">
                <DragIndicatorIcon />
                <Typography style={{ padding: '0 50px 0 10px' }} display="block" variant="overline">
                  Layers
                </Typography>
                <IconButton
                  onClick={close}
                  edge="start"
                  color="inherit"
                  style={{ order: 2, marginLeft: 'auto' }}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
        </CardContent>
        <CardContent>
          <div>hi</div>
        </CardContent>
      </Card>
    </div>
  </Draggable>
)
