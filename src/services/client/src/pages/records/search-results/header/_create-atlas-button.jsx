import { useState, useContext } from 'react'
import { Tooltip, IconButton, CircularProgress, Fade } from '@material-ui/core'
import { Explore as MapIcon } from '@material-ui/icons'
import { gql } from '@apollo/client'
import packageJson from '../../../../../package.json'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { MAX_ATLAS_DATASETS } from '../../../../config'
import { GlobalContext } from '../../../../contexts/global'
import StyledBadge from './components/styled-badge'

const doiMapCache = {}

const doiHasMap = (doi, records) => {
  if (doiMapCache.hasOwnProperty(doi)) {
    return doiMapCache[doi]
  } else {
    for (let node of records.nodes) {
      var { metadata } = node
      var { _source } = metadata
      var { linkedResources, doi: itemDoi } = _source

      if (!itemDoi) return false

      doiMapCache[itemDoi] = Boolean(
        linkedResources?.find(
          ({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY'
        )
      )

      if (doi === itemDoi) {
        return doiMapCache[doi]
      }
    }
  }
}

const isAtlasAvailable = (selectedDois, atlasLayersCount, records) =>
  records && atlasLayersCount
    ? selectedDois?.length
      ? selectedDois.filter(doi => doiHasMap(doi, records)).length
        ? true
        : false
      : atlasLayersCount < MAX_ATLAS_DATASETS
      ? true
      : false
    : false

export default ({ catalogue }) => {
  const { global } = useContext(GlobalContext)
  const { selectedDois } = global
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
        isAtlasAvailable(selectedDois, atlasLayersCount, catalogue?.records)
          ? `Configure atlas from ${
              selectedDois?.filter(doi => doiMapCache[doi]).length || atlasLayersCount
            } mappable search results`
          : selectedDois.length
          ? 'No atlas preview available'
          : atlasLayersCount
          ? `Too many datasets for atlas - search returns ${atlasLayersCount} maps. Max. ${MAX_ATLAS_DATASETS}`
          : 'Search context: no datasets with maps found'
      }
    >
      <span style={{ display: 'flex', alignContent: 'center' }}>
        <IconButton
          disabled={!isAtlasAvailable(selectedDois, atlasLayersCount, catalogue?.records)}
          onClick={async e => {
            e.stopPropagation()
            setSavedSearchLoading(true)
            const { data } = await client.mutate({
              mutation: gql`
                mutation($state: JSON!, $createdBy: String!) {
                  browserClient {
                    persistSearchState(state: $state, createdBy: $createdBy)
                  }
                }
              `,
              variables: {
                createdBy: `${packageJson.name} v${packageJson.version}`,
                state: selectedDois.length ? { selectedDois } : global,
              },
            })
            if (data) {
              history.push({
                pathname: 'atlas',
                search: `?search=${data.browserClient.persistSearchState}`,
              })
            } else {
              throw new Error('Error creating atlas')
            }
          }}
        >
          <StyledBadge
            color={
              isAtlasAvailable(selectedDois, atlasLayersCount, catalogue?.records)
                ? 'primary'
                : 'default'
            }
            badgeContent={
              isAtlasAvailable(selectedDois, atlasLayersCount, catalogue?.records)
                ? selectedDois?.filter(doi => doiMapCache[doi]).length || atlasLayersCount || 0
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
