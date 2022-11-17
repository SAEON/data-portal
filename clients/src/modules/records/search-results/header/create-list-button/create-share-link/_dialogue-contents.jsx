import { useContext } from 'react'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'
import { context as globalContext } from '../../../../../../contexts/global'
import Link from '@mui/material/Link'
import { useEffect } from 'react'
import TabPanel from './_panel'
import { gql, useMutation } from '@apollo/client'
import packageJson from '../../../../../../../package.json'
import { CLIENTS_PUBLIC_ADDRESS } from '../../../../../../config'
import { Div } from '../../../../../../components/html-tags'

/**
 * Dialogue contents of the share dialogue
 * This component will be mounted AFTER the
 * dialogue is opened. The useEffect hook will
 * fire every time the dialogue is opened
 */
export default ({ tabIndex, search = undefined }) => {
  const { global } = useContext(globalContext)
  const [saveList, { loading, error, data }] = useMutation(gql`
    mutation ($filter: JSON, $createdBy: String!) {
      saveList(filter: $filter, createdBy: $createdBy) {
        id
      }
    }
  `)

  useEffect(() => {
    saveList({
      variables: {
        createdBy: `${packageJson.name} v${packageJson.version}`,
        filter: search || global,
      },
    })
  }, [global, saveList, search])

  const id = data?.saveList.id || undefined
  const uri = `${CLIENTS_PUBLIC_ADDRESS}/list/records?disableSidebar=true&showSearchBar=true&search=${id}`

  return error ? (
    'Error'
  ) : loading ? (
    <Fade key="loading" in={loading}>
      <Div
        sx={{
          margin: theme => theme.spacing(8),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Div>
    </Fade>
  ) : (
    <Fade in={Boolean(data)} key="data">
      <Div>
        <TabPanel value={tabIndex} index={0}>
          <Link target="_blank" rel="noopener noreferrer" href={uri}>
            {uri}
          </Link>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {`<iframe width="100%" height="100%" src="${uri}" frameborder="0" allowfullscreen></iframe>`}
        </TabPanel>
      </Div>
    </Fade>
  )
}
