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
    ],
  }

  addMenu = ({ id, Component }) =>
    this.setState({
      menus: [...this.state.menus, { id, zIndex: 1, Component }],
    })

  removeMenu = (removeId) =>
    this.setState({
      menus: [...this.state.menus].filter(({ id }) => id !== removeId),
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
    const { menus } = state

    return (
      <MenuContext.Provider
        value={{
          getMenuById,
          menus,
          setActiveMenu,
          updateMenuManager,
          addMenu,
          removeMenu,
        }}
      >
        {/* Render menus with defined components */}
        {menus.filter(({ Component }) => Component).map(({ Component }) => Component)}

        {/* Render children */}
        {children}
      </MenuContext.Provider>
    )
  }
}
