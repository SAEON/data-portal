import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { gql, useMutation } from '@apollo/client'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

export default ({ setOpen, setChanges, changes, mergedChanges, rows, setRows }) => {
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
        setOpen(false)
        const _updates = Object.fromEntries(updatedRecords.map(u => [u.id, u]))
        setChanges({
          ...changes,
          ...Object.fromEntries(updatedRecords.map(({ id }) => [id, null])),
        })
        setRows(rows.map(row => _updates[row.id] || row))
      },
    }
  )

  if (error) {
    throw error
  }

  return (
    <>
      <DialogTitle>Update {mergedChanges.length} metadata records</DialogTitle>
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
          onClick={() =>
            updateMetadata({
              variables: {
                input: mergedChanges.map(
                  ({ id, doi, sid, collection, institution, schema, metadata }) => ({
                    id,
                    doi,
                    sid,
                    institution_key: institution,
                    metadataInput: {
                      collection_key: collection,
                      schema_key: schema,
                      metadata,
                    },
                  })
                ),
              },
            })
          }
        >
          Update
        </Button>
      </DialogActions>
    </>
  )
}
