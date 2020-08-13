import React, { useEffect, useRef } from 'react'

/**
 * This is a WIP component aimed at
 * simplifying creating boundaries on
 * which event handles can be registered
 *
 * TODO. Seems strange to call this a server logger
 * when the actual logging function needs to be provided.
 * It was named as a boundary component, but then I forgot
 * that it was for logging
 */
export default ({ children, event, handle }) => {
  const boundary = useRef(null)

  useEffect(() => {
    const current = boundary.current
    current.addEventListener(event, handle)
    return () => current.removeEventListener(event, handle)
  }, [event, handle])

  return (
    <div style={{ width: '100%', height: '100%' }} ref={boundary}>
      {children}
    </div>
  )
}
