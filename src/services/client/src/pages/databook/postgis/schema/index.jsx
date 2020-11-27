import { useContext, useState } from 'react'
import StorageIcon from 'mdi-react/StorageIcon'
import { context as databookContext } from '../../context'
import useStyles from './style'
import clsx from 'clsx'
import ListOfTables from './_table-list'

export default () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const { schema } = useContext(databookContext)
  const { tables } = schema

  return (
    <div className={clsx(classes.layout)}>
      <ul>
        <li>
          <StorageIcon onClick={() => setExpanded(!expanded)} size={22} />
          <ul style={expanded ? {} : { display: 'none' }}>
            <ListOfTables tables={tables} />
          </ul>
        </li>
      </ul>
    </div>
  )
}
