import { useContext, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { context as databookContext } from '../../../contexts/databook-provider'
import { context as chartsContext } from '../../../contexts/charts-provider'
import HeaderControls from './header-controls'
import Chart from './chart'
import Fade from '@mui/material/Fade'
import useLocalStorage from '../../../../../hooks/use-localstorage'

export default forwardRef((props, ref) => {
  const { id } = useContext(databookContext)
  const charts = useContext(chartsContext)
  const [activeTabIndex, setActiveTabIndex] = useLocalStorage(
    `${id}-resource-builder-charts-tabs-index`,
    charts.length > 0 ? charts.length - 1 : 0
  )

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
