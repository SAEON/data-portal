import { useContext, useMemo } from 'react'
import { context as dataContext } from '../context'
import Paper from '@mui/material/Paper'
import { Div, B, I } from '../../../../components/html-tags'
import DataGrid from 'react-data-grid'
import { format, add } from 'date-fns'

const FORMAT = 'do MMM. HH:mm'

const headerRenderer = ({ column }) => (
  <Div sx={{ width: '100%', textAlign: 'center' }}>{column.name}</Div>
)

export default ({ contentRef }) => {
  const { data } = useContext(dataContext)

  const rows = useMemo(
    () =>
      data.map(
        ({ _id: id, user, clientInfo: { ipLocation }, createdAt, info: { maxAgeInHours } }, i) => {
          return {
            i: i + 1,
            id,
            name: user?.name || '',
            emailAddress: user?.emailAddress || '',
            ipLocation,
            createdAt: new Date(createdAt),
            maxAgeInHours,
          }
        }
      ),
    [data]
  )

  return (
    <Paper sx={{ height: theme => `calc(${contentRef.offsetHeight}px - ${theme.spacing(4)})` }}>
      <DataGrid
        style={{ height: '100%' }}
        enableVirtualization
        columns={[
          {
            key: 'i',
            name: ` `,
            resizable: false,
            width: 50,
            headerRenderer,
            formatter: ({ row: { i } }) => (
              <I sx={{ textAlign: 'center', display: 'block' }}>{i}</I>
            ),
          },
          {
            key: 'createdAt',
            name: 'Time',
            resizable: true,
            headerRenderer,
            formatter: ({ row: { createdAt } }) => format(createdAt, FORMAT),
          },
          {
            key: 'ipLocation',
            name: 'IP Location',
            resizable: true,
            headerRenderer,
          },
          { key: 'name', name: 'Name', resizable: true, headerRenderer },
          { key: 'emailAddress', name: 'Email', resizable: true, headerRenderer },
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
