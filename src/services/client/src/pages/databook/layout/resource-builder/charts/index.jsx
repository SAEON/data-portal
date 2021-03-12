import { useState, useContext, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { context as chartsContext } from '../../../contexts/charts-provider'
import HeaderControls from './header-controls'
import Chart from './chart'
import Fade from '@material-ui/core/Fade'

export default forwardRef((props, ref) => {
  const charts = useContext(chartsContext)
  const [activeTabIndex, setActiveTabIndex] = useState(charts.length > 0 ? charts.length - 1 : 0)

  return (
    <>
      {/* INJECTED CONTROLS INTO HEADER */}
      {ref &&
        createPortal(
          <Fade key="charts-instances" unmountOnExit mountOnEnter={false} in={Boolean(ref)}>
            <span>
              <HeaderControls
                activeTabIndex={activeTabIndex}
                setActiveTabIndex={setActiveTabIndex}
              />
            </span>
          </Fade>,
          ref
        )}

      {/* CHARTS */}
      {charts.map((chart, i) => {
        return (
          <Fade in={activeTabIndex === i} unmountOnExit mountOnEnter={false} key={chart.id}>
            <div style={{ height: '100%' }} role="tabpanel" hidden={activeTabIndex !== i}>
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
