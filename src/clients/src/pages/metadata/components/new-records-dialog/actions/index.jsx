import { useContext } from 'react'
import { context as newMetadataFormContext } from '../_context'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { gql, useMutation } from '@apollo/client'

export default () => {
  const { formRef } = useContext(newMetadataFormContext)
  const [createMetadata, { error, loading }] = useMutation(
    gql`
      mutation ($institution: String!, $numberOfRecords: Int, $input: MetadataInput!) {
        createMetadata(
          institution: $institution
          numberOfRecords: $numberOfRecords
          input: $input
        ) {
          id
        }
      }
    `,
    {
      update: (cache, data) => {
        console.log('data', data)
      },
    }
  )

  return (
    <DialogActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        onClick={() => {
          const form = formRef.current
          createMetadata({
            variables: {
              institution: form.institution.value,
              numberOfRecords: form.numRecords,
              input: {
                collection_key: form.collection.value,
                schema_key: form.schema.value,
                metadata: form.metadata,
              },
            },
          })
        }}
        size="small"
        variant="text"
      >
        Create records
      </Button>
    </DialogActions>
  )
}
