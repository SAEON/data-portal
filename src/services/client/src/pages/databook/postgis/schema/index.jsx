import { useContext, useState } from 'react'
import StorageIcon from 'mdi-react/StorageIcon'
import ExpandIcon from 'mdi-react/ChevronDownIcon'
import { context as databookContext } from '../../context'
import useStyles from './style'
import clsx from 'clsx'
import ListOfTables from './_table-list'

export default () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(true)
  const { schema } = useContext(databookContext)
  const { tables } = schema

  return (
    <div className={clsx(classes.layout)}>
      <ul style={{ padding: 0 }} className={clsx(classes.ulReset)}>
        <li className={clsx(classes.liReset)}>
          <StorageIcon
            style={{ cursor: 'pointer', float: expanded ? 'unset' : 'left' }}
            onClick={() => setExpanded(!expanded)}
            size={22}
          />
          <ExpandIcon
            style={{ cursor: 'pointer', display: expanded ? 'none' : 'inherit' }}
            onClick={() => setExpanded(!expanded)}
            size={22}
          />
          <ul className={clsx(classes.ulReset)} style={{ display: expanded ? undefined : 'none' }}>
            <ListOfTables tables={tables} />
          </ul>
        </li>
      </ul>
    </div>
  )
}
