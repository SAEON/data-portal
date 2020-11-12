import { useState, createRef } from 'react'
import { VariableSizeGrid } from 'react-window'
import detectScrollbarWidth from './_detect-scrollbar-width'
import useStyles from './style'
import Draggable from 'react-draggable'
import Measure from 'react-measure'
import { debounce } from '../../lib/fns'
import clsx from 'clsx'
const ROW_HEIGHT = 30

export default ({ data }) => {
  const [state, setState] = useState({
    dimensions: {
      x: -1,
      y: -1,
    },
    columnWidths: {},
    scrollbarWidth: detectScrollbarWidth(),
  })
  if (!data || !data.length) return 'no data'
  const classes = useStyles()
  const headers = Object.fromEntries(Object.keys(data[0]).map((name, i) => [name, i]))

  const headerGrid = createRef()
  const bodyGrid = createRef()
  const columnCount = Object.keys(headers).length

  // const recalc = debounce(columnIndex => {
  //   if (headerGrid?.current?.resetAfterColumnIndex) {
  //     headerGrid.current.resetAfterColumnIndex(columnIndex)
  //     bodyGrid?.current?.resetAfterColumnIndex(columnIndex)
  //   }
  // }, 100)

  const getColumnWidth = columnIndex => {
    const { columnWidths, scrollbarWidth, dimensions } = state
    return 100
  }

  return (
    <Measure bounds onResize={() => console.log('resized')}>
      {({ measureRef }) => {
        return (
          <div ref={measureRef}>
            <div className={clsx(classes.gridRoot)}>
              <VariableSizeGrid
                columnCount={columnCount}
                rowCount={1}
                height={ROW_HEIGHT}
                rowHeight={() => ROW_HEIGHT}
                columnWidth={getColumnWidth}
                width={1000 - state.scrollbarWidth} // TODO
                ref={headerGrid}
              >
                {({ columnIndex, style }) => {
                  const fieldName = Object.entries(headers).find(([, i]) => columnIndex === i)[0]

                  return (
                    <div className={classes.headerRow} style={Object.assign({}, style)}>
                      <div>{fieldName}</div>
                      <Draggable
                        axis="x"
                        defaultClassName="DragHandle"
                        defaultClassNameDragging="DragHandleActive"
                        onDrag={(event, { deltaX }) => console.log('hi there')} // TODO
                        position={{ x: 0, y: 0 }}
                      >
                        <span className={classes.dragHandleIcon}>⋮</span>
                      </Draggable>
                    </div>
                  )
                }}
              </VariableSizeGrid>
              <VariableSizeGrid
                columnCount={columnCount}
                rowCount={data.length}
                columnWidth={getColumnWidth}
                rowHeight={() => ROW_HEIGHT}
                width={1000}
                height={300} // TODO
                ref={bodyGrid}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const row = data[rowIndex]
                  const fieldName = Object.entries(headers).find(([, i]) => i === columnIndex)[0]
                  const value = row[fieldName]
                  return (
                    <div
                      style={Object.assign({}, style, {
                        lineHeight: '30px',
                        paddingLeft: '.5rem',
                        paddingRight: '.5rem',
                        borderBottom: '1px solid #CCC',
                        display: 'relative',
                      })}
                    >
                      <div>{value.toString().truncate(10)}</div>
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
