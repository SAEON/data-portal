import { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'
import DownloadIcon from 'mdi-react/DownloadCircleIcon'
import { context as globalContext } from '../../../../../../contexts/global'
import { context as authorizationContext } from '../../../../../../contexts/authorization'
import StyledBadge from '../../components/styled-badge'
import { PUBLIC_HTTP_ADDRESS } from '../../../../../../config'
import { gql, useMutation } from '@apollo/client'
import packageJson from '../../../../../../../package.json'

export default ({ catalogue }) => {
  const resultCount = catalogue?.records.totalCount
  const { isAuthenticated } = useContext(authorizationContext)
  const { global } = useContext(globalContext)
  const { selectedIds, selectAll } = global
  const applicableRecordsCount = selectedIds?.length || (selectAll ? resultCount : 0)

  if (!isAuthenticated) {
    return null
  }

  const [saveList, { error, loading }] = useMutation(
    gql`
      mutation ($search: JSON!, $createdBy: String!) {
        saveList(search: $search, createdBy: $createdBy) {
          id
        }
      }
    `,
    {
      onCompleted: data => {
        if (data) {
          window.open(`${PUBLIC_HTTP_ADDRESS}/metadata-records?search=${data.saveList.id}`)
        }
      },
    }
  )

  if (loading) {
    return (
      <Fade key="loading" in={loading}>
        <span>
          <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
        </span>
      </Fade>
    )
  }

  if (error) {
    throw new Error(`Unable to download records. ${error.message}`)
  }

  return (
    <Fade key="not-loading" in={!loading}>
      <span>
        <Tooltip
          title={
            applicableRecordsCount
              ? `Download ${selectedIds?.length || resultCount} metadata records`
              : 'No records selected'
          }
        >
          <span>
            <IconButton
              onClick={() =>
                saveList({
                  variables: {
                    createdBy: `${packageJson.name} v${packageJson.version}`,
                    search: selectedIds.length
                      ? { ids: selectedIds }
                      : Object.fromEntries(
                          Object.entries({ ...global }).filter(([key]) => key !== 'selectedIds')
                        ),
                  },
                })
              }
              disabled={!applicableRecordsCount}
              size="large"
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
      </span>
    </Fade>
  )
}