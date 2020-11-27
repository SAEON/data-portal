import { Typography } from '@material-ui/core'
import ContextMenu from './_context-menu'
import QuickForm from '@saeon/quick-form'

export default ({ tableName, fields }) => {
  return [...fields]
    .sort(({ ordinal_position: a }, { ordinal_position: b }) => (a > b ? 1 : -1))
    .map(({ id, column_name, data_type }) => {
      return (
        <li key={id}>
          <QuickForm editActive={false}>
            {(update, { editActive }) => {
              if (editActive) {
                return <input /> // TODO mutation goes here
              }

              return (
                <ContextMenu
                  uniqueIdentifier={`${tableName}-${column_name}`}
                  menuItems={[{ value: 'Rename', onClick: () => update({ editActive: true }) }]}
                >
                  <Typography>{column_name}</Typography>
                </ContextMenu>
              )
            }}
          </QuickForm>

          <Typography>({data_type})</Typography>
        </li>
      )
    })
}
