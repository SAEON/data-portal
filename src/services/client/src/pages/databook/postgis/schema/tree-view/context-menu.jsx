import { useState, useContext } from 'react'
import { Menu, Item, MenuProvider } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { context as databooksContext } from '../../../context'

export default props => {
  const { uniqueIdentifier, handleFocus, tableName } = props
  const [renaming, setRenaming] = useState(false)
  const context = useContext(databooksContext)
  const { setSql } = context

  const viewDataSql = () => {
    const sql = `select *
from ${tableName}
limit 100`
    setSql(sql)
  }
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
        <Item onClick={viewDataSql}>View Data</Item>
      </Menu>
    </>
  )
}
