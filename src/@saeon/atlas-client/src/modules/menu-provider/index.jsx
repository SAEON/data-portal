import React, { createContext, PureComponent } from 'react'
import { createPortal } from 'react-dom'

const el = document.getElementById('menu-portal')

export const MenuContext = createContext()

export default class extends PureComponent {
  state = {
    menus: [{ id: 'topMenu', menuAnchor: null }],
  }

  addMenu = ({ id, Component, ...props }) =>
    this.setState({
      menus: [...this.state.menus, { id, zIndex: 1, Component, ...props }],
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

  render() {
    const { state, props, removeMenu, addMenu, getMenuById, setActiveMenu } = this
    const { children } = props
    const { menus } = state

    return (
      <MenuContext.Provider
        value={{
          getMenuById,
          menus,
          setActiveMenu,
          addMenu,
          removeMenu,
        }}
      >
        {/* Render menus into a top level portal */}
        {menus
          .filter(({ Component }) => Component)
          .map((item, i) => {
            return createPortal(<item.Component {...item} key={i} />, el)
          })}

        {/* Render children */}
        {children}
      </MenuContext.Provider>
    )
  }
}
