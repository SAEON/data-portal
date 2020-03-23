import 'react-resizable/css/styles.css'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { DragIndicator, Close as CloseButton } from '@material-ui/icons'

const borderedBackground = `linear-gradient(to right, #adadad 4px, transparent 4px) 0 0,
linear-gradient(to right, #adadad 4px, transparent 4px) 0 100%,
linear-gradient(to left, #adadad 4px, transparent 4px) 100% 0,
linear-gradient(to left, #adadad 4px, transparent 4px) 100% 100%,
linear-gradient(to bottom, #adadad 4px, transparent 4px) 0 0,
linear-gradient(to bottom, #adadad 4px, transparent 4px) 100% 0,
linear-gradient(to top, #adadad 4px, transparent 4px) 0 100%,
linear-gradient(to top, #adadad 4px, transparent 4px) 100% 100%`

export default ({
  active,
  close,
  title,
  children,
  onMouseDown,
  zIndex = 1,
  defaultPosition = { x: 100, y: 25 },
  defaultWidth = 450,
  defaultHeight = 400,
}) => {
  const [width, setWidth] = useState(defaultWidth)
  const [height, setHeight] = useState(defaultHeight)
  const [isResizing, setIsResizing] = useState(false)

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
              minConstraints={[250, 200]}
              draggableOpts={{ grid: [5, 5] }}
              onResizeStart={() => {
                setIsResizing(true)
              }}
              onResizeStop={(event, { /* element */ size /* handle */ }) => {
                setWidth(size.width)
                setHeight(size.height)
                setIsResizing(false)
              }}
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
              <div
                style={{
                  height: 'calc(100% - 35px)',
                  padding: '2px', //10px 5px'
                }}
              >
                <div
                  className="thin-scrollbar"
                  style={{
                    height: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    background: isResizing ? borderedBackground : undefined,
                    backgroundRepeat: isResizing ? 'no-repeat' : undefined,
                    backgroundSize: isResizing ? '20px 20px' : undefined,
                  }}
                >
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
