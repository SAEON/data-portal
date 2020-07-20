import React, { useEffect, useRef } from 'react'
import { debounce } from '../../lib/fns'

const handle = debounce(async ({ type, x, y }) => {
  console.logToGraphQL({
    name: type,
    createdAt: new Date(),
    info: {
      x,
      y,
    },
  })
})

export default ({ children }) => {
  const boundary = useRef(null)

  useEffect(() => {
    boundary.current.addEventListener('mousemove', handle)

    return () => boundary.current.removeEventListener('mousemove', handle)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }} ref={boundary}>
      {children}
    </div>
  )
}
