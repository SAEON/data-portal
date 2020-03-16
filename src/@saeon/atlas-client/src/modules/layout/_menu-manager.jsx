import React, { PureComponent, createContext, useState } from 'react'

export const MenuContext = createContext()

export const MenuManager = ({ children, test }) => {
  const [state, setState] = useState({})

  return <MenuContext.Provider value={{}}>{children}</MenuContext.Provider>
}
