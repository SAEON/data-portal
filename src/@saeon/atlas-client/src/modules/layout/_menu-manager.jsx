import React, { createContext, useState } from 'react'

export const MenuContext = createContext()

export const MenuManager = ({ children }) => {
  const [state, setState] = useState({
    topMenu: { menuAnchor: null },
    configMenu: { zIndex: 1 },
    editMenu: { zIndex: 1 },
    chartsMenu: { zIndex: 1 },
    layersMenu: { zIndex: 1 },
    saeonSearchMenu: { zIndex: 1 }
  })

  const setActiveMenu = id => {
    const newState = { ...state }
    newState[id].zIndex = Math.max(...Object.entries(state).map(([, v]) => (v?.zIndex || 0) + 1))
    setState(newState)
  }

  const updateMenuManager = obj => {
    const newState = { ...state }
    Object.entries(obj).forEach(([k, v]) => (newState[k] = v))
    setState(newState)
  }

  return (
    <MenuContext.Provider
      value={{
        ...state,
        setActiveMenu,
        updateMenuManager
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}
