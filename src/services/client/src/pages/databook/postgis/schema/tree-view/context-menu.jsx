import { useState } from 'react'
import { Menu, Item, MenuProvider } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'

export default props => {
  const { uniqueIdentifier, handleFocus } = props
  const [renaming, setRenaming] = useState(false)
  return (
    <>
      <MenuProvider id={uniqueIdentifier}>{props.children({ renaming, setRenaming })}</MenuProvider>
      <Menu id={uniqueIdentifier} style={{ zIndex: 9999 }}>
        <Item
          onClick={() => {
            setRenaming(true)
            handleFocus()
          }}
        >
          Rename
        </Item>
        <Item> View Data</Item>
      </Menu>
    </>
  )
}
