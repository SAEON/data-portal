import { useEffect } from 'react'

export default ({ children, event, handle, target }) => {
  const el = target || window

  useEffect(() => {
    el.addEventListener(event, handle)
    console.log(el)

    return () => {
      el.removeEventListener(event, handle)
    }
  }, [el, event, handle])

  return children
}
