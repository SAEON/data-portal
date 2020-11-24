import { useState, useContext } from 'react'
import { Tooltip, IconButton, CircularProgress, Fade } from '@material-ui/core'
import { Explore as MapIcon } from '@material-ui/icons'
import { gql } from '@apollo/client'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { CATALOGUE_CLIENT_MAX_ATLAS_LAYERS } from '../../../../config'
import { GlobalContext } from '../../../../contexts/global'
import StyledBadge from './components/styled-badge'
import packageJson from '../../../../../package.json'

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

const isAtlasAvailable = (selectedIds, atlasLayersCount, records) =>
  records && atlasLayersCount
    ? selectedIds?.length
      ? selectedIds.filter(id => idHasMap(id, records)).length
        ? true
        : false
      : atlasLayersCount < CATALOGUE_CLIENT_MAX_ATLAS_LAYERS
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
  const { global } = useContext(GlobalContext)
  const { selectedIds } = global
  const [savedSearchLoading, setSavedSearchLoading] = useState(false)
  const client = useApolloClient()
  const history = useHistory()

  const atlasLayersCount =
    catalogue?.summary
      .find(summary => summary['linkedResources.linkedResourceType.raw'])
      ?.['linkedResources.linkedResourceType.raw'].find(({ key }) => key.toUpperCase() === 'QUERY')
      ?.doc_count || 0

  return savedSearchLoading ? (
    <Fade key="loading" in={savedSearchLoading}>
      <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
    </Fade>
  ) : (
    <Tooltip
      title={
        isAtlasAvailable(selectedIds, atlasLayersCount, catalogue?.records)
          ? `Configure atlas from ${
              selectedIds?.filter(id => cacheOfMappableItems[id]).length || atlasLayersCount
            } mappable search results`
          : selectedIds.length
          ? 'No atlas preview available'
          : atlasLayersCount
          ? `Too many datasets for atlas - search returns ${atlasLayersCount} maps. Max. ${CATALOGUE_CLIENT_MAX_ATLAS_LAYERS}`
          : 'Search context: no datasets with maps found'
      }
    >
      <span style={{ display: 'flex', alignContent: 'center' }}>
        <IconButton
          disabled={!isAtlasAvailable(selectedIds, atlasLayersCount, catalogue?.records)}
          onClick={async e => {
            e.stopPropagation()
            setSavedSearchLoading(true)
            const { data } = await client.mutate({
              mutation: gql`
                mutation($state: JSON!, $createdBy: String!) {
                  createAtlas(state: $state, createdBy: $createdBy)
                }
              `,
              variables: {
                createdBy: `${packageJson.name} v${packageJson.version}`,
                state: removeSelectedIds(global),
              },
            })
            if (data) {
              history.push({
                pathname: window.location.pathname.includes('render') ? '/render/atlas' : '/atlas',
                search: `?atlas=${data.createAtlas}`,
              })
            } else {
              throw new Error('Error creating atlas')
            }
          }}
        >
          <StyledBadge
            color={
              isAtlasAvailable(selectedIds, atlasLayersCount, catalogue?.records)
                ? 'primary'
                : 'default'
            }
            badgeContent={
              isAtlasAvailable(selectedIds, atlasLayersCount, catalogue?.records)
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
  )
}
