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
        (
          {
            createdAt,
            clientIpLocation: ipLocation,
            clientIpLat: ipLat,
            clientIpLon: ipLon,
            userId,
          },
          i
        ) => {
          return {
            i: i + 1,
            userId,
            ipLocation,
            ipLat,
            ipLon,
            createdAt: new Date(createdAt),
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
        defaultColumnOptions={{
          resisable: true,
          headerRenderer,
        }}
        columns={[
          {
            key: 'i',
            name: ` `,
            resizable: false,
            width: 50,

            formatter: ({ row: { i } }) => (
              <I sx={{ textAlign: 'center', display: 'block' }}>{i}</I>
            ),
          },
          {
            key: 'createdAt',
            name: 'Time',

            formatter: ({ row: { createdAt } }) => format(createdAt, FORMAT),
          },
          { key: 'ipLocation', name: 'IP Location' },
          { key: 'ipLat', name: 'IP Lat' },
          { key: 'ipLon', name: 'IP Lon' },
          { key: 'userId', name: 'User ID' },
        ]}
        rows={rows}
      />
    </Paper>
  )
}
