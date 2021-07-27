import { useState, createContext } from 'react'

export const context = createContext()

export default ({ children }) => {
  const [headerRef, setHeaderRef] = useState(null)
  const [contentRef, setContentRef] = useState(null)

  return (
    <context.Provider
      value={{
        headerRef,
        setHeaderRef,
        contentRef,
        setContentRef,
      }}
    >
      {children}
    </context.Provider>
  )
}
