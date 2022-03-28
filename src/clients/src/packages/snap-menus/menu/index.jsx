import 'react-resizable/css/styles.css'
import { createPortal } from 'react-dom'
import { useState, useEffect, forwardRef } from 'react'
import Card from '@mui/material/Card'
import Fade from '@mui/material/Fade'
import getDimensions from './fns/get-dimensions'
import getPosition from './fns/get-position'
import DragContainer from './drag-container/index.jsx'
import ResizeContainer from './resize-container/index.jsx'
import EventBoundary from './event-boundary.jsx'
import MenuHeader from './header/index.jsx'
import MenuContent from './content/index.jsx'
import { styled } from '@mui/material/styles'

const snapZones = {
  TopLeft: ({ PORTAL, GHOST_GUTTER_X, GHOST_GUTTER_Y }) => ({
    height: PORTAL.offsetHeight / 2 - GHOST_GUTTER_Y,
    width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
    left: 0
  }),
  TopRight: ({ PORTAL, GHOST_GUTTER_X, GHOST_GUTTER_Y }) => ({
    height: PORTAL.offsetHeight / 2 - GHOST_GUTTER_Y,
    width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
    right: 0
  }),
  BottomLeft: ({ PORTAL, GHOST_GUTTER_X, GHOST_GUTTER_Y }) => ({
    height: PORTAL.offsetHeight / 2 - GHOST_GUTTER_Y,
    width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
    top: PORTAL.offsetHeight / 2 + GHOST_GUTTER_Y,
    left: 0
  }),
  BottomRight: ({ PORTAL, GHOST_GUTTER_X, GHOST_GUTTER_Y }) => ({
    height: PORTAL.offsetHeight / 2 - GHOST_GUTTER_Y,
    width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
    top: PORTAL.offsetHeight / 2 + GHOST_GUTTER_Y,
    right: 0
  }),
  Left: ({ PORTAL, GHOST_GUTTER_X }) => ({
    height: PORTAL.offsetHeight,
    width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
    left: 0
  }),
  Right: ({ PORTAL, GHOST_GUTTER_X }) => ({
    height: PORTAL.offsetHeight,
    width: PORTAL.offsetWidth / 2 - GHOST_GUTTER_X,
    right: 0
  }),
  Top: ({ PORTAL }) => ({
    height: PORTAL.offsetHeight,
    width: PORTAL.offsetWidth,
    left: 0,
    right: 0
  }),
  Bottom: ({ PORTAL, GHOST_GUTTER_Y }) => ({
    height: PORTAL.offsetHeight / 2 - GHOST_GUTTER_Y,
    width: PORTAL.offsetWidth,
    top: PORTAL.offsetHeight / 2 + GHOST_GUTTER_Y,
    left: 0,
    right: 0
  })
}

const Div = styled('div')({})

const MENU_HEADER_HEIGHT = 25

