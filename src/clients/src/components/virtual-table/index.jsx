import { useState, useRef, useMemo } from 'react'
import { VariableSizeGrid } from 'react-window'
import useStyles from './style'
import Draggable from 'react-draggable'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import Measure from 'react-measure'
import './scrollbar.css'
// import debounce  from '../../lib/fns/debounce'
import clsx from 'clsx'
const ROW_HEIGHT = 35 //30
const HEADER_HEIGHT = 40
export default ({ data }) => {
  // console.log('virtual-table data', data)
  //STEVEN TO-DO: get data (sqlResult) from context rather than prop
  if (!data || !data.length) return 'no data'
  const headers = useMemo(
    () => Object.fromEntries(Object.keys(data[0]).map((name, i) => [name, i])),
    [data]
  )
  const columnCount = useMemo(() => Object.keys(headers).length, [headers])

  const classes = useStyles({ ROW_HEIGHT: ROW_HEIGHT, HEADER_HEIGHT: HEADER_HEIGHT })

  //dimensions value matches to bounds supplied by react-measure. dimensions consists of width, height, top, bottom,left,right. All values are in pixels
  const [dimensions, setDimensions] = useState({
    width: -1,
    height: -1,
  })

  // TODO Why is this in state if it's never updated
  // eslint-disable-next-line
  const [columnWidths, setColumnWidths] = useState(
    Object.fromEntries(Object.entries(headers).map(([name]) => [name, name.length / 2 + 2]))
  )
  const headerGrid = useRef()
  const bodyGrid = useRef()

  const clearColumnWidthCache = index => {
    if (headerGrid.current != null) {
      headerGrid.current.resetAfterColumnIndex(index)
      if (bodyGrid.current != null) {
        bodyGrid.current.resetAfterColumnIndex(index)
      }
    }
  }

  const minColWidth = 2
  const gridMarginRight = 500 //refactored out. Delete soon
  const getColumnWidth = columnIndex => {
    const name = Object.entries(headers).find(([, i]) => i === columnIndex)?.[0]
    if (name) {
      return columnWidths[name] * 20
    }
    //when final column (acts as right margin)
    else {
      return '100%'
    }
  }
  const handleDrag = (fieldName, deltaX) => {
    // let newColumnWidths = JSON.parse(JSON.stringify(columnWidths))
    // newColumnWidths[fieldName] = columnWidths[fieldName] + deltaX / 20
    // setColumnWidths(newColumnWidths)

    //This is editing state directly. This is not ideal. To be swapped for the above ASAP if react-draggable state usage errors are solved
    const newWidth = columnWidths[fieldName] + deltaX / 20
    columnWidths[fieldName] = newWidth > minColWidth ? newWidth : minColWidth
  }

  const handleDoubleClick = fieldName => {
    const newWidth = fieldName.length // / 2
    columnWidths[fieldName] = newWidth > minColWidth ? newWidth : minColWidth
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
          <div
            ref={measureRef}
            style={{
              position: 'relative',
              height: '100%',
            }}
          >
            <div className={clsx(classes.gridRoot)}>
              {/* This grid is column headers */}
              <VariableSizeGrid
                style={{
                  overflow: 'hidden',
                }}
                columnCount={columnCount + 1} //extra column for easier resizing of final column
                rowCount={1}
                height={HEADER_HEIGHT}
                rowHeight={() => HEADER_HEIGHT}
                columnWidth={getColumnWidth}
                width={dimensions.width}
                ref={headerGrid}
              >
                {({ columnIndex, style }) => {
                  const fieldName = Object.entries(headers).find(([, i]) => columnIndex === i)?.[0]

                  return (
                    // individual header
                    <div className={classes.headerRow} style={Object.assign({}, style)}>
                      <div>{fieldName}</div>
                      {columnIndex !== columnCount ? (
                        <Draggable
                          axis="x"
                          defaultClassName="DragHandle"
                          defaultClassNameDragging="DragHandleActive"
                          onStop={(event, data) => {
                            handleDrag(fieldName, data.x)
                            clearColumnWidthCache(columnIndex)
                          }}
                          // onDrag={(event, data) => {
                          //   console.log('onDrag data', data)
                          //   debounce(handleDrag(fieldName, data.deltaX))
                          //   clearColumnWidthCache(columnIndex)
                          // }}
                          position={{ x: 0, y: 0 }}
                        >
                          {/* {
                            <span
                              className={classes.dragHandleIcon}
                              onDoubleClick={() => {
                                handleDoubleClick(fieldName)
                                clearColumnWidthCache(columnIndex)
                              }}
                            >
                              ⋮
                            </span>
                          } */}
                          <DragIndicatorIcon
                            className={classes.dragHandleIcon}
                            onDoubleClick={() => {
                              handleDoubleClick(fieldName)
                              clearColumnWidthCache(columnIndex)
                            }}
                          />
                        </Draggable>
                      ) : undefined}
                    </div>
                  )
                }}
              </VariableSizeGrid>
              {/* This grid is data rows */}
              <VariableSizeGrid
                // style={
                //   {
                //     // overflow: 'layout',
                //   }
                // }
                className="customScroll"
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
                    // individual data row
                    <div
                      className={clsx(classes.tableRow, {
                        [classes.tableRowAlternate]: rowIndex % 2 === 0,
                      })}
                      style={Object.assign({}, style)}
                    >
                      <div className={clsx(classes.gridItem)}>{value.toString()}</div>
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
