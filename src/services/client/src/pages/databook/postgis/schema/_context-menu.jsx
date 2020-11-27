import { Menu, Item, MenuProvider } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'

export default ({ menuItems, uniqueIdentifier, children }) => {
  return (
    <>
      <MenuProvider id={uniqueIdentifier}>{children}</MenuProvider>
      <Menu id={uniqueIdentifier} style={{ zIndex: 9999 }}>
        {menuItems.map(({ value, onClick }) => {
          if (!onClick) {
            throw new Error('Context menu requires onClick handler per menu item')
          }

          if (!value) {
            console.warn('Value not provided for context menu item')
          }

          return (
            <Item onClick={onClick} key={value}>
              {value}
            </Item>
          )
        })}
      </Menu>
    </>
  )
}
