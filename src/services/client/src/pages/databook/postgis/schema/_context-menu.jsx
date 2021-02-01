import { Menu, Item, useContextMenu } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'

//STEVEN: TO-DO:hideAll removes all menus. onBlur=hideAll fixes rename above metadata bug but is stopping rename from functioning.
//TO DO: try pass hideAll to children and see if rename is functional if hideAll is called elsewhere/more appropriately
export default ({ menuItems, uniqueIdentifier, children, childrenContainerStyle = undefined }) => {
  const { show, hideAll } = useContextMenu({ id: uniqueIdentifier })

  return (
    <>
      <div style={childrenContainerStyle} onContextMenu={show} /*onBlur={hideAll}*/>
        {children}
      </div>
      <Menu id={uniqueIdentifier} style={{ zIndex: 9999 }} animation={false}>
        {menuItems?.map(({ value, onClick, disabled = false }) => {
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
