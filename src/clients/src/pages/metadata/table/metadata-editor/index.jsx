import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Header from './header'
import Provider from './context'
import JsonEditor from './json-editor'
import Form from './form-editor'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'

export default ({ row, onRowChange, column, onClose }) => {
  const { error, loading } = useQuery(
    gql`
      query ($ids: [ID!]) {
        indexedMetadata(ids: $ids) {
          id
          metadata
        }
      }
    `,
    {
      /**
       * Load the metadata for this row.
       * Rows must be reset explicitly with
       * new metadata field since initial
       * query for metadata doesn't cache
       * this field
       */
      onCompleted: data =>
        onRowChange({
          ...row,
          metadata: { ...data.indexedMetadata[0].metadata, ...(row.metadata || {}) },
        }),
      fetchPolicy: 'cache-first',
      variables: {
        ids: [row.id],
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
    <Provider row={row} onRowChange={onRowChange} column={column}>
      <Dialog maxWidth="xl" onClose={onClose} open={true}>
        <DialogTitle>Edit JSON</DialogTitle>
        <DialogContent style={{ width: 800, height: 800 }}>
          <Header />
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
