import { useEffect, useRef, forwardRef } from 'react'

export default forwardRef(({ children, event, handle }, ref) => {
  const boundary = useRef(ref || document.getElementById('root'))

  useEffect(() => {
    const current = boundary.current
    current.addEventListener(event, handle)
    return () => current.removeEventListener(event, handle)
  }, [event, handle])

  return children
})
