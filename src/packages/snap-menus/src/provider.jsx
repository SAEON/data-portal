import React from 'react'
import MenuContext from './context'

const PORTAL = document.createElement('div')
const PORTAL_STYLE = document.createElement('style')
const PORTAL_ID = `menu-portal-${Date.now()}`
PORTAL.setAttribute('id', PORTAL_ID)

export default ({
  children,
  MARGIN_TOP = 0,
  MARGIN_BOTTOM = 0,
  MARGIN_LEFT = 0,
  MARGIN_RIGHT = 0,
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
      margin: ${MARGIN_TOP}px ${MARGIN_RIGHT}px ${MARGIN_BOTTOM}px ${MARGIN_LEFT}px;
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
        PORTAL_MARGIN_TOP: MARGIN_TOP,
        PORTAL_MARGIN_RIGHT: MARGIN_RIGHT,
        PORTAL_MARGIN_BOTTOM: MARGIN_BOTTOM,
        PORTAL_MARGIN_LEFT: MARGIN_LEFT,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}
