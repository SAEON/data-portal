import { createContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export const context = createContext()

export default ({ children }) => {
  useLocation() // Trigger re-render on location changes
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  return (
    <context.Provider
      value={{
        headerRef,
        setHeaderRef: el => (headerRef.current = el),
        contentRef,
        setContentRef: el => (contentRef.current = el),
      }}
    >
      {children}
    </context.Provider>
  )
}
