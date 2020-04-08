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
  const [position, setPosition] = useState(null)
  const [width, setWidth] = useState(defaultWidth)
  const [height, setHeight] = useState(defaultHeight)
  const [isResizing, setIsResizing] = useState(false)

  const onDrag = (DraggableEventHandler) => {
    //fetching parent dimensions
    const containerHeight = document.getElementById('olreact-mapprovider').clientHeight
    const containerWidth = document.getElementById('olreact-mapprovider').clientWidth
    //fetching dragMenu position. DraggableEventHandler has several other position values should offset values have unforseen issues
    const { offsetX, offsetY } = DraggableEventHandler

    //if snapped left
    if (offsetX <= 0) {
      //if snapped left-top-corner
      if (offsetY <= 0) {
        setPosition({ x: 0, y: 0 })
        setHeight(containerHeight / 2)
        setWidth(containerWidth / 2)
      }

      //else if snapped left-bot-corner
      else if (offsetY >= containerHeight) {
        setPosition({ x: 0, y: containerHeight / 2 })
        setHeight(containerHeight / 2)
        setWidth(containerWidth / 2)
      }

      //else snapped left
      else {
        setPosition({ x: 0, y: 0 })
        setHeight(containerHeight)
        setWidth(containerWidth / 2)
      }
    }

    //else if snapped right
    else if (offsetX >= containerWidth) {
      //if snapped right-top-corner
      if (offsetY <= 0) {
        setPosition({ x: containerWidth - width, y: 0 })
        setHeight(containerHeight / 2)
        setWidth(containerWidth / 2)
      }

      //else if snapped right-bot-corner
      else if (offsetY >= containerHeight) {
        setPosition({ x: containerWidth - width, y: containerHeight / 2 })
        setHeight(containerHeight / 2)
        setWidth(containerWidth / 2)
      }
      //else snapped right
      else {
        setPosition({ x: containerWidth - width, y: 0 })
        setHeight(containerHeight)
        setWidth(containerWidth / 2)
      }
    }
    //else if snapped top
    else if (offsetY <= 0) {
      setPosition({ x: 0, y: 0 })
      setHeight(containerHeight)
      setWidth(containerWidth)
    }
    //else not snapped
    else onUnsnap()
  }
  const onUnsnap = () => {
    setHeight(defaultHeight)
    setWidth(defaultWidth)
    setPosition(null)
  }
  return (
    <div style={{ position: 'absolute' }}>
      <Draggable
        axis="both"
        handle=".draggable-handle"
        defaultPosition={defaultPosition}
        bounds={{ left: 0, top: 0 }}
        position={position}
        grid={[5, 5]}
        scale={1}
        onDrag={onDrag}
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
              onResizeStop={(event, { size }) => {
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
                  padding: '2px',
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
                    {/* <button onClick={test}>TEST</button> */}
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
