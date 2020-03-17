import React, { createContext, useState } from 'react'

export const MenuContext = createContext()

export default ({ children }) => {
  const [menus, updateMenus] = useState([
    { id: 'topMenu', menuAnchor: null },
    { id: 'configMenu', active: false, zIndex: 1 },
    { id: 'layersMenu', active: false, zIndex: 1 },
    { id: 'layerInfo', active: false, zIndex: 1 },
    { id: 'saeonSearchMenu', active: false, zIndex: 1 },
    { id: 'csirSearchMenu', active: false }
  ])

  const [addedMenus, updateAddedMenus] = useState({})

  return (
    <MenuContext.Provider
      value={{
        getMenuById: id => menus.find(item => item.id === id),
        addedMenus,
        setActiveMenu: id => {
          const newMenus = [...menus]
          newMenus.find(menu => menu.id === id).zIndex = Math.max(
            ...menus.map(({ zIndex }) => (zIndex || 0) + 1)
          )
          updateMenus(newMenus)
        },

        /**
         * @param {Object} obj {id: {... vals}}
         */
        updateMenuManager: obj => {
          const newMenus = [...menus]
          Object.entries(obj).forEach(([id, kvs]) =>
            Object.assign(newMenus.find(item => id === item.id) || {}, { ...kvs })
          )
          updateMenus(newMenus)
        },
        addMenu: ({ id, Component }) => updateAddedMenus({ ...addedMenus, [id]: Component }),
        removeMenu: removeId => {
          updateAddedMenus(
            Object.fromEntries(Object.entries({ ...addedMenus }).filter(([id]) => id !== removeId))
          )
        }
      }}
    >
      {/* These are menus. TODO */}
      {Object.entries(addedMenus).map(([i, Component]) => Component(i))}

      {/* All app children */}
      {children}
    </MenuContext.Provider>
  )
}
