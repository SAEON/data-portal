import React, { createContext } from 'react'
import { PureComponent } from 'react'

export const MenuContext = createContext()

export default class extends PureComponent {
  state = {
    menus: [
      { id: 'topMenu', menuAnchor: null },
      { id: 'configMenu', active: false, zIndex: 1 },
      { id: 'layersMenu', active: false, zIndex: 1 },
      { id: 'layerInfo', active: false, zIndex: 1 },
      { id: 'saeonSearchMenu', active: false, zIndex: 1 },
      { id: 'csirSearchMenu', active: false },
      { id: 'screenshotMenu', active: false, zIndex: 1 },
    ],
    addedMenus: {},
  }

  addMenu = ({ id, Component }) =>
    this.setState({
      addedMenus: { ...this.state.addedMenus, [id]: Component },
    })

  removeMenu = (removeId) =>
    this.setState({
      addedMenus: Object.fromEntries(
        Object.entries({ ...this.state.addedMenus }).filter(([id]) => id !== removeId)
      ),
    })

  getMenuById = (id) => this.state.menus.find((item) => item.id === id)

  setActiveMenu = (id) => {
    const newMenus = [...this.state.menus]
    newMenus.find((menu) => menu.id === id).zIndex = Math.max(
      ...this.state.menus.map(({ zIndex }) => (zIndex || 0) + 1)
    )
    this.setState({
      menus: newMenus,
    })
  }

  /**
   * @param {Object} obj {id: {... vals}}
   */
  updateMenuManager = (obj) => {
    const newMenus = [...this.state.menus]
    Object.entries(obj).forEach(([id, kvs]) =>
      Object.assign(newMenus.find((item) => id === item.id) || {}, { ...kvs })
    )
    this.setState({
      menus: newMenus,
    })
  }

  render() {
    const {
      state,
      props,
      removeMenu,
      addMenu,
      getMenuById,
      setActiveMenu,
      updateMenuManager,
    } = this
    const { children } = props
    const { menus, addedMenus } = state

    return (
      <MenuContext.Provider
        value={{
          getMenuById,
          addedMenus,
          menus,
          setActiveMenu,
          updateMenuManager,
          addMenu,
          removeMenu,
        }}
      >
        {/* These are menus. TODO */}
        {Object.entries(addedMenus).map(([i, Component]) => Component(i))}

        {/* All app children */}
        {children}
      </MenuContext.Provider>
    )
  }
}
