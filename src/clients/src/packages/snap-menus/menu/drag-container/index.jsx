import Draggable from 'react-draggable'
import debounce from '../../../../lib/fns/debounce'
import getSnapZone from '../fns/get-snap-zone'
import parseEventXY from '../fns/parse-event-x-y'
import offset from '../../lib/offset'
import getDimensions from '../fns/get-dimensions'
import getPosition from '../fns/get-position'

var allowInteractions = true
var timer

export default ({
  children,
  defaultSnap,
  defaultPosition,
  getDefaultPosition,
  state,
  setState,
  setZIndex,
  getActiveMenuZIndex,
  PORTAL,
  defaultHeight,
  snapZone,
  setSnapZone,
  GHOST_GUTTER_X
}) => {
  return (
    <Draggable
      axis="both"
      handle=".drag-handle"
      defaultPosition={
        defaultSnap
          ? getPosition(defaultSnap, PORTAL, GHOST_GUTTER_X)
          : defaultPosition || getDefaultPosition()
      }
      bounds={{ left: 0, top: 0 }}
      position={state.position}
      grid={[1, 1]}
      scale={1}
      onStart={ev => {
        /**
         * Stop interactions with the menus for 1 second
         *
         * TODO - Why? And if this is really necessary should
         * not be app-level debouncing
         */
        allowInteractions = false
        clearTimeout(timer)
        timer = setTimeout(() => (allowInteractions = true), 100)

        const { x, y } = parseEventXY(ev)
        const { target } = ev
        const { className } = target

        /**
         * Make sure that drag-handle is the event target
         * There can be other elements in the header that
         * SHOULD NOT trigger drag
         */
        if (typeof className !== 'string') return

        /**
         * If the drag handle is selected
         * update the zIndex
         */
        setZIndex(getActiveMenuZIndex())

        /**
         * previousDimensions is only set when
         * a menu is 'snapped'
         */
        if (state.previousDimensions && !state.minimized) {
          setState(
            Object.assign(
              { ...state },
              {
                position: {
                  x: x - state.previousDimensions.width / 2 - offset(PORTAL).left,
                  y: y - 15 - offset(PORTAL).top
                },
                dimensions: Object.assign(
                  { ...state.previousDimensions },
                  {
                    height: state.minimized
                      ? MENU_HEADER_HEIGHT
                      : state.maximizedHeight || state.previousDimensions.height
                  }
                ),
                previousDimensions: null,
                maximizedHeight: defaultHeight
              }
            )
          )
        }
      }}
      onDrag={debounce(ev => {
        const { x, y } = parseEventXY(ev)

        /**
         * Check if the user is hovering over a snap zone
         */
        const newSnapZone = getSnapZone(x, y, PORTAL)

        if (snapZone && !newSnapZone) {
          setSnapZone(null)
        } else if (newSnapZone) {
          setSnapZone(newSnapZone)
        }
      }, 10)}
      onStop={ev => {
        /**
         * For touch devices, this event
         * is fired twice. discard the non-touch
         * event (but either could be discarded)
         */
        if (ev.constructor !== TouchEvent && ev.constructor !== MouseEvent) {
          return
        }

        const { x, y } = parseEventXY(ev)

        /**
         * Reset state.snapZone (used by the ghost component)
         */
        setSnapZone(undefined)

        /**
         * Check if the menu has been
         * dropped in a snap zone
         *
         * allowInteractions is false for
         * 100ms after a menu is clicked
         * to prevent immediate snapping
         */
        const snapZone = allowInteractions ? getSnapZone(x, y, PORTAL) : undefined

        if (snapZone) {
          setState(
            Object.assign(
              { ...state },
              {
                minimized: false,
                snapped: true,
                dimensions: getDimensions(snapZone, PORTAL, GHOST_GUTTER_X),
                position: getPosition(snapZone, PORTAL, GHOST_GUTTER_X),
                previousDimensions: state.dimensions
              }
            )
          )
        } else {
          setState(
            Object.assign(
              { ...state },
              {
                snapped: false,
                position: undefined
              }
            )
          )
        }
      }}
    >
      {children}
    </Draggable>
  )
}
