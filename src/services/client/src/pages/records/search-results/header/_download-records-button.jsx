import { useContext, useState } from 'react'
import { IconButton, Tooltip, Fade, CircularProgress } from '@material-ui/core'
import DownloadIcon from 'mdi-react/DownloadCircleIcon'
import { context as globalContext } from '../../../../contexts/global'
import { context as authorizationContext } from '../../../../contexts/authorization'
import StyledBadge from './components/styled-badge'
import { CATALOGUE_API_ADDRESS } from '../../../../config'
import { gql, useApolloClient } from '@apollo/client'
import packageJson from '../../../../../package.json'

const MUTATION = gql`
  mutation($search: JSON!, $createdBy: String!) {
    persistSearchState(search: $search, createdBy: $createdBy)
  }
`

export default ({ catalogue }) => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const resultCount = catalogue?.records.totalCount
  const { isAuthenticated } = useContext(authorizationContext)
  const { global } = useContext(globalContext)
  const { selectedIds, selectAll } = global
  const applicableRecordsCount = selectedIds?.length || (selectAll ? resultCount : 0)

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <Fade key="loading" in={loading}>
        <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
      </Fade>
    )
  }

  if (error) {
    throw new Error(`Unable to download records. ${error.message}`)
  }

  return (
    <Fade key="not-loading" in={!loading}>
      <Tooltip title={`Download ${selectedIds?.length || resultCount} metadata records`}>
        <span>
          <IconButton
            onClick={async () => {
              setLoading(true)
              const { data } = await client
                .mutate({
                  mutation: MUTATION,
                  variables: {
                    createdBy: `${packageJson.name} v${packageJson.version}`,
                    search: selectedIds.length
                      ? { ids: selectedIds }
                      : Object.fromEntries(
                          Object.entries({ ...global }).filter(([key]) => key !== 'selectedIds')
                        ),
                  },
                })
                .catch(error => setError(error))
                .finally(() => setLoading(false))

              if (data) {
                window.open(
                  `${CATALOGUE_API_ADDRESS}/metadata-records?search=${data.persistSearchState}`
                )
              }
            }}
            disabled={!applicableRecordsCount}
          >
            <StyledBadge
              color={applicableRecordsCount ? 'primary' : 'default'}
              badgeContent={applicableRecordsCount}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              invisible={false}
            >
              <DownloadIcon />
            </StyledBadge>
          </IconButton>
        </span>
      </Tooltip>
    </Fade>
  )
}
