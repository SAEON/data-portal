import { useContext } from 'react'
import useStyles from './style'
import { context as databooksContext } from '../..//context'
import Field from './_field'

export default ({ tableName, fields }) => {
  const classes = useStyles()
  const context = useContext(databooksContext)

  return [...fields]
    .sort(({ ordinal_position: a }, { ordinal_position: b }) => (a > b ? 1 : -1))
    .map(({ id, column_name, data_type }) => {
      return (
        <Field
          key={id}
          id={`${tableName}-${id}`}
          tableName={tableName}
          column_name={column_name}
          data_type={data_type}
        />
      )
    })
}
