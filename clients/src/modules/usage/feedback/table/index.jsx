import { useContext, useMemo, useState } from 'react'
import { context as dataContext } from '../context'
import Paper from '@mui/material/Paper'
import { DndProvider } from 'react-dnd'
import DataGrid from 'react-data-grid'
import { format } from 'date-fns'
import Link from '@mui/material/Link'
import { CLIENTS_PUBLIC_ADDRESS } from '../../../../config'
import DraggableHeaderRenderer from './_draggable-header'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { I, Div } from '../../../../components/html-tags'

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

export default ({ contentRef }) => {
  const { data: forms } = useContext(dataContext)
  const [sortColumns, setSortColumns] = useState([])
  const [rows, setRows] = useState(
    forms.map(({ _id: id, ...rest }, i) => ({ i: i + 1, id, ...rest }))
  )
  const [columns, setColumns] = useState([
    {
      key: 'i',
      name: ` `,
      sortable: true,
      resizable: false,
      formatter: ({ row: { i } }) => <I sx={{ textAlign: 'center', display: 'block' }}>{i}</I>,
    },
    {
      key: 'createdAt',
      name: 'Date',
      formatter: ({ row: { createdAt } }) => (createdAt ? format(new Date(createdAt), FORMAT) : ''),
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
      formatter: ({ row: { student } }) => (
        <Div sx={{ textAlign: 'center', display: 'block' }}>{student ? '✔️' : ''}</Div>
      ),
    },
    { key: 'location', name: 'Live/work location' },
    {
      key: 'ageGroup',
      name: 'Age group',
      formatter: ({ row: { ageGroup } }) => ageGroup?.replace('> 41', '41+').replace('< 18', '18-'),
    },
    { key: 'race', name: 'Race' },
    { key: 'gender', name: 'Gender' },
    {
      key: 'allowContact',
      name: 'Contact',
      formatter: ({ row: { allowContact } }) => (
        <Div sx={{ textAlign: 'center', display: 'block' }}>{allowContact ? '✔️' : ''}</Div>
      ),
    },
    { key: 'comments', name: 'Comments' },
  ])

  const draggableColumns = useMemo(() => {
    function headerRenderer(props) {
      return <DraggableHeaderRenderer {...props} onColumnsReorder={handleColumnsReorder} />
    }

    function handleColumnsReorder(sourceKey, targetKey) {
      const sourceColumnIndex = columns.findIndex(c => c.key === sourceKey)
      const targetColumnIndex = columns.findIndex(c => c.key === targetKey)
      const reorderedColumns = [...columns]

      reorderedColumns.splice(
        targetColumnIndex,
        0,
        reorderedColumns.splice(sourceColumnIndex, 1)[0]
      )

      setColumns(reorderedColumns)
    }

    return columns.map(c => {
      if (c.key === 'id') return c
      return { ...c, headerRenderer }
    })
  }, [columns])

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
    <Paper sx={{ height: theme => `calc(${contentRef.offsetHeight}px - ${theme.spacing(4)})` }}>
      <DndProvider backend={HTML5Backend}>
        <DataGrid
          style={{ height: '100%' }}
          enableVirtualization
          columns={draggableColumns}
          sortColumns={sortColumns}
          onSortColumnsChange={setSortColumns}
          rows={sortedRows}
          onRowsChange={setRows}
          defaultColumnOptions={{
            sortable: true,
            resizable: true,
          }}
        />
      </DndProvider>
    </Paper>
  )
}
