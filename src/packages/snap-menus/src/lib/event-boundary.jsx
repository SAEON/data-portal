import React from 'react'

const handler = e => e.stopPropagation()

export default ({ children }) => (
  <div
    onAnimationEndCapture={handler}
    onAnimationStart={handler}
    onMouseMove={handler}
    onMouseOver={handler}
    onMouseUp={handler}
    onMouseEnter={handler}
    onMouseLeave={handler}
    onWheel={handler}
    onTouchStart={handler}
    onTouchMove={handler}
    onTouchCancel={handler}
    onTouchEnd={handler}
    onKeyDown={handler}
    onContextMenu={handler}
    onFocus={handler}
    onBlur={handler}
    onClick={handler}
    onMouseDown={handler}
  >
    {children}
  </div>
)
