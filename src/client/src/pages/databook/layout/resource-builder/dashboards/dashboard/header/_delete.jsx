import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from 'mdi-react/TrashCanOutlineIcon'
import { useMutation, gql } from '@apollo/client'

export default ({ id, activeTabIndex, setActiveTabIndex }) => {
  const [deleteDashboard] = useMutation(
    gql`
      mutation ($id: ID!) {
        deleteDashboard(id: $id)
      }
    `,
    {
      update: cache => {
        cache.evict({ id: `Dashboard:${id}` })
        if (activeTabIndex) {
          setActiveTabIndex(activeTabIndex - 1)
        }
      },
    }
  )
  return (
    <Tooltip title="Delete current dashboard" placement="left-start">
      <span>
        <IconButton onClick={() => deleteDashboard({ variables: { id } })} size="small">
          <DeleteIcon size={20} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
