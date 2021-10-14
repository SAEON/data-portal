/**
 * Fields that appear in the metadata
 * and as columns in the table need
 * specific logic on updating either:
 *
 * (1) Updating columns should also
 * update the metadata
 *
 * (2) Updating the metadata should
 * also update the column
 */
export default (setRows, rows, change) => {
  const i = change.indexes[0]
  const { key } = change.column
  const newValue = rows[i][key]

  let changedRow
  let newRows

  if (key === 'title') {
    newRows = rows.map((row, j) => {
      const metadata = row.metadata || {}
      if (i === j) {
        changedRow = {
          ...row,
          _changed: true,
          metadata: {
            ...metadata,
            titles: [
              { ...(metadata.titles?.[0] || {}), title: newValue },
              ...(metadata.titles || []).slice(1),
            ],
          },
        }
        return changedRow
      }
      return row
    })
  }

  if (key === 'metadata') {
    newRows = rows.map((row, j) => {
      if (i === j) {
        changedRow = {
          ...row,
          _changed: true,
          title: row.metadata.titles?.[0].title || 'Untitled',
        }
        return changedRow
      }

      return row
    })
  }

  return setRows(newRows, changedRow)
}
