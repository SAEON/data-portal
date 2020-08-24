import React, { useState, useContext } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Tabs, Tab, AppBar, Box, Typography } from '@material-ui/core'
import { Search as SearchIcon, Layers as LayersIcon } from '@material-ui/icons'
import { AtlasContext } from '../_state-provider'

const a11yProps = index => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
})

const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
  >
    {value === index && (
      <Box p={0}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
)

export default () => {
  const { gqlData } = useContext(AtlasContext)
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <>
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
      <SwipeableViews
        axis="x"
        index={activeTabIndex}
        onChangeIndex={index => setActiveTabIndex(index)}
      >
        <TabPanel value={activeTabIndex} index={0}>
          hi 1
        </TabPanel>
        <TabPanel value={activeTabIndex} index={1}>
          {JSON.stringify(gqlData.data?.catalogue)}
        </TabPanel>
      </SwipeableViews>
    </>
  )
}
