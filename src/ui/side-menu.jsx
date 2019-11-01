import React, { PureComponent } from 'react'
import { Button, Drawer, Toolbar } from 'react-md'

const menuButtonStyle = { display: 'flex', float: 'right', margin: '10px', zIndex: 1 }
const drawerStyle = { minWidth: '400px', overflowY: 'auto' }

export default class extends PureComponent {
  state = { menuOpen: false }

  openMenu = () => this.setState({ menuOpen: true })
  closeMenu = () => this.setState({ menuOpen: false })
  onVizChange = menuOpen => this.setState({ menuOpen })

  render() {
    const { menuOpen } = this.state
    const { openMenu, closeMenu, onVizChange } = this
    const { icon, toolbarActions, menuPosition, buttonSytle, style } = this.props

    return (
      <>
        <Drawer
          id="atlas-ui"
          style={style || drawerStyle}
          visible={menuOpen}
          mobileType={Drawer.DrawerTypes.TEMPORARY}
          tabletType={Drawer.DrawerTypes.TEMPORARY}
          desktopType={Drawer.DrawerTypes.TEMPORARY}
          position={menuPosition || 'right'}
          onVisibilityChange={onVizChange}
          header={
            <Toolbar
              actions={toolbarActions}
              nav={
                <Button icon onClick={closeMenu}>
                  close
                </Button>
              }
            />
          }
        >
          {this.props.children}
        </Drawer>
        <Button swapTheming primary style={buttonSytle || menuButtonStyle} icon onClick={openMenu}>
          {icon}
        </Button>
      </>
    )
  }
}
