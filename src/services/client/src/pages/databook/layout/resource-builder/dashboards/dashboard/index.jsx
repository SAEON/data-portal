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
  const { id: dashboardId, layout = [] } = dashboard
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
      <Header
        dashboard={dashboard}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        gridState={gridState}
      />
      <Layout
        dashboard={dashboard}
        chartIds={chartIds}
        gridElRef={gridElRef}
        gridCache={gridCache}
        refs={refs}
      />
    </>
  )
}
