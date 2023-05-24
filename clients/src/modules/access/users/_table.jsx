import { useState, useMemo, useEffect } from 'react'
import DataGrid, { SelectColumn } from 'react-data-grid'
import RolesEditor from './_roles-editor'
import { Div } from '../../../components/html-tags'
import DraggableHeaderRenderer from '../../../components/table/dragagable-header'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const headerRenderer = ({ column }) => (
  <Div sx={{ width: '100%', textAlign: 'center' }}>{column.name}</Div>
)

const getComparator = sortColumn => {
  switch (sortColumn) {
    case 'roles':
      return (a, b) => {
        a = (a[sortColumn]?.map(({ name }) => name.toUpperCase()) || [])
          .sort()
          .join('')
          .replace(/\s+/g, '')
        b = (b[sortColumn]?.map(({ name }) => name.toUpperCase()) || [])
          .sort()
          .join('')
          .replace(/\s+/g, '')
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

export default ({ users, selectedUsers, setSelectedUsers, roles }) => {
  const [sortColumns, setSortColumns] = useState([])
  const [rows, setRows] = useState([...users])

  const [columns, setColumns] = useState([
    SelectColumn,
    {
      key: 'emailAddress',
      name: 'Email address',
      width: 200,
    },
    {
      key: 'name',
      name: 'Name',
      width: 250,
    },
    {
      key: 'roles',
      name: 'Roles',
      editorOptions: {
        renderFormatter: true,
      },
      editor: props => <RolesEditor rows={rows} setRows={setRows} roles={roles} {...props} />,
      formatter: ({ row: { roles } }) =>
        [...roles]
          .sort(({ name: a }, { name: b }) => {
            if (a > b) return 1
            if (a < b) return -1
            return 0
          })
          .map(({ name }) => name.toUpperCase())
          .join(', '),
    },
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

  useEffect(() => {
    setRows([...users])
  }, [users])

  return (
    <DndProvider backend={HTML5Backend}>
      <DataGrid
        className="rdg-light"
        columns={draggableColumns}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
          headerRenderer,
        }}
        enableVirtualization
        onRowsChange={setRows}
        onSelectedRowsChange={setSelectedUsers}
        onSortColumnsChange={setSortColumns}
        rowKeyGetter={row => row.id}
        rows={sortedRows}
        selectedRows={selectedUsers}
        sortColumns={sortColumns}
        style={{ height: '100%' }}
      />
    </DndProvider>
  )
}
