import AcceptIcon from 'mdi-react/TickIcon'
import Button from '@mui/material/Button'
import { gql, useMutation } from '@apollo/client'

export default ({ id, immutableResource, setOpen }) => {
  const [updateRecordDataFormat] = useMutation(
    gql`
      mutation ($id: ID!, $immutableResource: JSON!) {
        updateRecordDataFormat(id: $id, immutableResource: $immutableResource)
      }
    `,
    {
      onCompleted: () => setOpen(false),
    }
  )

  return (
    <Button
      startIcon={<AcceptIcon size={18} />}
      variant="text"
      size="small"
      onClick={() => updateRecordDataFormat({ variables: { id, immutableResource } })}
    >
      Okay
    </Button>
  )
}
