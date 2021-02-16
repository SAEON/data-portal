import { useRef, useContext } from 'react'
import { createPortal } from 'react-dom'
import SnapMenu from './menu/index.jsx'
import context from './context.js'

/**
 * Module level cache of refs
 * Updated every time the
 * component is called
 */
const refs = {}

const INITIAL_Z_INDEX = 1

/**
 * Iterates over all current refs and
 * returns the highest zIndex value + 1
 */
const getActiveMenuZIndex = () => {
  const zIndices = Object.entries(refs).map(
    ([, { current: zIndex }]) => (zIndex || INITIAL_Z_INDEX) + 1
  )
  const zIndex = zIndices.length ? Math.max(...zIndices) : INITIAL_Z_INDEX
  return zIndex
}

const getDefaultPosition = () => {
  return { x: 150, y: 125 }
}

/**
 * Export a React Hook
 */
export default ({ id }) => {
  const ref = useRef()
  refs[id] = ref

  const {
    PORTAL,
    PORTAL_MARGIN_TOP,
    PORTAL_MARGIN_RIGHT,
    PORTAL_MARGIN_BOTTOM,
    PORTAL_MARGIN_LEFT,
  } = useContext(context)

  return props => (
    <SnapMenu
      // From Provider
      PORTAL={PORTAL}
      PORTAL_MARGIN_TOP={PORTAL_MARGIN_TOP}
      PORTAL_MARGIN_RIGHT={PORTAL_MARGIN_RIGHT}
      PORTAL_MARGIN_BOTTOM={PORTAL_MARGIN_BOTTOM}
      PORTAL_MARGIN_LEFT={PORTAL_MARGIN_LEFT}
      // This hook
      renderMenu={C => createPortal(C, PORTAL)}
      getDefaultPosition={getDefaultPosition}
      getActiveMenuZIndex={getActiveMenuZIndex}
      ref={ref}
      // User props
      {...props}
    />
  )
}
