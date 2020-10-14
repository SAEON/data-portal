import React, { useContext } from 'react'
import { Tabs, Tab, AppBar, Fade } from '@material-ui/core'
import { FilterList as FilterIcon, Layers as LayersIcon } from '@material-ui/icons'
import { TabsContext } from '../'
import Data from './data'
import Filters from './filters'

const a11yProps = index => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
})

const TabPanel = ({ children, value, index }) => (
  <Fade in={value === index}>
    <div
      style={{ height: 'calc(100% - 49px)', position: 'relative' }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </div>
  </Fade>
)

export default ({ LegendMenu, DataMenu }) => {
  const { activeTabIndex, setActiveTabIndex } = useContext(TabsContext)

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <AppBar color="secondary" variant="outlined" position="static">
        <Tabs
          value={activeTabIndex}
          onChange={(e, index) => setActiveTabIndex(index)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Tabs - select mode on atlas menu"
        >
          <Tab icon={<LayersIcon fontSize="small" />} {...a11yProps(0)} />
          <Tab icon={<FilterIcon fontSize="small" />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTabIndex} index={0}>
        <Data DataMenu={DataMenu} LegendMenu={LegendMenu} />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={1}>
        <Filters />
      </TabPanel>
    </div>
  )
}
