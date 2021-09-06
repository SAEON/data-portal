import Button from '@material-ui/core/Button'
import NewListIcon from 'mdi-react/DatabaseAddIcon'
import { gql, useMutation } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

export default () => {
  const [saveList, { error, loading }] = useMutation(
    gql`
      mutation ($search: JSON!, $createdBy: String!, $type: ListType, $title: String) {
        saveList(search: $search, createdBy: $createdBy, type: $type, title: $title) {
          id
          title
          description
        }
      }
    `,
    {
      update: (cache, data) => {
        // TODO update root query.lists cache
      },
    }
  )

  if (error) {
    throw error
  }

  return (
    <Button
      onClick={() =>
        saveList({
          variables: {
            createdBy: 'TODO',
            search: {},
            title: 'AAA',
            type: 'curated',
          },
        })
      }
      startIcon={
        loading ? (
          <CircularProgress thickness={2} size={18} style={{ margin: '0 15px' }} />
        ) : (
          <NewListIcon size={18} />
        )
      }
      variant="text"
      size="small"
      disableElevation
    >
      New list
    </Button>
  )
}
