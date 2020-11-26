import TreeItem from './tree-item'
import useStyles from './style'
import clsx from 'clsx'
import { useState, useContext } from 'react'
import StorageIcon from '@material-ui/icons/Storage'
import OpenIcon from 'mdi-react/MenuDownIcon'
import ClosedIcon from 'mdi-react/MenuRightIcon'
import { context as databookContext } from '../../../context'
import { Typography } from '@material-ui/core'
import QuickForm from '@saeon/quick-form'

const iconSizeSmall = 22

const FieldsList = ({ id, fields }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <QuickForm editActive={false}>
        {(updateForm, { editActive }) => {
          if (editActive) {
            return <input></input>
          }

          return (
            <Typography
              onClick={() => {
                updateForm({ editActive: true })
                // setExpanded(!expanded)
              }}
            >
              {id}
            </Typography>
          )
        }}
      </QuickForm>

      <ul style={expanded ? {} : { display: 'none' }}>
        {[...fields]
          .sort(({ ordinal_position: a }, { ordinal_position: b }) => (a > b ? 1 : -1))
          .map(({ id, column_name, data_type }) => {
            return (
              <li key={id}>
                {column_name} - {data_type}
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default () => {
  const [expanded, setExpanded] = useState(false)
  const classes = useStyles()
  const { schema } = useContext(databookContext)
  const { tables } = schema
  console.log('tables', tables)

  return (
    <ul className={clsx(classes.root)}>
      <li>
        <StorageIcon
          onClick={() => {
            setExpanded(!expanded)
          }}
          fontSize="small"
        />
        <ul style={expanded ? {} : { display: 'none' }}>
          {tables.map(({ id, fields }) => {
            return (
              <li key={id}>
                <FieldsList id={id} fields={fields} />
              </li>
            )
          })}
        </ul>
      </li>
    </ul>
  )

  // return (
  //   <>
  //     <div>

  //       {/* Expansion Icon */}
  //       {expanded ? (
  //         <OpenIcon
  //           size={iconSizeSmall}
  //           onClick={() => {
  //             setExpanded(!expanded)
  //           }}
  //         />
  //       ) : (
  //         <ClosedIcon
  //           size={iconSizeSmall}
  //           onClick={() => {
  //             setExpanded(!expanded)
  //           }}
  //         />
  //       )}

  //       {/* Child Tree Items */}
  //       <div style={{ marginLeft: '6px' }} className={expanded ? undefined : clsx(classes.hidden)}>
  //         {/* Mapping array of Tables */}
  //         {/* STEVEN TO DO: sort tables and sort columns */}
  //         {tables.map(table => {
  //           return (
  //             <TreeItem
  //               key={table.id}
  //               uniqueIdentifier={`${table.id}`}
  //               primaryText={table.id}
  //               itemDepth={1}
  //               tableId={table.id}
  //             >
  //               {/* Mapping array of Columns */}
  //               {table.fields.map(col => {
  //                 return (
  //                   <TreeItem
  //                     key={`${table.id}-${col.column_name}`}
  //                     uniqueIdentifier={`${table.id}-${col.column_name}`}
  //                     primaryText={col.column_name}
  //                     secondaryText={col.data_type}
  //                     itemDepth={2}
  //                     tableId={table.id}
  //                   />
  //                 )
  //               })}
  //             </TreeItem>
  //           )
  //         })}
  //       </div>
  //     </div>
  //   </>
  // )
}
