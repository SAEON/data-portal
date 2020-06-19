import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import MenuContext from './context'

// TODO - I think that changing the 2.5s, 85s, 55s, etc in the menu component will enable combining this with the PORTAL. which makes semantic sense
const menuContainerForSizing = document.getElementsByTagName('body')[0]

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
    margin: 55px 5px;
  }` // TODO - the margin is related to main app decisions

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
        {/**
         * Render menus into the portal
         *
         * A user may create a menu with the 'norender' flag: addMenu({Component, norender, id, etc.})
         * This stops the menu from being rendered by the provider. In this case the user can render
         * the menu in the React tree wherever they want. This is useful when you want a menu to be
         * a child of another menu. Without the 'norender' flag, all menus are the same level in the
         * tree, and can't pass props to each other
         **/}
        {menus
          .filter(({ Component, norender = false }) => Component && !norender)
          .map((item, i) => {
            return createPortal(
              <item.Component container={menuContainerForSizing} {...item} key={i} />,
              PORTAL
            )
          })}

        {/* Render children */}
        {children}
      </MenuContext.Provider>
    )
  }
}
