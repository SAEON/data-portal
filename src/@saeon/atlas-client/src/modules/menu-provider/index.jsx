import React, { createContext, useState } from 'react'

export const MenuContext = createContext()

export default ({ children }) => {
  const [menus, setState] = useState([
    { id: 'topMenu', menuAnchor: null },
    { id: 'configMenu', active: false, zIndex: 1 },
    { id: 'layersMenu', active: false, zIndex: 1 },
    { id: 'layerInfo', active: false, zIndex: 1 },
    { id: 'saeonSearchMenu', active: false, zIndex: 1 },
    { id: 'csirSearchMenu', active: false }
  ])

  const [addedMenus, updateAddedMenus] = useState({})

  const setActiveMenu = id => {
    const newState = [...menus]
    newState.find(menu => menu.id === id).zIndex = Math.max(
      ...menus.map(({ zIndex }) => (zIndex || 0) + 1)
    )
    setState(newState)
  }

  /**
   * @param {Object} obj {id: {... vals}}
   */
  const updateMenuManager = obj => {
    const newState = [...menus]
    Object.entries(obj).forEach(([id, kvs]) =>
      Object.assign(newState.find(item => id === item.id) || {}, { ...kvs })
    )
    setState(newState)
  }

  const getMenuById = id => menus.find(item => item.id === id)

  const addMenu = ({ id, Component }) => updateAddedMenus({ ...addedMenus, [id]: Component })

  const removeMenu = removeId => {
    updateAddedMenus(
      Object.fromEntries(Object.entries({ ...addedMenus }).filter(([id]) => id !== removeId))
    )
  }

  return (
    <MenuContext.Provider
      value={{
        getMenuById,
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
