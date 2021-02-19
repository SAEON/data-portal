import { useState, useContext } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import MapIcon from '@material-ui/icons/Explore'
import { gql } from '@apollo/client'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { CATALOGUE_CLIENT_MAX_ATLAS_LAYERS } from '../../../../../../config'
import { context as globalContext } from '../../../../../../contexts/global'
import { context as authorizationContext } from '../../../../../../contexts/authorization'
import StyledBadge from '../../components/styled-badge'
import packageJson from '../../../../../../../package.json'
import removeSelectedIds from './_remove-selected-ids'
import getTooltip from './_get-tooltip'

const idHasMap = (id, records, cache) => {
  if (cache.hasOwnProperty(id)) {
    return cache[id]
  } else {
    for (let node of records.nodes) {
      var { metadata } = node
      var { _source } = metadata
      var { linkedResources, id: itemId } = _source

      if (!itemId) return false

      cache[itemId] = Boolean(
        linkedResources?.find(
          ({ linkedResourceType }) => linkedResourceType?.toUpperCase() === 'QUERY'
        )
      )

      if (id === itemId) {
        return cache[id]
      }
    }
  }
}

const isAtlasAvailable = (selectedIds, selectAll, atlasLayersCount, records, cache) => {
  if (records && atlasLayersCount && (selectedIds?.length || selectAll)) {
    if (selectedIds?.length) {
      return selectedIds.filter(id => idHasMap(id, records, cache)).length ? true : false
    } else {
      return atlasLayersCount < CATALOGUE_CLIENT_MAX_ATLAS_LAYERS ? true : false
    }
  }

  return false
}

export default ({ catalogue, cache }) => {
  const { global } = useContext(globalContext)
  const { isAuthenticated } = useContext(authorizationContext)
  const { selectedIds, selectAll } = global
  const [savedSearchLoading, setSavedSearchLoading] = useState(false)
  const client = useApolloClient()
  const history = useHistory()

  if (!isAuthenticated) {
    return null
  }

  const atlasLayersCount =
    catalogue?.summary
      .find(summary => summary['_linked-resources-filter'])
      ?.['_linked-resources-filter'].find(({ key }) => key?.toUpperCase() === 'QUERY')?.doc_count ||
    0

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
    catalogue?.records,
    cache
  )

  return (
    <Fade key="not-loading" in={!savedSearchLoading}>
      <Tooltip title={getTooltip(selectedIds, cache, selectAll, atlasLayersCount)}>
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
                  ? selectedIds?.filter(id => cache[id]).length || atlasLayersCount || 0
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
