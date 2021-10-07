import { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Paper from './_paper'

export default ({
  Toggle,
  Title,
  Actions = null,
  Content,
  draggableId = 'draggable-dialog-title',
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Toggle open={open} setOpen={setOpen} />
      <Dialog
        fullWidth
        PaperComponent={props => <Paper draggableId={draggableId} {...props} />}
        open={open}
        onClose={() => setOpen(false)}
        scroll="paper"
      >
        <Title draggableId={draggableId} />
        <Content />
        {Actions && <Actions open={open} setOpen={setOpen} />}
      </Dialog>
    </>
  )
}
