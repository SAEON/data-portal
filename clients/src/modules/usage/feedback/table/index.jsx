import { useContext, useMemo, useState } from 'react'
import { context as dataContext } from '../context'
import Paper from '@mui/material/Paper'
import DataGrid from 'react-data-grid'
import { format } from 'date-fns'
import Link from '@mui/material/Link'
import { CLIENTS_PUBLIC_ADDRESS } from '../../../../config'

const FORMAT = 'do MMM yyyy'

const getComparator = sortColumn => {
  switch (sortColumn) {
    case 'student':
    case 'allowContact':
      return (a, b) => {
        a = a[sortColumn]
        b = b[sortColumn]
        if (a) return 1
        if (b) return -1
      }
    case 'recordId':
    case 'emailAddress':
    default:
      return (a, b) => {
        a = a[sortColumn]?.toString() || ''
        b = b[sortColumn]?.toString() || ''
        if (a > b) return 1
        if (b > a) return -1
        return 0
      }
  }
}

export default () => {
  const { userFormSubmissions: forms } = useContext(dataContext)
  const [sortColumns, setSortColumns] = useState([])
  const [rows, setRows] = useState(forms.map(({ _id: id, ...rest }) => ({ id, ...rest })))

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return rows

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey)
        const compResult = comparator(a, b)
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult
        }
      }
      return 0
    })
  }, [rows, sortColumns])

  return (
    <Paper>
      <DataGrid
        onRowsChange={setRows}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        style={{ height: 1000 }}
        enableVirtualization
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        columns={[
          {
            key: 'createdAt',
            name: 'Date',

            formatter: ({ row: { createdAt } }) =>
              createdAt ? format(new Date(createdAt), FORMAT) : '',
          },
          {
            key: 'recordId',
            name: 'Download',
            formatter: ({ row: { recordId } }) => (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`${CLIENTS_PUBLIC_ADDRESS}/records/${recordId}`}
              >
                {recordId}
              </Link>
            ),
          },
          { key: 'emailAddress', name: 'Email' },
          { key: 'organization', name: 'Organization' },
          {
            key: 'student',
            name: 'Student',

            formatter: ({ row: { student } }) => (student ? '✔️' : ''),
          },
          { key: 'location', name: 'Location' },
          {
            key: 'ageGroup',
            name: 'Age group',

            formatter: ({ row: { ageGroup } }) =>
              ageGroup?.replace('> 41', '41+').replace('< 18', '18-'),
          },
          { key: 'race', name: 'Race' },
          { key: 'gender', name: 'Gender' },
          {
            key: 'allowContact',
            name: 'Contact',

            formatter: ({ row: { allowContact } }) => (allowContact ? '✔️' : ''),
          },
          { key: 'comments', name: 'Comments' },
        ]}
        rows={sortedRows}
      />
    </Paper>
  )
}
