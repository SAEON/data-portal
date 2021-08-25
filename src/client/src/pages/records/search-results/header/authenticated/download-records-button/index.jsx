import { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import DownloadIcon from 'mdi-react/DownloadCircleIcon'
import { context as globalContext } from '../../../../../../contexts/global'
import { context as authorizationContext } from '../../../../../../contexts/authorization'
import StyledBadge from '../../components/styled-badge'
import { API_PUBLIC_ADDRESS } from '../../../../../../config'
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
        saveList(search: $search, createdBy: $createdBy)
      }
    `,
    {
      onCompleted: data => {
        if (data) {
          window.open(`${API_PUBLIC_ADDRESS}/metadata-records?search=${data.saveList}`)
        }
      },
    }
  )

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
