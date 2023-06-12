import { memo } from 'react'
import DataGrid from 'react-data-grid'
import { Div } from '../../../components/html-tags'

const headerRenderer = ({ column }) => (
  <Div sx={{ width: '100%', textAlign: 'center' }}>{column.name}</Div>
)

export default memo(({ permissions }) => (
  <Div sx={{ height: 1000 }}>
    <DataGrid
      style={{ height: '100%' }}
      className="rdg-light"
      enableVirtualization={true}
      columns={[
        { key: 'name', name: 'Name', width: 200, headerRenderer, resizable: true },
        {
          key: 'description',
          name: 'Description',
          headerRenderer,
          resizable: true,
        },
      ]}
      rows={permissions.map(({ id, name, description }) => ({ id, name, description }))}
    />
  </Div>
))
