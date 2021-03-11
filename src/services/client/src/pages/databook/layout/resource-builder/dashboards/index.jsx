import { useContext, forwardRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { context as dashboardsContext } from '../../../contexts/dashboards-provider'
import TabHeaders from './_tab-headers'
import Dashboard from './dashboard'
import Fade from '@material-ui/core/Fade'

// TODO https://stackoverflow.com/questions/64841680/prevent-child-rerendering-if-parent-is-rerendered-using-hooks
export default forwardRef((props, ref) => {
  const { dashboards } = useContext(dashboardsContext)
  const [activeTabIndex, setActiveTabIndex] = useState(
    dashboards.length > 0 ? dashboards.length - 1 : 0
  )

  return (
    <>
      {ref &&
        createPortal(
          <Fade key="dashboard-instances" unmountOnExit mountOnEnter={false} in={Boolean(ref)}>
            <span>
              <TabHeaders activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
            </span>
          </Fade>,
          ref
        )}
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
