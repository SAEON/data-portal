import { useContext } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import MapIcon from '@material-ui/icons/Explore'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
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
  const history = useHistory()

  const [createAtlas, { error, loading }] = useMutation(
    gql`
      mutation($search: JSON!, $createdBy: String!) {
        createAtlas(search: $search, createdBy: $createdBy)
      }
    `,
    {
      onCompleted: data => {
        if (data) {
          history.push({
            pathname: window.location.pathname.includes('render') ? '/render/atlas' : '/atlas',
            search: `?atlas=${data.createAtlas}`,
          })
        }
      },
    }
  )

  if (error) {
    throw new Error(`Error creating atlas - ${error.message}`)
  }

  if (loading) {
    return (
      <Fade key="loading" in={loading}>
        <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
      </Fade>
    )
  }

  // Get count of all selected records that are valid for databooks
  const validCount = getValidCount(selectedIds, selectAll, catalogue, cache)

  // Check whether the atlas function is available for current context
  const available = validCount && validCount < CATALOGUE_CLIENT_MAX_ATLAS_LAYERS

  return (
    <Fade key="not-loading" in={!loading}>
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
                  ),
                },
              })
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
              <MapIcon />
            </StyledBadge>
          </IconButton>
        </span>
      </Tooltip>
    </Fade>
  )
}
