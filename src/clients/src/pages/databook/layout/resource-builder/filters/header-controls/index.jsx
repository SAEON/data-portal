import { useContext } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import CreateFilter from './create-filter'
import Label from '../../../../components/tab-label'
import { context as filterContext } from '../../../../contexts/filters-provider'

export default ({ activeTabIndex, setActiveTabIndex }) => {
  const filters = useContext(filterContext)
  return (
    <div style={{ display: 'flex' }}>
      {/* TABS */}
      <Tabs
        indicatorColor="primary"
        variant={filters.length > 5 ? 'scrollable' : 'standard'}
        value={activeTabIndex}
        onChange={(event, newValue) => setActiveTabIndex(newValue)}
      >
        {filters.map(({ id }, i) => (
          <Tab
            key={id}
            style={{
              minWidth: 'unset',
              width: 50,
            }}
            label={
              <Label title={`Filter ${id}`} color="purple">
                {i + 1}
              </Label>
            }
            id={`tab-${id}`}
          />
        ))}
      </Tabs>

      {/* ADD TAB BUTTON */}
      <CreateFilter setActiveTabIndex={setActiveTabIndex} />
    </div>
  )
}
