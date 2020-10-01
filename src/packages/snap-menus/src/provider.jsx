import React, { memo } from 'react'
import MenuContext from './context'

const PORTAL = document.createElement('div')
const PORTAL_STYLE = document.createElement('style')
const PORTAL_ID = `menu-portal-${Date.now()}`
PORTAL.setAttribute('id', PORTAL_ID)

export default memo(
  ({
    children,
    VERTICAL_OFFSET_TOP = 0,
    VERTICAL_OFFSET_BOTTOM = 0,
    HORIZONTAL_MARGIN_LEFT = 0,
    HORIZONTAL_MARGIN_RIGHT = 0,
    SNAP_MENUS_CONTAINER_REF = null,
  }) => {
    PORTAL_STYLE.innerHTML = `
    #${PORTAL_ID} {
      overflow: hidden;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: ${VERTICAL_OFFSET_TOP}px ${HORIZONTAL_MARGIN_RIGHT}px ${VERTICAL_OFFSET_BOTTOM}px ${HORIZONTAL_MARGIN_LEFT}px;
    }`

    if (SNAP_MENUS_CONTAINER_REF?.current) {
      SNAP_MENUS_CONTAINER_REF.current.prepend(PORTAL_STYLE)
      SNAP_MENUS_CONTAINER_REF.current.prepend(PORTAL)
    } else {
      document.getElementsByTagName('body')[0].prepend(PORTAL_STYLE)
      document.getElementsByTagName('body')[0].prepend(PORTAL)
    }

    return (
      <MenuContext.Provider
        value={{
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
