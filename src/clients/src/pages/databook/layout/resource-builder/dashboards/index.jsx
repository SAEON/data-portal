import { useContext, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { context as databookContext } from '../../../contexts/databook-provider'
import { context as dashboardsContext } from '../../../contexts/dashboards-provider'
import HeaderControls from './header-controls'
import Dashboard from './dashboard'
import Fade from '@mui/material/Fade'
import useLocalStorage from '../../../../../hooks/use-localstorage'

export default forwardRef((props, ref) => {
  const { id } = useContext(databookContext)
  const dashboards = useContext(dashboardsContext)
  const [activeTabIndex, setActiveTabIndex] = useLocalStorage(
    `${id}-resource-builder-dashboards-tabs-index`,
    dashboards.length > 0 ? dashboards.length - 1 : 0
  )

  return (
    <>
      {/* INJECTED CONTROLS INTO HEADER */}
      {ref &&
        createPortal(
          <Fade key="dashboard-instances" unmountOnExit mountOnEnter={false} in={Boolean(ref)}>
            <span>
              <HeaderControls
                activeTabIndex={activeTabIndex}
                setActiveTabIndex={setActiveTabIndex}
              />
            </span>
          </Fade>,
          ref
        )}

      {/* DASHBOARDS */}
      {dashboards.map((dashboard, i) => {
        return (
          <Fade in={activeTabIndex === i} unmountOnExit mountOnEnter={false} key={dashboard.id}>
            <div style={{ height: '100%' }} role="tabpanel" hidden={activeTabIndex !== i}>
              {activeTabIndex === i && (
                <Dashboard
                  activeTabIndex={activeTabIndex}
                  setActiveTabIndex={setActiveTabIndex}
                  dashboard={dashboard}
                />
              )}
            </div>
          </Fade>
        )
      })}
    </>
  )
})
