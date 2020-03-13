import 'react-resizable/css/styles.css'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { DragIndicator, Close as CloseButton } from '@material-ui/icons'

export default ({ active, close, title, children, onMouseDown, zIndex = 1 }) => {
  const [width, setWidth] = useState(450)
  const [height, setHeight] = useState(400)
  const onResize = (event, { element, size, handle }) => {
    setWidth(size.width)
    setHeight(size.height)
  }
  return (
  <div style={{ position: 'absolute' }}>
    <Draggable
      axis="both"
      handle=".draggable-handle"
      defaultPosition={{ x: 100, y: 25 }}
      position={null}
      grid={[15, 15]}
      scale={1}
    >
      <div
        style={{
          opacity: 0.8,
          zIndex,
          position: 'relative',
          display: active ? 'block' : 'none'
        }}
      >
        <Card variant="elevation">
          <ResizableBox
            width={450}
            height={400}
            minConstraints={[200, 200]}
            draggableOpts={{ grid: [15, 15] }}
            onResize={onResize}
          >
            <CardContent style={{ padding: 0 }}>
              <div onMouseDown={onMouseDown} className="draggable-handle">
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
                      <CloseButton />
                    </IconButton>
                  </Toolbar>
                </AppBar>
              </div>
              </CardContent>
              <div style={{ height: 'calc(100% - 35px)', padding: '10px 5px' }}>
                <div className="thin-scrollbar" style={{ height: '100%', overflow: 'auto' }}>
                  <CardContent>{children(height, width)}</CardContent>
                </div>
              </div>
            </ResizableBox>
          </Card>
        </div>
      </Draggable>
    </div>
  )
}
