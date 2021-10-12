import { useContext } from 'react'
import { context as createMetadataContext } from '../context'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { gql, useMutation } from '@apollo/client'

export default ({ setOpen }) => {
  const { formRef } = useContext(createMetadataContext)
  const [createMetadata, { error, loading }] = useMutation(
    gql`
      mutation ($institution: String!, $numberOfRecords: Int, $input: MetadataInput!) {
        createMetadata(
          institution: $institution
          numberOfRecords: $numberOfRecords
          input: $input
        ) {
          id
          doi
          sid
          institution
          collection
          schema
          validated
          errors
          state
          title
        }
      }
    `,
    {
      update: (cache, { data: { createMetadata: newRecords } }) => {
        cache.modify({
          fields: {
            indexedMetadata: (existing = []) => [...newRecords, ...existing],
          },
        })
      },
      onCompleted: () => setOpen(false),
    }
  )

  if (error) {
    throw error
  }

  return (
    <DialogActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        disabled={loading}
        onClick={() => {
          const form = formRef.current
          console.log(form)
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
        {loading ? 'Loading ...' : 'Create records'}
      </Button>
    </DialogActions>
  )
}
