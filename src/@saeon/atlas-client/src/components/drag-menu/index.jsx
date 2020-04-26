import 'react-resizable/css/styles.css'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import { EventBoundary } from '..'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { DragIndicator, Close as CloseButton } from '@material-ui/icons'
import useStyles from './style'
import { debounce } from '../../lib/fns'
import clsx from 'clsx'

// Get the width of the page
const container = document.getElementById('root')
const containerHeight = container.offsetHeight
const containerWidth = container.offsetWidth

const getPositionFromSnap = (snapZone) => {
  if (snapZone === 'Top' || snapZone === 'TopLeft' || snapZone === 'Left') return { x: 0, y: 0 }
  if (snapZone === 'Right' || snapZone === 'TopRight') return { x: containerWidth / 2, y: 0 }
  if (snapZone === 'Bottom' || snapZone === 'BottomLeft') return { x: 0, y: containerHeight / 2 }
  if (snapZone === 'BottomRight') return { x: containerWidth / 2, y: containerHeight / 2 }
  return null
}

const getDimensionsFromSnap = (snapZone) => {
  if (snapZone === 'Top') return { width: containerWidth, height: containerHeight }
  if (snapZone === 'Left' || snapZone === 'Right')
    return { width: containerWidth / 2, height: containerHeight }
  if (
    snapZone === 'TopLeft' ||
    snapZone === 'TopRight' ||
    snapZone === 'BottomLeft' ||
    snapZone === 'BottomRight'
  )
    return { width: containerWidth / 2, height: containerHeight / 2 }
  if (snapZone === 'Bottom') return { width: containerWidth, height: containerHeight / 2 }
  return null
}

const getSnapZone = (x, y) => {
  const snapZoneX = 75
  const snapZoneY = 75
  const snapTop = y <= snapZoneY ? true : false
  const snapBottom = y >= containerHeight - snapZoneY ? true : false
  const snapLeft = x <= snapZoneX ? true : false
  const snapRight = x >= containerWidth - snapZoneX ? true : false

  let snapZone = null
  if (snapLeft && snapTop) {
    snapZone = 'TopLeft'
  } else if (snapRight && snapTop) {
    snapZone = 'TopRight'
  } else if (snapLeft && snapBottom) {
    snapZone = 'BottomLeft'
  } else if (snapRight && snapBottom) {
    snapZone = 'BottomRight'
  } else if (snapTop) {
    snapZone = 'Top'
  } else if (snapLeft) {
    snapZone = 'Left'
  } else if (snapRight) {
    snapZone = 'Right'
  } else if (snapBottom) {
    snapZone = 'Bottom'
  }

  return snapZone
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
  const classes = useStyles({ height: containerHeight, width: containerWidth })()

  // State related to snapping
  const [snapState, setSnapState] = useState({
    snapZone: null,
    snapped: false,
  })

  // State related to the size of the menus
  const [sizeState, setSizeState] = useState({
    isResizing: false,
    dimensions: { width: defaultWidth, height: defaultHeight },
    position: null,
  })

  return (
    <EventBoundary>
      {/* Snap ghost */}
      <div
        style={{
          zIndex,
          position: 'relative',
          display: snapState.snapZone ? 'block' : 'none',
        }}
      >
        <div
          className={clsx({
            [classes.ghost]: true,
            [classes[snapState.snapZone]]: true,
          })}
        />
      </div>

      {/* Menu */}
      <div style={{ position: 'absolute' }}>
        <Draggable
          axis="both"
          handle=".draggable-handle"
          defaultPosition={defaultPosition}
          bounds={{ left: 0, top: 0 }}
          position={sizeState.position}
          grid={[5, 5]}
          scale={1}
          onDrag={debounce(({ x, y }) => {
            if (sizeState.previousDimensions) {
              setSizeState(
                Object.assign(
                  { ...sizeState },
                  {
                    position: { x: x - sizeState.previousDimensions.width / 2, y: y - 15 },
                    dimensions: sizeState.previousDimensions,
                    previousDimensions: null,
                  }
                )
              )
            }

            const snapZone = getSnapZone(x, y)
            if (snapZone && snapZone !== snapState.snapZone) {
              setSnapState({
                snapZone,
              })
            } else if (!snapZone && snapState.snapZone) {
              setSnapState({
                snapZone,
              })
            }
          }, 40)}
          onStop={() => {
            if (snapState.snapZone) {
              const dimensions = getDimensionsFromSnap(snapState.snapZone)
              const position = getPositionFromSnap(snapState.snapZone)
              const previousDimensions = sizeState.dimensions
              setSnapState({
                snapZone: null,
                snapped: true,
              })
              setSizeState(
                Object.assign(
                  { ...sizeState },
                  {
                    dimensions,
                    position,
                    previousDimensions,
                  }
                )
              )
            } else {
              setSnapState(
                Object.assign(
                  { ...snapState },
                  {
                    snapped: false,
                  }
                )
              )
              setSizeState(
                Object.assign(
                  { ...sizeState },
                  {
                    position: null,
                    previousDimensions: null,
                  }
                )
              )
            }
          }}
        >
          <div
            style={{
              opacity: snapState.snapped ? 1 : 0.8,
              zIndex,
              position: 'relative',
            }}
          >
            <Card style={snapState.snapped ? { borderRadius: 0 } : {}} variant="elevation">
              <ResizableBox
                resizeHandles={resizable ? ['se'] : []}
                width={sizeState.dimensions.width}
                height={sizeState.dimensions.height}
                axis={resizable ? 'both' : 'none'}
                minConstraints={[Math.min(250, defaultWidth), Math.min(200, defaultHeight)]}
                draggableOpts={{ grid: [5, 5] }}
                onResizeStart={() => {
                  if (!resizable) return
                  setSizeState({
                    isResizing: true,
                    dimensions: { ...sizeState.dimensions },
                  })
                }}
                onResizeStop={(e, { size }) => {
                  if (!resizable) return
                  setSizeState({
                    dimensions: {
                      width: size.width,
                      height: size.height,
                    },
                    isResizing: false,
                  })
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
                      [classes.resizing]: sizeState.isResizing,
                      'thin-scrollbar': true,
                    })}
                  >
                    <CardContent style={{ paddingBottom: 12 }}>
                      {typeof children === 'function'
                        ? children({
                            height: sizeState.dimensions.height - 70,
                            width: sizeState.dimensions.width - 32,
                          })
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
