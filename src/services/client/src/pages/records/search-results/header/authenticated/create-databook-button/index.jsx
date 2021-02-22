import { useState, useContext } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import useTheme from '@material-ui/core/styles/useTheme'
import DatabookIcon from 'mdi-react/NotebookPlusIcon'
import { gql } from '@apollo/client'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import {
  CATALOGUE_CLIENT_MAX_DATABOOK_TABLES,
  CATALOGUE_TECHNICAL_CONTACT,
} from '../../../../../../config'
import { context as globalContext } from '../../../../../../contexts/global'
import StyledBadge from '../../components/styled-badge'
import packageJson from '../../../../../../../package.json'
import { context as authorizationContext } from '../../../../../../contexts/authorization'
import removeSelectedIds from '../fns/remove-selected-ids'
import getTooltip from '../fns/tooltip'
import getValidCount from './_get-valid-count'

export default ({ catalogue, cache }) => {
  const theme = useTheme()
  const { global } = useContext(globalContext)
  const { isDataScientist } = useContext(authorizationContext)
  const { selectedIds, selectAll } = global
  const [error, setError] = useState(undefined)
  const [savedSearchLoading, setSavedSearchLoading] = useState(false)
  const client = useApolloClient()
  const history = useHistory()

  // Return early
  if (error) {
    throw new Error(`Error creating databook. ${error.message}`)
  }

  // Return early
  if (savedSearchLoading) {
    return (
      <Fade key="loading" in={savedSearchLoading}>
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
              ? { color: isDataScientist ? theme.palette.primary.main : theme.palette.warning.main }
              : {}
          }
          disabled={!available}
          onClick={
            isDataScientist
              ? async e => {
                  e.stopPropagation()
                  setSavedSearchLoading(true)
                  const { data } = await client
                    .mutate({
                      mutation: gql`
                        mutation($search: JSON!, $createdBy: String!) {
                          createDatabook(search: $search, createdBy: $createdBy)
                        }
                      `,
                      variables: {
                        createdBy: `${packageJson.name} v${packageJson.version}`,
                        search: removeSelectedIds(global),
                      },
                    })
                    .catch(error => setError(error))
                    .finally(() => setSavedSearchLoading(false))

                  if (data) {
                    history.push({
                      pathname: window.location.pathname.includes('render')
                        ? `/render/databooks/${data.createDatabook}`
                        : `/databooks/${data.createDatabook}`,
                    })
                  }
                }
              : () =>
                  alert(
                    `Your login is not authorized to use this feature. Please request access (${CATALOGUE_TECHNICAL_CONTACT})`
                  )
          }
        >
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
  )
}
