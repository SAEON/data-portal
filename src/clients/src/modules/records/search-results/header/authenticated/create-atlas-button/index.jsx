import { useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'
import MapIcon from '@mui/icons-material/Explore'
import { gql, useMutation } from '@apollo/client'
import { context as globalContext } from '../../../../../../contexts/global'
import StyledBadge from '../../components/styled-badge'
import packageJson from '../../../../../../../package.json'
import createSearchObject from '../fns/create-search-object'
import getTooltip from '../fns/tooltip'
import getValidCount from './_get-valid-count'
import { CATALOGUE_CLIENT_MAX_ATLAS_LAYERS } from '../../../../../../config'

export default ({ cache, catalogue }) => {
  const { global } = useContext(globalContext)
  const { selectedIds, selectAll } = global

  const [createAtlas, { error, loading }] = useMutation(
    gql`
      mutation($search: JSON!, $createdBy: String!) {
        createAtlas(search: $search, createdBy: $createdBy)
      }
    `,
    {
      onCompleted: data => {
        if (data) {
          window.open(`/atlas/${data.createAtlas}`, '_blank')
        }
      }
    }
  )

  if (error) {
    throw new Error(`Error creating atlas - ${error.message}`)
  }

  if (loading) {
    return (
      <Fade key="loading" in={loading}>
        <span>
          <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
        </span>
      </Fade>
    )
  }

  // Get count of all selected records that are valid for atlas
  const validCount = getValidCount(selectedIds, selectAll, catalogue, cache)

  // Check whether the atlas function is available for current context
  const available = validCount && validCount < CATALOGUE_CLIENT_MAX_ATLAS_LAYERS

  return (
    <Fade key="not-loading" in={!loading}>
      <span>
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
              onClick={() =>
                createAtlas({
                  variables: {
                    createdBy: `${packageJson.name} v${packageJson.version}`,
                    search: createSearchObject(
                      global,
                      selectedIds.length && selectedIds.filter(id => cache[id])
                    )
                  }
                })
              }
              size="large"
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
      </span>
    </Fade>
  )
}