export default forwardRef(
  (
    {
      // From Provider
      PORTAL,
      PORTAL_MARGIN_TOP,
      PORTAL_MARGIN_RIGHT,
      PORTAL_MARGIN_BOTTOM,
      PORTAL_MARGIN_LEFT,

      // From hook
      getDefaultPosition,
      getActiveMenuZIndex,

      // From user
      title,
      children,
      resizable = true,
      draggable = true,
      defaultPosition,
      defaultWidth = 450,
      defaultHeight = 400,
      defaultSnap = false,
      open,
      onClose = undefined,
      opacity = 0.8,
      style = {},
      disableMinify = false
    },
    ref
  ) => {
    const GHOST_GUTTER_X = (PORTAL_MARGIN_RIGHT + PORTAL_MARGIN_LEFT) / 4
    const GHOST_GUTTER_Y = (PORTAL_MARGIN_TOP + PORTAL_MARGIN_BOTTOM) / 4

    /**
     * zIndex is set to the ref, and used to parse height
     * back to the parent component so that other menu
     * instances can be updated to zIndex + 1 height
     */
    const [zIndex, setZIndex] = useState(null)

    /**
     * This is set/unset in the onDrag callback
     * Used only by the dropzone shadow div
     */
    const [snapZone, setSnapZone] = useState(null)

    // General state
    const [state, setState] = useState({
      minimized: false,
      maximizedHeight: null,
      snapped: Boolean(defaultSnap),
      isResizing: false,
      dimensions: defaultSnap
        ? getDimensions(defaultSnap, PORTAL, GHOST_GUTTER_X)
        : { width: defaultWidth, height: defaultHeight },
      position: getPosition(defaultSnap, PORTAL, GHOST_GUTTER_X),
      previousDimensions: { width: defaultWidth, height: defaultHeight }
    })

    useEffect(() => {
      if (zIndex < getActiveMenuZIndex()) {
        setZIndex(getActiveMenuZIndex())
      }
      ref.current = zIndex
    }, [open, zIndex, ref, getActiveMenuZIndex])

    const onMinify = () => {
      setState(
        Object.assign(
          { ...state },
          {
            minimized: !state.minimized,
            maximizedHeight: state.minimized ? null : state.dimensions.height,
            maximizedWidth: state.minimized ? null : state.dimensions.width,
            dimensions: state.minimized
              ? {
                  width: state.maximizedWidth || defaultWidth,
                  height: state.maximizedHeight || defaultHeight
                }
              : { width: MENU_HEADER_HEIGHT + (onClose ? 25 : 0), height: MENU_HEADER_HEIGHT }
          }
        )
      )
    }

    return createPortal(
      <EventBoundary>
        <div style={{ display: open ? 'block' : 'none' }}>
          {/* Snap ghost */}
          <Div
            sx={{
              zIndex,
              position: 'relative',
              display: snapZone ? 'block' : 'none'
            }}
          >
            <Div
              sx={{
                position: 'absolute',
                boxShadow: '0px 0px 7px 3px rgba(140,140,140,1)',
                backgroundColor: 'black',
                opacity: '20%',
                ...snapZones[snapZone]?.({ PORTAL, GHOST_GUTTER_X, GHOST_GUTTER_Y })
              }}
            />
          </Div>

          {/* Menu */}
          <Fade key="menu-fade" in={open}>
            <div style={{ position: 'absolute' }}>
              <DragContainer
                draggable={draggable}
                defaultSnap={defaultSnap}
                defaultHeight={defaultHeight}
                defaultPosition={defaultPosition}
                getDefaultPosition={getDefaultPosition}
                state={state}
                setState={setState}
                setZIndex={setZIndex}
                getActiveMenuZIndex={getActiveMenuZIndex}
                PORTAL={PORTAL}
                snapZone={snapZone}
                setSnapZone={setSnapZone}
                GHOST_GUTTER_X={GHOST_GUTTER_X}
              >
                <div
                  style={Object.assign(style, {
                    opacity,
                    zIndex,
                    position: 'relative'
                  })}
                >
                  <Card style={state.snapped ? { borderRadius: 0 } : {}} variant="elevation">
                    <ResizeContainer
                      resizable={resizable}
                      state={state}
                      setState={setState}
                      defaultWidth={defaultWidth}
                      defaultHeight={defaultHeight}
                    >
                      <div style={{ height: '100%', position: 'relative' }}>
                        <MenuHeader
                          draggable={draggable}
                          state={state}
                          title={title}
                          onMinify={onMinify}
                          disableMinify={disableMinify}
                          onClose={onClose}
                        />
                        <MenuContent state={state} MENU_HEADER_HEIGHT={MENU_HEADER_HEIGHT}>
                          {children}
                        </MenuContent>
                      </div>
                    </ResizeContainer>
                  </Card>
                </div>
              </DragContainer>
            </div>
          </Fade>
        </div>
      </EventBoundary>,

      PORTAL
    )
  }
)
