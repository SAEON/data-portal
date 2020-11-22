import { useState, useRef, useMemo } from 'react'
import { VariableSizeGrid } from 'react-window'
import useStyles from './style'
import Draggable from 'react-draggable'
import Measure from 'react-measure'
// import { debounce } from '../../lib/fns'
import clsx from 'clsx'
const ROW_HEIGHT = 30

export default ({ data }) => {
  if (!data || !data.length) return 'no data'
  const headers = useMemo(
    () => Object.fromEntries(Object.keys(data[0]).map((name, i) => [name, i])),
    [data]
  )
  const columnCount = useMemo(() => Object.keys(headers).length, [headers])

  const classes = useStyles()
  const [dimensions, setDimensions] = useState({
    width: -1,
    height: -1,
  })
  const [columnWidths /*, setColumnWidths*/] = useState(
    Object.fromEntries(Object.entries(headers).map(([name]) => [name, name.length]))
  )

  const headerGrid = useRef()
  const bodyGrid = useRef()

  // const recalc = debounce(columnIndex => {
  //   if (headerGrid?.current?.resetAfterColumnIndex) {
  //     headerGrid.current.resetAfterColumnIndex(columnIndex)
  //     bodyGrid?.current?.resetAfterColumnIndex(columnIndex)
  //   }
  // }, 100)

  const getColumnWidth = columnIndex => {
    const name = Object.entries(headers).find(([, i]) => i === columnIndex)?.[0]
    if (name) {
      return (columnWidths[name] < 5 ? 5 : columnWidths[name]) * 20
    } else {
      const total = Object.entries(columnWidths)
        .map(([, width]) => (width < 5 ? 5 : width * 20))
        .reduce((a, c) => a + c, 0)
      const remaining = dimensions.width - total
      return remaining < 100 ? 100 : remaining
    }
  }

  return (
    <Measure
      bounds
      onResize={({ bounds }) => {
        setDimensions({ ...bounds })
      }}
    >
      {({ measureRef }) => {
        return (
          <div ref={measureRef} style={{ position: 'relative', height: '100%' }}>
            <div className={clsx(classes.gridRoot)}>
              <VariableSizeGrid
                style={{
                  overflowX: 'hidden',
                  overflowY: 'hidden',
                }}
                columnCount={columnCount + 1}
                rowCount={1}
                height={ROW_HEIGHT}
                rowHeight={() => ROW_HEIGHT}
                columnWidth={getColumnWidth}
                width={dimensions.width}
                ref={headerGrid}
              >
                {({ columnIndex, style }) => {
                  const fieldName = Object.entries(headers).find(([, i]) => columnIndex === i)?.[0]
                  return (
                    <div className={classes.headerRow} style={Object.assign({}, style)}>
                      <div>{fieldName || ''}</div>
                      <Draggable
                        axis="x"
                        defaultClassName="DragHandle"
                        defaultClassNameDragging="DragHandleActive"
                        onDrag={
                          (/*event, { deltaX }*/) => {
                            console.log('todo')
                          }
                        }
                        position={{ x: 0, y: 0 }}
                      >
                        <span className={classes.dragHandleIcon}>⋮</span>
                      </Draggable>
                    </div>
                  )
                }}
              </VariableSizeGrid>
              <VariableSizeGrid
                style={{
                  overflow: 'auto',
                }}
                columnCount={columnCount + 1}
                rowCount={data.length}
                columnWidth={getColumnWidth}
                rowHeight={() => ROW_HEIGHT}
                width={dimensions.width}
                height={dimensions.height - ROW_HEIGHT}
                ref={bodyGrid}
                onScroll={({ scrollLeft }) => {
                  headerGrid?.current?.scrollTo({ scrollLeft, scrollTop: 0 })
                }}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const row = data[rowIndex]
                  const fieldName = Object.entries(headers).find(([, i]) => i === columnIndex)?.[0]
                  const value = row[fieldName] || ''
                  return (
                    <div
                      className={clsx(classes.tableRow, {
                        [classes.tableRowHovered]: rowIndex % 2 === 0,
                      })}
                      style={Object.assign({}, style)}
                    >
                      <div>{value.toString().truncate(15)}</div>
                    </div>
                  )
                }}
              </VariableSizeGrid>
            </div>
          </div>
        )
      }}
    </Measure>
  )
}
