import { Menu, Item, useContextMenu } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'

export default ({ menuItems, uniqueIdentifier, children, }) => {
  const { show } = useContextMenu({ id: uniqueIdentifier })
  return (
    <>
      <div onContextMenu={show}>{children}</div>
      <Menu id={uniqueIdentifier} style={{ zIndex: 9999 }} animation={false}>
        {menuItems.map(({ value, onClick, disabled = false }) => {
          if (!onClick) {
            throw new Error('Context menu requires onClick handler per menu item')
          }

          if (!value) {
            console.warn('Value not provided for context menu item')
          }

          return (
            <Item onClick={onClick} key={value} disabled={disabled}>
              {value}
            </Item>
          )
        })}
      </Menu>
    </>
  )
}
