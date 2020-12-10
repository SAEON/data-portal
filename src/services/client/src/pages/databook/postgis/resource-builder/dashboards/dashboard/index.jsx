import { useEffect, createRef, useRef } from 'react'
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'
import 'gridstack/dist/h5/gridstack-dd-native'
import { Box, Toolbar, Typography } from '@material-ui/core'
import AddChartButton from './_add-chart-button'
import DeleteButton from './_delete-button'
import ShareButton from './_share-button'
import SaveLayoutButton from './_save-layout'
import ChartStub from './chart-stub'
import useStyles from './style'
import clsx from 'clsx'
import { useState } from 'react'

function createElement(str) {
  var frag = document.createDocumentFragment()

  var elem = document.createElement('div')
  elem.innerHTML = str

  while (elem.childNodes[0]) {
    frag.appendChild(elem.childNodes[0])
  }

  return frag
}

const gridCache = {}

export default ({ dashboard, activeTabIndex, setActiveTabIndex }) => {
  const classes = useStyles()
  const { id: dashboardId, charts = [], layout } = dashboard
  const [gridState, updateGridState] = useState({})
  const gridStackRef = useRef()
  const refs = useRef({})

  gridCache[dashboardId] = layout

  if (Object.keys(refs.current).length !== charts.length) {
    charts.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef()
    })
  }

  // TODO Sometimes cache is out of date

  const saveGrid = () =>
    gridStackRef.current.save().map(item => {
      const span = createElement(item.content).querySelector('span')
      const id = span.id
      const itemType = span.getAttribute('data-item')
      return {
        ...item,
        content: { id, itemType },
      }
    })

  useEffect(() => {
    gridStackRef.current =
      gridStackRef.current ||
      GridStack.init({
        column: 12,
        alwaysShowResizeHandle: false,
        animate: true,
        float: true,
      })

    const grid = gridStackRef.current

    grid.removeAll(false)

    grid.batchUpdate()
    charts.forEach(({ id }) => {
      grid.makeWidget(refs.current[id].current)
    })
    grid.commit()
    updateGridState(saveGrid())

    const onChange = () => updateGridState(saveGrid())
    grid.on('change', onChange)

    return () => {
      gridCache[dashboardId] = saveGrid()
      grid.off('change')
    }
  }, [charts])

  return (
    <>
      <Toolbar variant={'dense'}>
        <Typography>{dashboardId}</Typography>
        <span style={{ marginLeft: 'auto' }} />
        <SaveLayoutButton dashboard={dashboard} gridState={gridState} />
        <span style={{ marginRight: 8 }} />
        <AddChartButton dashboard={dashboard} />
        <span style={{ marginRight: 8 }} />
        <ShareButton id={dashboardId} />
      </Toolbar>
      <div style={{ height: 'calc(100% - 48px)', margin: '0px 16px', position: 'relative' }}>
        <Box m={0} p={0} className={clsx(classes.box)}>
          <div className="grid-stack">
            {charts?.map((chart, i) => {
              const hydratedState = (gridCache[dashboardId] || []).find(
                ({ content }) => content.id === chart.id
              )

              return (
                <div
                  ref={refs.current[chart.id]}
                  key={chart.id}
                  className={clsx('grid-stack-item', classes.grid)}
                  {...Object.fromEntries(
                    Object.entries(hydratedState || {}).map(([key, value]) => [`gs-${key}`, value])
                  )}
                >
                  <div className={clsx('grid-stack-item-content', classes.gridItem)}>
                    <span id={chart.id} data-item={'chart'}>
                      <ChartStub chart={chart} dashboard={dashboard} />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Box>
      </div>

      <DeleteButton
        id={dashboardId}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />
    </>
  )
}
