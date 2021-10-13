import { useContext } from 'react'
import { context as dialogContext } from '../context'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const Actions = ({ setOpen, form, createMetadata, createMetadataError, createMetadataLoading }) => {
  if (createMetadataError) {
    throw createMetadataError
  }

  return (
    <DialogActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        disabled={createMetadataLoading}
        size="small"
        variant="text"
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
      <Button
        disabled={createMetadataLoading}
        onClick={() =>
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
          }).then(() => {
            setOpen(false)
          })
        }
        size="small"
        variant="text"
      >
        Create records
      </Button>
    </DialogActions>
  )
}

export default ({ setOpen }) => {
  const { form, createMetadata, createMetadataError, createMetadataLoading } =
    useContext(dialogContext)

  return (
    <Actions
      form={form}
      setOpen={setOpen}
      createMetadata={createMetadata}
      createMetadataError={createMetadataError}
      createMetadataLoading={createMetadataLoading}
    />
  )
}
