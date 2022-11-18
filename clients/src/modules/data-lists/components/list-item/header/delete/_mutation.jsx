import Button from '@mui/material/Button'
import { gql, useMutation } from '@apollo/client'
import CircularProgress from '@mui/material/CircularProgress'
import { Delete as DeleteIcon } from '../../../../../../components/icons'

export default ({ id, toggle }) => {
  const [deleteList, { error, loading }] = useMutation(
    gql`
      mutation ($id: ID!) {
        deleteList(id: $id)
      }
    `,
    {
      update: (cache, { data: { deleteList: success } }) => {
        if (!success) {
          throw new Error(
            `Unable to delete list (id: ${id}). This is an unexpected error, please contact a system administrator`
          )
        }

        cache.evict({ id: `List:${id}` })
      },
    }
  )

  if (error) {
    throw error
  }

  return (
    <Button
      size="small"
      variant="outlined"
      disableElevation
      startIcon={
        loading ? (
          <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
        ) : (
          <DeleteIcon fontSize="small" />
        )
      }
      onClick={() => {
        deleteList({ variables: { id } })
        toggle()
      }}
    >
      Yes
    </Button>
  )
}
