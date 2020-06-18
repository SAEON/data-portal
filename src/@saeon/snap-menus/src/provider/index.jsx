import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import MenuContext from './context'

const PORTAL_ID = `menu-portal-${Date.now()}`
const PORTAL = document.createElement('div')
const PORTAL_STYLE = document.createElement('style')

PORTAL.setAttribute('id', PORTAL_ID)
PORTAL_STYLE.innerHTML = `
  #${PORTAL_ID} {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 55px 5px 30px;
  }`

document.getElementsByTagName('body')[0].prepend(PORTAL_STYLE)
document.getElementsByTagName('body')[0].prepend(PORTAL)

export default class extends PureComponent {
  state = { menus: [] }

  addMenu = ({ id, Component, zIndex = this.getActiveMenuZIndex(), norender = false, ...props }) =>
    this.setState({
      menus: [...this.state.menus, { id, zIndex, Component, norender, ...props }],
    })

  removeMenu = removeId =>
    this.setState({
      menus: [...this.state.menus].filter(({ id }) => id !== removeId),
    })

  getMenuById = id => this.state.menus.find(item => item.id === id)

  setActiveMenu = id => {
    const newMenus = [...this.state.menus].map(m => {
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
    const zIndex = zIndices.length ? Math.max(...zIndices) : 2
    return zIndex
  }

  getDefaultPosition = () => {
    const l = this.state.menus.length
    const offset = (l - 1) * 25
    return { x: 100 + offset, y: 75 + offset }
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
      getDefaultPosition,
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
          menuContainerEl: PORTAL,
          getDefaultPosition,
        }}
      >
        {/* Render menus into the portal, unless norender is specified (user is rendering the menu somewhere in their code) */}
        {menus
          .filter(({ Component, norender = false }) => Component && !norender)
          .map((item, i) => {
            return createPortal(<item.Component {...item} key={i} />, PORTAL)
          })}

        {/* Render children */}
        {children}
      </MenuContext.Provider>
    )
  }
}
