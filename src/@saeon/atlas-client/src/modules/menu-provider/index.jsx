import React, { createContext, PureComponent } from 'react'
import { createPortal } from 'react-dom'

const el = document.getElementById('menu-portal')

export const MenuContext = createContext()

export default class extends PureComponent {
  state = { menus: [] }

  addMenu = ({ id, Component, zIndex = 1, ...props }) =>
    this.setState({
      menus: [...this.state.menus, { id, zIndex, Component, ...props }],
    })

  removeMenu = (removeId) =>
    this.setState({
      menus: [...this.state.menus].filter(({ id }) => id !== removeId),
    })

  getMenuById = (id) => this.state.menus.find((item) => item.id === id)

  setActiveMenu = (id) => {
    const newMenus = [...this.state.menus].map((m) => {
      if (m.id === id) {
        return Object.assign({ ...m }, { zIndex: this.getActiveMenuZIndex() })
      } else {
        return m
      }
    })
    this.setState({
      menus: newMenus,
    })
  }

  getActiveMenuZIndex = () => {
    const zIndices = this.state.menus.map(({ zIndex }) => (zIndex || 1) + 1)
    const zIndex = zIndices.length ? Math.max(...zIndices) : 1
    return zIndex
  }

  render() {
    const {
      state,
      props,
      removeMenu,
      addMenu,
      getMenuById,
      setActiveMenu,
      getActiveMenuZIndex,
    } = this
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
          getActiveMenuZIndex,
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
