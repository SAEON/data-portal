import React from 'react'
import Draggable from 'react-draggable'

export default ({ children }) => (
  <div style={{ position: 'absolute' }}>
    <Draggable
      axis="both"
      handle=".draggable-handle"
      defaultPosition={{ x: 400, y: 200 }}
      position={null}
      grid={[1, 1]}
      scale={1}
    >
      {children}
    </Draggable>
  </div>
)
