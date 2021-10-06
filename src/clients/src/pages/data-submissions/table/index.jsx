import { useContext, useState } from 'react'
import { context as submissionsContext } from '../context'
import DataGrid, { TextEditor, SelectColumn } from 'react-data-grid'
import JsonIcon from 'mdi-react/CodeJsonIcon'
import MetadataEditor from '../components/metadata-editor'

const HeaderRenderer = ({ column }) => {
  return <div style={{ width: '100%', textAlign: 'center' }}>{column.name}</div>
}

export default () => {
  const { data, selectedRows, setSelectedRows } = useContext(submissionsContext)
  const [rows, setRows] = useState(
    data.map(
      ({ id, doi, sid, institution, collection, schema, validated, errors, state, metadata }) => ({
        id,
        doi,
        sid,
        institution,
        collection,
        schema,
        validated: '' + validated,
        errors: JSON.stringify(errors),
        state,
        metadata,
        edit: '',
      })
    )
  )

  function handleFill({ columnKey, sourceRow, targetRow }) {
    return { ...targetRow, [columnKey]: sourceRow[columnKey] }
  }

  function handlePaste({ sourceColumnKey, sourceRow, targetColumnKey, targetRow }) {
    const incompatibleColumns = ['email', 'zipCode', 'date']
    if (
      sourceColumnKey === 'avatar' ||
      ['id', 'avatar'].includes(targetColumnKey) ||
      ((incompatibleColumns.includes(targetColumnKey) ||
        incompatibleColumns.includes(sourceColumnKey)) &&
        sourceColumnKey !== targetColumnKey)
    ) {
      return targetRow
    }

    return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey] }
  }

  return (
    <DataGrid
      onFill={handleFill}
      style={{ flexGrow: 1 }}
      onSelectedRowsChange={setSelectedRows}
      selectedRows={selectedRows}
      rowKeyGetter={row => row.id}
      onRowsChange={setRows}
      onPaste={handlePaste}
      columns={[
        SelectColumn,
        {
          key: 'doi',
          resizable: true,
          name: 'DOI',
          headerRenderer: HeaderRenderer,
          frozen: true,
          width: 250,
          cellClass: 'read-only-data-cell',
        },
        {
          key: 'metadata',
          resizable: true,
          name: 'Metadata',
          width: 40,
          editor: MetadataEditor,
          editorOptions: {
            renderFormatter: true,
          },
          formatter: () => (
            <div
              style={{
                width: '100%',
                alignItems: 'center',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <JsonIcon size={18} />
            </div>
          ),
          headerRenderer: HeaderRenderer,
        },

        {
          key: 'institution',
          resizable: true,
          name: 'Institution',
          width: 300,
          editor: TextEditor,
          headerRenderer: HeaderRenderer,
          cellClass: 'read-only-data-cell',
        },
        {
          key: 'collection',
          resizable: true,
          name: 'Collection',
          width: 300,
          editor: TextEditor,
          headerRenderer: HeaderRenderer,
          cellClass: 'read-only-data-cell',
        },
        {
          key: 'schema',
          width: 150,
          resizable: true,
          name: 'Schema',
          headerRenderer: HeaderRenderer,
          cellClass: 'read-only-data-cell',
        },
        {
          key: 'validated',
          width: 40,
          resizable: true,
          name: 'Validated',
          editor: TextEditor,
          headerRenderer: HeaderRenderer,
          cellClass: 'read-only-data-cell',
        },
        {
          key: 'errors',
          resizable: true,
          name: 'Errors',
          headerRenderer: HeaderRenderer,
          cellClass: 'read-only-data-cell',
        },
        {
          key: 'state',
          resizable: true,
          name: 'State',
          width: 200,
          headerRenderer: HeaderRenderer,
          cellClass: 'read-only-data-cell',
        },
        {
          key: 'id',
          resizable: true,
          name: 'ID',
          width: 200,
          headerRenderer: HeaderRenderer,
          cellClass: 'read-only-data-cell',
        },
        {
          key: 'sid',
          resizable: true,
          name: 'SID',
          headerRenderer: HeaderRenderer,
          width: 200,
          cellClass: 'read-only-data-cell',
        },
      ]}
      rows={rows}
    />
  )
}
