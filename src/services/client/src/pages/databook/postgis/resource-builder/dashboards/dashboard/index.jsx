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
  const { id: dashboardId, layout = [] } = dashboard
  const [gridState, updateGridState] = useState({})
  const gridStackRef = useRef()
  const refs = useRef({})

  gridCache[dashboardId] = layout

  const charts =
    layout
      ?.map(({ content }) => {
        if (content.type.toUpperCase() === 'CHART') {
          return content.id
        } else {
          return undefined
        }
      })
      .filter(_ => _) || []

  if (Object.keys(refs.current).length !== charts.length) {
    charts.forEach(id => {
      refs.current[id] = refs.current[id] || createRef()
    })
  }

  const saveGrid = () =>
    gridStackRef.current.save().map(item => {
      const span = createElement(item.content).querySelector('span')
      const id = span.id
      const type = span.getAttribute('data-type')
      return {
        ...item,
        content: { id, type },
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
    charts.forEach(id => {
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
  }, [layout])

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
            {charts?.map((id, i) => {
              const hydratedState = (gridCache[dashboardId] || []).find(
                ({ content }) => content.id === id
              )

              return (
                <div
                  ref={refs.current[id]}
                  key={id}
                  className={clsx('grid-stack-item', classes.grid)}
                  {...Object.fromEntries(
                    Object.entries(hydratedState || {}).map(([key, value]) => [`gs-${key}`, value])
                  )}
                >
                  <div className={clsx('grid-stack-item-content', classes.gridItem)}>
                    <span id={id} data-type={'Chart'}>
                      <ChartStub chart={id} dashboard={dashboard} />
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
