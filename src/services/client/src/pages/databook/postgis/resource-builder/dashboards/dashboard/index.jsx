import { useEffect, createRef, useRef } from 'react'
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'
import 'gridstack/dist/h5/gridstack-dd-native'
import { Toolbar, Typography } from '@material-ui/core'
import AddChartButton from './_add-chart-button'
import DeleteButton from './_delete-button'
import ShareButton from './_share-button'
import ChartStub from './chart-stub'
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
  const { id: dashboardId, charts = [] } = dashboard
  const [gridState, saveGridState] = useState({})
  const gridStackRef = useRef()
  const refs = useRef({})

  if (Object.keys(refs.current).length !== charts.length) {
    charts.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef()
    })
  }

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
        alwaysShowResizeHandle: false,
        animate: true,
        float: false,
      })
    const grid = gridStackRef.current

    console.log('existing state', gridCache[dashboardId])

    grid.batchUpdate()
    grid.removeAll(false)
    charts.forEach(({ id }) => {
      grid.makeWidget(refs.current[id].current)
    })
    grid.commit()
    saveGridState(saveGrid())

    grid.on('change', () => saveGrid())

    return () => {
      gridCache[dashboardId] = saveGrid()
      grid.destroy(false)
    }
  }, [charts])

  return (
    <>
      <Toolbar variant={'dense'}>
        <Typography>{dashboardId}</Typography>
        <span style={{ marginLeft: 'auto' }} />
        <AddChartButton dashboard={dashboard} />
        <span style={{ marginRight: 16 }} />
        <ShareButton id={dashboardId} />
      </Toolbar>

      <div className="grid-stack">
        {charts?.map((chart, i) => {
          return (
            <div
              ref={refs.current[chart.id]}
              key={chart.id}
              className={clsx('grid-stack-item', 'debug')}
              gs-w="12"
            >
              <div className="grid-stack-item-content">
                <span id={chart.id} data-item={'chart'}>
                  <ChartStub chart={chart} dashboard={dashboard} />
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <DeleteButton
        id={dashboardId}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />
    </>
  )
}
