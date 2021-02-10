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

const cacheOfLoadableItems = {}

const idHasMap = (id, records) => {
  if (cacheOfLoadableItems.hasOwnProperty(id)) {
    return cacheOfLoadableItems[id]
  } else {
    for (let node of records.nodes) {
      var { metadata } = node
      var { _source } = metadata
      var { linkedResources, id: itemId } = _source

      if (!itemId) return false

      cacheOfLoadableItems[itemId] = Boolean(
        linkedResources?.find(
          ({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY'
        )
      )

      if (id === itemId) {
        return cacheOfLoadableItems[id]
      }
    }
  }
}

const isDatabookAvailable = (selectedIds, selectAll, databookTablesCount, records) => {
  if (records && databookTablesCount && (selectedIds?.length || selectAll)) {
    if (selectedIds?.length) {
      return selectedIds.filter(id => idHasMap(id, records)).length ? true : false
    } else {
      return databookTablesCount < CATALOGUE_CLIENT_MAX_DATABOOK_TABLES ? true : false
    }
  }

  return false
}

const removeSelectedIds = obj =>
  Object.fromEntries(
    Object.entries(
      obj.selectedIds?.length ? Object.assign({ ...obj }, { ids: obj.selectedIds }) : obj
    ).filter(([key]) => key !== 'selectedIds')
  )

const DATATYPES = ['Shapefile'].map(s => s.toUpperCase())

export default ({ catalogue }) => {
  const theme = useTheme()
  const { global } = useContext(globalContext)
  const { isDataScientist, isAuthenticated } = useContext(authorizationContext)
  const { selectedIds, selectAll } = global
  const [error, setError] = useState(undefined)
  const [savedSearchLoading, setSavedSearchLoading] = useState(false)
  const client = useApolloClient()
  const history = useHistory()

  const databookTablesCount =
    catalogue?.summary
      .find(summary => summary['immutableResource._fileFormat.raw'])
      ?.['immutableResource._fileFormat.raw'].find(({ key }) =>
        DATATYPES.includes(key.toUpperCase())
      )?.doc_count || 0

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

  const available = isDatabookAvailable(
    selectedIds,
    selectAll,
    databookTablesCount,
    catalogue?.records
  )

  const getTooltip = () => {
    if (selectAll) {
      if (databookTablesCount > CATALOGUE_CLIENT_MAX_DATABOOK_TABLES) {
        return `Too many datasets for atlas - search returns ${databookTablesCount} maps. Max. ${CATALOGUE_CLIENT_MAX_DATABOOK_TABLES}`
      } else {
        return `Configure atlas from ${
          selectedIds?.filter(id => cacheOfLoadableItems[id]).length || databookTablesCount
        } mappable search results`
      }
    } else {
      if (selectedIds.length) {
        const n = selectedIds?.filter(id => cacheOfLoadableItems[id]).length
        if (n) {
          return `Configure atlas from ${n} mappable search results`
        } else {
          return 'No maps found for selected records'
        }
      } else {
        return 'Show atlas from 0 selected records'
      }
    }
  }

  return (
    <Tooltip title={getTooltip()}>
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
                ? selectedIds?.filter(id => cacheOfLoadableItems[id]).length ||
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
