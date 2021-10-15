import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from 'mdi-react/TrashCanOutlineIcon'
import { useMutation, gql } from '@apollo/client'

export default ({ id, setActiveTabIndex, activeTabIndex }) => {
  const [deleteChart] = useMutation(
    gql`
      mutation ($id: ID!) {
        deleteChart(id: $id)
      }
    `,
    {
      update: cache => {
        cache.evict({ id: `Chart:${id}` })
        if (activeTabIndex) {
          setActiveTabIndex(activeTabIndex - 1)
        }
      },
    }
  )

  return (
    <Tooltip title="Delete current chart" placement="left-start">
      <span>
        <IconButton onClick={() => deleteChart({ variables: { id } })} size="small">
          <DeleteIcon size={20} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
