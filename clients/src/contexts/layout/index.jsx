import { createContext, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Div } from '../../components/html-tags'

export const context = createContext()

export default ({ children }) => {
  useLocation() // Trigger re-render on location changes
  const [headerRef, setHeaderRef] = useState(null)
  const [contentRef, setContentRef] = useState(null)

  return (
    <context.Provider
      value={{
        headerRef,
        setHeaderRef: el => setHeaderRef(el),
        contentRef,
        setContentRef: el => setContentRef(el),
      }}
    >
      {children}
    </context.Provider>
  )
}

export const SizeContent = ({ children, height = undefined, style = {} }) => {
  const { headerRef, setContentRef } = useContext(context)

  if (!headerRef) {
    return null
  }

  const css = height
    ? { height: `calc(100% - ${headerRef.offsetHeight || 0}px)` }
    : { minHeight: `calc(100% - ${headerRef.offsetHeight || 0}px)` }

  return (
    <Div
      id="size-content"
      ref={setContentRef}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        ...css,
        ...style,
      }}
    >
      {children}
    </Div>
  )
}
