import React, { memo } from 'react'
import MenuContext from './context'

const PORTAL = document.createElement('div')
const PORTAL_STYLE = document.createElement('style')
const PORTAL_ID = `menu-portal-${Date.now()}`
PORTAL.setAttribute('id', PORTAL_ID)

export default memo(
  ({
    children,
    VERTICAL_OFFSET_TOP = '',
    VERTICAL_OFFSET_BOTTOM = '',
    HORIZONTAL_MARGIN = '',
    container = null,
  }) => {
    PORTAL_STYLE.innerHTML = `
    #${PORTAL_ID} {
      overflow: hidden;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: ${VERTICAL_OFFSET_TOP}px ${HORIZONTAL_MARGIN}px ${VERTICAL_OFFSET_BOTTOM}px;
    }`

    if (container) {
      container.prepend(PORTAL_STYLE)
      container.prepend(PORTAL)
    } else {
      document.getElementsByTagName('body')[0].prepend(PORTAL_STYLE)
      document.getElementsByTagName('body')[0].prepend(PORTAL)
    }

    const containerHeight = PORTAL.offsetHeight
    const containerWidth = PORTAL.offsetWidth

    return (
      <MenuContext.Provider
        value={{
          containerHeight,
          containerWidth,
          VERTICAL_OFFSET_BOTTOM,
          VERTICAL_OFFSET_TOP,
          HORIZONTAL_MARGIN,
          PORTAL,
        }}
      >
        {children}
      </MenuContext.Provider>
    )
  },
  (prevProps, nextProps) => {
    const prev = Object.entries(prevProps)
      .filter(([key]) => key !== 'children')
      .map(([, val]) => val)
    const next = Object.entries(nextProps)
      .filter(([key]) => key !== 'children')
      .map(([, val]) => val)
    let equal = true
    prev.forEach((val, i) => {
      if (val != next[i]) equal = false
    })
    return equal
  }
)
