import React from 'react'

const handler = (e) => e.stopPropagation()

export default ({ children }) => (
  <div onClick={handler} onMouseDown={handler}>
    {children}
  </div>
)
