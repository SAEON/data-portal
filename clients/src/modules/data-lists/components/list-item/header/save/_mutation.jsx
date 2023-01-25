import { useContext } from 'react'
import { context as listContext } from '../../_context'
import Button from '@mui/material/Button'
import { gql, useMutation } from '@apollo/client'
import CircularProgress from '@mui/material/CircularProgress'
import { ContentSave as SaveIcon } from '../../../../../../components/icons'

export default ({ toggle }) => {
  const { id, filter, createdBy, title, description, type } = useContext(listContext)

  const [saveList, { error, loading }] = useMutation(
    gql`
      mutation (
        $id: ID!
        $filter: JSON
        $createdBy: String!
        $title: String
        $description: String
        $type: ListType
      ) {
        saveList(
          id: $id
          filter: $filter
          createdBy: $createdBy
          title: $title
          description: $description
          type: $type
        ) {
          id
          filter
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
          <CircularProgress thickness={2} size={18} sx={{ margin: '0 15px' }} />
        ) : (
          <SaveIcon fontSize="small" />
        )
      }
      onClick={() => {
        saveList({ variables: { id, filter, createdBy, title, description, type } })
        toggle()
      }}
    >
      Yes
    </Button>
  )
}
