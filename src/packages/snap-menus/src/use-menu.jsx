import React, { useRef, useContext } from 'react'
import { createPortal } from 'react-dom'
import SnapMenu from './menu'
import context from './context'

/**
 * Module level cache of refs
 * This object is updated everytime
 * a <SnapMenu /> is rendered
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
  const {
    containerHeight,
    containerWidth,
    VERTICAL_OFFSET_TOP,
    PORTAL,
    HORIZONTAL_MARGIN,
  } = useContext(context)
  const ref = useRef()
  refs[id] = ref

  return props => (
    <SnapMenu
      PORTAL={PORTAL}
      renderMenu={C => createPortal(C, PORTAL)}
      getDefaultPosition={getDefaultPosition}
      getActiveMenuZIndex={getActiveMenuZIndex}
      containerHeight={containerHeight}
      containerWidth={containerWidth}
      VERTICAL_OFFSET_TOP={VERTICAL_OFFSET_TOP}
      HORIZONTAL_MARGIN={HORIZONTAL_MARGIN}
      ref={ref}
      {...props}
    />
  )
}
