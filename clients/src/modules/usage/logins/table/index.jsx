import { useContext, useMemo } from 'react'
import { context as dataContext } from '../context'
import Paper from '@mui/material/Paper'
import { Div, B } from '../../../../components/html-tags'
import DataGrid from 'react-data-grid'
import { format, add } from 'date-fns'

const FORMAT = 'do MMM. HH:mm'

const headerRenderer = ({ column }) => (
  <Div sx={{ width: '100%', textAlign: 'center' }}>{column.name}</Div>
)

export default () => {
  const { loginsReport: data } = useContext(dataContext)

  const rows = useMemo(
    () =>
      data.map(
        ({ _id: id, user, clientInfo: { ipLocation }, createdAt, info: { maxAgeInHours } }) => ({
          id,
          user: user?.name || user?.emailAddress || '',
          ipLocation,
          createdAt: new Date(createdAt),
          maxAgeInHours,
        })
      ),
    [data]
  )

  return (
    <Paper>
      <DataGrid
        style={{ height: 1000 }}
        enableVirtualization
        columns={[
          { key: 'user', name: 'User', width: 200, resizable: true, headerRenderer },
          {
            key: 'ipLocation',
            name: 'IP Location',
            resizable: true,
            headerRenderer,
          },
          {
            key: 'createdAt',
            name: 'Time',
            resizable: true,
            headerRenderer,
            formatter: ({ row: { createdAt } }) => format(createdAt, FORMAT),
          },
          {
            key: 'maxAgeInHours',
            name: 'Expire',
            resizable: true,
            headerRenderer,
            formatter: ({ row: { createdAt, maxAgeInHours } }) => {
              const end = add(createdAt, { hours: maxAgeInHours })
              if (end > new Date()) {
                return (
                  <B sx={{ color: theme => theme.palette.success.main }}>{format(end, FORMAT)}</B>
                )
              }
              return format(end, FORMAT)
            },
          },
        ]}
        rows={rows}
      />
    </Paper>
  )
}
