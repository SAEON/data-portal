import React, { createContext, useState } from 'react'

export const MenuContext = createContext()

export const MenuManager = ({ children }) => {
  const [state, setState] = useState({
    topMenu: { menuAnchor: null },
    configMenu: { active: false, zIndex: 1 },
    layersMenu: { active: false, zIndex: 1 },
    layerInfo: { active: false, zIndex: 1 },
    saeonSearchMenu: { active: false, zIndex: 1 },
    csirSearchMenu: { active: false }
  })

  const [addedMenus, updateAddedMenus] = useState({})

  const setActiveMenu = id => {
    const newState = { ...state }
    newState[id].zIndex = Math.max(...Object.entries(state).map(([, v]) => (v?.zIndex || 0) + 1))
    setState(newState)
  }

  const updateMenuManager = obj => {
    const newState = { ...state }
    Object.entries(obj).forEach(([k, v]) => (newState[k] = Object.assign(state[k] || {}, v)))
    setState(newState)
  }

  const addMenu = ({ id, Component }) => updateAddedMenus({ ...addedMenus, [id]: Component })

  const removeMenu = removeId => {
    updateAddedMenus(
      Object.fromEntries(Object.entries({ ...addedMenus }).filter(([id]) => id !== removeId))
    )
  }

  return (
    <MenuContext.Provider
      value={{
        ...state,
        addedMenus,
        setActiveMenu,
        updateMenuManager,
        addMenu,
        removeMenu
      }}
    >
      {Object.entries(addedMenus).map(([i, Component]) => Component(i))}
      {children}
    </MenuContext.Provider>
  )
}
