import { useContext } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { context as dashboardsContext } from '../../../../contexts/dashboards-provider'
import Label from '../../../../components/tab-label'
import CreateDashboard from './_create-dashboard'

export default ({ activeTabIndex, setActiveTabIndex }) => {
  const dashboards = useContext(dashboardsContext)

  return (
    <div style={{ display: 'flex' }}>
      {/* TABS */}
      <Tabs
        indicatorColor="primary"
        variant={dashboards.length > 5 ? 'scrollable' : 'standard'}
        value={activeTabIndex}
        onChange={(event, newValue) => setActiveTabIndex(newValue)}
      >
        {dashboards.map(({ id }, i) => (
          <Tab
            key={id}
            style={{
              minWidth: 'unset',
              width: 50,
            }}
            label={
              <Label title={`Dashboard ${id}`} color="blue">
                {i + 1}
              </Label>
            }
            id={`tab-${id}`}
          />
        ))}
      </Tabs>

      {/* ADD TAB BUTTON */}
      <CreateDashboard setActiveTabIndex={setActiveTabIndex} />
    </div>
  )
}
