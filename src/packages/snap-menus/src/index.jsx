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

/**
 * Iterates over all current refs and
 * returns the highest zIndex value + 1
 */
const getActiveMenuZIndex = () => {
  const zIndices = Object.entries(refs).map(([, { current }]) => (current?.zIndex || 1) + 1)
  const zIndex = zIndices.length ? Math.max(...zIndices) : 2
  return zIndex
}

const getDefaultPosition = () => {
  const l = Object.keys(refs).length
  const offset = (l - 1) * 25
  return { x: 100 + offset, y: 75 + offset }
}

/**
 * Export a React Hook
 */
export default ({ id }) => {
  const ref = useRef()
  refs[id] = ref

  const { containerHeight, containerWidth, VERTICAL_OFFSET_TOP, PORTAL } = useContext(context)

  return props => (
    <SnapMenu
      renderMenu={C => createPortal(C, PORTAL)}
      getDefaultPosition={getDefaultPosition}
      getActiveMenuZIndex={getActiveMenuZIndex}
      containerHeight={containerHeight}
      containerWidth={containerWidth}
      zIndex={getActiveMenuZIndex()}
      VERTICAL_OFFSET_TOP={VERTICAL_OFFSET_TOP}
      ref={ref}
      {...props}
    />
  )
}
