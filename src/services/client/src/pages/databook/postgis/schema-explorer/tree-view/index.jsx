import TreeItem from './tree-item'

export default ({ schema }) => {
  const { tables } = schema

  return (
    <>
      <TreeItem primaryText={schema.id} secondaryText={''} itemDepth={0}>
        {/* Mapping array of Tables */}
        {tables.map(table => {
          return (
            <TreeItem
              key={table.id}
              primaryText={table.id}
              secondaryText={''}
              itemDepth={1}
              tableId={table.id}
            >
              {/* Mapping array of Columns */}
              {table.fields.map((col, j) => {
                return (
                  <TreeItem
                    key={j}
                    primaryText={col.column_name}
                    secondaryText={col.data_type}
                    itemDepth={2}
                    tableId={table.id}
                  ></TreeItem>
                )
              })}
            </TreeItem>
          )
        })}
      </TreeItem>
    </>
  )
}
