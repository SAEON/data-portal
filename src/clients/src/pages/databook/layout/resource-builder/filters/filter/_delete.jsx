import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from 'mdi-react/TrashCanOutlineIcon'
import { useMutation, gql } from '@apollo/client'

export default ({ id, setActiveTabIndex, activeTabIndex }) => {
  const [deleteFilter] = useMutation(
    gql`
      mutation ($id: ID!) {
        deleteFilter(id: $id)
      }
    `,
    {
      update: cache => {
        cache.evict({ id: `Filter:${id}` })
        if (activeTabIndex) {
          setActiveTabIndex(activeTabIndex - 1)
        }
      },
    }
  )

  return (
    <Tooltip title="Delete current filter" placement="left-start">
      <span>
        <IconButton onClick={() => deleteFilter({ variables: { id } })} size="small">
          <DeleteIcon size={20} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
