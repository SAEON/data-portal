import { useContext } from 'react'
import { context as listContext } from '../../_context'
import Button from '@mui/material/Button'
import { gql, useMutation } from '@apollo/client'
import CircularProgress from '@mui/material/CircularProgress'
import SaveIcon from 'mdi-react/ContentSaveIcon'

export default ({ toggle }) => {
  const { id, search, createdBy, title, description, type } = useContext(listContext)

  const [saveList, { error, loading }] = useMutation(
    gql`
      mutation (
        $id: ID!
        $search: JSON!
        $createdBy: String!
        $title: String
        $description: String
        $type: ListType
      ) {
        saveList(
          id: $id
          search: $search
          createdBy: $createdBy
          title: $title
          description: $description
          type: $type
        ) {
          id
          search
          createdBy
          title
          description
          type
        }
      }
    `
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
          <SaveIcon size={18} />
        )
      }
      onClick={() => {
        saveList({ variables: { id, search, createdBy, title, description, type } })
        toggle()
      }}
    >
      Yes
    </Button>
  )
}
