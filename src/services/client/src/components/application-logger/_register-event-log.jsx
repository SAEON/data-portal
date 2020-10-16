import { useEffect, useRef } from 'react'

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
