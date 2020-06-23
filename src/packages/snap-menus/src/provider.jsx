import React from 'react'
import MenuContext from './context'

const PORTAL = document.createElement('div')
const PORTAL_STYLE = document.createElement('style')
const PORTAL_ID = `menu-portal-${Date.now()}`
PORTAL.setAttribute('id', PORTAL_ID)

document.getElementsByTagName('body')[0].prepend(PORTAL_STYLE)
document.getElementsByTagName('body')[0].prepend(PORTAL)

export default ({
  children,
  VERTICAL_OFFSET_TOP = '',
  VERTICAL_OFFSET_BOTTOM = '',
  HORIZONTAL_MARGIN = '',
}) => {
  PORTAL_STYLE.innerHTML = `
    #${PORTAL_ID} {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: ${VERTICAL_OFFSET_TOP}px ${HORIZONTAL_MARGIN}px ${VERTICAL_OFFSET_BOTTOM}px;
    }`

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
}
