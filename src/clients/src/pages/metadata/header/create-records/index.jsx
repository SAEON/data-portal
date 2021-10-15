import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Toggle from './dialog-toggle'
import Title from './dialog-title'
import Content from './dialog-content'
import Actions from './dialog-actions'
import Provider from './context'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Toggle open={open} setOpen={setOpen} />

      <Dialog
        scroll="paper"
        onClose={(e, reason) => {
          if (reason) {
            return
          }
          setOpen(false)
        }}
        fullWidth
        open={open}
      >
        <Provider>
          <Title />
          <Content />
          <Actions open={open} setOpen={setOpen} />
        </Provider>
      </Dialog>
    </>
  )
}
