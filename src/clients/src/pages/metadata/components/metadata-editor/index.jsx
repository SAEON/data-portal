import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Header from './header'
import Provider from './_context'
import JsonEditor from './_json-editor'
import Form from './_form'

export default ({ row, onRowChange, column: { key }, onClose }) => {
  return (
    <Provider row={row} onRowChange={onRowChange} json={row[key]}>
      <Dialog maxWidth="xl" onClose={onClose} open={true}>
        <DialogTitle>Edit metadata</DialogTitle>
        <DialogContent style={{ width: 800, height: 800 }}>
          <Header />
          <Form />
          <JsonEditor />
        </DialogContent>
      </Dialog>
    </Provider>
  )
}
