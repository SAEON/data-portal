import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import { gql, useMutation } from '@apollo/client'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import useTheme from '@material-ui/core/styles/useTheme'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

export default ({ setOpen, setChanges, changes, changedSelectedRows }) => {
  const theme = useTheme()

  const [updateMetadata, { loading, error }] = useMutation(
    gql`
      mutation ($input: [UpdateMetadataInput!]!) {
        updateMetadata(input: $input) {
          id
          doi
          sid
          institution
          collection
          metadata
          schema
          validated
          errors
          state
          title
        }
      }
    `,
    {
      onCompleted: ({ updateMetadata: updatedRecords }) => {
        setChanges({
          ...changes,
          ...Object.fromEntries(updatedRecords.map(({ id }) => [id, null])),
        })
        setOpen(false)
      },
    }
  )

  if (error) {
    throw error
  }

  return (
    <>
      <DialogTitle>Update {changedSelectedRows.length} metadata records</DialogTitle>
      <DialogContent dividers={true}>
        <Collapse in={loading} key="show-loading">
          <span>
            <Fade in={loading} key="show-loading-fade">
              <div style={{ textAlign: 'center', marginBottom: theme.spacing(4) }}>
                <Typography variant="overline" style={{ display: 'block' }}>
                  Please wait...
                </Typography>
                <Typography
                  variant="overline"
                  style={{ display: 'block', marginBottom: theme.spacing(4) }}
                >
                  This can take a few minutes
                </Typography>
                <CircularProgress size={60} />
              </div>
            </Fade>
          </span>
        </Collapse>

        <Collapse in={!loading} key="show-msg">
          <span>
            <Fade in={!loading} key="show-msg-fade">
              <span>
                <Typography gutterBottom variant="body2">
                  Are you sure you want to overwrite metadata for the selected rows?
                </Typography>
                <Typography gutterBottom variant="body2">
                  You cannot undo this operation. It is very permanent
                </Typography>
              </span>
            </Fade>
          </span>
        </Collapse>
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button disabled={loading} size="small" variant="text" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          size="small"
          variant="text"
          onClick={() => {
            const input = changedSelectedRows.map(
              ({ id, doi, sid, collection, institution, schema }) => {
                return {
                  id,
                  doi,
                  sid,
                  institution_key: institution,
                  metadataInput: {
                    collection_key: collection,
                    schema_key: schema,
                    metadata: changes[id]?.metadata,
                  },
                }
              }
            )

            updateMetadata({
              variables: {
                input,
              },
            })
          }}
        >
          Update
        </Button>
      </DialogActions>
    </>
  )
}
