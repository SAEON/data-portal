import { Menu, Item, useContextMenu } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'

//STEVEN: TO-DO:hideAll removes all menus. onBlur=hideAll fixes rename above metadata bug but is stopping rename from functioning.
//TO DO: try pass hideAll to children and see if rename is functional if hideAll is called elsewhere/more appropriately
export default ({ menuItems, uniqueIdentifier, children, style = undefined }) => {
  const { show, hideAll } = useContextMenu({ id: uniqueIdentifier })

  return (
    <>
      <div style={style} onContextMenu={show} /*onBlur={hideAll}*/>
        {children}
      </div>
      <Menu id={uniqueIdentifier} style={{ zIndex: 9999 }} animation={false}>
        {menuItems?.map(
          ({ value, onClick, disabled = false, Item: Item_ = undefined, ...props }) => {
            if (!onClick) {
              throw new Error('Context menu requires onClick handler per menu item')
            }

            if (!value) {
              console.warn('Value not provided for context menu item')
            }

            if (Item_) {
              return (
                <Item_ onClick={onClick} key={value} value={value} disabled={disabled} {...props} />
              )
            } else {
              return (
                <Item onClick={onClick} key={value} disabled={disabled}>
                  {value}
                </Item>
              )
            }
          }
        )}
      </Menu>
    </>
  )
}
