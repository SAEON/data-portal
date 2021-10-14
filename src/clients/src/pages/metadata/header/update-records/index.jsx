import { useContext, useMemo, useState } from 'react'
import UpdateIcon from 'mdi-react/ContentSaveAllIcon'
import Button from '@material-ui/core/Button'
import { context as metadataContext } from '../../context'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

export default () => {
  const { selectedRows, changes } = useContext(metadataContext)
  const [open, setOpen] = useState(false)

  const changedSelectedRows = useMemo(() => {
    return [...selectedRows].map(id => changes[id]).filter(_ => _)
  }, [changes, selectedRows])

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
            Update record(s)
          </Button>
        </span>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update {changedSelectedRows.length} metadata records</DialogTitle>
        <DialogContent>
          Are you sure you want to overwrite metadata for the selected rows?
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => alert('hi')}>Update records</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
