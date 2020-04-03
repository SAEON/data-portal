import 'react-resizable/css/styles.css'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { DragIndicator, Close as CloseButton } from '@material-ui/icons'
// import html2canvas from 'html2canvas'
// const test = () => {
//   console.log('in test')
//   html2canvas(document.body).then(function (canvas) {
//     console.log('canvas', canvas)
//     console.log('in then')
//     document.body.appendChild(canvas)
//     console.log('appended child')
//   })
//   console.log('done!')
// }

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
  const [, setSnappedLeft] = useState(false)
  const [, setSnappedRight] = useState(false)
  // const [snapReady, setSnapReady] = useState(false)

  const onDrag = (DraggableEventHandler) => {
    //fetching parent dimensions
    const containerHeight = document.getElementById('olreact-mapprovider').clientHeight
    const containerWidth = document.getElementById('olreact-mapprovider').clientWidth
    //fetching dragMenu position. DraggableEventHandler has several other position values should offset values have unforseen issues
    const { offsetX } = DraggableEventHandler

    //if snapped left
    if (offsetX <= 0) {
      setSnappedLeft(true)
      setHeight(containerHeight)
      setPosition({ x: 0, y: 0 })
    }
    //else if snapped right
    else if (offsetX >= containerWidth) {
      setSnappedRight(true)
      setHeight(containerHeight)
      setPosition({ x: containerWidth - width, y: 0 })
    }
    //else not snapped
    else onUnsnap()
  }
  const onUnsnap = () => {
    setSnappedLeft(false)
    setSnappedRight(false)
    setHeight(defaultHeight)
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
