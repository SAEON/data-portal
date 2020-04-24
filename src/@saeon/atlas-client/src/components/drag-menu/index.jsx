import 'react-resizable/css/styles.css'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import { EventBoundary } from '..'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { DragIndicator, Close as CloseButton } from '@material-ui/icons'
import useStyles from './style'
import clsx from 'clsx'

// Get the width of the page
const container = document.getElementById('root')
const containerHeight = container.offsetHeight
const containerWidth = container.offsetWidth

const snapZoneX = 100
const snapZoneY = 50

/**
 * | 1 | 2 |
 * | 3 | 4 |
 */
const quadrants = {
  1: { x: 0, y: 0 },
  2: { x: containerWidth / 2, y: 0 },
  3: { x: 0, y: containerHeight / 2 },
  4: { x: containerWidth / 2, y: containerHeight / 2 },
}

const getSnapZone = (x, y) => {
  const snapLeft = x <= snapZoneX ? true : false
  const snapRight = x >= containerWidth - snapZoneX ? true : false
  const snapTop = y <= snapZoneY ? true : false
  const snapBottom = y >= containerHeight - snapZoneY ? true : false

  let position = null
  const midX = containerWidth / 2
  const midY = containerHeight / 2

  if (x < midX && y < midY) {
    position = quadrants[1]
  } else if (x > midX && y < midY) {
    position = quadrants[2]
  } else if (x < midX && y > midY) {
    position = quadrants[3]
  } else if (x > midX && y > midY) {
    position = quadrants[4]
  }

  return {
    position,
    active: snapLeft || snapRight || snapTop || snapBottom || false,
    height:
      (snapTop && (snapLeft || snapRight)) || snapBottom ? containerHeight / 2 : containerHeight,
    width: snapLeft || snapRight ? containerWidth / 2 : containerWidth,
  }
}

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
  const classes = useStyles()
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

  return (
    <EventBoundary>
      <div
        style={{
          zIndex,
          position: 'relative',
          display: indicatorProperties.active ? 'block' : 'none',
        }}
      >
        <div
          className={classes.snapOutline}
          style={{
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
          onDrag={(e) => {
            const { clientX: mouseX, clientY: mouseY } = e
            setDimensions({ width: presnapDimensions.width, height: presnapDimensions.height })
            const result = getSnapZone(mouseX, mouseY)
            setIndicatorProperties(result)
          }}
          onStop={() => {
            if (indicatorProperties.active) {
              setDimensions({
                width: indicatorProperties.width,
                height: indicatorProperties.height,
              })
              setPosition({ x: indicatorProperties.position.x, y: indicatorProperties.position.y })
            } else setPosition(null)
            setIndicatorProperties({ position: null, width: null, height: null, active: null })
          }}
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
                onResizeStop={(e, { size }) => {
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
                <div className={classes.menuContent}>
                  <div
                    className={clsx({
                      [classes.resizing]: isResizing,
                      'thin-scrollbar': true,
                    })}
                  >
                    <CardContent style={{ paddingBottom: 12 }}>
                      {typeof children === 'function'
                        ? children({ height: dimensions.height - 70, width: dimensions.width - 32 })
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
