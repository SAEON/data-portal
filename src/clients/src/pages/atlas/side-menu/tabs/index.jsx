import { useContext } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import AppBar from '@mui/material/AppBar'
import Fade from '@mui/material/Fade'
import FilterIcon from 'mdi-react/LayersSearchIcon'
import LayersIcon from 'mdi-react/LayersIcon'
import { TabsContext } from '../'
import ActiveLayers from './active-layers'
import AvailableLayers from './available-layers'

const a11yProps = index => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`
})

const TabPanel = ({ children, value, index }) => (
  <Fade in={value === index}>
    <div
      style={{ height: 'calc(100% - 50px)', position: 'relative' }}
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
      <AppBar color="inherit" variant="outlined" position="static">
        <Tabs
          value={activeTabIndex}
          onChange={(e, index) => setActiveTabIndex(index)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Tabs - select mode on atlas menu"
        >
          <Tab icon={<LayersIcon size={18} />} {...a11yProps(0)} />
          <Tab icon={<FilterIcon size={18} />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTabIndex} index={0}>
        <ActiveLayers
          setActiveTabIndex={setActiveTabIndex}
          DataMenu={DataMenu}
          LegendMenu={LegendMenu}
        />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={1}>
        <AvailableLayers />
      </TabPanel>
    </div>
  )
}
