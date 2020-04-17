import 'react-resizable/css/styles.css'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import { EventBoundary } from '..'
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
/*bugs:
-There is an obvious performance issue. The entire component is potentially re-rendering every time onDrag is called. Either way ondrag needs to be looked at(debouncing may help)
-Search Menu button is in front of drag menus while layers and about buttons are behind
*/
export default ({
  close,
  title,
  children,
  resizable = true,
  onMouseDown,
  zIndex = 1,
  defaultPosition = { x: 100, y: 75 },
  defaultWidth = 450,
  defaultHeight = 400,
}) => {
  const [position, setPosition] = useState(null)
  const [dimensions, setDimensions] = useState({ width: defaultWidth, height: defaultHeight })
  const [presnapDimensions, setPresnapDimensions] = useState({
    width: defaultWidth,
    height: defaultHeight,
  })
  const [indicatorProperties, setIndicatorProperties] = useState({
    active: false,
    position: { x: null, y: null },
    height: null,
    width: null,
  })
  const [isResizing, setIsResizing] = useState(false)

  //fetching parent dimensions
  // const container = document.getElementById('olreact-mapprovider')
  // const container = document.getElementsByClassName('ol-overlaycontainer')[0]
  const container = document.getElementById('root')
  const containerHeight = container.offsetHeight //refactor to ref / prop
  const containerWidth = container.offsetWidth //refactor to ref / prop

  const DetermineIndicator = (x, y) => {
    const pastLeft = x <= 0 ? true : false
    const pastRight = x >= containerWidth ? true : false
    const pastTop = y <= 0 ? true : false
    const pastBot = y >= containerHeight ? true : false

    if (pastLeft) {
      if (pastTop) {
        setIndicatorProperties({
          active: true,
          position: { x: 0, y: 0 },
          height: containerHeight / 2,
          width: containerWidth / 2,
        })
      } else if (pastBot) {
        setIndicatorProperties({
          active: true,
          position: { x: 0, y: containerHeight / 2 },
          height: containerHeight / 2,
          width: containerWidth / 2,
        })
      } else {
        setIndicatorProperties({
          active: true,
          position: { x: 0, y: 0 },
          height: containerHeight,
          width: containerWidth / 2,
        })
      }
    } else if (pastRight) {
      if (pastTop) {
        setIndicatorProperties({
          active: true,
          position: { x: containerWidth / 2, y: 0 },
          height: containerHeight / 2,
          width: containerWidth / 2,
        })
      } else if (pastBot) {
        setIndicatorProperties({
          active: true,
          position: { x: containerWidth / 2, y: containerHeight / 2 },
          height: containerHeight / 2,
          width: containerWidth / 2,
        })
      } else {
        setIndicatorProperties({
          active: true,
          position: { x: containerWidth / 2, y: 0 },
          height: containerHeight,
          width: containerWidth / 2,
        })
      }
    } else if (pastTop) {
      setIndicatorProperties({
        active: true,
        position: { x: 0, y: 0 },
        height: containerHeight,
        width: containerWidth,
      })
    } else {
      setIndicatorProperties({
        active: false,
        position: null,
        height: null,
        width: null,
      })
    }
  }

  const onDrag = (DraggableEventHandler) => {
    setDimensions({ width: presnapDimensions.width, height: presnapDimensions.height })
    //fetching mouse position. DraggableEventHandler has several other position properties should chosen values have unforseen issues
    const { clientX: mouseX, clientY: mouseY } = DraggableEventHandler
    DetermineIndicator(mouseX, mouseY)
  }
  const onStop = () => {
    if (indicatorProperties.active) {
      setDimensions({ width: indicatorProperties.width, height: indicatorProperties.height })
      setPosition({ x: indicatorProperties.position.x, y: indicatorProperties.position.y })
    } else setPosition(null)
    setIndicatorProperties({ position: null, width: null, height: null, active: null })
  }

  return (
    <EventBoundary>
      <div
        id="snap-indicator"
        style={{
          zIndex,
          position: 'relative',
          display: indicatorProperties.active ? 'block' : 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            boxShadow: '0px 0px 7px 3px rgba(140,140,140,1)',
            backgroundColor: 'black',
            opacity: '50%',
            height: indicatorProperties.height,
            width: indicatorProperties.width,
            left: indicatorProperties.position?.x,
            top: indicatorProperties.position?.y,
          }}
        ></div>
      </div>
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
          onStop={onStop}
        >
          <div
            style={{
              opacity: 0.8,
              zIndex,
              position: 'relative',
            }}
          >
            <Card variant="elevation">
              <ResizableBox
                resizeHandles={resizable ? ['se'] : []}
                width={dimensions.width}
                height={dimensions.height}
                axis={resizable ? 'both' : 'none'}
                minConstraints={[Math.min(250, defaultWidth), Math.min(200, defaultHeight)]}
                draggableOpts={{ grid: [5, 5] }}
                onResizeStart={() => {
                  if (!resizable) return
                  setIsResizing(true)
                }}
                onResizeStop={(event, { size }) => {
                  if (!resizable) return
                  setDimensions({ width: size.width, height: size.height })
                  setIsResizing(false)
                  if (
                    size.width !== indicatorProperties.width &&
                    size.height !== indicatorProperties.height
                  ) {
                    setPresnapDimensions({ width: size.width, height: size.height })
                  }
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
                      {typeof children === 'function'
                        ? children({ height: dimensions.height, width: dimensions.width })
                        : children}
                    </CardContent>
                  </div>
                </div>
              </ResizableBox>
            </Card>
          </div>
        </Draggable>
      </div>
    </EventBoundary>
  )
}
