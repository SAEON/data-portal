import React from 'react'
import Draggable from 'react-draggable'
import {
  Card,
  CardContent,
  CardActions,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core'
import { DragIndicator, Close } from '@material-ui/icons'

export default ({ active, close, title, children }) => (
  <div style={{ position: 'absolute' }}>
    <Draggable
      axis="both"
      handle=".draggable-handle"
      defaultPosition={{ x: 100, y: 25 }}
      position={null}
      grid={[1, 1]}
      scale={1}
    >
      <div
        style={{
          opacity: 0.8,
          zIndex: 1,
          position: 'relative',
          display: active ? 'block' : 'none'
        }}
      >
        <Card variant="elevation">
          <CardContent style={{ padding: 0 }}>
            <div className="draggable-handle">
              <AppBar position="relative" variant="outlined">
                <Toolbar disableGutters className="thin-header">
                  <DragIndicator />
                  <Typography variant="overline">{title}</Typography>
                  <IconButton
                    onClick={close}
                    edge="start"
                    color="inherit"
                    style={{ order: 2, marginLeft: 'auto', padding: 2 }}
                    aria-label="close"
                  >
                    <Close />
                  </IconButton>
                </Toolbar>
              </AppBar>
            </div>
          </CardContent>
          <CardContent>
            <CardActions>{children}</CardActions>
          </CardContent>
        </Card>
      </div>
    </Draggable>
  </div>
)
