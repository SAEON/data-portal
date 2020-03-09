import React from 'react'
import Draggable from 'react-draggable'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { DragIndicator, Close } from '@material-ui/icons'

export default ({ active, close, title, children }) => (
  <div style={{ position: 'absolute' }}>
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
          position: 'relative',
          display: active ? 'block' : 'none'
        }}
      >
        <Card variant="elevation">
          <CardContent style={{ padding: 0 }}>
            <div className="draggable-handle">
              <AppBar position="relative" variant="outlined">
                <Toolbar disableGutters variant="dense">
                  <DragIndicator />
                  <Typography
                    style={{ padding: '0 50px 0 10px' }}
                    display="block"
                    variant="overline"
                  >
                    {title}
                  </Typography>
                  <IconButton
                    onClick={close}
                    edge="start"
                    color="inherit"
                    style={{ order: 2, marginLeft: 'auto' }}
                    aria-label="close"
                  >
                    <Close />
                  </IconButton>
                </Toolbar>
              </AppBar>
            </div>
          </CardContent>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </Draggable>
  </div>
)
