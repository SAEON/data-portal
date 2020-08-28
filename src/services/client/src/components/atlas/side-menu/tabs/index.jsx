import React, { useContext } from 'react'
import { Tabs, Tab, AppBar, Fade } from '@material-ui/core'
import { Search as SearchIcon, Layers as LayersIcon } from '@material-ui/icons'
import { TabsContext } from '../'

// Tab panels
import LayerList from './layer-list'
import SearchMetadata from './search-metadata'

const a11yProps = index => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
})

const TabPanel = ({ children, value, index }) => (
  <Fade in={value === index}>
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </div>
  </Fade>
)

export default () => {
  const { activeTabIndex, setActiveTabIndex } = useContext(TabsContext)

  return (
    <div>
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
          <Tab icon={<SearchIcon fontSize="small" />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTabIndex} index={0}>
        <LayerList />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={1}>
        <SearchMetadata />
      </TabPanel>
    </div>
  )
}
