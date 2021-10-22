import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Header from './header'
import Provider from './context'
import JsonEditor from './json-editor'
import Form from './form-editor'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'

export default ({ row, onRowChange, column, onClose }) => {
  const { error, loading, data } = useQuery(
    gql`
      query ($ids: [ID!], $schema: String!) {
        indexedMetadata(ids: $ids) {
          id
          metadata
        }

        schemaJson(schema: $schema)
      }
    `,
    {
      /**
       * Load the metadata for this row.
       * Rows must be reset explicitly with
       * new metadata field since initial
       * query for metadata doesn't cache
       * indexedMetadata.metadata (since it's
       * not loaded in the initial query - don't
       * know why Apollo does this)
       */
      onCompleted: data =>
        onRowChange({
          ...row,
          metadata: { ...data.indexedMetadata[0].metadata, ...(row.metadata || {}) },
        }),
      fetchPolicy: 'cache-first',
      variables: {
        ids: [row.id],
        schema: row.schema,
      },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return (
    <Provider schemaJson={data.schemaJson} row={row} onRowChange={onRowChange} column={column}>
      <Dialog fullWidth scroll="paper" maxWidth="xl" onClose={onClose} open={true}>
        <Header />
        <DialogContent dividers style={{ height: 800 }}>
          <Form />
          <JsonEditor />
        </DialogContent>
        <DialogActions>
          <Button variant="text" disableElevation size="small" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Provider>
  )
}
