import DataGrid from 'react-data-grid'
import { Div } from '../../../components/html-tags'

const headerRenderer = ({ column }) => (
  <Div sx={{ width: '100%', textAlign: 'center' }}>{column.name}</Div>
)

export default ({ permissions }) => {
  return (
    <DataGrid
      enableVirtualization={true}
      columns={[
        { key: 'name', name: 'Name', width: 200, resizable: true, headerRenderer },
        {
          key: 'description',
          name: 'Description',
          resizable: true,
          headerRenderer,
        },
      ]}
      rows={permissions.map(({ id, name, description }) => ({
        id,
        name,
        description,
      }))}
    />
  )
}
