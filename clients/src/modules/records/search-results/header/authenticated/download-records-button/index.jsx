import { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'
import { Download as DownloadIcon } from '../../../../../../components/icons'
import { context as searchContext } from '../../../../../../contexts/search'
import { context as authorizationContext } from '../../../../../../contexts/authorization'
import StyledBadge from '../../components/styled-badge'
import { PUBLIC_HTTP_ADDRESS } from '../../../../../../config'
import { gql, useMutation } from '@apollo/client'
import packageJson from '../../../../../../../package.json'
import { Span } from '../../../../../../components/html-tags'

export default ({ catalogue }) => {
  const resultCount = catalogue?.search.totalCount
  const { isAuthenticated } = useContext(authorizationContext)
  const { global } = useContext(searchContext)
  const { selectedIds, selectAll } = global
  const applicableRecordsCount = selectedIds?.length || (selectAll ? resultCount : 0)

  if (!isAuthenticated) {
    return null
  }

  const [saveList, { error, loading }] = useMutation(
    gql`
      mutation ($filter: JSON, $createdBy: String!) {
        saveList(filter: $filter, createdBy: $createdBy) {
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
        <Span>
          <CircularProgress thickness={2} size={18} sx={{ my: 0, mx: theme => theme.spacing(4) }} />
        </Span>
      </Fade>
    )
  }

  if (error) {
    throw new Error(`Unable to download records. ${error.message}`)
  }

  return (
    <Fade key="not-loading" in={!loading}>
      <Span>
        <Tooltip
          title={
            applicableRecordsCount
              ? `Download ${selectedIds?.length || resultCount} metadata records`
              : 'No records selected'
          }
        >
          <Span>
            <IconButton
              onClick={() =>
                saveList({
                  variables: {
                    createdBy: `${packageJson.name} v${packageJson.version}`,
                    filter: selectedIds.length
                      ? { ids: selectedIds }
                      : Object.fromEntries(
                          Object.entries({ ...global }).filter(([key]) => key !== 'selectedIds')
                        ),
                  },
                })
              }
              disabled={!applicableRecordsCount}
              size="medium"
            >
              <StyledBadge
                color={applicableRecordsCount ? 'primary' : 'default'}
                badgeContent={applicableRecordsCount}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                invisible={false}
                sx={{
                  '& .MuiBadge-badge': {
                    top: 3,
                    right: -4,
                  },
                }}
              >
                <DownloadIcon fontSize="small" />
              </StyledBadge>
            </IconButton>
          </Span>
        </Tooltip>
      </Span>
    </Fade>
  )
}
