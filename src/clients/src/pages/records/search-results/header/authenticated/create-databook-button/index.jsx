import { useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'
import { useTheme } from '@mui/material/styles';
import DatabookIcon from 'mdi-react/NotebookPlusIcon'
import { gql, useMutation } from '@apollo/client'
import { CATALOGUE_CLIENT_MAX_DATABOOK_TABLES, TECHNICAL_CONTACT } from '../../../../../../config'
import { context as globalContext } from '../../../../../../contexts/global'
import StyledBadge from '../../components/styled-badge'
import packageJson from '../../../../../../../package.json'
import { context as authorizationContext } from '../../../../../../contexts/authorization'
import createSearchObject from '../fns/create-search-object'
import getTooltip from '../fns/tooltip'
import getValidCount from './_get-valid-count'

export default ({ catalogue, cache }) => {
  const theme = useTheme()
  const { global } = useContext(globalContext)
  const { hasPermission } = useContext(authorizationContext)
  const { selectedIds, selectAll } = global

  const [createDatabook, { error, loading }] = useMutation(
    gql`
      mutation ($search: JSON!, $createdBy: String!) {
        createDatabook(search: $search, createdBy: $createdBy)
      }
    `,
    {
      onCompleted: data => {
        if (data) {
          window.open(`/databooks/${data.createDatabook}`)
        }
      },
    }
  )

  // Return early
  if (error) {
    throw new Error(`Error creating databook. ${error.message}`)
  }

  // Return early
  if (loading) {
    return (
      <Fade key="loading" in={loading}>
        <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
      </Fade>
    )
  }

  // Get count of all selected records that are valid for databooks
  const validCount = getValidCount(selectedIds, selectAll, catalogue, cache)

  // Check whether the databook function is available for current context
  const available = validCount && validCount < CATALOGUE_CLIENT_MAX_DATABOOK_TABLES

  return (
    <Tooltip
      title={getTooltip(
        selectAll,
        validCount,
        selectedIds,
        cache,
        CATALOGUE_CLIENT_MAX_DATABOOK_TABLES,
        'Databook'
      )}
    >
      <span>
        <IconButton
          style={
            available
              ? {
                  color: hasPermission('databook:create')
                    ? theme.palette.primary.main
                    : theme.palette.warning.main,
                }
              : {}
          }
          disabled={!available}
          onClick={
            hasPermission('databook:create')
              ? () =>
                  createDatabook({
                    variables: {
                      createdBy: `${packageJson.name} v${packageJson.version}`,
                      search: createSearchObject(
                        global,
                        selectedIds.length && selectedIds.filter(id => cache[id])
                      ),
                    },
                  })
              : () =>
                  alert(
                    `Your login is not authorized to use this feature. Please request access (${TECHNICAL_CONTACT})`
                  )
          }
          size="large">
          <StyledBadge
            color={available ? 'primary' : 'default'}
            badgeContent={
              available || selectAll
                ? selectedIds?.filter(id => cache[id]).length || validCount || 0
                : 0
            }
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            invisible={false}
          >
            <DatabookIcon />
          </StyledBadge>
        </IconButton>
      </span>
    </Tooltip>
  );
}
