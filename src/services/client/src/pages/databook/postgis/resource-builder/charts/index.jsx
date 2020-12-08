import { useState, useContext, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { context as databookContext } from '../../../context'
import TabHeaders from './_tab-headers'
import Chart from './chart'
import { Fade } from '@material-ui/core'

export default forwardRef((props, ref) => {
  const { databook } = useContext(databookContext)
  const charts = databook.charts
  const [activeTabIndex, setActiveTabIndex] = useState(charts.length - 1 || 0)

  return (
    <>
      {createPortal(
        <TabHeaders
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
          charts={charts}
        />,
        ref.current
      )}
      {charts.map((chart, i) => {
        return (
          <Fade timeout={1000} in={activeTabIndex === i} key={chart.id}>
            <div role="tabpanel" hidden={activeTabIndex !== i}>
              {activeTabIndex === i && (
                <Chart
                  activeTabIndex={activeTabIndex}
                  setActiveTabIndex={setActiveTabIndex}
                  chart={chart}
                />
              )}
            </div>
          </Fade>
        )
      })}
    </>
  )
})
