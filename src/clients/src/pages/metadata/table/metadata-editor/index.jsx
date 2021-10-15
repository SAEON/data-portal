import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Header from './header'
import Provider from './_context'
import JsonEditor from './_json-editor'
import Form from './_form'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'

export default ({ row, onRowChange, column, onClose }) => {
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
