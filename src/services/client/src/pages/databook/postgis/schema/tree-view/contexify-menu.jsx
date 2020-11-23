import { useState } from 'react'
import { Menu, Item, MenuProvider } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'

export default props => {
  const { uniqueIdentifier } = props
  const [renaming, setRenaming] = useState(false)

  const onRename = ({ event, props }) => {
    setRenaming(true)
    // console.log('target', event.target)
    // console.log('target id', event.target.id)
  }
  return (
    <>
      <MenuProvider
        id={uniqueIdentifier}
        style={{ border: '1px solid purple', display: 'inline-block' }}
      >
        {props.children({ renaming, setRenaming })}
      </MenuProvider>
      <Menu id={uniqueIdentifier} style={{ zIndex: 4 }}>
        <Item onClick={onRename}>Rename</Item>
        <Item onClick={() => {}}>View Data</Item>
      </Menu>
    </>
  )
}
