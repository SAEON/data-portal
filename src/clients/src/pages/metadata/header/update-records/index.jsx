import { useContext, useMemo, useState } from 'react'
import UpdateIcon from 'mdi-react/ContentSaveAllIcon'
import Button from '@material-ui/core/Button'
import { context as metadataContext } from '../../context'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import { gql, useMutation } from '@apollo/client'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import useTheme from '@material-ui/core/styles/useTheme'
import CircularProgress from '@material-ui/core/CircularProgress'

export default () => {
  const theme = useTheme()
  const { selectedRows, changes, setChanges } = useContext(metadataContext)
  const [open, setOpen] = useState(false)

  const changedSelectedRows = useMemo(() => {
    return [...selectedRows].map(id => changes[id]).filter(_ => _)
  }, [changes, selectedRows])

  const [updateMetadata, { loading, error }] = useMutation(
    gql`
      mutation ($input: [UpdateMetadataInput!]!) {
        updateMetadata(input: $input) {
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
          metadata
        }
      }
    `,
    {
      // update: (cache, { data: { updateMetadata: updatedRecords } }) => {},
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
      <Tooltip title={`Save ${changedSelectedRows.length} changed metadata records`}>
        <span>
          <Button
            disabled={changedSelectedRows.length < 1}
            onClick={() => setOpen(true)}
            startIcon={<UpdateIcon size={18} />}
            size="small"
            variant="text"
          >
            {`Update record${changedSelectedRows.length > 1 ? 's' : ''}`}
          </Button>
        </span>
      </Tooltip>
      <Dialog
        scroll="paper"
        onClose={(e, reason) => {
          if (reason) {
            return
          }
          setOpen(false)
        }}
        open={open}
      >
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
                ({
                  id,
                  doi,
                  sid,
                  collection,
                  institution,
                  schema,
                  metadata,
                  edit,
                  errors,
                  i,
                  state,
                  title,
                  validated,
                }) => {
                  return {
                    id,
                    doi,
                    sid,
                    institution_key: institution,
                    metadataInput: {
                      collection_key: collection,
                      schema_key: schema,
                      metadata,
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
      </Dialog>
    </>
  )
}
