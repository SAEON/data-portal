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
  //STEVEN
  //dimensions value matches to bounds supplied by react-measure. dimensions consists of width and heighttop,bottom,left,right All values are in pix
  const [dimensions, setDimensions] = useState({
    width: -1,
    height: -1,
  })
  //STEVEN
  /* Object with structure 
    {
      columnName1: columnWidth1, //int
      columnName2: columnWidth2  //int
      */
  const [columnWidths, setColumnWidths] = useState(
    Object.fromEntries(Object.entries(headers).map(([name]) => [name, name.length]))
  )
  console.log('state columnWidth', columnWidths)
  const headerGrid = useRef()
  const bodyGrid = useRef()

  // const recalc = debounce(columnIndex => {
  //   if (headerGrid?.current?.resetAfterColumnIndex) {
  //     headerGrid.current.resetAfterColumnIndex(columnIndex)
  //     bodyGrid?.current?.resetAfterColumnIndex(columnIndex)
  //   }
  // }, 100)

  // STEVEN
  const getColumnWidth = columnIndex => {
    //finding name of column
    const name = Object.entries(headers).find(([, i]) => i === columnIndex)?.[0]
    //if name was found: width = state.columnWidths[name]*20
    if (name) {
      console.log('getColumnWidth name,value', name, columnWidths[name])
      return (columnWidths[name] < 5 ? 5 : columnWidths[name]) * 20
    }
    //if name not found: calculate remaining and return that
    else {
      //getting collective width of ALL columns
      const total = Object.entries(columnWidths)
        .map(([, width]) => (width < 5 ? 5 : width * 20))
        .reduce((a, c) => a + c, 0)
      //Dimensions width is taken from encapsulating Measure around grid. Presumably equates to pixels
      const remaining = dimensions.width - total
      console.log('-------')
      console.log('name', name)
      console.log('columnWidths[name]', columnWidths[name])
      console.log('total', total)
      console.log('remaining', remaining)
      console.log('returned value', remaining < 100 ? 100 : remaining)
      console.log('++++++++++')
      return remaining < 100 ? 100 : remaining
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
          // <div id="GOBIGMODE">
          <div id="GOBIGMODE" ref={measureRef} style={{ position: 'relative', height: '100%' }}>
            <div className={clsx(classes.gridRoot)}>
              {/* This grid is column headers */}
              <VariableSizeGrid
                style={{
                  overflowX: 'hidden',
                  overflowY: 'hidden',
                }}
                columnCount={columnCount + 1}
                rowCount={1}
                height={ROW_HEIGHT}
                rowHeight={() => ROW_HEIGHT}
                columnWidth={getColumnWidth} //STEVEN
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
                        onDrag={(event, { deltaX }) => {
                          // console.log('event', event)

                          // console.log('columnIndex', columnIndex)
                          // console.log('fieldName', fieldName)
                          // console.log('dimensions', dimensions)
                          let newColumnWidths = columnWidths
                          newColumnWidths[fieldName] = columnWidths[fieldName] + deltaX
                          console.log('deltaX', deltaX)
                          console.log('columnWidths', columnWidths)
                          //STEVEN TO DO: TEST IF THIS set works by passing a static value
                          setColumnWidths(newColumnWidths)
                          // console.log('todo')
                          // STEVEN
                        }}
                        position={{ x: 0, y: 0 }}
                      >
                        <span className={classes.dragHandleIcon}>⋮</span>
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
                columnCount={columnCount + 1}
                rowCount={data.length}
                columnWidth={getColumnWidth} //STEVEN
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
                      <div>{value.toString()}</div>
                    </div>
                  )
                }}
              </VariableSizeGrid>
            </div>
          </div>
          // </div>
        )
      }}
    </Measure>
  )
}
