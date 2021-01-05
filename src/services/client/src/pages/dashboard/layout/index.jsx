import { useEffect, createRef, useRef, useMemo } from 'react'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import 'gridstack/dist/h5/gridstack-dd-native'
import Chart from './chart'
import useStyles from '../style'
import clsx from 'clsx'

const components = {
  CHART: Chart,
}

export default ({ items }) => {
  const classes = useStyles()
  const gridRef = useRef()
  const gridStackRef = useRef()
  const refs = useRef({})

  const itemIds = useMemo(() => {
    return (
      items
        ?.map(({ content }) => {
          if (content.type.toUpperCase() === 'CHART') {
            return content.id
          } else {
            return undefined
          }
        })
        .filter(_ => _) || []
    )
  }, [items])

  /**
   * Register components that should become widgets as DOM
   * nodes
   */
  if (Object.keys(refs.current).length !== itemIds.length) {
    itemIds.forEach(id => {
      refs.current[id] = refs.current[id] || createRef()
    })
  }

  useEffect(() => {
    gridStackRef.current =
      gridStackRef.current ||
      GridStack.init(
        {
          disableOneColumnMode: false,
          alwaysShowResizeHandle: false,
          animate: true,
          float: false,
          margin: 0,
          cellHeight: '150px',
        },
        gridRef.current
      )

    const grid = gridStackRef.current

    grid.batchUpdate()
    itemIds.forEach(id => {
      if (refs.current[id].current.gridstackNode) {
        // TODO - ?
      } else {
        grid.makeWidget(refs.current[id].current)
      }
    })
    grid.commit()
  }, [itemIds])

  return (
    <div className={clsx(classes.gridContainer)}>
      <div ref={gridRef} className={clsx('grid-stack', classes.grid)}>
        {itemIds.map(id => {
          const hydratedState = items.find(({ content }) => content.id === id)
          const { type } = hydratedState.content
          const Component = components[type.toUpperCase().trim()]

          return (
            <div
              ref={refs.current[id]}
              key={id}
              className={clsx('grid-stack-item', classes.gridItem)}
              {...Object.fromEntries(
                Object.entries(hydratedState)
                  .filter(([key]) => key !== 'content')
                  .map(([key, value]) => {
                    return [`gs-${key}`, value]
                  })
              )}
            >
              <div className={clsx('grid-stack-item-content', classes.gridItemContent)}>
                <span id={id} data-type={'Chart'} className={clsx(classes.item)}>
                  <Component id={id} />
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
