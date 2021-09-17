import { memo } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import useTheme from '@material-ui/core/styles/useTheme'
import { DataGrid } from '@material-ui/data-grid'

export default memo(({ permissions }) => {
  const theme = useTheme()

  return (
    <Card
      style={{ border: 'none', width: '100%', backgroundColor: theme.backgroundColor }}
      variant="outlined"
    >
      <CardContent style={{ padding: 0 }}>
        <div style={{ height: 1000 }}>
          <DataGrid
            pageSize={25}
            rowHeight={theme.spacing(5)}
            columns={[
              {
                field: 'id',
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                headerName: 'ID',
                width: 50,
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
            rows={permissions.map(({ id, name, description }) => ({ id, name, description }))}
          />
        </div>
      </CardContent>
    </Card>
  )
})
