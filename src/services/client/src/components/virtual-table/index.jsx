import { useState, useRef, useMemo } from 'react'
import { VariableSizeGrid } from 'react-window'
import useStyles from './style'
import Draggable from 'react-draggable'
import Measure from 'react-measure'
// import { debounce } from '../../lib/fns'
import clsx from 'clsx'
import QuickForm from '@saeon/quick-form'
const ROW_HEIGHT = 30

/***
 * STEVEN NOTES: setting overscrollX of gridItem stop the issue of extremely long text spanning extreme lengths within column. Next to figure out is how to reset
 * variablesizegrid cache. Columnwidths are cached, meaning getColumnWidth probably doesnt get called again after render. docs have methods for reseting cache
 * https://react-window.now.sh/#/api/VariableSizeGrid
 * but it is unclear how to call these methods. This is to be done next
 */
export default ({ data }) => {
  if (!data || !data.length) return 'no data'
  const headers = useMemo(
    () => Object.fromEntries(Object.keys(data[0]).map((name, i) => [name, i])),
    [data]
  )
  const columnCount = useMemo(() => Object.keys(headers).length, [headers])

  const classes = useStyles()
  //STEVEN
  //dimensions value matches to bounds supplied by react-measure. dimensions consists of width and heighttop,bottom,left,right All values are in pix
  const [dimensions, setDimensions] = useState({
    width: -1,
    height: -1,
  })
  //STEVEN
  /* columnWidths is Object with structure 
  {
    columnName1: columnWidth1, //int //default is columnName.length
    columnName2: columnWidth2  //int
  }    */
  const [columnWidths, setColumnWidths] = useState(
    Object.fromEntries(Object.entries(headers).map(([name]) => [name, name.length]))
  )
  const [dragging, setDragging] = useState(false)
  const [dragIndicatorXPos, setDragIndicatorXPos] = useState(-1)
  const headerGrid = useRef()
  const bodyGrid = useRef()

  // const recalc = debounce(columnIndex => {
  //   if (headerGrid?.current?.resetAfterColumnIndex) {
  //     headerGrid.current.resetAfterColumnIndex(columnIndex)
  //     bodyGrid?.current?.resetAfterColumnIndex(columnIndex)
  //   }
  // }, 100)
  const clearColumnWidthCache = index => {
    if (headerGrid.current != null) {
      headerGrid.current.resetAfterColumnIndex(index)
      if (bodyGrid.current != null) {
        bodyGrid.current.resetAfterColumnIndex(index)
      }
    }
  }

  // STEVEN
  const minColWidth = 5
  const maxColWidth = 15
  const getColumnWidth = columnIndex => {
    //finding name of column
    const name = Object.entries(headers).find(([, i]) => i === columnIndex)?.[0]
    // console.log(`${name},${columnIndex}`)
    //if name was found: width = state.columnWidths[name]*20
    if (name) {
      return columnWidths[name] < minColWidth
        ? minColWidth * 20
        : columnWidths[name] > maxColWidth
        ? maxColWidth * 20
        : columnWidths[name] * 20
    }
    //if name not found
    else {
      console.log('unexpected column at index: ', columnIndex)
      return 0
      // const total = Object.entries(columnWidths)
      //   .map(([, width]) => (width < 5 ? 5 : width * 20))
      //   .reduce((a, c) => a + c, 0)
      // const remaining = dimensions.width - total
      // return remaining < 100 ? 100 : remaining
    }
  }

  return (
    <Measure
      bounds
      onResize={({ bounds }) => {
        // STEVEN
        setDimensions({ ...bounds })
      }}
    >
      {({ measureRef }) => {
        return (
          <div ref={measureRef} style={{ position: 'relative', height: '100%' }}>
            {/* bar displaying draggable position WHILE dragging */}
            <span
              style={{
                height: '500px',
                width: '3px',
                backgroundColor: 'red',
                position: 'absolute',
                zIndex: 9999,
                left: dragIndicatorXPos,
              }}
            />
            <div className={clsx(classes.gridRoot)}>
              {/* This grid is column headers */}
              <VariableSizeGrid
                style={{
                  overflowX: 'hidden',
                  overflowY: 'hidden',
                }}
                columnCount={columnCount}
                rowCount={1}
                height={ROW_HEIGHT}
                rowHeight={() => ROW_HEIGHT}
                columnWidth={getColumnWidth} //STEVEN
                width={dimensions.width}
                ref={headerGrid} //STEVEN
              >
                {({ columnIndex, style }) => {
                  const fieldName = Object.entries(headers).find(([, i]) => columnIndex === i)?.[0]

                  const handleDrag = (event, { deltaX }) => {
                    const { offsetX, offsetY, pageX, pageY, screenX, screenY, x, y } = event
                    console.log('offsetX', offsetX)
                    // setDragIndicatorXPos(offsetX)
                    let newColumnWidths = columnWidths
                    newColumnWidths[fieldName] = columnWidths[fieldName] + deltaX / 20 //ugly way of writting this. refactor
                    // setColumnWidths(newColumnWidths)
                    return true
                  }
                  return (
                    // individual header
                    <div className={classes.headerRow} style={Object.assign({}, style)}>
                      <div>{fieldName}</div>
                      <Draggable
                        axis="x"
                        defaultClassName="DragHandle"
                        defaultClassNameDragging="DragHandleActive"
                        onDrag={handleDrag}
                        // onStart={() => {
                        //   /**TODO: show column indicator/bar for better UX */
                        // }}
                        onStop={() => {
                          clearColumnWidthCache(columnIndex)
                          // return false
                        }}
                        position={{ x: 0, y: 0 }}
                      >
                        <div>
                          <span className={classes.dragHandleIcon}>⋮</span>
                        </div>
                      </Draggable>
                    </div>
                  )
                }}
              </VariableSizeGrid>
              {/* This grid is data rows */}
              <VariableSizeGrid
                style={{
                  overflow: 'auto',
                }}
                columnCount={columnCount}
                rowCount={data.length}
                columnWidth={getColumnWidth} //STEVEN
                rowHeight={() => ROW_HEIGHT}
                width={dimensions.width}
                height={dimensions.height - ROW_HEIGHT}
                ref={bodyGrid} //STEVEN
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
                      {/*STEVEN:placed overflow on columns longer than max column width */}
                      <div className={clsx(classes.gridItem)} /*STEVEN*/>{value.toString()}</div>
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
