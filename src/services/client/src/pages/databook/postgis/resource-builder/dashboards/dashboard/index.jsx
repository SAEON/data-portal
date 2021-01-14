import { useEffect, createRef, useRef, useMemo } from 'react'
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'
import 'gridstack/dist/h5/gridstack-dd-native'
import { Toolbar, Typography, Grid } from '@material-ui/core'
import AddChartButton from './_add-chart-button'
import AddFilterButton from './_add-filter-button'
import DeleteButton from './_delete-button'
import ShareButton from './_share-button'
import PreviewButton from './_preview-button'
import SaveLayoutButton from './_save-layout'
import ChartStub from './chart-stub'
import FilterStub from './filter-stub'
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
  const { id: dashboardId, layout = [], filters: filterIds = [] } = dashboard
  const [gridState, updateGridState] = useState({})
  const gridStackRef = useRef()
  const gridElRef = useRef()
  const refs = useRef({})

  gridCache[dashboardId] = layout

  const chartIds = useMemo(() => {
    return (
      layout
        ?.map(({ content }) => {
          if (content.type.toUpperCase() === 'CHART') {
            return content.id
          } else {
            return undefined
          }
        })
        .filter(_ => _) || []
    )
  }, [layout])

  if (Object.keys(refs.current).length !== chartIds.length) {
    chartIds.forEach(id => {
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
      GridStack.init(
        {
          disableOneColumnMode: true,
          alwaysShowResizeHandle: false,
          animate: true,
          float: false,
          margin: 8,
          cellHeight: '36px',
        },
        gridElRef.current
      )

    const grid = gridStackRef.current

    grid.removeAll(false)
    grid.batchUpdate()
    chartIds.forEach(id => {
      if (refs.current[id].current?.gridstackNode) {
        // TODO - ? should the node be updated?
      } else {
        grid.makeWidget(refs.current[id].current)
      }
    })
    grid.commit()

    updateGridState(saveGrid())

    const onChange = () => updateGridState(saveGrid())
    grid.on('change', onChange)

    return () => {
      gridCache[dashboardId] = saveGrid()
      grid.off('change')
    }
  }, [dashboardId, layout, chartIds])

  return (
    <>
      <Toolbar className={classes.toolbar} variant={'dense'}>
        <Typography>{dashboardId}</Typography>
        <span style={{ marginLeft: 'auto' }} />
        <SaveLayoutButton dashboard={dashboard} gridState={gridState} />
        <span style={{ marginRight: 8 }} />
        <AddChartButton dashboard={dashboard} />
        <span style={{ marginRight: 8 }} />
        <AddFilterButton dashboard={dashboard} />
        <span style={{ marginRight: 8 }} />
        <ShareButton id={dashboardId} />
        <span style={{ marginRight: 8 }} />
        <PreviewButton id={dashboardId} />
        <span style={{ marginRight: 8 }} />
        <DeleteButton
          id={dashboardId}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
      </Toolbar>
      <Grid container justify="space-around" alignItems="center">
        {filterIds?.map(id => (
          <FilterStub key={id} filterId={id} dashboard={dashboard} />
        ))}
      </Grid>
      <div className={clsx(classes.gridContainer)}>
        <div ref={gridElRef} className={clsx('grid-stack', classes.grid)}>
          {chartIds?.map(id => {
            const hydratedState = (gridCache[dashboardId] || []).find(
              ({ content }) => content.id === id
            )
            return (
              <div
                ref={refs.current[id]}
                key={id}
                className={clsx('grid-stack-item', classes.gridItem)}
                {...Object.fromEntries(
                  Object.entries(hydratedState || {})
                    .filter(([key]) => key !== 'content')
                    .map(([key, value]) => [`gs-${key}`, value])
                )}
              >
                <div className={clsx('grid-stack-item-content', classes.gridItemContent)}>
                  <span id={id} data-type={'Chart'}>
                    <ChartStub chart={id} dashboard={dashboard} />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
