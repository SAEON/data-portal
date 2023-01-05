import { useEffect } from 'react'

export default ({ children, event = undefined, handle, target, readyState = undefined }) => {
  const el = target || window

  useEffect(() => {
    if (event) {
      el.addEventListener(event, handle)
    }

    if (readyState) {
      if (el.readyState === readyState) {
        handle()
      }
    }

    return () => {
      if (event) {
        el.removeEventListener(event, handle)
      }
    }
  }, [el, event, handle])

  return children
}
