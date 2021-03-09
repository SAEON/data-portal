import { useContext, forwardRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { context as dashboardsContext } from '../../../contexts/dashboards-provider'
import TabHeaders from './_tab-headers'
import Dashboard from './dashboard'
import Fade from '@material-ui/core/Fade'

export default forwardRef((props, ref) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const { dashboards } = useContext(dashboardsContext)

  return (
    <>
      {createPortal(
        <TabHeaders
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
          dashboards={dashboards}
        />,
        ref.current
      )}
      {dashboards.map((dashboard, i) => {
        return (
          <Fade in={activeTabIndex === i} key={dashboard.id}>
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
