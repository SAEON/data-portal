import React, { useContext } from 'react'
import { Box, Typography, Fade, CircularProgress } from '@material-ui/core'
import { GlobalContext } from '../../../provider-global'
import { Link } from '../../../../components'
import makeShareURI from './_make-share-uri'
import { gql, useMutation } from '@apollo/client'
import { useEffect } from 'react'

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

export default ({ tabIndex, state = undefined, shareType = 'component' }) => {
  const { global } = useContext(GlobalContext)

  const [persistSearchState, { loading, error, data }] = useMutation(gql`
    mutation($state: JSON!) {
      browserClient {
        persistSearchState(state: $state)
      }
    }
  `)

  useEffect(() => {
    persistSearchState({ variables: { state: state || global } })
  }, [global, persistSearchState, state])

  const searchId = data?.browserClient.persistSearchState

  return error ? (
    'Error'
  ) : loading ? (
    <Fade key="loading" in={loading}>
      <div
        style={{
          margin: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </div>
    </Fade>
  ) : (
    <Fade in={Boolean(data)} key="data">
      <div>
        <TabPanel value={tabIndex} index={0}>
          <Link uri={makeShareURI({ searchId, shareType })} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {`<iframe width="100%" height="100%" src="${makeShareURI({
            searchId,
            shareType,
          })}" frameborder="0" allowfullscreen></iframe>`}
        </TabPanel>
      </div>
    </Fade>
  )
}
