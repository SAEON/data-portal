import { useState, useContext } from 'react'
import { Tooltip, IconButton, CircularProgress, Fade } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import DatabookIcon from 'mdi-react/NotebookPlusIcon'
import { gql } from '@apollo/client'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import {
  CATALOGUE_CLIENT_MAX_DATABOOK_TABLES,
  CATALOGUE_TECHNICAL_CONTACT,
} from '../../../../config'
import { context as globalContext } from '../../../../contexts/global'
import StyledBadge from './components/styled-badge'
import packageJson from '../../../../../package.json'
import { context as authorizationContext } from '../../../../contexts/authorization'

const cacheOfMappableItems = {}

const idHasMap = (id, records) => {
  if (cacheOfMappableItems.hasOwnProperty(id)) {
    return cacheOfMappableItems[id]
  } else {
    for (let node of records.nodes) {
      var { metadata } = node
      var { _source } = metadata
      var { linkedResources, id: itemId } = _source

      if (!itemId) return false

      cacheOfMappableItems[itemId] = Boolean(
        linkedResources?.find(
          ({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY'
        )
      )

      if (id === itemId) {
        return cacheOfMappableItems[id]
      }
    }
  }
}

const isDatabookAvailable = (selectedIds, databookTablesCount, records) =>
  records && databookTablesCount
    ? selectedIds?.length
      ? selectedIds.filter(id => idHasMap(id, records)).length
        ? true
        : false
      : databookTablesCount < CATALOGUE_CLIENT_MAX_DATABOOK_TABLES
      ? true
      : false
    : false

const removeSelectedIds = obj =>
  Object.fromEntries(
    Object.entries(
      obj.selectedIds?.length ? Object.assign({ ...obj }, { ids: obj.selectedIds }) : obj
    ).filter(([key]) => key !== 'selectedIds')
  )

export default ({ catalogue }) => {
  const theme = useTheme()
  const { global } = useContext(globalContext)
  const { isDataScientist, isAuthenticated } = useContext(authorizationContext)
  const { selectedIds } = global
  const [error, setError] = useState(undefined)
  const [savedSearchLoading, setSavedSearchLoading] = useState(false)
  const client = useApolloClient()
  const history = useHistory()

  const databookTablesCount =
    catalogue?.summary
      .find(summary => summary['linkedResources.linkedResourceType.raw'])
      ?.['linkedResources.linkedResourceType.raw'].find(({ key }) => key.toUpperCase() === 'QUERY')
      ?.doc_count || 0

  if (error) {
    throw new Error(`Error creating databook. ${error.message}`)
  }

  if (!isAuthenticated) {
    return null
  }

  if (savedSearchLoading) {
    return (
      <Fade key="loading" in={savedSearchLoading}>
        <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
      </Fade>
    )
  }

  const isDisabled = !isDatabookAvailable(selectedIds, databookTablesCount, catalogue?.records)

  return (
    <Tooltip
      title={
        isDatabookAvailable(selectedIds, databookTablesCount, catalogue?.records)
          ? `Configure databook from ${
              selectedIds?.filter(id => cacheOfMappableItems[id]).length || databookTablesCount
            } mappable search results`
          : selectedIds.length
          ? 'No databook preview available'
          : databookTablesCount
          ? `Too many datasets for databook - search returns ${databookTablesCount} maps. Max. ${CATALOGUE_CLIENT_MAX_DATABOOK_TABLES}`
          : 'Search context: no datasets with maps found'
      }
    >
      <span>
        <IconButton
          style={
            isDisabled
              ? {}
              : { color: isDataScientist ? theme.palette.primary.main : theme.palette.warning.main }
          }
          disabled={isDisabled}
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
            color={
              isDatabookAvailable(selectedIds, databookTablesCount, catalogue?.records)
                ? 'primary'
                : 'default'
            }
            badgeContent={
              isDatabookAvailable(selectedIds, databookTablesCount, catalogue?.records)
                ? selectedIds?.filter(id => cacheOfMappableItems[id]).length ||
                  databookTablesCount ||
                  0
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
