import Button from '@material-ui/core/Button'
import { gql, useMutation } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from 'mdi-react/DeleteIcon'

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
          <DeleteIcon size={18} />
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
