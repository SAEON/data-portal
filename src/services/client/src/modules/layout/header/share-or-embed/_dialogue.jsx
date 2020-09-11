import React, { useState, useContext } from 'react'
import { MessageDialogue, Link } from '../../../../components'
import { GlobalContext } from '../../../provider-global'
import { CLIENT_HOST_ADDRESS } from '../../../../config'
import { Tabs, Tab, Box, Typography, Fade, CircularProgress } from '@material-ui/core'
import { Share as ShareIcon } from '@material-ui/icons'
import { gql, useMutation } from '@apollo/client'
import { useEffect } from 'react'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
const TabPanel = props => {
  const { children, value, index, ...other } = props

  return (
    <Fade in={value === index}>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography style={{ wordBreak: 'break-all' }}>{children}</Typography>
          </Box>
        )}
      </div>
    </Fade>
  )
}

const makeShareURI = searchId => {
  const currentPath = window.location.pathname

  if (['/', '/atlas'].includes(currentPath)) {
    return `${CLIENT_HOST_ADDRESS}/render${currentPath}?search=${searchId}`
  }

  /**
   * /records
   */
  if (currentPath === '/records') {
    return `${CLIENT_HOST_ADDRESS}/render${currentPath}?hideSidebar=true&disableSidebar=true&search=${searchId}`
  }

  /**
   * /records/:id
   */
  if (currentPath.match(/\/records\/.*/)) {
    return `${CLIENT_HOST_ADDRESS}/render/record?id=${window.location.href.substring(
      window.location.href.lastIndexOf('/') + 1
    )}`
  }
}

const Panels = ({ tabIndex }) => {
  const { global } = useContext(GlobalContext)

  const [persistSearchState, { loading, error, data }] = useMutation(gql`
    mutation($state: JSON!) {
      browserClient {
        persistSearchState(state: $state)
      }
    }
  `)

  useEffect(() => {
    persistSearchState({ variables: { state: global } })
  }, [global, persistSearchState])

  const searchId = data?.browserClient.persistSearchState

  return error ? (
    'Error'
  ) : loading ? (
    <Fade key="loading" in={loading}>
      <div style={{ width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </div>
    </Fade>
  ) : (
    <Fade in={Boolean(data)} key="data">
      <div>
        <TabPanel value={tabIndex} index={0}>
          <Link uri={makeShareURI(searchId)} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {`<iframe width="100%" height="100%" src="${makeShareURI(
            searchId
          )}" frameborder="0" allowfullscreen></iframe>`}
        </TabPanel>
      </div>
    </Fade>
  )
}

export default () => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <MessageDialogue
      tooltipProps={{
        title: 'Create a link for sharing or embedding this page',
        placement: 'left',
      }}
      title={undefined}
      iconProps={{
        size: 'small',
        color: 'inherit',
      }}
      icon={<ShareIcon />}
    >
      <Tabs value={tabIndex} onChange={(e, i) => setTabIndex(i)}>
        <Tab label="Share" {...a11yProps(0)} />
        <Tab label="Embed" {...a11yProps(1)} />
      </Tabs>
      <Panels tabIndex={tabIndex} />
    </MessageDialogue>
  )
}
