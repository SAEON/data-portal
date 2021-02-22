import { useState, useContext } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import MapIcon from '@material-ui/icons/Explore'
import { gql } from '@apollo/client'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { context as globalContext } from '../../../../../../contexts/global'
import StyledBadge from '../../components/styled-badge'
import packageJson from '../../../../../../../package.json'
import removeSelectedIds from '../fns/remove-selected-ids'
import getTooltip from '../fns/tooltip'
import getValidCount from './_get-valid-count'
import { CATALOGUE_CLIENT_MAX_ATLAS_LAYERS } from '../../../../../../config'

/**
 * Hopefully slightly improve performance when
 * checking if records have useable data format
 * for this function when selectAll = true
 */
const cache = {}

export default ({ catalogue }) => {
  const { global } = useContext(globalContext)
  const { selectedIds, selectAll } = global
  const [savedSearchLoading, setSavedSearchLoading] = useState(false)
  const client = useApolloClient()
  const history = useHistory()

  if (savedSearchLoading) {
    return (
      <Fade key="loading" in={savedSearchLoading}>
        <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
      </Fade>
    )
  }

  // Get count of all selected records that are valid for databooks
  const validCount = getValidCount(selectedIds, selectAll, catalogue, cache)

  // Check whether the atlas function is available for current context
  const available = validCount && validCount < CATALOGUE_CLIENT_MAX_ATLAS_LAYERS

  return (
    <Fade key="not-loading" in={!savedSearchLoading}>
      <Tooltip
        title={getTooltip(
          selectAll,
          validCount,
          selectedIds,
          cache,
          CATALOGUE_CLIENT_MAX_ATLAS_LAYERS,
          'Atlas'
        )}
      >
        <span>
          <IconButton
            disabled={!available}
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
              color={available ? 'primary' : 'default'}
              badgeContent={
                available || selectAll
                  ? selectedIds?.filter(id => cache[id]).length || validCount || 0
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
