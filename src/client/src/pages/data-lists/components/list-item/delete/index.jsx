import DeleteIcon from 'mdi-react/DeleteIcon'
import MessageDialogue from '../.././../../../components/message-dialogue'
import Button from '@material-ui/core/Button'
import { gql, useMutation } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'

export default ({ id }) => {
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
    <Card variant="outlined">
      <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <MessageDialogue
          buttonType="button"
          title="Confirm"
          text="Are you sure you want to delete this list?"
          tooltipProps={{
            title: 'Delete this list',
          }}
          buttonProps={{
            startIcon: <DeleteIcon size={18} />,
            children: 'Delete list',
            size: 'small',
          }}
          actions={[
            ({ toggle }) => (
              <Button size="small" variant="outlined" disableElevation onClick={toggle}>
                Cancel
              </Button>
            ),
            ({ toggle }) => (
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
            ),
          ]}
        />
      </CardActions>
    </Card>
  )
}
