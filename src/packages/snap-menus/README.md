# @saeon/snap-menus
A react provider component that allows for adding / removing draggable, resizable menus. (This library is still a WIP, and shouldn't be used yet)

```sh
npm i @saeon/snap-menus
```

# Usage
Create a menu provider scope somewhere in you application tree

```js
<MenuProvider>
  ...
</MenuProvider>
```

To use the menu system, specify a consumer context. The context provides a number of helper functions for controlling application menus

```js
<MenuContext.Consumer>
  {({
      menus,
      getMenuById,
      setActiveMenu,
      addMenu,
      removeMenu,
      getActiveMenuZIndex,
      PORTAL,
      getDefaultPosition,
    }) => (
    ...
  )}
</MenuContext.Consumer>
```


# Basic working example
```js
import React from 'react'
import { render } from 'react-dom'
import MenuProvider, { MenuContext, DragMenu } from '@saeon/snap-menus'
const menuId = 'menu'

const App = () => (
  <MenuContext.Consumer>
    {({addMenu, removeMenu, getMenuBuId }) => (
      <button
        onClick={() => {
          if (getMenuById(id)) {
            removeMenu(id)
          } else {
            addMenu({
              id,

              /**
               * The component specifies what is rendered as the 'menu'
               * In this case, a DragMenu (provided in this package) is
               * rendered
               * 
               * The component will be passed props - these are the fields
               * of the object that is passed as an argument to the addMenu()
               * function 
               */
              Component: props => (
                <DragMenu
                  {...props}
                  title={'A menu'}
                >
                  Menu contents
                </DragMenu>
              ),
            })
          }
        }}
      >Toggle menu</button>
    )}
  </MenuContext.Consumer>
)

render(
  <MenuProvider>
    <App />
  </MenuProvider>,
  document.getElementById('root')
)
```