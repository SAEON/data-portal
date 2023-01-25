import { useContext, useState, useMemo } from 'react'
import { context as dataContext } from '../context'
import Paper from '@mui/material/Paper'
import { Div, I } from '../../../../components/html-tags'
import DataGrid from 'react-data-grid'
import { format } from 'date-fns'
import DraggableHeaderRenderer from '../../../../components/table/dragagable-header'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const FORMAT = 'do MMM. HH:mm'

const headerRenderer = ({ column }) => (
  <Div sx={{ width: '100%', textAlign: 'center' }}>{column.name}</Div>
)

const getComparator = sortColumn => {
  switch (sortColumn) {
    case 'createdAt':
      return (a, b) => {
        a = new Date(a[sortColumn])
        b = new Date(b[sortColumn])
        if (a > b) return 1
        if (b > a) return -1
        return 0
      }
    default:
      return (a, b) => {
        a = (a[sortColumn]?.toString() || '').replace(/\s+/g, '').toUpperCase()
        b = (b[sortColumn]?.toString() || '').replace(/\s+/g, '').toUpperCase()
        if (a > b) return 1
        if (b > a) return -1
        return 0
      }
  }
}

export default ({ contentRef }) => {
  const [sortColumns, setSortColumns] = useState([])
  const { data } = useContext(dataContext)
  const [rows, setRows] = useState(
    data.map(({ createdAt, userName: name, userId }, i) => {
      return {
        i: i + 1,
        userId,
        name,
        createdAt: new Date(createdAt),
      }
    })
  )

  const [columns, setColumns] = useState([
    {
      key: 'i',
      name: ` `,
      resizable: false,
      width: 50,
      formatter: ({ row: { i } }) => <I sx={{ textAlign: 'center', display: 'block' }}>{i}</I>,
    },
    {
      key: 'createdAt',
      name: 'Time',
      formatter: ({ row: { createdAt } }) => format(createdAt, FORMAT),
    },
    { key: 'name', name: 'User name' },
    { key: 'userId', name: 'User ID' },
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
          columns={draggableColumns}
          defaultColumnOptions={{
            sortable: true,
            resisable: true,
            headerRenderer,
          }}
          enableVirtualization
          onRowsChange={setRows}
          onSortColumnsChange={setSortColumns}
          rows={sortedRows}
          sortColumns={sortColumns}
          style={{ height: '100%' }}
        />
      </DndProvider>
    </Paper>
  )
}
