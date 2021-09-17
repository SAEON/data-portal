import { useContext } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CreateChart from './create-chart'
import Label from '../../../../components/tab-label'
import { context as chartsContext } from '../../../../contexts/charts-provider'

export default ({ activeTabIndex, setActiveTabIndex }) => {
  const charts = useContext(chartsContext)

  return (
    <div style={{ display: 'flex' }}>
      {/* TABS */}
      <Tabs
        indicatorColor="primary"
        variant={charts.length > 5 ? 'scrollable' : 'standard'}
        value={activeTabIndex}
        onChange={(event, newValue) => setActiveTabIndex(newValue)}
      >
        {charts.map(({ id }, i) => (
          <Tab
            key={id}
            style={{
              minWidth: 'unset',
              width: 50,
            }}
            label={
              <Label title={`Chart ${id}`} color="green">
                {i + 1}
              </Label>
            }
            id={`tab-${id}`}
          />
        ))}
      </Tabs>

      {/* ADD TAB BUTTON */}
      <CreateChart setActiveTabIndex={setActiveTabIndex} />
    </div>
  )
}
