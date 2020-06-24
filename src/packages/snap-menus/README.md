# @saeon/snap-menus
A react provider component that allows for adding / removing draggable, resizable menus. (This library is still a WIP, and shouldn't be used yet)

```sh
npm i @saeon/snap-menus
```

# Usage
Create a menu provider scope somewhere in you application tree

```js
import { Provider as MenuProvider } from '@saeon/snap-menus'

<MenuProvider ... some config options TODO>
  ...
</MenuProvider>
```

To use the menu system, anywhere else in the application use the `useMenu` hook:

```js
import { useMenu } from '@saeon/snap-menus'

const MenuComponent = useMenu({ id: 'some-menu-name' }) // TODO - an ID might not actually be needed

/**
 * This is a controlled component
 *  => A Boolean must be provided to the open property
 *  => A function to toggle the open property must be provided
 */
<MenuComponent
  title={"Title"}
  open={false|true}
  onClose={() => function that toggles the 'open' value}
>
  ... contents
<MenuComponent>
```
