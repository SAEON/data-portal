import { useState, useContext } from 'react'
import { Tooltip, IconButton, CircularProgress, Fade } from '@material-ui/core'
import { Explore as MapIcon } from '@material-ui/icons'
import { gql } from '@apollo/client'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { CATALOGUE_CLIENT_MAX_ATLAS_LAYERS } from '../../../../../config'
import { context as globalContext } from '../../../../../contexts/global'
import StyledBadge from '../components/styled-badge'
import packageJson from '../../../../../../package.json'

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

const isAtlasAvailable = (selectedIds, selectAll, atlasLayersCount, records) => {
  if (records && atlasLayersCount && (selectedIds?.length || selectAll)) {
    if (selectedIds?.length) {
      return selectedIds.filter(id => idHasMap(id, records)).length ? true : false
    } else {
      return atlasLayersCount < CATALOGUE_CLIENT_MAX_ATLAS_LAYERS ? true : false
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

export default ({ catalogue }) => {
  const { global } = useContext(globalContext)
  const { selectedIds, selectAll } = global
  const [savedSearchLoading, setSavedSearchLoading] = useState(false)
  const client = useApolloClient()
  const history = useHistory()

  const atlasLayersCount =
    catalogue?.summary
      .find(summary => summary['linkedResources.linkedResourceType.raw'])
      ?.['linkedResources.linkedResourceType.raw'].find(({ key }) => key.toUpperCase() === 'QUERY')
      ?.doc_count || 0

  if (savedSearchLoading) {
    return (
      <Fade key="loading" in={savedSearchLoading}>
        <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
      </Fade>
    )
  }

  const atlasAvailable = isAtlasAvailable(
    selectedIds,
    selectAll,
    atlasLayersCount,
    catalogue?.records
  )

  const getTooltip = () => {
    if (selectAll) {
      if (atlasLayersCount > CATALOGUE_CLIENT_MAX_ATLAS_LAYERS) {
        return `Too many datasets for atlas - search returns ${atlasLayersCount} maps. Max. ${CATALOGUE_CLIENT_MAX_ATLAS_LAYERS}`
      } else {
        return `Configure atlas from ${
          selectedIds?.filter(id => cacheOfMappableItems[id]).length || atlasLayersCount
        } mappable search results`
      }
    } else {
      if (selectedIds.length) {
        const n = selectedIds?.filter(id => cacheOfMappableItems[id]).length
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
    <Fade key="not-loading" in={!savedSearchLoading}>
      <Tooltip title={getTooltip()}>
        <span>
          <IconButton
            disabled={!atlasAvailable}
            onClick={async e => {
              e.stopPropagation()
              setSavedSearchLoading(true)
              const { data } = await client.mutate({
                mutation: gql`
                  mutation($search: JSON!, $createdBy: String!) {
                    createAtlas(search: $search, createdBy: $createdBy)
                  }
                `,
                variables: {
                  createdBy: `${packageJson.name} v${packageJson.version}`,
                  search: removeSelectedIds(global),
                },
              })
              if (data) {
                history.push({
                  pathname: window.location.pathname.includes('render')
                    ? '/render/atlas'
                    : '/atlas',
                  search: `?atlas=${data.createAtlas}`,
                })
              } else {
                throw new Error('Error creating atlas')
              }
            }}
          >
            <StyledBadge
              color={atlasAvailable ? 'primary' : 'default'}
              badgeContent={
                atlasAvailable || selectAll
                  ? selectedIds?.filter(id => cacheOfMappableItems[id]).length ||
                    atlasLayersCount ||
                    0
                  : 0
              }
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              invisible={false}
            >
              <MapIcon />
            </StyledBadge>
          </IconButton>
        </span>
      </Tooltip>
    </Fade>
  )
}
