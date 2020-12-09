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

function createElement(str) {
  var frag = document.createDocumentFragment()

  var elem = document.createElement('div')
  elem.innerHTML = str

  while (elem.childNodes[0]) {
    frag.appendChild(elem.childNodes[0])
  }
  return frag
}

export default ({ dashboard, activeTabIndex, setActiveTabIndex }) => {
  const { id, charts = [] } = dashboard
  const refs = useRef({})

  if (Object.keys(refs.current).length !== charts.length) {
    charts.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef()
    })
  }

  useEffect(() => {
    const grid = GridStack.init()
    grid.removeAll(false)
    charts.forEach(({ id }) => {
      grid.makeWidget(refs.current[id].current)
    })
    grid.on('change', () => {
      const items = grid.save().map(item => {
        const span = createElement(item.content).querySelector('span')
        const id = span.id
        const itemType = span.getAttribute('data-item')
        return {
          ...item,
          content: { id, itemType },
        }
      })

      console.log(items)
    })
  }, [charts])

  return (
    <>
      <Toolbar variant={'dense'}>
        <Typography>{id}</Typography>
        <span style={{ marginLeft: 'auto' }} />
        <AddChartButton dashboard={dashboard} />
        <span style={{ marginRight: 16 }} />
        <ShareButton id={id} />
      </Toolbar>

      <div className="grid-stack">
        {charts?.map((chart, i) => {
          console.log()
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

      <DeleteButton id={id} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
    </>
  )
}
