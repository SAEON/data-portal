import { useEffect, createRef, useRef, useMemo } from 'react'
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'
import 'gridstack/dist/h5/gridstack-dd-native'
import { useState } from 'react'
import createElement from './_create-element'
import Header from './header'
import Layout from './layout'

const gridCache = {}

export default ({ dashboard, activeTabIndex, setActiveTabIndex }) => {
  const [gridState, updateGridState] = useState({})
  const gridStackRef = useRef()
  const gridElRef = useRef()
  const gridItemsRef = useRef({})
  gridCache[dashboard.id] = dashboard.layout

  const chartIds = useMemo(
    () =>
      dashboard.layout
        ?.map(({ content }) => {
          if (content.type.toUpperCase() === 'CHART') {
            return content.id
          } else {
            return undefined
          }
        })
        .filter(_ => _) || [],
    [dashboard]
  )

  const filterIds = useMemo(() => dashboard.filters.map(({ id }) => id), [dashboard])

  if (Object.keys(gridItemsRef.current).length !== chartIds.length) {
    chartIds.forEach(id => {
      gridItemsRef.current[id] = gridItemsRef.current[id] || createRef()
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
    const { dashboardId } = dashboard

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
      if (gridItemsRef.current[id].current?.gridstackNode) {
        // TODO - should something happen here?
      } else {
        grid.makeWidget(gridItemsRef.current[id].current)
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
  }, [dashboard, chartIds])

  return (
    <>
      <Header
        dashboard={dashboard} // TODO - pass dashboard id only. update dashboards provider with a getDashboard method
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        gridState={gridState}
      />
      <Layout
        dashboardId={dashboard.id}
        chartIds={chartIds}
        filterIds={filterIds}
        gridElRef={gridElRef}
        gridCache={gridCache}
        gridItemsRef={gridItemsRef}
      />
    </>
  )
}
