import React, { useContext } from 'react'
import { Fade, CircularProgress } from '@material-ui/core'
import { GlobalContext } from '../../modules/provider-global'
import { usePersistSearch } from '../../hooks'
import { Link } from '..'
import { createShareLink } from '../../lib/fns'
import { useEffect } from 'react'
import TabPanel from './_panel'

/**
 * Dialogue contents of the share dialogue
 * This component will be mounted AFTER the
 * dialogue is opened. The useEffect hook will
 * fire every time the dialogue is opened
 */
export default ({ tabIndex, state = undefined, shareType = 'component' }) => {
  const { global } = useContext(GlobalContext)
  const [persistSearchState, { loading, error, data }] = usePersistSearch()
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
          <Link uri={createShareLink({ searchId, shareType })} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {`<iframe width="100%" height="100%" src="${createShareLink({
            searchId,
            shareType,
          })}" frameborder="0" allowfullscreen></iframe>`}
        </TabPanel>
      </div>
    </Fade>
  )
}
