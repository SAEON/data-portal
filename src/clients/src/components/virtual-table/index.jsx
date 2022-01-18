import { useState, useRef, useMemo } from 'react'
import { VariableSizeGrid } from 'react-window'
import Draggable from 'react-draggable'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import Measure from 'react-measure'
import './scrollbar.css'
import { useTheme } from '@mui/material/styles'

const ROW_HEIGHT = 35
const HEADER_HEIGHT = 40

/**
 * I think this component can be replaces by using react-data-grid
 * But not sure. Currently only used in the /databook page
 */

export default ({ data }) => {
  const theme = useTheme()
  if (!data || !data.length) {
    return 'no data'
  }

  const headers = useMemo(
    () => Object.fromEntries(Object.keys(data[0]).map((name, i) => [name, i])),
    [data]
  )
  const columnCount = useMemo(() => Object.keys(headers).length, [headers])
  const [dimensions, setDimensions] = useState({
    width: -1,
    height: -1,
  })

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
  const getColumnWidth = columnIndex => {
    const name = Object.entries(headers).find(([, i]) => i === columnIndex)?.[0]
    if (name) {
      return columnWidths[name] * 20
    } else {
      return '100%'
    }
  }
  const handleDrag = (fieldName, deltaX) => {
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
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: ROW_HEIGHT,
              }}
            >
              {/* This grid is column headers */}
              <VariableSizeGrid
                style={{
                  overflow: 'hidden',
                }}
                columnCount={columnCount + 1}
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
                    <div
                      style={Object.assign(
                        {
                          lineHeight: `${HEADER_HEIGHT}px`,
                          backgroundColor: theme.palette.common.white,
                          justifyContent: 'space-between',
                          borderBottom: '1px solid #111111',
                          display: 'flex',
                          fontWeight: 'bold',
                          paddingLeft: '.5rem',
                          paddingRight: '.5rem',
                          fontFamily: 'monospace',
                        },
                        style
                      )}
                    >
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
                          position={{ x: 0, y: 0 }}
                        >
                          <DragIndicatorIcon
                            sx={{
                              backgroundColor: theme => theme.palette.common.white,
                              color: 'rgba(0, 0, 0, 0.5)',
                              position: 'absolute',
                              right: 0,
                              height: '100%',
                              zIndex: 2,
                              cursor: 'col-resize',
                            }}
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
                    <div
                      style={Object.assign(
                        {
                          lineHeight: `${ROW_HEIGHT}px`,
                          paddingLeft: '.5rem',
                          paddingRight: '.5rem',
                          display: 'relative',
                          backgroundColor: theme.palette.common.white,
                          borderBottom: `1px solid #dddddd`,
                          overflow: 'hidden',
                        },
                        rowIndex % 2 === 0
                          ? {
                              backgroundColor: '#f9f9f9 !important',
                            }
                          : {},
                        style
                      )}
                    >
                      <div
                        style={{
                          overflowX: 'hidden',
                          textOverflow: 'ellipsis',
                          fontFamily: 'monospace',
                        }}
                      >
                        {value.toString()}
                      </div>
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
