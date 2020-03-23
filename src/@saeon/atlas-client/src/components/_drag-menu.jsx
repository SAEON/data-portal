import 'react-resizable/css/styles.css'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { DragIndicator, Close as CloseButton } from '@material-ui/icons'

export default ({
  active,
  close,
  title,
  children,
  onMouseDown,
  zIndex,
  defaultPosition = { x: 100, y: 25 },
  defaultWidth = 450,
  defaultHeight = 400,
}) => {
  const [width, setWidth] = useState(defaultWidth)
  const [height, setHeight] = useState(defaultHeight)
  const onResize = (event, { size }) => {
    setWidth(size.width)
    setHeight(size.height)
  }
  return (
    <div style={{ position: 'absolute' }}>
      <Draggable
        axis="both"
        handle=".draggable-handle"
        defaultPosition={defaultPosition}
        bounds={{ left: 0, top: 0 }}
        position={null}
        grid={[5, 5]}
        scale={1}
      >
        <div
          style={{
            opacity: 0.8,
            zIndex,
            position: 'relative',
            display: active ? 'block' : 'none',
          }}
        >
          <Card variant="elevation">
            <ResizableBox
              width={width}
              height={height}
              minConstraints={[200, 200]}
              draggableOpts={{ grid: [5, 5] }}
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
                  <CardContent>
                    {typeof children === 'function' ? children({ height, width }) : children}
                  </CardContent>
                </div>
              </div>
            </ResizableBox>
          </Card>
        </div>
      </Draggable>
    </div>
  )
}
