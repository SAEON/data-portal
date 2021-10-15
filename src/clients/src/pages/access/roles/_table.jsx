import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from '@mui/material/styles'

export default ({ permissions }) => {
  const theme = useTheme()
  return (
    <div style={{ height: 400 }}>
      <DataGrid
        pageSize={25}
        rowHeight={theme.spacing(5)}
        columns={[
          {
            field: 'id',
            sortable: false,
            filterable: false,
            headerName: 'ID',
            width: 50,
            disableColumnMenu: true,
          },
          { field: 'name', headerName: 'Name', width: 200 },
          {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
          },
        ]}
        rows={permissions.map(({ id, name, description }) => ({
          id,
          name,
          description,
        }))}
      />
    </div>
  )
}
