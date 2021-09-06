import { useContext } from 'react'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import { context as globalContext } from '../../../../../../contexts/global'
import Link from '../../../../../../components/link'
import { useEffect } from 'react'
import TabPanel from './_panel'
import { gql, useMutation } from '@apollo/client'
import packageJson from '../../../../../../../package.json'
import { CATALOGUE_CLIENT_ADDRESS } from '../../../../../../config'

/**
 * Dialogue contents of the share dialogue
 * This component will be mounted AFTER the
 * dialogue is opened. The useEffect hook will
 * fire every time the dialogue is opened
 */
export default ({ tabIndex, search = undefined }) => {
  const isAtlasPage = window.location.pathname.includes('atlas')

  const { global } = useContext(globalContext)
  const [saveList, { loading, error, data }] = useMutation(gql`
    mutation($search: JSON!, $createdBy: String!) {
      ${isAtlasPage ? 'createAtlas' : 'saveList'}(search: $search, createdBy: $createdBy) {
        id
      }
    }
  `)

  useEffect(() => {
    if (!isAtlasPage) {
      saveList({
        variables: {
          createdBy: `${packageJson.name} v${packageJson.version}`,
          search: search || global,
        },
      })
    }
  }, [isAtlasPage, global, saveList, search])

  const id = data?.saveList.id || undefined
  const uri = `${CATALOGUE_CLIENT_ADDRESS}/list/records?disableSidebar=true&showSearchBar=true&search=${id}`

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
    <Fade in={Boolean(data || isAtlasPage)} key="data">
      <div>
        <TabPanel value={tabIndex} index={0}>
          <Link uri={uri} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {`<iframe width="100%" height="100%" src="${uri}" frameborder="0" allowfullscreen></iframe>`}
        </TabPanel>
      </div>
    </Fade>
  )
}
