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
  const [indicatorProperties, setIndicatorProperties] = useState({
    active: false,
    position: { x: null, y: null },
    height: null,
    width: null,
  })
  const [isResizing, setIsResizing] = useState(false)

  const onDrag = (DraggableEventHandler) => {
    //fetching parent dimensions
    const containerHeight = document.getElementById('olreact-mapprovider').clientHeight //refactor to ref / prop
    const containerWidth = document.getElementById('olreact-mapprovider').clientWidth //refactor to ref / prop
    //fetching dragMenu position. DraggableEventHandler has several other position values should chosen values have unforseen issues
    const { clientX, clientY } = DraggableEventHandler
    console.log('dragevent', DraggableEventHandler)
    //if snapped left
    if (clientX <= 0) {
      //if snapped left-top-corner
      if (clientY <= 0) {
        setIndicatorProperties({
          active: true,
          position: { x: 0, y: 0 },
          height: containerHeight / 2,
          width: containerWidth / 2,
        })
      }

      //else if snapped left-bot-corner
      else if (clientY >= containerHeight) {
        setIndicatorProperties({
          active: true,
          position: { x: 0, y: containerHeight / 2 },
          height: containerHeight / 2,
          width: containerWidth / 2,
        })
      }

      //else snapped left
      else {
        setIndicatorProperties({
          active: true,
          position: { x: 0, y: 0 },
          height: containerHeight,
          width: containerWidth / 2,
        })
      }
    }

    //else if snapped right
    else if (clientX >= containerWidth) {
      //if snapped right-top-corner
      if (clientY <= 0) {
        setIndicatorProperties({
          active: true,
          position: { x: containerWidth - width, y: 0 },
          height: containerHeight / 2,
          width: containerWidth / 2,
        })
      }

      //else if snapped right-bot-corner
      else if (clientY >= containerHeight) {
        setIndicatorProperties({
          active: true,
          position: { x: containerWidth - width, y: containerHeight / 2 },
          height: containerHeight / 2,
          width: containerWidth / 2,
        })
      }
      //else snapped right
      else {
        setIndicatorProperties({
          active: true,
          position: { x: containerWidth - width, y: 0 },
          height: containerHeight,
          width: containerWidth / 2,
        })
      }
    }
    //else if snapped top
    else if (clientY <= 0) {
      setIndicatorProperties({
        active: true,
        position: { x: 0, y: 0 },
        height: containerHeight,
        width: containerWidth,
      })
    }
    //else not snapped
    else onUnsnap()
  }
  const onUnsnap = () => {
    if (indicatorProperties.active)
      setIndicatorProperties({
        active: true,
        position: { x: null, y: null },
        width: null,
        height: null,
      })
    // setHeight(defaultHeight)
    // setWidth(defaultWidth)
    // setPosition(null)
  }
  return (
    <div style={{ position: 'absolute' }}>
      <div
        id="snap-indicator"
        style={{
          zIndex,
          position: 'relative',
          display: indicatorProperties.active ? 'block' : 'none',
        }}
      >
        <Card
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            height: indicatorProperties.height,
            width: indicatorProperties.width,
            left: indicatorProperties.position.x,
            top: indicatorProperties.position.y,
          }}
        ></Card>
      </div>
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
